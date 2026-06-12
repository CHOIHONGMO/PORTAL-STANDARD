import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface ItemInfo {
  qustnrIemId: string;
  iemCn: string;
  qestnCn: string;
  qestnrQesitmId: string;
  etcAnswerAt: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const QustnrItemList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramQesitmId = searchParams.get('qestnrQesitmId') || '';
  const paramQestnrId = searchParams.get('qestnrId') || '';

  const [dataList, setDataList] = useState<ItemInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchItemList();
  }, [pageIndex, paramQesitmId]);

  const fetchItemList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));

      if (paramQesitmId) {
        params.append('searchMode', 'Y');
        params.append('qestnrQesitmId', paramQesitmId);
      } else {
        if (searchCondition) params.append('searchCondition', searchCondition);
        if (searchKeyword) params.append('searchKeyword', searchKeyword);
      }

      const response: any = await apiClient.get(`/user/poll/qim/selectQustnrItemList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('설문항목 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchItemList();
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문항목 관리</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건 {paramQesitmId && '(문항 필터링 적용됨)'}
        </div>
        {!paramQesitmId && (
          <div className="search-box">
            <select 
              className="form-input" 
              style={{ width: '120px', marginRight: '8px' }}
              value={searchCondition}
              onChange={(e) => setSearchCondition(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="IEM_CN">항목내용</option>
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
        )}
      </div>

      <table className="data-table">
        <colgroup>
          <col width="6%" />
          <col width="*" />
          <col width="22%" />
          <col width="12%" />
          <col width="12%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>항목내용</th>
            <th>질문내용</th>
            <th>기타답변여부</th>
            <th>등록자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.qustnrIemId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td style={{ textAlign: 'left' }}>
                  <Link to={`/admin/qustnr-item/${item.qustnrIemId}`}>{item.iemCn}</Link>
                </td>
                <td style={{ textAlign: 'left', fontSize: '0.85rem' }}>{item.qestnCn}</td>
                <td>{item.etcAnswerAt === 'Y' ? '사용' : '미사용'}</td>
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

      <div className="btn-wrap" style={{ display: 'flex', justifyContent: 'space-between', borderTop: 'none', marginTop: '20px', paddingTop: 0 }}>
        {paramQesitmId ? (
          <Link to={`/admin/qustnr-qestn?qestnrId=${paramQestnrId}`} className="btn btn_blue_46" style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}>문항 목록</Link>
        ) : (
          <div />
        )}
        <button 
          onClick={() => navigate(`/admin/qustnr-item/new?qestnrId=${paramQestnrId}&qestnrQesitmId=${paramQesitmId}`)} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          항목 등록
        </button>
      </div>
    </div>
  );
};

export default QustnrItemList;
