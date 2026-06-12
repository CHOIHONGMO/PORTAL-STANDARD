import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const EgovBoardUseInfInqire: React.FC = () => {
  const { bbsId, trgetId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Form States
  const [bbsNm, setBbsNm] = useState('');
  const [trgetNm, setTrgetNm] = useState('');
  const [provdUrl, setProvdUrl] = useState('');
  const [useAt, setUseAt] = useState('N');

  useEffect(() => {
    fetchDetail();
  }, [bbsId, trgetId]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/cop/com/selectBBSUseInf.api?bbsId=${bbsId}&trgetId=${trgetId}`);
      if (response.resultCode === 'SUCCESS') {
        const data = response.result;
        setBbsNm(data.bbsNm || '');
        setTrgetNm(data.trgetNm || data.trgetId || '');
        setProvdUrl(data.provdUrl || '');
        setUseAt(data.useAt || 'N');
      }
    } catch (error) {
      console.error('사용 정보 상세 조회 실패', error);
      alert('사용 정보를 불러오지 못했습니다.');
      navigate('/admin/usage');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/board/com/deleteBBSUseInf.api', { bbsId, trgetId });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/admin/usage');
        } else {
          alert(response.resultMessage || '삭제 실패');
        }
      } catch (error) {
        console.error('삭제 에러', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const payload = {
        bbsId,
        trgetId,
        useAt,
      };

      const response: any = await apiClient.post('/board/com/updateBBSUseInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('사용 정보가 수정되었습니다.');
        navigate('/admin/usage');
      } else {
        alert(response.resultMessage || '수정 실패');
      }
    } catch (error) {
      console.error('수정 실패', error);
      alert('수정 중 에러가 발생했습니다.');
    }
  };

  if (loading) return <div className="container p_main" style={{ textAlign: 'center', padding: '40px' }}>로딩중...</div>;

  return (
    <div className="container p_main" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>게시판 사용 상세</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>게시판 연결 정보 및 주소를 확인하고 사용여부를 제어합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 게시판명 */}
          <div className="form-group">
            <label className="form-label">게시판명</label>
            <input
              type="text"
              className="form-input"
              value={bbsNm}
              readOnly
              style={{ backgroundColor: '#f1f5f9' }}
            />
          </div>

          {/* 사용대상 */}
          <div className="form-group">
            <label className="form-label">사용대상</label>
            <input
              type="text"
              className="form-input"
              value={trgetNm}
              readOnly
              style={{ backgroundColor: '#f1f5f9' }}
            />
          </div>

          {/* 사용여부 */}
          <div className="form-group">
            <label className="form-label" htmlFor="useAt">사용여부 <span style={{ color: 'red' }}>*</span></label>
            <select
              id="useAt"
              className="form-input"
              value={useAt}
              onChange={(e) => setUseAt(e.target.value)}
            >
              <option value="Y">사용</option>
              <option value="N">미사용</option>
            </select>
          </div>

          {/* 제공 URL (SYSTEM 대상인 경우 표시) */}
          {provdUrl && (
            <div className="form-group">
              <label className="form-label">제공 URL</label>
              <input
                type="text"
                className="form-input"
                value={provdUrl}
                readOnly
                style={{ backgroundColor: '#f1f5f9', color: 'var(--primary-color)', fontWeight: 600 }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-submit" style={{ width: '130px', padding: '14px', cursor: 'pointer', marginTop: 0 }}>저장</button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleDelete}
              style={{ width: '130px', padding: '14px', cursor: 'pointer', color: '#dc2626', borderColor: '#fca5a5' }}
            >
              삭제
            </button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/usage')}
              style={{ width: '130px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EgovBoardUseInfInqire;
