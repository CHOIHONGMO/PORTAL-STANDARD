import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface RespondDetail {
  qestnrQesrspnsId: string;
  qestnrSj: string;
  qestnCn: string;
  qestnTyCode: string;
  iemCn: string;
  respondAnswerCn: string;
  etcAnswerCn: string;
  respondNm: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
}

const QustnrRespondInfoDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<RespondDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/poll/qri/selectQustnrRespondInfoDetail.api?qestnrQesrspnsId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setDetail(response.result || null);
      }
    } catch (error) {
      console.error('설문응답결과 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response: any = await apiClient.post('/user/poll/qri/deleteQustnrRespondInfo.api', { qestnrQesrspnsId: id });
      if (response.resultCode === 'SUCCESS') {
        alert('성공적으로 삭제되었습니다.');
        navigate('/admin/qustnr-respond-info');
      } else {
        alert(response.resultMessage || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문응답결과 삭제 실패', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  if (!detail) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문응답결과 상세정보</h2>
      </div>

      <table className="form-table">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>설문제목</th>
            <td>{detail.qestnrSj}</td>
          </tr>
          <tr>
            <th>설문문항</th>
            <td>{detail.qestnCn}</td>
          </tr>
          <tr>
            <th>문항유형</th>
            <td>{detail.qestnTyCode === '1' ? '객관식' : '주관식'}</td>
          </tr>
          {detail.qestnTyCode === '1' ? (
            <>
              <tr>
                <th>설문항목</th>
                <td>{detail.iemCn || '-'}</td>
              </tr>
              {detail.etcAnswerCn && (
                <tr>
                  <th>기타 답변내용</th>
                  <td>{detail.etcAnswerCn}</td>
                </tr>
              )}
            </>
          ) : (
            <tr>
              <th>응답자 답변내용</th>
              <td style={{ whiteSpace: 'pre-wrap' }}>{detail.respondAnswerCn || '-'}</td>
            </tr>
          )}
          <tr>
            <th>응답자명</th>
            <td>{detail.respondNm}</td>
          </tr>
          <tr>
            <th>등록자</th>
            <td>{detail.frstRegisterNm}</td>
          </tr>
          <tr>
            <th>등록일자</th>
            <td>{detail.frstRegisterPnttm}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-wrap" style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/admin/qustnr-respond-info')} className="btn-back">목록</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleDelete} className="btn-delete" style={{ padding: '10px 20px' }}>삭제</button>
          <Link to={`/admin/qustnr-respond-info/${detail.qestnrQesrspnsId}/edit`} className="btn-submit" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</Link>
        </div>
      </div>
    </div>
  );
};

export default QustnrRespondInfoDetail;
