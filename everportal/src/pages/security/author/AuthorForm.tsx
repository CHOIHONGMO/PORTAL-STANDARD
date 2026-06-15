import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const AuthorForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 'new' or authority code
  const isEdit = !!(id && id !== 'new');

  const [authorCode, setAuthorCode] = useState('');
  const [authorNm, setAuthorNm] = useState('');
  const [authorDc, setAuthorDc] = useState('');
  const [authorCreatDe, setAuthorCreatDe] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      fetchDetail(id);
    }
  }, [isEdit, id]);

  const fetchDetail = async (code: string) => {
    try {
      setLoading(true);
      const res: any = await apiClient.get(`/security/author/selectAuthor.api?authorCode=${encodeURIComponent(code)}`);
      if (res.resultCode === 'SUCCESS' && res.result) {
        setAuthorCode(res.result.authorCode || '');
        setAuthorNm(res.result.authorNm || '');
        setAuthorDc(res.result.authorDc || '');
        setAuthorCreatDe(res.result.authorCreatDe || '');
      } else {
        alert(res.resultMessage || '권한 상세 정보를 불러오지 못했습니다.');
        navigate('/admin/author');
      }
    } catch (e) {
      console.error(e);
      alert('상세 정보 조회 중 오류가 발생했습니다.');
      navigate('/admin/author');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorCode.trim()) { alert('권한코드를 입력하세요.'); return; }
    if (!authorNm.trim()) { alert('권한명을 입력하세요.'); return; }

    try {
      setSubmitting(true);
      const payload = { authorCode, authorNm, authorDc };
      const url = isEdit ? '/security/author/updateAuthor.api' : '/security/author/insertAuthor.api';
      
      const res: any = await apiClient.post(url, payload);
      if (res.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate('/admin/author');
      } else {
        alert(res.resultMessage || '저장에 실패했습니다.');
      }
    } catch (e) {
      console.error(e);
      alert('저장 중 오류가 발생했습니다.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px' }}>
        <h3>데이터를 불러오는 중입니다...</h3>
      </div>
    );
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>권한 {isEdit ? '수정' : '등록'}</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>시스템 접근 권한 정보를 {isEdit ? '수정' : '등록'}합니다.</p>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid var(--border-color)', maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>권한코드 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text"
              className="form-input"
              value={authorCode}
              onChange={(e) => setAuthorCode(e.target.value)}
              placeholder="예: ROLE_USER, ROLE_ADMIN"
              disabled={isEdit}
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: isEdit ? '#f3f4f6' : 'white' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>권한명 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text"
              className="form-input"
              value={authorNm}
              onChange={(e) => setAuthorNm(e.target.value)}
              placeholder="권한의 직관적인 명칭을 입력하세요"
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>설명</label>
            <textarea
              className="form-input"
              value={authorDc}
              onChange={(e) => setAuthorDc(e.target.value)}
              placeholder="권한에 대한 상세 설명을 입력하세요"
              rows={4}
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}
            />
          </div>

          {isEdit && authorCreatDe && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>등록일시</label>
              <input
                type="text"
                className="form-input"
                value={authorCreatDe}
                disabled
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#f3f4f6' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Link to="/admin/author" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-color)', fontWeight: 500 }}>
              취소
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="btn-submit"
              style={{ padding: '12px 32px', borderRadius: 'var(--radius-md)', border: 'none', backgroundColor: 'var(--primary-color)', color: 'white', fontWeight: 600, cursor: submitting ? 'not-allowed' : 'pointer', transition: 'all 0.2s', width: 'auto', marginTop: 0 }}
            >
              {submitting ? '저장 중...' : '저장'}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AuthorForm;
