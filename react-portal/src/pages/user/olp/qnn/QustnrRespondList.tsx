import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface QustnrSimpleInfo {
  qestnrId: string;
  qestnrSj: string;
  qestnrBeginDe: string;
  qestnrEndDe: string;
  qestnrTmplatId: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const QustnrRespondList = () => {
  const [dataList, setDataList] = useState<QustnrSimpleInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchRespondList();
  }, [pageIndex]);

  const fetchRespondList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      if (searchCondition) params.append('searchCondition', searchCondition);
      if (searchKeyword) params.append('searchKeyword', searchKeyword);

      const response: any = await apiClient.get(`/uss/olp/qnn/selectQustnrRespondList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('설문 목록 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchRespondList();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return dateStr || '';
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  const isSurveyActive = (begin: string, end: string) => {
    const todayStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    return todayStr >= begin && todayStr <= end;
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문조사 참여</h2>
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
          <col width="*" />
          <col width="22%" />
          <col width="12%" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>설문제목</th>
            <th>설문기간</th>
            <th>참여하기</th>
            <th>통계</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>설문이 존재하지 않습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => {
              const active = isSurveyActive(item.qestnrBeginDe, item.qestnrEndDe);
              return (
                <tr key={item.qestnrId}>
                  <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                  <td style={{ textAlign: 'left' }}>{item.qestnrSj}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {formatDate(item.qestnrBeginDe)} ~ {formatDate(item.qestnrEndDe)}
                  </td>
                  <td>
                    {active ? (
                      <Link 
                        to={`/qustnr-respond/${item.qestnrId}/participate?qestnrTmplatId=${item.qestnrTmplatId}`} 
                        className="btn btn_blue_30" 
                        style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                      >
                        참여
                      </Link>
                    ) : (
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>종료/대기</span>
                    )}
                  </td>
                  <td>
                    <Link 
                      to={`/qustnr-respond/${item.qestnrId}/statistics?qestnrTmplatId=${item.qestnrTmplatId}`} 
                      className="btn btn_blue_30" 
                      style={{ padding: '4px 12px', fontSize: '0.8rem' }}
                    >
                      결과
                    </Link>
                  </td>
                  <td>{item.frstRegistPnttm ? item.frstRegistPnttm.substring(0, 10) : ''}</td>
                </tr>
              );
            })
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
    </div>
  );
};

export default QustnrRespondList;
