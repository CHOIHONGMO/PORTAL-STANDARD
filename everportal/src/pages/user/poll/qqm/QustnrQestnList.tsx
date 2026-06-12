import { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface QestnInfo {
  qestnrQesitmId: string;
  qestnCn: string;
  qestnTyCode: string;
  qestnTyCodeNm: string;
  mxmmAnswerCo: number;
  qestnrSj: string;
  qestnrId: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const QustnrQestnList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const paramQestnrId = searchParams.get('qestnrId') || '';

  const [dataList, setDataList] = useState<QestnInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchQestnList();
  }, [pageIndex, paramQestnrId]);

  const fetchQestnList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      
      if (paramQestnrId) {
        params.append('searchMode', 'Y');
        params.append('qestnrId', paramQestnrId);
      } else {
        if (searchCondition) params.append('searchCondition', searchCondition);
        if (searchKeyword) params.append('searchKeyword', searchKeyword);
      }

      const response: any = await apiClient.get(`/user/poll/qqm/selectQustnrQestnList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('설문문항 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchQestnList();
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문문항 관리</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건 {paramQestnrId && '(필터링 적용됨)'}
        </div>
        {!paramQestnrId && (
          <div className="search-box">
            <select 
              className="form-input" 
              style={{ width: '120px', marginRight: '8px' }}
              value={searchCondition}
              onChange={(e) => setSearchCondition(e.target.value)}
            >
              <option value="">선택하세요</option>
              <option value="QESTN_CN">질문내용</option>
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
          <col width="15%" />
          <col width="12%" />
          <col width="20%" />
          <col width="10%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>질문내용</th>
            <th>질문유형</th>
            <th>최대선택수</th>
            <th>설문지명</th>
            <th>등록자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.qestnrQesitmId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td style={{ textAlign: 'left' }}>
                  <Link to={`/admin/qustnr-qestn/${item.qestnrQesitmId}`}>{item.qestnCn}</Link>
                </td>
                <td>{item.qestnTyCode === '1' ? '객관식' : '주관식'}</td>
                <td>{item.mxmmAnswerCo}</td>
                <td style={{ textAlign: 'left', fontSize: '0.85rem' }}>{item.qestnrSj}</td>
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
        {paramQestnrId ? (
          <Link to="/admin/qustnr" className="btn btn_blue_46" style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}>설문지 목록</Link>
        ) : (
          <div />
        )}
        <button 
          onClick={() => navigate(`/admin/qustnr-qestn/new${paramQestnrId ? `?qestnrId=${paramQestnrId}` : ''}`)} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          문항 등록
        </button>
      </div>
    </div>
  );
};

export default QustnrQestnList;
