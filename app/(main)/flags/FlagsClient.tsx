'use client';

import { useState, useEffect } from 'react';
import { Check, RotateCcw } from 'lucide-react';

interface HelpFlag {
  id: string;
  student_name: string;
  video_id: string;
  video_title: string;
  exam_year: string;
  step_index: number | null;
  step_text: string | null;
  resolved: boolean;
  created_at: string;
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function FlagsClient() {
  const [flags, setFlags] = useState<HelpFlag[]>([]);
  const [loading, setLoading] = useState(true);
  const [hideResolved, setHideResolved] = useState(true);
  const [yearFilter, setYearFilter] = useState<string>('all');

  useEffect(() => {
    fetch('/api/flags')
      .then(r => r.json())
      .then(data => { setFlags(data); setLoading(false); });
  }, []);

  const resolve = async (id: string, resolved: boolean) => {
    await fetch('/api/flags', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, resolved }),
    });
    setFlags(prev => prev.map(f => f.id === id ? { ...f, resolved } : f));
  };

  const visible = flags
    .filter(f => !hideResolved || !f.resolved)
    .filter(f => yearFilter === 'all' || f.exam_year === yearFilter);

  const years = [...new Set(flags.map(f => f.exam_year))];

  const grouped = visible.reduce<Record<string, Record<string, HelpFlag[]>>>((acc, f) => {
    if (!acc[f.exam_year]) acc[f.exam_year] = {};
    if (!acc[f.exam_year][f.video_title]) acc[f.exam_year][f.video_title] = [];
    acc[f.exam_year][f.video_title].push(f);
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-[var(--background)] px-6 pb-6 pt-24 text-center">
        <p className="text-[var(--foreground)]/60 text-lg mt-20">Loading flags...</p>
      </div>
    );
  }

  const unresolvedCount = flags.filter(f => !f.resolved).length;

  return (
    <div className="min-h-screen bg-[var(--background)] px-6 pb-6 pt-24 md:px-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="font-display text-4xl text-[var(--foreground)] tracking-wide">HELP FLAGS</h1>
            <p className="text-sm text-[var(--foreground)]/50 mt-1">
              {unresolvedCount} unresolved flag{unresolvedCount !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <label className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 cursor-pointer">
            <input
              type="checkbox"
              checked={hideResolved}
              onChange={e => setHideResolved(e.target.checked)}
              className="accent-[#C5A855]"
            />
            Hide resolved
          </label>
          {years.length > 1 && (
            <select
              value={yearFilter}
              onChange={e => setYearFilter(e.target.value)}
              className="text-sm border border-black/10 rounded-lg px-3 py-1.5 bg-[var(--card-bg)] text-[var(--foreground)]"
            >
              <option value="all">All years</option>
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
          )}
        </div>

        {visible.length === 0 && (
          <div className="bg-[var(--card-bg)] rounded-2xl shadow-lg p-10 text-center text-[var(--foreground)]/40">
            {flags.length === 0
              ? 'No flags — your students are doing great'
              : 'No matching flags'}
          </div>
        )}

        {Object.entries(grouped).map(([year, videos]) => (
          <div key={year} className="mb-8">
            <h2 className="text-lg font-semibold text-[var(--foreground)] mb-3">{year}</h2>
            {Object.entries(videos).map(([title, vFlags]) => (
              <div key={title} className="mb-4">
                <h3 className="text-sm font-medium text-[var(--foreground)]/70 mb-2">{title}</h3>
                <div className="space-y-2">
                  {vFlags.map(f => (
                    <div
                      key={f.id}
                      className={`flex items-start justify-between gap-4 p-3 rounded-lg border transition-opacity ${
                        f.resolved
                          ? 'bg-[var(--card-bg)]/50 border-black/5 opacity-50'
                          : 'bg-[var(--card-bg)] border-black/10'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="font-medium text-[var(--foreground)]">{f.student_name}</span>
                        <span className="text-[var(--foreground)]/50 text-sm ml-2">
                          {f.step_text ? `Step ${(f.step_index ?? 0) + 1}: ${f.step_text}` : 'Entire question'}
                        </span>
                        <span className="block text-xs text-[var(--foreground)]/40 mt-0.5">
                          {timeAgo(f.created_at)}
                        </span>
                      </div>
                      <button
                        onClick={() => resolve(f.id, !f.resolved)}
                        className="shrink-0 p-1.5 rounded-lg hover:bg-black/5 cursor-pointer"
                        title={f.resolved ? 'Unresolve' : 'Resolve'}
                      >
                        {f.resolved ? <RotateCcw className="w-4 h-4 text-[var(--foreground)]/40" /> : <Check className="w-4 h-4 text-emerald-500" />}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
