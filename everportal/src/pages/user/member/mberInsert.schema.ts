/**
 * 회원 등록 화면 필드 스키마 정의
 *
 * 기존 XML: eversrm/src/main/resources/validator/com/portal/user/member/MberManage.xml
 * 대체 방식: react-hook-form + zod 기반 Schema-driven Validation
 *
 * 사용법:
 *   import { mberInsertSchema } from './mberInsert.schema';
 *   const { register, handleSubmit, formState: { errors }, fieldProps, errorMessage } =
 *     useFormSchema(mberInsertSchema);
 */

import type { FormSchema } from '@/common/validator/types';

// ──────────────────────────────────────────────────────────────────────
// 폼 데이터 타입 정의
// ──────────────────────────────────────────────────────────────────────
export interface MberInsertForm {
  mberId: string;
  mberNm: string;
  password: string;
  password2: string;
  passwordHint: string;
  passwordCnsr: string;
  sexdstnCode: string;
  areaNo: string;
  middleTelno: string;
  endTelno: string;
  mberFxnum: string;
  moblphonNo: string;
  mberEmailAdres: string;
  zip: string;
  adres: string;
  detailAdres: string;
  groupId: string;
  mberSttus: string;
}

// ──────────────────────────────────────────────────────────────────────
// 스키마 정의 (기존 MberManage.xml → FormSchema 변환)
// ──────────────────────────────────────────────────────────────────────
export const mberInsertSchema: FormSchema<MberInsertForm> = {
  // XML: <field property="mberId" depends="required, maxlength"> maxlength=20
  mberId: {
    label: '일반회원아이디',
    type: 'text',
    required: true,
    maxlength: 20,
    placeholder: '아이디를 입력하세요',
  },

  // XML: <field property="mberNm" depends="required, maxlength"> maxlength=50
  mberNm: {
    label: '일반회원이름',
    type: 'text',
    required: true,
    maxlength: 50,
    placeholder: '이름을 입력하세요',
  },

  // 비밀번호 (XML에 없었으나 화면에서 필수 처리)
  password: {
    label: '비밀번호',
    type: 'password',
    required: true,
    minlength: 8,
    maxlength: 20,
    placeholder: '8~20자 비밀번호',
  },

  // 비밀번호 확인 (커스텀 검증은 superRefine으로 처리)
  password2: {
    label: '비밀번호 확인',
    type: 'password',
    required: true,
    placeholder: '비밀번호를 다시 입력하세요',
  },

  // XML: <field property="passwordHint" depends="required">
  passwordHint: {
    label: '비밀번호힌트',
    type: 'combo',
    required: true,
    // options는 API 응답에서 동적으로 세팅 → 컴포넌트에서 options prop으로 주입
    options: [],
  },

  // XML: <field property="passwordCnsr" depends="required, maxlength"> maxlength=100
  passwordCnsr: {
    label: '비밀번호정답',
    type: 'text',
    required: true,
    maxlength: 100,
    placeholder: '비밀번호 힌트 정답',
  },

  // 성별 (선택)
  sexdstnCode: {
    label: '성별',
    type: 'combo',
    options: [],
  },

  // XML: <field property="areaNo" depends="maxlength, mask"> mask=[0-9]*  maxlength=4
  areaNo: {
    label: '집지역번호',
    type: 'tel',
    maxlength: 4,
    pattern: /^[0-9]*$/,
    placeholder: '예) 02',
  },

  // XML: <field property="middleTelno" depends="maxlength, mask"> maxlength=4
  middleTelno: {
    label: '집중간전화번호',
    type: 'tel',
    maxlength: 4,
    pattern: /^[0-9]*$/,
    placeholder: '예) 1234',
  },

  // XML: <field property="endTelno" depends="maxlength, mask"> maxlength=4
  endTelno: {
    label: '집마지막전화번호',
    type: 'tel',
    maxlength: 4,
    pattern: /^[0-9]*$/,
    placeholder: '예) 5678',
  },

  // XML: <field property="mberFxnum" depends="maxlength"> maxlength=15
  mberFxnum: {
    label: '팩스번호',
    type: 'tel',
    maxlength: 15,
    placeholder: '팩스번호',
  },

  // XML: <field property="moblphonNo" depends="maxlength"> maxlength=15
  moblphonNo: {
    label: '핸드폰번호',
    type: 'tel',
    maxlength: 15,
    placeholder: '예) 010-1234-5678',
  },

  // XML: <field property="mberEmailAdres" depends="email">
  mberEmailAdres: {
    label: '이메일주소',
    type: 'email',
    placeholder: 'example@email.com',
  },

  // 우편번호 (우편번호 검색 팝업과 연동)
  zip: {
    label: '우편번호',
    type: 'text',
    maxlength: 6,
    readOnly: true,
    placeholder: '우편번호 검색',
  },

  // XML: <field property="adres" depends="maxlength"> maxlength=100
  adres: {
    label: '주소',
    type: 'text',
    maxlength: 100,
    readOnly: true,
    placeholder: '주소 검색 후 자동 입력',
  },

  // 상세주소
  detailAdres: {
    label: '상세주소',
    type: 'text',
    maxlength: 100,
    placeholder: '상세주소를 입력하세요',
  },

  // XML: <field property="groupId" depends="required">
  groupId: {
    label: '그룹코드',
    type: 'combo',
    required: true,
    options: [],
  },

  // XML: <field property="mberSttus" depends="required">
  mberSttus: {
    label: '일반회원상태코드',
    type: 'combo',
    required: true,
    options: [],
  },
};
