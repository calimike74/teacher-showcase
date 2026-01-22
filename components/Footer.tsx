import { Sparkles, Github, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 font-semibold text-gray-900 mb-3">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span>Teacher Showcase</span>
            </div>
            <p className="text-sm text-gray-600">
              Educational tools built with Claude Code. Helping teachers discover what&apos;s possible with AI-assisted development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/getting-started" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Getting Started Guide
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-gray-600 hover:text-purple-600 transition-colors">
                  View Projects
                </Link>
              </li>
              <li>
                <Link href="/workflow" className="text-gray-600 hover:text-purple-600 transition-colors">
                  Development Workflow
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://claude.ai/code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center gap-1"
                >
                  Claude Code <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center gap-1"
                >
                  Vercel <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a
                  href="https://supabase.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-purple-600 transition-colors inline-flex items-center gap-1"
                >
                  Supabase <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          <p>Built with Claude Code by a Music Technology teacher</p>
        </div>
      </div>
    </footer>
  );
}
