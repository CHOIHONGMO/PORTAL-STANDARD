import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface PolicyInfo {
  indvdlInfoId: string;
  indvdlInfoNm: string;
  indvdlInfoYn: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const IndvdlInfoPolicyList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<PolicyInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchPolicyList();
  }, [pageIndex]);

  const fetchPolicyList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      if (searchCondition) params.append('searchCondition', searchCondition);
      if (searchKeyword) params.append('searchKeyword', searchKeyword);

      const response: any = await apiClient.get(`/user/policy/ipm/selectIndvdlInfoPolicyList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('개인정보보호정책 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchPolicyList();
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>개인정보보호정책 관리</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건
        </div>
        <div className="search-box">
          <select 
            className="form-input" 
            style={{ width: '180px', marginRight: '8px' }}
            value={searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="INDVDL_INFO_POLICY_NM">개인정보보호정책명</option>
            <option value="INDVDL_INFO_POLICY_CN">개인정보보호정책설명</option>
          </select>
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색어 입력" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <button className="btn-search" onClick={handleSearch}>검색</button>
        </div>
      </div>

      <table className="data-table">
        <colgroup>
          <col width="8%" />
          <col width="15%" />
          <col width="*" />
          <col width="15%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>동의여부</th>
            <th>개인정보보호정책명</th>
            <th>등록자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.indvdlInfoId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td>{item.indvdlInfoYn === 'Y' ? '예' : '아니오'}</td>
                <td style={{ textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span>{item.indvdlInfoNm}</span>
                    <Link to={`/admin/policy/${item.indvdlInfoId}`} className="btn btn_blue_30" style={{ padding: '4px 10px', fontSize: '0.85rem' }}>상세보기</Link>
                  </div>
                </td>
                <td>{item.frstRegisterNm}</td>
                <td>{item.frstRegistPnttm ? item.frstRegistPnttm.substring(0, 10) : ''}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalCount > 10 && (
        <div className="board_list_bot" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div className="paging">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '8px', padding: 0 }}>
              {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button 
                    onClick={() => setPageIndex(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: pageIndex === page ? 'var(--primary-color)' : 'transparent',
                      color: pageIndex === page ? '#fff' : 'var(--text-main)',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="btn-wrap" style={{ justifyContent: 'flex-end', borderTop: 'none', marginTop: '20px', paddingTop: 0 }}>
        <button 
          onClick={() => navigate('/admin/policy/new')} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          정책 등록
        </button>
      </div>
    </div>
  );
};

export default IndvdlInfoPolicyList;
