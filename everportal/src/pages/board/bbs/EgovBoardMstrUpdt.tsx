import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import EgovTemplateInqirePopup from '@/pages/board/com/EgovTemplateInqirePopup';

const EgovBoardMstrUpdt: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Modal State
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Form States
  const [bbsId, setBbsId] = useState('');
  const [bbsNm, setBbsNm] = useState('');
  const [bbsIntrcn, setBbsIntrcn] = useState('');
  const [bbsTyCode, setBbsTyCode] = useState('');
  const [bbsTyCodeNm, setBbsTyCodeNm] = useState('');
  const [bbsAttrbCode, setBbsAttrbCode] = useState('');
  const [bbsAttrbCodeNm, setBbsAttrbCodeNm] = useState('');
  const [replyPosblAt, setReplyPosblAt] = useState('N');
  const [fileAtchPosblAt, setFileAtchPosblAt] = useState('N');
  const [posblAtchFileNumber, setPosblAtchFileNumber] = useState('0');
  const [tmplatId, setTmplatId] = useState('');
  const [tmplatNm, setTmplatNm] = useState('');

  useEffect(() => {
    fetchDetail();
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/cop/bbs/SelectBBSMasterInf.api?bbsId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        const board = response.result;
        setBbsId(board.bbsId || '');
        setBbsNm(board.bbsNm || '');
        setBbsIntrcn(board.bbsIntrcn || '');
        setBbsTyCode(board.bbsTyCode || '');
        setBbsTyCodeNm(board.bbsTyCodeNm || '');
        setBbsAttrbCode(board.bbsAttrbCode || '');
        setBbsAttrbCodeNm(board.bbsAttrbCodeNm || '');
        setReplyPosblAt(board.replyPosblAt || 'N');
        setFileAtchPosblAt(board.fileAtchPosblAt || 'N');
        setPosblAtchFileNumber(board.posblAtchFileNumber || '0');
        setTmplatId(board.tmplatId || '');
        setTmplatNm(board.tmplatNm || '');
      }
    } catch (error) {
      console.error('상세 정보 조회 실패', error);
      alert('게시판 정보를 불러오지 못했습니다.');
      navigate('/admin/board');
    } finally {
      setLoading(false);
    }
  };

  const handleTemplateSelect = (id: string, name: string) => {
    setTmplatId(id);
    setTmplatNm(name);
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/board/bbs/DeleteBBSMasterInf.api', { bbsId });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제되었습니다.');
          navigate('/admin/board');
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

    if (!bbsNm.trim()) {
      alert('게시판명을 입력해 주세요.');
      return;
    }
    if (!bbsIntrcn.trim()) {
      alert('게시판 소개를 입력해 주세요.');
      return;
    }
    if (!tmplatId) {
      alert('템플릿을 선택해 주세요.');
      return;
    }

    try {
      const payload = {
        bbsId,
        bbsNm,
        bbsIntrcn,
        bbsTyCode,
        bbsAttrbCode,
        replyPosblAt,
        fileAtchPosblAt,
        posblAtchFileNumber: fileAtchPosblAt === 'Y' ? posblAtchFileNumber : '0',
        tmplatId,
      };

      const response: any = await apiClient.post('/board/bbs/UpdateBBSMasterInf.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('게시판 정보가 수정되었습니다.');
        navigate('/admin/board');
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
        <h2>게시판 속성 수정</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>게시판 설정을 편집하고 업데이트합니다.</p>
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

          {/* 게시판 유형 & 게시판 속성 (Read-only text) */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div className="form-group">
              <label className="form-label">게시판 유형</label>
              <input
                type="text"
                className="form-input"
                value={bbsTyCodeNm}
                readOnly
                style={{ backgroundColor: '#f1f5f9' }}
              />
            </div>
            <div className="form-group">
              <label className="form-label">게시판 속성</label>
              <input
                type="text"
                className="form-input"
                value={bbsAttrbCodeNm}
                readOnly
                style={{ backgroundColor: '#f1f5f9' }}
              />
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
              onClick={() => navigate('/admin/board')}
              style={{ width: '130px', padding: '14px', cursor: 'pointer' }}
            >
              목록
            </button>
          </div>
        </form>
      </div>

      <EgovTemplateInqirePopup
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onSelect={handleTemplateSelect}
        typeFlag="BBS"
      />
    </div>
  );
};

export default EgovBoardMstrUpdt;
