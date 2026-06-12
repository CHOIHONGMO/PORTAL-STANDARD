import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';

interface Member {
  uniqId: string;
  userId: string;
  userNm: string;
  emailAdres: string;
  areaNo: string;
  middleTelno: string;
  endTelno: string;
  sbscrbDe: string;
  sttus: string;
  userTy: string;
}

const EgovMberManage: React.FC = () => {

  const [memberList, setMemberList] = useState<Member[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search/Filters
  const [sbscrbSttus, setSbscrbSttus] = useState('0'); // 0: All, A: 가입신청, D: 삭제, P: 승인
  const [searchCondition, setSearchCondition] = useState('1'); // 0: ID, 1: Name
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  // Row selection
  const [selectedIds, setSelectedIds] = useState<string[]>([]); // holds userTy:uniqId

  useEffect(() => {
    fetchMemberList(1);
  }, [sbscrbSttus]);

  const fetchMemberList = async (page = 1) => {
    try {
      setLoading(true);
      const url = `/uss/umt/mber/selectMberList.api?pageIndex=${page}&sbscrbSttus=${sbscrbSttus}&searchCondition=${searchCondition}&searchKeyword=${encodeURIComponent(searchKeyword)}`;
      const response: any = await apiClient.get(url);
      if (response.resultCode === 'SUCCESS') {
        setMemberList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
        setPageIndex(page);
        setPagination(response.paginationInfo);
      }
    } catch (error) {
      console.error('회원 목록 조회 실패', error);
    } finally {
      setLoading(false);
      setSelectedIds([]); // reset selection
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMemberList(1);
  };

  // Row selection handlers
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const allRowIds = memberList.map(item => `${item.userTy}:${item.uniqId}`);
      setSelectedIds(allRowIds);
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (e: React.ChangeEvent<HTMLInputElement>, idKey: string) => {
    if (e.target.checked) {
      setSelectedIds(prev => [...prev, idKey]);
    } else {
      setSelectedIds(prev => prev.filter(id => id !== idKey));
    }
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) {
      alert('삭제할 회원을 선택하세요.');
      return;
    }

    if (window.confirm('선택된 회원을 삭제하시겠습니까?')) {
      try {
        const checkedIdForDel = selectedIds.join(',');
        const response: any = await apiClient.post('/uss/umt/mber/deleteMber.api', { checkedIdForDel });
        if (response.resultCode === 'SUCCESS') {
          alert('성공적으로 삭제되었습니다.');
          fetchMemberList(pageIndex);
        } else {
          alert(response.resultMessage || '삭제 실패');
        }
      } catch (error) {
        console.error('회원 삭제 에러', error);
        alert('삭제 중 에러가 발생했습니다.');
      }
    }
  };

  const getStatusName = (status: string) => {
    switch (status) {
      case 'A': return '가입신청';
      case 'D': return '삭제';
      case 'P': return '승인';
      default: return status;
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>회원관리</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>포털에 가입한 일반 회원들의 정보와 가입 상태를 관리합니다.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="condition" style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <select
            className="form-input"
            value={sbscrbSttus}
            onChange={(e) => setSbscrbSttus(e.target.value)}
            style={{ width: '130px', minWidth: '130px' }}
          >
            <option value="0">상태(전체)</option>
            <option value="A">가입신청</option>
            <option value="D">삭제</option>
            <option value="P">승인</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <select
            className="form-input"
            value={searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
            style={{ width: '130px', minWidth: '130px' }}
          >
            <option value="0">ID</option>
            <option value="1">이름</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            className="form-input"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            placeholder="검색어를 입력해 주세요"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-search" style={{ cursor: 'pointer', minWidth: '80px' }}>조회</button>
        </div>
      </form>

      {/* Utils and List Actions */}
      <div className="list-utils" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="total-count" style={{ fontSize: '0.95rem' }}>
          사용자수 : <strong>{totalCount}</strong>명
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handleDelete}
            className="btn-secondary"
            style={{ color: '#dc2626', borderColor: '#fca5a5', cursor: 'pointer' }}
          >
            선택삭제
          </button>
          <Link
            to="/admin/member/new"
            className="btn-submit"
            style={{ width: 'auto', padding: '10px 20px', marginTop: 0, cursor: 'pointer' }}
          >
            등록
          </Link>
        </div>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <colgroup>
            <col width="6%" />
            <col width="6%" />
            <col width="15%" />
            <col width="15%" />
            <col width="23%" />
            <col width="15%" />
            <col width="12%" />
            <col width="8%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>No.</th>
              <th style={{ textAlign: 'center' }}>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={memberList.length > 0 && selectedIds.length === memberList.length}
                />
              </th>
              <th>아이디</th>
              <th>사용자이름</th>
              <th>사용자이메일</th>
              <th>전화번호</th>
              <th>등록일</th>
              <th style={{ textAlign: 'center' }}>가입상태</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>데이터를 조회 중입니다...</td>
              </tr>
            ) : memberList.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>가입된 회원 정보가 없습니다.</td>
              </tr>
            ) : (
              memberList.map((item, idx) => {
                const idKey = `${item.userTy}:${item.uniqId}`;
                return (
                  <tr key={item.uniqId}>
                    <td style={{ textAlign: 'center' }}>{(pageIndex - 1) * 10 + idx + 1}</td>
                    <td style={{ textAlign: 'center' }}>
                      <input
                        type="checkbox"
                        checked={selectedIds.includes(idKey)}
                        onChange={(e) => handleSelectRow(e, idKey)}
                      />
                    </td>
                    <td>
                      <Link to={`/admin/member/${item.uniqId}`} style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                        {item.userId}
                      </Link>
                    </td>
                    <td>{item.userNm}</td>
                    <td>{item.emailAdres}</td>
                    <td>{item.areaNo ? `${item.areaNo})${item.middleTelno}-${item.endTelno}` : ''}</td>
                    <td>{item.sbscrbDe}</td>
                    <td style={{ textAlign: 'center' }}>
                      <span style={{
                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                        backgroundColor: item.sttus === 'P' ? '#ecfdf5' : item.sttus === 'A' ? '#eff6ff' : '#f3f4f6',
                        color: item.sttus === 'P' ? '#059669' : item.sttus === 'A' ? '#2563eb' : '#4b5563'
                      }}>
                        {getStatusName(item.sttus)}
                      </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalRecordCount > pagination.recordCountPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <button
            disabled={pageIndex === 1}
            onClick={() => fetchMemberList(pageIndex - 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            이전
          </button>
          <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>{pageIndex} / {Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}</span>
          <button
            disabled={pageIndex >= Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}
            onClick={() => fetchMemberList(pageIndex + 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default EgovMberManage;
