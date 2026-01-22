import Link from 'next/link';
import { CheckCircle, AlertCircle, Lightbulb, ArrowRight, ExternalLink } from 'lucide-react';

export const metadata = {
  title: 'Getting Started | Teacher Showcase',
  description: 'A practical guide for teachers who want to build educational tools with Claude Code.',
};

export default function GettingStartedPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Getting Started with Claude Code
          </h1>
          <p className="text-xl text-gray-600">
            A practical guide for teachers who want to build their own educational tools.
            No coding experience required.
          </p>
        </div>

        {/* Prerequisites */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Prerequisites</h2>
          <p className="text-gray-600 mb-6">
            Before you start, you&apos;ll need a few free accounts. Don&apos;t worry about setting
            everything up perfectly - Claude Code will guide you through the details.
          </p>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">GitHub Account</h3>
                <p className="text-sm text-gray-600">
                  For storing your code. Free at{' '}
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    github.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Vercel Account</h3>
                <p className="text-sm text-gray-600">
                  For hosting your apps. Free tier is generous. Sign up at{' '}
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    vercel.com
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Claude Pro Subscription</h3>
                <p className="text-sm text-gray-600">
                  Claude Code requires a Claude Pro subscription ($20/month) at{' '}
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    claude.ai
                  </a>
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Supabase Account (Optional)</h3>
                <p className="text-sm text-gray-600">
                  Only needed if your app stores data. Free tier at{' '}
                  <a href="https://supabase.com" target="_blank" rel="noopener noreferrer" className="text-teal-600 hover:underline">
                    supabase.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* First Project Ideas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Good First Projects</h2>
          <p className="text-gray-600 mb-6">
            Start small. These project types work well for beginners:
          </p>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Interactive Quiz</h3>
              <p className="text-sm text-gray-600">
                Multiple choice questions on your subject. Shows immediate feedback.
                No database needed - questions can be stored in the code.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Resource Hub</h3>
              <p className="text-sm text-gray-600">
                A single page linking to all your class resources, sorted by topic.
                Replace that Google Doc of links.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Visual Calculator</h3>
              <p className="text-sm text-gray-600">
                Convert between units, calculate formulas, show visual representations.
                Great for maths, science, music theory.
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-1">Study Timer</h3>
              <p className="text-sm text-gray-600">
                Pomodoro-style timer with your subject&apos;s topics as task labels.
                Simple but immediately useful.
              </p>
            </div>
          </div>
        </section>

        {/* Example Prompts */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Example Prompts That Work</h2>
          <p className="text-gray-600 mb-6">
            Here&apos;s how to talk to Claude Code. Be specific about what you want:
          </p>
          <div className="space-y-4">
            <div className="p-4 bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-300 font-mono">
                &quot;Create a Next.js app with a single page that shows 10 multiple choice
                questions about photosynthesis. When the user clicks an answer, show
                green for correct or red for incorrect. At the end, show their score.&quot;
              </p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-300 font-mono">
                &quot;I want a simple tool where students can type in a frequency in Hz and
                it shows them the musical note name and which octave it&apos;s in. Include
                a visual keyboard highlighting the note.&quot;
              </p>
            </div>
            <div className="p-4 bg-gray-900 rounded-lg">
              <p className="text-sm text-gray-300 font-mono">
                &quot;Build a flashcard app for French vocabulary. Store 20 words in the code.
                Show the French word, let the user click to reveal the English translation,
                then click again for the next card. Track how many they got right.&quot;
              </p>
            </div>
          </div>
        </section>

        {/* Pitfalls */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Common Pitfalls</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Starting Too Big</h3>
                <p className="text-sm text-gray-600">
                  Don&apos;t try to build a full learning management system on day one.
                  Start with one specific feature that solves one specific problem.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Vague Requests</h3>
                <p className="text-sm text-gray-600">
                  &quot;Make me a good app&quot; won&apos;t work. Be specific: what does it show,
                  what can users click, what happens when they click it?
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Not Testing Locally</h3>
                <p className="text-sm text-gray-600">
                  Always run <code className="bg-gray-200 px-1 rounded">npm run dev</code> and
                  check your app in the browser before deploying. Fix issues while
                  they&apos;re easy to find.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-red-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Ignoring Errors</h3>
                <p className="text-sm text-gray-600">
                  When something breaks, copy the error message and paste it to Claude.
                  It will explain what went wrong and how to fix it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Tips */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Success</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Iterate Quickly</h3>
                <p className="text-sm text-gray-600">
                  Get something working first, then improve it. Perfect is the enemy of
                  deployed. You can always add features later.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Ask Claude to Explain</h3>
                <p className="text-sm text-gray-600">
                  Say &quot;explain what this code does&quot; whenever you&apos;re confused.
                  Understanding builds confidence for future projects.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Commit Often</h3>
                <p className="text-sm text-gray-600">
                  After each working feature, commit to git. This lets you roll back
                  if something breaks later.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-4 bg-teal-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-medium text-gray-900">Use What Students Already Know</h3>
                <p className="text-sm text-gray-600">
                  Design with familiar patterns. If it looks like apps they use daily,
                  there&apos;s less to explain.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Helpful Resources</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <a
              href="https://docs.anthropic.com/en/docs/claude-code"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Claude Code Docs</h3>
                <p className="text-sm text-gray-600">Official documentation</p>
              </div>
            </a>
            <a
              href="https://nextjs.org/learn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Next.js Tutorial</h3>
                <p className="text-sm text-gray-600">Learn the framework basics</p>
              </div>
            </a>
            <a
              href="https://vercel.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Vercel Deployment</h3>
                <p className="text-sm text-gray-600">How to deploy your apps</p>
              </div>
            </a>
            <a
              href="https://supabase.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-teal-300 transition-colors"
            >
              <ExternalLink className="w-5 h-5 text-gray-400" />
              <div>
                <h3 className="font-medium text-gray-900">Supabase Docs</h3>
                <p className="text-sm text-gray-600">Database and auth (when ready)</p>
              </div>
            </a>
          </div>
        </section>

        {/* Next Steps */}
        <section className="p-6 bg-teal-50 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Ready to See What&apos;s Possible?</h2>
          <p className="text-gray-600 mb-4">
            Check out the projects I&apos;ve built to see practical examples of what
            Claude Code can create for your classroom.
          </p>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
          >
            View Projects <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
