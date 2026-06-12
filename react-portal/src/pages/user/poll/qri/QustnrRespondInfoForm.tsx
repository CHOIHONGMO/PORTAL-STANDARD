import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import QustnrListPopup from '@/pages/user/poll/qmc/QustnrListPopup';
import QustnrQestnListPopup from '@/pages/user/poll/qqm/QustnrQestnListPopup';
import '@/pages/pages.css';

interface ItemInfo {
  qustnrIemId: string;
  iemCn: string;
}

const QustnrRespondInfoForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [qestnrId, setQestnrId] = useState('');
  const [qestnrSj, setQestnrSj] = useState('');
  const [qestnrTmplatId, setQestnrTmplatId] = useState('');

  const [qestnrQesitmId, setQestnrQesitmId] = useState('');
  const [qestnCn, setQestnCn] = useState('');
  const [qestnTyCode, setQestnTyCode] = useState('1'); // 1: 객관식, 2: 주관식

  const [qustnrIemId, setQustnrIemId] = useState('');
  const [itemList, setItemList] = useState<ItemInfo[]>([]);

  const [respondAnswerCn, setRespondAnswerCn] = useState('');
  const [etcAnswerCn, setEtcAnswerCn] = useState('');
  const [respondNm, setRespondNm] = useState('');

  const [showQustnrPopup, setShowQustnrPopup] = useState(false);
  const [showQestnPopup, setShowQestnPopup] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchDetail();
    }
  }, [id]);

  useEffect(() => {
    if (qestnrQesitmId && qestnTyCode === '1') {
      fetchItemList();
    } else {
      setItemList([]);
      setQustnrIemId('');
    }
  }, [qestnrQesitmId, qestnTyCode]);

  const fetchDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/poll/qri/selectQustnrRespondInfoDetail.api?qestnrQesrspnsId=${id}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        const data = response.result;
        setQestnrId(data.qestnrId || '');
        setQestnrSj(data.qestnrSj || '');
        setQestnrTmplatId(data.qestnrTmplatId || '');
        setQestnrQesitmId(data.qestnrQesitmId || '');
        setQestnCn(data.qestnCn || '');
        setQestnTyCode(data.qestnTyCode || '1');
        setQustnrIemId(data.qustnrIemId || '');
        setRespondAnswerCn(data.respondAnswerCn || '');
        setEtcAnswerCn(data.etcAnswerCn || '');
        setRespondNm(data.respondNm || '');
      }
    } catch (error) {
      console.error('설문응답결과 상세 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchItemList = async () => {
    try {
      const response: any = await apiClient.get(`/user/poll/qim/selectQustnrItemList.api?searchMode=Y&qestnrQesitmId=${qestnrQesitmId}`);
      if (response.resultCode === 'SUCCESS') {
        setItemList(response.resultList || []);
      }
    } catch (error) {
      console.error('설문항목 목록 로드 실패', error);
    }
  };

  const handleQustnrSelect = (qestnrId: string, qestnrSj: string, qestnrTmplatId: string) => {
    setQestnrId(qestnrId);
    setQestnrSj(qestnrSj);
    setQestnrTmplatId(qestnrTmplatId);
    // 설문지가 변경되면 기존의 문항, 항목을 비움
    setQestnrQesitmId('');
    setQestnCn('');
    setQustnrIemId('');
    setItemList([]);
    setShowQustnrPopup(false);
  };

  const fetchQestnDetail = async (qesitmId: string) => {
    try {
      const response: any = await apiClient.get(`/user/poll/qqm/selectQustnrQestnDetail.api?qestnrQesitmId=${qesitmId}`);
      if (response.resultCode === 'SUCCESS' && response.result) {
        setQestnTyCode(response.result.qestnTyCode || '1');
      }
    } catch (error) {
      console.error('설문문항 상세 로드 실패', error);
    }
  };

  const handleQestnSelect = (qestnrQesitmId: string, qestnCn: string) => {
    setQestnrQesitmId(qestnrQesitmId);
    setQestnCn(qestnCn);
    fetchQestnDetail(qestnrQesitmId);
    setQustnrIemId('');
    setShowQestnPopup(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrId) {
      alert('설문지를 선택해주세요.');
      return;
    }
    if (!qestnrQesitmId) {
      alert('설문문항을 선택해주세요.');
      return;
    }
    if (qestnTyCode === '1' && !qustnrIemId) {
      alert('설문항목을 선택해주세요.');
      return;
    }
    if (qestnTyCode === '2' && !respondAnswerCn.trim()) {
      alert('응답자 답변내용을 입력해주세요.');
      return;
    }
    if (!respondNm.trim()) {
      alert('응답자명을 입력해주세요.');
      return;
    }

    try {
      const payload: any = {
        qestnrId,
        qestnrTmplatId,
        qestnrQesitmId,
        qestnTyCode,
        respondNm,
      };

      if (qestnTyCode === '1') {
        payload.qustnrIemId = qustnrIemId;
        payload.etcAnswerCn = etcAnswerCn;
        payload.respondAnswerCn = '';
      } else {
        payload.qustnrIemId = null;
        payload.etcAnswerCn = '';
        payload.respondAnswerCn = respondAnswerCn;
      }

      let url = '/user/poll/qri/insertQustnrRespondInfo.api';
      if (isEdit) {
        url = '/user/poll/qri/updateQustnrRespondInfo.api';
        payload.qestnrQesrspnsId = id;
      }

      const response: any = await apiClient.post(url, payload);
      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정되었습니다.' : '등록되었습니다.');
        navigate(isEdit ? `/admin/qustnr-respond-info/${id}` : '/admin/qustnr-respond-info');
      } else {
        alert(response.resultMessage || '저장에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문응답결과 저장 실패', error);
      alert('저장 처리 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문응답결과 {isEdit ? '수정' : '등록'}</h2>
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
              <th>설문문항선택 <span className="required">*</span></th>
              <td>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input 
                    type="text" 
                    className="form-input" 
                    style={{ width: '60%' }}
                    value={qestnCn}
                    readOnly
                    placeholder="설문문항을 선택하세요"
                  />
                  <button 
                    type="button" 
                    onClick={() => {
                      if (!qestnrId) {
                        alert('설문지를 먼저 선택해주세요.');
                        return;
                      }
                      setShowQestnPopup(true);
                    }} 
                    className="btn btn_blue_30"
                  >
                    설문문항 검색
                  </button>
                </div>
              </td>
            </tr>
            <tr>
              <th>문항유형</th>
              <td>
                <span style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                  {qestnTyCode === '1' ? '객관식' : '주관식'}
                </span>
              </td>
            </tr>
            {qestnTyCode === '1' ? (
              <>
                <tr>
                  <th>설문항목 <span className="required">*</span></th>
                  <td>
                    <select
                      className="form-input"
                      style={{ width: '50%' }}
                      value={qustnrIemId}
                      onChange={(e) => setQustnrIemId(e.target.value)}
                    >
                      <option value="">선택하세요</option>
                      {itemList.map(item => (
                        <option key={item.qustnrIemId} value={item.qustnrIemId}>
                          {item.iemCn}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
                <tr>
                  <th>기타 답변내용</th>
                  <td>
                    <input 
                      type="text" 
                      className="form-input" 
                      style={{ width: '100%' }}
                      value={etcAnswerCn}
                      onChange={(e) => setEtcAnswerCn(e.target.value)}
                      placeholder="기타 답변이 필요한 경우 입력하세요"
                      maxLength={1000}
                    />
                  </td>
                </tr>
              </>
            ) : (
              <tr>
                <th>응답자 답변내용 <span className="required">*</span></th>
                <td>
                  <textarea 
                    className="form-input" 
                    style={{ width: '100%', height: '120px', padding: '10px' }}
                    value={respondAnswerCn}
                    onChange={(e) => setRespondAnswerCn(e.target.value)}
                    placeholder="응답 내용을 작성하세요"
                    maxLength={1000}
                  />
                </td>
              </tr>
            )}
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
          </tbody>
        </table>

        <div className="btn-wrap" style={{ marginTop: '20px' }}>
          <button 
            type="button" 
            onClick={() => navigate(isEdit ? `/admin/qustnr-respond-info/${id}` : '/admin/qustnr-respond-info')} 
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

      {showQestnPopup && (
        <QustnrQestnListPopup 
          isOpen={showQestnPopup}
          qestnrId={qestnrId}
          onClose={() => setShowQestnPopup(false)} 
          onSelect={handleQestnSelect} 
        />
      )}
    </div>
  );
};

export default QustnrRespondInfoForm;
