import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '../../../../api/apiClient';
import EgovCcmZipSearchList from '../../sym/zip/EgovCcmZipSearchList';

const EgovMberSelectUpdt: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Common Code States
  const [passwordHintList, setPasswordHintList] = useState<any[]>([]);
  const [sexdstnCodeList, setSexdstnCodeList] = useState<any[]>([]);
  const [mberSttusList, setMberSttusList] = useState<any[]>([]);
  const [groupIdList, setGroupIdList] = useState<any[]>([]);

  // Modal State
  const [isZipModalOpen, setIsZipModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [originalData, setOriginalData] = useState<any>(null);

  // Form States
  const [mberId, setMberId] = useState('');
  const [mberNm, setMberNm] = useState('');
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
  const [uniqId, setUniqId] = useState('');
  const [userTy, setUserTy] = useState('');

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      setLoading(true);
      // Fetch common codes first
      const codeResponse: any = await apiClient.get('/cmm/code/selectMemberCodeDetails.api');
      if (codeResponse.resultCode === 'SUCCESS') {
        const { passwordHintList, sexdstnCodeList, mberSttusList, groupIdList } = codeResponse.result;
        setPasswordHintList(passwordHintList || []);
        setSexdstnCodeList(sexdstnCodeList || []);
        setMberSttusList(mberSttusList || []);
        setGroupIdList(groupIdList || []);
      }

      // Fetch member detail
      const memberResponse: any = await apiClient.get(`/uss/umt/mber/selectMber.api?selectedId=${id}`);
      if (memberResponse.resultCode === 'SUCCESS') {
        const member = memberResponse.result;
        setOriginalData(member);
        applyMemberData(member);
      }
    } catch (error) {
      console.error('데이터 조회 실패', error);
      alert('회원 데이터를 불러오는 중 오류가 발생했습니다.');
      navigate('/admin/member');
    } finally {
      setLoading(false);
    }
  };

  const applyMemberData = (member: any) => {
    setMberId(member.mberId || '');
    setMberNm(member.mberNm || '');
    setPasswordHint(member.passwordHint || '');
    setPasswordCnsr(member.passwordCnsr || '');
    setSexdstnCode(member.sexdstnCode || '');
    setAreaNo(member.areaNo || '');
    setMiddleTelno(member.middleTelno || '');
    setEndTelno(member.endTelno || '');
    setMberFxnum(member.mberFxnum || '');
    setMoblphonNo(member.moblphonNo || '');
    setMberEmailAdres(member.mberEmailAdres || '');
    setZip(member.zip || '');
    setZipView(member.zip ? member.zip.substring(0, 3) + '-' + member.zip.substring(3) : '');
    setAdres(member.adres || '');
    setDetailAdres(member.detailAdres || '');
    setGroupId(member.groupId || '');
    setMberSttus(member.mberSttus || '');
    setUniqId(member.uniqId || '');
    setUserTy(member.userTy || '');
  };

  const handleReset = () => {
    if (originalData) {
      applyMemberData(originalData);
    }
  };

  const handleZipSelect = (selectedZip: string, selectedAddr: string) => {
    setZip(selectedZip.replace('-', ''));
    setZipView(selectedZip);
    setAdres(selectedAddr);
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/uss/umt/mber/deleteMber.api', {
          checkedIdForDel: `${userTy}:${uniqId}`
        });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/admin/member');
        } else {
          alert(response.resultMessage || '삭제 실패');
        }
      } catch (error) {
        console.error('회원 삭제 실패', error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!mberNm) {
      alert('이름을 입력해 주세요.');
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
        uniqId,
        mberId,
        mberNm,
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
        userTy,
      };

      const response: any = await apiClient.post('/uss/umt/mber/updateMber.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('회원 정보가 성공적으로 수정되었습니다.');
        navigate('/admin/member');
      } else {
        alert(response.resultMessage || '수정 실패');
      }
    } catch (error) {
      console.error('회원 정보 수정 에러', error);
      alert('정보 수정 중 에러가 발생했습니다.');
    }
  };

  if (loading) return <div className="container p_main" style={{ textAlign: 'center', padding: '40px' }}>로딩중...</div>;

  return (
    <div className="container p_main" style={{ maxWidth: '800px', margin: '40px auto' }}>
      <div className="page-header" style={{ textAlign: 'center' }}>
        <h2>회원 정보 수정</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>회원 상세 내역 조회 및 정보 변경을 수행합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* 아이디 (Readonly) */}
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
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', flexWrap: 'wrap' }}>
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
              className="btn-secondary"
              onClick={() => navigate(`/admin/member/${uniqId}/password`, { state: { mberId, uniqId } })}
              style={{ width: '130px', padding: '14px', cursor: 'pointer' }}
            >
              암호변경
            </button>
            <button
              type="button"
              className="btn-secondary"
              onClick={handleReset}
              style={{ width: '130px', padding: '14px', cursor: 'pointer' }}
            >
              취소
            </button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/member')}
              style={{ width: '130px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>

      {/* Zip code search modal */}
      <EgovCcmZipSearchList
        isOpen={isZipModalOpen}
        onClose={() => setIsZipModalOpen(false)}
        onSelect={handleZipSelect}
      />
    </div>
  );
};

export default EgovMberSelectUpdt;
