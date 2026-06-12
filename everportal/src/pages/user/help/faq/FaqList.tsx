import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface FaqArticle {
  faqId: string;
  qestnSj: string;
  inqireCo: number;
}

const FaqList = () => {
  const [dataList, setDataList] = useState<FaqArticle[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqList();
  }, []);

  const fetchFaqList = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get('/user/help/faq/selectFaqList.api');
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('FAQ 목록 실패', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>자주하는 질문 (FAQ)</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건
        </div>
        <div className="search-box">
          <input type="text" className="search-input" placeholder="질문 검색" />
          <button className="btn-search">검색</button>
        </div>
      </div>

      <table className="data-table">
        <colgroup>
          <col width="10%" />
          <col width="*" />
          <col width="15%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>질문 제목</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={3} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.faqId}>
                <td>{totalCount - idx}</td>
                <td>
                  <Link to={`/faq/${item.faqId}`}>{item.qestnSj}</Link>
                </td>
                <td>{item.inqireCo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="btn-wrap" style={{ justifyContent: 'flex-end', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
        <Link to="/faq/new" className="btn-submit" style={{ width: 'auto', padding: '10px 24px', marginTop: 0 }}>FAQ 등록</Link>
      </div>
    </div>
  );
};

export default FaqList;
