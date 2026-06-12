import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import QustnrListPopup from '@/pages/user/poll/qmc/QustnrListPopup';
import '@/pages/pages.css';

interface CmmCode {
  code: string;
  codeNm: string;
}

const QustnrQestnForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isEdit = !!id;

  const [qestnrId, setQestnrId] = useState('');
  const [qestnrSj, setQestnrSj] = useState('');
  const [qestnrTmplatId, setQestnrTmplatId] = useState('');
  const [qestnSeq, setQestnSeq] = useState<number>(1);
  const [qestnTyCode, setQestnTyCode] = useState('1'); // 기본 객관식 (1)
  const [qestnCn, setQestnCn] = useState('');
  const [mxmmAnswerCo, setMxmmAnswerCo] = useState<number>(1);

  const [qestnTypeCodes, setQestnTypeCodes] = useState<CmmCode[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initForm();
  }, [id]);

  const initForm = async () => {
    try {
      setLoading(true);
      // 1. 공통코드 가져오기
      const codeRes: any = await apiClient.get('/user/poll/cmm/selectCmmCode.api?codeId=COM018');
      if (codeRes.resultCode === 'SUCCESS') {
        setQestnTypeCodes(codeRes.resultList || []);
      }

      // 2. 수정모드 로드
      if (isEdit) {
        const detailRes: any = await apiClient.get(`/user/poll/qqm/selectQustnrQestnDetail.api?qestnrQesitmId=${id}`);
        if (detailRes.resultCode === 'SUCCESS') {
          const detail = detailRes.result;
          setQestnrId(detail.qestnrId || '');
          setQestnrSj(detail.qestnrSj || '');
          setQestnrTmplatId(detail.qestnrTmplatId || '');
          setQestnSeq(detail.qestnSeq || 1);
          setQestnTyCode(detail.qestnTyCode || '1');
          setQestnCn(detail.qestnCn || '');
          setMxmmAnswerCo(detail.mxmmAnswerCo || 1);
        }
      } else {
        // 3. 쿼리파람의 qestnrId 로드
        const paramId = searchParams.get('qestnrId') || '';
        if (paramId) {
          const qustnrDetailRes: any = await apiClient.get(`/user/poll/qmc/selectQustnrDetail.api?qestnrId=${paramId}`);
          if (qustnrDetailRes.resultCode === 'SUCCESS') {
            setQestnrId(qustnrDetailRes.result.qestnrId);
            setQestnrSj(qustnrDetailRes.result.qestnrSj);
            setQestnrTmplatId(qustnrDetailRes.result.qestnrTmplatId);
          }
        }
      }
    } catch (error) {
      console.error('설문문항 초기화 에러', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrId) return alert('설문지는 필수 선택 항목입니다.');
    if (!qestnSeq) return alert('질문순번은 필수 입력 항목입니다.');
    if (!qestnCn.trim()) return alert('질문내용은 필수 입력 항목입니다.');
    if (!qestnTyCode) return alert('질문유형은 필수 선택 항목입니다.');
    if (qestnTyCode === '1' && !mxmmAnswerCo) return alert('최대선택개수는 필수 입력 항목입니다.');

    try {
      setLoading(true);
      const payload = {
        qestnrQesitmId: id || '',
        qestnrId,
        qestnrTmplatId,
        qestnSeq,
        qestnTyCode,
        qestnCn,
        mxmmAnswerCo: qestnTyCode === '1' ? mxmmAnswerCo : 0,
      };

      const url = isEdit ? '/user/poll/qqm/updateQustnrQestn.api' : '/user/poll/qqm/insertQustnrQestn.api';
      const response: any = await apiClient.post(url, payload);

      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정이 완료되었습니다.' : '설문문항이 등록되었습니다.');
        navigate(`/admin/qustnr-qestn?qestnrId=${qestnrId}`);
      } else {
        alert(response.resultMessage || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문문항 저장 실패', error);
      alert('서버 저장 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectQustnr = (selectedId: string, selectedSj: string, tmplatId: string) => {
    setQestnrId(selectedId);
    setQestnrSj(selectedSj);
    setQestnrTmplatId(tmplatId);
    setIsPopupOpen(false);
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>{isEdit ? '설문문항 내용수정' : '설문문항 내용등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="board_view2">
          <table>
            <caption>설문문항 입력 폼</caption>
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
                        onClick={() => setIsPopupOpen(true)}
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
                  <label htmlFor="qestnSeq">질문순번</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="number" 
                    id="qestnSeq" 
                    className="f_txt w_80" 
                    min={1}
                    value={qestnSeq}
                    onChange={(e) => setQestnSeq(Number(e.target.value))}
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnCn">질문내용</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <textarea 
                    id="qestnCn" 
                    className="f_txtar w_full h_150" 
                    value={qestnCn}
                    onChange={(e) => setQestnCn(e.target.value)}
                    placeholder="질문내용 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnTyCode">질문유형</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="qestnTyCode"
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={qestnTyCode}
                    onChange={(e) => setQestnTyCode(e.target.value)}
                  >
                    {qestnTypeCodes.map((code) => (
                      <option key={code.code} value={code.code}>{code.codeNm}</option>
                    ))}
                  </select>
                </td>
              </tr>
              {qestnTyCode === '1' && (
                <tr>
                  <td className="lb">
                    <label htmlFor="mxmmAnswerCo">최대선택개수</label>
                    <span className="req">필수</span>
                  </td>
                  <td>
                    <input 
                      type="number" 
                      id="mxmmAnswerCo" 
                      className="f_txt w_80" 
                      min={1}
                      value={mxmmAnswerCo}
                      onChange={(e) => setMxmmAnswerCo(Number(e.target.value))}
                    />
                  </td>
                </tr>
              )}
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
            to={isEdit ? `/admin/qustnr-qestn/${id}` : `/admin/qustnr-qestn?qestnrId=${qestnrId}`} 
            className="btn btn_blue_46" 
            style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
          >
            취소
          </Link>
        </div>
      </form>

      <QustnrListPopup 
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSelect={handleSelectQustnr}
      />
    </div>
  );
};

export default QustnrQestnForm;
