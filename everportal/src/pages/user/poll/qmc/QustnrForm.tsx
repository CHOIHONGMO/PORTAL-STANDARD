import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface TmplatInfo {
  qestnrTmplatId: string;
  qestnrTmplatTy: string;
}

interface CmmCode {
  code: string;
  codeNm: string;
}

const QustnrForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [qestnrSj, setQestnrSj] = useState('');
  const [qestnrPurps, setQestnrPurps] = useState('');
  const [qestnrWritngGuidanceCn, setQestnrWritngGuidanceCn] = useState('');
  const [qestnrTargetCode, setQestnrTargetCode] = useState('');
  const [qestnrBeginDe, setQestnrBeginDe] = useState('');
  const [qestnrEndDe, setQestnrEndDe] = useState('');
  const [qestnrTmplatId, setQestnrTmplatId] = useState('');

  const [tmplatList, setTmplatList] = useState<TmplatInfo[]>([]);
  const [targetCodes, setTargetCodes] = useState<CmmCode[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initForm();
  }, []);

  const initForm = async () => {
    try {
      setLoading(true);
      // 1. 공통코드 가져오기
      const codeRes: any = await apiClient.get('/user/poll/cmm/selectCmmCode.api?codeId=COM034');
      if (codeRes.resultCode === 'SUCCESS') {
        setTargetCodes(codeRes.resultList || []);
      }
      // 2. 템플릿 목록 가져오기
      const tmplatRes: any = await apiClient.get('/user/poll/qmc/selectQustnrTmplatList.api');
      if (tmplatRes.resultCode === 'SUCCESS') {
        const list = tmplatRes.resultList || [];
        setTmplatList(list);
        if (list.length > 0) setQestnrTmplatId(list[0].qestnrTmplatId);
      }
      // 3. 수정 모드인 경우 상세 로드
      if (isEdit) {
        const detailRes: any = await apiClient.get(`/user/poll/qmc/selectQustnrDetail.api?qestnrId=${id}`);
        if (detailRes.resultCode === 'SUCCESS') {
          const detail = detailRes.result;
          setQestnrSj(detail.qestnrSj || '');
          setQestnrPurps(detail.qestnrPurps || '');
          setQestnrWritngGuidanceCn(detail.qestnrWritngGuidanceCn || '');
          setQestnrTargetCode(detail.qestnrTargetCode || '');
          setQestnrBeginDe(formatInputDate(detail.qestnrBeginDe));
          setQestnrEndDe(formatInputDate(detail.qestnrEndDe));
          setQestnrTmplatId(detail.qestnrTmplatId || '');
        }
      }
    } catch (error) {
      console.error('설문지 폼 데이터 초기화 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const formatInputDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length < 8) return '';
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  const toRawDate = (dateStr: string) => {
    return dateStr.replace(/-/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!qestnrSj.trim()) return alert('설문제목은 필수 입력 항목입니다.');
    if (!qestnrPurps.trim()) return alert('설문목적은 필수 입력 항목입니다.');
    if (!qestnrWritngGuidanceCn.trim()) return alert('설문안내내용은 필수 입력 항목입니다.');
    if (!qestnrTargetCode) return alert('설문대상은 필수 선택 항목입니다.');
    if (!qestnrBeginDe || !qestnrEndDe) return alert('설문기간은 필수 입력 항목입니다.');
    if (!qestnrTmplatId) return alert('설문템플릿은 필수 선택 항목입니다.');

    try {
      setLoading(true);
      const payload = {
        qestnrId: id || '',
        qestnrSj,
        qestnrPurps,
        qestnrWritngGuidanceCn,
        qestnrTargetCode,
        qestnrBeginDe: toRawDate(qestnrBeginDe),
        qestnrEndDe: toRawDate(qestnrEndDe),
        qestnrTmplatId,
      };

      const url = isEdit ? '/user/poll/qmc/updateQustnr.api' : '/user/poll/qmc/insertQustnr.api';
      const response: any = await apiClient.post(url, payload);

      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정이 완료되었습니다.' : '설문지가 등록되었습니다.');
        navigate(isEdit ? `/admin/qustnr/${id}` : '/admin/qustnr');
      } else {
        alert(response.resultMessage || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문지 저장 오류', error);
      alert('서버와 통신하는 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>{isEdit ? '설문지 내용수정' : '설문지 내용등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="board_view2">
          <table>
            <caption>설문지 입력 폼</caption>
            <colgroup>
              <col style={{ width: '190px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrSj">설문제목</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="qestnrSj" 
                    className="f_txt w_full" 
                    maxLength={250}
                    value={qestnrSj}
                    onChange={(e) => setQestnrSj(e.target.value)}
                    placeholder="설문제목 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrPurps">설문목적</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <textarea 
                    id="qestnrPurps" 
                    className="f_txtar w_full h_100" 
                    value={qestnrPurps}
                    onChange={(e) => setQestnrPurps(e.target.value)}
                    placeholder="설문목적 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrWritngGuidanceCn">설문안내내용</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <textarea 
                    id="qestnrWritngGuidanceCn" 
                    className="f_txtar w_full h_100" 
                    value={qestnrWritngGuidanceCn}
                    onChange={(e) => setQestnrWritngGuidanceCn(e.target.value)}
                    placeholder="설문작성 안내내용 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrTargetCode">설문대상</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="qestnrTargetCode"
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={qestnrTargetCode}
                    onChange={(e) => setQestnrTargetCode(e.target.value)}
                  >
                    <option value="">선택하세요</option>
                    {targetCodes.map((code) => (
                      <option key={code.code} value={code.code}>{code.codeNm}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrBeginDe">설문기간</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input 
                      type="date" 
                      id="qestnrBeginDe" 
                      className="f_txt" 
                      value={qestnrBeginDe}
                      onChange={(e) => setQestnrBeginDe(e.target.value)}
                    />
                    <span>~</span>
                    <input 
                      type="date" 
                      id="qestnrEndDe" 
                      className="f_txt" 
                      value={qestnrEndDe}
                      onChange={(e) => setQestnrEndDe(e.target.value)}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnrTmplatId">설문템플릿</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="qestnrTmplatId"
                    className="form-input" 
                    style={{ width: '250px' }}
                    value={qestnrTmplatId}
                    onChange={(e) => setQestnrTmplatId(e.target.value)}
                  >
                    {tmplatList.map((tmplat) => (
                      <option key={tmplat.qestnrTmplatId} value={tmplat.qestnrTmplatId}>
                        {tmplat.qestnrTmplatTy} ({tmplat.qestnrTmplatId})
                      </option>
                    ))}
                  </select>
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
            to={isEdit ? `/admin/qustnr/${id}` : '/admin/qustnr'} 
            className="btn btn_blue_46" 
            style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
          >
            취소
          </Link>
        </div>
      </form>
    </div>
  );
};

export default QustnrForm;
