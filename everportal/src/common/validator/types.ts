// =====================================================================
// 공통 Form Validator 타입 정의
// 각 화면에서 필드별 속성(타입, 필수, maxlength 등)을 정의하는 스키마 구조
// Apache Commons Validator XML → TypeScript Schema 대체
// =====================================================================

/**
 * 지원하는 폼 필드 입력 타입
 */
export type FieldType =
  | 'text'       // 일반 텍스트 → <input type="text">
  | 'number'     // 숫자 입력   → <input type="number">
  | 'combo'      // 셀렉트 박스  → <select>
  | 'date'       // 날짜 선택   → <input type="date">
  | 'textarea'   // 여러줄 텍스트 → <textarea>
  | 'email'      // 이메일      → <input type="email">
  | 'tel'        // 전화번호    → <input type="text"> + 숫자/하이픈 패턴
  | 'password'   // 비밀번호    → <input type="password">
  | 'radio'      // 라디오 그룹
  | 'checkbox';  // 체크박스    → <input type="checkbox">

/**
 * 콤보박스 / 라디오 / 체크박스 옵션 타입
 */
export interface FieldOption {
  value: string;
  label: string;
}

/**
 * 단일 필드 스키마 정의
 * 기존 Apache Commons Validator XML의 <field> 태그를 대체
 *
 * @example
 * // 기존 XML:
 * // <field property="mberId" depends="required, maxlength">
 * //   <arg0 key="일반회원아이디" resource="false"/>
 * //   <var><var-name>maxlength</var-name><var-value>20</var-value></var>
 * // </field>
 *
 * // 대체 스키마:
 * // mberId: { label: '일반회원아이디', type: 'text', required: true, maxlength: 20 }
 */
export interface FieldSchema {
  /** 필드 한글명 - 라벨 텍스트 및 에러 메시지에 사용 */
  label: string;

  /** 입력 타입 */
  type: FieldType;

  /** 필수 여부 (default: false) — XML depends="required" 대체 */
  required?: boolean;

  /** 최대 글자수 — XML depends="maxlength" + var 대체 */
  maxlength?: number;

  /** 최소 글자수 — XML depends="minlength" + var 대체 */
  minlength?: number;

  /** 정규식 패턴 — XML depends="mask" + var 대체 */
  pattern?: RegExp;

  /** 숫자 최솟값 (type: 'number'에서 사용) */
  min?: number;

  /** 숫자 최댓값 (type: 'number'에서 사용) */
  max?: number;

  /** combo / radio / checkbox 선택 목록 */
  options?: FieldOption[];

  /** 입력 힌트 텍스트 */
  placeholder?: string;

  /** 비활성화 여부 */
  disabled?: boolean;

  /** 읽기 전용 여부 */
  readOnly?: boolean;

  /** textarea 줄 수 (type: 'textarea'에서 사용, default: 4) */
  rows?: number;

  /** 레이아웃 렌더링 시 사용할 colSpan (컬럼 차지 수) */
  colSpan?: number;

  /** 레이아웃 렌더링 시 사용할 rowSpan (행 차지 수) */
  rowSpan?: number;
}

/**
 * 폼 전체 스키마 타입
 * 각 화면에서 폼 객체의 키 이름을 그대로 사용하여 정의
 *
 * @example
 * const mberSchema: FormSchema<MberForm> = {
 *   mberId: { label: '아이디', type: 'text', required: true, maxlength: 20 },
 *   mberNm: { label: '이름',   type: 'text', required: true, maxlength: 50 },
 * };
 */
export type FormSchema<T extends Record<string, any> = Record<string, any>> = {
  [K in keyof T]: FieldSchema;
};
