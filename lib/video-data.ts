export type Difficulty = 'green' | 'amber' | 'red';

export interface Video {
  id: string;
  title: string;
  description: string;
  bulletPoints: string[];
  difficulty?: Difficulty;
  examinerComment?: string;
  nationalAvgPct?: number;
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
      { id: 'Eev9QORjZtg', title: 'Q1 Guitar', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Mixed success. Many attempted pitch correction which introduced unwanted artefacts.', nationalAvgPct: 52.6 },
      { id: 'kADrrdmyHrU', title: 'Q2 Drums', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Most candidates comfortable with decimal to binary conversion. Some misidentified velocity values.', nationalAvgPct: 66.5 },
      { id: '-UcBYPDBvck', title: 'Q3 Synth', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Great spread of marks. Most common errors: polyphony causing note overlaps, addition of stereo processing.', nationalAvgPct: 49.4 },
      { id: 'm_2v-CmiXe8', title: 'Q5 Full Mix', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Many failed to set sufficiently low threshold or high enough ratio for compression. Most struggled to create distance effect.', nationalAvgPct: 65.5 },
    ],
  },
  {
    label: 'A2 2023',
    level: 'A2',
    description: 'A2 production walkthroughs — 2023 paper',
    videos: [
      { id: 'l1JCspTEJQo', title: 'Q1c Drums Transcription', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Wide range of marks. Most common correct lines were the open hi-hat and the snare/clap.', nationalAvgPct: 70.2 },
      { id: 'KxCn1gIN5nw', title: 'Q2 Synth', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'The most difficult mark on the paper. Only two or three candidates nationally got the mark for "two bytes" or "14 bits".', nationalAvgPct: 62.5 },
      { id: 'kefrtV4WM7k', title: 'Q3 Chorus Synth', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Candidates took a variety of approaches — sampler, copy-paste with flex-pitch, or equivalent. Multiple valid solutions.', nationalAvgPct: 47.9 },
      { id: 'uBEBLCW9QSc', title: 'Q4 Vocal Harmony', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Many achieved full marks. Almost all started "The chosen polar pattern is omnidirectional, cardioid would be better" which gained half marks in one sentence.', nationalAvgPct: 77.9 },
      { id: 'uhvwb6BwfsQ', title: 'Q5 Final Mix', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Stems are deliberately mastered at wildly varying volumes to ensure candidates listen rather than look at fader positions.', nationalAvgPct: 67.8 },
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
      { id: 'cHbQx8zgVwc', title: 'Q1c,d,e Bass', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Should have been straightforward — just copy, paste and crossfade. Candidates found it harder than expected.' },
      { id: 'SLJgp30sfNQ', title: 'Q2c Drums', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Most candidates did well on assigning correct sounds to MIDI, especially the crash cymbal.' },
      { id: '2pq54GwRbCo', title: 'Q4d Vocal', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Had to create backing vocal from a single long note sample — truncating, retuning, and panning. 9 marks, very time-consuming.' },
      { id: '8USjbsjUnyI', title: 'Q5a Reverb on Vocals', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Majority were successful. Some were too dry, not matching the reverberant electric guitar.' },
      { id: 'cKF3b6rhFr8', title: 'Q5b Snare Echo', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Mostly successfully completed. Some were not bold enough to make it a prominent mix feature.' },
      { id: 'pYVe6cZ1T3Q', title: 'Q5c Modulation', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Majority did well with mono tremolo and triplet quaver feel. Some mistakenly used chorus instead.' },
      { id: 'POUB6_lOKSM', title: 'Q5d Gate Vocals', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Targeted at higher grades, many did not attempt it. Common error: incorrect threshold leading to wrong rhythms.' },
      { id: 'tCuDblFL8mc', title: 'Q5e Bass Distortion', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Quite involved, requiring several steps including making two distinct signals. Targeted at higher grades.' },
      { id: 'J0HMJKJkx30', title: 'Q5f,g Full Mix', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Many cut tails of cymbals or guitar reverb without fading. MIDI drums were commonly a bar early.' },
    ],
  },
  {
    label: 'AS 2023',
    level: 'AS',
    description: 'AS production walkthroughs — 2023 paper',
    videos: [
      { id: 'CFfrVOTEfO4', title: 'Q1 Drums', description: '', bulletPoints: [], difficulty: 'green', examinerComment: 'Most got 2 from 3. Many could not set the filter to remove all the kick without making percussion too thin.' },
      { id: 'wYB7D-ZuNfI', title: 'Q3 Bass', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Many could do this for 4 marks. Even responses with errors often got 2 or 3.' },
      { id: 'gAQ3zqgoKgs', title: 'Q4 Vocal', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Very few got both marks. A lot of vague answers about being cheaper (not necessarily true).' },
      { id: 'F67KWFJ0vFc', title: 'Q5a Double Track Vocal', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Not answered well, very few got this right. It seems double tracking is not taught very much.' },
      { id: 'fi8EmnnM0n4', title: 'Q5b Compress Vocal', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Students who did this usually got 3 marks. Many did not achieve any discernible change and got 0.' },
      { id: '8eRDaQa5Sik', title: 'Q5c Panning Vocal', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Many could do this. Some had moving pan positions during one or both words.' },
      { id: '1qlDJuH4AKo', title: 'Q5d Reverb Vocal + Guitar/Keys', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Most applied a suitable reverb level. Quite a lot of small room reverbs, which is OK stylistically.' },
      { id: 'PV_vta9n_sw', title: 'Q5e,f,g Mix and Export', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Common to have over 1 second at the end, or a cut effect tail.' },
      { id: 'a8G9OJjhgbs', title: 'Q3 Bass (alt)', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Many could do this for 4 marks. Even responses with errors often got 2 or 3.' },
      { id: '-figLWOY2f4', title: 'Q5b Vocal Compression', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Students who did this usually got 3 marks. Many did not achieve any discernible change and got 0.' },
      { id: 'QD5YUmot34g', title: 'Q5d Vocal Reverb', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Most applied a suitable reverb level. Quite a lot of small room reverbs, which is OK stylistically.' },
    ],
  },
  {
    label: 'AS 2022',
    level: 'AS',
    description: 'AS production walkthroughs — 2022 paper',
    videos: [
      { id: 'wvjxoZuhA4A', title: 'Q1 Drum', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Most common error was copying the wrong pattern in bar 19. Most showed good skills in trimming and inserting.' },
      { id: 'nBphYd1iLiU', title: 'Q5c Vocal Delay', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Usually done well. Issues were wet level being too high, too many repeats.' },
    ],
  },
  {
    label: 'AS 2018',
    level: 'AS',
    description: 'AS production walkthroughs — 2018 paper',
    videos: [
      { id: '09DvLdE9HPE', title: 'Q1 Drums', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Full range of marks. Many could correct timing by slicing and moving sections.' },
      { id: '3pv4ik_knP8', title: 'Q2 Bass', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Quite often answered well. Incorrect pitch/octave was the most common problem.' },
      { id: '2sRjegD1OuY', title: 'Q3 Vocal', description: '', bulletPoints: [], difficulty: 'red', examinerComment: 'Students clearly found this challenging, few getting a good edit. Cutting the D of "mind" was common.' },
      { id: '6ukuHJlcC5g', title: 'Q5a Compression', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Around a quarter achieved three marks. Many had some gain reduction but still uneven dynamics.' },
      { id: 'f8jPgmWbw68', title: 'Q5b Delay', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'About a third managed this successfully. The delay time was usually correct.' },
      { id: '8OW7ZvZsNN8', title: 'Q5c Reverb', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Good proportion chose a suitable reverb length. Vocals being too wet was the common problem.' },
      { id: '7ASuIDEmffM', title: 'Q5e,f Final Mix', description: '', bulletPoints: [], difficulty: 'amber', examinerComment: 'Reverb tail chopped or long lead-in were common. Out of sync parts also occurred fairly frequently.' },
    ],
  },
];
