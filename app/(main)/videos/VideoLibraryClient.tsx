'use client';

import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { examYears } from '@/lib/video-data';
import type { ExamYear, Video, Difficulty } from '@/lib/video-data';

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

function VideoCard({ video }: { video: Video }) {
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

          {hasBullets ? (
            <ul className="space-y-1.5 text-[var(--foreground)]/70 text-sm list-disc list-inside">
              {video.bulletPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          ) : hasDescription ? (
            <p className="text-[var(--foreground)]/60">{video.description}</p>
          ) : null}
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
    <div className="min-h-screen bg-[var(--background)] p-6 md:p-10">
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
            {sortedYears.map((year) => {
              const isActive = activeYear.label === year.label;
              return (
                <button
                  key={year.label}
                  onClick={() => {
                    setActiveYear(year);
                    setSearchQuery('');
                  }}
                  className={`text-left px-4 py-3 rounded-lg transition-colors ${
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
              );
            })}
          </nav>

          {/* Horizontal year tabs — mobile */}
          <div className="md:hidden flex gap-2 overflow-x-auto pb-2 -mt-2">
            {sortedYears.map((year) => {
              const isActive = activeYear.label === year.label;
              return (
                <button
                  key={year.label}
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
                <VideoCard key={video.id} video={video} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
