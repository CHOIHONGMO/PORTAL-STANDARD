export interface MenuItem {
  title: string;
  path: string;
  desc?: string;
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
    title: '포털 소개 & 소식',
    path: '/about',
    categories: [
      {
        title: '포털 소개',
        items: [
          { title: '사이트소개', path: '/about', desc: '포털 서비스와 비전을 소개합니다.' },
          { title: '연혁', path: '/about/history', desc: '포털의 주요 발자취와 역사입니다.' },
          { title: '조직소개', path: '/about/organization', desc: '조직도 및 업무 분장 정보입니다.' },
          { title: '찾아오시는 길', path: '/about/location', desc: '오시는 길과 연락처 안내입니다.' }
        ]
      },
      {
        title: '정보마당',
        items: [
          { title: '공지사항', path: '/board/notice', desc: '포털의 주요 소식 및 공지사항입니다.' }
        ]
      }
    ]
  },
  {
    id: 'service',
    title: '민원 & 설문',
    path: '/service/issuance',
    categories: [
      {
        title: '민원 서비스',
        items: [
          { title: '민원발급', path: '/service/issuance', desc: '각종 증명서 및 민원 서류 발급' },
          { title: '민원신청', path: '/service/apply', desc: '온라인 민원 신청 및 접수' },
          { title: '민원결과확인', path: '/service/result', desc: '신청한 민원의 처리 결과를 조회합니다.' }
        ]
      },
      {
        title: '의견 수렴',
        items: [
          { title: '설문참여', path: '/qustnr-respond', desc: '설문조사에 참여하여 의견을 나누어 주세요.' }
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
          { title: 'FAQ', path: '/faq', desc: '자주 묻는 질문과 답변입니다.' },
          { title: 'Q&A', path: '/qna', desc: '궁금한 사항을 묻고 답하는 공간입니다.' }
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
    title: '빌더 테스트',
    path: '/test/pr',
    categories: [
      {
        title: '테스트 화면',
        items: [
          { title: '구매요청현황', path: '/test/pr', desc: 'Screen Builder로 자동 생성된 화면입니다.' }
        ]
      }
    ]
  }
];
