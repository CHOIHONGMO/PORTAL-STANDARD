import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';

interface BoardUseInfo {
  bbsId: string;
  bbsNm: string;
  trgetId: string;
  trgetNm: string;
  frstRegisterPnttm: string;
  useAt: string;
}

const EgovBoardUseInfList: React.FC = () => {
  const [resultList, setResultList] = useState<BoardUseInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  // Search/Filters
  const [searchCnd, setSearchCnd] = useState('0'); // 0: BBS Name, 1: Target System
  const [searchWrd, setSearchWrd] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [pagination, setPagination] = useState<any>(null);

  useEffect(() => {
    fetchList(1);
  }, []);

  const fetchList = async (page = 1) => {
    try {
      setLoading(true);
      const url = `/cop/com/selectBBSUseInfs.api?pageIndex=${page}&searchCnd=${searchCnd}&searchWrd=${encodeURIComponent(searchWrd)}`;
      const response: any = await apiClient.get(url);
      if (response.resultCode === 'SUCCESS') {
        setResultList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
        setPageIndex(page);
        setPagination(response.paginationInfo);
      }
    } catch (error) {
      console.error('사용정보 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchList(1);
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>게시판 사용관리</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>생성된 게시판이 포털 시스템, 동호회, 커뮤니티 등 어떤 대상에서 사용되는지 매핑을 관리합니다.</p>
      </div>

      {/* Search Bar */}
      <form onSubmit={handleSearch} className="condition" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '24px', padding: '20px', borderRadius: 'var(--radius-md)' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <select
            className="form-input"
            value={searchCnd}
            onChange={(e) => setSearchCnd(e.target.value)}
            style={{ width: '130px', minWidth: '130px' }}
          >
            <option value="0">게시판명</option>
            <option value="1">사용대상</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '8px', flex: 1, minWidth: '280px' }}>
          <input
            type="text"
            className="form-input"
            value={searchWrd}
            onChange={(e) => setSearchWrd(e.target.value)}
            placeholder="검색어를 입력해 주세요"
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-search" style={{ cursor: 'pointer', minWidth: '80px' }}>조회</button>
        </div>
      </form>

      {/* Utils and List Actions */}
      <div className="list-utils" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div className="total-count" style={{ fontSize: '0.95rem' }}>
          사용 정보 개수 : <strong>{totalCount}</strong>개
        </div>
        <Link
          to="/admin/usage/new"
          className="btn-submit"
          style={{ width: 'auto', padding: '10px 20px', marginTop: 0, cursor: 'pointer' }}
        >
          등록
        </Link>
      </div>

      {/* Data Table */}
      <div style={{ overflowX: 'auto' }}>
        <table className="data-table">
          <colgroup>
            <col width="10%" />
            <col width="*" />
            <col width="25%" />
            <col width="20%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th style={{ textAlign: 'center' }}>번호</th>
              <th>게시판명</th>
              <th>사용대상</th>
              <th>등록일</th>
              <th style={{ textAlign: 'center' }}>사용여부</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>데이터를 조회 중입니다...</td>
              </tr>
            ) : resultList.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>등록된 사용 정보가 없습니다.</td>
              </tr>
            ) : (
              resultList.map((item, idx) => (
                <tr key={`${item.bbsId}-${item.trgetId}`}>
                  <td style={{ textAlign: 'center' }}>{(pageIndex - 1) * 10 + idx + 1}</td>
                  <td>
                    <Link to={`/admin/usage/${item.bbsId}/${item.trgetId}`} style={{ color: 'var(--primary-color)', fontWeight: 600 }}>
                      {item.bbsNm}
                    </Link>
                  </td>
                  <td>{item.trgetNm || item.trgetId}</td>
                  <td>{item.frstRegisterPnttm}</td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 600,
                      backgroundColor: item.useAt === 'Y' ? '#ecfdf5' : '#fee2e2',
                      color: item.useAt === 'Y' ? '#059669' : '#dc2626'
                    }}>
                      {item.useAt === 'Y' ? '사용' : '미사용'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.totalRecordCount > pagination.recordCountPerPage && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
          <button
            disabled={pageIndex === 1}
            onClick={() => fetchList(pageIndex - 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            이전
          </button>
          <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>{pageIndex} / {Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}</span>
          <button
            disabled={pageIndex >= Math.ceil(pagination.totalRecordCount / pagination.recordCountPerPage)}
            onClick={() => fetchList(pageIndex + 1)}
            style={{ padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
          >
            다음
          </button>
        </div>
      )}
    </div>
  );
};

export default EgovBoardUseInfList;
