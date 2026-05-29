/* =====================================================================
   CONTEXT.JS — position-aware microcopy per module
   --------------------------------------------------------------------
   Each module, when selected in the rack, gets ONE short sentence
   describing what it's doing IN THIS chain — based on its neighbours.
   Cause-and-effect framing where the placement is pedagogically loaded;
   plain description where it isn't.
   --------------------------------------------------------------------
   Coverage: every effect that appears in the 7 built-in presets
   (hpf, deesser, gate, comp, mbcomp, limiter, transient_shaper,
    saturation, peq, plate, hall, flanger, phaser, auto_pan, tape, slap).
   Effects not used by any preset (chorus, lpf, shelving, room, chamber)
   silently fall through with no line shown.
   --------------------------------------------------------------------
   Rule shape:
     { when: ctx => bool, text: string, warn?: boolean }
   ctx = { prev, next, isFirst, isLast, chain }
   Rules are tried in order; first match wins. Always end with a
   `when: () => true` fallback so every selection has a line.
   ===================================================================== */

const REVERBS = ['plate', 'room', 'hall', 'chamber'];

window.CONTEXT_RULES = {

  /* ----- FILTERS / EQ ----- */

  hpf: [
    { when: ({isFirst, next}) => isFirst && next === 'deesser',
      text: 'Cleans the input first, so the de-esser scans a tidy signal for sibilance.' },
    { when: ({isFirst, next}) => isFirst && next === 'gate',
      text: 'Cleans sub-bass rumble first, so the gate triggers on the snare — not on kick bleed.' },
    { when: ({isFirst, next}) => isFirst && next === 'mbcomp',
      text: 'A gentle low cut, so the multiband compressor doesn\'t waste a band on inaudible sub.' },
    { when: ({isFirst, next}) => isFirst && next === 'phaser',
      text: 'Clears sub-bass before the phaser\'s notches start sweeping across the spectrum.' },
    { when: ({isFirst, next}) => isFirst && next === 'comp',
      text: 'Filters rumble first — keeps inaudible low-end out of the compressor downstream.' },
    { when: ({isFirst}) => isFirst,
      text: 'First in the chain — clears rumble before any downstream effect has to process it.' },
    { when: () => true,
      text: 'Late filtering — put the HPF first so later processors don\'t react to sub-bass rumble.', warn: true },
  ],

  peq: [
    { when: ({prev, next}) => prev === 'comp' && REVERBS.includes(next),
      text: 'Sculpts a level-controlled voice; reverb next adds space to the shaped sound.' },
    { when: ({prev, next}) => prev === 'transient_shaper' && REVERBS.includes(next),
      text: 'Tonal balance on a dynamics-shaped signal before reverb spreads it into the acoustic.' },
    { when: ({prev}) => prev === 'transient_shaper',
      text: 'Shapes a transient-controlled signal — balances tone without flattening the attack.' },
    { when: ({prev}) => prev === 'saturation',
      text: 'Sculpts the saturated harmonics — chooses which new overtones to keep, which to cut.' },
    { when: ({prev, next}) => prev === 'comp' && next === 'flanger',
      text: 'Carves the synth in on a level-controlled signal, before the flanger adds movement.' },
    { when: ({prev}) => prev === 'comp',
      text: 'On a level-controlled signal — easier to hear what actually needs lifting.' },
    { when: ({prev}) => prev === 'limiter',
      text: 'EQ AFTER the limiter — you\'re boosting frequencies that have already been ceiling-clamped.', warn: true },
    { when: ({prev}) => REVERBS.includes(prev),
      text: 'EQ AFTER reverb — you\'re shaping the reverb tail too, not just the dry voice.', warn: true },
    { when: () => true,
      text: 'Boosts or cuts chosen frequency bands.' },
  ],

  /* ----- DYNAMICS ----- */

  deesser: [
    { when: ({next}) => next === 'comp',
      text: 'Sits before the compressor, so "sss" peaks don\'t get squashed louder.' },
    { when: ({prev}) => prev === 'comp',
      text: 'After the compressor — usually we de-ess FIRST, so the comp doesn\'t amplify sibilance.', warn: true },
    { when: ({isLast}) => isLast,
      text: 'De-esser at the end — sibilance has already been shaped by everything before it.', warn: true },
    { when: () => true,
      text: 'Targets the 5–9 kHz sibilance band only — a frequency-specific compressor.' },
  ],

  gate: [
    { when: ({prev, next}) => prev === 'hpf' && next === 'comp',
      text: 'Removes kit bleed, so the compressor next door only reacts to clean snare hits.' },
    { when: ({prev}) => prev === 'hpf',
      text: 'After the HPF — the gate now triggers on the snare alone, not on sub-bass rumble.' },
    { when: ({isFirst}) => isFirst,
      text: 'Gate first — without an HPF before it, kick rumble will trigger it alongside the snare.', warn: true },
    { when: ({chain}) => chain.includes('deesser') || chain.includes('plate'),
      text: 'Gates aren\'t for vocals — they chop breath and quiet consonants. Use volume automation instead.', warn: true },
    { when: () => true,
      text: 'Closes below threshold and opens above — most useful on drums where bleed needs cutting between hits.' },
  ],

  comp: [
    { when: ({prev, next}) => prev === 'deesser' && next === 'transient_shaper',
      text: 'Sibilance tamed; levels the rap delivery before the transient shaper re-sharpens consonants.' },
    { when: ({prev, next}) => prev === 'deesser' && (next === 'peq' || next === 'shelving'),
      text: 'Sibilance is tamed; now levels the signal before the EQ shapes it.' },
    { when: ({prev, next}) => prev === 'gate' && (next === 'peq' || next === 'shelving'),
      text: 'Reacts only to gated hits — a slow attack lets the transient pass before squeezing the body.' },
    { when: ({prev}) => prev === 'phaser',
      text: 'Tames the phaser\'s amplitude movement, so the lead sits at a consistent loudness.' },
    { when: ({prev, next}) => prev === 'hpf' && next === 'saturation',
      text: 'Levels the bass first, so each note enters the saturator at a similar level — consistent harmonics.' },
    { when: ({prev, next}) => prev === 'hpf' && next === 'transient_shaper',
      text: 'Gentle level control on fingerstyle dynamics — over-compression kills the genre\'s character.' },
    { when: ({next}) => next === 'peq' || next === 'shelving',
      text: 'Levels the signal, so the EQ next door is shaping a steady voice, not a moving target.' },
    { when: ({prev}) => REVERBS.includes(prev),
      text: 'Compressing AFTER reverb — this squashes the tail along with the dry signal.', warn: true },
    { when: ({isLast}) => isLast,
      text: 'Compressor last — but most chains want EQ and reverb after the dynamics.', warn: true },
    { when: () => true,
      text: 'Evens out the dynamic range so later effects work on a steady signal.' },
  ],

  mbcomp: [
    { when: ({prev, next}) => prev === 'hpf' && next === 'transient_shaper',
      text: 'Reins in problem bands without flattening the section-to-section dynamic contrast.' },
    { when: ({prev}) => prev === 'hpf',
      text: 'Frequency-specific control — each band compresses independently of the others.' },
    { when: () => true,
      text: 'Splits the signal into bands and compresses each separately — a mix-bus tool, not for single channels.' },
  ],

  transient_shaper: [
    { when: ({prev, next}) => prev === 'mbcomp' && next === 'peq',
      text: 'Sharpens percussion attack independent of level — comp here would react to whatever\'s loudest.' },
    { when: ({prev, next}) => prev === 'comp' && next === 'peq',
      text: 'Re-sharpens what compression softened — the forward-sitting trick on rap and pop vocals.' },
    { when: ({prev}) => prev === 'comp',
      text: 'Brings back the attack the compressor flattened — without un-doing the level control.' },
    { when: ({next}) => next === 'peq' || next === 'shelving',
      text: 'Shapes envelope before EQ — different to a comp, which reacts to level not shape.' },
    { when: () => true,
      text: 'Attack + sustain knobs, independent of input level.' },
  ],

  saturation: [
    { when: ({prev, next}) => prev === 'comp' && next === 'peq',
      text: 'Adds harmonics on a level-controlled bass; the EQ next chooses which new overtones to keep.' },
    { when: ({prev}) => prev === 'comp',
      text: 'Adds harmonics on a level-controlled signal — character stays consistent across notes.' },
    { when: ({prev}) => prev === 'peq',
      text: 'Saturation AFTER EQ — new harmonics propagate past the EQ\'s shaping, straight to the output.', warn: true },
    { when: () => true,
      text: 'Adds harmonic distortion — tape, tube, or transformer character.' },
  ],

  limiter: [
    { when: ({isLast}) => isLast,
      text: 'Final stop — catches stray peaks the slow compressor attack let through.' },
    { when: () => true,
      text: 'Limiter not last — fast peaks downstream will still exceed the ceiling.', warn: true },
  ],

  /* ----- TIME-BASED ----- */

  plate: [
    { when: ({isLast}) => isLast,
      text: 'Last in the chain — reverb sits on the fully-shaped voice, not on raw breath and noise.' },
    { when: ({isFirst}) => isFirst,
      text: 'Reverb FIRST — everything after will be working on the reverb tail too.', warn: true },
    { when: () => true,
      text: 'Reverb usually goes LAST, so later effects don\'t crush the tail.', warn: true },
  ],

  hall: [
    { when: ({isLast}) => isLast,
      text: 'On an aux send, not an insert — sections feed it at different levels to share one acoustic.' },
    { when: () => true,
      text: 'Hall reverb not last — and orchestrally it usually lives on an aux, not an insert.', warn: true },
  ],

  tape: [
    { when: ({isLast}) => isLast,
      text: 'Final stop — adds tail and tape ageing on the fully-processed signal.' },
    { when: () => true,
      text: 'Tape delay not last — downstream effects will process the repeats too.', warn: true },
  ],

  slap: [
    { when: ({isLast}) => isLast,
      text: 'Final stop — short echo on the fully-processed vocal; classic rap rhythm.' },
    { when: () => true,
      text: 'Slap delay not last — downstream processing changes its echo character.', warn: true },
  ],

  /* ----- MODULATION ----- */

  phaser: [
    { when: ({prev, next}) => prev === 'hpf' && next === 'comp',
      text: 'Adds the spectral sweep that defines the patch — comp next smooths the level changes it introduces.' },
    { when: ({prev, next}) => prev === 'peq' && next === 'slap',
      text: 'Creative effect — often on a doubled vocal, giving the double a separate identity from the dry.' },
    { when: ({next}) => next === 'comp',
      text: 'Sweep adds level movement that the comp next door will smooth out.' },
    { when: () => true,
      text: 'Moving notches in the spectrum — non-harmonic, unlike a flanger\'s comb.' },
  ],

  flanger: [
    { when: ({prev, next}) => prev === 'peq' && next === 'auto_pan',
      text: 'The comb filter aligns with whatever harmonics the EQ just emphasised.' },
    { when: ({prev}) => prev === 'peq',
      text: 'On a tone-shaped signal, the flange picks out the parts the EQ pushed forward.' },
    { when: () => true,
      text: 'Short modulated delay creates the swept-jet comb-filter sound.' },
  ],

  auto_pan: [
    { when: ({prev, next}) => prev === 'flanger' && next === 'tape',
      text: 'Stereo movement layered on top of the flanger\'s spectral movement.' },
    { when: ({prev, next}) => prev === 'flanger' && REVERBS.includes(next),
      text: 'Breathing stereo width before the reverb spreads it across the acoustic.' },
    { when: ({prev}) => prev === 'flanger',
      text: 'Stereo movement on top of the flanger\'s modulation.' },
    { when: () => true,
      text: 'LFO drives the panning position — decoration, not foundation.' },
  ],

};

window.getContextLine = function (key, idx, chain) {
  const rules = window.CONTEXT_RULES[key];
  if (!rules) return null;
  const ctx = {
    prev: idx > 0 ? chain[idx - 1] : null,
    next: idx < chain.length - 1 ? chain[idx + 1] : null,
    isFirst: idx === 0,
    isLast: idx === chain.length - 1,
    chain: chain,
  };
  for (const rule of rules) {
    if (rule.when(ctx)) return { text: rule.text, warn: !!rule.warn };
  }
  return null;
};
