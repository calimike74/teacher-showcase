import ProjectCard from '@/components/ProjectCard';
import { projects } from '@/lib/projects';

export const metadata = {
  title: 'Projects | Teacher Showcase',
  description: 'Educational tools built with Claude Code for A-Level Music Technology.',
};

export default function ProjectsPage() {
  return (
    <div className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Three production tools built for my A-Level Music Technology classes.
            Each started as a conversation with Claude Code.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} variant="full" />
          ))}
        </div>

        {/* Context */}
        <div className="mt-16 p-6 bg-gray-50 rounded-xl">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Development Context</h2>
          <p className="text-gray-600 mb-4">
            These projects were built over several weeks of part-time development alongside
            full-time teaching. The total cost for hosting is £0 - Vercel and Supabase
            free tiers handle everything for school-sized usage.
          </p>
          <p className="text-gray-600">
            Each project evolved through iteration: start with something simple, get student
            feedback, add features. Claude Code makes this approach practical because changes
            are fast and low-risk.
          </p>
        </div>
      </div>
    </div>
  );
}
