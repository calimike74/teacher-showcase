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
