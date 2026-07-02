import React from 'react';
import type { UseFormRegister, FieldValues, Path } from 'react-hook-form';
import type { FieldSchema } from '../validator/types';
import './FormField.css';

interface FormFieldProps<T extends FieldValues> {
  /** 필드 이름 (스키마 키와 동일) */
  name: Path<T>;
  /** 해당 필드의 스키마 정의 */
  schema: FieldSchema;
  /** react-hook-form register 함수 */
  register: UseFormRegister<T>;
  /** 에러 메시지 (없으면 undefined) */
  error?: string;
  /** 추가 className */
  className?: string;
}

/**
 * 공통 FormField 컴포넌트
 * schema.type을 읽어 적절한 HTML 입력 요소를 자동으로 렌더링합니다.
 *
 * @example
 * <FormField
 *   name="mberId"
 *   schema={mberManageSchema.mberId}
 *   register={register}
 *   error={errors.mberId?.message}
 * />
 */
function FormField<T extends FieldValues>({
  name,
  schema,
  register,
  error,
  className,
}: FormFieldProps<T>) {
  const {
    label,
    type,
    required,
    maxlength,
    placeholder,
    options,
    disabled,
    readOnly,
    rows = 4,
    colSpan,
    rowSpan,
  } = schema;

  const inputClass = `form-control${error ? ' is-invalid' : ''}`;
  const errorId = `${name}-error`;

  if (type === 'hidden') {
    return (
      <input
        {...register(name)}
        type="hidden"
        id={name}
        defaultValue={schema.defaultValue}
      />
    );
  }

  // ── 타입별 입력 요소 렌더링 ───────────────────────────────────────
  const renderInput = () => {
    const commonProps = {
      id: name,
      className: inputClass,
      placeholder,
      disabled,
      readOnly,
      'aria-invalid': !!error,
      'aria-describedby': error ? errorId : undefined,
      maxLength: maxlength,
    };

    switch (type) {
      case 'textarea':
        return (
          <textarea
            {...register(name)}
            {...commonProps}
            rows={rows}
          />
        );

      case 'combo':
        return (
          <select
            {...register(name)}
            id={name}
            className={inputClass}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          >
            <option value="">-- 선택 --</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      case 'radio':
        return (
          <div className="radio-group" role="radiogroup" aria-label={label}>
            {options?.map((opt) => (
              <label key={opt.value} className="radio-label">
                <input
                  {...register(name)}
                  type="radio"
                  value={opt.value}
                  disabled={disabled}
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>
        );

      case 'checkbox':
        return (
          <input
            {...register(name)}
            type="checkbox"
            id={name}
            className="form-checkbox"
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
          />
        );

      case 'date':
        return (
          <input
            {...register(name)}
            {...commonProps}
            type="date"
          />
        );

      case 'number':
        return (
          <input
            {...register(name)}
            {...commonProps}
            type="number"
          />
        );

      case 'email':
        return (
          <input
            {...register(name)}
            {...commonProps}
            type="email"
          />
        );

      case 'password':
        return (
          <input
            {...register(name)}
            {...commonProps}
            type="password"
          />
        );
        
      case 'static':
        return (
          <div className="form-control-plaintext" style={{ padding: '8px 0', minHeight: '38px', color: 'inherit' }}>
            {schema.defaultValue || placeholder || ''}
          </div>
        );

      default: // text, tel
        return (
          <input
            {...register(name)}
            {...commonProps}
            type="text"
          />
        );
    }
  };

  return (
    <div 
      className={`form-field-row${className ? ` ${className}` : ''}`}
      style={{
        gridColumn: colSpan ? `span ${colSpan}` : undefined,
        gridRow: rowSpan ? `span ${rowSpan}` : undefined,
      }}
    >
      <label htmlFor={type === 'radio' ? undefined : name} className="form-label">
        {required && <span className="required-mark" aria-hidden="true">*</span>}
        {label}
      </label>
      <div className="form-field-wrap">
        {renderInput()}
        {error && (
          <span id={errorId} className="error-msg" role="alert">
            {error}
          </span>
        )}
      </div>
    </div>
  );
}

export default FormField;
