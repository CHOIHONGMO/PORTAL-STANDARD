import { z } from 'zod';
import type { FormSchema } from './types';

/**
 * FormSchema 정의를 읽어 zod 검증 객체를 자동 생성합니다.
 *
 * 변환 규칙:
 *  - required: true         → .min(1, '...은(는) 필수 입력 항목입니다.')
 *  - maxlength: N           → .max(N, '...은(는) N자 이내로 입력해 주세요.')
 *  - minlength: N           → .min(N, '...은(는) N자 이상 입력해 주세요.')
 *  - type: 'email'          → z.string().email(...)
 *  - type: 'number'         → z.coerce.number()
 *  - type: 'date'           → z.string().regex(YYYY-MM-DD)
 *  - type: 'checkbox'       → z.boolean()
 *  - pattern: /regex/       → z.string().regex(...)
 */
export function buildZodSchema<T extends Record<string, any>>(
  schema: FormSchema<T>
): z.ZodObject<any> {
  const shape: Record<string, z.ZodTypeAny> = {};

  for (const key in schema) {
    const field = schema[key];
    let zodField: z.ZodTypeAny;

    // ── 타입별 기본 zod 타입 설정 ──────────────────────────────────
    switch (field.type) {
      case 'number': {
        let numField = z.coerce.number({
          invalid_type_error: `${field.label}은(는) 숫자만 입력 가능합니다.`,
        });
        if (field.min !== undefined) {
          numField = numField.min(field.min, `${field.label}은(는) ${field.min} 이상이어야 합니다.`);
        }
        if (field.max !== undefined) {
          numField = numField.max(field.max, `${field.label}은(는) ${field.max} 이하이어야 합니다.`);
        }
        zodField = numField;
        break;
      }

      case 'email': {
        zodField = z
          .string()
          .email(`${field.label}의 이메일 형식이 올바르지 않습니다.`);
        break;
      }

      case 'date': {
        zodField = z
          .string()
          .regex(/^\d{4}-\d{2}-\d{2}$/, `${field.label}의 날짜 형식은 YYYY-MM-DD이어야 합니다.`);
        break;
      }

      case 'checkbox': {
        zodField = z.boolean();
        break;
      }

      default: {
        // text, textarea, combo, radio, tel, password
        let strField = z.string();

        if (field.minlength) {
          strField = strField.min(
            field.minlength,
            `${field.label}은(는) ${field.minlength}자 이상 입력해 주세요.`
          );
        }
        if (field.maxlength) {
          strField = strField.max(
            field.maxlength,
            `${field.label}은(는) ${field.maxlength}자 이내로 입력해 주세요.`
          );
        }
        if (field.pattern) {
          strField = strField.regex(
            field.pattern,
            `${field.label}의 형식이 올바르지 않습니다.`
          );
        }
        zodField = strField;
        break;
      }
    }

    // ── 필수 여부 처리 ───────────────────────────────────────────────
    if (field.required) {
      // 문자열 타입의 경우 빈 문자열도 필수 검증
      if (field.type !== 'number' && field.type !== 'checkbox') {
        zodField = z
          .string({ required_error: `${field.label}은(는) 필수 입력 항목입니다.` })
          .min(1, `${field.label}은(는) 필수 입력 항목입니다.`);

        // 필수 + maxlength 재적용
        if (field.maxlength) {
          zodField = (zodField as z.ZodString).max(
            field.maxlength,
            `${field.label}은(는) ${field.maxlength}자 이내로 입력해 주세요.`
          );
        }
        // 필수 + pattern 재적용
        if (field.pattern) {
          zodField = (zodField as z.ZodString).regex(
            field.pattern,
            `${field.label}의 형식이 올바르지 않습니다.`
          );
        }
        // 필수 email
        if (field.type === 'email') {
          zodField = (zodField as z.ZodString).email(
            `${field.label}의 이메일 형식이 올바르지 않습니다.`
          );
        }
      }
    } else {
      // 선택 필드: 빈 문자열 허용
      if (field.type !== 'number' && field.type !== 'checkbox') {
        zodField = zodField.optional().or(z.literal(''));
      } else if (field.type === 'number') {
        zodField = zodField.optional();
      }
    }

    shape[key] = zodField;
  }

  return z.object(shape);
}
