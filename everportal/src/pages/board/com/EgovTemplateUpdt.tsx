import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const EgovTemplateUpdt: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Code lists
  const [seCodeList, setSeCodeList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Form States
  const [tmplatId, setTmplatId] = useState('');
  const [tmplatNm, setTmplatNm] = useState('');
  const [tmplatSeCode, setTmplatSeCode] = useState('');
  const [tmplatCours, setTmplatCours] = useState('');
  const [useAt, setUseAt] = useState('Y');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch common codes first
      const codeResponse: any = await apiClient.get('/board/com/selectTemplateCodes.api');
      if (codeResponse.resultCode === 'SUCCESS') {
        setSeCodeList(codeResponse.resultList || []);
      }

      // Fetch template details
      const detailResponse: any = await apiClient.get(`/cop/com/selectTemplateInf.api?tmplatId=${id}`);
      if (detailResponse.resultCode === 'SUCCESS') {
        const data = detailResponse.result;
        setTmplatId(data.tmplatId || '');
        setTmplatNm(data.tmplatNm || '');
        setTmplatSeCode(data.tmplatSeCode || '');
        setTmplatCours(data.tmplatCours || '');
        setUseAt(data.useAt || 'Y');
      }
    } catch (error) {
      console.error('데이터 조회 실패', error);
      alert('템플릿 정보를 불러오지 못했습니다.');
      navigate('/admin/template');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/board/com/deleteTemplateInf.api', { tmplatId });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/admin/template');
        } else {
          alert(response.resultMessage || '삭제 실패');
        }
      } catch (error) {
        console.error('삭제 실패', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!tmplatNm.trim()) {
      alert('템플릿명을 입력해 주세요.');
      return;
    }
    if (!tmplatSeCode) {
      alert('템플릿 구분을 선택해 주세요.');
      return;
    }
    if (!tmplatCours.trim()) {
      alert('템플릿 경로를 입력해 주세요.');
      return;
    }

    try {
      const payload = {
        tmplatId,
        tmplatNm,
        tmplatSeCode,
        tmplatCours,
        useAt,
      };

      const response: any = await apiClient.post('/board/com/updateTemplateInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('템플릿 정보가 수정되었습니다.');
        navigate('/admin/template');
      } else {
        alert(response.resultMessage || '수정 실패');
      }
    } catch (error) {
      console.error('수정 실패', error);
      alert('수정 중 오류가 발생했습니다.');
    }
  };

  if (loading) return <div className="container p_main" style={{ textAlign: 'center', padding: '40px' }}>로딩중...</div>;

  return (
    <div className="container p_main" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>게시판 템플릿 수정</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>선택된 템플릿의 세부 사양 및 경로를 업데이트합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 템플릿 ID (Readonly) */}
          <div className="form-group">
            <label className="form-label">템플릿 ID</label>
            <input
              type="text"
              className="form-input"
              value={tmplatId}
              readOnly
              style={{ backgroundColor: '#f1f5f9' }}
            />
          </div>

          {/* 템플릿명 */}
          <div className="form-group">
            <label className="form-label" htmlFor="tmplatNm">템플릿명 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="tmplatNm"
              type="text"
              className="form-input"
              value={tmplatNm}
              onChange={(e) => setTmplatNm(e.target.value)}
              placeholder="템플릿명을 입력하세요"
              maxLength={255}
            />
          </div>

          {/* 템플릿 구분 */}
          <div className="form-group">
            <label className="form-label" htmlFor="tmplatSeCode">템플릿 구분 <span style={{ color: 'red' }}>*</span></label>
            <select
              id="tmplatSeCode"
              className="form-input"
              value={tmplatSeCode}
              onChange={(e) => setTmplatSeCode(e.target.value)}
            >
              <option value="">선택하세요</option>
              {seCodeList.map((code) => (
                <option key={code.code} value={code.code}>{code.codeNm}</option>
              ))}
            </select>
          </div>

          {/* 템플릿 경로 */}
          <div className="form-group">
            <label className="form-label" htmlFor="tmplatCours">템플릿 경로 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="tmplatCours"
              type="text"
              className="form-input"
              value={tmplatCours}
              onChange={(e) => setTmplatCours(e.target.value)}
              placeholder="템플릿 파일 또는 CSS 경로"
              maxLength={2000}
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
              onClick={() => navigate('/admin/template')}
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

export default EgovTemplateUpdt;
