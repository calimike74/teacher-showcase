import { ExternalLink, Users } from 'lucide-react';
import type { Project } from '@/lib/projects';

interface ProjectCardProps {
  project: Project;
  variant?: 'compact' | 'full';
}

export default function ProjectCard({ project, variant = 'compact' }: ProjectCardProps) {
  if (variant === 'compact') {
    return (
      <a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 bg-white rounded-xl border border-gray-200 hover:border-teal-300 hover:shadow-lg transition-all"
      >
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
            {project.title}
          </h3>
          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-teal-500 transition-colors" />
        </div>
        <p className="text-sm text-gray-600 mb-4">{project.description}</p>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Users className="w-3 h-3" />
          <span>{project.audience}</span>
        </div>
      </a>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900">{project.title}</h3>
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            project.status === 'active'
              ? 'bg-green-100 text-green-700'
              : 'bg-yellow-100 text-yellow-700'
          }`}>
            {project.status === 'active' ? 'Live' : 'In Development'}
          </span>
        </div>
        <p className="text-gray-600">{project.longDescription}</p>
      </div>

      {/* Features */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">Key Features</h4>
        <ul className="space-y-2">
          {project.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-rose-500 mt-1">•</span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      {/* Tech Stack */}
      <div className="p-6 border-b border-gray-100">
        <h4 className="font-medium text-gray-900 mb-3">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 bg-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Users className="w-4 h-4" />
          <span>{project.audience}</span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600 text-white text-sm font-medium rounded-lg hover:bg-teal-700 transition-colors"
        >
          Visit Site <ExternalLink className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
}
