import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildZodSchema } from './buildZodSchema';
import type { FormSchema } from './types';

/**
 * Schema-driven 공통 Form 훅
 * react-hook-form + zod resolver를 래핑하여 사용하기 쉽게 제공합니다.
 *
 * @param schema   - 화면별 필드 스키마 정의
 * @param defaultValues - 초기값 (수정 화면에서는 기존 데이터 전달)
 *
 * @example
 * const { register, handleSubmit, errors, fieldProps, errorMessage } =
 *   useFormSchema(mberManageSchema, { mberId: 'user01' });
 *
 * // JSX에서
 * <input {...fieldProps('mberId')} />
 * {errorMessage('mberId') && <span className="error-msg">{errorMessage('mberId')}</span>}
 */
export function useFormSchema<T extends Record<string, any>>(
  schema: FormSchema<T>,
  defaultValues: Partial<T> = {}
) {
  const zodSchema = buildZodSchema<T>(schema);

  const methods = useForm<T>({
    resolver: zodResolver(zodSchema),
    defaultValues: defaultValues as any,
    mode: 'onBlur',           // blur 시 검증
    reValidateMode: 'onChange', // 에러 발생 후엔 onChange로 재검증
  });

  const { register, formState: { errors } } = methods;

  /**
   * 필드에 react-hook-form register + 공통 속성을 한 번에 전달하는 헬퍼
   * <input {...fieldProps('mberId')} /> 형태로 사용
   */
  const fieldProps = (name: keyof T) => ({
    ...register(String(name)),
    id: String(name),
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${String(name)}-error` : undefined,
  });

  /**
   * 해당 필드의 에러 메시지 문자열을 반환 (없으면 undefined)
   */
  const errorMessage = (name: keyof T): string | undefined =>
    errors[name]?.message as string | undefined;

  return {
    ...methods,
    fieldProps,
    errorMessage,
  };
}
