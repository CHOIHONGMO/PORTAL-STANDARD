import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const EgovMberPasswordUpdt: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Retrieve mberId and uniqId passed from routing state
  const state = location.state || {};
  const mberId = state.mberId || '';
  const uniqId = state.uniqId || id || '';

  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPassword2, setNewPassword2] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!oldPassword) {
      alert('기존 비밀번호를 입력해 주세요.');
      return;
    }
    if (!newPassword) {
      alert('새로운 비밀번호를 입력해 주세요.');
      return;
    }
    if (newPassword !== newPassword2) {
      alert('새 비밀번호 확인이 일치하지 않습니다.');
      return;
    }

    try {
      const payload = {
        mberId,
        uniqId,
        oldPassword,
        newPassword,
      };

      const response: any = await apiClient.post('/user/member/mber/updatePassword.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate(`/admin/member/${uniqId}`);
      } else {
        alert(response.resultMessage || '비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 중 에러', error);
      alert('비밀번호 변경 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main" style={{ maxWidth: '600px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>비밀번호 변경</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>회원의 비밀번호를 안전하게 수정합니다.</p>
      </div>

      <div className="glass" style={{ padding: '30px 40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 아이디 */}
          <div className="form-group">
            <label className="form-label">일반회원아이디</label>
            <input
              type="text"
              className="form-input"
              value={mberId}
              readOnly
              style={{ backgroundColor: '#f1f5f9' }}
            />
          </div>

          {/* 기존 비밀번호 */}
          <div className="form-group">
            <label className="form-label" htmlFor="oldPassword">기존 비밀번호 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="oldPassword"
              type="password"
              className="form-input"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="기존 비밀번호 입력"
            />
          </div>

          {/* 새 비밀번호 */}
          <div className="form-group">
            <label className="form-label" htmlFor="newPassword">새 비밀번호 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="newPassword"
              type="password"
              className="form-input"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="새 비밀번호 입력"
            />
          </div>

          {/* 새 비밀번호 확인 */}
          <div className="form-group">
            <label className="form-label" htmlFor="newPassword2">새 비밀번호 확인 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="newPassword2"
              type="password"
              className="form-input"
              value={newPassword2}
              onChange={(e) => setNewPassword2(e.target.value)}
              placeholder="새 비밀번호 다시 입력"
            />
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
            <button type="submit" className="btn-submit" style={{ width: '130px', padding: '12px', cursor: 'pointer', marginTop: 0 }}>저장</button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate(`/admin/member/${uniqId}`)}
              style={{ width: '130px', padding: '12px', cursor: 'pointer' }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EgovMberPasswordUpdt;
