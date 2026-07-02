import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import TemplateInqirePopup from '@/pages/board/com/TemplateInqirePopup';

const BoardMstrRegist: React.FC = () => {
  const navigate = useNavigate();

  // Code lists
  const [typeList, setTypeList] = useState<any[]>([]);
  const [attrbList, setAttrbList] = useState<any[]>([]);

  // Modal State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // Form States
  const [bbsNm, setBbsNm] = useState('');
  const [bbsIntrcn, setBbsIntrcn] = useState('');
  const [bbsTyCode, setBbsTyCode] = useState('');
  const [bbsAttrbCode, setBbsAttrbCode] = useState('');
  const [replyPosblAt, setReplyPosblAt] = useState('N');
  const [fileAtchPosblAt, setFileAtchPosblAt] = useState('N');
  const [posblAtchFileNumber, setPosblAtchFileNumber] = useState('0');
  const [tmplatId, setTmplatId] = useState('');
  const [tmplatNm, setTmplatNm] = useState('');

  useEffect(() => {
    fetchCodes();
  }, []);

  const fetchCodes = async () => {
    try {
      const response: any = await apiClient.get('/board/bbs/selectBBSCodeDetails.api');
      if (response.resultCode === 'SUCCESS') {
        setTypeList(response.result.typeList || []);
        setAttrbList(response.result.attrbList || []);
      }
    } catch (error) {
      console.error('게시판 코드 조회 실패', error);
    }
  };

  const handleTemplateSelect = (id: string, name: string) => {
    setTmplatId(id);
    setTmplatNm(name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bbsNm.trim()) {
      alert('게시판명을 입력해 주세요.');
      return;
    }
    if (!bbsIntrcn.trim()) {
      alert('게시판 소개를 입력해 주세요.');
      return;
    }
    if (!bbsTyCode) {
      alert('게시판 유형을 선택해 주세요.');
      return;
    }
    if (!bbsAttrbCode) {
      alert('게시판 속성을 선택해 주세요.');
      return;
    }
    if (!tmplatId) {
      alert('템플릿을 선택해 주세요.');
      return;
    }

    try {
      const payload = {
        bbsNm,
        bbsIntrcn,
        bbsTyCode,
        bbsAttrbCode,
        replyPosblAt,
        fileAtchPosblAt,
        posblAtchFileNumber: fileAtchPosblAt === 'Y' ? posblAtchFileNumber : '0',
        tmplatId,
      };

      const response: any = await apiClient.post('/board/bbs/insertBBSMasterInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('게시판 마스터가 등록되었습니다.');
        navigate('/admin/board');
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
        <h2>게시판 속성 등록</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>새로운 게시판의 속성 및 정책을 정의합니다.</p>
      </div>

      <div className="glass" style={{ padding: '40px', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', backgroundColor: 'var(--surface-color)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* 게시판명 */}
          <div className="form-group">
            <label className="form-label" htmlFor="bbsNm">게시판명 <span style={{ color: 'red' }}>*</span></label>
            <input
              id="bbsNm"
              type="text"
              className="form-input"
              value={bbsNm}
              onChange={(e) => setBbsNm(e.target.value)}
              placeholder="게시판명을 입력하세요"
              maxLength={255}
            />
          </div>

          {/* 게시판 소개 */}
          <div className="form-group">
            <label className="form-label" htmlFor="bbsIntrcn">게시판 소개 <span style={{ color: 'red' }}>*</span></label>
            <textarea
              id="bbsIntrcn"
              className="form-input"
              value={bbsIntrcn}
              onChange={(e) => setBbsIntrcn(e.target.value)}
              placeholder="게시판 소개내용을 입력하세요"
              rows={4}
              style={{ resize: 'vertical' }}
              maxLength={2000}
            />
          </div>

          {/* 게시판 유형 & 게시판 속성 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="bbsTyCode">게시판 유형 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="bbsTyCode"
                className="form-input"
                value={bbsTyCode}
                onChange={(e) => setBbsTyCode(e.target.value)}
              >
                <option value="">선택하세요</option>
                {typeList.map((code) => (
                  <option key={code.code} value={code.code}>{code.codeNm}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="bbsAttrbCode">게시판 속성 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="bbsAttrbCode"
                className="form-input"
                value={bbsAttrbCode}
                onChange={(e) => setBbsAttrbCode(e.target.value)}
              >
                <option value="">선택하세요</option>
                {attrbList.map((code) => (
                  <option key={code.code} value={code.code}>{code.codeNm}</option>
                ))}
              </select>
            </div>
          </div>

          {/* 답장가능여부 & 템플릿 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="replyPosblAt">답장가능여부 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="replyPosblAt"
                className="form-input"
                value={replyPosblAt}
                onChange={(e) => setReplyPosblAt(e.target.value)}
              >
                <option value="Y">가능</option>
                <option value="N">불가능</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">템플릿 선택 <span style={{ color: 'red' }}>*</span></label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  className="form-input"
                  value={tmplatNm}
                  readOnly
                  placeholder="템플릿을 선택하세요"
                  style={{ flex: 1, backgroundColor: '#f1f5f9' }}
                />
                <button
                  type="button"
                  className="btn-search"
                  onClick={() => setIsTemplateModalOpen(true)}
                  style={{ width: 'auto', padding: '10px 20px', cursor: 'pointer', borderRadius: 'var(--radius-md)' }}
                >
                  선택
                </button>
              </div>
            </div>
          </div>

          {/* 파일첨부가능여부 & 첨부가능파일숫자 */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label" htmlFor="fileAtchPosblAt">파일첨부가능여부 <span style={{ color: 'red' }}>*</span></label>
              <select
                id="fileAtchPosblAt"
                className="form-input"
                value={fileAtchPosblAt}
                onChange={(e) => {
                  setFileAtchPosblAt(e.target.value);
                  if (e.target.value === 'N') setPosblAtchFileNumber('0');
                }}
              >
                <option value="Y">가능</option>
                <option value="N">불가능</option>
              </select>
            </div>
            {fileAtchPosblAt === 'Y' && (
              <div className="form-group">
                <label className="form-label" htmlFor="posblAtchFileNumber">첨부가능파일숫자</label>
                <select
                  id="posblAtchFileNumber"
                  className="form-input"
                  value={posblAtchFileNumber}
                  onChange={(e) => setPosblAtchFileNumber(e.target.value)}
                >
                  <option value="0">0개</option>
                  <option value="1">1개</option>
                  <option value="2">2개</option>
                  <option value="3">3개</option>
                </select>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '20px' }}>
            <button type="submit" className="btn-submit" style={{ width: '160px', padding: '14px', cursor: 'pointer' }}>저장</button>
            <button
              type="button"
              className="btn-home"
              onClick={() => navigate('/admin/board')}
              style={{ width: '160px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>

      <TemplateInqirePopup
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleTemplateSelect}
        typeFlag="BBS"
      />
    </div>
  );
};

export default BoardMstrRegist;
