import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

const IndvdlInfoPolicyForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [indvdlInfoNm, setIndvdlInfoNm] = useState('');
  const [indvdlInfoYn, setIndvdlInfoYn] = useState('Y');
  const [indvdlInfoDc, setIndvdlInfoDc] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/policy/ipm/selectIndvdlInfoPolicyDetail.api?indvdlInfoId=${id}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        const data = response.result;
        setIndvdlInfoNm(data.indvdlInfoNm || '');
        setIndvdlInfoYn(data.indvdlInfoYn || 'Y');
        setIndvdlInfoDc(data.indvdlInfoDc || '');
      }
    } catch (error) {
      console.error('개인정보보호정책 상세 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!indvdlInfoNm.trim()) {
      alert('개인정보보호정책명을 입력해주세요.');
      return;
    }
    if (!indvdlInfoDc.trim()) {
      alert('개인정보보호정책설명을 입력해주세요.');
      return;
    }

    try {
      const payload: any = {
        indvdlInfoNm,
        indvdlInfoYn,
        indvdlInfoDc,
      };

      let url = '/user/policy/ipm/insertIndvdlInfoPolicy.api';
      if (isEdit) {
        url = '/user/policy/ipm/updateIndvdlInfoPolicy.api';
        payload.indvdlInfoId = id;
      }

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/admin/policy/${id}` : '/admin/policy');
      } else {
        alert(response.resultMessage || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('개인정보보호정책 저장 실패', error);
      alert('저장 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>개인정보보호정책 {isEdit ? '수정' : '등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <colgroup>
            <col width="25%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>개인정보보호정책명 <span className="required">*</span></th>
              <td>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '80%' }}
                  value={indvdlInfoNm}
                  onChange={(e) => setIndvdlInfoNm(e.target.value)}
                  placeholder="정책명을 입력하세요"
                  maxLength={255}
                />
              </td>
            </tr>
            <tr>
              <th>동의여부 <span className="required">*</span></th>
              <td>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="indvdlInfoYn" 
                      value="Y" 
                      checked={indvdlInfoYn === 'Y'} 
                      onChange={(e) => setIndvdlInfoYn(e.target.value)} 
                    />
                    예
                  </label>
                  <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input 
                      type="radio" 
                      name="indvdlInfoYn" 
                      value="N" 
                      checked={indvdlInfoYn === 'N'} 
                      onChange={(e) => setIndvdlInfoYn(e.target.value)} 
                    />
                    아니오
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>개인정보보호정책설명 <span className="required">*</span></th>
              <td>
                <textarea 
                  className="form-input" 
                  style={{ width: '100%', height: '250px', padding: '10px', lineHeight: '1.6' }}
                  value={indvdlInfoDc}
                  onChange={(e) => setIndvdlInfoDc(e.target.value)}
                  placeholder="상세 정책 내용을 작성하세요"
                  maxLength={4000}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wrap" style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate(isEdit ? `/admin/policy/${id}` : '/admin/policy')} 
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

export default IndvdlInfoPolicyForm;
