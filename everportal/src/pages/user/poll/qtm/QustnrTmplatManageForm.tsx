import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

const QustnrTmplatManageForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [qestnrTmplatTy, setQestnrTmplatTy] = useState('');
  const [qestnrTmplatCn, setQestnrTmplatCn] = useState('');
  const [qestnrTmplatCours, setQestnrTmplatCours] = useState('');
  const [imageVal, setImageVal] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchTmplatDetail();
    }
  }, [id]);

  const fetchTmplatDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/poll/qtm/selectQustnrTmplatManageDetail.api?qestnrTmplatId=${id}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        const data = response.result;
        setQestnrTmplatTy(data.qestnrTmplatTy || '');
        setQestnrTmplatCn(data.qestnrTmplatCn || '');
        setQestnrTmplatCours(data.qestnrTmplatCours || '');
      }
    } catch (error) {
      console.error('템플릿 상세 정보 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageVal(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrTmplatTy.trim()) {
      alert('템플릿 유형을 입력해주세요.');
      return;
    }
    if (!qestnrTmplatCn.trim()) {
      alert('템플릿 설명을 입력해주세요.');
      return;
    }
    if (!qestnrTmplatCours.trim()) {
      alert('템플릿 파일 경로를 입력해주세요.');
      return;
    }

    try {
      const payload: any = {
        qestnrTmplatTy,
        qestnrTmplatCn,
        qestnrTmplatCours,
      };

      if (imageVal) {
        payload.qestnrTmplatImagepathnmVal = imageVal;
      }

      let url = '/user/poll/qtm/insertQustnrTmplatManage.api';
      if (isEdit) {
        url = '/user/poll/qtm/updateQustnrTmplatManage.api';
        payload.qestnrTmplatId = id;
      }

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/admin/qustnr-tmplat/${id}` : '/admin/qustnr-tmplat');
      } else {
        alert(response.resultMessage || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('템플릿 저장 실패', error);
      alert('저장 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문템플릿 {isEdit ? '수정' : '등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>템플릿 유형 <span className="required">*</span></th>
              <td>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '50%' }}
                  value={qestnrTmplatTy}
                  onChange={(e) => setQestnrTmplatTy(e.target.value)}
                  placeholder="예: 유형1"
                  maxLength={100}
                />
              </td>
            </tr>
            <tr>
              <th>템플릿 이미지</th>
              <td>
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ marginBottom: '8px' }}
                />
                {isEdit && !imageVal && (
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>기존 이미지:</p>
                    <img 
                      src={`/api/uss/olp/qtm/selectQustnrTmplatManageImg.api?qestnrTmplatId=${id}`} 
                      alt="템플릿 이미지" 
                      style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain', border: '1px solid #ddd', padding: '4px' }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  </div>
                )}
                {imageVal && (
                  <div style={{ marginTop: '8px' }}>
                    <p style={{ fontSize: '0.85rem', color: '#666' }}>새 이미지 미리보기:</p>
                    <img 
                      src={imageVal} 
                      alt="새 이미지" 
                      style={{ maxWidth: '200px', maxHeight: '150px', objectFit: 'contain', border: '1px solid #ddd', padding: '4px' }} 
                    />
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <th>템플릿 설명 <span className="required">*</span></th>
              <td>
                <textarea 
                  className="form-input" 
                  style={{ width: '100%', height: '150px', padding: '10px' }}
                  value={qestnrTmplatCn}
                  onChange={(e) => setQestnrTmplatCn(e.target.value)}
                  placeholder="템플릿에 대한 설명을 입력하세요"
                  maxLength={1000}
                />
              </td>
            </tr>
            <tr>
              <th>템플릿 파일 경로 <span className="required">*</span></th>
              <td>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '100%' }}
                  value={qestnrTmplatCours}
                  onChange={(e) => setQestnrTmplatCours(e.target.value)}
                  placeholder="예: template/EgovQustnrRespondInfoDetail.jsp"
                  maxLength={100}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wrap" style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate(isEdit ? `/admin/qustnr-tmplat/${id}` : '/admin/qustnr-tmplat')} 
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

export default QustnrTmplatManageForm;
