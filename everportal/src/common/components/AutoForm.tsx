import React from 'react';
import type { FieldValues, DefaultValues } from 'react-hook-form';
import type { FormSchema } from '../validator/types';
import { useFormSchema } from '../validator/useFormSchema';
import FormField from './FormField';

interface AutoFormProps<T extends FieldValues> {
  /** 화면별 필드 스키마 정의 */
  schema: FormSchema<T>;
  /** 초기값 (수정 화면에서는 기존 데이터 전달) */
  defaultValues?: DefaultValues<T>;
  /** submit 핸들러 (검증 통과 시 호출) */
  onSubmit: (data: T) => void | Promise<void>;
  /** 취소 핸들러 */
  onCancel?: () => void;
  /** submit 버튼 텍스트 (default: '저장') */
  submitLabel?: string;
  /** 취소 버튼 텍스트 (default: '취소') */
  cancelLabel?: string;
  /** 로딩 상태 (submit 중 버튼 비활성화) */
  isLoading?: boolean;
  /** 폼 제목 (선택) */
  title?: string;
  /** 폼 설명 (선택) */
  description?: string;
  /** 추가 className */
  className?: string;
  /** 스키마 키 순서 재정의 (없으면 Object.keys 순서 사용) */
  fieldOrder?: Array<keyof T>;
  /** 특정 필드를 제외하고 렌더링 (AutoForm 외부에서 직접 렌더링할 필드) */
  excludeFields?: Array<keyof T>;
  /** 버튼 영역 아래에 추가로 렌더링할 컨텐츠 */
  children?: React.ReactNode;
}

/**
 * 스키마 기반 전체 폼 자동 렌더링 컴포넌트
 * schema를 받아 FormField를 순서대로 자동 렌더링하고 submit/cancel 버튼을 포함합니다.
 *
 * @example
 * <AutoForm
 *   schema={mberManageSchema}
 *   defaultValues={selectedRow}
 *   onSubmit={handleSave}
 *   onCancel={() => navigate(-1)}
 *   submitLabel="저장"
 * />
 */
function AutoForm<T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  onCancel,
  submitLabel = '저장',
  cancelLabel = '취소',
  isLoading = false,
  title,
  description,
  className,
  fieldOrder,
  excludeFields = [],
  children,
}: AutoFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useFormSchema<T>(schema, defaultValues as Partial<T>);

  // 렌더링할 필드 키 목록 결정
  const fieldKeys = (fieldOrder ?? (Object.keys(schema) as Array<keyof T>)).filter(
    (key) => !excludeFields.includes(key)
  );

  const isDisabled = isLoading || isSubmitting;

  return (
    <div className={`auto-form-container${className ? ` ${className}` : ''}`}>
      {/* 폼 헤더 */}
      {(title || description) && (
        <div className="auto-form-header">
          {title && <h3 className="auto-form-title">{title}</h3>}
          {description && <p className="auto-form-description">{description}</p>}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* 필드 자동 렌더링 */}
        <div className="auto-form-fields">
          {fieldKeys.map((key) => (
            <FormField<T>
              key={String(key)}
              name={String(key) as any}
              schema={schema[key]}
              register={register}
              error={errors[key]?.message as string | undefined}
            />
          ))}
        </div>

        {/* 추가 컨텐츠 슬롯 (특수 필드 등) */}
        {children}

        {/* 버튼 영역 */}
        <div className="auto-form-actions">
          {onCancel && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancel}
              disabled={isDisabled}
            >
              {cancelLabel}
            </button>
          )}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={isDisabled}
          >
            {isDisabled ? '처리 중...' : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AutoForm;
