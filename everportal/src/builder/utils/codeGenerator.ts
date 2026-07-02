// =====================================================================
// Visual Screen Builder — Code Generator (Block-based)
// ScreenDefinition JSON → TSX / Schema.ts / Handler.ts 자동 생성
// =====================================================================

import type { ScreenDefinition, FieldDefinition, GeneratedCode, FormBlock, GridBlock, ActionBlock } from '../types/screenDefinition';

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
  const actualType = field.type === 'input' ? (field.inputType || 'text') : field.type;
  props.push(`label: '${field.label}'`);
  props.push(`type: '${actualType}'`);
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
    
    const formFields = (form.fields || []).filter(f => ['input', 'textarea', 'select', 'radio', 'checkbox', 'hidden'].includes(f.type));
    
    const interfaceFields = formFields.map(f => `  ${f.fieldName}${f.required ? '' : '?'}: ${fieldTypeToTs(f.type === 'input' ? (f.inputType || 'text') : f.type)};`).join('\n');
    const schemaFields = formFields.map(f => `  ${f.fieldName}: { ${buildSchemaProps(f)} },`).join('\n');

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

export const getActionFunctionName = (action: ApiAction): string => {
  if (action.customScript) {
    const match = action.customScript.match(/export\s+const\s+(\w+)\s*=/);
    if (match && match[1]) {
      return match[1];
    }
  }
  return action.actionName || toCamelCase(action.label.replace(/\s/g, '')) || `action_${action.id.replace(/-/g,'_')}`;
};

export const generateHandlerTs = (screen: ScreenDefinition): string => {
  const actionBlocks = (screen.blocks || []).filter(b => b.type === 'action') as ActionBlock[];
  const allActions = actionBlocks.flatMap(b => b.actions);

  if (allActions.length === 0) {
    return `// API 액션이 정의되지 않았습니다.\nexport {};\n`;
  }

  const schemaFileName = `${toCamelCase(screen.screenName)}.schema`;

  const functionBodies = allActions.map(action => {
    if (action.customScript) {
      return `/**
 * ${action.label}
 */
${action.customScript}`;
    }

    const fnName = getActionFunctionName(action);
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

  // Get screen-level theme colors
  const screenTheme = screen.screenTheme || 'business-dark';
  const isLight = ['business-light', 'navy-modern', 'emerald-clean'].includes(screenTheme);

  const getThemeColors = (themeName: string) => {
    switch (themeName) {
      case 'business-light':
        return {
          screenBg: '#f8fafc',
          blockBg: '#ffffff',
          borderColor: '#cbd5e1',
          titleColor: '#0f172a',
          buttonGradient: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'
        };
      case 'navy-modern':
        return {
          screenBg: '#f0f4f8',
          blockBg: '#ffffff',
          borderColor: '#cbd5e1',
          titleColor: '#1e293b',
          buttonGradient: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)'
        };
      case 'emerald-clean':
        return {
          screenBg: '#f4fbf7',
          blockBg: '#ffffff',
          borderColor: '#cbd5e1',
          titleColor: '#064e3b',
          buttonGradient: 'linear-gradient(135deg, #059669, #047857)'
        };
      case 'business-dark':
      default:
        return {
          screenBg: '#0f172a',
          blockBg: '#1e293b',
          borderColor: '#334155',
          titleColor: '#f8fafc',
          buttonGradient: 'linear-gradient(135deg, #6366f1, #4f46e5)'
        };
    }
  };

  const colors = getThemeColors(screenTheme);

  const formBlocks = (screen.blocks || []).filter(b => b.type === 'form') as FormBlock[];
  const gridBlocks = (screen.blocks || []).filter(b => b.type === 'grid') as GridBlock[];
  const actionBlocks = (screen.blocks || []).filter(b => b.type === 'action') as ActionBlock[];

  // Form Imports
  const schemaImports = formBlocks.map(f => `${f.formId}Schema, type ${capitalize(f.formId)}Data`).join(', ');
  const schemaImportLine = formBlocks.length > 0 ? `import { ${schemaImports} } from './${schemaFileName}';` : '';

  // Handler Imports
  const allActions = actionBlocks.flatMap(b => b.actions);
  const actionNames = allActions.map(a => getActionFunctionName(a));
  const handlerImportLine = actionNames.length > 0 ? `import { ${actionNames.join(', ')} } from './${handlerFileName}';` : '';

  // State Declarations for Grids
  const gridStates = gridBlocks.map(g => {
    return `  // ${g.title} (${g.gridId}) State
  const [data_${g.gridId}, setData_${g.gridId}] = useState<any[]>([]);
  const [selectedIds_${g.gridId}, setSelectedIds_${g.gridId}] = useState<string[]>([]);
`;
  }).join('\n');

  // Block Rendering
  const blockJsx = (screen.blocks || []).map(block => {
    const blockTheme = block.theme || (isLight ? 'light' : 'dark');
    const blockThemeClass = blockTheme === 'light' ? 'builder-theme-light' : 'builder-theme-dark';
    const borderColor = block.theme ? (block.theme === 'light' ? '#cbd5e1' : '#334155') : colors.borderColor;
    const titleColor = block.theme ? (block.theme === 'light' ? '#1e293b' : '#e2e8f0') : colors.titleColor;

    const width = block.width || '100%';
    let widthExpr = `'${width}'`;
    if (width.endsWith('%')) {
      const pct = parseFloat(width);
      if (pct < 100) {
        const fraction = pct / 100;
        const subtract = (1 - fraction) * 16;
        widthExpr = `\`calc(${width} - ${subtract.toFixed(2)}px)\``;
      }
    }

    const baseStyle = `width: ${widthExpr}, padding: '16px', boxSizing: 'border-box', border: '1px solid ${borderColor}', borderRadius: '8px', marginBottom: '16px'`;

    if (block.type === 'form') {
      const fb = block as FormBlock;
      const defaultBg = blockTheme === 'light' ? '#ffffff' : '#0f172a';
      const bgColor = fb.backgroundColor || (block.theme ? defaultBg : colors.blockBg);
      return `      <div style={{ ${baseStyle}, backgroundColor: '${bgColor}' }} className="builder-styled-block ${blockThemeClass}">
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
      const defaultBg = blockTheme === 'light' ? '#f8fafc' : '#1e293b';
      const bgColor = gb.backgroundColor || (block.theme ? defaultBg : colors.blockBg);
      
      const visibleCols = (gb.gridColumns || []).filter(c => c.width !== '0' && c.width !== 0);
      const hasMultiHeader = visibleCols.some(c => c.parentHeader);

      let theadHtml = '';
      if (!hasMultiHeader) {
        const headers = visibleCols.map(c => {
          const w = c.width ? (typeof c.width === 'number' ? `${c.width}px` : (c.width.includes('%') || c.width.includes('px') ? c.width : `${c.width}px`)) : 'auto';
          return `                <th style={{ width: '${w}', textAlign: '${c.align || 'center'}' }}>${c.required ? '<span style={{color:"red"}}>*</span> ' : ''}${c.label}</th>`;
        }).join('\n');
        theadHtml = `              <tr>\n                <th style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>\n${headers}\n              </tr>`;
      } else {
        // Multi-header logic
        const topRow: string[] = [];
        const bottomRow: string[] = [];
        let currentParent = '';
        let colSpanCount = 0;

        visibleCols.forEach((c) => {
          if (c.parentHeader) {
            if (c.parentHeader !== currentParent) {
              if (colSpanCount > 0) {
                topRow.push(`                <th colSpan={${colSpanCount}} style={{ textAlign: 'center' }}>${currentParent}</th>`);
              }
              currentParent = c.parentHeader;
              colSpanCount = 1;
            } else {
              colSpanCount++;
            }
            const w = c.width ? (typeof c.width === 'number' ? `${c.width}px` : (c.width.includes('%') || c.width.includes('px') ? c.width : `${c.width}px`)) : 'auto';
            bottomRow.push(`                <th style={{ width: '${w}', textAlign: '${c.align || 'center'}' }}>${c.required ? '<span style={{color:"red"}}>*</span> ' : ''}${c.label}</th>`);
          } else {
            if (colSpanCount > 0) {
              topRow.push(`                <th colSpan={${colSpanCount}} style={{ textAlign: 'center' }}>${currentParent}</th>`);
              colSpanCount = 0;
              currentParent = '';
            }
            const w = c.width ? (typeof c.width === 'number' ? `${c.width}px` : (c.width.includes('%') || c.width.includes('px') ? c.width : `${c.width}px`)) : 'auto';
            topRow.push(`                <th rowSpan={2} style={{ width: '${w}', textAlign: '${c.align || 'center'}' }}>${c.required ? '<span style={{color:"red"}}>*</span> ' : ''}${c.label}</th>`);
          }
        });
        if (colSpanCount > 0) {
          topRow.push(`                <th colSpan={${colSpanCount}} style={{ textAlign: 'center' }}>${currentParent}</th>`);
        }
        theadHtml = `              <tr>\n                <th rowSpan={2} style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>\n${topRow.join('\n')}\n              </tr>\n              <tr>\n${bottomRow.join('\n')}\n              </tr>`;
      }

      const cells = visibleCols.map(c => {
        let content = `item.${c.fieldName}`;
        if (c.gridColumnType === 'number') {
          if (c.useThousandSeparator) {
            content = `new Intl.NumberFormat('en-US', { minimumFractionDigits: ${c.fractionDigits || 0}, maximumFractionDigits: ${c.fractionDigits || 0} }).format(${content} || 0)`;
          } else if (c.fractionDigits) {
            content = `Number(${content} || 0).toFixed(${c.fractionDigits})`;
          }
        } else if (c.gridColumnType === 'textlink') {
          content = `<a href="#" onClick={(e) => { e.preventDefault(); alert('${c.label} 링크 클릭됨: ' + ${content}); }}>{${content}}</a>`;
        } else if (c.gridColumnType === 'search') {
          content = `<span>{${content}} <button style={{border:'none', background:'transparent', cursor:'pointer'}} onClick={() => alert('${c.label} 검색 팝업')}>🔍</button></span>`;
        } else {
          content = `{${content}}`;
        }
        const bg = c.editable ? "backgroundColor: 'rgba(253, 224, 71, 0.1)'" : '';
        const styleStr = `textAlign: '${c.align || 'center'}'${bg ? ', ' + bg : ''}`;
        return `                <td style={{ ${styleStr} }}>${content}</td>`;
      }).join('\n');

      return `      <div style={{ ${baseStyle}, backgroundColor: '${bgColor}' }} className="builder-styled-block ${blockThemeClass}">
        ${gb.title ? `<div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '${titleColor}' }}>${gb.title}</h3></div>` : ''}
        <div style={{ overflowX: 'auto', border: '1px solid ${borderColor}', borderRadius: '6px' }}>
          <table className="data-table builder-styled-table">
            <thead>
${theadHtml}
            </thead>
            <tbody>
              {data_${gb.gridId}.length === 0 ? (
                <tr><td colSpan={${visibleCols.length + 1}} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>조회된 데이터가 없습니다.</td></tr>
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
      const buttons = (ab.actions || []).map(a => {
        const btnStyle = `width: '${a.width || 'auto'}', height: '${a.height || '36px'}', background: '${colors.buttonGradient}', border: 'none'`;
        const actionFn = getActionFunctionName(a);
        
        let clickAttr = `onClick={() => ${actionFn}()}`;
        if (a.confirmMessage) {
          const escapedMsg = a.confirmMessage.replace(/'/g, "\\'");
          clickAttr = `onClick={() => { if (window.confirm('${escapedMsg}')) ${actionFn}(); }}`;
        }
        
        return `          <button type="button" className="btn btn-primary builder-styled-btn" style={{ ${btnStyle} }} ${clickAttr}>${a.label}</button>`;
      }).join('\n');
      return `      <div style={{ width: ${widthExpr}, padding: '8px', boxSizing: 'border-box', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: '${align}', marginBottom: '16px' }}>
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
    <div className="container p_main" style={{ minHeight: '100vh', padding: '24px', backgroundColor: '${colors.screenBg}', color: '${colors.titleColor}' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '${colors.titleColor}' }}>${screen.title}</h2>
        ${screen.description ? `<p style={{ color: '${isLight ? '#475569' : '#94a3b8'}', marginTop: '8px' }}>${screen.description}</p>` : ''}
      </div>

      {/* Block Layout Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
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
