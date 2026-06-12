import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../pages.css';

interface FaqDetailData {
  faqId: string;
  qestnSj: string;
  answerCn: string;
}

const FaqDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<FaqDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/olh/faq/selectFaqDetail.api?faqId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setDetail(response.result);
      }
    } catch (error) {
      console.error('상세 조회 실패', error);
      alert('데이터를 불러오지 못했습니다.');
      navigate('/faq');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/uss/olh/faq/deleteFaq.api', { faqId: id });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/faq');
        }
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  if (loading) return <div className="container p_main" style={{ textAlign: 'center' }}>로딩중...</div>;
  if (!detail) return <div className="container p_main" style={{ textAlign: 'center' }}>데이터가 없습니다.</div>;

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>자주하는 질문 상세</h2>
      </div>

      <div className="detail-view">
        <div className="detail-header" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary-color)' }}>Q</span>
          <h3 className="detail-title" style={{ margin: 0 }}>{detail.qestnSj}</h3>
        </div>
        
        <div className="detail-content" style={{ display: 'flex', gap: '16px', backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--secondary-color)' }}>A</span>
          <div>
            {detail.answerCn && detail.answerCn.split('\n').map((line, i) => (
              <span key={i}>{line}<br/></span>
            ))}
          </div>
        </div>
      </div>

      <div className="btn-wrap">
        <Link to="/faq" className="btn-secondary">목록</Link>
        <Link to={`/faq/${id}/edit`} className="btn-secondary">수정</Link>
        <button onClick={handleDelete} className="btn-secondary" style={{ color: 'red' }}>삭제</button>
      </div>
    </div>
  );
};

export default FaqDetail;
