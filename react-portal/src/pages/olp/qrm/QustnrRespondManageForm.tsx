import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import QustnrListPopup from '../qmc/QustnrListPopup';
import '../../pages.css';

interface CodeDetail {
  code: string;
  codeNm: string;
}

const QustnrRespondManageForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [qestnrId, setQestnrId] = useState('');
  const [qestnrSj, setQestnrSj] = useState('');
  const [qestnrTmplatId, setQestnrTmplatId] = useState('');

  const [respondNm, setRespondNm] = useState('');
  const [sexdstnCode, setSexdstnCode] = useState('');
  const [occpTyCode, setOccpTyCode] = useState('');
  const [brthYear, setBrthYear] = useState('');
  const [brthMonth, setBrthMonth] = useState('');
  const [brthDay, setBrthDay] = useState('');

  const [sexCodeList, setSexCodeList] = useState<CodeDetail[]>([]);
  const [jobCodeList, setJobCodeList] = useState<CodeDetail[]>([]);
  const [showQustnrPopup, setShowQustnrPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCodes();
  }, []);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id]);

  const fetchCodes = async () => {
    try {
      const [sexRes, jobRes]: any[] = await Promise.all([
        apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM014'),
        apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM034')
      ]);
      if (sexRes.resultCode === 'SUCCESS') setSexCodeList(sexRes.resultList || []);
      if (jobRes.resultCode === 'SUCCESS') setJobCodeList(jobRes.resultList || []);
    } catch (error) {
      console.error('공통코드 로드 실패', error);
    }
  };

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/olp/qrm/selectQustnrRespondManageDetail.api?qestnrRespondId=${id}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        const data = response.result;
        setQestnrId(data.qestnrId || '');
        setQestnrSj(data.qestnrSj || '');
        setQestnrTmplatId(data.qestnrTmplatId || '');
        setRespondNm(data.respondNm || '');
        setSexdstnCode(data.sexdstnCode || '');
        setOccpTyCode(data.occpTyCode || '');

        const bStr = data.brth || '';
        if (bStr.length === 8) {
          setBrthYear(bStr.substring(0, 4));
          setBrthMonth(bStr.substring(4, 6));
          setBrthDay(bStr.substring(6, 8));
        }
      }
    } catch (error) {
      console.error('설문응답자정보 상세 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQustnrSelect = (qestnrId: string, qestnrSj: string, qestnrTmplatId: string) => {
    setQestnrId(qestnrId);
    setQestnrSj(qestnrSj);
    setQestnrTmplatId(qestnrTmplatId);
    setShowQustnrPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrId) {
      alert('설문지를 선택해주세요.');
      return;
    }
    if (!respondNm.trim()) {
      alert('응답자명을 입력해주세요.');
      return;
    }
    if (!sexdstnCode) {
      alert('성별을 선택해주세요.');
      return;
    }
    if (!occpTyCode) {
      alert('직업을 선택해주세요.');
      return;
    }
    if (!brthYear || !brthMonth || !brthDay) {
      alert('생년월일을 입력해주세요.');
      return;
    }

    const brth = `${brthYear}${brthMonth.padStart(2, '0')}${brthDay.padStart(2, '0')}`;

    try {
      const payload: any = {
        qestnrId,
        qestnrTmplatId,
        respondNm,
        sexdstnCode,
        occpTyCode,
        brth,
      };

      let url = '/uss/olp/qrm/insertQustnrRespondManage.api';
      if (isEdit) {
        url = '/uss/olp/qrm/updateQustnrRespondManage.api';
        payload.qestnrRespondId = id;
      }

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/admin/qustnr-respond-manage/${id}` : '/admin/qustnr-respond-manage');
      } else {
        alert(response.resultMessage || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('응답자 정보 저장 실패', error);
      alert('저장 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문응답자정보 {isEdit ? '수정' : '등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <table className="form-table">
          <colgroup>
            <col width="20%" />
            <col width="*" />
          </colgroup>
          <tbody>
            <tr>
              <th>설문지선택 <span className="required">*</span></th>
              <td>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ width: '60%' }}
                    value={qestnrSj}
                    readOnly
                    placeholder="설문지를 선택하세요"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowQustnrPopup(true)} 
                    className="btn btn_blue_30"
                  >
                    설문지 검색
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th>응답자명 <span className="required">*</span></th>
              <td>
                <input 
                  type="text" 
                  className="form-input" 
                  style={{ width: '30%' }}
                  value={respondNm}
                  onChange={(e) => setRespondNm(e.target.value)}
                  placeholder="응답자 이름"
                  maxLength={50}
                />
              </td>
            </tr>
            <tr>
              <th>성별 <span className="required">*</span></th>
              <td>
                <select
                  className="form-input"
                  style={{ width: '30%' }}
                  value={sexdstnCode}
                  onChange={(e) => setSexdstnCode(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {sexCodeList.map(item => (
                    <option key={item.code} value={item.code}>
                      {item.codeNm}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>직업 <span className="required">*</span></th>
              <td>
                <select
                  className="form-input"
                  style={{ width: '30%' }}
                  value={occpTyCode}
                  onChange={(e) => setOccpTyCode(e.target.value)}
                >
                  <option value="">선택하세요</option>
                  {jobCodeList.map(item => (
                    <option key={item.code} value={item.code}>
                      {item.codeNm}
                    </option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <th>생년월일 <span className="required">*</span></th>
              <td>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="number" 
                    className="form-input" 
                    style={{ width: '80px' }}
                    value={brthYear}
                    onChange={(e) => setBrthYear(e.target.value)}
                    placeholder="년 (4자리)"
                    maxLength={4}
                  />
                  <span>년</span>
                  <input 
                    type="number" 
                    className="form-input" 
                    style={{ width: '60px' }}
                    value={brthMonth}
                    onChange={(e) => setBrthMonth(e.target.value)}
                    placeholder="월"
                    maxLength={2}
                  />
                  <span>월</span>
                  <input 
                    type="number" 
                    className="form-input" 
                    style={{ width: '60px' }}
                    value={brthDay}
                    onChange={(e) => setBrthDay(e.target.value)}
                    placeholder="일"
                    maxLength={2}
                  />
                  <span>일</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="btn-wrap" style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate(isEdit ? `/admin/qustnr-respond-manage/${id}` : '/admin/qustnr-respond-manage')} 
            className="btn-back"
          >
            취소
          </button>
          <button type="submit" className="btn-submit" style={{ width: 'auto', padding: '10px 24px' }}>
            저장
          </button>
        </div>
      </form>

      {showQustnrPopup && (
        <QustnrListPopup 
          isOpen={showQustnrPopup}
          onClose={() => setShowQustnrPopup(false)} 
          onSelect={handleQustnrSelect} 
        />
      )}
    </div>
  );
};

export default QustnrRespondManageForm;
