import { useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../pages.css';

const QnaPasswordConfirm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'edit'; // edit or delete

  const [writngPassword, setWritngPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!writngPassword.trim()) {
      alert('비밀번호를 입력하세요.');
      return;
    }

    try {
      setLoading(true);
      const response: any = await apiClient.post('/uss/olh/qna/confirmQnaPassword.api', {
        qaId: id,
        writngPassword,
      });

      if (response.resultCode === 'SUCCESS') {
        if (mode === 'edit') {
          // 수정 모드인 경우 수정 화면으로 이동
          navigate(`/qna/${id}/edit`);
        } else if (mode === 'delete') {
          // 삭제 모드인 경우 여기서 즉시 삭제 진행
          if (window.confirm('정말 삭제하시겠습니까?')) {
            const delResponse: any = await apiClient.post('/uss/olh/qna/deleteQna.api', {
              qaId: id,
            });
            if (delResponse.resultCode === 'SUCCESS') {
              alert('삭제가 완료되었습니다.');
              navigate('/qna');
            } else {
              alert(delResponse.resultMessage || '삭제에 실패했습니다.');
            }
          }
        }
      } else {
        alert(response.resultMessage || '비밀번호가 일치하지 않습니다.');
      }
    } catch (error) {
      console.error('비밀번호 검증 오류', error);
      alert('비밀번호 검증 실패');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p_main" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
      <div className="glass" style={{ width: '100%', maxWidth: '450px', padding: '30px', borderRadius: '12px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.05)' }}>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)', textAlign: 'center' }}>작성 비밀번호 확인</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '24px', textAlign: 'center' }}>
          작성 시 설정한 글의 비밀번호를 입력해주십시오.
        </p>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
            <label htmlFor="confirmPassword" style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)' }}>글 비밀번호</label>
            <input 
              type="password" 
              id="confirmPassword" 
              className="f_txt w_full" 
              value={writngPassword} 
              onChange={(e) => setWritngPassword(e.target.value)}
              placeholder="비밀번호 입력"
              style={{ padding: '12px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit" 
              className="btn btn_blue_46" 
              style={{ flex: 1, height: '46px', cursor: 'pointer' }}
              disabled={loading}
            >
              {loading ? '확인 중...' : '확인'}
            </button>
            <button 
              type="button" 
              onClick={() => navigate(`/qna/${id}`)}
              className="btn btn_skyblue_h46" 
              style={{ flex: 1, height: '46px', cursor: 'pointer' }}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QnaPasswordConfirm;
