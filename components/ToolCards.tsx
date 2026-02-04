'use client';

import { ArrowRight, Headphones, FileQuestion, Play, LucideIcon } from 'lucide-react';
import { useId } from 'react';

interface Tool {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
}

const tools: Tool[] = [
  {
    title: 'LEARNING TOOLS',
    description: 'Interactive practice for octaves, periods, and more',
    href: 'https://interactive-resources-eight.vercel.app',
    icon: Headphones,
  },
  {
    title: 'ASSESSMENTS',
    description: 'Quizzes and practice papers for exam prep',
    href: 'https://waveform-assessment.vercel.app',
    icon: FileQuestion,
  },
  {
    title: 'VIDEO LESSONS',
    description: 'Watch educational videos on key topics',
    href: 'https://remotion-player-site.vercel.app',
    icon: Play,
  },
];

function GradientIcon({ icon: Icon, size = 72, strokeWidth = 1.2 }: { icon: LucideIcon; size?: number; strokeWidth?: number }) {
  const gradientId = useId();

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Hidden SVG with gradient definition - muted colors to match ribbon */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D4927A" />
            <stop offset="20%" stopColor="#D4BC8A" />
            <stop offset="40%" stopColor="#C8909A" />
            <stop offset="60%" stopColor="#A89BC8" />
            <stop offset="80%" stopColor="#8AB4C8" />
            <stop offset="100%" stopColor="#D4A08A" />
          </linearGradient>
        </defs>
      </svg>

      {/* Icon with gradient stroke */}
      <Icon
        size={size}
        strokeWidth={strokeWidth}
        stroke={`url(#${gradientId})`}
      />
    </div>
  );
}

export default function ToolCards() {
  return (
    <section className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[var(--background)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl sm:text-5xl text-[var(--foreground)] tracking-wide mb-4">
            GET STARTED
          </h2>
          <p className="text-lg text-[var(--foreground)]/60 max-w-xl mx-auto">
            Jump straight to what you need
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {tools.map((tool) => (
            <a
              key={tool.title}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-[var(--card-bg)] rounded-2xl p-10 card-hover border border-black/5 hover:border-black/10 h-full"
            >
              <div className="relative flex flex-col items-center text-center h-full">
                {/* Icon with iridescent gradient */}
                <div className="mb-8 group-hover:scale-110 transition-transform duration-300">
                  <GradientIcon icon={tool.icon} size={72} strokeWidth={1.2} />
                </div>

                {/* Title */}
                <h3 className="font-display text-2xl text-[var(--foreground)] tracking-wide mb-3">
                  {tool.title}
                </h3>

                {/* Description */}
                <p className="text-[var(--foreground)]/60 flex-grow">
                  {tool.description}
                </p>

                {/* Arrow - always at bottom */}
                <div className="flex items-center gap-2 font-medium iridescent-text group-hover:gap-3 transition-all duration-300 mt-6">
                  <span>Open</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
