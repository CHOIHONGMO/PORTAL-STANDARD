// =====================================================================
// Visual Screen Builder — Code Generator (Block-based)
// ScreenDefinition JSON → TSX / Schema.ts / Handler.ts 자동 생성
// =====================================================================

import type { ScreenDefinition, FieldDefinition, GeneratedCode, FormBlock, GridBlock, ActionBlock, LayoutBlock, ApiAction } from '../types/screenDefinition';

// ─────────────────────────────────────────────────────────────────────
// 헬퍼 함수
// ─────────────────────────────────────────────────────────────────────

const toCamelCase = (str: string): string => str.charAt(0).toLowerCase() + str.slice(1);
const capitalize = (str: string): string => str.charAt(0).toUpperCase() + str.slice(1);

const fieldTypeToTs = (type: string): string => {
  switch (type) {
    case 'number': return 'number';
    case 'checkbox': return 'boolean';
    default: return 'string';
  }
};

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
  if (field.defaultValue) props.push(`defaultValue: '${field.defaultValue}'`);
  if (field.disabled) props.push(`disabled: true`);
  if (field.readOnly) props.push(`readOnly: true`);
  if (field.rows) props.push(`rows: ${field.rows}`);
  if (field.pattern) props.push(`pattern: /${field.pattern}/`);
  if (field.layout?.colSpan) props.push(`colSpan: ${field.layout.colSpan}`);
  if (field.layout?.rowSpan) props.push(`rowSpan: ${field.layout.rowSpan}`);
  if (field.options && field.options.length > 0) {
    const opts = field.options.map(o => `{ value: '${o.value}', label: '${o.label}' }`).join(', ');
    props.push(`options: [${opts}]`);
  }
  return props.join(', ');
};

// ─────────────────────────────────────────────────────────────────────
// Schema 파일 생성
// ─────────────────────────────────────────────────────────────────────

export const generateSchemaTs = (screen: ScreenDefinition): string => {
  const formBlocks = (screen.blocks || []).filter(b => b.type === 'form') as FormBlock[];
  
  if (formBlocks.length === 0) {
    return `// Form 블록이 존재하지 않습니다.\nexport {};\n`;
  }

  const schemaContent = formBlocks.map(form => {
    const formTypeName = `${capitalize(form.formId)}Data`;
    const schemaVarName = `${form.formId}Schema`;
    
    const interfaceFields = form.fields.map(f => `  ${f.fieldName}${f.required ? '' : '?'}: ${fieldTypeToTs(f.type)};`).join('\n');
    const schemaFields = form.fields.map(f => `  ${f.fieldName}: { ${buildSchemaProps(f)} },`).join('\n');

    return `export interface ${formTypeName} {
${interfaceFields}
}

export const ${schemaVarName}: FormSchema<${formTypeName}> = {
${schemaFields}
};`;
  }).join('\n\n');

  return `import type { FormSchema } from '@/common/validator/types';

// =====================================================================
// [자동 생성] ${screen.title} — Form Schema
// =====================================================================

${schemaContent}
`;
};

// ─────────────────────────────────────────────────────────────────────
// Handler 파일 생성
// ─────────────────────────────────────────────────────────────────────

export const generateHandlerTs = (screen: ScreenDefinition): string => {
  const actionBlocks = (screen.blocks || []).filter(b => b.type === 'action') as ActionBlock[];
  const allActions = actionBlocks.flatMap(b => b.actions);

  if (allActions.length === 0) {
    return `// API 액션이 정의되지 않았습니다.\nexport {};\n`;
  }

  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;

  const functionBodies = allActions.map(action => {
    const fnName = toCamelCase(action.label.replace(/\s/g, '')) || `action_${action.id.replace(/-/g,'_')}`;
    return `/**
 * ${action.label}
 */
export const ${fnName} = async (data?: any): Promise<any> => {
  const response: any = await apiClient.${action.method.toLowerCase()}('${action.endpoint}', data);
  return response;
};`;
  });

  return `import apiClient from '@/api/apiClient';
// 필요 시 스키마 파일을 import 하세요
// import * as schemas from './${schemaFileName}';

// =====================================================================
// [자동 생성] ${screen.title} — API Handler
// =====================================================================

${functionBodies.join('\n\n')}
`;
};

// ─────────────────────────────────────────────────────────────────────
// Page TSX 생성
// ─────────────────────────────────────────────────────────────────────

const generatePageTsx = (screen: ScreenDefinition): string => {
  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;
  const handlerFileName = `${toCamelCase(screen.screenName)}.handler`;

  const formBlocks = (screen.blocks || []).filter(b => b.type === 'form') as FormBlock[];
  const gridBlocks = (screen.blocks || []).filter(b => b.type === 'grid') as GridBlock[];
  const actionBlocks = (screen.blocks || []).filter(b => b.type === 'action') as ActionBlock[];

  // Form Imports
  const schemaImports = formBlocks.map(f => `${f.formId}Schema, type ${capitalize(f.formId)}Data`).join(', ');
  const schemaImportLine = formBlocks.length > 0 ? `import { ${schemaImports} } from './${schemaFileName}';` : '';

  // Handler Imports
  const allActions = actionBlocks.flatMap(b => b.actions);
  const actionNames = allActions.map(a => toCamelCase(a.label.replace(/\s/g, '')) || `action_${a.id.replace(/-/g,'_')}`);
  const handlerImportLine = actionNames.length > 0 ? `import { ${actionNames.join(', ')} } from './${handlerFileName}';` : '';

  // State Declarations for Grids
  const gridStates = gridBlocks.map(g => {
    const interfaceFields = g.gridColumns.map(c => `  ${c.fieldName}: ${fieldTypeToTs(c.type)};`).join('\n');
    return `  // ${g.title} (${g.gridId}) State
  const [data_${g.gridId}, setData_${g.gridId}] = useState<any[]>([]);
  const [selectedIds_${g.gridId}, setSelectedIds_${g.gridId}] = useState<string[]>([]);
`;
  }).join('\n');

  // Block Rendering
  const blockJsx = (screen.blocks || []).map(block => {
    const theme = block.theme || 'dark';
    const themeClass = theme === 'light' ? 'builder-theme-light' : 'builder-theme-dark';
    const borderColor = theme === 'light' ? '#cbd5e1' : '#334155';
    const titleColor = theme === 'light' ? '#1e293b' : '#e2e8f0';
    const baseStyle = `width: '${block.width}', padding: '16px', boxSizing: 'border-box', border: '1px solid ${borderColor}', borderRadius: '8px', marginBottom: '16px'`;

    if (block.type === 'form') {
      const fb = block as FormBlock;
      const defaultBg = theme === 'light' ? '#ffffff' : '#0f172a';
      const bgColor = fb.backgroundColor || defaultBg;
      return `      <div style={{ ${baseStyle}, backgroundColor: '${bgColor}' }} className="builder-styled-block ${themeClass}">
        ${fb.title ? `<h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '${titleColor}', marginBottom: '16px' }}>${fb.title}</h3>` : ''}
        <AutoForm
          schema={${fb.formId}Schema}
          onSubmit={async (data) => { console.log('${fb.formId} submit', data); }}
          columns={${fb.columns || 1}}
        />
      </div>`;
    }

    if (block.type === 'grid') {
      const gb = block as GridBlock;
      const defaultBg = theme === 'light' ? '#f8fafc' : '#1e293b';
      const headers = gb.gridColumns.map(c => `                <th>${c.label}</th>`).join('\n');
      const cells = gb.gridColumns.map(c => `                <td>{item.${c.fieldName}}</td>`).join('\n');
      return `      <div style={{ ${baseStyle}, backgroundColor: '${defaultBg}' }} className="builder-styled-block ${themeClass}">
        ${gb.title ? `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '${titleColor}' }}>${gb.title}</h3></div>` : ''}
        <div style={{ overflowX: 'auto', border: '1px solid ${borderColor}', borderRadius: '6px' }}>
          <table className="data-table builder-styled-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input type="checkbox" />
                </th>
${headers}
              </tr>
            </thead>
            <tbody>
              {data_${gb.gridId}.length === 0 ? (
                <tr><td colSpan={${gb.gridColumns.length + 1}} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>조회된 데이터가 없습니다.</td></tr>
              ) : (
                data_${gb.gridId}.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
${cells}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>`;
    }

    if (block.type === 'action') {
      const ab = block as ActionBlock;
      const align = ab.align || 'flex-end';
      const buttons = ab.actions.map(a => {
        const btnStyle = `width: '${a.width || 'auto'}', height: '${a.height || '36px'}'`;
        const actionFn = toCamelCase(a.label.replace(/\s/g, '')) || `action_${a.id.replace(/-/g,'_')}`;
        return `          <button type="button" className="btn btn-primary builder-styled-btn" style={{ ${btnStyle} }} onClick={() => ${actionFn}()}>${a.label}</button>`;
      }).join('\n');
      return `      <div style={{ width: '${block.width}', padding: '8px', boxSizing: 'border-box', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: '${align}' }}>
${buttons}
      </div>`;
    }

    return null;
  }).join('\n');

  const componentName = screen.screenName.charAt(0).toUpperCase() + screen.screenName.slice(1);

  return `import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
${formBlocks.length > 0 ? `import AutoForm from '@/common/components/AutoForm';` : ''}
${schemaImportLine}
${handlerImportLine}

// =====================================================================
// [자동 생성] ${screen.title}
// 생성일: ${new Date().toISOString()}
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

const ${componentName}: React.FC = () => {
  const navigate = useNavigate();

${gridStates}

  return (
    <div className="container p_main">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>${screen.title}</h2>
        ${screen.description ? `<p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>${screen.description}</p>` : ''}
      </div>

      {/* Block Layout Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', margin: '-8px' }}>
${blockJsx}
      </div>
    </div>
  );
};

export default ${componentName};

// @everportal-screen-definition: ${JSON.stringify(screen)}
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

  return {
    pageTsx: generatePageTsx(screen),
    schemaTts: generateSchemaTs(screen),
    handlerTs: generateHandlerTs(screen),
    filePaths: {
      page: `${basePath}/${pageFileName}`,
      schema: `${basePath}/${schemaFileName}`,
      handler: `${basePath}/${handlerFileName}`,
    },
  };
};
