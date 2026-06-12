import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface BoardArticle {
  nttId: number;
  nttSj: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
  inqireCo: number;
}

const NoticeList = () => {
  const [dataList, setDataList] = useState<BoardArticle[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBoardList();
  }, []);

  const fetchBoardList = async () => {
    try {
      setLoading(true);
      // REST API 호출: 공지사항 게시판 ID (BBSMSTR_AAAAAAAAAAAA)
      const response: any = await apiClient.get('/cop/bbs/selectBoardList.api?bbsId=BBSMSTR_AAAAAAAAAAAA');
      
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.result);
        setTotalCount(response.totalCount);
      }
    } catch (error) {
      console.error('게시물 목록을 불러오지 못했습니다.', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>공지사항</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건
        </div>
        <div className="search-box">
          <select className="form-input" style={{ width: '120px' }}>
            <option value="title">제목</option>
            <option value="content">내용</option>
            <option value="writer">작성자</option>
          </select>
          <input type="text" className="search-input" placeholder="검색어를 입력하세요" />
          <button className="btn-search">검색</button>
        </div>
      </div>

      <table className="data-table">
        <colgroup>
          <col width="8%" />
          <col width="*" />
          <col width="15%" />
          <col width="15%" />
          <col width="10%" />
        </colgroup>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>등록일</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>데이터를 불러오는 중입니다...</td>
            </tr>
          ) : dataList.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center', padding: '40px' }}>게시물이 없습니다.</td>
            </tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.nttId}>
                <td>{totalCount - idx}</td>
                <td>
                  <Link to={`/board/notice/${item.nttId}`}>{item.nttSj}</Link>
                </td>
                <td>{item.frstRegisterNm}</td>
                <td>{item.frstRegisterPnttm}</td>
                <td>{item.inqireCo}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="btn-wrap" style={{ justifyContent: 'flex-end', borderTop: 'none', marginTop: 0, paddingTop: 0 }}>
        <Link to="/board/notice/new" className="btn-submit" style={{ width: 'auto', padding: '10px 24px', marginTop: 0 }}>등록</Link>
      </div>
    </div>
  );
};

export default NoticeList;
