export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  url: string;
  features: string[];
  techStack: string[];
  audience: string;
  status: 'active' | 'development';
}

export const projects: Project[] = [
  {
    id: 'grades-dashboard',
    title: 'Grades Dashboard',
    description: 'Track student progress with visual analytics, risk scoring, and parent conference tools.',
    longDescription: 'A comprehensive grade tracking system that transforms raw CSV data into actionable insights. Features include weekly progress charts, internal exam analysis, predictive risk scoring, and a dedicated parents evening quick-lookup interface.',
    url: 'https://grades-dashboard.vercel.app',
    features: [
      'Weekly progress tracking with trend analysis',
      'Internal exam performance breakdown',
      'Predictive risk scoring with intervention recommendations',
      'Parents evening quick student lookup',
      'Secure student-specific links for self-checking',
      'CSV upload with automatic Supabase sync'
    ],
    techStack: ['Next.js', 'Supabase', 'Recharts', 'Tailwind CSS'],
    audience: 'Teachers and Students',
    status: 'active'
  },
  {
    id: 'waveform-assessment',
    title: 'Assessment Hub',
    description: 'AI-powered assessment platform with visual verification and instant feedback.',
    longDescription: 'An interactive assessment platform that uses Claude Vision API to automatically mark student work from screenshots. Students upload their DAW screenshots, the AI analyzes them against rubrics, and provides detailed feedback with visual annotations.',
    url: 'https://waveform-assessment.vercel.app',
    features: [
      'AI-powered marking using Claude Vision',
      'Visual verification with annotated feedback',
      'Multiple assessment types (synthesis, mixing, etc.)',
      'Teacher dashboard for reviewing submissions',
      'CSV export for grade management',
      'Student onboarding with class codes'
    ],
    techStack: ['Next.js', 'Supabase', 'Claude API', 'Tailwind CSS'],
    audience: 'Students',
    status: 'active'
  },
  {
    id: 'interactive-resources',
    title: 'Interactive Resources',
    description: 'Hands-on learning tools for music technology concepts.',
    longDescription: 'A collection of interactive learning tools that help students understand abstract music technology concepts through hands-on experimentation. Each tool focuses on a specific topic with immediate visual and audio feedback.',
    url: 'https://interactive-resources-eight.vercel.app',
    features: [
      'Octave Period Trainer - visualize frequency relationships',
      'Double Tracking Explorer - understand stereo techniques',
      'Interactive visualizations with real-time feedback',
      'Links to related assessments',
      'Mobile-responsive design'
    ],
    techStack: ['Next.js', 'D3.js', 'Web Audio API', 'Tailwind CSS'],
    audience: 'Students',
    status: 'active'
  }
];
