import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface TmplatDetail {
  qestnrTmplatId: string;
  qestnrTmplatTy: string;
  qestnrTmplatCn: string;
  qestnrTmplatCours: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
}

const QustnrTmplatManageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<TmplatDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTmplatDetail();
  }, [id]);

  const fetchTmplatDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/poll/qtm/selectQustnrTmplatManageDetail.api?qestnrTmplatId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setDetail(response.result || null);
      }
    } catch (error) {
      console.error('설문템플릿 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response: any = await apiClient.post('/user/poll/qtm/deleteQustnrTmplatManage.api', { qestnrTmplatId: id });
      if (response.resultCode === 'SUCCESS') {
        alert('성공적으로 삭제되었습니다.');
        navigate('/admin/qustnr-tmplat');
      } else {
        alert(response.resultMessage || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문템플릿 삭제 실패', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  if (!detail) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>템플릿 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문템플릿 상세정보</h2>
      </div>

      <table className="form-table">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>템플릿 유형</th>
            <td>{detail.qestnrTmplatTy}</td>
          </tr>
          <tr>
            <th>템플릿 유형 이미지</th>
            <td>
              <div style={{ margin: '10px 0' }}>
                <img 
                  src={`/api/uss/olp/qtm/selectQustnrTmplatManageImg.api?qestnrTmplatId=${detail.qestnrTmplatId}`} 
                  alt={`${detail.qestnrTmplatTy} 이미지`} 
                  style={{ maxWidth: '300px', maxHeight: '200px', objectFit: 'contain', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2214%22%20fill%3D%22%23aaa%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Image%20Available%3C%2Ftext%3E%3C%2Fsvg%3E';
                  }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th>템플릿 설명</th>
            <td style={{ whiteSpace: 'pre-wrap' }}>{detail.qestnrTmplatCn}</td>
          </tr>
          <tr>
            <th>템플릿 파일 경로</th>
            <td><code>{detail.qestnrTmplatCours}</code></td>
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
        <button onClick={() => navigate('/admin/qustnr-tmplat')} className="btn-back">목록</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleDelete} className="btn-delete" style={{ padding: '10px 20px' }}>삭제</button>
          <Link to={`/admin/qustnr-tmplat/${detail.qestnrTmplatId}/edit`} className="btn-submit" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</Link>
        </div>
      </div>
    </div>
  );
};

export default QustnrTmplatManageDetail;
