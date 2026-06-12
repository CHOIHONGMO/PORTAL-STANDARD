import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import QustnrListPopup from '../qmc/QustnrListPopup';
import QustnrQestnListPopup from '../qqm/QustnrQestnListPopup';
import '../../pages.css';

const QustnrItemForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;

  const [qestnrId, setQestnrId] = useState('');
  const [qestnrSj, setQestnrSj] = useState('');
  const [qestnrTmplatId, setQestnrTmplatId] = useState('');
  const [qestnrQesitmId, setQestnrQesitmId] = useState('');
  const [qestnCn, setQestnCn] = useState('');

  const [iemSeq, setIemSeq] = useState<number>(1);
  const [iemCn, setIemCn] = useState('');
  const [etcAnswerAt, setEtcAnswerAt] = useState('N');

  const [isQustnrPopupOpen, setIsQustnrPopupOpen] = useState(false);
  const [isQestnPopupOpen, setIsQestnPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initForm();
  }, [id]);

  const initForm = async () => {
    try {
      setLoading(true);
      if (isEdit) {
        const detailRes: any = await apiClient.get(`/uss/olp/qim/selectQustnrItemDetail.api?qustnrIemId=${id}`);
        if (detailRes.resultCode === 'SUCCESS') {
          const detail = detailRes.result;
          setQestnrId(detail.qestnrId || '');
          setQestnrSj(detail.qestnrSj || '');
          setQestnrQesitmId(detail.qestnrQesitmId || '');
          setQestnCn(detail.qestnCn || '');
          setIemSeq(detail.iemSeq || 1);
          setIemCn(detail.iemCn || '');
          setEtcAnswerAt(detail.etcAnswerAt || 'N');
        }
      } else {
        const paramQestnrId = searchParams.get('qestnrId') || '';
        const paramQesitmId = searchParams.get('qestnrQesitmId') || '';
        
        if (paramQestnrId) {
          const qustnrRes: any = await apiClient.get(`/uss/olp/qmc/selectQustnrDetail.api?qestnrId=${paramQestnrId}`);
          if (qustnrRes.resultCode === 'SUCCESS') {
            setQestnrId(qustnrRes.result.qestnrId);
            setQestnrSj(qustnrRes.result.qestnrSj);
            setQestnrTmplatId(qustnrRes.result.qestnrTmplatId);
          }
        }
        if (paramQesitmId) {
          const qestnRes: any = await apiClient.get(`/uss/olp/qqm/selectQustnrQestnDetail.api?qestnrQesitmId=${paramQesitmId}`);
          if (qestnRes.resultCode === 'SUCCESS') {
            setQestnrQesitmId(qestnRes.result.qestnrQesitmId);
            setQestnCn(qestnRes.result.qestnCn);
          }
        }
      }
    } catch (error) {
      console.error('설문항목 폼 데이터 초기화 에러', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrId) return alert('설문지는 필수 선택 항목입니다.');
    if (!qestnrQesitmId) return alert('설문문항은 필수 선택 항목입니다.');
    if (!iemSeq) return alert('항목순번은 필수 입력 항목입니다.');
    if (!iemCn.trim()) return alert('항목내용은 필수 입력 항목입니다.');

    try {
      setLoading(true);
      const payload = {
        qustnrIemId: id || '',
        qestnrId,
        qestnrQesitmId,
        qestnrTmplatId,
        iemSeq,
        iemCn,
        etcAnswerAt,
      };

      const url = isEdit ? '/uss/olp/qim/updateQustnrItem.api' : '/uss/olp/qim/insertQustnrItem.api';
      const response: any = await apiClient.post(url, payload);

      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정이 완료되었습니다.' : '설문항목이 등록되었습니다.');
        navigate(`/admin/qustnr-item?qestnrQesitmId=${qestnrQesitmId}&qestnrId=${qestnrId}`);
      } else {
        alert(response.resultMessage || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문항목 저장 실패', error);
      alert('서버 저장 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQustnr = (selectedId: string, selectedSj: string, tmplatId: string) => {
    setQestnrId(selectedId);
    setQestnrSj(selectedSj);
    setQestnrTmplatId(tmplatId);
    // 설문지가 바뀌면 문항도 초기화
    setQestnrQesitmId('');
    setQestnCn('');
    setIsQustnrPopupOpen(false);
  };

  const handleSelectQestn = (selectedId: string, selectedCn: string) => {
    setQestnrQesitmId(selectedId);
    setQestnCn(selectedCn);
    setIsQestnPopupOpen(false);
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>{isEdit ? '설문항목 내용수정' : '설문항목 내용등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="board_view2">
          <table>
            <caption>설문항목 입력 폼</caption>
            <colgroup>
              <col style={{ width: '190px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="lb">
                  설문지
                  <span className="req">필수</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      className="f_txt w_half" 
                      readOnly 
                      value={qestnrSj}
                      placeholder="설문지를 선택하세요"
                    />
                    {!isEdit && (
                      <button 
                        type="button" 
                        className="btn btn_blue_46" 
                        onClick={() => setIsQustnrPopupOpen(true)}
                        style={{ height: '46px', width: '100px', padding: 0 }}
                      >
                        설문지 선택
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  설문문항
                  <span className="req">필수</span>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <input 
                      type="text" 
                      className="f_txt w_half" 
                      readOnly 
                      value={qestnCn}
                      placeholder="문항을 선택하세요"
                    />
                    {!isEdit && (
                      <button 
                        type="button" 
                        className="btn btn_blue_46" 
                        onClick={() => {
                          if (!qestnrId) {
                            alert('설문지를 먼저 선택해주세요.');
                            return;
                          }
                          setIsQestnPopupOpen(true);
                        }}
                        style={{ height: '46px', width: '100px', padding: 0 }}
                      >
                        문항 선택
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="iemSeq">항목순번</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="number" 
                    id="iemSeq" 
                    className="f_txt w_80" 
                    min={1}
                    value={iemSeq}
                    onChange={(e) => setIemSeq(Number(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="iemCn">항목내용</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <textarea 
                    id="iemCn" 
                    className="f_txtar w_full h_100" 
                    value={iemCn}
                    onChange={(e) => setIemCn(e.target.value)}
                    placeholder="선택지 항목내용 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  기타답변여부
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '15px' }}>
                    <label style={{ cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="etcAnswerAt" 
                        value="Y" 
                        checked={etcAnswerAt === 'Y'} 
                        onChange={() => setEtcAnswerAt('Y')} 
                        style={{ marginRight: '6px' }}
                      />
                      사용
                    </label>
                    <label style={{ cursor: 'pointer' }}>
                      <input 
                        type="radio" 
                        name="etcAnswerAt" 
                        value="N" 
                        checked={etcAnswerAt === 'N'} 
                        onChange={() => setEtcAnswerAt('N')} 
                        style={{ marginRight: '6px' }}
                      />
                      미사용
                    </label>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="board_view_bot" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
          <button 
            type="submit" 
            className="btn btn_blue_46" 
            style={{ width: '100px', cursor: 'pointer' }}
            disabled={loading}
          >
            {loading ? '저장중...' : '저장'}
          </button>
          <Link 
            to={isEdit ? `/admin/qustnr-item/${id}` : `/admin/qustnr-item?qestnrQesitmId=${qestnrQesitmId}&qestnrId=${qestnrId}`} 
            className="btn btn_blue_46" 
            style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
          >
            취소
          </Link>
        </div>
      </form>

      <QustnrListPopup 
        isOpen={isQustnrPopupOpen}
        onClose={() => setIsQustnrPopupOpen(false)}
        onSelect={handleSelectQustnr}
      />

      <QustnrQestnListPopup 
        isOpen={isQestnPopupOpen}
        onClose={() => setIsQestnPopupOpen(false)}
        onSelect={handleSelectQestn}
        qestnrId={qestnrId}
      />
    </div>
  );
};

export default QustnrItemForm;
