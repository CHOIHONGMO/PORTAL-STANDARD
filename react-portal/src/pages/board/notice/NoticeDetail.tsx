import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface BoardDetail {
  nttId: number;
  nttSj: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
  inqireCo: number;
  nttCn: string;
}

const NoticeDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<BoardDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/cop/bbs/selectBoardArticle.api?bbsId=BBSMSTR_AAAAAAAAAAAA&nttId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setDetail(response.result);
      }
    } catch (error) {
      console.error('상세 조회 실패', error);
      alert('게시글을 불러오는데 실패했습니다.');
      navigate('/board/notice');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/cop/bbs/deleteBoardArticle.api', {
          bbsId: 'BBSMSTR_AAAAAAAAAAAA',
          nttId: id
        });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/board/notice');
        } else {
          alert(response.resultMessage || '삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  if (loading) return <div className="container p_main" style={{ textAlign: 'center', padding: '40px' }}>로딩중...</div>;
  if (!detail) return <div className="container p_main" style={{ textAlign: 'center', padding: '40px' }}>데이터를 찾을 수 없습니다.</div>;

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>공지사항 상세</h2>
      </div>

      <div className="detail-view">
        <div className="detail-header">
          <h3 className="detail-title">{detail.nttSj}</h3>
          <div className="detail-info">
            <span>작성자 : {detail.frstRegisterNm}</span>
            <span>등록일 : {detail.frstRegisterPnttm}</span>
            <span>조회수 : {detail.inqireCo}</span>
          </div>
        </div>
        
        <div className="detail-content">
          {detail.nttCn && detail.nttCn.split('\n').map((line, i) => (
            <span key={i}>{line}<br/></span>
          ))}
        </div>
      </div>

      <div className="btn-wrap">
        <Link to="/board/notice" className="btn-secondary">목록</Link>
        <Link to={`/board/notice/${id}/edit`} className="btn-secondary">수정</Link>
        <button onClick={handleDelete} className="btn-secondary" style={{ color: 'red' }}>삭제</button>
      </div>
    </div>
  );
};

export default NoticeDetail;
