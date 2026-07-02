import type { FormSchema } from '@/common/validator/types';

// =====================================================================
// [자동 생성] 구매요청현황 — Form Schema
// =====================================================================

export interface MainFormData {
  PR_NUM?: string;
  PR_SUBJECT?: string;
  REG_USER_NM?: string;
}

export const mainFormSchema: FormSchema<MainFormData> = {
  PR_NUM: { label: '구매요청번호', type: 'text', maxlength: 20, placeholder: '구매요청번호' },
  PR_SUBJECT: { label: '구매요청명', type: 'text', maxlength: 200, placeholder: '구매요청명' },
  REG_USER_NM: { label: '등록자', type: 'text', maxlength: 50, placeholder: '등록자' },
};
