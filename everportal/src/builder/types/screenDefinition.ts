// =====================================================================
// Visual Screen Builder — ScreenDefinition 타입 정의
// 빌더에서 생성하는 화면 정의 JSON 구조
// =====================================================================

import type { FieldType, FieldOption } from '@/common/validator/types';

/**
 * 화면 유형
 * - list: 목록 화면 (검색 + 테이블)
 * - form: 등록/수정 화면 (AutoForm)
 * - detail: 상세 조회 화면 (읽기 전용)
 */
export type PageType = 'list' | 'form' | 'detail';

/**
 * 필드 배치 위치 (그리드 기반)
 */
export interface FieldLayout {
  /** 차지할 컬럼 수 (1 이상) */
  colSpan?: number;
  /** 차지할 행 수 (1 이상) */
  rowSpan?: number;
  /** 행 순서 (옵션) */
  rowOrder?: number;
}

/**
 * 필드 정의
 * fieldName은 SQL ALIAS와 동일하게 사용 (예: userId, userNm)
 */
export interface FieldDefinition {
  /** 유니크 ID (uuid) */
  id: string;
  /** 실제 변수명 — SQL ALIAS와 동일하게 사용 */
  fieldName: string;
  /** 한글 라벨 */
  label: string;
  /** 입력 타입 */
  type: FieldType;
  /** 필수 여부 */
  required?: boolean;
  /** 최대 글자수 */
  maxlength?: number;
  /** 최소 글자수 */
  minlength?: number;
  /** 숫자 최솟값 */
  min?: number;
  /** 숫자 최댓값 */
  max?: number;
  /** 정규식 패턴 (문자열 형태로 저장, 코드 생성 시 RegExp로 변환) */
  pattern?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 읽기 전용 여부 */
  readOnly?: boolean;
  /** 플레이스홀더 */
  placeholder?: string;
  /** combo/radio/checkbox 옵션 목록 */
  options?: FieldOption[];
  /** textarea 줄 수 */
  rows?: number;
  /** 레이아웃 설정 */
  layout?: FieldLayout;
  /** 목록 화면에서 검색 조건으로 사용 여부 */
  isSearchCondition?: boolean;
  /** 목록 화면에서 테이블 컬럼으로 표시 여부 */
  isTableColumn?: boolean;
  /** 테이블 컬럼 너비 (%) */
  columnWidth?: number;
  /** 테이블 컬럼 정렬 (좌/중/우) */
  align?: 'left' | 'center' | 'right';
}

/**
 * API 액션 정의 (버튼 클릭 → API 호출)
 */
export interface ApiAction {
  /** 액션 ID */
  id: string;
  /** 버튼 라벨 */
  label: string;
  /** HTTP 메서드 */
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  /** API 경로 (예: /user/member/mber/selectMberList.api) */
  endpoint: string;
  /** 버튼 타입 */
  buttonType: 'submit' | 'search' | 'delete' | 'navigate' | 'custom';
  /** navigate 타입일 때 이동할 경로 */
  navigateTo?: string;
  /** 버튼 CSS 클래스 */
  className?: string;
  /** 확인 대화상자 메시지 (있으면 confirm 처리) */
  confirmMessage?: string;
}

/**
 * 목록 화면 페이지네이션 설정
 */
export interface PaginationConfig {
  /** 페이지당 레코드 수 */
  recordCountPerPage: number;
  /** 페이지 크기 (페이지 번호 표시 개수) */
  pageSize: number;
}

/**
 * 화면 전체 정의
 */
export interface ScreenDefinition {
  /** 유니크 ID */
  screenId: string;
  /** 컴포넌트명 (PascalCase, 예: EgovMberManage) */
  screenName: string;
  /** 화면 제목 (예: 회원관리) */
  title: string;
  /** 화면 설명 */
  description?: string;
  /** 라우터 경로 (예: admin/member) */
  route: string;
  /** 화면 유형 */
  pageType: PageType;
  /** 도메인 경로 (예: user/member) — 파일 생성 경로에 사용 */
  domainPath: string;
  /** 폼 레이아웃 컬럼 수 (1~4) */
  formColumns?: number;
  /** 폼 레이아웃 행 수 (선택) */
  formRows?: number;
  /** 액션 버튼 위치 (top: 폼 상단, middle: 폼/그리드 사이, bottom: 그리드 하단) */
  actionPosition?: 'top' | 'middle' | 'bottom';
  /** 하단 데이터 그리드 가로 크기 (예: '100%') */
  gridWidth?: string;
  /** 하단 데이터 그리드 세로 크기 (예: '400px') */
  gridHeight?: string;
  /** 필드 목록 (검색 조건 및 폼 필드) */
  fields: FieldDefinition[];
  /** 데이터 그리드 컬럼 목록 (pageType이 list인 경우 사용) */
  gridColumns?: FieldDefinition[];
  /** API 액션 목록 */
  actions: ApiAction[];
  /** 목록 화면 페이지네이션 설정 */
  pagination?: PaginationConfig;
  /** 목록 화면의 기본 조회 API endpoint */
  listApiEndpoint?: string;
  /** 수정일 */
  updatedAt?: string;
}

/**
 * 코드 생성 결과
 */
export interface GeneratedCode {
  /** 페이지 TSX 파일 내용 */
  pageTsx: string;
  /** 스키마 파일 내용 */
  schemaTts: string;
  /** API 핸들러 파일 내용 */
  handlerTs: string;
  /** 파일 저장 경로들 */
  filePaths: {
    page: string;
    schema: string;
    handler: string;
  };
}
