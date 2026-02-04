import { Music, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[var(--background)] border-t border-[#FF6B35]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-2 text-[var(--foreground)]/60">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-[#A89BC8] via-[#C8909A] to-[#D4BC8A] flex items-center justify-center">
              <Music className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm">Music Technology A-Level Resources</span>
          </div>

          {/* Contact & Credit */}
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/michael-lehnert-9a784790/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-sm text-[var(--foreground)]/60 hover:text-[#A89BC8] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span>Connect</span>
            </a>
            <span className="text-[var(--foreground)]/20">|</span>
            <p className="text-sm text-[var(--foreground)]/40">
              Built with Claude Code
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
