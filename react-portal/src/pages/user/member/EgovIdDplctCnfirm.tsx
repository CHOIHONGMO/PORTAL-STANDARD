import React, { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

interface EgovIdDplctCnfirmProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (checkedId: string) => void;
  initialId: string;
}

const EgovIdDplctCnfirm: React.FC<EgovIdDplctCnfirmProps> = ({ isOpen, onClose, onSelect, initialId }) => {
  const [checkId, setCheckId] = useState(initialId);
  const [usedCnt, setUsedCnt] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCheckId(initialId);
    setUsedCnt(null);
  }, [initialId, isOpen]);

  if (!isOpen) return null;

  const fnCheckNotKorean = (str: string) => {
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      if ((0xac00 <= charCode && charCode <= 0xd7a3) || (0x3131 <= charCode && charCode <= 0x318e)) {
        return false;
      }
    }
    return true;
  };

  const handleCheck = async () => {
    if (!checkId.trim()) {
      alert('중복 조회할 아이디를 입력하십시오.');
      return;
    }
    if (!fnCheckNotKorean(checkId)) {
      alert('한글은 사용할 수 없습니다.');
      return;
    }

    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/member/checkIdDplct.api?checkId=${encodeURIComponent(checkId)}`);
      if (response.resultCode === 'SUCCESS') {
        setUsedCnt(response.usedCnt);
      }
    } catch (error) {
      console.error('ID 중복 확인 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUse = () => {
    if (usedCnt === 0) {
      onSelect(checkId);
      onClose();
    } else if (usedCnt === 1) {
      alert('이미 사용 중인 아이디입니다.');
    } else {
      alert('먼저 중복 확인을 실행하십시오.');
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass" style={{
        width: '90%', maxWidth: '480px', borderRadius: 'var(--radius-lg)',
        padding: '28px', backgroundColor: 'var(--surface-color)',
        boxShadow: 'var(--shadow-lg)', border: '1px solid rgba(255,255,255,0.4)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>아이디 중복확인</h3>
          <button onClick={onClose} style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-light)', cursor: 'pointer' }}>&times;</button>
        </div>

        {/* Input */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
          <label style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>사용할 아이디</label>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="text"
              className="form-input"
              value={checkId}
              onChange={(e) => {
                setCheckId(e.target.value);
                setUsedCnt(null); // Reset check state on edit
              }}
              placeholder="아이디 입력"
              style={{ flex: 1 }}
            />
            <button className="btn-search" onClick={handleCheck} style={{ width: 'auto', padding: '10px 20px', cursor: 'pointer' }}>조회</button>
          </div>
        </div>

        {/* Result Message */}
        <div style={{
          padding: '16px', borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--bg-color)',
          textAlign: 'center', marginBottom: '24px', fontWeight: 500, fontSize: '0.95rem'
        }}>
          {loading ? (
            <span style={{ color: 'var(--text-muted)' }}>확인 중...</span>
          ) : usedCnt === null ? (
            <span style={{ color: 'var(--text-muted)' }}>중복확인을 실행하십시오.</span>
          ) : usedCnt === 0 ? (
            <span style={{ color: '#10b981' }}>
              <strong>{checkId}</strong> 은(는) 사용 가능한 아이디입니다.
            </span>
          ) : (
            <span style={{ color: '#ef4444' }}>
              <strong>{checkId}</strong> 은(는) 이미 사용 중인 아이디입니다.
            </span>
          )}
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={handleUse}
            disabled={usedCnt !== 0}
            className="btn-submit"
            style={{
              width: '120px', padding: '10px', marginTop: 0,
              opacity: usedCnt === 0 ? 1 : 0.5, cursor: usedCnt === 0 ? 'pointer' : 'not-allowed'
            }}
          >
            사용
          </button>
          <button
            onClick={onClose}
            className="btn-home"
            style={{ width: '120px', padding: '10px', cursor: 'pointer' }}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default EgovIdDplctCnfirm;
