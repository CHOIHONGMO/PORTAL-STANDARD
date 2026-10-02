/**
 * (주)에스티원즈 (ST-ones) 공식 데이터 및 콘텐츠 정의
 * 출처: https://www.st-ones.com/
 */

export interface SolutionItem {
  id: string;
  brand: string;
  name: string;
  isAi?: boolean;
  tagline: string;
  desc: string;
  features: string[];
  icon: string;
  badge?: string;
  link: string;
}

export interface ClientReference {
  date: string;
  project: string;
  client: string;
  category: 'SRM' | 'MRO' | 'Contract' | 'Seal' | 'Cost' | 'Other';
}

export interface NewsItem {
  id: string;
  category: string;
  title: string;
  date: string;
  desc: string;
  source?: string;
  url?: string;
}

export interface HistoryItem {
  year: string;
  events: {
    month: string;
    text: string;
  }[];
}

export interface ContactPerson {
  role: string;
  name: string;
  email: string;
  phone: string;
  duty: string;
}

// 1. 회사 기본 정보
export const companyInfo = {
  name: '(주)에스티원즈',
  nameEn: 'ST-ones Co., Ltd.',
  ceo: '백경순',
  foundedDate: '2013년 7월 3일',
  bizNumber: '220-88-60712',
  mainBiz: '전자구매 시스템, MRO 구매대행, 전자계약, 전자인장, AI 구매 솔루션, IT 아웃소싱',
  tel: '02-6959-2625',
  email: 'sale@st-ones.com',
  address: {
    zip: '06253',
    road: '서울특별시 강남구 강남대로66길 6, 7층 (역삼동, 두성타워)',
    detail: '강남역 4번출구 / 뱅뱅사거리 인근'
  },
  principles: [
    {
      title: '무차입 경영',
      subtitle: '안정적인 재무 건전성',
      desc: '2013년 설립 이후 매년 흑자 기조를 이어오며, 외부 차입 없이 안정적이고 탄탄한 재무 구조를 유지하고 있습니다.'
    },
    {
      title: '고객 가치 중심 경영',
      subtitle: '동반 성장의 핵심 파트너',
      desc: '‘고객의 가치 창조’를 최우선 원칙으로, 고객의 성공적인 비즈니스 혁신과 함께 성장하는 길을 꾸준히 만들어갑니다.'
    },
    {
      title: '함께 성장하는 일터',
      subtitle: '구성원과의 성과 공유',
      desc: '4대 보험과 퇴직연금은 기본으로, 경영 성과를 구성원과 투명하게 나누는 ‘Profit Share’ 제도를 운영합니다.'
    }
  ]
};

// 2. 5대 핵심 솔루션
export const solutionsData: SolutionItem[] = [
  {
    id: 'srm',
    brand: 'Ever SRM',
    name: '전자구매 시스템',
    isAi: true,
    tagline: 'ERP·그룹웨어 연계 웹표준 기반 구매포탈',
    desc: '웹 표준 기반의 Ever SRM으로 그룹웨어, ERP 등 다양한 시스템과 유기적으로 연계하여 구매 및 조달 전체 업무의 혁신적인 최적화를 실현합니다.',
    features: [
      'AI 견적 자동 비교 및 최적 단가 분석',
      '품목별 구매 이력 및 물가 변동 데이터 분석',
      '전략적 공급사 관리(SRM) 및 공급업체 정기 평가',
      '전자입찰·역경매·수의시담 프로세스 완벽 지원'
    ],
    icon: '⚡',
    badge: 'Flagship AI',
    link: '/about/solutions#srm'
  },
  {
    id: 'contract',
    brand: 'Ever Contract',
    name: '전자계약 시스템',
    isAi: true,
    tagline: '법적 컴플라이언스 내장 스마트 비대면 전자계약',
    desc: '대면 처리 없이 계약서 작성부터 전자서명, 사후 이력 관리까지 원스톱으로 처리하여 계약 체결 시간과 관리 비용을 획기적으로 절감합니다.',
    features: [
      '가상 LLM 기반 AI 계약 리스크 분석 & 조항 검토',
      '법제처 실시간 API 연계 최신 법령·판례 자동 반영',
      '컴플라이언스 검증 체계 내장으로 법적 분쟁 원천 차단',
      '공인인증서·카카오페이·PASS 등 다양한 전자서명 지원'
    ],
    icon: '📝',
    badge: 'LegalTech AI',
    link: '/about/solutions#contract'
  },
  {
    id: 'mro',
    brand: 'Ever MP',
    name: 'MRO 구매대행 시스템',
    isAi: false,
    tagline: '소싱부터 출고·정산까지 원스톱 마켓플레이스',
    desc: '자체 개발한 EverFramework과 대기업 MRO 구축 노하우를 바탕으로 고객사와 협력업체 간의 품목 등록, 주문, 납품, 대금 정산 전 과정을 최적화합니다.',
    features: [
      'B2B 기업 맞춤형 카탈로그 및 단가계약 관리',
      '모바일 주문 및 실시간 배송/정산 추적',
      '다양한 ERP(SAP, 더존 등) 시스템 인터페이스',
      '대기업/유통사 대규모 트래픽 안정적 처리'
    ],
    icon: '🛒',
    link: '/about/solutions#mro'
  },
  {
    id: 'seal',
    brand: 'Ever Seal',
    name: '전자인장 시스템',
    isAi: false,
    tagline: '디지털 인장 등록 및 위·변조 방지 보안 날인',
    desc: '법인 직인·관인을 디지털로 안전하게 등록하여 전자결재 문서, 증명서, 계약서 등에 정밀 날인하고 사용 이력과 권한을 체계적으로 통제합니다.',
    features: [
      '강력한 위·변조 방지 암호화 기술 & 진본 검증',
      '부서/직급별 인장 날인 권한 설정 및 결재 승인선 연계',
      '날인 이력 추적 및 감사 로그 100% 자동 기록',
      'PDF 및 공공/금융 보안 서식 완벽 호환'
    ],
    icon: '🔒',
    link: '/about/solutions#seal'
  },
  {
    id: 'outsourcing',
    brand: 'IT Outsourcing',
    name: 'IT 아웃소싱 & SI 컨설팅',
    isAi: false,
    tagline: '공공·금융·제조 엔터프라이즈 맞춤형 SI & 운영',
    desc: '공공, 금융, IT, 유통, 제조 등 다양한 산업군에서 자체 검증된 Framework을 활용해 기획, 아키텍처 설계, 구축, 운영·유지보수까지 종합 제공합니다.',
    features: [
      '전자구매/공급망(SCM) 13년 이상 전문 기술인력',
      'SAP ERP, 그룹웨어, 레거시 시스템 완벽 통합 SI',
      '제조업 특화 RFQ 견적 및 종합 원가관리시스템 구축',
      '안정적인 SLA 기반 연중무휴 2선 운영 기술지원'
    ],
    icon: '🏢',
    link: '/about/solutions#outsourcing'
  }
];

// 3. 주요 고객사 및 구축 실적
export const referencesData: ClientReference[] = [
  { date: '2026-08', client: '유라코퍼레이션', project: '유라코퍼레이션 - YPIMS 고도화', category: 'Cost' },
  { date: '2026-07', client: '삼양식품', project: '삼양식품 - 기술자료 제공 및 관리시스템 구축', category: 'SRM' },
  { date: '2026-04', client: '유라코퍼레이션', project: '유라코퍼레이션 - 손익관리고도화 프로젝트', category: 'Cost' },
  { date: '2026-02', client: '유라코퍼레이션', project: '유라코퍼레이션 - 원가절감율 프로젝트', category: 'Cost' },
  { date: '2026-01', client: 'LF네트웍스', project: 'LF네트웍스 - 전자계약시스템 구축', category: 'Contract' },
  { date: '2025-05', client: '현대리바트', project: '현대리바트 - HB2B 시스템(MRO) 리뉴얼 구축', category: 'MRO' },
  { date: '2024-11', client: '아시아나항공', project: '아시아나항공 AVEPS 2.0 구매포탈 고도화', category: 'SRM' },
  { date: '2024-03', client: 'CJ CGV', project: 'CJ CGV 차세대 프로젝트 내 SRM 시스템 구축', category: 'SRM' },
  { date: '2023-02', client: '아이티센그룹', project: '아이티센그룹 구매포탈 시스템 구축', category: 'SRM' },
  { date: '2022-05', client: '대명소노시즌', project: '대명소노시즌 MRO 구매시스템 구축', category: 'MRO' },
  { date: '2021-11', client: '삼양식품', project: '삼양식품 통합구매시스템 구축', category: 'SRM' },
  { date: '2021-06', client: '가온전선', project: '가온전선 전자구매시스템 구축', category: 'SRM' },
  { date: '2020-12', client: '솔브레인', project: '솔브레인 SRM 시스템 구축', category: 'SRM' },
  { date: '2020-10', client: '동우화인켐', project: '동우화인켐 통합구매 시스템 개선 (SRM구축)', category: 'SRM' },
  { date: '2020-10', client: 'KB데이타시스템', project: 'KB데이타시스템 전자계약 시스템 구축', category: 'Contract' },
  { date: '2020-06', client: '비즈네트웍스', project: '비즈네트웍스 MRO 구매대행 시스템 구축', category: 'MRO' },
  { date: '2019-12', client: '범농협', project: '범농협 통합전자구매 시스템 구축', category: 'SRM' },
  { date: '2019-11', client: '영스페이스', project: '영스페이스 MRO 시스템 도입 구축', category: 'MRO' },
  { date: '2019-10', client: '덕성테크팩', project: '덕성테크팩 MRO 시스템 도입 구축', category: 'MRO' },
  { date: '2018-11', client: 'LG생활건강', project: 'LG생활건강 전자계약 프로젝트 수주', category: 'Contract' },
  { date: '2018-07', client: '용마로지스', project: '용마로지스(주) MRO 구매대행 시스템 구축', category: 'MRO' },
  { date: '2018-02', client: '오뚜기', project: '(주)오뚜기 전자계약 시스템 구축 프로젝트 수주', category: 'Contract' },
  { date: '2017-12', client: '대보정보통신', project: '대보정보통신(주) 전자구매시스템 기능개선 프로젝트 수주', category: 'SRM' },
  { date: '2017-12', client: '한화시스템', project: '한화시스템(주) 구매조달 시스템 고도화 용역 프로젝트 수주', category: 'SRM' },
  { date: '2017-05', client: '아시아나항공', project: '아시아나항공 구매포탈 시스템 구축 프로젝트 수주', category: 'SRM' },
  { date: '2015-10', client: '신한카드', project: '신한카드 통합구매시스템 고도화 프로젝트 수주', category: 'SRM' },
  { date: '2015-07', client: '동희그룹', project: '동희그룹 통합구매시스템 구축 프로젝트 수주', category: 'SRM' },
  { date: '2014-03', client: 'CJ제일제당', project: 'CJ 제일제당 전자구매시스템(제약분리) 프로젝트 수주', category: 'SRM' },
  { date: '2014-02', client: '삼성탈레스', project: '삼성탈레스(주) 전자계약시스템 구축 프로젝트 수주', category: 'Contract' },
  { date: '2013-10', client: '다음커뮤니케이션', project: '다음커뮤니케이션 전자구매시스템 소기능 개선 및 유지보수', category: 'SRM' }
];

// 4. 최신 보도자료 및 소식
export const newsList: NewsItem[] = [
  {
    id: 'news-1',
    category: '보도자료',
    title: "에스티원즈, LF네트웍스 '전자계약시스템' 구축 완료…컴플라이언스 리스크 선제 방어",
    date: '2026.07.14',
    source: '전자신문',
    desc: '법무법인 태평양 자문 기반의 컴플라이언스 검증 체계를 내장하여 계약 전 거래 개시를 원천 차단하고 정보 일원화로 행정 비효율을 획기적으로 개선했습니다.',
    url: 'https://www.etnews.com/20260713000281'
  },
  {
    id: 'news-2',
    category: '보도자료',
    title: '에스티원즈, 혁신적 종합 원가관리시스템으로 제조업 경쟁력 강화',
    date: '2025.03.27',
    source: '전자신문',
    desc: 'SAP ERP 및 PLM 연계를 통한 견적 원가 자동 산출과 시뮬레이션을 구현하여 자동차, 부품, 기계 등 제조 산업의 원가 절감 경쟁력을 극대화했습니다.',
    url: 'https://www.etnews.com/'
  },
  {
    id: 'news-3',
    category: '보도자료',
    title: 'SRM 강소기업 에스티원즈, 아시아나항공 AVEPS 2.0 프로젝트 성공적 완료',
    date: '2024.11.04',
    source: '전자신문',
    desc: '아시아나항공 구매포털에 최신 Ever SRM 2.0 엔진을 탑재하여 입찰공고부터 업체선정까지 전 구매 프로세스의 디지털 혁신을 달성했습니다.',
    url: 'https://www.etnews.com/'
  }
];

// 5. 회사 연혁
export const historyData: HistoryItem[] = [
  {
    year: '2026',
    events: [
      { month: '08월', text: '유라코퍼레이션 YPIMS 고도화 프로젝트 수주' },
      { month: '07월', text: '삼양식품 기술자료 제공 및 관리시스템 구축' },
      { month: '07월', text: "LF네트웍스 '전자계약시스템' 구축 완료 및 전면 오픈" },
      { month: '04월', text: '유라코퍼레이션 손익관리고도화 프로젝트 수행' },
      { month: '01월', text: 'AI 기반 전자구매 & 계약서 자동 분석 솔루션 론칭' }
    ]
  },
  {
    year: '2025',
    events: [
      { month: '05월', text: '현대리바트 HB2B 시스템(MRO) 리뉴얼 구축' },
      { month: '03월', text: 'SAP ERP 연계 종합 원가관리시스템 발표' }
    ]
  },
  {
    year: '2024',
    events: [
      { month: '11월', text: '아시아나항공 AVEPS 2.0 구매포털 고도화 완료' },
      { month: '03월', text: 'CJ CGV 차세대 SRM 시스템 구축 수주 및 가동' }
    ]
  },
  {
    year: '2023',
    events: [
      { month: '02월', text: '아이티센그룹 전사 구매포탈 시스템 구축' }
    ]
  },
  {
    year: '2022 ~ 2020',
    events: [
      { month: '2022', text: '대명소노시즌 MRO 구매시스템 구축' },
      { month: '2021', text: '삼양식품 통합구매시스템 및 가온전선 전자구매시스템 구축' },
      { month: '2020', text: '솔브레인 SRM, 동우화인켐 SRM, KB데이타시스템 전자계약 시스템 구축' }
    ]
  },
  {
    year: '2019 ~ 2017',
    events: [
      { month: '2019', text: '범농협 통합전자구매 시스템 구축' },
      { month: '2018', text: 'LG생활건강 및 오뚜기 전자계약 시스템 구축' },
      { month: '2017', text: '한화시스템 조달시스템 고도화 및 아시아나항공 구매포탈 1.0 구축' }
    ]
  },
  {
    year: '2015 ~ 2013',
    events: [
      { month: '2015', text: '신한카드 통합구매시스템 고도화 및 동희그룹 통합구매 구축' },
      { month: '2014', text: 'CJ제일제당 전자구매시스템 및 삼성탈레스 전자계약 구축' },
      { month: '2013. 07', text: '주식회사 에스티원즈 설립 (자본금 완납 무차입 경영 개시)' }
    ]
  }
];

// 6. 담당자 연락처
export const contactPersons: ContactPerson[] = [
  {
    role: '대표이사',
    name: '백경순',
    email: 'sale@st-ones.com',
    phone: '010-5475-0525',
    duty: '경영 총괄 / 전략적 제휴'
  },
  {
    role: '부장',
    name: '설헌환',
    email: 'seol2h@st-ones.com',
    phone: '010-2284-7549',
    duty: '솔루션 / 컨설팅 영업 & 마케팅 문의'
  },
  {
    role: '이사',
    name: '최승주',
    email: 'vcircle@st-ones.com',
    phone: '010-7907-7770',
    duty: '솔루션 기술문의 / 시스템 아키텍처'
  },
  {
    role: '이사',
    name: '이수헌',
    email: 'viruslsh@st-ones.com',
    phone: '010-9163-8277',
    duty: '솔루션 기술문의 / 개발 총괄'
  }
];
