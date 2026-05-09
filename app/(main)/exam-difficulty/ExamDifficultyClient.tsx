'use client';

import { useEffect, useMemo, useState } from 'react';
import { Fraunces } from 'next/font/google';
import styles from './exam-difficulty.module.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-fraunces',
});

type Subject = {
  name: string;
  total: number;
  cum: [number, number, number, number, number, number, number];
};

type YearKey = '2024' | '2025';

const DATA: Record<YearKey, Subject[]> = {
  '2025': [
    { name: 'Russian', total: 1118, cum: [947, 1054, 1089, 1106, 1111, 1116, 1118] },
    { name: 'Persian', total: 195, cum: [89, 158, 175, 187, 191, 193, 195] },
    { name: 'Chinese', total: 1624, cum: [678, 1221, 1507, 1579, 1609, 1620, 1624] },
    { name: 'Urdu', total: 235, cum: [91, 193, 222, 228, 231, 233, 235] },
    { name: 'Italian', total: 592, cum: [226, 465, 560, 576, 586, 590, 592] },
    { name: 'Japanese', total: 183, cum: [103, 154, 174, 176, 179, 182, 183] },
    { name: 'Further Mathematics', total: 12970, cum: [3564, 7337, 10178, 11584, 12308, 12691, 12970] },
    { name: 'Arabic', total: 601, cum: [162, 312, 418, 492, 553, 576, 601] },
    { name: 'Turkish', total: 514, cum: [116, 241, 385, 467, 492, 505, 514] },
    { name: 'Fine Art', total: 2369, cum: [531, 1076, 1754, 2174, 2321, 2366, 2369] },
    { name: 'Art, Craft and Design', total: 1142, cum: [203, 436, 785, 1001, 1101, 1137, 1142] },
    { name: 'Graphic Communication', total: 507, cum: [84, 169, 339, 436, 485, 504, 507] },
    { name: 'Mathematics', total: 75079, cum: [12314, 30716, 45607, 58410, 67506, 72391, 75079] },
    { name: '3D Design', total: 257, cum: [40, 70, 150, 212, 243, 252, 257] },
    { name: 'Textile Design', total: 234, cum: [38, 83, 154, 209, 230, 234, 234] },
    { name: 'History of Art', total: 838, cum: [102, 318, 570, 734, 804, 830, 838] },
    { name: 'French', total: 1338, cum: [156, 543, 923, 1165, 1287, 1323, 1338] },
    { name: 'Chemistry', total: 5059, cum: [593, 1907, 3022, 3852, 4479, 4878, 5059] },
    { name: 'Photography', total: 1567, cum: [177, 435, 954, 1324, 1502, 1558, 1567] },
    { name: 'German', total: 404, cum: [48, 170, 278, 350, 388, 402, 404] },
    { name: 'Physics', total: 4536, cum: [499, 1434, 2513, 3358, 3908, 4298, 4536] },
    { name: 'Biology B', total: 1857, cum: [194, 563, 984, 1356, 1622, 1767, 1857] },
    { name: 'Greek', total: 106, cum: [11, 45, 71, 94, 105, 106, 106] },
    { name: 'English Literature', total: 10137, cum: [887, 2435, 5607, 8394, 9732, 10056, 10137] },
    { name: 'Spanish', total: 1247, cum: [109, 426, 792, 1063, 1192, 1227, 1247] },
    { name: 'Politics', total: 16090, cum: [1376, 4551, 9530, 13256, 15145, 15777, 16090] },
    { name: 'Biology Salters Nuffield', total: 3934, cum: [338, 1050, 2005, 2853, 3459, 3758, 3934] },
    { name: 'Music', total: 1138, cum: [105, 332, 639, 910, 1058, 1124, 1138] },
    { name: 'Economics A', total: 21476, cum: [1723, 6715, 14025, 18336, 20342, 21124, 21476] },
    { name: 'Geography', total: 12789, cum: [808, 3026, 6984, 10355, 12050, 12621, 12789] },
    { name: 'D&T — Product Design', total: 1530, cum: [96, 306, 730, 1141, 1381, 1489, 1530] },
    { name: 'Psychology', total: 4031, cum: [228, 798, 1862, 2904, 3588, 3924, 4031] },
    { name: 'Religious Studies', total: 1277, cum: [70, 323, 708, 1016, 1182, 1249, 1277] },
    { name: 'Drama and Theatre', total: 2981, cum: [162, 650, 1844, 2675, 2923, 2965, 2981] },
    { name: 'History', total: 12547, cum: [668, 2943, 7869, 10919, 12111, 12425, 12547] },
    { name: 'Economics B', total: 1865, cum: [83, 379, 884, 1409, 1695, 1825, 1865] },
    { name: 'Business', total: 21844, cum: [886, 3533, 11017, 17195, 20307, 21399, 21844] },
    { name: 'Music Technology', total: 1373, cum: [50, 194, 557, 941, 1199, 1314, 1373] },
    { name: 'English Lang. & Lit.', total: 2176, cum: [75, 349, 1126, 1832, 2112, 2163, 2176] },
    { name: 'Portuguese', total: 254, cum: [8, 89, 169, 221, 240, 246, 254] },
    { name: 'Statistics', total: 1105, cum: [34, 165, 382, 659, 889, 1028, 1105] },
    { name: 'Physical Education', total: 601, cum: [16, 114, 317, 458, 554, 583, 601] },
    { name: 'English Language', total: 1483, cum: [33, 193, 625, 1123, 1400, 1472, 1483] },
  ],
  '2024': [
    { name: 'Russian', total: 1044, cum: [910, 1000, 1029, 1038, 1042, 1044, 1044] },
    { name: 'Persian', total: 128, cum: [62, 98, 113, 119, 124, 125, 128] },
    { name: 'Italian', total: 659, cum: [272, 510, 605, 642, 655, 658, 659] },
    { name: 'Japanese', total: 174, cum: [91, 144, 162, 167, 171, 171, 174] },
    { name: 'Urdu', total: 247, cum: [135, 208, 229, 232, 242, 244, 247] },
    { name: 'Further Mathematics', total: 11872, cum: [3248, 6749, 9303, 10596, 11279, 11639, 11872] },
    { name: 'Chinese', total: 1643, cum: [378, 1057, 1489, 1588, 1612, 1634, 1643] },
    { name: 'Arabic', total: 682, cum: [216, 375, 498, 576, 624, 653, 682] },
    { name: 'Turkish', total: 426, cum: [137, 233, 346, 398, 416, 422, 426] },
    { name: 'Fine Art', total: 2523, cum: [507, 1027, 1806, 2282, 2469, 2518, 2523] },
    { name: 'Mathematics', total: 71201, cum: [11665, 29246, 42787, 53683, 62316, 68182, 71201] },
    { name: 'Graphic Communication', total: 488, cum: [62, 143, 300, 424, 472, 485, 488] },
    { name: 'Art, Craft and Design', total: 1258, cum: [196, 433, 795, 1082, 1213, 1250, 1258] },
    { name: 'History of Art', total: 798, cum: [96, 298, 515, 674, 753, 792, 798] },
    { name: 'French', total: 1337, cum: [167, 570, 936, 1147, 1271, 1319, 1337] },
    { name: 'Chemistry', total: 5114, cum: [611, 1966, 3176, 4003, 4556, 4909, 5114] },
    { name: 'Biology', total: 1974, cum: [234, 658, 983, 1364, 1653, 1876, 1974] },
    { name: 'Physics', total: 4065, cum: [449, 1291, 2209, 2962, 3531, 3866, 4065] },
    { name: 'Photography', total: 1677, cum: [154, 433, 998, 1405, 1599, 1667, 1677] },
    { name: 'Music', total: 1298, cum: [120, 389, 791, 1085, 1242, 1287, 1298] },
    { name: 'Politics', total: 15819, cum: [1386, 4512, 9185, 12605, 14610, 15470, 15819] },
    { name: 'English Literature', total: 10146, cum: [1022, 2531, 5797, 8528, 9751, 10056, 10146] },
    { name: 'Biology Salters Nuffield', total: 4267, cum: [374, 1152, 2109, 3005, 3671, 4071, 4267] },
    { name: 'Spanish', total: 1381, cum: [161, 510, 886, 1137, 1287, 1358, 1381] },
    { name: 'Economics', total: 19516, cum: [1615, 6263, 12426, 16490, 18434, 19171, 19516] },
    { name: 'German', total: 420, cum: [76, 218, 303, 371, 410, 415, 420] },
    { name: 'D&T — Product Design', total: 1645, cum: [102, 314, 738, 1189, 1466, 1591, 1645] },
    { name: 'Psychology', total: 4715, cum: [287, 952, 2078, 3334, 4175, 4567, 4715] },
    { name: 'Religious Studies', total: 1378, cum: [84, 344, 807, 1118, 1290, 1352, 1378] },
    { name: 'Drama', total: 3243, cum: [178, 658, 1814, 2754, 3108, 3226, 3243] },
    { name: 'Geography', total: 13365, cum: [807, 3184, 7116, 10595, 12406, 13135, 13365] },
    { name: 'Greek', total: 106, cum: [21, 43, 69, 87, 103, 104, 106] },
    { name: 'History', total: 13111, cum: [654, 2928, 7632, 10990, 12482, 12929, 13111] },
    { name: 'Business', total: 20412, cum: [859, 3205, 9285, 15235, 18682, 19920, 20412] },
    { name: 'Music Technology', total: 1308, cum: [47, 185, 508, 863, 1138, 1256, 1308] },
    { name: 'Portuguese', total: 264, cum: [29, 89, 159, 220, 243, 255, 264] },
    { name: 'Physical Education', total: 652, cum: [19, 102, 283, 457, 585, 626, 652] },
    { name: 'English Language', total: 1464, cum: [31, 165, 591, 1125, 1368, 1442, 1464] },
    { name: 'Statistics', total: 915, cum: [3, 100, 291, 535, 754, 874, 915] },
  ],
};

const GRADES = ['A*', 'A', 'B', 'C', 'D', 'E', 'U'] as const;
const GRADE_COLORS = ['#3A4A35', '#5F7058', '#8C9A78', '#C99F44', '#9B7530', '#B85A3F', '#95421F'];
const COMPARE_OPTIONS = [
  'Mathematics',
  'Chemistry',
  'Physics',
  'English Literature',
  'Music',
  'History',
  'Geography',
  'Further Mathematics',
];

function aStarPct(s: Subject) {
  return (s.cum[0] / s.total) * 100;
}

function pctAt(s: Subject, idx: number) {
  return (s.cum[idx] / s.total) * 100;
}

function ratioForPct(p: number) {
  if (p <= 0) return '∞';
  return '1 in ' + Math.round(100 / p);
}

export default function ExamDifficultyClient() {
  const [year, setYear] = useState<YearKey>('2025');
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [compareWith, setCompareWith] = useState<string>('Mathematics');
  const [animate, setAnimate] = useState(false);

  const subjects = DATA[year];
  const ranked = useMemo(
    () => [...subjects].sort((a, b) => aStarPct(b) - aStarPct(a)),
    [subjects],
  );
  const maxPct = aStarPct(ranked[0]);

  const mt = subjects.find((s) => s.name === 'Music Technology')!;
  const pctStar = aStarPct(mt);
  const pctA = pctAt(mt, 1);
  const ratioStar = Math.round(100 / pctStar);
  const ratioA = Math.round(100 / pctA);
  const aDotCount = Math.round(ratioStar / ratioA);

  const segCounts: number[] = [
    mt.cum[0],
    mt.cum[1] - mt.cum[0],
    mt.cum[2] - mt.cum[1],
    mt.cum[3] - mt.cum[2],
    mt.cum[4] - mt.cum[3],
    mt.cum[5] - mt.cum[4],
    mt.total - mt.cum[5],
  ];

  const otherSubject = subjects.find((s) => s.name === compareWith);

  useEffect(() => {
    setAnimate(false);
    const t = window.setTimeout(() => setAnimate(true), 30);
    return () => window.clearTimeout(t);
  }, [year]);

  const activeDetail = activeSubject ? subjects.find((s) => s.name === activeSubject) : null;

  return (
    <div className={`${styles.page} ${fraunces.variable}`}>
      <div className={styles.wrap}>

        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroEyebrow}>A-level grade statistics · provisional 2025</div>
          <h1 className={styles.heroHeadline}>
            Music Technology is <em>harder than you think</em>.
          </h1>

          <div className={styles.heroStatRow}>
            <div>
              <div className={styles.bigStat}>
                <span>{pctStar.toFixed(1)}</span>
                <span className={styles.pct}>%</span>
              </div>
              <div className={styles.bigStatLabel}>
                A* rate · Music Tech · {year}
              </div>
            </div>
            <div className={styles.dotBlock}>
              <p className={styles.dotBlockTitle}>
                Only <strong>1 in {ratioStar}</strong> Music Tech students were awarded A*.
              </p>
              <div className={styles.dotGrid} aria-hidden>
                {Array.from({ length: ratioStar }).map((_, i) => {
                  let cls = styles.dot;
                  if (i === 0) cls = `${styles.dot} ${styles.dotStar}`;
                  else if (i < aDotCount) cls = `${styles.dot} ${styles.dotA}`;
                  return <div key={i} className={cls} />;
                })}
              </div>
              <p className={styles.dotSub}>
                A or better? <strong>1 in {ratioA}</strong> · {pctA.toFixed(1)}%
              </p>
            </div>
          </div>
        </section>

        {/* REALITY CHECK */}
        <section className={styles.reality}>
          <div className={styles.realityHead}>
            <h2 className={styles.realityTitle}>
              Where the Music Tech class of {year} actually ended up
            </h2>
            <p className={styles.realitySub}>
              Every grade awarded last summer, drawn to scale across {mt.total.toLocaleString()} students.
            </p>
          </div>
          <div className={styles.realityBar}>
            {segCounts.map((c, i) => {
              const segPct = (c / mt.total) * 100;
              return (
                <div
                  key={GRADES[i]}
                  className={styles.realitySeg}
                  style={{
                    background: GRADE_COLORS[i],
                    width: animate ? `${segPct}%` : '0%',
                  }}
                  title={`${GRADES[i]} · ${c.toLocaleString()} students · ${segPct.toFixed(1)}%`}
                >
                  {segPct >= 4 && (
                    <>
                      <span className={styles.realitySegGrade}>{GRADES[i]}</span>
                      <span className={styles.realitySegPct}>{segPct.toFixed(0)}%</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
          <div className={styles.realityLegend}>
            {GRADES.map((g, i) => {
              const c = segCounts[i];
              const segPct = (c / mt.total) * 100;
              return (
                <div key={g} className={styles.legendItem}>
                  <span
                    className={styles.legendSwatch}
                    style={{ background: GRADE_COLORS[i] }}
                  />
                  <span>
                    <strong>{g}</strong> · {c.toLocaleString()} ({segPct.toFixed(1)}%)
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* YEAR TABS */}
        <div className={styles.yearTabs} role="tablist" aria-label="Year">
          {(['2024', '2025'] as YearKey[]).map((y) => (
            <button
              key={y}
              type="button"
              className={`${styles.yearTab} ${year === y ? styles.yearTabActive : ''}`}
              onClick={() => {
                setYear(y);
                setActiveSubject(null);
              }}
            >
              {y}
            </button>
          ))}
        </div>

        {/* CHART */}
        <section className={styles.chartCard}>
          <header className={styles.chartHead}>
            <div>
              <h2 className={styles.chartTitle}>A* rate by subject</h2>
              <p className={styles.chartSub}>
                Pearson Edexcel A-level entries · ranked highest to lowest. Tap any subject to see its full grade distribution.
              </p>
            </div>
            <div className={styles.legend}>
              <span>
                <span className={`${styles.swatch} ${styles.swatchSienna}`} />Music Technology
              </span>
              <span>
                <span className={`${styles.swatch} ${styles.swatchField}`} />Other subjects
              </span>
            </div>
          </header>

          <div className={styles.bars}>
            {ranked.map((s) => {
              const pct = aStarPct(s);
              const isMusic = s.name === 'Music Technology';
              const isActive = activeSubject === s.name;
              return (
                <div
                  key={s.name}
                  className={[
                    styles.barRow,
                    isMusic ? styles.barRowMusic : '',
                    isActive ? styles.barRowActive : '',
                  ].join(' ')}
                  onClick={() => setActiveSubject(isActive ? null : s.name)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveSubject(isActive ? null : s.name);
                    }
                  }}
                >
                  <div className={styles.barLabel} title={s.name}>{s.name}</div>
                  <div className={styles.barTrack}>
                    <div
                      className={styles.barFill}
                      style={{ width: animate ? `${(pct / maxPct) * 100}%` : '0%' }}
                    />
                  </div>
                  <div className={styles.barValue}>{pct.toFixed(1)}%</div>
                </div>
              );
            })}
          </div>

          {activeDetail && (
            <div className={styles.detail}>
              <header className={styles.detailHead}>
                <h3 className={styles.detailTitle}>
                  {activeDetail.name} · {activeDetail.total.toLocaleString()} students
                </h3>
                <button
                  type="button"
                  className={styles.detailClose}
                  onClick={() => setActiveSubject(null)}
                >
                  close
                </button>
              </header>

              <div className={styles.stackBar}>
                {GRADES.map((g, i) => {
                  const c =
                    i === 0
                      ? activeDetail.cum[0]
                      : i < 6
                        ? activeDetail.cum[i] - activeDetail.cum[i - 1]
                        : activeDetail.total - activeDetail.cum[5];
                  const segPct = (c / activeDetail.total) * 100;
                  return (
                    <div
                      key={g}
                      className={styles.stackSeg}
                      style={{ background: GRADE_COLORS[i], width: `${segPct}%` }}
                      title={`${g} · ${c.toLocaleString()}`}
                    >
                      {segPct >= 6 && (
                        <span className={styles.stackSegLabel}>
                          {g} · {segPct.toFixed(0)}%
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className={styles.detailGrid}>
                {GRADES.map((g, i) => {
                  const cumCount = i < 6 ? activeDetail.cum[i] : activeDetail.total;
                  const cumPct = (cumCount / activeDetail.total) * 100;
                  return (
                    <div key={g} className={styles.detailCell}>
                      <div className={styles.detailCellGrade}>{g} or higher</div>
                      <div className={styles.detailCellPct}>{cumPct.toFixed(1)}%</div>
                      <div className={styles.detailCellCount}>
                        {cumCount.toLocaleString()} students
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* COMPARE */}
        <section className={styles.compare}>
          <h3 className={styles.compareTitle}>How does Music Tech compare to…</h3>
          <div className={styles.compareRow}>
            <div className={`${styles.compareCard} ${styles.compareCardMusic}`}>
              <div className={styles.compareSubject}>Music Technology</div>
              <div className={styles.comparePct}>
                <span>{pctStar.toFixed(1)}</span>
                <span className={styles.comparePctSmall}>%</span>
              </div>
              <div className={styles.compareMeta}>A* rate · {ratioForPct(pctStar)}</div>
            </div>
            <div className={styles.compareVs}>vs</div>
            <div className={styles.compareCard}>
              <div className={styles.compareSubject}>{otherSubject?.name ?? compareWith}</div>
              {otherSubject && (
                <>
                  <div className={styles.comparePct}>
                    <span>{aStarPct(otherSubject).toFixed(1)}</span>
                    <span className={styles.comparePctSmall}>%</span>
                  </div>
                  <div className={styles.compareMeta}>
                    A* rate · {ratioForPct(aStarPct(otherSubject))}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className={styles.comparePick}>
            <span className={styles.comparePickLabel}>Compare with:</span>
            {COMPARE_OPTIONS.filter((n) => subjects.some((s) => s.name === n)).map((n) => (
              <button
                key={n}
                type="button"
                className={`${styles.chip} ${compareWith === n ? styles.chipActive : ''}`}
                onClick={() => setCompareWith(n)}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        <p className={styles.footnote}>
          Source: Pearson GCE Advanced Specifications Grade Statistics, June 2025 (provisional) and August 2024.
          Subjects with fewer than 10 candidates are excluded by Pearson.
          Music Technology is offered by Pearson Edexcel only — figures shown are the entire UK cohort.
        </p>
      </div>
    </div>
  );
}
