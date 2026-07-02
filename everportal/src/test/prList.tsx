import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AutoForm from '@/common/components/AutoForm';
import { mainFormSchema, type MainFormData } from './prList.schema';
import { 조회 } from './prList.handler';

// =====================================================================
// [자동 생성] 구매요청현황
// 생성일: 2026-07-02T05:41:33.515Z
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

const PrList: React.FC = () => {
  const navigate = useNavigate();

  // 새 그리드 (grid_67de) State
  const [data_grid_67de, setData_grid_67de] = useState<any[]>([]);
  const [selectedIds_grid_67de, setSelectedIds_grid_67de] = useState<string[]>([]);


  return (
    <div className="container p_main" style={{ minHeight: '100vh', padding: '24px', backgroundColor: '#f8fafc', color: '#0f172a' }}>
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2 style={{ color: '#0f172a' }}>구매요청현황</h2>
        <p style={{ color: '#475569', marginTop: '8px' }}>구매요청 진행현황</p>
      </div>

      {/* Block Layout Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'flex-start' }}>
      <div style={{ width: '100%', padding: '16px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#f2f2f2' }} className="builder-styled-block builder-theme-light">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px' }}>조회 조건</h3>
        <AutoForm
          schema={mainFormSchema}
          onSubmit={async (data) => { console.log('mainForm submit', data); }}
          columns={3}
        />
      </div>
      <div style={{ width: '100%', padding: '8px', boxSizing: 'border-box', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end', marginBottom: '16px' }}>
          <button type="button" className="btn btn-primary builder-styled-btn" style={{ width: '120px', height: '40px', background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)', border: 'none' }} onClick={() => 조회()}>조회</button>
      </div>
      <div style={{ width: '100%', padding: '16px', boxSizing: 'border-box', border: '1px solid #cbd5e1', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#ffffff' }} className="builder-styled-block builder-theme-light">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0f172a' }}>새 그리드</h3></div>
        <div style={{ overflowX: 'auto', border: '1px solid #cbd5e1', borderRadius: '6px' }}>
          <table className="data-table builder-styled-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}><input type="checkbox" /></th>
                <th style={{ width: '100px', textAlign: 'center' }}>구매요청번호</th>
                <th style={{ width: '100px', textAlign: 'left' }}>구매요청명</th>
                <th style={{ width: '100px', textAlign: 'center' }}>등록자</th>
              </tr>
            </thead>
            <tbody>
              {data_grid_67de.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>조회된 데이터가 없습니다.</td></tr>
              ) : (
                data_grid_67de.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                <td style={{ textAlign: 'center' }}>{item.PR_NUM}</td>
                <td style={{ textAlign: 'left' }}>{item.PR_SUBJECT}</td>
                <td style={{ textAlign: 'center' }}>{item.REG_USER_NM}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    </div>
  );
};

export default PrList;

// @everportal-screen-definition: {"screenId":"5a4daef7-c5cd-4a85-9e41-ae8a28c7357d","screenName":"prList","title":"구매요청현황","description":"구매요청 진행현황","route":"pr","domainPath":"pr","pageType":"list","blocks":[{"id":"a1cb2801-9fed-40f0-8107-652810dbb508","type":"form","formId":"mainForm","title":"조회 조건","width":"100%","columns":3,"fields":[{"id":"85225d96-0787-4187-bde7-c1277e104787","fieldName":"PR_NUM","label":"구매요청번호","type":"input","inputType":"text","required":false,"placeholder":"구매요청번호","maxlength":20},{"id":"fc7fb766-f274-45f5-8575-f0d3d3173461","fieldName":"PR_SUBJECT","label":"구매요청명","type":"input","inputType":"text","required":false,"placeholder":"구매요청명","maxlength":200},{"id":"2448f745-09d6-4ca7-a456-b82bdb45782e","fieldName":"REG_USER_NM","label":"등록자","type":"input","inputType":"text","required":false,"placeholder":"등록자","maxlength":50}],"backgroundColor":"#f2f2f2"},{"id":"0ebc0e48-a075-41ae-b9a4-50b6e3a1827b","type":"action","title":"액션 영역","width":"100%","actions":[{"id":"6fffbdc8-8b43-4fba-8898-6aa30a09e9e0","label":"조회","method":"POST","endpoint":"/pr/doSearch","buttonType":"search","width":"120px","height":"40px","customScript":"export const 조회 = async (data?: any): Promise<any> => {\n  try {\n    // 폼 데이터를 담아 조회 API 호출\n    const response = await apiClient.post('/pr/doSearch', data);\n    \n    // TODO: 아래와 같이 Grid State에 맞게 데이터를 바인딩하세요.\n    // (예: setData_grid_xxxx(response.data || []))\n    \n    return response;\n  } catch (error) {\n    console.error('Search failed:', error);\n    alert('조회 중 에러가 발생했습니다.');\n  }\n};"}]},{"id":"91b1b0d9-1d04-4f38-ba90-f62248a33c71","type":"grid","gridId":"grid_67de","title":"새 그리드","width":"100%","gridColumns":[{"id":"9f75d68e-adc8-4f02-a0a3-4e6a5230049a","fieldName":"PR_NUM","label":"구매요청번호","type":"grid_column","gridColumnType":"text","width":"100","editable":false,"required":false,"align":"center"},{"id":"0cc7232e-016d-45c3-a188-14cde468f691","fieldName":"PR_SUBJECT","label":"구매요청명","type":"grid_column","gridColumnType":"text","width":"100","editable":false,"required":false,"align":"left"},{"id":"a4157852-dfa9-4e69-9b12-62bcbf53e87d","fieldName":"REG_USER_NM","label":"등록자","type":"grid_column","gridColumnType":"text","width":"100","editable":false,"required":false,"align":"center"}]}],"pagination":{"recordCountPerPage":10,"pageSize":10},"updatedAt":"2026-07-02T05:41:31.260Z","screenTheme":"business-light"}
