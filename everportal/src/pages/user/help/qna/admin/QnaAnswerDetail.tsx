import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface QnaAnswerDetailData {
  qaId: string;
  qestnSj: string;
  qestnCn: string;
  wrterNm: string;
  writngDe: string;
  inqireCo: string;
  qnaProcessSttusCode: string;
  qnaProcessSttusCodeNm: string;
  areaNo?: string;
  middleTelno?: string;
  endTelno?: string;
  emailAdres?: string;
  answerCn?: string;
  answerDe?: string;
}

const QnaAnswerDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QnaAnswerDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQnaAnswerDetail();
  }, [id]);

  const fetchQnaAnswerDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/help/qna/admin/selectQnaAnswerDetail.api?qaId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setData(response.result);
      }
    } catch (error) {
      console.error('Q&A 답변 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr || dateStr.length < 8) return dateStr || '';
    return `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
  };

  if (loading) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>불러오는 중...</h2>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>존재하지 않는 질문입니다.</h2>
        <Link to="/admin/qna" className="btn btn_blue_46" style={{ marginTop: '20px', display: 'inline-block' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>Q&A 답변 상세조회</h2>
      </div>

      <div className="board_view2">
        <table>
          <caption>Q&A 답변 상세조회</caption>
          <colgroup>
            <col style={{ width: '190px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="lb">작성자명</td>
              <td>{data.wrterNm}</td>
            </tr>
            <tr>
              <td className="lb">전화번호</td>
              <td>
                {data.areaNo || data.middleTelno || data.endTelno 
                  ? `${data.areaNo || ''}-${data.middleTelno || ''}-${data.endTelno || ''}` 
                  : '등록된 연락처가 없습니다.'}
              </td>
            </tr>
            <tr>
              <td className="lb">이메일</td>
              <td>{data.emailAdres || '등록된 이메일이 없습니다.'}</td>
            </tr>
            <tr>
              <td className="lb">작성일자</td>
              <td>{formatDate(data.writngDe)}</td>
            </tr>
            <tr>
              <td className="lb">조회수</td>
              <td>{data.inqireCo}</td>
            </tr>
            <tr>
              <td className="lb">질의응답처리상태</td>
              <td>{data.qnaProcessSttusCodeNm}</td>
            </tr>
            <tr>
              <td className="lb">질문제목</td>
              <td>{data.qestnSj}</td>
            </tr>
            <tr>
              <td className="lb">질문내용</td>
              <td>
                <textarea 
                  className="f_txtar w_full h_200" 
                  readOnly 
                  value={data.qestnCn}
                  title="질문내용"
                />
              </td>
            </tr>

            {/* 답변내용이 있을 경우 */}
            {data.qnaProcessSttusCode === '3' && (
              <>
                <tr>
                  <td className="lb" style={{ borderTop: '2px solid var(--primary-color)' }}>답변내용</td>
                  <td style={{ borderTop: '2px solid var(--primary-color)' }}>
                    <textarea 
                      className="f_txtar w_full h_200" 
                      readOnly 
                      value={data.answerCn || ''} 
                      title="답변내용"
                    />
                  </td>
                </tr>
                <tr>
                  <td className="lb">답변일자</td>
                  <td>{formatDate(data.answerDe)}</td>
                </tr>
              </>
            )}
          </tbody>
        </table>
      </div>

      <div className="board_view_bot" style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
        <button 
          onClick={() => navigate(`/admin/qna/${id}/answer`)} 
          className="btn btn_blue_46" 
          style={{ width: '120px', cursor: 'pointer' }}
        >
          {data.qnaProcessSttusCode === '3' ? '답변 수정' : '답변 등록'}
        </button>
        <Link 
          to="/admin/qna" 
          className="btn btn_blue_46" 
          style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
        >
          목록
        </Link>
      </div>
    </div>
  );
};

export default QnaAnswerDetail;
