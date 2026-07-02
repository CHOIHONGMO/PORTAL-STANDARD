import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const TemplateRegist: React.FC = () => {
  const navigate = useNavigate();

  // Code lists
  const [seCodeList, setSeCodeList] = useState<any[]>([]);

  // Form States
  const [tmplatNm, setTmplatNm] = useState('');
  const [tmplatSeCode, setTmplatSeCode] = useState('');
  const [tmplatCours, setTmplatCours] = useState('');
  const [useAt, setUseAt] = useState('Y');

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response: any = await apiClient.get('/board/com/selectTemplateCodes.api');
      if (response.resultCode === 'SUCCESS') {
        setSeCodeList(response.resultList || []);
      }
    } catch (error) {
      console.error('구분 코드 조회 실패', error);
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
        tmplatNm,
        tmplatSeCode,
        tmplatCours,
        useAt,
      };

      const response: any = await apiClient.post('/board/com/insertTemplateInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('템플릿 정보가 등록되었습니다.');
        navigate('/admin/template');
      } else {
        alert(response.resultMessage || '등록 실패');
      }
    } catch (error) {
      console.error('등록 실패', error);
      alert('등록 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>게시판 템플릿 등록</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>다양한 기능 레이아웃에 적용할 새로운 템플릿 구조를 생성합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
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
              placeholder="예: /css/egovframework/cop/bbs/style.css"
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
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-submit" style={{ width: '160px', padding: '14px', cursor: 'pointer' }}>저장</button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/template')}
              style={{ width: '160px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TemplateRegist;
