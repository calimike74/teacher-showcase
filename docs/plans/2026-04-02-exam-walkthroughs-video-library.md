# Exam Walkthroughs Video Library — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add an "Exam Walkthroughs" page to musictechstudio.co.uk showing YouTube past paper production question walkthrough videos, organised by year, with a new card on the landing page linking to it.

**Architecture:** New `/videos` route under the `(main)` route group (inherits Navigation + Footer). Video data defined as a typed constant. Page adapts the visual style from the grades-dashboard video library prototype (warm `#FFFBF5` background, card-based layout, year tabs). Description area beside each video will hold bullet points (populated from transcripts later).

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind v4, lucide-react (existing stack)

---

### Task 1: Create video data file

**Files:**
- Create: `lib/video-data.ts`

**Step 1: Create the data file with all 40 videos**

```typescript
export interface Video {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
}

export interface ExamYear {
  label: string;
  level: 'A2' | 'AS';
  description: string;
  videos: Video[];
}

export const examYears: ExamYear[] = [
  {
    label: 'A2 2025',
    level: 'A2',
    description: 'A2 production walkthroughs — 2025 paper',
    videos: [
      { id: 'Eev9QORjZtg', title: 'Q1 Guitar', description: '', bulletPoints: [] },
      { id: 'kADrrdmyHrU', title: 'Q2 Drums', description: '', bulletPoints: [] },
      { id: '-UcBYPDBvck', title: 'Q3 Synth', description: '', bulletPoints: [] },
      { id: 'm_2v-CmiXe8', title: 'Q5 Full Mix', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'A2 2023',
    level: 'A2',
    description: 'A2 production walkthroughs — 2023 paper',
    videos: [
      { id: 'l1JCspTEJQo', title: 'Q1c Drums Transcription', description: '', bulletPoints: [] },
      { id: 'KxCn1gIN5nw', title: 'Q2 Synth', description: '', bulletPoints: [] },
      { id: 'kefrtV4WM7k', title: 'Q3 Chorus Synth', description: '', bulletPoints: [] },
      { id: 'uBEBLCW9QSc', title: 'Q4 Vocal Harmony', description: '', bulletPoints: [] },
      { id: 'uhvwb6BwfsQ', title: 'Q5 Final Mix', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'A2 2021',
    level: 'A2',
    description: 'A2 production walkthroughs — 2021 paper',
    videos: [
      { id: 'vKiN9OJrniY', title: 'Q2 Drums', description: '', bulletPoints: [] },
      { id: '3xUHDJfi62I', title: 'Q4 Vocals', description: '', bulletPoints: [] },
      { id: 'wRjYUfViVxs', title: 'Q5 Mix', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'A2 2019',
    level: 'A2',
    description: 'A2 production walkthroughs — 2019 paper',
    videos: [
      { id: 'cHbQx8zgVwc', title: 'Q1c,d,e Bass', description: '', bulletPoints: [] },
      { id: 'SLJgp30sfNQ', title: 'Q2c Drums', description: '', bulletPoints: [] },
      { id: '2pq54GwRbCo', title: 'Q4d Vocal', description: '', bulletPoints: [] },
      { id: '8USjbsjUnyI', title: 'Q5a Reverb on Vocals', description: '', bulletPoints: [] },
      { id: 'cKF3b6rhFr8', title: 'Q5b Snare Echo', description: '', bulletPoints: [] },
      { id: 'pYVe6cZ1T3Q', title: 'Q5c Modulation', description: '', bulletPoints: [] },
      { id: 'POUB6_lOKSM', title: 'Q5d Gate Vocals', description: '', bulletPoints: [] },
      { id: 'tCuDblFL8mc', title: 'Q5e Bass Distortion', description: '', bulletPoints: [] },
      { id: 'J0HMJKJkx30', title: 'Q5f,g Full Mix', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'AS 2023',
    level: 'AS',
    description: 'AS production walkthroughs — 2023 paper',
    videos: [
      { id: 'CFfrVOTEfO4', title: 'Q1 Drums', description: '', bulletPoints: [] },
      { id: 'wYB7D-ZuNfI', title: 'Q3 Bass', description: '', bulletPoints: [] },
      { id: 'gAQ3zqgoKgs', title: 'Q4 Vocal', description: '', bulletPoints: [] },
      { id: 'F67KWFJ0vFc', title: 'Q5a Double Track Vocal', description: '', bulletPoints: [] },
      { id: 'fi8EmnnM0n4', title: 'Q5b Compress Vocal', description: '', bulletPoints: [] },
      { id: '8eRDaQa5Sik', title: 'Q5c Panning Vocal', description: '', bulletPoints: [] },
      { id: '1qlDJuH4AKo', title: 'Q5d Reverb Vocal + Guitar/Keys', description: '', bulletPoints: [] },
      { id: 'PV_vta9n_sw', title: 'Q5e,f,g Mix and Export', description: '', bulletPoints: [] },
      { id: 'a8G9OJjhgbs', title: 'Q3 Bass (alt)', description: '', bulletPoints: [] },
      { id: '-figLWOY2f4', title: 'Q5b Vocal Compression', description: '', bulletPoints: [] },
      { id: 'QD5YUmot34g', title: 'Q5d Vocal Reverb', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'AS 2022',
    level: 'AS',
    description: 'AS production walkthroughs — 2022 paper',
    videos: [
      { id: 'wvjxoZuhA4A', title: 'Q1 Drum', description: '', bulletPoints: [] },
      { id: 'nBphYd1iLiU', title: 'Q5c Vocal Delay', description: '', bulletPoints: [] },
    ],
  },
  {
    label: 'AS 2018',
    level: 'AS',
    description: 'AS production walkthroughs — 2018 paper',
    videos: [
      { id: '09DvLdE9HPE', title: 'Q1 Drums', description: '', bulletPoints: [] },
      { id: '3pv4ik_knP8', title: 'Q2 Bass', description: '', bulletPoints: [] },
      { id: '2sRjegD1OuY', title: 'Q3 Vocal', description: '', bulletPoints: [] },
      { id: '6ukuHJlcC5g', title: 'Q5a Compression', description: '', bulletPoints: [] },
      { id: 'f8jPgmWbw68', title: 'Q5b Delay', description: '', bulletPoints: [] },
      { id: '8OW7ZvZsNN8', title: 'Q5c Reverb', description: '', bulletPoints: [] },
      { id: '7ASuIDEmffM', title: 'Q5e,f Final Mix', description: '', bulletPoints: [] },
    ],
  },
];
```

**Step 2: Verify file compiles**

Run: `cd teacher-showcase && npx tsc --noEmit lib/video-data.ts`

**Step 3: Commit**

```bash
git add lib/video-data.ts
git commit -m "feat: add exam walkthrough video data (40 videos across 7 papers)"
```

---

### Task 2: Create the video library page

**Files:**
- Create: `app/(main)/videos/page.tsx`
- Create: `app/(main)/videos/VideoLibraryClient.tsx`

**Step 1: Create the server page with metadata**

`app/(main)/videos/page.tsx`:
```tsx
import VideoLibraryClient from './VideoLibraryClient';

export const metadata = {
  title: 'Exam Walkthroughs — Music Tech Studio',
  description: 'Past paper production question walkthroughs for A-Level Music Technology.',
};

export default function VideosPage() {
  return <VideoLibraryClient />;
}
```

**Step 2: Create the client component**

`app/(main)/videos/VideoLibraryClient.tsx` — adapt the visual style from the grades-dashboard prototype (`/video-library`):

Key design decisions:
- Warm `#FFFBF5` background matching the main site
- Year tabs on the left (desktop) / horizontal scroll (mobile)
- Two-column card layout: left side has title + bullet points, right side has YouTube embed
- Uses `youtube-nocookie.com` for privacy
- Search bar to filter videos
- A2 and AS level badges for visual grouping
- Year tabs sorted newest first
- `bulletPoints` array renders as a styled list in the description area (empty initially — populated from transcripts later)

Match the existing site's Tailwind conventions:
- `font-display` for headings (Bebas Neue)
- `var(--background)`, `var(--foreground)` CSS vars
- `card-hover` class for hover effects
- `iridescent-text` for accent text
- lucide-react icons

**Step 3: Run dev server and verify page renders**

Run: `cd teacher-showcase && npm run dev`
Visit: `http://localhost:3000/videos`
Expected: Video library with year tabs and embedded YouTube players

**Step 4: Commit**

```bash
git add app/(main)/videos/
git commit -m "feat: add exam walkthroughs video library page"
```

---

### Task 3: Add "Exam Walkthroughs" card to landing page

**Files:**
- Modify: `components/ToolCards.tsx`

**Step 1: Add the new card to the tools array**

Add after the existing VIDEO LESSONS entry:
```typescript
{
  title: 'EXAM WALKTHROUGHS',
  description: 'Watch past paper production question walkthroughs',
  href: '/videos',
  icon: Film,  // from lucide-react — film reel distinguishes from Play icon
},
```

Also update the import to include `Film`:
```typescript
import { ArrowRight, Headphones, FileQuestion, Play, BookOpen, CalendarCheck, Film, LucideIcon } from 'lucide-react';
```

Note: This card uses an internal `/videos` link (not external), so update the `<a>` to not use `target="_blank"` for internal links. Add an `external?: boolean` field to the Tool interface and conditionally render `target` and `rel` attributes.

**Step 2: Verify the landing page shows the new card**

Visit: `http://localhost:3000`
Expected: 6 cards in the "Get Started" section, including "EXAM WALKTHROUGHS"

**Step 3: Commit**

```bash
git add components/ToolCards.tsx
git commit -m "feat: add Exam Walkthroughs card to landing page"
```

---

### Task 4: Build verification

**Step 1: Run production build**

Run: `cd teacher-showcase && npm run build`
Expected: Build succeeds with no errors

**Step 2: Commit if any fixes were needed**

---

### Task 5 (future): Populate bullet points from transcripts

Once the user pastes YouTube transcripts into an MD file:
- Parse each transcript for key topics covered
- Update `bulletPoints` arrays in `lib/video-data.ts`
- Each video gets 3-5 bullet points summarising what's covered

This task is deferred until transcripts are available.
