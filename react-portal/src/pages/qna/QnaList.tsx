import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../pages.css';

interface QnaArticle {
  qaId: string;
  qestnSj: string;
  wrterNm: string;
  qnaProcessSttusCodeNm: string;
  inqireCo: string;
  writngDe: string;
}

const QnaList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<QnaArticle[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchQnaList();
  }, [pageIndex]);

  const fetchQnaList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      if (searchCondition) params.append('searchCondition', searchCondition);
      if (searchKeyword) params.append('searchKeyword', searchKeyword);

      const response: any = await apiClient.get(`/uss/olh/qna/selectQnaList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('Q&A 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchQnaList();
  };

  const formatDate = (dateStr: string) => {
    if (!dateStr || dateStr.length < 8) return dateStr;
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>Q&A</h2>
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
            <option value="wrterNm">작성자명</option>
            <option value="qestnSj">질문제목</option>
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
          <col width="10%" />
          <col width="*" />
          <col width="15%" />
          <col width="15%" />
          <col width="12%" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>질문제목</th>
            <th>작성자</th>
            <th>진행상태</th>
            <th>조회수</th>
            <th>작성일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.qaId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td style={{ textAlign: 'left' }}>
                  <Link to={`/qna/${item.qaId}`}>{item.qestnSj}</Link>
                </td>
                <td>{item.wrterNm}</td>
                <td>{item.qnaProcessSttusCodeNm}</td>
                <td>{item.inqireCo}</td>
                <td>{formatDate(item.writngDe)}</td>
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
          onClick={() => navigate('/qna/new')} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          Q&A 등록
        </button>
      </div>
    </div>
  );
};

export default QnaList;
