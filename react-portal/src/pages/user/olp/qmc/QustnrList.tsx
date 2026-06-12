import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface QustnrInfo {
  qestnrId: string;
  qestnrSj: string;
  qestnrBeginDe: string;
  qestnrEndDe: string;
  qestnrTmplatId: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const QustnrList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<QustnrInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchQustnrList();
  }, [pageIndex]);

  const fetchQustnrList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      if (searchCondition) params.append('searchCondition', searchCondition);
      if (searchKeyword) params.append('searchKeyword', searchKeyword);

      const response: any = await apiClient.get(`/uss/olp/qmc/selectQustnrList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('설문지 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchQustnrList();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return dateStr || '';
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문지 관리</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건
        </div>
        <div className="search-box">
          <select 
            className="form-input" 
            style={{ width: '120px', marginRight: '8px' }}
            value={searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="QUSTNR_SJ">설문제목</option>
            <option value="FRST_REGISTER_ID">등록자</option>
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
          <col width="6%" />
          <col width="*" />
          <col width="16%" />
          <col width="9%" />
          <col width="9%" />
          <col width="9%" />
          <col width="9%" />
          <col width="10%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>설문제목</th>
            <th>설문기간</th>
            <th>설문문항</th>
            <th>설문항목</th>
            <th>설문참여</th>
            <th>통계</th>
            <th>등록자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={9} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.qestnrId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td style={{ textAlign: 'left' }}>
                  <Link to={`/admin/qustnr/${item.qestnrId}`}>{item.qestnrSj}</Link>
                </td>
                <td style={{ fontSize: '0.85rem' }}>
                  {formatDate(item.qestnrBeginDe)} ~ {formatDate(item.qestnrEndDe)}
                </td>
                <td>
                  <Link to={`/admin/qustnr-qestn?searchMode=Y&qestnrId=${item.qestnrId}`} className="btn btn_blue_30" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>보기</Link>
                </td>
                <td>
                  <Link to={`/admin/qustnr-item?searchMode=Y&qestnrId=${item.qestnrId}`} className="btn btn_blue_30" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>보기</Link>
                </td>
                <td>
                  <Link to={`/qustnr-respond/${item.qestnrId}/participate?qestnrTmplatId=${item.qestnrTmplatId}`} className="btn btn_blue_30" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>참여</Link>
                </td>
                <td>
                  <Link to={`/qustnr-respond/${item.qestnrId}/statistics?qestnrTmplatId=${item.qestnrTmplatId}`} className="btn btn_blue_30" style={{ padding: '2px 8px', fontSize: '0.8rem' }}>보기</Link>
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
          onClick={() => navigate('/admin/qustnr/new')} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          설문지 등록
        </button>
      </div>
    </div>
  );
};

export default QustnrList;
