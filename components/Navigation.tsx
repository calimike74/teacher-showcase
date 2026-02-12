'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Music } from 'lucide-react';

const navLinks = [
  { href: 'https://grades-dashboard.vercel.app', label: 'Grades', external: true },
  { href: 'https://interactive-resources-eight.vercel.app', label: 'Resources', external: true },
  { href: 'https://waveform-assessment.vercel.app', label: 'Assessments', external: true },
];

export default function Navigation({ logoSrc }: { logoSrc?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#FF6B35]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[#2D2D2D] dark:text-[#FAFAFA]">
              {logoSrc ? (
                <Image src={logoSrc} alt="Music Tech Hub" width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A89BC8] via-[#C8909A] to-[#D4BC8A] flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="hidden sm:inline">Music Tech Hub</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg text-sm font-medium text-[#2D2D2D] dark:text-[#FAFAFA] hover:bg-[#FF6B35]/10 hover:text-[#FF6B35] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#2D2D2D] dark:text-[#FAFAFA] hover:bg-[#FF6B35]/10"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#FF6B35]/10 bg-white dark:bg-[#1A1A1A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-2 rounded-lg text-sm font-medium text-[#2D2D2D] dark:text-[#FAFAFA] hover:bg-[#FF6B35]/10 hover:text-[#FF6B35]"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
