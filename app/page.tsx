import { ChevronDown } from 'lucide-react';
import MobiusRibbon from '@/components/MobiusRibbon';
import ToolCards from '@/components/ToolCards';
import TopicTicker from '@/components/TopicTicker';

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full viewport with Mobius ribbon */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated ribbon background */}
        <MobiusRibbon />

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 pt-16">
          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-[#2D2D2D] tracking-wider mb-4 whitespace-nowrap">
            MUSIC TECHNOLOGY
          </h1>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#2D2D2D]/70 tracking-wider mb-8">
            A-LEVEL
          </h2>
          <p className="text-xl sm:text-2xl text-[#2D2D2D]/60 font-light max-w-2xl mx-auto mb-8">
            Your learning hub
          </p>
        </div>

        {/* Scrolling curriculum topics - positioned near bottom */}
        <div className="absolute bottom-20 left-0 right-0 z-10">
          <TopicTicker />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#2D2D2D]/50 scroll-indicator">
          <ChevronDown className="w-8 h-8" />
        </div>
      </section>

      {/* Navigation Cards Section */}
      <ToolCards />
    </div>
  );
}
