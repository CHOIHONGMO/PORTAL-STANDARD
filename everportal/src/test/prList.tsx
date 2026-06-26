import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AutoForm from '@/common/components/AutoForm';
import { mainFormSchema, type MainFormData } from './prList.schema';
import { 조회 } from './prList.handler';

// =====================================================================
// [자동 생성] 구매요청현황
// 생성일: 2026-06-26T09:04:53.176Z
// ⚠ 이 파일은 Visual Screen Builder에서 자동 생성되었습니다.
// =====================================================================

const PrList: React.FC = () => {
  const navigate = useNavigate();

  // 요청현황 (grid) State
  const [data_grid, setData_grid] = useState<any[]>([]);
  const [selectedIds_grid, setSelectedIds_grid] = useState<string[]>([]);


  return (
    <div className="container p_main">
      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>구매요청현황</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>구매요청 진행현황</p>
      </div>

      {/* Block Layout Container */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', margin: '-8px' }}>
      <div style={{ width: '100%', padding: '16px', boxSizing: 'border-box', border: '1px solid #334155', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#f2f2f2' }} className="builder-styled-block builder-theme-dark">
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0', marginBottom: '16px' }}>조회 조건</h3>
        <AutoForm
          schema={mainFormSchema}
          onSubmit={async (data) => { console.log('mainForm submit', data); }}
          columns={3}
        />
      </div>
      <div style={{ width: '100%', padding: '8px', boxSizing: 'border-box', display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button type="button" className="btn btn-primary builder-styled-btn" style={{ width: '120px', height: '40px' }} onClick={() => 조회()}>조회</button>
      </div>
      <div style={{ width: '100%', padding: '16px', boxSizing: 'border-box', border: '1px solid #334155', borderRadius: '8px', marginBottom: '16px', backgroundColor: '#1e293b' }} className="builder-styled-block builder-theme-dark">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}><h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#e2e8f0' }}>요청현황</h3></div>
        <div style={{ overflowX: 'auto', border: '1px solid #334155', borderRadius: '6px' }}>
          <table className="data-table builder-styled-table">
            <thead>
              <tr>
                <th style={{ width: '40px', textAlign: 'center' }}>
                  <input type="checkbox" />
                </th>
                <th>구매요청번호</th>
                <th>구매요청명</th>
                <th>등록자</th>
              </tr>
            </thead>
            <tbody>
              {data_grid.length === 0 ? (
                <tr><td colSpan={4} style={{ textAlign: 'center', padding: '20px', color: '#94a3b8' }}>조회된 데이터가 없습니다.</td></tr>
              ) : (
                data_grid.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
                <td>{item.pr_num}</td>
                <td>{item.pr_subject}</td>
                <td>{item.reg_user_nm}</td>
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

// @everportal-screen-definition: {"screenId":"5a4daef7-c5cd-4a85-9e41-ae8a28c7357d","screenName":"prList","title":"구매요청현황","description":"구매요청 진행현황","route":"pr","domainPath":"pr","pageType":"list","blocks":[{"id":"a1cb2801-9fed-40f0-8107-652810dbb508","type":"form","formId":"mainForm","title":"조회 조건","width":"100%","columns":3,"fields":[{"id":"6e2c9694-e0f0-4a04-9111-ec8d7e998d1a","fieldName":"pr_num","label":"구매요청번호","type":"text","required":false,"placeholder":"구매요청번호","maxlength":10},{"id":"eb0dc924-e78f-4a7e-98c5-9ca947b25a75","fieldName":"pr_subject","label":"구매요청명","type":"text","required":false,"placeholder":"구매요청명","maxlength":50},{"id":"f4ebeafc-8238-42ca-bdf9-33cecbb4d57b","fieldName":"reg_user_nm","label":"등록자","type":"text","required":false,"placeholder":"등록자명","maxlength":50}],"backgroundColor":"#f2f2f2"},{"id":"0ebc0e48-a075-41ae-b9a4-50b6e3a1827b","type":"action","title":"액션 영역","width":"100%","actions":[{"id":"6fffbdc8-8b43-4fba-8898-6aa30a09e9e0","label":"조회","method":"POST","endpoint":"/api/pr/doSearch","buttonType":"search","width":"120px","height":"40px"}]},{"id":"5fa2ddb5-add3-4e2d-9005-cdb396ca88e2","type":"grid","gridId":"grid","title":"요청현황","width":"100%","gridColumns":[{"id":"337d62db-000a-4035-a83c-4cc52a73ad85","fieldName":"pr_num","label":"구매요청번호","type":"text","required":false,"maxlength":20},{"id":"bd6f31fa-f8a2-4a4c-a662-c72949ed8858","fieldName":"pr_subject","label":"구매요청명","type":"text","required":false,"maxlength":50},{"id":"81fcd1a2-5105-4ae2-b39c-3d1e7f79cc31","fieldName":"reg_user_nm","label":"등록자","type":"text","required":false,"maxlength":50}]}],"pagination":{"recordCountPerPage":10,"pageSize":10},"updatedAt":"2026-06-26T09:04:45.392Z"}
