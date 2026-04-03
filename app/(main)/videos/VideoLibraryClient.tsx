'use client';

import { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import { Search, Check, HelpCircle, Flag } from 'lucide-react';
import { examYears } from '@/lib/video-data';
import type { ExamYear, Video, Difficulty } from '@/lib/video-data';

const STUDENT_NAME_KEY = 'exam-student-name';

// Sort: A2 before AS, then by year descending
const sortedYears = [...examYears].sort((a, b) => {
  if (a.level !== b.level) return a.level === 'A2' ? -1 : 1;
  const yearA = parseInt(a.label.replace(/\D/g, ''));
  const yearB = parseInt(b.label.replace(/\D/g, ''));
  return yearB - yearA;
});

const difficultyConfig: Record<Difficulty, { border: string; text: string; dot: string; label: string }> = {
  green:  { border: 'border-l-4 border-l-emerald-500', text: 'text-emerald-600', dot: 'bg-emerald-500', label: 'Well answered' },
  amber:  { border: 'border-l-4 border-l-amber-500',   text: 'text-amber-600',   dot: 'bg-amber-500',   label: 'Mixed results' },
  red:    { border: 'border-l-4 border-l-rose-500',     text: 'text-rose-600',     dot: 'bg-rose-500',     label: 'Challenging' },
};

function DifficultyLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--foreground)]/60 mb-6">
      {(['green', 'amber', 'red'] as Difficulty[]).map((d) => (
        <span key={d} className="flex items-center gap-1.5">
          <span className={`inline-block w-2.5 h-2.5 rounded-full ${difficultyConfig[d].dot}`} />
          {difficultyConfig[d].label}
        </span>
      ))}
    </div>
  );
}

function LevelBadge({ level }: { level: 'A2' | 'AS' }) {
  return (
    <span
      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full ${
        level === 'A2'
          ? 'bg-[#FF6B35]/15 text-[#FF6B35]'
          : 'bg-[#C5A855]/15 text-[#C5A855]'
      }`}
    >
      {level}
    </span>
  );
}

function NamePrompt({ onSave, onCancel }: { onSave: (name: string) => void; onCancel?: () => void }) {
  const [draft, setDraft] = useState('');
  return (
    <div className="flex items-center gap-2 py-2">
      <span className="text-xs text-[var(--foreground)]/60">What&apos;s your name?</span>
      <input
        type="text"
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && draft.trim()) onSave(draft.trim()); }}
        className="px-2 py-1 text-xs border border-black/10 rounded bg-[var(--card-bg)] text-[var(--foreground)] outline-none focus:ring-1 focus:ring-[#C5A855]"
        placeholder="Your name"
        autoFocus
      />
      <button
        onClick={() => { if (draft.trim()) onSave(draft.trim()); }}
        className="px-2 py-1 text-xs font-medium rounded text-white cursor-pointer"
        style={{ backgroundColor: '#C5A855' }}
      >
        Save
      </button>
      {onCancel && (
        <button onClick={onCancel} className="text-xs text-[var(--foreground)]/40 hover:text-[var(--foreground)]/60 cursor-pointer">
          Cancel
        </button>
      )}
    </div>
  );
}

// flagMap key: step index number for per-step, or 'video' for whole-question flag
// flagMap value: Supabase row id
type FlagMap = Map<number | 'video', string>;

function TodoChecklist({
  videoId,
  items,
  videoTitle,
  examYear,
}: {
  videoId: string;
  items: string[];
  videoTitle: string;
  examYear: string;
}) {
  const storageKey = `exam-todo-${videoId}`;
  const [completed, setCompleted] = useState<Set<number>>(new Set());
  const [recentlyCompleted, setRecentlyCompleted] = useState<Set<number>>(new Set());

  // Flag state
  const [flagMap, setFlagMap] = useState<FlagMap>(new Map());
  const [studentName, setStudentName] = useState<string | null>(null);
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const pendingFlagRef = useRef<{ stepIndex: number | null; stepText: string | null } | null>(null);

  // Load checkbox state + student name on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) setCompleted(new Set(JSON.parse(stored)));
    } catch {}
    try {
      const name = localStorage.getItem(STUDENT_NAME_KEY);
      if (name) setStudentName(name);
    } catch {}
  }, [storageKey]);

  // Hydrate flags when we have a student name
  useEffect(() => {
    if (!studentName) return;
    fetch(`/api/flags?student=${encodeURIComponent(studentName)}&video=${encodeURIComponent(videoId)}`)
      .then((r) => r.json())
      .then((rows: Array<{ id: string; step_index: number | null }>) => {
        const map: FlagMap = new Map();
        for (const row of rows) {
          const key = row.step_index !== null ? row.step_index : 'video';
          map.set(key, row.id);
        }
        setFlagMap(map);
      })
      .catch(() => {});
  }, [studentName, videoId]);

  const toggle = useCallback((index: number) => {
    setCompleted(prev => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
        setRecentlyCompleted(rc => new Set(rc).add(index));
        setTimeout(() => setRecentlyCompleted(rc => {
          const n = new Set(rc);
          n.delete(index);
          return n;
        }), 400);
      }
      try { localStorage.setItem(storageKey, JSON.stringify([...next])); } catch {}
      return next;
    });
  }, [storageKey]);

  const saveName = useCallback((name: string) => {
    setStudentName(name);
    try { localStorage.setItem(STUDENT_NAME_KEY, name); } catch {}
    setShowNamePrompt(false);
    // If there was a pending flag action, execute it now
    if (pendingFlagRef.current) {
      const { stepIndex, stepText } = pendingFlagRef.current;
      pendingFlagRef.current = null;
      doFlag(name, stepIndex, stepText);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, videoTitle, examYear]);

  const doFlag = useCallback(async (name: string, stepIndex: number | null, stepText: string | null) => {
    const key = stepIndex !== null ? stepIndex : 'video';
    const existingId = flagMap.get(key);

    if (existingId) {
      // Unflag
      await fetch(`/api/flags?id=${existingId}`, { method: 'DELETE' });
      setFlagMap(prev => { const next = new Map(prev); next.delete(key); return next; });
    } else {
      // Flag
      const res = await fetch('/api/flags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          student_name: name,
          video_id: videoId,
          video_title: videoTitle,
          exam_year: examYear,
          step_index: stepIndex,
          step_text: stepText,
        }),
      });
      const row = await res.json();
      if (row.id) {
        setFlagMap(prev => { const next = new Map(prev); next.set(key, row.id); return next; });
      }
    }
  }, [flagMap, videoId, videoTitle, examYear]);

  const handleFlagClick = useCallback((stepIndex: number | null, stepText: string | null) => {
    if (!studentName) {
      pendingFlagRef.current = { stepIndex, stepText };
      setShowNamePrompt(true);
      return;
    }
    doFlag(studentName, stepIndex, stepText);
  }, [studentName, doFlag]);

  const hasBullets = items.length > 0;

  return (
    <div>
      {/* Name prompt or identity label */}
      {showNamePrompt && (
        <NamePrompt onSave={saveName} onCancel={() => { setShowNamePrompt(false); pendingFlagRef.current = null; }} />
      )}
      {studentName && !showNamePrompt && flagMap.size > 0 && (
        <p className="text-[10px] text-[var(--foreground)]/40 mb-1">
          Flagging as <strong className="text-[var(--foreground)]/60">{studentName}</strong>{' '}
          <button onClick={() => setShowNamePrompt(true)} className="underline hover:text-[var(--foreground)]/60 cursor-pointer">Change</button>
        </p>
      )}

      {hasBullets && (
        <>
          <div className="flex items-center justify-between mb-2">
            <span className="block text-[10px] font-semibold uppercase tracking-wider" style={{ color: '#C5A855' }}>
              Steps
            </span>
            <span className={`text-[10px] font-medium ${completed.size === items.length ? 'text-emerald-500' : 'text-[var(--foreground)]/40'}`}>
              {completed.size}/{items.length} completed
            </span>
          </div>
          <ul className="space-y-1">
            {items.map((item, i) => {
              const isDone = completed.has(i);
              const showGlow = recentlyCompleted.has(i);
              const isFlagged = flagMap.has(i);

              return (
                <li key={i} className="flex items-start gap-2.5 group">
                  {/* Checkbox with glow */}
                  <button
                    onClick={() => toggle(i)}
                    className="relative mt-0.5 shrink-0 flex items-center justify-center w-5 h-5 rounded-full border-2 cursor-pointer"
                    style={{
                      borderColor: isDone ? '#C5A855' : 'rgba(0,0,0,0.15)',
                      backgroundColor: isDone ? '#C5A855' : 'transparent',
                      transition: 'background-color 0.15s, border-color 0.15s',
                    }}
                  >
                    {isDone && <Check className="w-3 h-3 text-white" strokeWidth={3} />}
                    {showGlow && (
                      <svg
                        className="absolute inset-0 w-5 h-5 pointer-events-none"
                        style={{ animation: 'glow-pulse 400ms ease-out forwards' }}
                        viewBox="0 0 20 20"
                      >
                        <circle cx="10" cy="10" r="8" fill="none" stroke="#C5A855" strokeWidth="2" />
                      </svg>
                    )}
                  </button>

                  {/* Text */}
                  <span
                    className="flex-1 text-sm leading-snug"
                    style={{
                      textDecoration: isDone ? 'line-through' : 'none',
                      opacity: isDone ? 0.4 : 0.7,
                      color: 'var(--foreground)',
                      transition: 'opacity 0.2s ease',
                    }}
                  >
                    {item}
                  </span>

                  {/* Per-step flag icon */}
                  <button
                    onClick={() => handleFlagClick(i, item)}
                    title={isFlagged ? 'Remove help flag' : 'Flag for help'}
                    className={`mt-0.5 shrink-0 cursor-pointer transition-opacity ${
                      isFlagged ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 max-md:opacity-60'
                    }`}
                  >
                    <HelpCircle
                      className={`w-4 h-4 ${isFlagged ? 'text-rose-500' : 'text-[var(--foreground)]/30 hover:text-[var(--foreground)]/50'}`}
                      strokeWidth={isFlagged ? 2.5 : 1.5}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
        </>
      )}

      {/* Per-video flag button */}
      <button
        onClick={() => handleFlagClick(null, null)}
        className={`mt-3 flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg cursor-pointer transition-colors ${
          flagMap.has('video')
            ? 'bg-rose-500/10 text-rose-500'
            : 'bg-black/5 text-[var(--foreground)]/50 hover:bg-black/10 hover:text-[var(--foreground)]/70'
        }`}
      >
        <Flag className="w-3.5 h-3.5" fill={flagMap.has('video') ? 'currentColor' : 'none'} />
        {flagMap.has('video') ? 'Help requested' : 'I need help with this question'}
      </button>
    </div>
  );
}

function VideoCard({ video, examYear }: { video: Video; examYear: string }) {
  const hasBullets = video.bulletPoints.length > 0;
  const hasDescription = video.description.length > 0;
  const config = video.difficulty ? difficultyConfig[video.difficulty] : null;

  return (
    <div className={`bg-[var(--card-bg)] rounded-2xl shadow-lg overflow-hidden card-hover border border-black/5 ${config ? config.border : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left side — text content */}
        <div className="p-6 md:p-8 flex flex-col justify-start">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              {video.title}
            </h2>
            {video.nationalAvgPct != null && config && (
              <span className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-black/5 ${config.text}`}>
                National avg: {Math.round(video.nationalAvgPct)}%
              </span>
            )}
          </div>

          {video.examinerComment && (
            <div className="mb-3">
              <span className="block text-[10px] font-semibold uppercase tracking-wider mb-0.5" style={{ color: '#C5A855' }}>
                Examiner&apos;s Report
              </span>
              <p className="text-sm italic text-[var(--foreground)]/60 leading-relaxed">
                &ldquo;{video.examinerComment}&rdquo;
              </p>
            </div>
          )}

          <TodoChecklist videoId={video.id} items={video.bulletPoints} videoTitle={video.title} examYear={examYear} />
          {!hasBullets && hasDescription && (
            <p className="text-[var(--foreground)]/60 -mt-3">{video.description}</p>
          )}
        </div>

        {/* Right side — 16:9 YouTube embed */}
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0&modestbranding=1`}
            title={video.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="border-0"
          />
        </div>
      </div>
    </div>
  );
}

export default function VideoLibraryClient() {
  const [activeYear, setActiveYear] = useState<ExamYear>(sortedYears[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = useMemo(() => {
    if (!searchQuery.trim()) return activeYear.videos;
    const q = searchQuery.toLowerCase();
    return activeYear.videos.filter(
      (v) =>
        v.title.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.bulletPoints.some((bp) => bp.toLowerCase().includes(q))
    );
  }, [activeYear, searchQuery]);

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 pb-6 pt-24 md:px-10 md:pb-10">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl text-[var(--foreground)] tracking-wide mb-1">
              EXAM WALKTHROUGHS
            </h1>
            <p className="text-[var(--foreground)]/60">
              Past paper production question walkthroughs
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--foreground)]/40" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-black/10 rounded-lg bg-[var(--card-bg)] text-sm text-[var(--foreground)] placeholder:text-[var(--foreground)]/40 focus:ring-2 focus:ring-[#C5A855] focus:border-[#C5A855] outline-none"
            />
          </div>
        </div>

        {/* Difficulty legend */}
        <DifficultyLegend />

        <div className="flex flex-col md:flex-row gap-8">
          {/* Vertical year tabs — desktop */}
          <nav className="hidden md:flex flex-col gap-1 w-48 shrink-0">
            {sortedYears.map((year, i) => {
              const isActive = activeYear.label === year.label;
              const prevYear = sortedYears[i - 1];
              const showDivider = prevYear && prevYear.level !== year.level;
              return (
                <div key={year.label}>
                  {showDivider && (
                    <div className="flex items-center gap-3 my-3 px-1">
                      <hr className="flex-1 border-t border-[#C5A855]/30" />
                      <span className="text-[10px] font-semibold tracking-widest text-[#C5A855]/60 uppercase">AS</span>
                      <hr className="flex-1 border-t border-[#C5A855]/30" />
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setActiveYear(year);
                      setSearchQuery('');
                    }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[var(--card-bg)] shadow-md border border-black/10'
                        : 'hover:bg-[var(--card-bg)]/60'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`text-lg font-semibold ${
                          isActive
                            ? 'text-[var(--foreground)]'
                            : 'text-[var(--foreground)]/50'
                        }`}
                      >
                        {year.label}
                      </span>
                      <LevelBadge level={year.level} />
                    </span>
                    <span className="block text-xs text-[var(--foreground)]/40 mt-0.5">
                      {year.videos.length} video{year.videos.length !== 1 ? 's' : ''}
                    </span>
                  </button>
                </div>
              );
            })}
          </nav>

          {/* Horizontal year tabs — mobile */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mt-2">
            {sortedYears.map((year, i) => {
              const isActive = activeYear.label === year.label;
              const prevYear = sortedYears[i - 1];
              const showDivider = prevYear && prevYear.level !== year.level;
              return (
                <div key={year.label} className="flex items-center gap-2 shrink-0">
                  {showDivider && (
                    <div className="w-px h-6 bg-[#C5A855]/40 shrink-0" />
                  )}
                  <button
                    onClick={() => {
                      setActiveYear(year);
                      setSearchQuery('');
                    }}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium shrink-0 transition-colors ${
                      isActive
                        ? 'bg-[var(--card-bg)] shadow border border-black/10 text-[var(--foreground)]'
                        : 'text-[var(--foreground)]/50'
                    }`}
                >
                  {year.label}
                  <LevelBadge level={year.level} />
                </button>
                </div>
              );
            })}
          </div>

          {/* Video cards */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col gap-8">
              {filteredVideos.length === 0 && (
                <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-10 text-center text-[var(--foreground)]/40">
                  No videos found{searchQuery && ' matching your search'}.
                </div>
              )}

              {filteredVideos.map((video) => (
                <VideoCard key={video.id} video={video} examYear={activeYear.label} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
