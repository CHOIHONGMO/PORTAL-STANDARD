import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import IdDplctCnfirm from '@/pages/user/member/IdDplctCnfirm';
import CcmZipSearchList from '@/pages/system/zip/CcmZipSearchList';

const MberInsert: React.FC = () => {
  const navigate = useNavigate();

  // Common Code States
  const [passwordHintList, setPasswordHintList] = useState<any[]>([]);
  const [sexdstnCodeList, setSexdstnCodeList] = useState<any[]>([]);
  const [mberSttusList, setMberSttusList] = useState<any[]>([]);
  const [groupIdList, setGroupIdList] = useState<any[]>([]);

  // Modals
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [idChecked, setIdChecked] = useState(false);

  // Form States
  const [mberId, setMberId] = useState('');
  const [mberNm, setMberNm] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [passwordHint, setPasswordHint] = useState('');
  const [passwordCnsr, setPasswordCnsr] = useState('');
  const [sexdstnCode, setSexdstnCode] = useState('');
  const [areaNo, setAreaNo] = useState('');
  const [middleTelno, setMiddleTelno] = useState('');
  const [endTelno, setEndTelno] = useState('');
  const [mberFxnum, setMberFxnum] = useState('');
  const [moblphonNo, setMoblphonNo] = useState('');
  const [mberEmailAdres, setMberEmailAdres] = useState('');
  const [zip, setZip] = useState('');
  const [zipView, setZipView] = useState('');
  const [adres, setAdres] = useState('');
  const [detailAdres, setDetailAdres] = useState('');
  const [groupId, setGroupId] = useState('');
  const [mberSttus, setMberSttus] = useState('');

  useEffect(() => {
    fetchCommonCodes();
  }, []);

  const fetchCommonCodes = async () => {
    try {
      const response: any = await apiClient.get('/common/code/selectMemberCodeDetails.api');
      if (response.resultCode === 'SUCCESS') {
        const { passwordHintList, sexdstnCodeList, mberSttusList, groupIdList } = response.result;
        setPasswordHintList(passwordHintList || []);
        setSexdstnCodeList(sexdstnCodeList || []);
        setMberSttusList(mberSttusList || []);
        setGroupIdList(groupIdList || []);
      }
    } catch (error) {
      console.error('공통 코드를 불러오지 못했습니다.', error);
    }
  };

  const handleIdSelect = (selectedId: string) => {
    setMberId(selectedId);
    setIdChecked(true);
  };

  const handleZipSelect = (selectedZip: string, selectedAddr: string) => {
    setZip(selectedZip.replace('-', ''));
    setZipView(selectedZip);
    setAdres(selectedAddr);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mberId) {
      alert('아이디 중복확인을 진행해 주세요.');
      return;
    }
    if (!idChecked) {
      alert('아이디 중복확인이 필요합니다.');
      return;
    }
    if (!mberNm) {
      alert('이름을 입력해 주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해 주세요.');
      return;
    }
    if (password !== password2) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    if (!passwordHint) {
      alert('비밀번호 힌트를 선택해 주세요.');
      return;
    }
    if (!passwordCnsr) {
      alert('비밀번호 정답을 입력해 주세요.');
      return;
    }
    if (!groupId) {
      alert('그룹 아이디를 선택해 주세요.');
      return;
    }
    if (!mberSttus) {
      alert('회원 상태코드를 선택해 주세요.');
      return;
    }

    try {
      const payload = {
        mberId,
        mberNm,
        password,
        passwordHint,
        passwordCnsr,
        sexdstnCode,
        areaNo,
        middleTelno,
        endTelno,
        mberFxnum,
        moblphonNo,
        mberEmailAdres,
        zip,
        adres,
        detailAdres,
        groupId,
        mberSttus,
      };

      const response: any = await apiClient.post('/user/member/mber/insertMber.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('회원이 성공적으로 등록되었습니다.');
        navigate('/admin/member');
      } else {
        alert(response.resultMessage || '회원 등록 실패');
      }
    } catch (error) {
      console.error('회원 등록 에러', error);
      alert('회원 등록 중 에러가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>회원 등록</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>포털 신규 사용자를 추가합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 아이디 */}
          <div className="form-group">
            <label className="form-label">일반회원아이디 <span style={{ color: 'red' }}>*</span></label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                className="form-input"
                value={mberId}
                readOnly
                placeholder="아이디 중복 검색을 진행해 주세요."
                style={{ flex: 1, backgroundColor: '#f1f5f9' }}
              />
              <button
                type="button"
                className="btn-search"
                onClick={() => setIsIdModalOpen(true)}
                style={{ width: 'auto', padding: '12px 24px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
              >
                중복검색
              </button>
            </div>
            {idChecked && <span style={{ color: '#10b981', fontSize: '0.85rem', display: 'block', marginTop: '4px' }}>✓ 중복 확인 완료</span>}
          </div>

          {/* 이름 */}
          <div className="form-group">
            <label className="form-label" htmlFor="mberNm">이름 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="mberNm"
              type="text"
              className="form-input"
              value={mberNm}
              onChange={(e) => setMberNm(e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* 비밀번호 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="password">비밀번호 <span style={{ color: 'red' }}>*</span></label>
              <input
                id="password"
                type="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호 입력"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="password2">비밀번호 확인 <span style={{ color: 'red' }}>*</span></label>
              <input
                id="password2"
                type="password"
                className="form-input"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="비밀번호 다시 입력"
              />
            </div>
          </div>

          {/* 비밀번호 힌트 및 정답 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="passwordHint">비밀번호 힌트 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="passwordHint"
                className="form-input"
                value={passwordHint}
                onChange={(e) => setPasswordHint(e.target.value)}
              >
                <option value="">선택하세요</option>
                {passwordHintList.map((code) => (
                  <option key={code.code} value={code.code}>{code.codeNm}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="passwordCnsr">비밀번호 정답 <span style={{ color: 'red' }}>*</span></label>
              <input
                id="passwordCnsr"
                type="text"
                className="form-input"
                value={passwordCnsr}
                onChange={(e) => setPasswordCnsr(e.target.value)}
                placeholder="답변 입력"
              />
            </div>
          </div>

          {/* 성별구분코드 */}
          <div className="form-group">
            <label className="form-label" htmlFor="sexdstnCode">성별</label>
            <select
              id="sexdstnCode"
              className="form-input"
              value={sexdstnCode}
              onChange={(e) => setSexdstnCode(e.target.value)}
            >
              <option value="">선택하세요</option>
              {sexdstnCodeList.map((code) => (
                <option key={code.code} value={code.code}>{code.codeNm}</option>
              ))}
            </select>
          </div>

          {/* 전화번호 */}
          <div className="form-group">
            <label className="form-label">전화번호</label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="text"
                className="form-input"
                value={areaNo}
                onChange={(e) => setAreaNo(e.target.value)}
                maxLength={4}
                style={{ width: '80px', textAlign: 'center' }}
              />
              <span>-</span>
              <input
                type="text"
                className="form-input"
                value={middleTelno}
                onChange={(e) => setMiddleTelno(e.target.value)}
                maxLength={4}
                style={{ width: '80px', textAlign: 'center' }}
              />
              <span>-</span>
              <input
                type="text"
                className="form-input"
                value={endTelno}
                onChange={(e) => setEndTelno(e.target.value)}
                maxLength={4}
                style={{ width: '80px', textAlign: 'center' }}
              />
            </div>
          </div>

          {/* 휴대폰 / 팩스 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="moblphonNo">핸드폰번호</label>
              <input
                id="moblphonNo"
                type="text"
                className="form-input"
                value={moblphonNo}
                onChange={(e) => setMoblphonNo(e.target.value)}
                placeholder="예: 010-1234-5678"
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="mberFxnum">팩스번호</label>
              <input
                id="mberFxnum"
                type="text"
                className="form-input"
                value={mberFxnum}
                onChange={(e) => setMberFxnum(e.target.value)}
                placeholder="예: 02-1234-5678"
              />
            </div>
          </div>

          {/* 이메일 */}
          <div className="form-group">
            <label className="form-label" htmlFor="mberEmailAdres">이메일주소</label>
            <input
              id="mberEmailAdres"
              type="email"
              className="form-input"
              value={mberEmailAdres}
              onChange={(e) => setMberEmailAdres(e.target.value)}
              placeholder="예: account@domain.com"
            />
          </div>

          {/* 우편번호 & 주소 */}
          <div className="form-group">
            <label className="form-label">우편번호 및 주소</label>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '8px' }}>
              <input
                type="text"
                className="form-input"
                value={zipView}
                readOnly
                placeholder="우편번호"
                style={{ width: '150px', backgroundColor: '#f1f5f9' }}
              />
              <button
                type="button"
                className="btn-search"
                onClick={() => setIsZipModalOpen(true)}
                style={{ width: 'auto', padding: '12px 24px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
              >
                우편번호 검색
              </button>
            </div>
            <input
              type="text"
              className="form-input"
              value={adres}
              readOnly
              placeholder="기본주소"
              style={{ backgroundColor: '#f1f5f9', marginBottom: '8px' }}
            />
            <input
              type="text"
              className="form-input"
              value={detailAdres}
              onChange={(e) => setDetailAdres(e.target.value)}
              placeholder="상세주소를 입력해 주세요"
            />
          </div>

          {/* 그룹 아이디 & 일반회원 상태코드 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="groupId">그룹아이디 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="groupId"
                className="form-input"
                value={groupId}
                onChange={(e) => setGroupId(e.target.value)}
              >
                <option value="">선택하세요</option>
                {groupIdList.map((code) => (
                  <option key={code.code} value={code.code}>{code.codeNm}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="mberSttus">일반회원상태코드 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="mberSttus"
                className="form-input"
                value={mberSttus}
                onChange={(e) => setMberSttus(e.target.value)}
              >
                <option value="">선택하세요</option>
                {mberSttusList.map((code) => (
                  <option key={code.code} value={code.code}>{code.codeNm}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-submit" style={{ width: '160px', padding: '14px', cursor: 'pointer' }}>저장</button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/member')}
              style={{ width: '160px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>

      {/* ID duplication check modal */}
      <IdDplctCnfirm
        isOpen={isIdModalOpen}
        onClose={() => setIsIdModalOpen(false)}
        onSelect={handleIdSelect}
        initialId={mberId}
      />

      {/* Zip code search modal */}
      <CcmZipSearchList
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        onSelect={handleZipSelect}
      />
    </div>
  );
};

export default MberInsert;
