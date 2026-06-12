import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams, Link } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import '../../pages.css';

interface QestnData {
  qestnrQesitmId: string;
  qestnCn: string;
  qestnTyCode: string;
  mxmmAnswerCo: number;
}

interface ItemData {
  qustnrIemId: string;
  iemCn: string;
  qestnrQesitmId: string;
  etcAnswerAt: string;
}

interface CmmCode {
  code: string;
  codeNm: string;
}

const QustnrRespondForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const qestnrTmplatId = searchParams.get('qestnrTmplatId') || '';

  const [qustnrInfo, setQustnrInfo] = useState<any>(null);
  const [qestnList, setQestnList] = useState<QestnData[]>([]);
  const [itemList, setItemList] = useState<ItemData[]>([]);

  // 응답자 마스터 정보
  const [respondNm, setRespondNm] = useState('');
  const [sexdstnCode, setSexdstnCode] = useState('');
  const [occpTyCode, setOccpTyCode] = useState('');
  const [brth, setBrth] = useState('');

  // 응답자 답변 상태
  // key: qestnrQesitmId, value: String (단일 객관식 / 주관식) or String[] (복수 객관식)
  const [answers, setAnswers] = useState<Record<string, any>>({});
  // 기타답변 텍스트 상태: key: qustnrIemId, value: string
  const [etcAnswers, setEtcAnswers] = useState<Record<string, string>>({});

  const [sexCodes, setSexCodes] = useState<CmmCode[]>([]);
  const [occpCodes, setOccpCodes] = useState<CmmCode[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSurveyDetail();
  }, [id, qestnrTmplatId]);

  const loadSurveyDetail = async () => {
    try {
      setLoading(true);
      // 1. 공통코드 로드
      const sexRes: any = await apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM014');
      if (sexRes.resultCode === 'SUCCESS') setSexCodes(sexRes.resultList || []);

      const occpRes: any = await apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM034');
      if (occpRes.resultCode === 'SUCCESS') setOccpCodes(occpRes.resultList || []);

      // 2. 설문 문항 및 항목 정보 로드
      const detailRes: any = await apiClient.get(`/uss/olp/qnn/selectQustnrRespondDetail.api?qestnrId=${id}&qestnrTmplatId=${qestnrTmplatId}`);
      if (detailRes.resultCode === 'SUCCESS') {
        setQustnrInfo(detailRes.qustnrInfo);
        setQestnList(detailRes.qestnList || []);
        setItemList(detailRes.itemList || []);
      }
    } catch (error) {
      console.error('설문 상세 정보 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerChange = (qesitmId: string, val: any, isMultiple: boolean) => {
    if (isMultiple) {
      const current = answers[qesitmId] || [];
      if (current.includes(val)) {
        setAnswers({ ...answers, [qesitmId]: current.filter((v: any) => v !== val) });
      } else {
        setAnswers({ ...answers, [qesitmId]: [...current, val] });
      }
    } else {
      setAnswers({ ...answers, [qesitmId]: val });
    }
  };

  const handleEtcChange = (iemId: string, text: string) => {
    setEtcAnswers({ ...etcAnswers, [iemId]: text });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!respondNm.trim()) return alert('응답자 이름은 필수 항목입니다.');
    if (!sexdstnCode) return alert('성별은 필수 선택 항목입니다.');
    if (!occpTyCode) return alert('직업은 필수 선택 항목입니다.');
    if (!brth || brth.length !== 8) return alert('생년월일은 YYYYMMDD 8자리 형식이어야 합니다.');

    // 문항 답변 검증
    const processedAnswers: any[] = [];
    for (const q of qestnList) {
      const ans = answers[q.qestnrQesitmId];
      if (!ans || (Array.isArray(ans) && ans.length === 0)) {
        return alert(`질문: "${q.qestnCn.substring(0, 15)}..." 에 응답해주십시오.`);
      }

      if (q.qestnTyCode === '1') { // 객관식
        if (Array.isArray(ans)) {
          processedAnswers.push({
            qestnrQesitmId: q.qestnrQesitmId,
            qestnTyCode: '1',
            qustnrIemId: ans, // 리스트 통째로 넘김
            ...ans.reduce((acc, iemId) => {
              if (etcAnswers[iemId]) {
                acc[`etcAnswerCn_${iemId}`] = etcAnswers[iemId];
              }
              return acc;
            }, {} as Record<string, string>)
          });
        } else {
          processedAnswers.push({
            qestnrQesitmId: q.qestnrQesitmId,
            qestnTyCode: '1',
            qustnrIemId: ans,
            etcAnswerCn: etcAnswers[ans] || ''
          });
        }
      } else { // 주관식
        processedAnswers.push({
          qestnrQesitmId: q.qestnrQesitmId,
          qestnTyCode: '2',
          respondAnswerCn: ans
        });
      }
    }

    try {
      const payload = {
        qestnrId: id,
        qestnrTmplatId,
        respondNm,
        sexdstnCode,
        occpTyCode,
        brth,
        answers: processedAnswers
      };

      const response: any = await apiClient.post('/uss/olp/qnn/insertQustnrRespond.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('설문에 참여해주셔서 감사합니다.');
        navigate('/qustnr-respond');
      } else {
        alert(response.resultMessage || '설문 응답 제출 실패');
      }
    } catch (error) {
      console.error('설문 응답 제출 오류', error);
      alert('서버 제출 중 오류가 발생했습니다.');
    }
  };

  if (loading) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>설문지 불러오는 중...</h2>
      </div>
    );
  }

  if (!qustnrInfo) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>설문정보를 찾을 수 없습니다.</h2>
        <Link to="/qustnr-respond" className="btn btn_blue_46" style={{ marginTop: '20px', display: 'inline-block' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문조사 참여하기</h2>
      </div>

      <div className="glass" style={{ padding: '24px', borderRadius: '12px', marginBottom: '24px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-color)' }}>{qustnrInfo.qestnrSj}</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap', marginBottom: '12px' }}>{qustnrInfo.qestnrPurps}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>작성안내: {qustnrInfo.qestnrWritngGuidanceCn}</p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* 1. 응답자 개인정보 입력 영역 */}
        <h3 className="tit_3" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>응답자 정보</h3>
        <div className="board_view2" style={{ marginBottom: '40px' }}>
          <table>
            <colgroup>
              <col style={{ width: '190px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="lb">
                  <label htmlFor="respondNm">응답자 이름</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="respondNm" 
                    className="f_txt" 
                    maxLength={20}
                    value={respondNm}
                    onChange={(e) => setRespondNm(e.target.value)}
                    placeholder="이름 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="sexdstnCode">성별</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="sexdstnCode" 
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={sexdstnCode}
                    onChange={(e) => setSexdstnCode(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {sexCodes.map(c => (
                      <option key={c.code} value={c.code}>{c.codeNm}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="occpTyCode">직업</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="occpTyCode" 
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={occpTyCode}
                    onChange={(e) => setOccpTyCode(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {occpCodes.map(c => (
                      <option key={c.code} value={c.code}>{c.codeNm}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="brth">생년월일</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="brth" 
                    className="f_txt" 
                    maxLength={8}
                    value={brth}
                    onChange={(e) => setBrth(e.target.value)}
                    placeholder="YYYYMMDD (예: 19951231)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 2. 설문 문항 및 응답 영역 */}
        <h3 className="tit_3" style={{ borderBottom: '2px solid var(--border-color)', paddingBottom: '8px', marginBottom: '16px' }}>설문 질문 목록</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
          {qestnList.map((q, qidx) => {
            const relatedItems = itemList.filter(item => item.qestnrQesitmId === q.qestnrQesitmId);
            const isMultipleChoice = q.qestnTyCode === '1';
            const maxSelect = q.mxmmAnswerCo || 1;

            return (
              <div 
                key={q.qestnrQesitmId} 
                className="glass" 
                style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}
              >
                <div style={{ fontWeight: 'bold', fontSize: '1.05rem', marginBottom: '16px', color: 'var(--text-main)' }}>
                  Q{qidx + 1}. {q.qestnCn} {isMultipleChoice && maxSelect > 1 && <span style={{ fontSize: '0.8rem', color: 'var(--primary-color)' }}>(중복선택 가능 - 최대 {maxSelect}개)</span>}
                </div>

                {/* 객관식 문항 */}
                {isMultipleChoice ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {relatedItems.map(item => {
                      const isChecked = Array.isArray(answers[q.qestnrQesitmId]) 
                        ? answers[q.qestnrQesitmId].includes(item.qustnrIemId) 
                        : answers[q.qestnrQesitmId] === item.qustnrIemId;

                      return (
                        <div key={item.qustnrIemId} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: 'var(--text-main)' }}>
                            <input 
                              type={maxSelect > 1 ? "checkbox" : "radio"}
                              name={`QQESTN_${q.qestnrQesitmId}`}
                              value={item.qustnrIemId}
                              checked={isChecked}
                              onChange={() => handleAnswerChange(q.qestnrQesitmId, item.qustnrIemId, maxSelect > 1)}
                              style={{ marginRight: '8px' }}
                            />
                            {item.iemCn}
                          </label>

                          {/* 기타답변 여부가 Y이고 선택되었을 때 주관식 필드 오픈 */}
                          {item.etcAnswerAt === 'Y' && isChecked && (
                            <div style={{ marginLeft: '24px', marginTop: '4px' }}>
                              <input 
                                type="text" 
                                className="f_txt w_half"
                                placeholder="기타 의견을 적어주세요"
                                value={etcAnswers[item.qustnrIemId] || ''}
                                onChange={(e) => handleEtcChange(item.qustnrIemId, e.target.value)}
                              />
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* 주관식 문항 */
                  <div>
                    <textarea 
                      className="f_txtar w_full h_100" 
                      placeholder="답변을 작성해 주십시오."
                      value={answers[q.qestnrQesitmId] || ''}
                      onChange={(e) => handleAnswerChange(q.qestnrQesitmId, e.target.value, false)}
                      title="주관식 답변 입력"
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 버튼 영역 */}
        <div className="board_view_bot" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
          <button type="submit" className="btn btn_blue_46" style={{ width: '120px', cursor: 'pointer' }}>설문 제출</button>
          <Link to="/qustnr-respond" className="btn btn_skyblue_h46" style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}>취소</Link>
        </div>
      </form>
    </div>
  );
};

export default QustnrRespondForm;
