import type { FormSchema } from '@/common/validator/types';

// =====================================================================
// [자동 생성] 구매요청현황 — Form Schema
// =====================================================================

export interface MainFormData {
  pr_num?: string;
  pr_subject?: string;
  reg_user_nm?: string;
}

export const mainFormSchema: FormSchema<MainFormData> = {
  pr_num: { label: '구매요청번호', type: 'text', maxlength: 10, placeholder: '구매요청번호' },
  pr_subject: { label: '구매요청명', type: 'text', maxlength: 50, placeholder: '구매요청명' },
  reg_user_nm: { label: '등록자', type: 'text', maxlength: 50, placeholder: '등록자명' },
};
