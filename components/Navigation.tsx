'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { Menu, X, Music } from 'lucide-react';

const navLinks = [
  { href: 'https://grades.musictechstudio.co.uk', label: 'Grades', external: true },
  { href: 'https://resources.musictechstudio.co.uk', label: 'Resources', external: true },
  { href: 'https://grades.musictechstudio.co.uk/practice', label: 'Assessments', external: true },
  { href: '/videos', label: 'Walkthroughs', external: false },
  { href: 'https://bookings.musictechstudio.co.uk', label: 'Bookings', external: true },
  { href: 'https://publish.obsidian.md/a-level-music-tech-sherborne/a-level-music-tech-sherborne', label: 'Obsidian', external: true },
];

export default function Navigation({ logoSrc }: { logoSrc?: string } = {}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navShellRef = useRef<HTMLElement>(null);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    // Chromium handles the morph natively via @container scroll-state — skip JS there.
    if (CSS.supports('container-type', 'scroll-state')) return;
    const el = navShellRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setStuck(e.intersectionRatio < 1),
      { threshold: [1], rootMargin: '-1px 0px 0px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Native scroll-state morph (Chromium). Injected raw so Lightning CSS can't strip it.
          Safari/Firefox use the .is-stuck JS fallback in globals.css instead. */}
      <style dangerouslySetInnerHTML={{ __html: `
        @container scroll-state(stuck: top) {
          .nav-bar {
            max-width: 70rem; margin: .5rem auto 0; border-radius: .75rem;
            border-bottom-color: transparent;
            background-color: rgb(255 255 255 / 0.92);
            box-shadow: 0 8px 30px rgb(0 0 0 / 0.08);
          }
        }
        @media (prefers-color-scheme: dark) {
          @container scroll-state(stuck: top) {
            .nav-bar { background-color: rgb(26 26 26 / 0.92); }
          }
        }
      ` }} />
      <nav ref={navShellRef} className={`nav-shell sticky top-0 z-50 ${stuck ? 'is-stuck' : ''}`}>
      <div className="nav-bar bg-white/80 dark:bg-[#1A1A1A]/80 backdrop-blur-md border-b border-[#FF6B35]/10 transition-all duration-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 font-semibold text-[#2D2D2D] dark:text-[#FAFAFA]">
              {logoSrc ? (
                <Image src={logoSrc} alt="Music Tech Studio" width={32} height={32} className="w-8 h-8 rounded-lg object-cover" />
              ) : (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A89BC8] via-[#C8909A] to-[#D4BC8A] flex items-center justify-center">
                  <Music className="w-5 h-5 text-white" />
                </div>
              )}
              <span className="hidden sm:inline">Music Tech Studio</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external !== false ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#FF6B35]/10 bg-white dark:bg-[#1A1A1A]">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                {...(link.external !== false ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
    </>
  );
}
