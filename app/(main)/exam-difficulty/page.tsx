import type { Metadata } from 'next';
import ExamDifficultyClient from './ExamDifficultyClient';

export const metadata: Metadata = {
  title: 'How hard is an A* in Music Technology? | Music Tech Studio',
  description:
    'See where A-level Music Technology ranks for difficulty against every other Pearson Edexcel A-level. Only 1 in 27 students were awarded A* in 2025.',
  openGraph: {
    title: 'How hard is an A* in Music Technology?',
    description:
      'Only 1 in 27 students were awarded A* in 2025. See where Music Tech sits against every other A-level.',
    type: 'article',
  },
};

export default function Page() {
  return <ExamDifficultyClient />;
}
