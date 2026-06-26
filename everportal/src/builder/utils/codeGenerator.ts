// =====================================================================
// Visual Screen Builder — Code Generator
// ScreenDefinition JSON → TSX / Schema.ts / Handler.ts 자동 생성
// =====================================================================

import type { ScreenDefinition, FieldDefinition, GeneratedCode } from '../types/screenDefinition';

// ─────────────────────────────────────────────────────────────────────
// 헬퍼 함수
// ─────────────────────────────────────────────────────────────────────

/** PascalCase → camelCase */
const toCamelCase = (str: string): string =>
  str.charAt(0).toLowerCase() + str.slice(1);

/** 첫 글자 대문자 */
const capitalize = (str: string): string =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** 필드 타입 → TypeScript 기본 타입 */
const fieldTypeToTs = (type: string): string => {
  switch (type) {
    case 'number': return 'number';
    case 'checkbox': return 'boolean';
    default: return 'string';
  }
};

/** FieldSchema 속성 목록 문자열 생성 */
const buildSchemaProps = (field: FieldDefinition): string => {
  const props: string[] = [];
  props.push(`label: '${field.label}'`);
  props.push(`type: '${field.type}'`);
  if (field.required) props.push(`required: true`);
  if (field.maxlength) props.push(`maxlength: ${field.maxlength}`);
  if (field.minlength) props.push(`minlength: ${field.minlength}`);
  if (field.min !== undefined) props.push(`min: ${field.min}`);
  if (field.max !== undefined) props.push(`max: ${field.max}`);
  if (field.placeholder) props.push(`placeholder: '${field.placeholder}'`);
  if (field.disabled) props.push(`disabled: true`);
  if (field.readOnly) props.push(`readOnly: true`);
  if (field.rows) props.push(`rows: ${field.rows}`);
  if (field.pattern) props.push(`pattern: /${field.pattern}/`);
  if (field.layout?.colSpan) props.push(`colSpan: ${field.layout.colSpan}`);
  if (field.layout?.rowSpan) props.push(`rowSpan: ${field.layout.rowSpan}`);
  if (field.options && field.options.length > 0) {
    const opts = field.options
      .map(o => `{ value: '${o.value}', label: '${o.label}' }`)
      .join(', ');
    props.push(`options: [${opts}]`);
  }
  return props.join(', ');
};

// ─────────────────────────────────────────────────────────────────────
// Schema 파일 생성
// ─────────────────────────────────────────────────────────────────────

export const generateSchemaTs = (screen: ScreenDefinition): string => {
  const formTypeName = `${screen.screenName}Form`;
  const schemaVarName = `${toCamelCase(screen.screenName)}Schema`;

  // Form 필드만 (검색 조건 제외)
  const formFields = screen.pageType === 'list'
    ? screen.fields.filter(f => f.isSearchCondition)
    : screen.fields;

  const interfaceFields = formFields
    .map(f => `  ${f.fieldName}${f.required ? '' : '?'}: ${fieldTypeToTs(f.type)};`)
    .join('\n');

  const schemaFields = formFields
    .map(f => `  ${f.fieldName}: { ${buildSchemaProps(f)} },`)
    .join('\n');

  return `import type { FormSchema } from '@/common/validator/types';

// =====================================================================
// [자동 생성] ${screen.title} — Form Schema
// 생성일: ${new Date().toISOString()}
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

export interface ${formTypeName} {
${interfaceFields}
}

export const ${schemaVarName}: FormSchema<${formTypeName}> = {
${schemaFields}
};
`;
};

// ─────────────────────────────────────────────────────────────────────
// Handler 파일 생성
// ─────────────────────────────────────────────────────────────────────

export const generateHandlerTs = (screen: ScreenDefinition): string => {
  const formTypeName = `${screen.screenName}Form`;
  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;

  const imports = [
    `import apiClient from '@/api/apiClient';`,
    `import type { ${formTypeName} } from './${schemaFileName}';`,
  ].join('\n');

  const functionBodies = screen.actions.map(action => {
    const fnName = toCamelCase(action.label.replace(/\s/g, ''));
    switch (action.buttonType) {
      case 'search':
      case 'submit':
        if (action.method === 'GET') {
          return `/**
 * ${action.label}
 * @param params 검색 파라미터
 */
export const ${fnName} = async (params: Partial<${formTypeName}> & { pageIndex?: number }): Promise<any> => {
  const query = new URLSearchParams(params as any).toString();
  const response: any = await apiClient.get(\`${action.endpoint}?\${query}\`);
  return response;
};`;
        } else {
          return `/**
 * ${action.label}
 * @param data 폼 데이터
 */
export const ${fnName} = async (data: ${formTypeName}): Promise<any> => {
  const response: any = await apiClient.${action.method.toLowerCase()}('${action.endpoint}', data);
  return response;
};`;
        }
      case 'delete':
        return `/**
 * ${action.label}
 * @param ids 삭제할 ID 목록
 */
export const ${fnName} = async (ids: string[]): Promise<any> => {
  const response: any = await apiClient.${action.method.toLowerCase()}('${action.endpoint}', { ids });
  return response;
};`;
      default:
        return `/**
 * ${action.label}
 * TODO: 비즈니스 로직을 구현하세요.
 */
export const ${fnName} = async (data?: any): Promise<any> => {
  const response: any = await apiClient.${action.method.toLowerCase()}('${action.endpoint}', data);
  return response;
};`;
    }
  });

  return `${imports}

// =====================================================================
// [자동 생성] ${screen.title} — API Handler
// 생성일: ${new Date().toISOString()}
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
//   비즈니스 로직을 직접 수정하세요.
// =====================================================================

${functionBodies.join('\n\n')}
`;
};

// ─────────────────────────────────────────────────────────────────────
// Page TSX 생성 — Form 화면
// ─────────────────────────────────────────────────────────────────────

const generateFormPageTsx = (screen: ScreenDefinition): string => {
  const schemaVarName = `${toCamelCase(screen.screenName)}Schema`;
  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;
  const handlerFileName = `${toCamelCase(screen.screenName)}.handler`;
  const formTypeName = `${screen.screenName}Form`;

  const submitAction = screen.actions.find(a => a.buttonType === 'submit');
  const submitFnName = submitAction
    ? toCamelCase(submitAction.label.replace(/\s/g, ''))
    : 'saveData';

  const cancelAction = screen.actions.find(a => a.buttonType === 'navigate');

  // Form 화면에서의 actionPosition
  const actionPos = screen.actionPosition || 'middle';
  
  const customActionsJsx = `        <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', marginTop: '16px' }}>
          ${cancelAction ? `<button type="button" onClick={() => navigate('${cancelAction.navigateTo || -1}')} className="btn btn-secondary">취소</button>` : `<button type="button" onClick={() => navigate(-1)} className="btn btn-secondary">취소</button>`}
          <button type="submit" form="main-auto-form" className="btn btn-primary">${submitAction?.label ?? '저장'}</button>
        </div>`;

  return `import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AutoForm } from '@/common/components/AutoForm';
import { ${schemaVarName} } from './${schemaFileName}';
import { ${submitFnName} } from './${handlerFileName}';
import type { ${formTypeName} } from './${schemaFileName}';

// =====================================================================
// [자동 생성] ${screen.title}
// 생성일: ${new Date().toISOString()}
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

const ${screen.screenName}: React.FC = () => {
  const navigate = useNavigate();

  const handleSubmit = async (data: ${formTypeName}) => {
    try {
      const response = await ${submitFnName}(data);
      if (response?.resultCode === 'SUCCESS') {
        alert('처리되었습니다.');
        navigate(-1);
      } else {
        alert(response?.resultMessage || '처리 실패');
      }
    } catch (error) {
      console.error('${screen.title} 처리 오류', error);
      alert('처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>${screen.title}</h2>
          ${screen.description ? `<p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>${screen.description}</p>` : ''}
        </div>
        {/* 상단 액션 */}
        ${actionPos === 'top' ? customActionsJsx : ''}
      </div>
      
      <div id="main-auto-form-wrap" style={{ display: 'contents' }}>
        {/* 
          AutoForm 내부 form 태그에 id를 직접 주입하지 못하므로, 
          actionPosition === 'top' 일 경우에는 기본 버튼을 숨기고 별도로 폼 외부 버튼에 form 속성을 연결하기가 어렵습니다.
          현재 버전에서는 AutoForm을 form 속성 없이 감싸고, 브라우저가 AutoForm 내부의 submit을 찾아가길 기대하거나
          간단히 AutoForm 내부 버튼을 사용합니다.
          (AutoForm 수정 시 id 속성을 추가하도록 보완 가능)
        */}
      </div>

      <AutoForm
        schema={${schemaVarName}}
        onSubmit={handleSubmit}
        onCancel={${cancelAction ? `() => navigate('${cancelAction.navigateTo || -1}')` : '() => navigate(-1)'}}
        submitLabel="${submitAction?.label ?? '저장'}"
        cancelLabel="취소"
        columns={${screen.formColumns || 1}}
        hideActions={${actionPos === 'top'}}
      />
      
      {/* 하단 액션 */}
      ${actionPos === 'bottom' ? customActionsJsx : ''}
    </div>
  );
};

export default ${screen.screenName};
`;
};

// ─────────────────────────────────────────────────────────────────────
// Page TSX 생성 — List 화면
// ─────────────────────────────────────────────────────────────────────

const generateListPageTsx = (screen: ScreenDefinition): string => {
  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;
  const handlerFileName = `${toCamelCase(screen.screenName)}.handler`;

  const searchFields = screen.fields.filter(f => f.isSearchCondition !== false); // 기본적으로 필드는 검색조건으로 간주
  const tableColumns = screen.gridColumns || [];

  const searchAction = screen.actions.find(a => a.buttonType === 'search');
  const deleteAction = screen.actions.find(a => a.buttonType === 'delete');
  const createAction = screen.actions.find(a => a.buttonType === 'navigate');

  const searchFnName = searchAction ? toCamelCase(searchAction.label.replace(/\s/g, '')) : 'fetchList';
  const deleteFnName = deleteAction ? toCamelCase(deleteAction.label.replace(/\s/g, '')) : 'deleteItems';

  // 인터페이스 필드 (테이블 컬럼 기반)
  const interfaceFields = tableColumns
    .map(f => `  ${f.fieldName}: ${fieldTypeToTs(f.type)};`)
    .join('\n');

  // 검색 조건 state 목록
  const searchStates = searchFields.map(f => {
    const defaultVal = f.type === 'number' ? '0' : f.options?.length ? `'${f.options[0]?.value ?? ''}'` : `''`;
    return `  const [${f.fieldName}, set${capitalize(f.fieldName)}] = useState<${fieldTypeToTs(f.type)}>(${defaultVal});`;
  }).join('\n');

  // 검색 조건 파라미터 객체
  const searchParamsEntries = searchFields.map(f => `    ${f.fieldName},`).join('\n');

  // 검색 폼 JSX
  const searchFormJsx = searchFields.map(f => {
    if (f.type === 'combo' && f.options) {
      const opts = f.options.map(o => `              <option value="${o.value}">${o.label}</option>`).join('\n');
      return `        <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>${f.label}</label>
          <select
            className="form-input"
            value={${f.fieldName}}
            onChange={(e) => set${capitalize(f.fieldName)}(e.target.value)}
          >
${opts}
          </select>
        </div>`;
    }
    return `        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>${f.label}</label>
          <input
            type="${f.type === 'text' ? 'text' : f.type}"
            className="form-input"
            value={${f.fieldName}}
            onChange={(e) => set${capitalize(f.fieldName)}(e.target.value)}
            placeholder="${f.placeholder ?? `${f.label}을(를) 입력해주세요`}"
          />
        </div>`;
  }).join('\n');

  // 검색 폼 그리드 스타일 설정
  const formGridStyle = `display: 'grid', gridTemplateColumns: 'repeat(${screen.formColumns || 1}, 1fr)', gap: '16px', alignItems: 'end', marginBottom: '24px', padding: '20px', borderRadius: 'var(--radius-md)', backgroundColor: '#f8fafc'`;

  // 테이블 헤더 JSX
  const tableHeaders = tableColumns
    .map(f => {
      const styleProps = [];
      if (f.columnWidth) styleProps.push(`width: '${f.columnWidth}%'`);
      if (f.align) styleProps.push(`textAlign: '${f.align}'`);
      const styleAttr = styleProps.length > 0 ? ` style={{ ${styleProps.join(', ')} }}` : '';
      return `            <th${styleAttr}>${f.label}</th>`;
    })
    .join('\n');

  // 테이블 바디 JSX
  const tableCells = tableColumns
    .map(f => `                    <td${f.align ? ` style={{ textAlign: '${f.align}' }}` : ''}>{item.${f.fieldName}}</td>`)
    .join('\n');

  // colgroup JSX
  const colgroup = tableColumns
    .map(f => `            <col${f.columnWidth ? ` width="${f.columnWidth}%"` : ''} />`)
    .join('\n');

  const actionPos = screen.actionPosition || 'middle';
  
  const actionButtonsJsx = `<div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          ${deleteAction ? `<button type="button" onClick={handleDelete} className="btn-secondary" style={{ color: '#dc2626', borderColor: '#fca5a5', cursor: 'pointer' }}>선택삭제</button>` : ''}
          ${createAction ? `<Link to="${createAction.navigateTo}" className="btn-submit" style={{ display: 'inline-flex', alignItems: 'center', padding: '0 20px', height: '40px', cursor: 'pointer', textDecoration: 'none' }}>${createAction.label}</Link>` : ''}
          <button type="submit" form="search-form" className="btn-search" style={{ cursor: 'pointer', minWidth: '100px' }}>조회</button>
        </div>`;

  const gridStyleAttr = (screen.gridWidth || screen.gridHeight) ? ` style={{ ${screen.gridWidth ? `width: '${screen.gridWidth}', ` : ''}${screen.gridHeight ? `height: '${screen.gridHeight}', ` : ''}overflow: 'auto' }}` : ` style={{ overflowX: 'auto' }}`;

  return `import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ${searchFnName}${deleteAction ? `, ${deleteFnName}` : ''} } from './${handlerFileName}';

// =====================================================================
// [자동 생성] ${screen.title}
// 생성일: ${new Date().toISOString()}
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

interface ${screen.screenName}Item {
${interfaceFields}
}

const ${screen.screenName}: React.FC = () => {
  const [dataList, setDataList] = useState<${screen.screenName}Item[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // 검색 조건 State
${searchStates}

  useEffect(() => {
    fetchData(1);
  }, [${searchFields.map(f => f.fieldName).join(', ')}]);

  const fetchData = async (page = 1) => {
    try {
      setLoading(true);
      const response = await ${searchFnName}({
${searchParamsEntries}
        pageIndex: page,
      });
      if (response?.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
        setPageIndex(page);
        setPagination(response.paginationInfo);
      }
    } catch (error) {
      console.error('${screen.title} 목록 조회 실패', error);
    } finally {
      setLoading(false);
      setSelectedIds([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData(1);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(dataList.map((_, i) => String(i)));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    if (e.target.checked) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(x => x !== id));
    }
  };
${deleteAction ? `
  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 항목을 선택하세요.');
      return;
    }
    if (window.confirm('${deleteAction.confirmMessage ?? '선택된 항목을 삭제하시겠습니까?'}')) {
      try {
        const response = await ${deleteFnName}(selectedIds);
        if (response?.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          fetchData(pageIndex);
        } else {
          alert(response?.resultMessage || '삭제 실패');
        }
      } catch (error) {
        console.error('삭제 오류', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };` : ''}

  return (
    <div className="container p_main">
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>${screen.title}</h2>
          ${screen.description ? `<p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>${screen.description}</p>` : ''}
        </div>
        ${actionPos === 'top' ? actionButtonsJsx : ''}
      </div>

      {/* 검색 폼 */}
      <form id="search-form" onSubmit={handleSearch} className="condition" style={{ ${formGridStyle} }}>
${searchFormJsx}
        ${actionPos === 'middle' ? `
        <div style={{ display: 'flex', justifyContent: 'flex-end', gridColumn: '1 / -1', marginTop: '8px' }}>
          ${actionButtonsJsx}
        </div>` : ''}
      </form>

      {/* 목록 유틸 */}
      <div className="list-utils" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="total-count" style={{ fontSize: '0.95rem' }}>
          총 : <strong>{totalCount}</strong>건
        </div>
        ${actionPos === 'middle' ? `<div>{/* 상단에서 버튼을 렌더링했습니다 */}</div>` : ''}
      </div>

      {/* 데이터 테이블 */}
      <div${gridStyleAttr}>
        <table className="data-table">
          <colgroup>
            <col width="6%" />
            <col width="5%" />
${colgroup}
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={dataList.length > 0 && selectedIds.length === dataList.length}
                />
              </th>
${tableHeaders}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={${tableColumns.length + 2}} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>데이터를 조회 중입니다...</td></tr>
            ) : dataList.length === 0 ? (
              <tr><td colSpan={${tableColumns.length + 2}} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>조회된 데이터가 없습니다.</td></tr>
            ) : (
              dataList.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ textAlign: 'center' }}>{(pageIndex - 1) * ${screen.pagination?.recordCountPerPage ?? 10} + idx + 1}</td>
                  <td style={{ textAlign: 'center' }}>
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(String(idx))}
                      onChange={(e) => handleSelectRow(e, String(idx))}
                    />
                  </td>
${tableCells}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* 페이지네이션 */}
      {pagination && pagination.totalRecordCount > pagination.recordCountPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <button
            disabled={pageIndex === 1}
            onClick={() => fetchData(pageIndex - 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            이전
          </button>
          <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>{pageIndex} / {Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}</span>
          <button
            disabled={pageIndex >= Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}
            onClick={() => fetchData(pageIndex + 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            다음
          </button>
        </div>
      )}
      
      {/* 하단 액션 */}
      ${actionPos === 'bottom' ? `
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
        ${actionButtonsJsx}
      </div>` : ''}
    </div>
  );
};

export default ${screen.screenName};
`;
};

// ─────────────────────────────────────────────────────────────────────
// 메인 진입점
// ─────────────────────────────────────────────────────────────────────

export const generateCode = (screen: ScreenDefinition): GeneratedCode => {
  const schemaFileName = `${toCamelCase(screen.screenName)}.schema.ts`;
  const handlerFileName = `${toCamelCase(screen.screenName)}.handler.ts`;
  const pageFileName = `${screen.screenName}.tsx`;
  const basePath = `src/pages/${screen.domainPath}`;

  const pageTsx = screen.pageType === 'list'
    ? generateListPageTsx(screen)
    : generateFormPageTsx(screen);

  return {
    pageTsx,
    schemaTts: generateSchemaTs(screen),
    handlerTs: generateHandlerTs(screen),
    filePaths: {
      page: `${basePath}/${pageFileName}`,
      schema: `${basePath}/${schemaFileName}`,
      handler: `${basePath}/${handlerFileName}`,
    },
  };
};
