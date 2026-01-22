import Link from 'next/link';
import { ArrowRight, MessageSquare, Code, Eye, Upload, RefreshCw } from 'lucide-react';

export const metadata = {
  title: 'Workflow | Teacher Showcase',
  description: 'How I build educational tools with Claude Code - the iterative development process.',
};

export default function WorkflowPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            My Development Workflow
          </h1>
          <p className="text-xl text-gray-600">
            Building with Claude Code isn&apos;t like traditional coding. It&apos;s more like
            having a conversation with a very capable assistant.
          </p>
        </div>

        {/* The Cycle */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">The Build Cycle</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">1. Describe What You Want</h3>
                <p className="text-gray-600">
                  I start by explaining the problem in plain English. &quot;Students need to
                  see their grades without me having to send individual emails.&quot; Then I
                  describe the solution I&apos;m imagining.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Code className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">2. Claude Writes Code</h3>
                <p className="text-gray-600">
                  Claude generates the files, explains what each part does, and creates
                  a working version. I review the changes - not the code itself (I don&apos;t
                  need to understand it all), but the description of what changed.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Eye className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">3. Test Locally</h3>
                <p className="text-gray-600">
                  I run the app on my computer and click through everything. Does it look
                  right? Does it behave the way I expected? If not, I describe what&apos;s wrong.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <RefreshCw className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">4. Iterate</h3>
                <p className="text-gray-600">
                  &quot;The button should be on the right side.&quot; &quot;Can we make the chart bigger?&quot;
                  &quot;Add a search box here.&quot; Small requests, one at a time. Claude adjusts.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-teal-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">5. Deploy</h3>
                <p className="text-gray-600">
                  When it works locally, I push to GitHub. Vercel automatically deploys
                  it. Within minutes, students can access the live URL.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What I've Learned */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">What I&apos;ve Learned</h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Start Smaller Than You Think</h3>
              <p className="text-gray-600">
                My first version of the grades dashboard just showed a list of names with
                numbers. No charts, no analysis, no fancy features. I added those later,
                one at a time. Each addition was simple because the foundation was solid.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Errors Are Normal</h3>
              <p className="text-gray-600">
                Something breaks almost every session. I&apos;ve learned to just copy the error
                message and paste it to Claude. &quot;This error appeared: [paste]. What went wrong?&quot;
                Usually fixed in under a minute.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Git Saves You</h3>
              <p className="text-gray-600">
                Committing after each working feature means I can always go back. When a
                big change breaks something fundamental, I just revert and try a different
                approach. No panic.
              </p>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-2">Domain Knowledge Matters Most</h3>
              <p className="text-gray-600">
                Claude doesn&apos;t know what makes a good music technology assessment tool.
                I do. The technical skills are Claude&apos;s job; knowing what to build is mine.
              </p>
            </div>
          </div>
        </section>

        {/* Time Investment */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Realistic Time Investment</h2>
          <p className="text-gray-600 mb-4">
            I work on these projects in evenings and weekends, maybe 5-10 hours per week
            when actively developing. Here&apos;s roughly how the time breaks down:
          </p>
          <ul className="space-y-2 text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span><strong>First working version:</strong> A few hours per project</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span><strong>Iteration and polish:</strong> Most of the time goes here</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
              <span><strong>Bug fixes:</strong> Ongoing, usually quick</span>
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="p-6 bg-teal-50 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Want to Try It?</h2>
          <p className="text-gray-600 mb-4">
            The Getting Started guide has everything you need: prerequisites, first project
            ideas, example prompts, and common pitfalls to avoid.
          </p>
          <Link
            href="/getting-started"
            className="inline-flex items-center gap-2 text-teal-600 font-medium hover:text-teal-700"
          >
            Get Started <ArrowRight className="w-4 h-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
