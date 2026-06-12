import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import EgovBoardMstrListPop from '@/pages/board/bbs/EgovBoardMstrListPop';

const EgovBoardUseInfRegist: React.FC = () => {
  const navigate = useNavigate();

  // Modals
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);

  // Form States
  const [bbsId, setBbsId] = useState('');
  const [bbsNm, setBbsNm] = useState('');
  const [trgetType, setTrgetType] = useState('SYSTEM'); // SYSTEM, CMMNTY, CLUB
  const [trgetId, setTrgetId] = useState('SYSTEM_DEFAULT_BOARD');

  const handleBoardSelect = (id: string, name: string) => {
    setBbsId(id);
    setBbsNm(name);
  };

  const handleTrgetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setTrgetType(val);
    if (val === 'SYSTEM') {
      setTrgetId('SYSTEM_DEFAULT_BOARD');
    } else {
      setTrgetId('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bbsId) {
      alert('게시판을 선택해 주세요.');
      return;
    }
    if (!trgetId.trim()) {
      alert('사용대상 ID를 입력해 주세요.');
      return;
    }

    try {
      const payload = {
        bbsId,
        trgetId,
        trgetType,
      };

      const response: any = await apiClient.post('/cop/com/insertBBSUseInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('게시판 사용 정보가 등록되었습니다.');
        navigate('/admin/usage');
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
        <h2>게시판 사용등록</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>생성된 게시판을 특정 타겟 시스템이나 그룹에 연결합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 게시판선택 */}
          <div className="form-group">
            <label className="form-label">게시판명 <span style={{ color: 'red' }}>*</span></label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                className="form-input"
                value={bbsNm}
                readOnly
                placeholder="게시판 선택 버튼을 눌러주세요."
                style={{ flex: 1, backgroundColor: '#f1f5f9' }}
              />
              <button
                type="button"
                className="btn-search"
                onClick={() => setIsBoardModalOpen(true)}
                style={{ width: 'auto', padding: '12px 24px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
              >
                선택
              </button>
            </div>
          </div>

          {/* 사용대상 구분 */}
          <div className="form-group">
            <label className="form-label" htmlFor="trgetType">사용대상 구분 <span style={{ color: 'red' }}>*</span></label>
            <select
              id="trgetType"
              className="form-input"
              value={trgetType}
              onChange={handleTrgetTypeChange}
            >
              <option value="SYSTEM">포털시스템관리</option>
              <option value="CMMNTY">커뮤니티</option>
              <option value="CLUB">동호회</option>
            </select>
          </div>

          {/* 사용대상 ID */}
          <div className="form-group">
            <label className="form-label" htmlFor="trgetId">사용대상 ID <span style={{ color: 'red' }}>*</span></label>
            <input
              id="trgetId"
              type="text"
              className="form-input"
              value={trgetId}
              onChange={(e) => setTrgetId(e.target.value)}
              placeholder="사용대상 ID 입력"
              readOnly={trgetType === 'SYSTEM'}
              style={{ backgroundColor: trgetType === 'SYSTEM' ? '#f1f5f9' : 'white' }}
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-submit" style={{ width: '160px', padding: '14px', cursor: 'pointer' }}>저장</button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/usage')}
              style={{ width: '160px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>

      <EgovBoardMstrListPop
        isOpen={isBoardModalOpen}
        onClose={() => setIsBoardModalOpen(false)}
        onSelect={handleBoardSelect}
      />
    </div>
  );
};

export default EgovBoardUseInfRegist;
