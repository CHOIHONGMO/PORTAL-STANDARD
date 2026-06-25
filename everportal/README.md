# everportal (Frontend) Development Guide

이 문서는 **everportal** 프론트엔드 프로젝트의 개발을 위한 가이드라인입니다. 
프로젝트 개발 및 수정 시 항상 이 문서를 기준으로 작업해 주시기 바랍니다.

---

## 1. 프로젝트 개요 및 기술 스택
- **프레임워크**: React 19, TypeScript
- **빌드 툴**: Vite
- **라우팅**: React Router v7
- **상태 및 폼 관리**: React Hook Form, Zod
- **API 통신**: Axios

---

## 2. 주요 디렉토리 구조
```
everportal/
├── src/
│   ├── api/          # 백엔드 서버(eversrm)와의 통신을 위한 API 호출 함수들 모음
│   ├── assets/       # 이미지, 폰트, 공통 CSS 등 정적 리소스 파일
│   ├── common/       # 공통 유틸리티, Validator 훅(useFormSchema), AutoForm 등 공통 컴포넌트
│   ├── components/   # 애플리케이션 전반에서 재사용 가능한 일반 UI 컴포넌트
│   └── pages/        # 화면 단위(페이지) 컴포넌트, 라우팅 대상이 되는 페이지 폴더 
│       └── user/     # (예시) 도메인/메뉴별로 하위 디렉토리 분리
├── public/           # 정적 파일
└── package.json
```

---

## 3. 화면 개발 규칙 및 방법

### 3.1. 화면 컴포넌트 및 로직 분리
- **도메인 별 폴더 구성**: `src/pages/도메인명/` 아래에 관련된 화면들을 위치시킵니다. (예: `src/pages/user/member/`)
- **컴포넌트 작명**: 컴포넌트는 `PascalCase`로 작성하며, 화면별 메인 컴포넌트는 직관적인 이름으로 구성합니다. (예: `EgovMberInsert.tsx`)

### 3.2. Form 및 유효성 검증 설계 (Schema-driven Validation)
기존의 개별 `useState`를 활용한 상태 관리와 무분별한 `if-else` 검증 로직은 지양합니다. 모든 화면의 폼 개발은 `react-hook-form` + `zod` 기반의 **공통 Validator 아키텍처**를 따릅니다.

1. **스키마 파일 분리**: 
   - 각 화면 컴포넌트와 짝을 이루는 스키마 정의 파일(예: `mberInsert.schema.ts`)을 동일한 폴더에 생성합니다.
   - `FormSchema` 타입에 맞추어 `label`, `type`, `required`, `maxlength`, `options` 등의 필드 속성을 선언적으로 정의합니다.
2. **공통 훅 사용 (`useFormSchema`)**: 
   - `src/common/validator/useFormSchema` 모듈을 호출하여 폼 상태(`formData`, `errors`)와 검증 핸들러(`handleChange`, `validateAll` 등)를 한 번에 관리합니다.
3. **자동 렌더링 활용 (`AutoForm` / `FormField`)**: 
   - 전체 폼 구조는 되도록 `AutoForm` 컴포넌트에 스키마를 주입하여 렌더링 로직을 최소화합니다.
   - 레이아웃상 개별 배치가 필요한 경우에만 `FormField` 컴포넌트를 직접 사용하여 스키마 기반 렌더링 및 에러 렌더링의 이점을 유지합니다.

### 3.3. 코드 컨벤션
- **함수형 컴포넌트**: 모든 컴포넌트는 함수형으로 작성하며 React Hooks를 활용합니다.
- **타입스크립트**: 명시적인 `interface` 또는 `type`을 정의하여 props와 state에 적용합니다. 불가피한 경우를 제외하고 `any` 타입 사용은 엄격히 금지합니다.
- **API 호출**: 화면 컴포넌트 내에서 직접 `axios`를 호출하지 않습니다. `src/api/` 아래에 도메인별 API 통신 함수를 분리하여 임포트해 사용합니다.

---

## 4. 커밋 및 빌드 검증 가이드
- **빌드 검증**: 커밋 전에 항상 `npm run build` (또는 `npx tsc --noEmit`)를 실행하여 타입스크립트 에러나 빌드 에러가 없는지 확인합니다.
- **스타일링**: 공통 CSS(`index.css`)나 CSS 모듈을 사용하며, 무분별한 인라인 스타일(`style={{...}}`)은 유지보수성을 위해 최소화합니다.
