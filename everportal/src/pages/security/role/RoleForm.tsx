import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';

const RoleForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // 'new' or role code
  const isEdit = !!(id && id !== 'new');

  const [roleCode, setRoleCode] = useState('');
  const [roleNm, setRoleNm] = useState('');
  const [rolePtn, setRolePtn] = useState('');
  const [roleDc, setRoleDc] = useState('');
  const [roleTyp, setRoleTyp] = useState('url'); // default role type
  const [roleSort, setRoleSort] = useState('1');
  const [roleCreatDe, setRoleCreatDe] = useState('');
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
      const res: any = await apiClient.get(`/security/role/selectRole.api?roleCode=${encodeURIComponent(code)}`);
      if (res.resultCode === 'SUCCESS' && res.result) {
        setRoleCode(res.result.roleCode || '');
        setRoleNm(res.result.roleNm || '');
        setRolePtn(res.result.rolePtn || '');
        setRoleDc(res.result.roleDc || '');
        setRoleTyp(res.result.roleTyp || 'url');
        setRoleSort(res.result.roleSort || '1');
        setRoleCreatDe(res.result.roleCreatDe || '');
      } else {
        alert(res.resultMessage || '롤 상세 정보를 불러오지 못했습니다.');
        navigate('/admin/role');
      }
    } catch (e) {
      console.error(e);
      alert('상세 정보 조회 중 오류가 발생했습니다.');
      navigate('/admin/role');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleCode.trim()) { alert('롤코드를 입력하세요.'); return; }
    if (!roleNm.trim()) { alert('롤명을 입력하세요.'); return; }
    if (!rolePtn.trim()) { alert('롤패턴을 입력하세요.'); return; }
    if (!roleSort.trim()) { alert('정렬순서를 입력하세요.'); return; }

    try {
      setSubmitting(true);
      const payload = { roleCode, roleNm, rolePtn, roleDc, roleTyp, roleSort };
      const url = isEdit ? '/security/role/updateRole.api' : '/security/role/insertRole.api';
      
      const res: any = await apiClient.post(url, payload);
      if (res.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate('/admin/role');
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
        <h2>롤 {isEdit ? '수정' : '등록'}</h2>
        <p style={{ color: 'var(--text-muted)', marginTop: '8px' }}>시스템 접근 제어를 위한 롤(Role) 정보를 {isEdit ? '수정' : '등록'}합니다.</p>
      </div>

      <div style={{ background: 'white', padding: '32px', borderRadius: 'var(--radius-lg)', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)', border: '1px solid var(--border-color)', maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>롤코드 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text"
              className="form-input"
              value={roleCode}
              onChange={(e) => setRoleCode(e.target.value)}
              placeholder="예: web-000001"
              disabled={isEdit}
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: isEdit ? '#f3f4f6' : 'white' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>롤명 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text"
              className="form-input"
              value={roleNm}
              onChange={(e) => setRoleNm(e.target.value)}
              placeholder="롤 명칭을 입력하세요"
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>롤 패턴 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="text"
              className="form-input"
              value={rolePtn}
              onChange={(e) => setRolePtn(e.target.value)}
              placeholder="예: /index.do, /admin/**"
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>롤 타입</label>
            <select
              value={roleTyp}
              onChange={(e) => setRoleTyp(e.target.value)}
              className="form-input"
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'white', cursor: 'pointer' }}
            >
              <option value="url">URL</option>
              <option value="method">Method</option>
              <option value="pointcut">Pointcut</option>
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>정렬순서 <span style={{ color: '#dc2626' }}>*</span></label>
            <input
              type="number"
              className="form-input"
              value={roleSort}
              onChange={(e) => setRoleSort(e.target.value)}
              placeholder="우선순위 정렬 순서 (숫자)"
              required
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>설명</label>
            <textarea
              className="form-input"
              value={roleDc}
              onChange={(e) => setRoleDc(e.target.value)}
              placeholder="롤에 대한 설명을 입력하세요"
              rows={4}
              style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}
            />
          </div>

          {isEdit && roleCreatDe && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontWeight: 600, color: 'var(--text-color)' }}>등록일시</label>
              <input
                type="text"
                className="form-input"
                value={roleCreatDe}
                disabled
                style={{ padding: '12px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: '#f3f4f6' }}
              />
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <Link to="/admin/role" className="btn-secondary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '12px 24px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', textDecoration: 'none', color: 'var(--text-color)', fontWeight: 500 }}>
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

export default RoleForm;
