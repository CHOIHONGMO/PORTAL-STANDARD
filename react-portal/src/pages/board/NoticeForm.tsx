import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../pages.css';

const NoticeForm = () => {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      const response: any = await apiClient.get(`/cop/bbs/selectBoardArticle.api?bbsId=BBSMSTR_AAAAAAAAAAAA&nttId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setTitle(response.result.nttSj);
        setContent(response.result.nttCn);
      }
    } catch (error) {
      console.error('상세 조회 실패', error);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = isEdit ? '/cop/bbs/updateBoardArticle.api' : '/cop/bbs/insertBoardArticle.api';
      const payload = {
        bbsId: 'BBSMSTR_AAAAAAAAAAAA',
        nttSj: title,
        nttCn: content,
        ...(isEdit && { nttId: id })
      };

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate('/board/notice');
      } else {
        alert(response.resultMessage || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('저장 실패', error);
      alert('오류가 발생했습니다.');
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>공지사항 {isEdit ? '수정' : '등록'}</h2>
      </div>

      <form onSubmit={handleSave} className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)' }}>
        <table className="data-table" style={{ borderTop: '2px solid var(--text-main)', margin: 0 }}>
          <colgroup>
            <col width="15%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th><label className="form-label" style={{ margin: 0 }}>제목 <span style={{color: 'red'}}>*</span></label></th>
              <td style={{ padding: '12px 16px' }}>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="제목 입력" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required 
                />
              </td>
            </tr>
            <tr>
              <th><label className="form-label" style={{ margin: 0 }}>내용 <span style={{color: 'red'}}>*</span></label></th>
              <td style={{ padding: '12px 16px' }}>
                <textarea 
                  className="form-input" 
                  style={{ minHeight: '300px', resize: 'vertical' }}
                  placeholder="내용을 입력하세요"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  required
                ></textarea>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wrap">
          <button type="button" onClick={() => navigate(-1)} className="btn-secondary">취소</button>
          <button type="submit" className="btn-submit" style={{ width: 'auto', padding: '12px 32px', margin: 0 }}>저장</button>
        </div>
      </form>
    </div>
  );
};

export default NoticeForm;
