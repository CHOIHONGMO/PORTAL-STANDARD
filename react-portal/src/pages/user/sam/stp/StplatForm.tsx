import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

const StplatForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [useStplatNm, setUseStplatNm] = useState('');
  const [useStplatCn, setUseStplatCn] = useState('');
  const [infoProvdAgreCn, setInfoProvdAgreCn] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/sam/stp/selectStplatDetail.api?useStplatId=${id}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        const data = response.result;
        setUseStplatNm(data.useStplatNm || '');
        setUseStplatCn(data.useStplatCn || '');
        setInfoProvdAgreCn(data.infoProvdAgreCn || '');
      }
    } catch (error) {
      console.error('이용약관 상세 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!useStplatNm.trim()) {
      alert('이용약관명을 입력해주세요.');
      return;
    }
    if (!useStplatCn.trim()) {
      alert('이용약관내용을 입력해주세요.');
      return;
    }

    try {
      const payload: any = {
        useStplatNm,
        useStplatCn,
        infoProvdAgreCn,
      };

      let url = '/uss/sam/stp/insertStplatCn.api';
      if (isEdit) {
        url = '/uss/sam/stp/updateStplatCn.api';
        payload.useStplatId = id;
      }

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/admin/stplat/${id}` : '/admin/stplat');
      } else {
        alert(response.resultMessage || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('이용약관 저장 실패', error);
      alert('저장 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>이용약관 {isEdit ? '수정' : '등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>이용약관명 <span className="required">*</span></th>
              <td>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '80%' }}
                  value={useStplatNm}
                  onChange={(e) => setUseStplatNm(e.target.value)}
                  placeholder="이용약관명을 입력하세요"
                  maxLength={255}
                />
              </td>
            </tr>
            <tr>
              <th>이용약관내용 <span className="required">*</span></th>
              <td>
                <textarea 
                  className="form-input" 
                  style={{ width: '100%', height: '200px', padding: '10px', lineHeight: '1.6' }}
                  value={useStplatCn}
                  onChange={(e) => setUseStplatCn(e.target.value)}
                  placeholder="이용약관 내용을 작성하세요"
                  maxLength={4000}
                />
              </td>
            </tr>
            <tr>
              <th>정보제공동의내용</th>
              <td>
                <textarea 
                  className="form-input" 
                  style={{ width: '100%', height: '150px', padding: '10px', lineHeight: '1.6' }}
                  value={infoProvdAgreCn}
                  onChange={(e) => setInfoProvdAgreCn(e.target.value)}
                  placeholder="정보제공동의 내용을 작성하세요"
                  maxLength={4000}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wrap" style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate(isEdit ? `/admin/stplat/${id}` : '/admin/stplat')} 
            className="btn-back"
          >
            취소
          </button>
          <button type="submit" className="btn-submit" style={{ width: 'auto', padding: '10px 24px' }}>
            저장
          </button>
        </div>
      </form>
    </div>
  );
};

export default StplatForm;
