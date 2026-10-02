export interface MenuItem {
  title: string;
  path: string;
  desc?: string;
  badge?: string;
}

export interface MenuCategory {
  title: string;
  items: MenuItem[];
}

export interface MainMenu {
  id: string;
  title: string;
  path: string;
  categories: MenuCategory[];
}

export const menuData: MainMenu[] = [
  {
    id: 'about',
    title: '회사 & 솔루션',
    path: '/about',
    categories: [
      {
        title: '에스티원즈 소개',
        items: [
          { title: '회사소개', path: '/about', desc: '전자구매 시스템 구축 전문기업 (주)에스티원즈입니다.' },
          { title: '솔루션 소개', path: '/about/solutions', desc: 'Ever SRM, Contract, MRO, Seal 등 핵심 솔루션', badge: 'AI' },
          { title: '고객사례/실적', path: '/about/references', desc: '국내 주요 대기업·중견기업·공공기관 구축 실적' },
          { title: '연혁', path: '/about/history', desc: '2013년 설립 이래 꾸준히 성장해온 발자취입니다.' },
          { title: '조직 및 담당자 안내', path: '/about/organization', desc: '전문 기술진 및 솔루션 도입 문의 담당자' },
          { title: '찾아오시는 길', path: '/about/location', desc: '본사 위치 및 대중교통 안내입니다.' }
        ]
      },
      {
        title: '소식 & 보도자료',
        items: [
          { title: '공지사항', path: '/board/notice', desc: '에스티원즈 포털의 주요 소식 및 공지사항' }
        ]
      }
    ]
  },
  {
    id: 'service',
    title: '구매 & 전자민원',
    path: '/service/issuance',
    categories: [
      {
        title: '포털 서비스',
        items: [
          { title: '증명서/민원발급', path: '/service/issuance', desc: '온라인 증명서 및 서류 발급' },
          { title: '서비스 신청', path: '/service/apply', desc: '온라인 서비스 및 협력사 신청 접수' },
          { title: '처리결과 확인', path: '/service/result', desc: '신청 내역의 진행 상태 및 처리 결과를 조회합니다.' }
        ]
      },
      {
        title: '고객 참여',
        items: [
          { title: '설문조사', path: '/qustnr-respond', desc: '서비스 만족도 및 개선 의견 설문조사' }
        ]
      }
    ]
  },
  {
    id: 'support',
    title: '고객지원',
    path: '/faq',
    categories: [
      {
        title: '도움말 & 지원',
        items: [
          { title: 'FAQ', path: '/faq', desc: '전자구매 시스템 및 포털 자주 묻는 질문' },
          { title: 'Q&A', path: '/qna', desc: '도입 문의 및 궁금한 사항을 1:1로 질문하세요.' }
        ]
      }
    ]
  },
  {
    id: 'admin',
    title: '시스템 관리',
    path: '/admin/member',
    categories: [
      {
        title: '사용자 & 권한',
        items: [
          { title: '회원 관리', path: '/admin/member' },
          { title: '롤 관리', path: '/admin/role' },
          { title: '권한 관리', path: '/admin/author' },
          { title: '그룹 관리', path: '/admin/group' },
          { title: '그룹 권한 관리', path: '/admin/author-group' }
        ]
      },
      {
        title: '게시판 & 콘텐츠',
        items: [
          { title: '게시판 생성 관리', path: '/admin/board' },
          { title: '게시판 사용 관리', path: '/admin/usage' },
          { title: '템플릿 관리', path: '/admin/template' },
          { title: 'Q&A 답변 관리', path: '/admin/qna' }
        ]
      },
      {
        title: '설문 관리',
        items: [
          { title: '설문지 관리', path: '/admin/qustnr' },
          { title: '설문 템플릿 관리', path: '/admin/qustnr-tmplat' },
          { title: '설문 응답 결과', path: '/admin/qustnr-respond-info' },
          { title: '설문 응답자 정보', path: '/admin/qustnr-respond-manage' }
        ]
      },
      {
        title: '정책 & 약관',
        items: [
          { title: '개인정보보호정책', path: '/admin/policy' },
          { title: '약관 관리', path: '/admin/stplat' }
        ]
      }
    ]
  },
  {
    id: 'test',
    title: '구매요청현황',
    path: '/test/pr',
    categories: [
      {
        title: '구매 업무 화면',
        items: [
          { title: '구매요청현황 (PR)', path: '/test/pr', desc: '전자구매 구매요청서 조회 및 결재 관리' }
        ]
      }
    ]
  }
];
