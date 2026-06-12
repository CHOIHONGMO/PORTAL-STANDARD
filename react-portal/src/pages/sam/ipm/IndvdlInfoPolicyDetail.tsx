import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import '../../pages.css';

interface PolicyDetail {
  indvdlInfoId: string;
  indvdlInfoNm: string;
  indvdlInfoYn: string;
  indvdlInfoDc: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const IndvdlInfoPolicyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<PolicyDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/sam/ipm/selectIndvdlInfoPolicyDetail.api?indvdlInfoId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setDetail(response.result || null);
      }
    } catch (error) {
      console.error('개인정보보호정책 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response: any = await apiClient.post('/uss/sam/ipm/deleteIndvdlInfoPolicy.api', { indvdlInfoId: id });
      if (response.resultCode === 'SUCCESS') {
        alert('성공적으로 삭제되었습니다.');
        navigate('/admin/policy');
      } else {
        alert(response.resultMessage || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('개인정보보호정책 삭제 실패', error);
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
        <h2>개인정보보호정책 상세정보</h2>
      </div>

      <table className="form-table">
        <colgroup>
          <col width="25%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>개인정보보호정책명</th>
            <td>{detail.indvdlInfoNm}</td>
          </tr>
          <tr>
            <th>동의여부</th>
            <td>{detail.indvdlInfoYn === 'Y' ? '예' : '아니오'}</td>
          </tr>
          <tr>
            <th>개인정보보호정책설명</th>
            <td style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6' }}>{detail.indvdlInfoDc}</td>
          </tr>
          <tr>
            <th>등록자</th>
            <td>{detail.frstRegisterNm}</td>
          </tr>
          <tr>
            <th>등록일자</th>
            <td>{detail.frstRegistPnttm}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-wrap" style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/admin/policy')} className="btn-back">목록</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleDelete} className="btn-delete" style={{ padding: '10px 20px' }}>삭제</button>
          <Link to={`/admin/policy/${detail.indvdlInfoId}/edit`} className="btn-submit" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</Link>
        </div>
      </div>
    </div>
  );
};

export default IndvdlInfoPolicyDetail;
