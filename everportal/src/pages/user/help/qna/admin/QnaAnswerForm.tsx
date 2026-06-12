import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

const QnaAnswerForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [qestnSj, setQestnSj] = useState('');
  const [qestnCn, setQestnCn] = useState('');
  const [wrterNm, setWrterNm] = useState('');
  const [writngDe, setWritngDe] = useState('');
  const [answerCn, setAnswerCn] = useState('');
  const [qnaProcessSttusCode, setQnaProcessSttusCode] = useState('3'); // 기본값: 답변완료 (3)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQnaAnswerDetail();
  }, [id]);

  const fetchQnaAnswerDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/help/qna/admin/selectQnaAnswerDetail.api?qaId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        const detail = response.result;
        setQestnSj(detail.qestnSj || '');
        setQestnCn(detail.qestnCn || '');
        setWrterNm(detail.wrterNm || '');
        setWritngDe(detail.writngDe || '');
        setAnswerCn(detail.answerCn || '');
        setQnaProcessSttusCode(detail.qnaProcessSttusCode || '3');
      }
    } catch (error) {
      console.error('Q&A 답변 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answerCn.trim()) {
      alert('답변내용은 필수 입력 항목입니다.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        qaId: id,
        answerCn,
        qnaProcessSttusCode,
      };

      const response: any = await apiClient.post('/user/help/qna/admin/updateQnaAnswer.api', payload);
      if (response.resultCode === 'SUCCESS') {
        alert('답변 처리가 완료되었습니다.');
        navigate(`/admin/qna/${id}`);
      } else {
        alert(response.resultMessage || '답변 처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('답변 처리 중 오류 발생', error);
      alert('서버와 통신하는 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length < 8) return dateStr || '';
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>Q&A 답변등록/수정</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="board_view2">
          <table>
            <caption>Q&A 답변 입력 폼</caption>
            <colgroup>
              <col style={{ width: '190px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="lb">작성자명</td>
                <td>{wrterNm}</td>
              </tr>
              <tr>
                <td className="lb">작성일자</td>
                <td>{formatDate(writngDe)}</td>
              </tr>
              <tr>
                <td className="lb">질문제목</td>
                <td>{qestnSj}</td>
              </tr>
              <tr>
                <td className="lb">질문내용</td>
                <td>
                  <textarea 
                    className="f_txtar w_full h_200" 
                    readOnly 
                    value={qestnCn}
                    title="질문내용"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qnaProcessSttusCode">질의응답처리상태</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <select 
                    id="qnaProcessSttusCode"
                    className="form-input" 
                    style={{ width: '200px' }}
                    value={qnaProcessSttusCode}
                    onChange={(e) => setQnaProcessSttusCode(e.target.value)}
                  >
                    <option value="1">접수</option>
                    <option value="2">답변대기</option>
                    <option value="3">답변완료</option>
                  </select>
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="answerCn">답변내용</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <textarea 
                    id="answerCn" 
                    className="f_txtar w_full h_200" 
                    value={answerCn}
                    onChange={(e) => setAnswerCn(e.target.value)}
                    placeholder="답변내용 입력"
                  />
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
            to={`/admin/qna/${id}`} 
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

export default QnaAnswerForm;
