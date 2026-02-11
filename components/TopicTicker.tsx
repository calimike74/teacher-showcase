'use client';

import { useState } from 'react';

const TOPICS = [
  '1.1 Software and Hardware',
  '1.2 Capture of Sound',
  '1.3 Synthesis',
  '1.4 Sampling',
  '1.5 Sequencing',
  '1.6 Audio Editing',
  '1.7 Pitch and Rhythm Correction',
  '1.8 Automation',
  '1.9 Dynamic Processing',
  '1.10 Stereo',
  '1.11 EQ',
  '1.12 Effects',
  '1.13 Balance and Blend',
  '1.14 Mastering',
  '2.1 Acoustics',
  '2.2 Monitor Speakers',
  '2.3 Leads and Signals',
  '2.4 Digital and Analogue',
  '2.5 Numeracy',
  '2.6 Levels',
];

export default function TopicTicker() {
  const [paused, setPaused] = useState(false);
  // Duplicate for seamless infinite loop
  const doubled = [...TOPICS, ...TOPICS];

  return (
    <div
      className="relative overflow-hidden max-w-3xl mx-auto"
      style={{
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-hidden="true"
    >
      <div
        className="flex gap-3"
        style={{
          width: 'max-content',
          animation: 'tickerScroll 40s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
        }}
      >
        {doubled.map((topic, i) => (
          <span
            key={`${topic}-${i}`}
            className="inline-flex items-center whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium border border-[#2D2D2D]/15 text-[#2D2D2D]/50 bg-white/40 backdrop-blur-sm"
          >
            {topic}
          </span>
        ))}
      </div>
    </div>
  );
}
