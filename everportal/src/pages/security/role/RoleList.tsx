import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';

interface Role {
  roleCode: string;
  roleNm: string;
  roleDc: string;
  roleSort: string;
  roleCreatDe: string;
}

const RoleList: React.FC = () => {
  const [list, setList] = useState<Role[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  useEffect(() => { fetchList(1); }, []);

  const fetchList = async (page = 1) => {
    try {
      setLoading(true);
      const res: any = await apiClient.get(
        `/security/role/selectRoleList.api?pageIndex=${page}&searchKeyword=${encodeURIComponent(searchKeyword)}`
      );
      if (res.resultCode === 'SUCCESS') {
        setList(res.resultList || []);
        setTotalCount(res.totalCount || 0);
        setPageIndex(page);
        setPagination(res.paginationInfo);
      }
    } catch (e) {
      console.error('롤 목록 조회 실패', e);
    } finally {
      setLoading(false);
      setSelectedCodes([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); fetchList(1); };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCodes(e.target.checked ? list.map(r => r.roleCode) : []);
  };
  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, code: string) => {
    setSelectedCodes(prev => e.target.checked ? [...prev, code] : prev.filter(c => c !== code));
  };

  const handleDelete = async () => {
    if (selectedCodes.length === 0) { alert('삭제할 롤을 선택하세요.'); return; }
    if (!window.confirm('선택된 롤을 삭제하시겠습니까?')) return;
    try {
      const res: any = await apiClient.post('/security/role/deleteRoleList.api', { checkedIdForDel: selectedCodes.join(',') });
      if (res.resultCode === 'SUCCESS') { alert('삭제되었습니다.'); fetchList(pageIndex); }
      else alert(res.resultMessage || '삭제 실패');
    } catch (e) { console.error(e); alert('삭제 중 오류가 발생했습니다.'); }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>롤 관리</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>시스템 접근 제어를 위한 롤(Role)을 등록하고 관리합니다.</p>
      </div>

      <form onSubmit={handleSearch} className="condition" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
          <input type="text" className="form-input" value={searchKeyword} onChange={e => setSearchKeyword(e.target.value)} placeholder="롤명 검색" style={{ flex: 1 }} />
          <button type="submit" className="btn-search" style={{ cursor: 'pointer', minWidth: '80px' }}>조회</button>
        </div>
      </form>

      <div className="list-utils" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.95rem' }}>총 <strong>{totalCount}</strong>건</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleDelete} className="btn-secondary" style={{ color: '#dc2626', borderColor: '#fca5a5', cursor: 'pointer' }}>선택삭제</button>
          <Link to="/admin/role/new" className="btn-submit" style={{ width: 'auto', padding: '10px 20px', marginTop: 0 }}>등록</Link>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <colgroup>
            <col width="5%" /><col width="5%" /><col width="20%" /><col width="25%" /><col width="35%" /><col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'center' }}>
                <input type="checkbox" onChange={handleSelectAll} checked={list.length > 0 && selectedCodes.length === list.length} />
              </th>
              <th>롤코드</th>
              <th>롤명</th>
              <th>설명</th>
              <th>정렬순서</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>조회 중...</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>등록된 롤이 없습니다.</td></tr>
            ) : list.map((item, idx) => (
              <tr key={item.roleCode}>
                <td style={{ textAlign: 'center' }}>{(pageIndex - 1) * 10 + idx + 1}</td>
                <td style={{ textAlign: 'center' }}>
                  <input type="checkbox" checked={selectedCodes.includes(item.roleCode)} onChange={e => handleSelectRow(e, item.roleCode)} />
                </td>
                <td>
                  <Link to={`/admin/role/${item.roleCode}`} style={{ color: 'var(--primary-color)', fontWeight: 600 }}>{item.roleCode}</Link>
                </td>
                <td>{item.roleNm}</td>
                <td>{item.roleDc}</td>
                <td style={{ textAlign: 'center' }}>{item.roleSort}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pagination && pagination.totalRecordCount > pagination.recordCountPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <button disabled={pageIndex === 1} onClick={() => fetchList(pageIndex - 1)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}>이전</button>
          <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>{pageIndex} / {Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}</span>
          <button disabled={pageIndex >= Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)} onClick={() => fetchList(pageIndex + 1)} style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}>다음</button>
        </div>
      )}
    </div>
  );
};

export default RoleList;
