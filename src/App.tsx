import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Scale, ExternalLink } from 'lucide-react';

type Lang = 'en' | 'th';

const TRANSLATIONS = {
  en: {
    appTitle: 'AI & Digital Solutions Role — Bangkok Market Compensation Benchmarks 2026',
    subHeader: 'A summary of third-party salary data compiled from leading recruitment firms and salary databases',

    explorerTitle: 'Interactive Salary Range Explorer',
    explorerSub: 'Monthly base salary (THB) by years of experience',
    yearsLabel: 'Years of Experience',
    lowLabel: 'Low',
    medianLabel: 'Median',
    highLabel: 'High',
    sourceLabel: 'Source',
    estimatedTag: 'Estimated',
    estimatedNote: 'Interpolated between adjacent data points, not a direct survey figure.',
    currentOfferLabel: 'Current Offer',
    candidatePositionLabel: 'Candidate Position',
    diffFromAskLabel: 'Market Median Premium over Ask (฿52,000)',

    tableColYears: 'Years',
    tableColLow: 'Low',
    tableColMedian: 'Median',
    tableColHigh: 'High',
    tableColSource: 'Source',

    weightedTitle: 'Why AI Experience Is Weighted Differently',
    yearsSuffix: ' years',
    weightedCard1Desc: 'Median prior experience for fastest-growing AI roles globally',
    weightedCard2Desc: 'of AI job postings require advanced degrees, down from 67% in 2020 — execution outweighs tenure',
    weightedCard3Desc: 'Typical experience required for entry-level AI roles',
    weightedCard4Desc: 'Year-over-year growth in AI job postings — demand outstrips supply, compressing experience requirements',
    weightedContext:
      'Rapid technology cycles mean 3 years of hands-on AI experience represents mid-career competency, not entry-level tenure. Traditional experience benchmarks do not apply to this category.',

    marketTitle: 'Market Range Overview',
    marketSub: 'Monthly base salary (THB) across comparable roles in the Thai market',

    institutionTitle: 'Institution-Specific Context',
    institutionSub: 'Monthly base salary (THB) by institution type, academic sector',
    institutionHighlight: 'Comparable category',

    findingsTitle: 'Key Findings',
    finding1: 'Market median for AI & Digital Transformation roles in Bangkok: ฿75,000–84,000/month',
    finding2: 'Median for International Graduate Business Schools: ฿50,000/month',
    finding3: 'Landing at ฿50,000 represents a 33–40% discount from market while matching the institutional median',

    bulletsTitle: 'Supporting Observations',
    bullet1: 'Adecco Thailand 2026 identifies AI and digital transformation as strongest hiring sectors',
    bullet2: 'Michael Page Thailand 2026 reports salary increments of 15–20%, some reaching 40%',
    bullet3: 'Smartcruit Thailand 2026 notes business + technology roles command premiums',
    bullet4: 'Role scope aligns with Digital Transformation Specialist classifications across sources',

    sourcesTitle: 'Sources',
    sourcesSub: 'All figures compiled from the following third-party salary surveys and databases',

    legendCurrentOffer: 'Current Offer (฿40,000)',
    legendCandidatePosition: 'Candidate Position (฿52,000)',
    unitNote: 'All figures in THB per month',
    avgTag: 'avg',

    mrItOfficer: 'IT Officer, Thailand',
    mrSpecialist: 'Specialist, Thailand',
    mrDataScientist: 'Data Scientist, Bangkok',
    mrEntryAi: 'Entry-Level AI Specialist, Bangkok (1–3 yrs)',
    mrDigitalTransformation: 'Digital Transformation Specialist, Bangkok',
    mrAiSpecialist: 'AI Specialist, Bangkok',
    mrAiLivePostings: 'AI Roles, Live Postings, Bangkok',
    mrDigitalMarketingManager: 'Digital Marketing Manager, Thailand',

    instStandardPublic: 'Standard Public Universities',
    instAutonomousPublic: 'Autonomous Public Universities',
    instInternationalPrograms: 'International Programs & Graduate Business Schools',
    instPrivateInternational: 'Private International Universities',
  },
  th: {
    appTitle: 'ตำแหน่งงาน AI และดิจิทัลโซลูชัน — เกณฑ์เปรียบเทียบค่าตอบแทนตลาดกรุงเทพฯ ปี 2026',
    subHeader: 'สรุปข้อมูลเงินเดือนจากบุคคลที่สาม รวบรวมจากบริษัทจัดหางานชั้นนำและฐานข้อมูลเงินเดือน',

    explorerTitle: 'เครื่องมือสำรวจช่วงเงินเดือนแบบโต้ตอบ',
    explorerSub: 'ฐานเงินเดือนรายเดือน (บาท) ตามจำนวนปีประสบการณ์',
    yearsLabel: 'ปีประสบการณ์',
    lowLabel: 'ต่ำสุด',
    medianLabel: 'มัธยฐาน',
    highLabel: 'สูงสุด',
    sourceLabel: 'แหล่งข้อมูล',
    estimatedTag: 'ค่าประมาณ',
    estimatedNote: 'ประมาณค่าจากการประมาณระหว่างจุดข้อมูลที่มีอยู่ ไม่ใช่ตัวเลขจากแบบสำรวจโดยตรง',
    currentOfferLabel: 'ข้อเสนอปัจจุบัน',
    candidatePositionLabel: 'ตำแหน่งของผู้สมัคร',
    diffFromAskLabel: 'ค่ามัธยฐานตลาดสูงกว่าราคาที่เสนอ (฿52,000)',

    tableColYears: 'ปี',
    tableColLow: 'ต่ำสุด',
    tableColMedian: 'มัธยฐาน',
    tableColHigh: 'สูงสุด',
    tableColSource: 'แหล่งข้อมูล',

    weightedTitle: 'ทำไมประสบการณ์ด้าน AI จึงถูกให้น้ำหนักต่างออกไป',
    yearsSuffix: ' ปี',
    weightedCard1Desc: 'ค่ามัธยฐานประสบการณ์ก่อนหน้าสำหรับตำแหน่งงาน AI ที่เติบโตเร็วที่สุดทั่วโลก',
    weightedCard2Desc:
      'ของประกาศรับสมัครงาน AI ที่ต้องใช้วุฒิการศึกษาขั้นสูง ลดลงจาก 67% ในปี 2020 — ความสามารถในการลงมือทำสำคัญกว่าอายุงาน',
    weightedCard3Desc: 'ประสบการณ์ทั่วไปที่ต้องใช้สำหรับตำแหน่งงาน AI ระดับเริ่มต้น',
    weightedCard4Desc:
      'อัตราการเติบโตของประกาศรับสมัครงาน AI เทียบปีต่อปี — ความต้องการสูงกว่าอุปทาน ทำให้ข้อกำหนดด้านประสบการณ์ลดลง',
    weightedContext:
      'วัฏจักรเทคโนโลยีที่เปลี่ยนแปลงอย่างรวดเร็วหมายความว่าประสบการณ์ AI แบบลงมือทำ 3 ปี เทียบเท่ากับความสามารถระดับกลาง ไม่ใช่ระดับเริ่มต้น เกณฑ์ประสบการณ์แบบดั้งเดิมจึงไม่สามารถใช้ได้กับกลุ่มงานนี้',

    marketTitle: 'ภาพรวมช่วงเงินเดือนตลาด',
    marketSub: 'ฐานเงินเดือนรายเดือน (บาท) เทียบกับตำแหน่งงานใกล้เคียงในตลาดไทย',

    institutionTitle: 'บริบทเฉพาะตามประเภทสถาบัน',
    institutionSub: 'ฐานเงินเดือนรายเดือน (บาท) จำแนกตามประเภทสถาบันการศึกษา',
    institutionHighlight: 'หมวดหมู่ที่เทียบเคียงได้',

    findingsTitle: 'ผลสรุปสำคัญ',
    finding1: 'ค่ามัธยฐานตลาดสำหรับตำแหน่งงาน AI และการปฏิรูปดิจิทัลในกรุงเทพฯ: ฿75,000–84,000/เดือน',
    finding2: 'ค่ามัธยฐานของสถาบันบริหารธุรกิจนานาชาติระดับบัณฑิตศึกษา: ฿50,000/เดือน',
    finding3: 'การกำหนดที่ ฿50,000 คิดเป็นส่วนลด 33–40% จากตลาด ขณะที่สอดคล้องกับค่ามัธยฐานของสถาบัน',

    bulletsTitle: 'ข้อสังเกตประกอบ',
    bullet1: 'Adecco Thailand 2026 ระบุว่า AI และการปฏิรูปดิจิทัลเป็นกลุ่มที่มีการจ้างงานแข็งแกร่งที่สุด',
    bullet2: 'Michael Page Thailand 2026 รายงานอัตราการปรับขึ้นเงินเดือน 15–20% และบางกรณีสูงถึง 40%',
    bullet3: 'Smartcruit Thailand 2026 ระบุว่าตำแหน่งที่ผสมผสานธุรกิจและเทคโนโลยีได้รับค่าตอบแทนพรีเมียม',
    bullet4: 'ขอบเขตตำแหน่งงานสอดคล้องกับการจัดประเภทผู้เชี่ยวชาญด้านการปฏิรูปดิจิทัลในหลายแหล่งข้อมูล',

    sourcesTitle: 'แหล่งข้อมูล',
    sourcesSub: 'ตัวเลขทั้งหมดรวบรวมจากแบบสำรวจและฐานข้อมูลเงินเดือนของบุคคลที่สามต่อไปนี้',

    legendCurrentOffer: 'ข้อเสนอปัจจุบัน (฿40,000)',
    legendCandidatePosition: 'ตำแหน่งของผู้สมัคร (฿52,000)',
    unitNote: 'ตัวเลขทั้งหมดเป็นหน่วยบาทต่อเดือน',
    avgTag: 'เฉลี่ย',

    mrItOfficer: 'เจ้าหน้าที่ไอที ประเทศไทย',
    mrSpecialist: 'ผู้เชี่ยวชาญเฉพาะทาง ประเทศไทย',
    mrDataScientist: 'นักวิทยาศาสตร์ข้อมูล กรุงเทพฯ',
    mrEntryAi: 'ผู้เชี่ยวชาญ AI ระดับเริ่มต้น กรุงเทพฯ (1–3 ปี)',
    mrDigitalTransformation: 'ผู้เชี่ยวชาญด้านการปฏิรูปดิจิทัล กรุงเทพฯ',
    mrAiSpecialist: 'ผู้เชี่ยวชาญ AI กรุงเทพฯ',
    mrAiLivePostings: 'ตำแหน่งงาน AI ที่เปิดรับสมัครจริง กรุงเทพฯ',
    mrDigitalMarketingManager: 'ผู้จัดการฝ่ายการตลาดดิจิทัล ประเทศไทย',

    instStandardPublic: 'มหาวิทยาลัยรัฐทั่วไป',
    instAutonomousPublic: 'มหาวิทยาลัยในกำกับของรัฐ',
    instInternationalPrograms: 'หลักสูตรนานาชาติและสถาบันบริหารธุรกิจระดับบัณฑิตศึกษา',
    instPrivateInternational: 'มหาวิทยาลัยเอกชนนานาชาติ',
  },
} as const;

type Translation = { [K in keyof (typeof TRANSLATIONS)['en']]: string };

type ExperienceRow = {
  years: number;
  low: number;
  median: number;
  high: number;
  source: string;
  interpolated: boolean;
};

const EXPERIENCE_DATA: ExperienceRow[] = [
  { years: 1, low: 35000, median: 45000, high: 55000, source: 'JobsDB Thailand 2026', interpolated: false },
  { years: 2, low: 40000, median: 52000, high: 65000, source: 'Interpolated', interpolated: true },
  { years: 3, low: 45000, median: 60000, high: 78000, source: 'Adecco 2026, ERI/SalaryExpert 2026', interpolated: false },
  { years: 4, low: 52000, median: 68000, high: 88000, source: 'Interpolated', interpolated: true },
  { years: 5, low: 58500, median: 75000, high: 95000, source: 'ERI 2026', interpolated: false },
  { years: 6, low: 62000, median: 80000, high: 102000, source: 'Interpolated', interpolated: true },
  { years: 7, low: 67000, median: 84000, high: 108000, source: 'ERI 2026, Michael Page 2026', interpolated: false },
  { years: 8, low: 72000, median: 90000, high: 115000, source: 'Interpolated', interpolated: true },
  { years: 9, low: 78000, median: 96000, high: 120000, source: 'JobsDB Thailand 2026', interpolated: false },
  { years: 10, low: 85000, median: 105000, high: 130000, source: 'Michael Page Thailand 2026', interpolated: false },
];

type RangeItem = {
  key: keyof Translation;
  low?: number;
  high?: number;
  avg?: number;
  median?: number;
  single?: number;
  highlight?: boolean;
};

const MARKET_RANGES: RangeItem[] = [
  { key: 'mrItOfficer', low: 22000, high: 28000 },
  { key: 'mrSpecialist', low: 33000, high: 60000 },
  { key: 'mrDataScientist', low: 50000, high: 82000 },
  { key: 'mrEntryAi', single: 67600 },
  { key: 'mrDigitalTransformation', low: 58500, high: 102800, avg: 84000 },
  { key: 'mrAiSpecialist', low: 67600, high: 110100, avg: 95800 },
  { key: 'mrAiLivePostings', low: 85000, high: 120000 },
  { key: 'mrDigitalMarketingManager', single: 152500 },
];

const INSTITUTION_RANGES: RangeItem[] = [
  { key: 'instStandardPublic', low: 22000, high: 35000, median: 28000 },
  { key: 'instAutonomousPublic', low: 28000, high: 45000, median: 36000 },
  { key: 'instInternationalPrograms', low: 40000, high: 65000, median: 50000, highlight: true },
  { key: 'instPrivateInternational', low: 35000, high: 55000, median: 45000 },
];

type ExperienceWeightCard = {
  key: string;
  prefix?: string;
  value: number;
  decimals?: number;
  suffix: '%' | 'years';
  descKey: keyof Translation;
  sourceName: string;
  sourceUrl: string;
};

const EXPERIENCE_WEIGHT_CARDS: ExperienceWeightCard[] = [
  {
    key: 'medianPriorExperience',
    value: 3.5,
    decimals: 1,
    suffix: 'years',
    descKey: 'weightedCard1Desc',
    sourceName: 'LinkedIn 2026 via herohunt.ai',
    sourceUrl: 'https://www.herohunt.ai/blog/fastest-growing-ai-roles-in-2026-data-and-rankings/',
  },
  {
    key: 'advancedDegreeShare',
    value: 23,
    decimals: 0,
    suffix: '%',
    descKey: 'weightedCard2Desc',
    sourceName: 'Hakia/Glassdoor/LinkedIn 2026',
    sourceUrl: 'https://hakia.com/tech-insights/ai-talent-market/',
  },
  {
    key: 'entryLevelExperience',
    prefix: '<',
    value: 3,
    decimals: 0,
    suffix: 'years',
    descKey: 'weightedCard3Desc',
    sourceName: 'Coursera 2026',
    sourceUrl: 'https://www.coursera.org/articles/artificial-intelligence-jobs',
  },
  {
    key: 'postingGrowth',
    value: 74,
    decimals: 0,
    suffix: '%',
    descKey: 'weightedCard4Desc',
    sourceName: 'Hakia 2026',
    sourceUrl: 'https://hakia.com/tech-insights/ai-talent-market/',
  },
];

const SOURCES = [
  { name: 'Adecco Thailand Salary Guide 2026', url: 'https://adecco.co.th/salary-guide' },
  { name: 'Michael Page Thailand Salary Guide 2026', url: 'https://www.michaelpage.co.th/salary-guide' },
  { name: 'ERI Economic Research Institute 2026', url: 'https://www.erieri.com' },
  { name: 'SalaryExpert 2026', url: 'https://www.salaryexpert.com' },
  { name: 'JobsDB Thailand 2026', url: 'https://th.jobsdb.com' },
  { name: 'Smartcruit Thailand Salary Survey 2026', url: 'https://smartcruit.co' },
];

const CURRENT_OFFER = 40000;
const CANDIDATE_POSITION = 52000;

const fmt = (v: number) => `฿${v.toLocaleString('en-US')}`;

function ReferenceLines({ domain, height = 'h-full' }: { domain: number; height?: string }) {
  const pct = (v: number) => Math.max(0, Math.min(100, (v / domain) * 100));
  return (
    <>
      <div
        className={`absolute top-0 ${height} w-0.5 bg-red-500/70 z-10`}
        style={{ left: `${pct(CURRENT_OFFER)}%` }}
      />
      <div
        className={`absolute top-0 ${height} w-0.5 bg-[#01aeee] z-10`}
        style={{ left: `${pct(CANDIDATE_POSITION)}%` }}
      />
    </>
  );
}

function RangeRow({
  label,
  item,
  domain,
  highlightLabel,
}: {
  label: string;
  item: RangeItem;
  domain: number;
  highlightLabel?: string;
}) {
  const pct = (v: number) => Math.max(0, Math.min(100, (v / domain) * 100));
  const { low, high, avg, median, single, highlight } = item;

  return (
    <div
      className={`flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-4 py-3 ${
        highlight ? 'bg-[#01aeee]/10 rounded-xl px-3 -mx-3 border border-[#01aeee]/30' : ''
      }`}
    >
      <div className="sm:w-64 shrink-0 flex items-center gap-2">
        <span className={`text-xs font-bold leading-snug ${highlight ? 'text-[#01aeee]' : 'text-black'}`}>
          {label}
        </span>
        {highlight && highlightLabel && (
          <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#01aeee] text-white font-black uppercase tracking-wide shrink-0">
            {highlightLabel}
          </span>
        )}
      </div>
      <div className="flex-1 relative h-6">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-2 rounded-full bg-neutral-100" />
        <ReferenceLines domain={domain} height="h-6" />
        {single !== undefined ? (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-black z-20 border-2 border-white shadow"
            style={{ left: `calc(${pct(single)}% - 6px)` }}
          />
        ) : (
          <>
            <div
              className="absolute top-1/2 -translate-y-1/2 h-2 rounded-full bg-[#fdf102] border border-black/20 z-10"
              style={{ left: `${pct(low ?? 0)}%`, width: `${pct(high ?? 0) - pct(low ?? 0)}%` }}
            />
            {avg !== undefined && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-black z-20"
                style={{ left: `calc(${pct(avg)}% - 2px)` }}
              />
            )}
            {median !== undefined && (
              <div
                className="absolute top-1/2 -translate-y-1/2 w-1 h-4 rounded-full bg-black z-20"
                style={{ left: `calc(${pct(median)}% - 2px)` }}
              />
            )}
          </>
        )}
      </div>
      <div className="sm:w-36 shrink-0 sm:text-right text-[11px] text-black/70 font-bold tabular-nums">
        {single !== undefined ? fmt(single) : `${fmt(low ?? 0)} – ${fmt(high ?? 0)}`}
      </div>
    </div>
  );
}

function ChartLegend({ t }: { t: Translation }) {
  return (
    <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold text-black/70">
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-0.5 bg-red-500" />
        <span>{t.legendCurrentOffer}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="w-3 h-0.5 bg-[#01aeee]" />
        <span>{t.legendCandidatePosition}</span>
      </div>
    </div>
  );
}

function SplitFlapValue({ value, className }: { value: string; className?: string }) {
  const [generation, setGeneration] = useState(0);
  const prevValue = useRef(value);

  useEffect(() => {
    if (prevValue.current !== value) {
      prevValue.current = value;
      setGeneration((g) => g + 1);
    }
  }, [value]);

  return (
    <span className={`flap-wrap inline-flex ${className ?? ''}`}>
      {value.split('').map((ch, i) => (
        <span
          key={`${i}-${generation}`}
          className="flap-char"
          style={{ animationDelay: `${i * 35}ms` }}
        >
          {ch}
        </span>
      ))}
    </span>
  );
}

function CountUpStat({
  prefix = '',
  value,
  decimals = 0,
  suffix = '',
  className,
}: {
  prefix?: string;
  value: number;
  decimals?: number;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      hasAnimated.current = true;
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            const duration = 1200;
            const start = performance.now();
            const step = (now: number) => {
              const progress = Math.min((now - start) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              setDisplay(value * eased);
              if (progress < 1) requestAnimationFrame(step);
            };
            requestAnimationFrame(step);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>('en');
  const t = TRANSLATIONS[lang];

  const [selectedYears, setSelectedYears] = useState(3);
  const selectedRow = useMemo(
    () => EXPERIENCE_DATA.find((r) => r.years === selectedYears) ?? EXPERIENCE_DATA[2],
    [selectedYears]
  );
  const askDiff = selectedRow.median - CANDIDATE_POSITION;

  const EXPLORER_DOMAIN = 140000;
  const explorerPct = (v: number) => Math.max(0, Math.min(100, (v / EXPLORER_DOMAIN) * 100));

  const explorerCardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const [isTouch] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !explorerCardRef.current) return;
    const rect = explorerCardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ rx: (0.5 - y) * 12, ry: (x - 0.5) * 12 });
  };

  const handleCardMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <div className="min-h-screen bg-white text-black antialiased selection:bg-[#fdf102] selection:text-black flex flex-col font-['Glacial_Indifference',sans-serif]">
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/glacial-indifference-2');
        * {
          font-family: 'Glacial Indifference', sans-serif;
        }

        @property --flap-angle {
          syntax: '<angle>';
          inherits: false;
          initial-value: 0deg;
        }

        @keyframes rotate-border {
          to { --flap-angle: 360deg; }
        }

        .glow-border {
          position: relative;
          border-radius: 1.25rem;
        }

        .glow-border::before {
          content: '';
          position: absolute;
          inset: -2px;
          z-index: -1;
          border-radius: inherit;
          padding: 2px;
          background: conic-gradient(from var(--flap-angle), #01aeee, #fdf102, #ffffff, #01aeee);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: rotate-border 6s linear infinite;
        }

        .glass-panel {
          background: #fdf102;
        }

        .flap-wrap {
          perspective: 260px;
        }

        .flap-char {
          display: inline-block;
          transform-origin: 50% 50%;
          animation: flap-in 420ms cubic-bezier(0.22, 0.9, 0.32, 1) both;
        }

        @keyframes flap-in {
          0% { transform: rotateX(-100deg); opacity: 0; }
          55% { transform: rotateX(18deg); opacity: 1; }
          100% { transform: rotateX(0deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .flap-char { animation: none !important; }
          .glow-border::before { animation: none !important; }
        }

        .stat-card {
          position: relative;
        }

        .stat-card::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 2px;
          width: 0;
          background: #01aeee;
          transition: width 300ms ease;
        }

        .stat-card:hover::after {
          width: 100%;
        }
      `}</style>

      <header className="px-4 sm:px-6 py-4 border-b-2 border-black/10 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-start gap-3 min-w-0">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-[#01aeee] flex items-center justify-center text-white font-black shadow-md">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div className="min-w-0">
            <h1 className="font-black text-base sm:text-lg tracking-tight text-black leading-snug">
              {t.appTitle}
            </h1>
            <p className="text-xs sm:text-sm text-black/70 font-medium mt-1">{t.subHeader}</p>
          </div>
        </div>

        <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-black/20 text-xs font-bold shrink-0 self-start sm:self-center">
          <button
            onClick={() => setLang('en')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              lang === 'en' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'
            }`}
          >
            <span>🇬🇧</span>
            <span>EN</span>
          </button>
          <button
            onClick={() => setLang('th')}
            className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${
              lang === 'th' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'
            }`}
          >
            <span>🇹🇭</span>
            <span>TH</span>
          </button>
        </div>
      </header>

      <main className="flex-1 p-4 sm:p-6 max-w-5xl w-full mx-auto space-y-10 sm:space-y-14 pb-16">
        {/* SALARY RANGE EXPLORER */}
        <section className="space-y-4">
          <div>
            <h2 className="font-black text-lg text-black">{t.explorerTitle}</h2>
            <p className="text-xs text-black/70">{t.explorerSub}</p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -top-10 -left-10 w-56 h-56 rounded-full bg-[#01aeee]/40 blur-3xl -z-10" />
            <div className="pointer-events-none absolute -bottom-12 -right-8 w-56 h-56 rounded-full bg-[#fdf102]/60 blur-3xl -z-10" />
            <div className="glow-border">
              <div
                ref={explorerCardRef}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                className="glass-panel p-5 sm:p-6 rounded-2xl border-2 border-white/50 shadow-xl space-y-8 transition-transform duration-150 ease-out will-change-transform"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  boxShadow: `${-tilt.ry * 1.5}px ${tilt.rx * 1.5}px 40px rgba(0,0,0,0.25)`,
                }}
              >
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-black">
                <span>{t.yearsLabel}</span>
                <span className="text-[#01aeee] text-base font-black">{selectedYears}</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={1}
                value={selectedYears}
                onChange={(e) => setSelectedYears(Number(e.target.value))}
                className="w-full accent-[#01aeee] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-black/60 font-bold">
                <span>1</span>
                <span>10</span>
              </div>
            </div>

            <div className="flex justify-end">
              <ChartLegend t={t} />
            </div>

            <div className="px-1 relative">
              <div className="h-7 w-full bg-white rounded-full relative overflow-hidden flex items-center border-2 border-black/20">
                <div
                  className="absolute h-full bg-[#01aeee]"
                  style={{
                    left: `${explorerPct(selectedRow.low)}%`,
                    width: `${explorerPct(selectedRow.high) - explorerPct(selectedRow.low)}%`,
                  }}
                />
                <div
                  className="absolute h-full w-1.5 bg-black z-10"
                  style={{ left: `${explorerPct(selectedRow.median)}%` }}
                />
              </div>
              <ReferenceLines domain={EXPLORER_DOMAIN} height="h-7" />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
                <div className="text-[10px] font-bold text-black/60 uppercase tracking-wide">{t.lowLabel}</div>
                <SplitFlapValue
                  value={fmt(selectedRow.low)}
                  className="text-sm sm:text-base font-black text-black tabular-nums mt-0.5"
                />
              </div>
              <div className="p-3 rounded-xl bg-black text-center">
                <div className="text-[10px] font-bold text-[#fdf102] uppercase tracking-wide">{t.medianLabel}</div>
                <SplitFlapValue
                  value={fmt(selectedRow.median)}
                  className="text-sm sm:text-base font-black text-white tabular-nums mt-0.5"
                />
              </div>
              <div className="p-3 rounded-xl bg-white border border-black/10 text-center">
                <div className="text-[10px] font-bold text-black/60 uppercase tracking-wide">{t.highLabel}</div>
                <SplitFlapValue
                  value={fmt(selectedRow.high)}
                  className="text-sm sm:text-base font-black text-black tabular-nums mt-0.5"
                />
              </div>
              <div className="p-3 rounded-xl bg-white border-2 border-[#01aeee] text-center">
                <div className="text-[10px] font-bold text-[#01aeee] uppercase tracking-wide leading-tight">
                  {t.diffFromAskLabel}
                </div>
                <SplitFlapValue
                  value={`${askDiff >= 0 ? '+' : '-'}${fmt(Math.abs(askDiff))}`}
                  className={`text-sm sm:text-base font-black tabular-nums mt-0.5 ${
                    askDiff >= 0 ? 'text-[#01aeee]' : 'text-red-500'
                  }`}
                />
              </div>
            </div>

            <div className="pt-4 border-t-2 border-black/10">
              <p className="text-xs text-black/80">
                <span className="font-bold">{t.sourceLabel}:</span>{' '}
                {selectedRow.interpolated ? (
                  <span className="italic">{t.estimatedNote}</span>
                ) : (
                  selectedRow.source
                )}
                {selectedRow.interpolated && (
                  <span className="ml-2 text-[9px] px-1.5 py-0.5 rounded bg-black text-[#fdf102] font-black uppercase tracking-wide">
                    {t.estimatedTag}
                  </span>
                )}
              </p>
            </div>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[560px]">
              <thead>
                <tr className="border-b-2 border-black/20 text-black">
                  <th className="pb-3 font-bold">{t.tableColYears}</th>
                  <th className="pb-3 font-bold">{t.tableColLow}</th>
                  <th className="pb-3 font-bold text-[#01aeee]">{t.tableColMedian}</th>
                  <th className="pb-3 font-bold">{t.tableColHigh}</th>
                  <th className="pb-3 font-bold">{t.tableColSource}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/10">
                {EXPERIENCE_DATA.map((row) => {
                  const isCurrent = row.years === selectedYears;
                  return (
                    <tr
                      key={row.years}
                      onClick={() => setSelectedYears(row.years)}
                      className={`cursor-pointer transition-colors ${
                        isCurrent ? 'bg-[#01aeee] text-white font-black' : 'hover:bg-neutral-50 text-black'
                      }`}
                    >
                      <td className="py-3 px-2 rounded-l-lg font-bold">{row.years}</td>
                      <td className="py-3 px-2 tabular-nums">{fmt(row.low)}</td>
                      <td className={`py-3 px-2 font-bold tabular-nums ${isCurrent ? 'text-white' : 'text-[#01aeee]'}`}>
                        {fmt(row.median)}
                      </td>
                      <td className="py-3 px-2 tabular-nums">{fmt(row.high)}</td>
                      <td className="py-3 px-2 rounded-r-lg">
                        <span className="flex items-center gap-1.5">
                          {row.interpolated ? (
                            <>
                              <span className="italic">{lang === 'th' ? 'ค่าประมาณ' : 'Interpolated'}</span>
                              <span
                                className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wide ${
                                  isCurrent ? 'bg-white text-[#01aeee]' : 'bg-black text-[#fdf102]'
                                }`}
                              >
                                {t.estimatedTag}
                              </span>
                            </>
                          ) : (
                            row.source
                          )}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* WHY AI EXPERIENCE IS WEIGHTED DIFFERENTLY */}
        <section className="space-y-4">
          <div>
            <h2 className="font-black text-lg text-black">{t.weightedTitle}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {EXPERIENCE_WEIGHT_CARDS.map((card) => (
              <div
                key={card.key}
                className="stat-card p-5 rounded-2xl bg-white border-2 border-black/10 shadow-sm"
              >
                <CountUpStat
                  prefix={card.prefix}
                  value={card.value}
                  decimals={card.decimals}
                  suffix={card.suffix === 'years' ? t.yearsSuffix : '%'}
                  className="text-3xl font-black text-[#01aeee] tabular-nums"
                />
                <p className="text-sm text-black/80 font-medium mt-2 leading-snug">{t[card.descKey]}</p>
                <a
                  href={card.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-black/60 hover:text-[#01aeee] transition-colors"
                >
                  <span>
                    {t.sourceLabel}: {card.sourceName}
                  </span>
                  <ExternalLink className="w-3 h-3 shrink-0" />
                </a>
              </div>
            ))}
          </div>

          <p className="text-xs text-black/70 italic">{t.weightedContext}</p>
        </section>

        {/* MARKET RANGE OVERVIEW */}
        <section className="space-y-4">
          <div>
            <h2 className="font-black text-lg text-black">{t.marketTitle}</h2>
            <p className="text-xs text-black/70">{t.marketSub}</p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm">
            <div className="flex justify-end mb-2">
              <ChartLegend t={t} />
            </div>
            <div className="divide-y divide-black/5">
              {MARKET_RANGES.map((item) => (
                <RangeRow key={item.key} label={t[item.key]} item={item} domain={160000} />
              ))}
            </div>
            <p className="mt-4 text-[10px] text-black/50">{t.unitNote}</p>
          </div>
        </section>

        {/* INSTITUTION-SPECIFIC CONTEXT */}
        <section className="space-y-4">
          <div>
            <h2 className="font-black text-lg text-black">{t.institutionTitle}</h2>
            <p className="text-xs text-black/70">{t.institutionSub}</p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm">
            <div className="divide-y divide-black/5">
              {INSTITUTION_RANGES.map((item) => (
                <RangeRow
                  key={item.key}
                  label={t[item.key]}
                  item={item}
                  domain={70000}
                  highlightLabel={t.institutionHighlight}
                />
              ))}
            </div>
            <p className="mt-4 text-[10px] text-black/50">{t.unitNote}</p>
          </div>
        </section>

        {/* KEY FINDINGS */}
        <section className="space-y-4">
          <h2 className="font-black text-lg text-black">{t.findingsTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[t.finding1, t.finding2, t.finding3].map((finding, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-[#01aeee] text-white shadow-lg border-2 border-[#01aeee]"
              >
                <p className="text-sm font-bold leading-snug">{finding}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SUPPORTING OBSERVATIONS */}
        <section className="space-y-4">
          <h2 className="font-black text-lg text-black">{t.bulletsTitle}</h2>
          <div className="p-5 sm:p-6 rounded-2xl bg-[#fdf102] border-2 border-black/10 shadow-sm">
            <ul className="space-y-3">
              {[t.bullet1, t.bullet2, t.bullet3, t.bullet4].map((bullet, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-black font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-black mt-1.5 shrink-0" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SOURCES */}
        <section className="space-y-4">
          <div>
            <h2 className="font-black text-lg text-black">{t.sourcesTitle}</h2>
            <p className="text-xs text-black/70">{t.sourcesSub}</p>
          </div>
          <div className="p-5 sm:p-6 rounded-2xl bg-white border-2 border-black/10 shadow-sm">
            <ul className="divide-y divide-black/10">
              {SOURCES.map((src) => (
                <li key={src.url} className="py-3 flex items-center justify-between gap-3">
                  <span className="text-xs sm:text-sm font-bold text-black">{src.name}</span>
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-100 hover:bg-[#01aeee] hover:text-white text-black text-xs font-bold transition-colors shrink-0"
                  >
                    <span className="hidden sm:inline">{src.url.replace('https://', '')}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
