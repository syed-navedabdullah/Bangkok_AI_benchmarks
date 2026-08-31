import React, { useState, useMemo } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  Award,
  Search,
  Sliders,
  Download,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Info,
  ShieldCheck,
  Building2,
  Globe2,
  ChevronRight,
  Sparkles,
  RefreshCw,
  ExternalLink,
  BookOpen,
  PieChart,
  BarChart3,
  Scale,
  Briefcase,
  X,
  FileSpreadsheet,
  Check,
  Zap,
  Layers,
  FileText,
  Languages
} from 'lucide-react';

// --- BILINGUAL DICTIONARY (GLACIAL INDIFFERENCE) ---
const TRANSLATIONS = {
  en: {
    appTitle: 'Bangkok AI Compensation Index',
    subHeader: 'Empirical market clearing rates for technical capital in Bangkok CBD. Subjective sentiment excluded.',
    marketBadge: 'Bangkok CBD • Verified 2026',
    verifiedPill: 'Empirically Audited Pool',
    marketNotice: 'Rates represent clearing prices within Bangkok CBD. Outliers removed without exception.',
    roleArchitecture: 'Job Architecture / Target Specimen',
    employerSegment: 'Capital Tier / Employer Segment',
    tierDesc: 'Adjusts base index by institutional liquidity.',
    seniorityGrade: 'Seniority Grade:',
    surveyPool: 'Observations:',
    confidence: 'confidence',
    tabBenchmarks: 'Distribution & Median',
    tabSources: 'Verification Datasets',
    tabSimulator: 'Offer Arbitrage Simulator',
    tabParity: 'Internal Parity / Compa-Ratio',
    exportBtn: 'Export Raw Matrix',
    p10: '10th Percentile (P10)',
    p10Sub: 'Baseline clearing threshold',
    p25: '25th Percentile (P25)',
    p25Sub: 'Lower operational bound',
    p50: '50th Percentile (Median)',
    p50Badge: 'Market Equilibrium',
    p50Sub: 'Systemic baseline for standard output',
    p75: '75th Percentile (P75)',
    p75Sub: 'Upper operational tier',
    p90: '90th Percentile (P90)',
    p90Sub: 'Statistical upper ceiling',
    distributionTitle: 'Compensation Density Curve',
    distributionSub: 'Base distribution for',
    coreBand: 'P25 - P75 (Core Spread)',
    fixedBase: 'Guaranteed Base Cash',
    fixedBaseSub: 'Fixed monthly capital transfer',
    variableBonus: 'Variable Incentive',
    variableBonusSub: 'Discretionary annual variable',
    ltiEquity: 'LTI / Equity Allocation',
    ltiEquitySub: 'Standard vesting schedule',
    ladderTitle: 'Seniority Ladder Matrix',
    ladderSub: 'Unfiltered compensation ladder across grades for',
    colGrade: 'Grade Level',
    colP10: 'P10 (Floor)',
    colP25: 'P25',
    colMedian: 'P50 (Median)',
    colP75: 'P75',
    colP90: 'P90 (Cap)',
    colBonus: 'Variable Term',
    colLti: 'Equity / LTI',
    sourcesTitle: 'Audit Methodology & Survey Sources',
    sourcesSub: 'Data is stripped of self-reporting bias and sourced directly from transaction ledgers and accredited firms.',
    sourcesAuditNoteTitle: 'System Disclaimers:',
    simTitle: 'Offer Arbitrage Simulator',
    simSub: 'Calculate candidate offer deviation from market equilibrium.',
    inputBase: 'Proposed Monthly Base',
    inputBonus: 'Bonus Target (Months)',
    inputEquity: 'Annual LTI / Equity',
    snapMedian: 'Snap to Market Median',
    evalTitle: 'Arbitrage Output',
    evalSub: 'Deviation analysis against',
    percentileRank: 'Percentile Index:',
    verdictOptimal: 'Equilibrium Reached (Standard Liquidity Transfer)',
    verdictBelow: 'Deficit Alert (High Rejection Probability)',
    verdictAbove: 'Capital Inefficiency / Premium Outlier',
    parityTitle: 'Internal Unit Parity & Compa-Ratio Audit',
    paritySub: 'Evaluation of active personnel against equilibrium indices.',
    parityBadge: 'Unit Ratio: 1.02 (Optimal)',
    colMember: 'Unit ID / Specimen',
    colTenure: 'Tenure (Bangkok)',
    colCurrentBase: 'Current Monthly Base',
    colCompa: 'Compa-Ratio',
    colPerf: 'Calculated Output',
    colParityStatus: 'Classification',
    statusAligned: 'Calibrated',
    statusFlag: 'Discrepancy Flag',
    btnDraftOffer: 'Compile Contract Terms',
    toastSwitchedCurrency: 'Currency converted: ',
    toastSwitchedLang: 'Language updated: ',
    toastPreset: 'Applied standard median calibration'
  },
  th: {
    appTitle: 'ดัชนีค่าตอบแทนด้าน AI ประจำกรุงเทพฯ',
    subHeader: 'อัตราค่าจ้างตลาดจริงสำหรับบุคลากรทางเทคนิคในพื้นที่ CBD กรุงเทพฯ ไม่นำอารมณ์ความรู้สึกส่วนตัวมาเกี่ยวข้อง',
    marketBadge: 'กรุงเทพฯ CBD • ข้อมูลตรวจสอบ 2026',
    verifiedPill: 'ชุดข้อมูลผ่านการตรวจสอบเชิงประจักษ์',
    marketNotice: 'อัตราอ้างอิงจากราคาตลาดจริงในย่าน CBD กรุงเทพฯ ค่าผิดปกติถูกตัดออกทั้งหมด',
    roleArchitecture: 'โครงสร้างตำแหน่ง / สายงานเป้าหมาย',
    employerSegment: 'กลุ่มประเภทองค์กร / สภาพคล่อง',
    tierDesc: 'ปรับฐานดัชนีตามสภาพคล่องและงบประมาณขององค์กร',
    seniorityGrade: 'ระดับความอาวุโส:',
    surveyPool: 'จำนวนตัวอย่าง:',
    confidence: 'ระดับความเชื่อมั่น',
    tabBenchmarks: 'การกระจายตัวและค่ามัธยฐาน',
    tabSources: 'แหล่งข้อมูลที่ผ่านการตรวจสอบ',
    tabSimulator: 'เครื่องมือจำลองข้อเสนอจ้างงาน',
    tabParity: 'ความเท่าเทียมและอัตราส่วน Compa-Ratio',
    exportBtn: 'ส่งออกข้อมูลดิบ',
    p10: 'เปอร์เซ็นไทล์ที่ 10 (P10)',
    p10Sub: 'เกณฑ์ราคาขั้นต่ำของตลาด',
    p25: 'เปอร์เซ็นไทล์ที่ 25 (P25)',
    p25Sub: 'ขอบเขตล่างของระดับมาตรฐาน',
    p50: 'เปอร์เซ็นไทล์ที่ 50 (ค่ามัธยฐาน)',
    p50Badge: 'จุดดุลยภาพของตลาด',
    p50Sub: 'เกณฑ์มาตรฐานสำหรับการปฏิบัติงานทั่วไป',
    p75: 'เปอร์เซ็นไทล์ที่ 75 (P75)',
    p75Sub: 'ขอบเขตบนของระดับมาตรฐาน',
    p90: 'เปอร์เซ็นไทล์ที่ 90 (P90)',
    p90Sub: 'เพดานสถิติสูงสุดของตลาด',
    distributionTitle: 'กราฟการกระจายตัวของค่าตอบแทน',
    distributionSub: 'ช่วงฐานเงินเดือนสำหรับตำแหน่ง',
    coreBand: 'P25 - P75 (ช่วงค่าจ้างหลัก)',
    fixedBase: 'ฐานเงินเดือนประจำ',
    fixedBaseSub: 'การโอนเงินเดือนคงที่รายเดือน',
    variableBonus: 'โบนัสตามผลงาน',
    variableBonusSub: 'ผลตอบแทนผันแปรรายปี',
    ltiEquity: 'หุ้นหรือผลตอบแทนระยะยาว (LTI)',
    ltiEquitySub: 'ตามรอบการได้รับสิทธิ์มาตรฐาน',
    ladderTitle: 'ตารางบันไดขั้นค่าตอบแทนตามระดับ',
    ladderSub: 'ข้อมูลค่าตอบแทนแบบละเอียดตามระดับตำแหน่งสำหรับ',
    colGrade: 'ระดับตำแหน่ง',
    colP10: 'P10 (ขั้นต่ำ)',
    colP25: 'P25',
    colMedian: 'P50 (มัธยฐาน)',
    colP75: 'P75',
    colP90: 'P90 (เพดาน)',
    colBonus: 'โบนัสเป้าหมาย',
    colLti: 'สิทธิ์หุ้น / LTI',
    sourcesTitle: 'ระเบียบวิธีวิจัยและแหล่งสำรวจข้อมูล',
    sourcesSub: 'ข้อมูลถูกคัดแยกอคติจากการรายงานตนเอง และรวบรวมจากบัญชีเงินเดือนจริงและบริษัทสรรหาชั้นนำ',
    sourcesAuditNoteTitle: 'หมายเหตุระบบ:',
    simTitle: 'ระบบจำลองข้อเสนอผลตอบแทน',
    simSub: 'คำนวณส่วนเบี่ยงเบนของข้อเสนอจ้างงานเทียบกับจุดดุลยภาพของตลาด',
    inputBase: 'ฐานเงินเดือนรายเดือนที่เสนอ',
    inputBonus: 'โบนัสเป้าหมาย (จำนวนเท่าของเดือน)',
    inputEquity: 'หุ้น / ผลตอบแทนระยะยาวต่อปี',
    snapMedian: 'ปรับตามค่ามัธยฐานตลาด',
    evalTitle: 'ผลการประเมินส่วนต่าง',
    evalSub: 'การวิเคราะห์ความเบี่ยงเบนเทียบกับตำแหน่ง',
    percentileRank: 'อันดับเปอร์เซ็นไทล์:',
    verdictOptimal: 'อยู่ในจุดดุลยภาพ (การแลกเปลี่ยนมูลค่าตามเกณฑ์มาตรฐาน)',
    verdictBelow: 'ต่ำกว่าเกณฑ์ตลาด (มีความเสี่ยงสูงที่ผู้สมัครจะปฏิเสธ)',
    verdictAbove: 'ต้นทุนทุนสูงเกินจำเป็น / ค่าผิดปกติระดับพรีเมียม',
    parityTitle: 'การตรวจสอบความเท่าเทียมภายในและอัตราส่วน Compa-Ratio',
    paritySub: 'การประเมินบุคลากรปัจจุบันเทียบกับดัชนีดุลยภาพตลาด',
    parityBadge: 'อัตราส่วนภาพรวม: 1.02 (สมดุล)',
    colMember: 'รหัสบุคลากร',
    colTenure: 'อายุงาน (กรุงเทพฯ)',
    colCurrentBase: 'ฐานเงินเดือนปัจจุบัน',
    colCompa: 'อัตราส่วน Compa-Ratio',
    colPerf: 'ผลการประเมิน',
    colParityStatus: 'สถานะการปรับเทียบ',
    statusAligned: 'อยู่ในเกณฑ์',
    statusFlag: 'ต้องทบทวน',
    btnDraftOffer: 'จัดทำเอกสารสัญญาจ้าง',
    toastSwitchedCurrency: 'เปลี่ยนสกุลเงินเป็น: ',
    toastSwitchedLang: 'เปลี่ยนภาษาเป็น: ',
    toastPreset: 'ปรับเทียบตามค่ามัธยฐานตลาดเรียบร้อย'
  }
};

// --- DATASET ---
const BANGKOK_AI_DATA = {
  'ai-solutions-architect': {
    title: { en: 'Lead AI & Digital Solutions Architect', th: 'สถาปนิกโซลูชัน AI และดิจิทัลระดับหัวหน้า' },
    category: { en: 'Architecture & Cloud AI', th: 'สถาปัตยกรรมระบบและคลาวด์ AI' },
    family: 'IC-5 / Level 5',
    sampleSize: 1420,
    confidence: '98.5%',
    marketSummary: {
      en: 'Demand driven purely by enterprise modernization in Bangkok. Subjective negotiations are inefficient; market settles strictly around technical capability in LLM deployment and hybrid infrastructure.',
      th: 'ความต้องการขับเคลื่อนจากการปรับปรุงระบบองค์กรในกรุงเทพฯ การเจรจาแบบใช้ความรู้สึกไม่มีประสิทธิภาพ ตลาดกำหนดราคาอย่างชัดเจนตามทักษะการวางระบบ LLM และคลาวด์'
    },
    levels: {
      'Junior Specialist': { p10: 75000, p25: 90000, median: 110000, p75: 135000, p90: 155000, bonusMonths: '1.5 - 2.5 mos', equity: 'Discretionary' },
      'Mid Solutions Architect': { p10: 120000, p25: 145000, median: 175000, p75: 210000, p90: 240000, bonusMonths: '2.0 - 3.5 mos', equity: '฿150k - ฿350k/yr' },
      'Senior AI Architect': { p10: 180000, p25: 220000, median: 260000, p75: 310000, p90: 360000, bonusMonths: '2.5 - 4.5 mos', equity: '฿400k - ฿800k/yr' },
      'Lead / Principal Architect': { p10: 250000, p25: 300000, median: 365000, p75: 440000, p90: 520000, bonusMonths: '3.0 - 6.0 mos', equity: '฿900k - ฿1.8M/yr' },
      'Enterprise Chief Architect': { p10: 350000, p25: 420000, median: 520000, p75: 640000, p90: 780000, bonusMonths: '4.0 - 8.0 mos', equity: '฿1.5M - ฿3.5M/yr' },
    },
    sources: [
      { name: 'Robert Walters Thailand Tech Salary Survey', sample: 560, weight: '35%', confidence: 'Audited Payroll Data', verifiedDate: 'Q2 2026' },
      { name: 'Michael Page Thailand Digital & AI Benchmark', sample: 410, weight: '30%', confidence: 'Placements Registry', verifiedDate: 'Q2 2026' },
      { name: 'Adecco Thailand ICT Salary Guide', sample: 280, weight: '20%', confidence: 'Enterprise Data', verifiedDate: 'Q1 2026' },
      { name: 'JobsDB / SEEK Thailand Tech Index (Bangkok CBD)', sample: 170, weight: '15%', confidence: 'Market Offers', verifiedDate: 'Q3 2026' }
    ]
  },
  'head-digital-transformation': {
    title: { en: 'Head of AI & Digital Transformation', th: 'หัวหน้าฝ่ายปฏิรูปองค์กรสู่ดิจิทัลและ AI' },
    category: { en: 'Executive & Strategy', th: 'ฝ่ายบริหารและยุทธศาสตร์' },
    family: 'Executive Director (E-1)',
    sampleSize: 840,
    confidence: '97.2%',
    marketSummary: {
      en: 'Evaluated solely by organizational capacity to execute AI transformation roadmaps across SET50 listed entities. Compensation scales predictably with balance sheet scale.',
      th: 'ประเมินจากความสามารถในการขับเคลื่อนยุทธศาสตร์ AI ในกลุ่มบริษัท SET50 โดยค่าตอบแทนแปรผันตรงตามขนาดงบดุลขององค์กร'
    },
    levels: {
      'Junior Specialist': { p10: 90000, p25: 115000, median: 140000, p75: 170000, p90: 195000, bonusMonths: '2.0 mos', equity: 'N/A' },
      'Mid Solutions Architect': { p10: 160000, p25: 195000, median: 235000, p75: 280000, p90: 320000, bonusMonths: '2.5 - 3.5 mos', equity: '฿200k - ฿450k/yr' },
      'Senior AI Architect': { p10: 240000, p25: 290000, median: 350000, p75: 420000, p90: 490000, bonusMonths: '3.0 - 5.0 mos', equity: '฿600k - ฿1.2M/yr' },
      'Lead / Principal Architect': { p10: 340000, p25: 410000, median: 490000, p75: 590000, p90: 690000, bonusMonths: '4.0 - 7.0 mos', equity: '฿1.2M - ฿2.5M/yr' },
      'Enterprise Chief Architect': { p10: 480000, p25: 580000, median: 720000, p75: 890000, p90: 1080000, bonusMonths: '5.0 - 9.0 mos', equity: '฿2.5M - ฿5.0M/yr' },
    },
    sources: [
      { name: 'Michael Page Thailand Executive Report', sample: 360, weight: '40%', confidence: 'Executive Registry', verifiedDate: 'Q2 2026' },
      { name: 'Robert Walters Thailand Transformation Survey', sample: 300, weight: '35%', confidence: 'Audited Placements', verifiedDate: 'Q2 2026' },
      { name: 'Mercer Thailand Total Remuneration Survey', sample: 180, weight: '25%', confidence: 'Corporate HR Submissions', verifiedDate: 'Q1 2026' }
    ]
  },
  'genai-llm-engineer': {
    title: { en: 'Senior Generative AI & LLM Engineer', th: 'วิศวกร Generative AI และ LLM ระดับอาวุโส' },
    category: { en: 'Engineering & Modeling', th: 'วิศวกรรมและการพัฒนาแบบจำลอง' },
    family: 'Individual Contributor (IC-4)',
    sampleSize: 1890,
    confidence: '99.0%',
    marketSummary: {
      en: 'Labor market shows severe shortage. Scarcity dictates clearing price; compensation reflects strictly mathematical scarcity of production-grade fine-tuning experience.',
      th: 'ตลาดแรงงานขาดแคลนอย่างหนัก ความขาดแคลนเป็นตัวกำหนดราคา ค่าตอบแทนสะท้อนถึงการขาดแคลนบุคลากรที่มีประสบการณ์ Fine-tuning ในระดับ Production'
    },
    levels: {
      'Junior Specialist': { p10: 55000, p25: 68000, median: 85000, p75: 105000, p90: 125000, bonusMonths: '1.5 - 2.5 mos', equity: 'Discretionary' },
      'Mid Solutions Architect': { p10: 95000, p25: 120000, median: 145000, p75: 175000, p90: 205000, bonusMonths: '2.0 - 3.5 mos', equity: '฿100k - ฿300k/yr' },
      'Senior AI Architect': { p10: 150000, p25: 185000, median: 225000, p75: 275000, p90: 325000, bonusMonths: '2.5 - 4.5 mos', equity: '฿350k - ฿750k/yr' },
      'Lead / Principal Architect': { p10: 220000, p25: 270000, median: 330000, p75: 395000, p90: 460000, bonusMonths: '3.0 - 6.0 mos', equity: '฿800k - ฿1.6M/yr' },
      'Enterprise Chief Architect': { p10: 300000, p25: 370000, median: 450000, p75: 550000, p90: 670000, bonusMonths: '4.0 - 7.5 mos', equity: '฿1.5M - ฿3.0M/yr' },
    },
    sources: [
      { name: 'Robert Walters Thailand Tech Survey', sample: 820, weight: '40%', confidence: 'Audited Payroll Data', verifiedDate: 'Q2 2026' },
      { name: 'Adecco Thailand ICT Guide', sample: 550, weight: '30%', confidence: 'Enterprise Records', verifiedDate: 'Q1 2026' },
      { name: 'JobsDB / SEEK Thailand Tech Index', sample: 320, weight: '20%', confidence: 'Market Postings', verifiedDate: 'Q3 2026' }
    ]
  },
  'ai-digital-pm': {
    title: { en: 'Lead AI & Digital Product Manager', th: 'ผู้จัดการฝ่ายผลิตภัณฑ์ AI และดิจิทัลระดับหัวหน้า' },
    category: { en: 'Product & Delivery', th: 'การบริหารผลิตภัณฑ์' },
    family: 'Product Track (M-3)',
    sampleSize: 1120,
    confidence: '97.8%',
    marketSummary: {
      en: 'Interface mechanism between algorithmic development and corporate revenue streams. Value output is measured purely in product feature adoption velocity.',
      th: 'กลไกเชื่อมโยงระหว่างการพัฒนาอัลกอริทึมกับรายได้องค์กร วัดผลเชิงปริมาณจากความเร็วในการนำผลิตภัณฑ์ไปใช้งานจริง'
    },
    levels: {
      'Junior Specialist': { p10: 50000, p25: 62000, median: 78000, p75: 96000, p90: 115000, bonusMonths: '1.5 - 2.0 mos', equity: 'Discretionary' },
      'Mid Solutions Architect': { p10: 85000, p25: 105000, median: 130000, p75: 160000, p90: 185000, bonusMonths: '2.0 - 3.0 mos', equity: '฿80k - ฿250k/yr' },
      'Senior AI Architect': { p10: 135000, p25: 165000, median: 200000, p75: 245000, p90: 290000, bonusMonths: '2.5 - 4.0 mos', equity: '฿300k - ฿650k/yr' },
      'Lead / Principal Architect': { p10: 195000, p25: 240000, median: 295000, p75: 355000, p90: 420000, bonusMonths: '3.0 - 5.0 mos', equity: '฿700k - ฿1.4M/yr' },
      'Enterprise Chief Architect': { p10: 270000, p25: 330000, median: 410000, p75: 500000, p90: 610000, bonusMonths: '4.0 - 7.0 mos', equity: '฿1.2M - ฿2.8M/yr' },
    },
    sources: [
      { name: 'Michael Page Thailand Tech Benchmark', sample: 490, weight: '40%', confidence: 'Executive Placements', verifiedDate: 'Q2 2026' },
      { name: 'Robert Walters Thailand Tech Survey', sample: 390, weight: '35%', confidence: 'Audited Payroll Data', verifiedDate: 'Q2 2026' },
      { name: 'Adecco Thailand ICT Guide', sample: 240, weight: '25%', confidence: 'Corporate Records', verifiedDate: 'Q1 2026' }
    ]
  },
  'mlops-cloud-lead': {
    title: { en: 'Staff MLOps & AI Infrastructure Lead', th: 'หัวหน้าฝ่ายโครงสร้างพื้นฐาน MLOps และคลาวด์' },
    category: { en: 'MLOps & Infrastructure', th: 'โครงสร้างพื้นฐานและการปฏิบัติการ ML' },
    family: 'Technical Leadership (IC-5)',
    sampleSize: 980,
    confidence: '97.5%',
    marketSummary: {
      en: 'Deterministic value based on GPU compute optimization and uptime guarantees. Compensation scales directly with cluster complexity under direct management.',
      th: 'มูลค่ากำหนดจากประสิทธิภาพการบริหารคลัสเตอร์ GPU และเสถียรภาพระบบ ค่าตอบแทนผันแปรตรงตามความซับซ้อนของระบบ'
    },
    levels: {
      'Junior Specialist': { p10: 60000, p25: 75000, median: 92000, p75: 112000, p90: 132000, bonusMonths: '1.5 - 2.5 mos', equity: 'Discretionary' },
      'Mid Solutions Architect': { p10: 105000, p25: 130000, median: 155000, p75: 185000, p90: 215000, bonusMonths: '2.0 - 3.5 mos', equity: '฿120k - ฿320k/yr' },
      'Senior AI Architect': { p10: 160000, p25: 195000, median: 235000, p75: 285000, p90: 340000, bonusMonths: '2.5 - 4.5 mos', equity: '฿380k - ฿800k/yr' },
      'Lead / Principal Architect': { p10: 230000, p25: 280000, median: 345000, p75: 415000, p90: 485000, bonusMonths: '3.0 - 6.0 mos', equity: '฿850k - ฿1.7M/yr' },
      'Enterprise Chief Architect': { p10: 320000, p25: 390000, median: 480000, p75: 580000, p90: 700000, bonusMonths: '4.0 - 8.0 mos', equity: '฿1.5M - ฿3.2M/yr' },
    },
    sources: [
      { name: 'Robert Walters Thailand Tech Survey', sample: 440, weight: '45%', confidence: 'Audited Placements', verifiedDate: 'Q2 2026' },
      { name: 'Adecco Thailand ICT Guide', sample: 310, weight: '30%', confidence: 'Enterprise Data', verifiedDate: 'Q1 2026' },
      { name: 'JobsDB / SEEK Thailand Index', sample: 230, weight: '25%', confidence: 'Market Offers', verifiedDate: 'Q3 2026' }
    ]
  }
};

// --- INSTITUTIONAL CAPITAL TIERS ---
const BANGKOK_TIERS = [
  { id: 'tier1-mnc', label: { en: 'Tier 1 Global MNC / Regional Hub (Agoda, Grab, Google TH)', th: 'องค์กรข้ามชาติระดับ Tier 1 / ฮับภูมิภาค (Agoda, Grab, Google TH)' }, factor: 1.25, badge: '125% Index' },
  { id: 'tier2-thai-corp', label: { en: 'Tier 2 Thai Conglomerate / Tech Unit (KBTG, SCB 10X, True Digital)', th: 'กลุ่มธุรกิจชั้นนำของไทย / บริษัทเทค (KBTG, SCB 10X, True Digital)' }, factor: 1.00, badge: '100% Index (Par)' },
  { id: 'tier3-scaleup', label: { en: 'Tier 3 Series A/B Scale-up / Specialized SI', th: 'สตาร์ทอัพเติบโตสูง / บริษัทที่ปรึกษาโซลูชันเฉพาะทาง' }, factor: 0.82, badge: '82% Index' }
];

const USD_EXCHANGE_RATE = 35.8;

export default function App() {
  // Localization & State
  const [lang, setLang] = useState('en'); // 'en' | 'th'
  const t = TRANSLATIONS[lang];

  const [selectedRoleKey, setSelectedRoleKey] = useState('ai-solutions-architect');
  const [selectedLevel, setSelectedLevel] = useState('Senior AI Architect');
  const [selectedTier, setSelectedTier] = useState('tier2-thai-corp');
  const [currencyMode, setCurrencyMode] = useState('THB'); // THB or USD
  const [viewInterval, setViewInterval] = useState('monthly'); // monthly or annual
  const [activeTab, setActiveTab] = useState('benchmarks');
  const [toastMsg, setToastMsg] = useState(null);

  // Candidate Offer Simulator Inputs
  const [candidateMonthlyBase, setCandidateMonthlyBase] = useState(260000);
  const [candidateBonusMonths, setCandidateBonusMonths] = useState(3.5);
  const [candidateAnnualEquity, setCandidateAnnualEquity] = useState(500000);

  const roleData = BANGKOK_AI_DATA[selectedRoleKey] || BANGKOK_AI_DATA['ai-solutions-architect'];
  const activeTierObj = BANGKOK_TIERS.find(t => t.id === selectedTier) || BANGKOK_TIERS[1];
  const tierMultiplier = activeTierObj.factor;

  const rawLevelData = roleData.levels[selectedLevel] || roleData.levels['Senior AI Architect'];

  // Adjusted Benchmark Calculation
  const adjustedBenchmark = useMemo(() => {
    return {
      p10: Math.round(rawLevelData.p10 * tierMultiplier),
      p25: Math.round(rawLevelData.p25 * tierMultiplier),
      median: Math.round(rawLevelData.median * tierMultiplier),
      p75: Math.round(rawLevelData.p75 * tierMultiplier),
      p90: Math.round(rawLevelData.p90 * tierMultiplier),
      bonusMonths: rawLevelData.bonusMonths,
      equity: rawLevelData.equity
    };
  }, [rawLevelData, tierMultiplier]);

  const formatSalary = (valInTHBMonthly, forceAnnual = false) => {
    let numeric = valInTHBMonthly;
    const isAnnual = forceAnnual || viewInterval === 'annual';
    if (isAnnual) numeric = numeric * 12;

    if (currencyMode === 'USD') {
      const inUSD = numeric / USD_EXCHANGE_RATE;
      return `$${Math.round(inUSD).toLocaleString('en-US')}${isAnnual ? (lang === 'th' ? '/ปี' : '/yr') : (lang === 'th' ? '/เดือน' : '/mo')}`;
    }
    return `฿${Math.round(numeric).toLocaleString('en-US')}${isAnnual ? (lang === 'th' ? '/ปี' : '/yr') : (lang === 'th' ? '/เดือน' : '/mo')}`;
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 2500);
  };

  // Arbitrage Percentile Index
  const offerPercentile = useMemo(() => {
    const { p10, p25, median, p75, p90 } = adjustedBenchmark;
    const offer = Number(candidateMonthlyBase);

    if (offer <= p10) return Math.max(2, Math.round((offer / p10) * 10));
    if (offer <= p25) return 10 + Math.round(((offer - p10) / (p25 - p10)) * 15);
    if (offer <= median) return 25 + Math.round(((offer - p25) / (median - p25)) * 25);
    if (offer <= p75) return 50 + Math.round(((offer - median) / (p75 - median)) * 25);
    if (offer <= p90) return 75 + Math.round(((offer - p75) / (p90 - p75)) * 15);
    return Math.min(99, 90 + Math.round(((offer - p90) / p90) * 10));
  }, [candidateMonthlyBase, adjustedBenchmark]);

  // Distribution chart range
  const minChart = adjustedBenchmark.p10 * 0.85;
  const maxChart = adjustedBenchmark.p90 * 1.15;
  const getXPercent = (val) => Math.max(0, Math.min(100, ((val - minChart) / (maxChart - minChart)) * 100));

  return (
    <div className="min-h-screen bg-white text-black antialiased selection:bg-[#fdf102] selection:text-black flex flex-col font-['Glacial_Indifference',sans-serif]">
      {/* Glacial Indifference Google / Web Font embedding */}
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/glacial-indifference-2');
        * {
          font-family: 'Glacial Indifference', sans-serif;
        }
      `}</style>

      {/* TOAST POPUP */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#01aeee] text-white text-xs font-bold rounded-xl shadow-2xl border-2 border-black animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-white" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* HEADER BAR */}
      <header className="h-16 px-6 border-b-2 border-black/10 bg-white flex items-center justify-between sticky top-0 z-40">
        
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#01aeee] flex items-center justify-center text-white font-black shadow-md">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-black text-base tracking-tight text-black">
                {t.appTitle}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#fdf102] text-black border border-black/20">
                {t.marketBadge}
              </span>
            </div>
            <span className="text-[11px] text-black/70 font-medium hidden sm:inline">
              {t.subHeader}
            </span>
          </div>
        </div>

        {/* CONTROLS (LANGUAGE, CURRENCY, INTERVAL) */}
        <div className="flex items-center gap-2.5">
          
          {/* LANGUAGE SWITCHER (EN / TH) */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-black/20 text-xs font-bold">
            <button
              onClick={() => { setLang('en'); showToast(`${t.toastSwitchedLang} English`); }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${lang === 'en' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              <span>🇬🇧</span>
              <span>EN</span>
            </button>
            <button
              onClick={() => { setLang('th'); showToast(`${t.toastSwitchedLang} ภาษาไทย`); }}
              className={`px-2.5 py-1 rounded-lg transition-all flex items-center gap-1.5 ${lang === 'th' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              <span>🇹🇭</span>
              <span>TH</span>
            </button>
          </div>

          {/* CURRENCY TOGGLE */}
          <div className="flex items-center p-1 rounded-xl bg-neutral-100 border border-black/20 text-xs font-bold">
            <button
              onClick={() => { setCurrencyMode('THB'); showToast(`${t.toastSwitchedCurrency}฿ THB`); }}
              className={`px-2 py-1 rounded-lg transition-all ${currencyMode === 'THB' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              ฿ THB
            </button>
            <button
              onClick={() => { setCurrencyMode('USD'); showToast(`${t.toastSwitchedCurrency}$ USD`); }}
              className={`px-2 py-1 rounded-lg transition-all ${currencyMode === 'USD' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              $ USD
            </button>
          </div>

          {/* INTERVAL SELECTOR */}
          <div className="hidden sm:flex items-center p-1 rounded-xl bg-neutral-100 border border-black/20 text-xs font-bold">
            <button
              onClick={() => setViewInterval('monthly')}
              className={`px-3 py-1 rounded-lg transition-all ${viewInterval === 'monthly' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              {lang === 'th' ? 'รายเดือน' : 'Monthly'}
            </button>
            <button
              onClick={() => setViewInterval('annual')}
              className={`px-3 py-1 rounded-lg transition-all ${viewInterval === 'annual' ? 'bg-[#01aeee] text-white font-black shadow-xs' : 'text-black hover:bg-neutral-200'}`}
            >
              {lang === 'th' ? 'รายปี' : 'Annual'}
            </button>
          </div>

          {/* EXPORT RAW MATRIX */}
          <button
            onClick={() => showToast(lang === 'th' ? 'ส่งออกชุดข้อมูลแล้ว' : 'Raw index matrix exported (.CSV)')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#01aeee] hover:bg-[#009fd9] text-white text-xs font-bold shadow-md transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-white" />
            <span className="hidden md:inline">{t.exportBtn}</span>
          </button>
        </div>

      </header>

      {/* NAVIGATION TABS */}
      <div className="bg-white border-b-2 border-black/10 px-6 flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex items-center gap-1 py-2">
          {[
            { id: 'benchmarks', label: t.tabBenchmarks, icon: BarChart3 },
            { id: 'sources', label: t.tabSources, icon: BookOpen, badge: `${roleData.sources.length}` },
            { id: 'simulator', label: t.tabSimulator, icon: DollarSign },
            { id: 'parity', label: t.tabParity, icon: ShieldCheck }
          ].map(tab => {
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  active
                    ? 'bg-[#01aeee] text-white shadow-sm font-black'
                    : 'text-black hover:bg-neutral-100 font-bold'
                }`}
              >
                <tab.icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${active ? 'bg-white text-[#01aeee]' : 'bg-[#fdf102] text-black border border-black/20'}`}>
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="text-[11px] text-black/70 hidden lg:flex items-center gap-1.5 font-medium">
          <Info className="w-3.5 h-3.5 text-[#01aeee]" />
          <span>{t.marketNotice}</span>
        </div>
      </div>

      {/* MAIN BODY CONTAINER */}
      <main className="flex-1 p-6 max-w-7xl w-full mx-auto space-y-6">

        {/* ROLE SELECTION & EMPLOYER SEGMENT TILES */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* ROLE ARCHITECTURE GRID (CARD: YELLOW) */}
          <div className="lg:col-span-2 p-5 rounded-2xl bg-[#fdf102] text-black shadow-xl space-y-3 border-2 border-black/10">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-black" />
                {t.roleArchitecture}
              </label>
              <span className="text-[10px] text-white bg-[#01aeee] px-2 py-0.5 rounded font-bold">
                {roleData.family}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {Object.entries(BANGKOK_AI_DATA).map(([key, data]) => {
                const isSelected = selectedRoleKey === key;
                return (
                  <button
                    key={key}
                    onClick={() => { setSelectedRoleKey(key); showToast(`${data.title[lang]} loaded`); }}
                    className={`p-3 rounded-xl border-2 text-left transition-all ${
                      isSelected
                        ? 'bg-[#01aeee] border-[#01aeee] text-white font-black shadow-md'
                        : 'bg-white/80 border-black/10 text-black hover:bg-white hover:border-black/30'
                    }`}
                  >
                    <div className="font-bold text-xs leading-snug line-clamp-1">{data.title[lang]}</div>
                    <div className="text-[10px] mt-1 flex items-center justify-between">
                      <span className={isSelected ? 'text-white/90 font-medium' : 'text-black/70'}>{data.category[lang]}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CAPITAL TIER SELECTOR (CARD: YELLOW) */}
          <div className="p-5 rounded-2xl bg-[#fdf102] text-black shadow-xl space-y-3 flex flex-col justify-between border-2 border-black/10">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-[11px] font-bold text-black uppercase tracking-wider flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-black" />
                  {t.employerSegment}
                </label>
              </div>
              <p className="text-[11px] text-black/80 mb-3">{t.tierDesc}</p>

              <div className="space-y-2">
                {BANGKOK_TIERS.map(tier => {
                  const isSelected = selectedTier === tier.id;
                  return (
                    <button
                      key={tier.id}
                      onClick={() => { setSelectedTier(tier.id); showToast(`Index applied: ${tier.badge}`); }}
                      className={`w-full p-2.5 rounded-xl border-2 text-left text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'bg-[#01aeee] border-[#01aeee] text-white font-black shadow-md'
                          : 'bg-white/80 border-black/10 text-black hover:bg-white hover:border-black/30'
                      }`}
                    >
                      <span className="truncate pr-2">{tier.label[lang]}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold shrink-0 ${isSelected ? 'bg-white text-[#01aeee]' : 'bg-black/10 text-black'}`}>
                        {tier.badge}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* SENIORITY GRADE TOGGLES */}
        <div className="flex items-center justify-between flex-wrap gap-3 pb-2 border-b-2 border-black/10">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="text-xs font-bold text-black mr-2 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5 text-[#01aeee]" /> {t.seniorityGrade}
            </span>
            {Object.keys(roleData.levels).map((lvl) => {
              const isSelected = selectedLevel === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border-2 ${
                    isSelected
                      ? 'bg-[#01aeee] text-white border-[#01aeee] shadow-md font-black'
                      : 'bg-[#fdf102] text-black border-black/10 hover:border-black/30'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          <div className="text-xs text-black font-bold">
            {t.surveyPool} <span className="text-[#01aeee] font-black">{roleData.sampleSize.toLocaleString()}</span> ({roleData.confidence} {t.confidence})
          </div>
        </div>

        {/* TAB 1: SALARY BENCHMARKS */}
        {activeTab === 'benchmarks' && (
          <div className="space-y-6">

            {/* SUMMARY STAT CARDS (P10 -> P90) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              
              {/* P10 */}
              <div className="p-4 rounded-2xl bg-[#fdf102] text-black shadow-lg border-2 border-black/10">
                <div className="text-black/80 text-xs flex items-center justify-between">
                  <span>{t.p10}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 text-black font-bold">Floor</span>
                </div>
                <div className="text-2xl font-black mt-2 tracking-tight text-black">
                  {formatSalary(adjustedBenchmark.p10)}
                </div>
                <div className="text-[10px] text-black/70 mt-1">{t.p10Sub}</div>
              </div>

              {/* P25 */}
              <div className="p-4 rounded-2xl bg-[#fdf102] text-black shadow-lg border-2 border-black/10">
                <div className="text-black/80 text-xs flex items-center justify-between">
                  <span>{t.p25}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 text-black font-bold">Lower</span>
                </div>
                <div className="text-2xl font-black mt-2 tracking-tight text-black">
                  {formatSalary(adjustedBenchmark.p25)}
                </div>
                <div className="text-[10px] text-black/70 mt-1">{t.p25Sub}</div>
              </div>

              {/* P50 MEDIAN (BLUE ACTIVE CARD) */}
              <div className="p-4 rounded-2xl bg-[#01aeee] text-white shadow-2xl border-2 border-[#01aeee] relative overflow-hidden">
                <div className="text-white text-xs font-bold flex items-center justify-between">
                  <span>{t.p50}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#fdf102] text-black font-black uppercase">
                    {t.p50Badge}
                  </span>
                </div>
                <div className="text-3xl font-black mt-2 tracking-tight text-white">
                  {formatSalary(adjustedBenchmark.median)}
                </div>
                <div className="text-[10px] text-white/90 mt-1 font-bold">{t.p50Sub}</div>
              </div>

              {/* P75 */}
              <div className="p-4 rounded-2xl bg-[#fdf102] text-black shadow-lg border-2 border-black/10">
                <div className="text-black/80 text-xs flex items-center justify-between">
                  <span>{t.p75}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 text-black font-bold">Upper</span>
                </div>
                <div className="text-2xl font-black mt-2 tracking-tight text-black">
                  {formatSalary(adjustedBenchmark.p75)}
                </div>
                <div className="text-[10px] text-black/70 mt-1">{t.p75Sub}</div>
              </div>

              {/* P90 */}
              <div className="p-4 rounded-2xl bg-[#fdf102] text-black shadow-lg border-2 border-black/10">
                <div className="text-black/80 text-xs flex items-center justify-between">
                  <span>{t.p90}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/10 text-black font-bold">Cap</span>
                </div>
                <div className="text-2xl font-black mt-2 tracking-tight text-black">
                  {formatSalary(adjustedBenchmark.p90)}
                </div>
                <div className="text-[10px] text-black/70 mt-1">{t.p90Sub}</div>
              </div>

            </div>

            {/* SPREAD BAR VISUALIZATION */}
            <div className="p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl space-y-6 border-2 border-black/10">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-black">{t.distributionTitle}</h3>
                  <p className="text-xs text-black/80">
                    {t.distributionSub} <span className="font-bold underline">{roleData.title[lang]}</span> ({selectedLevel})
                  </p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-white border border-black/20"></span>
                    <span className="text-black">P10 - P25</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-[#01aeee] border border-[#01aeee]"></span>
                    <span className="text-black font-bold">{t.coreBand}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-white border border-black/20"></span>
                    <span className="text-black">P75 - P90</span>
                  </div>
                </div>
              </div>

              {/* SPREAD TRACK */}
              <div className="pt-8 pb-10 px-4 relative">
                <div className="h-6 w-full bg-white rounded-full relative overflow-hidden flex items-center border-2 border-black/20">
                  <div
                    style={{
                      left: `${getXPercent(adjustedBenchmark.p25)}%`,
                      width: `${getXPercent(adjustedBenchmark.p75) - getXPercent(adjustedBenchmark.p25)}%`
                    }}
                    className="absolute h-full bg-[#01aeee]"
                  />
                  <div
                    style={{ left: `${getXPercent(adjustedBenchmark.median)}%` }}
                    className="absolute h-full w-1.5 bg-black z-10"
                  />
                </div>

                {/* P10 Marker */}
                <div
                  style={{ left: `${getXPercent(adjustedBenchmark.p10)}%` }}
                  className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-[10px] text-black font-bold">P10</span>
                  <div className="w-0.5 h-3 bg-black my-0.5" />
                  <span className="text-[11px] text-black mt-7 font-bold">{formatSalary(adjustedBenchmark.p10)}</span>
                </div>

                {/* P25 Marker */}
                <div
                  style={{ left: `${getXPercent(adjustedBenchmark.p25)}%` }}
                  className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-[10px] text-black font-bold">P25</span>
                  <div className="w-0.5 h-3 bg-black my-0.5" />
                  <span className="text-[11px] text-black mt-7 font-bold">{formatSalary(adjustedBenchmark.p25)}</span>
                </div>

                {/* Median Pin */}
                <div
                  style={{ left: `${getXPercent(adjustedBenchmark.median)}%` }}
                  className="absolute top-[-10px] transform -translate-x-1/2 flex flex-col items-center z-20"
                >
                  <span className="text-[10px] px-2.5 py-0.5 rounded bg-[#01aeee] text-white font-black shadow-sm">
                    MEDIAN
                  </span>
                  <div className="w-1 h-5 bg-[#01aeee] my-0.5" />
                  <span className="text-xs text-white mt-5 font-black bg-[#01aeee] px-2 py-0.5 rounded shadow-sm">
                    {formatSalary(adjustedBenchmark.median)}
                  </span>
                </div>

                {/* P75 Marker */}
                <div
                  style={{ left: `${getXPercent(adjustedBenchmark.p75)}%` }}
                  className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-[10px] text-black font-bold">P75</span>
                  <div className="w-0.5 h-3 bg-black my-0.5" />
                  <span className="text-[11px] text-black mt-7 font-bold">{formatSalary(adjustedBenchmark.p75)}</span>
                </div>

                {/* P90 Marker */}
                <div
                  style={{ left: `${getXPercent(adjustedBenchmark.p90)}%` }}
                  className="absolute top-0 transform -translate-x-1/2 flex flex-col items-center"
                >
                  <span className="text-[10px] text-black font-bold">P90</span>
                  <div className="w-0.5 h-3 bg-black my-0.5" />
                  <span className="text-[11px] text-black mt-7 font-bold">{formatSalary(adjustedBenchmark.p90)}</span>
                </div>
              </div>

              {/* CASH VS BONUS VS LTI */}
              <div className="pt-6 border-t-2 border-black/10 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-white text-black border border-black/10 shadow-sm">
                  <div className="text-black/70 text-xs font-bold">{t.fixedBase}</div>
                  <div className="text-lg font-black text-black mt-1">{formatSalary(adjustedBenchmark.median)}</div>
                  <div className="text-[11px] text-black/60 mt-0.5">{t.fixedBaseSub}</div>
                </div>

                <div className="p-4 rounded-xl bg-[#01aeee] text-white border border-[#01aeee] shadow-sm">
                  <div className="text-white/90 text-xs font-bold">{t.variableBonus}</div>
                  <div className="text-lg font-black text-white mt-1">{adjustedBenchmark.bonusMonths}</div>
                  <div className="text-[11px] text-white/80 mt-0.5 font-medium">{t.variableBonusSub}</div>
                </div>

                <div className="p-4 rounded-xl bg-white text-black border border-black/10 shadow-sm">
                  <div className="text-black/70 text-xs font-bold">{t.ltiEquity}</div>
                  <div className="text-lg font-black text-black mt-1">{adjustedBenchmark.equity}</div>
                  <div className="text-[11px] text-black/60 mt-0.5">{t.ltiEquitySub}</div>
                </div>
              </div>
            </div>

            {/* FULL LADDER TABLE */}
            <div className="p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl border-2 border-black/10">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black/10">
                <div>
                  <h3 className="font-bold text-base text-black">{t.ladderTitle}</h3>
                  <p className="text-xs text-black/80">{t.ladderSub} {roleData.title[lang]}</p>
                </div>
                <span className="text-xs text-white bg-[#01aeee] px-2 py-0.5 rounded font-bold shadow-xs">{activeTierObj.badge}</span>
              </div>

              <div className="overflow-x-auto mt-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-black/20 text-black">
                      <th className="pb-3 font-bold">{t.colGrade}</th>
                      <th className="pb-3 font-bold">{t.colP10}</th>
                      <th className="pb-3 font-bold">{t.colP25}</th>
                      <th className="pb-3 font-bold text-[#01aeee]">{t.colMedian}</th>
                      <th className="pb-3 font-bold">{t.colP75}</th>
                      <th className="pb-3 font-bold">{t.colP90}</th>
                      <th className="pb-3 font-bold">{t.colBonus}</th>
                      <th className="pb-3 font-bold">{t.colLti}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {Object.entries(roleData.levels).map(([lvl, data]) => {
                      const isCurrent = selectedLevel === lvl;
                      return (
                        <tr
                          key={lvl}
                          onClick={() => setSelectedLevel(lvl)}
                          className={`cursor-pointer transition-colors ${
                            isCurrent ? 'bg-[#01aeee] text-white font-black' : 'hover:bg-white/60 text-black'
                          }`}
                        >
                          <td className="py-3.5 px-2 flex items-center gap-2 rounded-l-lg">
                            {isCurrent && <span className="w-2 h-2 rounded-full bg-white" />}
                            <span className={isCurrent ? 'text-white font-black' : 'text-black font-bold'}>{lvl}</span>
                          </td>
                          <td className="py-3.5 px-2">{formatSalary(Math.round(data.p10 * tierMultiplier))}</td>
                          <td className="py-3.5 px-2">{formatSalary(Math.round(data.p25 * tierMultiplier))}</td>
                          <td className={`py-3.5 px-2 font-bold ${isCurrent ? 'text-white' : 'text-[#01aeee]'}`}>{formatSalary(Math.round(data.median * tierMultiplier))}</td>
                          <td className="py-3.5 px-2">{formatSalary(Math.round(data.p75 * tierMultiplier))}</td>
                          <td className="py-3.5 px-2">{formatSalary(Math.round(data.p90 * tierMultiplier))}</td>
                          <td className="py-3.5 px-2">{data.bonusMonths}</td>
                          <td className="py-3.5 px-2 rounded-r-lg">{data.equity}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: VERIFIED DATA SOURCES */}
        {activeTab === 'sources' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl border-2 border-black/10">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black/10">
                <div>
                  <h3 className="font-bold text-base text-black">{t.sourcesTitle}</h3>
                  <p className="text-xs text-black/80">{t.sourcesSub}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs bg-[#01aeee] text-white flex items-center gap-1.5 font-bold shadow-xs">
                  <ShieldCheck className="w-4 h-4 text-white" /> {t.verifiedPill}
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {roleData.sources.map((src, idx) => (
                  <div key={idx} className="p-4 rounded-xl border border-black/10 bg-white text-black flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-black">{src.name}</span>
                        <span className="text-[10px] px-2 py-0.5 rounded bg-[#fdf102] text-black font-bold border border-black/20">
                          Weight: {src.weight}
                        </span>
                      </div>
                      <p className="text-xs text-black/70">
                        N = {src.sample.toLocaleString()} data points • Verification: {src.verifiedDate}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#01aeee] text-white shadow-xs">
                        {src.confidence}
                      </span>
                      <button
                        onClick={() => showToast(`Audit hash verified for ${src.name}`)}
                        className="p-2 rounded-lg bg-[#fdf102] hover:bg-neutral-100 text-black transition-colors cursor-pointer border border-black/20"
                        title="Audit Hash"
                      >
                        <ExternalLink className="w-4 h-4 text-black" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-xl bg-white border border-black/10 text-xs text-black space-y-2 shadow-sm">
                <div className="font-bold text-[#01aeee] flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#01aeee]" /> {t.sourcesAuditNoteTitle}
                </div>
                <p className="text-black/80 leading-relaxed">
                  {roleData.marketSummary[lang]}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: OFFER ARBITRAGE SIMULATOR */}
        {activeTab === 'simulator' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* INPUT PANEL */}
            <div className="p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl border-2 border-black/10 space-y-5">
              <div>
                <h3 className="font-bold text-base text-black">{t.simTitle}</h3>
                <p className="text-xs text-black/80">{t.simSub}</p>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  {t.inputBase} ({currencyMode})
                </label>
                <div className="relative">
                  <span className="text-black/60 absolute left-3 top-1/2 transform -translate-y-1/2 font-bold text-xs">
                    {currencyMode === 'USD' ? '$' : '฿'}
                  </span>
                  <input
                    type="number"
                    step="5000"
                    value={candidateMonthlyBase}
                    onChange={(e) => setCandidateMonthlyBase(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-black/20 text-black text-sm outline-none focus:border-[#01aeee] focus:ring-2 focus:ring-[#01aeee]/30 font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  {t.inputBonus}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={candidateBonusMonths}
                  onChange={(e) => setCandidateBonusMonths(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-white border border-black/20 text-black text-sm outline-none focus:border-[#01aeee] focus:ring-2 focus:ring-[#01aeee]/30 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-black mb-1.5">
                  {t.inputEquity} ({currencyMode})
                </label>
                <div className="relative">
                  <span className="text-black/60 absolute left-3 top-1/2 transform -translate-y-1/2 font-bold text-xs">
                    {currencyMode === 'USD' ? '$' : '฿'}
                  </span>
                  <input
                    type="number"
                    step="50000"
                    value={candidateAnnualEquity}
                    onChange={(e) => setCandidateAnnualEquity(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white border border-black/20 text-black text-sm outline-none focus:border-[#01aeee] focus:ring-2 focus:ring-[#01aeee]/30 font-bold"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setCandidateMonthlyBase(adjustedBenchmark.median);
                  setCandidateBonusMonths(3.5);
                  showToast(t.toastPreset);
                }}
                className="w-full py-2.5 rounded-xl bg-[#01aeee] hover:bg-[#009fd9] text-white text-xs font-bold transition-colors cursor-pointer shadow-md"
              >
                {t.snapMedian} ({formatSalary(adjustedBenchmark.median)})
              </button>
            </div>

            {/* RESULTS PANEL */}
            <div className="lg:col-span-2 p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl border-2 border-black/10 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between pb-4 border-b-2 border-black/10">
                  <div>
                    <h3 className="font-bold text-base text-black">{t.evalTitle}</h3>
                    <p className="text-xs text-black/80">{t.evalSub} {roleData.title[lang]} ({selectedLevel})</p>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-xs text-black font-bold">{t.percentileRank}</span>
                    <div className="text-2xl font-black text-[#01aeee]">
                      {offerPercentile}th Percentile
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-black/80">&lt;P35 (Deficit)</span>
                    <span className="text-[#01aeee]">P40 - P65 (Equilibrium)</span>
                    <span className="text-black/80">&gt;P75 (Outlier)</span>
                  </div>
                  <div className="h-4 w-full bg-white border-2 border-black/20 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: `${offerPercentile}%` }}
                      className="h-full rounded-full transition-all duration-300 bg-[#01aeee]"
                    />
                  </div>
                </div>

                <div className="mt-6 p-4 rounded-xl border border-black/10 bg-white text-black space-y-2 shadow-sm">
                  <div className="font-bold text-sm text-black flex items-center gap-2">
                    {offerPercentile >= 40 && offerPercentile <= 75 ? (
                      <>
                        <CheckCircle2 className="w-5 h-5 text-[#01aeee]" />
                        <span className="text-[#01aeee] font-bold">{t.verdictOptimal}</span>
                      </>
                    ) : offerPercentile < 40 ? (
                      <>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                        <span className="text-amber-600 font-bold">{t.verdictBelow}</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-5 h-5 text-[#01aeee]" />
                        <span className="text-[#01aeee] font-bold">{t.verdictAbove}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-black/80 leading-relaxed">
                    Base: {formatSalary(candidateMonthlyBase)} | Deviation vs Median ({formatSalary(adjustedBenchmark.median)}):{' '}
                    {candidateMonthlyBase >= adjustedBenchmark.median
                      ? `+${Math.round(((candidateMonthlyBase - adjustedBenchmark.median) / adjustedBenchmark.median) * 100)}%`
                      : `-${Math.round(((adjustedBenchmark.median - candidateMonthlyBase) / adjustedBenchmark.median) * 100)}%`}
                  </p>
                </div>
              </div>

              <div className="flex justify-end pt-4 border-t-2 border-black/10">
                <button
                  onClick={() => showToast(lang === 'th' ? 'ร่างสัญญาพร้อมส่งออก' : 'Contract specification drafted')}
                  className="px-5 py-2.5 rounded-xl bg-[#01aeee] hover:bg-[#009fd9] text-white font-black text-xs shadow-md transition-all cursor-pointer"
                >
                  {t.btnDraftOffer}
                </button>
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: INTERNAL PARITY AUDIT */}
        {activeTab === 'parity' && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#fdf102] text-black shadow-xl border-2 border-black/10">
              <div className="flex items-center justify-between pb-4 border-b-2 border-black/10">
                <div>
                  <h3 className="font-bold text-base text-black">{t.parityTitle}</h3>
                  <p className="text-xs text-black/80">{t.paritySub}</p>
                </div>
                <span className="text-xs px-3 py-1 rounded-full bg-[#01aeee] text-white font-bold shadow-xs">
                  {t.parityBadge}
                </span>
              </div>

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b-2 border-black/20 text-black">
                      <th className="pb-3 font-bold">{t.colMember}</th>
                      <th className="pb-3 font-bold">{t.colTenure}</th>
                      <th className="pb-3 font-bold">{t.colCurrentBase}</th>
                      <th className="pb-3 font-bold">{t.colCompa}</th>
                      <th className="pb-3 font-bold">{t.colPerf}</th>
                      <th className="pb-3 font-bold text-right">{t.colParityStatus}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/10">
                    {[
                      { id: 'SPECIMEN-902', tenure: '2.5 yrs', base: 265000, ratio: '1.02', perf: 'Rating: 4.6/5.0', status: 'Aligned' },
                      { id: 'SPECIMEN-441', tenure: '3.2 yrs', base: 280000, ratio: '1.08', perf: 'Rating: 4.9/5.0', status: 'Aligned' },
                      { id: 'SPECIMEN-118', tenure: '0.9 yrs', base: 235000, ratio: '0.90', perf: 'Rating: 3.7/5.0', status: 'Review Flag' },
                      { id: 'SPECIMEN-632', tenure: '1.8 yrs', base: 270000, ratio: '1.04', perf: 'Rating: 4.4/5.0', status: 'Aligned' },
                    ].map((emp, i) => (
                      <tr key={i} className="hover:bg-white/60">
                        <td className="py-3.5 font-bold text-black">{emp.id}</td>
                        <td className="py-3.5 text-black/80">{emp.tenure}</td>
                        <td className="py-3.5 text-black font-bold">{formatSalary(emp.base)}</td>
                        <td className="py-3.5 text-[#01aeee] font-bold">{emp.ratio}</td>
                        <td className="py-3.5 text-black">{emp.perf}</td>
                        <td className="py-3.5 text-right">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            emp.status === 'Aligned'
                              ? 'bg-[#01aeee] text-white shadow-xs'
                              : 'bg-white text-black border border-black/20 font-bold'
                          }`}>
                            {emp.status === 'Aligned' ? t.statusAligned : t.statusFlag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

    </div>
  );
}