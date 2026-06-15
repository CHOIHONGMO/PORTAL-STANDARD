import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

interface Author {
  authorCode: string;
  authorNm: string;
}

interface UserAuthorMapping {
  uniqId: string;
  userId: string;
  userNm: string;
  mberTyCode: string;
  mberTyNm: string;
  authorCode: string;
  regYn: string;
}

const AuthorGroupList: React.FC = () => {
  const [list, setList] = useState<UserAuthorMapping[]>([]);
  const [authorList, setAuthorList] = useState<Author[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  
  // Search conditions
  const [searchCondition, setSearchCondition] = useState('1'); // '1' = ID, '2' = Name, '3' = Group ID
  const [searchKeyword, setSearchKeyword] = useState('');
  
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  
  const [selectedUniqIds, setSelectedUniqIds] = useState<string[]>([]);
  
  // Local changes to dropdown selection, mapped by user's uniqId
  const [localAuthorCodes, setLocalAuthorCodes] = useState<Record<string, string>>({});

  useEffect(() => {
    fetchAuthorities();
    fetchList(1);
  }, []);

  const fetchAuthorities = async () => {
    try {
      const res: any = await apiClient.get('/security/author/selectAuthorAllList.api');
      if (res.resultCode === 'SUCCESS') {
        setAuthorList(res.resultList || []);
      }
    } catch (e) {
      console.error('권한 목록 조회 실패', e);
    }
  };

  const fetchList = async (page = 1) => {
    try {
      setLoading(true);
      const res: any = await apiClient.get(
        `/security/authorGroup/selectAuthorGroupList.api?pageIndex=${page}&searchCondition=${searchCondition}&searchKeyword=${encodeURIComponent(searchKeyword)}`
      );
      if (res.resultCode === 'SUCCESS') {
        const mappings: UserAuthorMapping[] = res.resultList || [];
        setList(mappings);
        setTotalCount(res.totalCount || 0);
        setPageIndex(page);
        setPagination(res.paginationInfo);

        // Initialize local changes mapping from database values
        const initialCodes: Record<string, string> = {};
        mappings.forEach(item => {
          initialCodes[item.uniqId] = item.authorCode || '';
        });
        setLocalAuthorCodes(initialCodes);
      }
    } catch (e) {
      console.error('사용자 권한 목록 조회 실패', e);
    } finally {
      setLoading(false);
      setSelectedUniqIds([]);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchList(1);
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedUniqIds(e.target.checked ? list.map(item => item.uniqId) : []);
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, uniqId: string) => {
    setSelectedUniqIds(prev => e.target.checked ? [...prev, uniqId] : prev.filter(id => id !== uniqId));
  };

  const handleLocalAuthorChange = (uniqId: string, authorCode: string) => {
    setLocalAuthorCodes(prev => ({
      ...prev,
      [uniqId]: authorCode
    }));
  };

  const handleSave = async () => {
    if (selectedUniqIds.length === 0) {
      alert('권한을 등록할 사용자를 선택하세요.');
      return;
    }

    if (!window.confirm('선택된 사용자들의 권한 매핑 정보를 저장하시겠습니까?')) return;

    try {
      const selectedUsers = list.filter(item => selectedUniqIds.includes(item.uniqId));
      
      const userIds = selectedUsers.map(item => item.uniqId).join(',');
      const authorCodes = selectedUsers.map(item => localAuthorCodes[item.uniqId] || '').join(',');
      const regYns = selectedUsers.map(item => item.regYn).join(',');
      const mberTyCodes = selectedUsers.map(item => item.mberTyCode).join(',');

      const res: any = await apiClient.post('/security/authorGroup/insertAuthorGroup.api', {
        userIds,
        authorCodes,
        regYns,
        mberTyCodes
      });

      if (res.resultCode === 'SUCCESS') {
        alert('저장되었습니다.');
        fetchList(pageIndex);
      } else {
        alert(res.resultMessage || '저장 실패');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했습니다.');
    }
  };

  const handleDelete = async () => {
    if (selectedUniqIds.length === 0) {
      alert('권한 매핑을 해제할 사용자를 선택하세요.');
      return;
    }

    const selectedUsers = list.filter(item => selectedUniqIds.includes(item.uniqId));
    const registeredCount = selectedUsers.filter(item => item.regYn === 'Y').length;

    if (registeredCount === 0) {
      alert('선택된 사용자 중 등록된 권한이 있는 사용자가 없습니다.');
      return;
    }

    if (!window.confirm('선택된 사용자들의 권한 할당을 해제하시겠습니까?')) return;

    try {
      const checkedIdForDel = selectedUsers.map(item => item.uniqId).join(',');
      const res: any = await apiClient.post('/security/authorGroup/deleteAuthorGroupList.api', {
        checkedIdForDel
      });

      if (res.resultCode === 'SUCCESS') {
        alert('해제되었습니다.');
        fetchList(pageIndex);
      } else {
        alert(res.resultMessage || '해제 실패');
      }
    } catch (e) {
      console.error(e);
      alert('해제 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>사용자별 권한 관리</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>포털시스템의 사용자에게 접근 권한을 매핑하고 설정 상태를 관리합니다.</p>
      </div>

      <form onSubmit={handleSearch} className="condition" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
          <select 
            className="form-input" 
            value={searchCondition} 
            onChange={e => { setSearchCondition(e.target.value); setSearchKeyword(''); }} 
            style={{ width: '150px', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', backgroundColor: 'white' }}
          >
            <option value="1">사용자 ID</option>
            <option value="2">사용자 명</option>
            <option value="3">그룹 ID</option>
          </select>
          <input 
            type="text" 
            className="form-input" 
            value={searchKeyword} 
            onChange={e => setSearchKeyword(e.target.value)} 
            placeholder={searchCondition === '3' ? "그룹 ID 정확히 입력" : "검색어 입력"} 
            style={{ flex: 1 }} 
          />
          <button type="submit" className="btn-search" style={{ cursor: 'pointer', minWidth: '80px' }}>조회</button>
        </div>
      </form>

      <div className="list-utils" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div style={{ fontSize: '0.95rem' }}>총 <strong>{totalCount}</strong>건</div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button onClick={handleDelete} className="btn-secondary" style={{ color: '#dc2626', borderColor: '#fca5a5', cursor: 'pointer' }}>등록취소</button>
          <button onClick={handleSave} className="btn-submit" style={{ width: 'auto', padding: '10px 20px', marginTop: 0, cursor: 'pointer' }}>권한등록</button>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <colgroup>
            <col width="5%" /><col width="5%" /><col width="20%" /><col width="20%" /><col width="15%" /><col width="25%" /><col width="10%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'center' }}>
                <input type="checkbox" onChange={handleSelectAll} checked={list.length > 0 && selectedUniqIds.length === list.length} />
              </th>
              <th>사용자ID</th>
              <th>사용자명</th>
              <th>사용자 유형</th>
              <th>권한</th>
              <th style={{ textAlign: 'center' }}>등록여부</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>조회 중...</td></tr>
            ) : list.length === 0 ? (
              <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>등록된 사용자가 없습니다.</td></tr>
            ) : list.map((item, idx) => (
              <tr key={item.uniqId}>
                <td style={{ textAlign: 'center' }}>{(pageIndex - 1) * 10 + idx + 1}</td>
                <td style={{ textAlign: 'center' }}>
                  <input type="checkbox" checked={selectedUniqIds.includes(item.uniqId)} onChange={e => handleSelectRow(e, item.uniqId)} />
                </td>
                <td style={{ fontWeight: 600 }}>{item.userId}</td>
                <td>{item.userNm}</td>
                <td>{item.mberTyNm}</td>
                <td>
                  <select 
                    value={localAuthorCodes[item.uniqId] || ''} 
                    onChange={e => handleLocalAuthorChange(item.uniqId, e.target.value)}
                    style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', width: '100%', maxWidth: '240px', backgroundColor: 'white' }}
                  >
                    <option value="">-- 권한 선택 --</option>
                    {authorList.map(auth => (
                      <option key={auth.authorCode} value={auth.authorCode}>{auth.authorNm}</option>
                    ))}
                  </select>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ 
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '10px',
                    fontSize: '0.85rem',
                    fontWeight: 600,
                    backgroundColor: item.regYn === 'Y' ? '#dcfce7' : '#fee2e2',
                    color: item.regYn === 'Y' ? '#166534' : '#991b1b'
                  }}>
                    {item.regYn === 'Y' ? '등록' : '미등록'}
                  </span>
                </td>
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

export default AuthorGroupList;
