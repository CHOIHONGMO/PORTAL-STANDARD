# everportal (Frontend) Development Guide

이 문서는 **everportal** 프론트엔드 프로젝트의 개발을 위한 가이드라인입니다. 
프로젝트 개발 및 화면 수정 시 항상 이 문서를 기준으로 아키텍처 및 개발 규칙을 준수해 주시기 바랍니다.

---

## 1. 프로젝트 개요 및 기술 스택

- **프레임워크**: React 19.2, TypeScript 6.0
- **빌드 도구**: Vite 8.0
- **라우팅**: React Router v7 (BrowserRouter, 중첩 라우팅 Layout 체계)
- **상태 및 폼 유효성 검증**: React Hook Form 7.80 + Zod 4.4 + `@hookform/resolvers` (Schema-driven Validation)
- **HTTP 통신**: Axios 1.17 (`withCredentials: true`, Interceptor 기반 공통 클라이언트)
- **드래그 앤 드롭 (화면 빌더)**: `@dnd-kit/core`, `@dnd-kit/sortable`, `@dnd-kit/utilities`
- **스타일링**: Vanilla CSS (`index.css`, `App.css`, `pages.css`, `builder.css`)

---

## 2. 프로젝트 디렉토리 구조

```
everportal/
├── public/                 # 정적 리소스 (favicon 등)
├── src/
│   ├── api/                # 백엔드(eversrm) 연동 API 클라이언트 및 통신 함수
│   │   ├── apiClient.ts    # Axios 기본 인스턴스 (BaseURL, 타임아웃, 인터셉터)
│   │   └── mainApi.ts      # 메인 대시보드(배너, 공지, 설문, 통계 등) API 함수
│   ├── assets/             # 정적 이미지, SVG 아이콘, 폰트 등
│   ├── builder/            # [Visual Screen Builder] 화면/폼 시각적 제작 모듈
│   │   ├── api/            # 화면 빌더 전용 API (백엔드 코드/JSON 저장 및 배포)
│   │   ├── components/     # 빌더 UI (Palette, Canvas, PropertyPanel, Preview 등)
│   │   ├── types/          # 화면 컴포넌트 스키마 및 정의 타입
│   │   ├── utils/          # React 컴포넌트 코드 생성기(Code Generator) 등
│   │   ├── builder.css     # 빌더 전용 CSS
│   │   └── BuilderPage.tsx # 빌더 단독 페이지 (/builder)
│   ├── common/             # 공통 모듈 및 정적 데이터
│   │   ├── validator/      # Schema-driven Validation 코어 모듈
│   │   │   ├── useFormSchema.ts  # 스키마 기반 폼 상태/검증 관리 커스텀 훅
│   │   │   ├── AutoForm.tsx      # 스키마 기반 자동 폼 렌더러
│   │   │   ├── FormField.tsx     # 개별 필드 렌더러 컴포넌트
│   │   │   └── types.ts          # FormFieldSchema, FormSchema 타입 정의
│   │   ├── components/     # 범용 공통 컴포넌트
│   │   ├── menuData.ts     # GNB 및 네비게이션 메뉴 트리 구조 데이터
│   │   └── companyData.ts  # 회사소개, 연혁, 솔루션, 고객사 정적 데이터
│   ├── components/         # 화면 구성용 재사용 UI 컴포넌트
│   │   ├── layout/         # 레이아웃 컴포넌트
│   │   │   ├── Layout.tsx        # 기본 메인 레이아웃 (Header + GNB + Content + Footer)
│   │   │   ├── Header.tsx        # 상단 글로벌 헤더 (로그인 상태, 유틸 링크)
│   │   │   ├── Footer.tsx        # 푸터 (회사 정보, 패밀리 사이트, 카피라이트)
│   │   │   ├── SideNav.tsx       # 서브 페이지 LNB (좌측 사이드 네비게이션)
│   │   │   ├── SubHeader.tsx     # 서브 페이지 상단 타이틀/Breadcrumb
│   │   │   ├── AboutLayout.tsx   # 포털소개 전용 서브 레이아웃
│   │   │   └── ServiceLayout.tsx # 민원광장 전용 서브 레이아웃
│   │   ├── main/           # 메인 대시보드 전용 위젯 컴포넌트
│   │   │   ├── VisualBanner.tsx   # 메인 비주얼 슬라이더 배너
│   │   │   ├── QuickMenu.tsx      # 자주 찾는 서비스 퀵메뉴
│   │   │   ├── NoticeBbs.tsx      # 최신 공지사항/입찰공고 탭 위젯
│   │   │   └── ServiceSection.tsx # 서비스 안내 카드 섹션
│   │   └── common/         # Button, Table, Modal 등 공통 요소
│   ├── pages/              # 화면 단위 페이지 컴포넌트
│   │   ├── MainPage.tsx    # 메인 포털 홈 화면
│   │   ├── pages.css       # 서브 페이지 공통 스타일
│   │   ├── about/          # 포털 소개 (소개, 솔루션, 레퍼런스, 연혁, 조직도, 오시는길)
│   │   ├── auth/           # 사용자 인증 (LoginUsr)
│   │   ├── board/          # 게시판 시스템
│   │   │   ├── notice/     # 공지사항 (목록/상세/등록/수정)
│   │   │   ├── bbs/        # 게시판 마스터 관리 (목록/등록/수정)
│   │   │   └── com/        # 게시판 사용관리 및 템플릿 관리
│   │   ├── service/        # 민원광장 (온라인 민원신청, 결과조회, 발급서비스)
│   │   ├── user/           # 회원 및 사용자 서비스
│   │   │   ├── member/     # 회원가입 및 관리자 회원관리 (조회/등록/수정/암호변경)
│   │   │   ├── help/       # 고객지원 (FAQ, Q&A 사용자 질의 및 관리자 답변)
│   │   │   ├── poll/       # 설문조사 시스템 (설문지, 문항, 항목, 응답/통계, 템플릿, 결과, 응답자 관리)
│   │   │   └── policy/     # 정책 및 약관 (개인정보보호정책, 이용약관)
│   │   ├── security/       # 보안 관리 (롤, 권한, 그룹, 사용자-권한 매핑 관리)
│   │   └── common/         # 공통 예외 화면 (error/AccessDenied, DataAccessFailure, BizException 등)
│   ├── test/               # 테스트 및 프로토타입 페이지 (prList 등)
│   ├── App.tsx             # 전역 라우팅 정의 및 라우트 가드
│   ├── App.css             # 앱 전역 스타일
│   ├── index.css           # 글로벌 CSS 리셋, 테마 변수, 유틸리티 클래스
│   └── main.tsx            # React 진입점 (ReactDOM.createRoot)
├── .env                    # 환경 변수 설정 파일
├── package.json            # 의존성 및 스크립트 정의
├── tsconfig.json           # TypeScript 기본 설정
├── tsconfig.app.json       # App 소스코드 TypeScript 컴파일 옵션 (Path Alias `@/*`)
└── vite.config.ts          # Vite 번들러 설정
```

---

## 3. 라우팅 및 주요 화면 구성

| 대메뉴 | 경로 (Route Path) | 설명 및 주요 하위 페이지 |
|---|---|---|
| **메인** | `/` | 메인 포털 대시보드 (`MainPage`) |
| **포털소개** | `/about/*` | 포털소개(`index`), 솔루션(`solutions`), 주요실적(`references`), 연혁(`history`), 조직도(`organization`), 찾아오시는길(`location`) |
| **민원광장** | `/service/*` | 민원서식발급(`issuance`), 민원신청/접수(`apply`), 처리결과조회(`result`) |
| **알림마당** | `/board/notice/*`<br>`/faq/*`<br>`/qna/*` | 공지사항(목록/상세/등록), 자주하는질문(FAQ), 묻고답하기(Q&A 사용자 등록/상세/비밀번호 확인) |
| **설문참여** | `/qustnr-respond/*` | 대민 설문 참여 및 결과 통계 확인 |
| **인증/회원** | `/login`, `/signup` | 사용자 로그인, 일반회원 가입 신청 |
| **관리자 - 회원** | `/admin/member/*` | 회원 목록 관리, 신규 등록, 회원 상세정보 수정, 비밀번호 변경 |
| **관리자 - 게시판** | `/admin/board/*`<br>`/admin/usage/*`<br>`/admin/template/*` | 게시판 마스터 등록/수정, 게시판 사용권한 설정, 게시판 템플릿 관리 |
| **관리자 - 고객지원** | `/admin/qna/*` | 접수된 Q&A 문의내역 답변 등록/수정 |
| **관리자 - 설문관리** | `/admin/qustnr*` | 설문지/문항/항목/템플릿/응답결과/응답자 관리 (7단계 설문 프로세스) |
| **관리자 - 보안/권한** | `/admin/role/*`<br>`/admin/author/*`<br>`/admin/group/*`<br>`/admin/author-group` | 롤(Role), 권한(Author), 사용자 그룹(Group), 권한별 그룹 매핑 관리 |
| **관리자 - 약관/정책** | `/admin/policy/*`<br>`/admin/stplat/*` | 개인정보처리방침 관리, 이용약관 관리 |
| **화면 빌더** | `/builder` | Visual Screen Builder (드래그 앤 드롭 기반 신규 화면 생성/코드 배포 도구, 환경변수로 On/Off) |

---

## 4. 프론트엔드 개발 규칙 및 방법

### 4.1. 화면 컴포넌트 및 로직 분리
- **도메인별 폴더 구성**: `src/pages/[도메인명]/` 아래에 기능별 하위 폴더를 구성하여 관련 컴포넌트를 위치시킵니다.
  - 예: `src/pages/board/notice/NoticeList.tsx`, `src/pages/user/member/MberManage.tsx`
- **컴포넌트 작명**: 컴포넌트는 `PascalCase`로 작성하며, 화면별 역할(List, Detail, Form, Regist, Updt)을 명확히 명시합니다.
- **레이아웃 상속**: 일반 화면은 `Layout` 하위에 렌더링되며, 포털소개나 민원광장처럼 서브 네비게이션이 필요한 경우 전용 서브 레이아웃(`AboutLayout`, `ServiceLayout`)을 중첩 라우트로 활용합니다.

### 4.2. Form 및 유효성 검증 설계 (Schema-driven Validation)
개별 `useState`를 남발하거나 렌더링 영역 내에 인라인 조건 검증을 중복 작성하는 것을 엄격히 지양합니다. 모든 화면의 입력 폼은 `react-hook-form` + `zod` 기반의 **공통 Validator 아키텍처**를 준수합니다.

1. **스키마 정의 파일 분리**: 
   - 화면 컴포넌트와 동일한 폴더에 스키마 파일(예: `mberInsert.schema.ts`)을 생성합니다.
   - `FormSchema` 타입에 따라 필드의 `label`, `type`, `required`, `maxlength`, `options`, `validation` 규칙을 선언적으로 정의합니다.
2. **공통 훅 사용 (`useFormSchema`)**: 
   - `src/common/validator/useFormSchema`를 호출하여 초기값, 유효성 검사, 변경 이벤트 핸들러, 폼 제출 핸들러를 바인딩합니다.
3. **자동 렌더링 활용 (`AutoForm` / `FormField`)**: 
   - 일괄 입력 폼은 `AutoForm` 컴포넌트에 스키마를 주입하여 보일러플레이트 코드를 최소화합니다.
   - 레이아웃 커스텀이 필요한 경우 `FormField` 컴포넌트를 사용하여 그리드 배치와 스키마 기반 에러 피드백을 적용합니다.

### 4.3. API 호출 및 통신 규칙
- 컴포넌트 내부에서 직접 `axios` 라이브러리를 호출하지 않습니다.
- 모든 API 요청은 `src/api/apiClient.ts`에 정의된 공통 Axios 인스턴스를 통해 호출하며, 도메인별 API 함수(`src/api/*.ts`)로 캡슐화하여 임포트해 사용합니다.
- 요청 시 세션 쿠키 전송을 위해 `withCredentials: true` 설정을 기본으로 유지합니다.

### 4.4. TypeScript 및 코드 컨벤션
- 함수형 컴포넌트와 React Hooks를 기본으로 사용합니다.
- Props 및 상태 데이터는 명시적인 `interface` 또는 `type`을 정의하여 적용하며, `any` 타입의 무분별한 사용은 엄격히 금지합니다.
- CSS 클래스 작명은 직관적인 의미를 갖도록 하며, 공통 스타일(`index.css`, `pages.css`)의 디자인 토큰 및 클래스를 우선 활용합니다.

---

## 5. 실행 및 빌드 가이드

### 5.1. 환경 변수 (`.env`)
```properties
# 백엔드 API 서버 주소
VITE_API_URL=http://localhost:8080/api

# Visual Screen Builder 활성화 플래그 (운영 빌드 시 false로 설정)
VITE_BUILDER_ENABLED=true
```

### 5.2. 개발 서버 실행 및 빌드
```bash
# 1. 의존성 패키지 설치
npm install

# 2. 로컬 개발 서버 구동 (기본 포트: 5173)
npm run dev

# 3. 타입 체크 및 프로덕션 번들 빌드 (dist/ 생성)
npm run build

# 4. ESLint 코드 정적 분석
npm run lint

# 5. 빌드 결과물 로컬 미리보기
npm run preview
```
