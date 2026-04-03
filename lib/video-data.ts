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
      { id: 'Eev9QORjZtg', title: 'Q1 Guitar', description: '', bulletPoints: [
        'Highlight bar 17 and loop it',
        'Add a Tuner from Audio Effects to identify notes (A and E)',
        'Locate the wrong chord region in the guitar part',
        'Find a matching correct note elsewhere (e.g. bar 20)',
        'Cut out the wrong note and paste the correct one in',
        'Zoom in and check for clicks at edit points',
        'Apply or widen crossfades at each cut point',
      ], difficulty: 'amber', examinerComment: 'Mixed success. Many attempted pitch correction which introduced unwanted artefacts.', nationalAvgPct: 52.6 },
      { id: 'kADrrdmyHrU', title: 'Q2 Drums', description: '', bulletPoints: [
        'Drag and drop the MIDI file — click No on import prompt',
        'Drag a Drum Rack onto the MIDI track',
        'Load kick, snare, closed hi-hat, ride, toms, and crash into pads',
        'Open the MIDI clip and move notes to correct drum pads',
        'Verify kick on beat 1, snare on beats 2 and 4',
        'Check hi-hat covers bars 2–25, ride covers bars 14–21',
        'Place tom fill before the crash cymbal hit',
      ], difficulty: 'green', examinerComment: 'Most candidates comfortable with decimal to binary conversion. Some misidentified velocity values.', nationalAvgPct: 66.5 },
      { id: '-UcBYPDBvck', title: 'Q3 Synth', description: '', bulletPoints: [
        'Drag Operator onto the synth MIDI track',
        'Add Tuner and Spectrum to the example audio track',
        'Read the frequency/note from Spectrum (e.g. E3)',
        'Transpose Operator to match the correct octave',
        'Set oscillator waveform to Sine to match the example',
        'Set Voices to 1 and turn on Glide for portamento',
        'Adjust ADSR envelope by ear to match the example',
        'Switch filter to High Pass, turn on LFO with subtle rate/amount',
        'Fix the misplaced note at bar 20 in the MIDI clip',
      ], difficulty: 'red', examinerComment: 'Great spread of marks. Most common errors: polyphony causing note overlaps, addition of stereo processing.', nationalAvgPct: 49.4 },
      { id: 'm_2v-CmiXe8', title: 'Q5 Full Mix', description: '', bulletPoints: [
        'Duplicate acoustic guitar track, pan original L and duplicate R',
        'Nudge duplicate slightly out of time for double-tracking effect',
        'Add Compressor to vocals, automate on/off for loud transients',
        'Cut out the word "love" and pitch it up to A (from G#)',
        'Automate vocal reverb send from end of bar 5 through bar 22',
        'Automate vocal volume down so reverb creates distance effect',
        'Balance drums and vocals first, then bring in remaining tracks',
        'Keep muted DI guitar track muted, trim and fade bass tail',
        'Check start is within 1s, reverb tail not cut off at end',
      ], difficulty: 'red', examinerComment: 'Many failed to set sufficiently low threshold or high enough ratio for compression. Most struggled to create distance effect.', nationalAvgPct: 65.5 },
    ],
  },
  {
    label: 'A2 2023',
    level: 'A2',
    description: 'A2 production walkthroughs — 2023 paper',
    videos: [
      { id: 'l1JCspTEJQo', title: 'Q1c Drums Transcription', description: '', bulletPoints: [
        'Identify bar 43 and loop the section',
        'Use Auto Filter (low-pass) to isolate kick drum',
        'Switch to high-pass to isolate clap/snare and hi-hats',
        'Lower BPM to hear individual parts more clearly',
        'Transcribe each drum sound onto the piano roll',
      ], difficulty: 'amber', examinerComment: 'Wide range of marks. Most common correct lines were the open hi-hat and the snare/clap.', nationalAvgPct: 70.2 },
      { id: 'KxCn1gIN5nw', title: 'Q2 Synth', description: '', bulletPoints: [
        'Open MIDI file, find pitch bend in Envelope > MIDI Control',
        'Read highest pitch bend value by hovering over the envelope',
        'Find velocity value and convert decimal to binary',
        'Use Spectrum (not Tuner) to identify the correct octave',
        'Transpose Operator +12 to match octave, set to square wave',
        'Match pitch bend range in Time/Tone/Volume settings',
        'Set ADSR envelope to match the original sound',
        'Map velocity to filter frequency (A/A* level)',
        'Add modulation effect (chorus/flanger/phaser) and match original',
      ], difficulty: 'red', examinerComment: 'The most difficult mark on the paper. Only two or three candidates nationally got the mark for "two bytes" or "14 bits".', nationalAvgPct: 62.5 },
      { id: 'kefrtV4WM7k', title: 'Q3 Chorus Synth', description: '', bulletPoints: [
        'Highlight and loop the target bars to see where notes are missing',
        'Copy bass notes into chorus synth gaps using Option+drag',
        'Use Tuner on bass to identify note names',
        'If Tuner fails, use Spectrum to confirm pitch',
        'Match chorus synth notes to bass notes by adjusting pitch',
        'Duplicate notes to fill the full section (Cmd+D)',
        'Check for and fix audio clicks/glitches at crossfade points',
      ], difficulty: 'red', examinerComment: 'Candidates took a variety of approaches — sampler, copy-paste with flex-pitch, or equivalent. Multiple valid solutions.', nationalAvgPct: 47.9 },
      { id: 'uBEBLCW9QSc', title: 'Q4 Vocal Harmony', description: '', bulletPoints: [
        'Listen to bar 43 to identify the target pitches',
        'Use Tuner or Spectrum for visual pitch confirmation',
        'Cut the vocal section and copy to a new audio clip',
        'Split into individual notes and repitch each to match target',
        'Ensure no clicks or glitches between audio edits',
      ], difficulty: 'green', examinerComment: 'Many achieved full marks. Almost all started "The chosen polar pattern is omnidirectional, cardioid would be better" which gained half marks in one sentence.', nationalAvgPct: 77.9 },
      { id: 'uhvwb6BwfsQ', title: 'Q5 Final Mix', description: '', bulletPoints: [
        'Check all tracks are in sync (BPM, Complex Pro warp mode)',
        'Remove breath/noise in bars 31–32 by cutting and deleting',
        'Automate panning L→R on drums in bar 25 only',
        'Apply Pitch Loop effect from bar 13, matching the sound in bar 9',
        'Recreate echo on bar 23 using Echo (not Delay), set to half note, automate on/off',
        'Set up sidechain Gate on vocals triggered by drums (clap + hi-hat)',
        'Recreate increasing reverb across bars 6–9 (automate size/wet)',
        'Balance levels across all stems including MIDI tracks',
        'Ensure silence <1s at start/end, no cut-off tails, then export stereo mix',
      ], difficulty: 'red', examinerComment: 'Stems are deliberately mastered at wildly varying volumes to ensure candidates listen rather than look at fader positions.', nationalAvgPct: 67.8 },
    ],
  },
  {
    label: 'A2 2021',
    level: 'A2',
    description: 'A2 production walkthroughs — 2021 paper',
    videos: [
      { id: 'vKiN9OJrniY', title: 'Q2 Drums', description: '', bulletPoints: [
        'Drag and drop the MIDI drum file — click No on import',
        'Drag a Drum Rack onto the MIDI track',
        'Load kick, snare, closed hi-hat, open hi-hat, and crash samples',
        'Preview samples together to check they sound consistent',
        'Open the MIDI clip and move notes to correct drum pads',
        'Match beat 1 to kick, beats 2 and 4 to snare',
        'Use swap arrow on pads if a sound doesn\'t fit',
      ] },
      { id: '3xUHDJfi62I', title: 'Q4 Vocals', description: '', bulletPoints: [
        'Loop bar 18 and locate the breath noise',
        'Highlight and trim or delete the breath noise region',
        'Repeat for bar 3',
        'Insert a Sampler on a new MIDI track',
        'Drag the lead vocal audio into the Sampler',
        'Set loop points around the first syllable only',
        'Input backing vocal rhythm as MIDI notes (bars 28–31)',
        'Change Sampler root note to A3 to match lead vocal pitch',
        'Pan the backing vocal track hard left',
      ] },
      { id: 'wRjYUfViVxs', title: 'Q5 Mix', description: '', bulletPoints: [
        'Loop bar 27 and automate Pan on bass: L → R → centre',
        'Add a distortion effect to the bass track, match the reference',
        'Automate distortion on/off, switching off before bar 32',
        'Add Gate to synth chords, sidechain to bass track',
        'Set Gate floor all the way down, adjust threshold for clean triggering',
        'Add Reverb on a send and Echo on another send for vocals',
        'Match echo beat division and feedback to bar 22 reference',
        'Create stutter effect on vocal in bars 26–27 (split into small clips)',
        'Balance levels — raise vocals, lower bass',
        'Export: start <1s before first transient, end after all tails fade',
      ] },
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
      { id: '09DvLdE9HPE', title: 'Q1 Drums', description: '', bulletPoints: [
        'Highlight bars 22–30 and set a loop over the region',
        'Zoom in to check where transients sit off the grid',
        'Cut the drum audio and move each beat to align with the grid',
        'Never cut through a transient — zoom in before cutting',
        'Turn on metronome and listen back to verify timing',
        'Confirm the cymbal at the end has not been cut off',
      ], difficulty: 'red', examinerComment: 'Full range of marks. Many could correct timing by slicing and moving sections.' },
      { id: '3pv4ik_knP8', title: 'Q2 Bass', description: '', bulletPoints: [
        'Drag the MIDI file in — click No on import prompt',
        'Add Spectrum to the bass example to read the pitch (e.g. A0)',
        'Open the MIDI clip and check what octave the notes sit on',
        'Add Operator and transpose to match the correct octave',
        'Zoom into the bass waveform to identify oscillator shape',
        'Set Operator waveform to match (sine, square, triangle)',
        'Compare bar 18 rhythm against bar 20 and fix to match',
        'Adjust velocity bars in bar 4 to match bar 3',
      ], difficulty: 'amber', examinerComment: 'Quite often answered well. Incorrect pitch/octave was the most common problem.' },
      { id: '2sRjegD1OuY', title: 'Q3 Vocal', description: '', bulletPoints: [
        'Loop the target section and locate noise in the waveform',
        'Drag clip edge inward to remove noise — don\'t cut into vocal',
        'Check the entire file for additional noise regions',
        'Ensure fade out doesn\'t chop any vocal content',
        'Add Spectrum and compare bar 18 frequencies against previous bars',
        'Add EQ8 and boost high frequencies to match surrounding bars',
        'Optionally add a low-cut filter to remove unwanted low end',
      ], difficulty: 'red', examinerComment: 'Students clearly found this challenging, few getting a good edit. Cutting the D of "mind" was common.' },
      { id: '6ukuHJlcC5g', title: 'Q5a Compression', description: '', bulletPoints: [
        'Find a section with quiet then loud transients and loop it',
        'Add a Compressor to the vocal track',
        'Set ratio to 4:1',
        'Adjust threshold so only louder transients trigger gain reduction',
        'Watch the GR meter — should move on loud hits only',
        'Remove loop and check vocals don\'t jump out in the full mix',
      ], difficulty: 'amber', examinerComment: 'Around a quarter achieved three marks. Many had some gain reduction but still uneven dynamics.' },
      { id: 'f8jPgmWbw68', title: 'Q5b Delay', description: '', bulletPoints: [
        'Highlight and loop bar 29',
        'Replace default delay with Echo from Audio Effects on the return',
        'Set Echo delay time to a quarter note (remove dotted default)',
        'Adjust feedback so repeats fade out by bar 30',
        'Turn up the send level from the vocal track',
        'Listen in context with all tracks — don\'t solo',
      ], difficulty: 'amber', examinerComment: 'About a third managed this successfully. The delay time was usually correct.' },
      { id: '8OW7ZvZsNN8', title: 'Q5c Reverb', description: '', bulletPoints: [
        'Turn up Send A (reverb return) on the vocal track',
        'Open Reverb and set decay time to exactly 2 seconds (Shift+drag)',
        'Adjust send level so reverb blends in context',
        'Don\'t solo — listen with the full mix',
        'Find a gap in the vocal where the reverb tail is audible',
        'Check reverb doesn\'t overpower other instruments',
      ], difficulty: 'amber', examinerComment: 'Good proportion chose a suitable reverb length. Vocals being too wet was the common problem.' },
      { id: '7ASuIDEmffM', title: 'Q5e,f Final Mix', description: '', bulletPoints: [
        'Compare waveform heights to identify loud vs quiet tracks',
        'Balance vocals against drums first',
        'Lower loud tracks rather than boosting quiet ones',
        'Never solo a track to set its level — listen in the full mix',
        'Export and listen back outside Ableton',
        'Check silence at start is under 1 second',
        'Check end doesn\'t cut off reverb or echo tail',
      ], difficulty: 'amber', examinerComment: 'Reverb tail chopped or long lead-in were common. Out of sync parts also occurred fairly frequently.' },
    ],
  },
];
