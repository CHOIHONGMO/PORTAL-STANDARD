import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '../../api/apiClient';
import '../pages.css';

interface QnaDetailData {
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

const QnaDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QnaDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQnaDetail();
  }, [id]);

  const fetchQnaDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/olh/qna/selectQnaDetail.api?qaId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setData(response.result);
      }
    } catch (error) {
      console.error('Q&A 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    navigate(`/qna/${id}/confirm?mode=edit`);
  };

  const handleDelete = () => {
    navigate(`/qna/${id}/confirm?mode=delete`);
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
        <h2>존재하지 않거나 불러올 수 없는 질문입니다.</h2>
        <Link to="/qna" className="btn btn_blue_46" style={{ marginTop: '20px', display: 'inline-block' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>Q&A 상세조회</h2>
      </div>

      <div className="board_view2">
        <table>
          <caption>Q&A 상세조회</caption>
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

            {/* 답변내용이 있을 경우 (처리상태 코드가 '3'인 경우 답변 완료) */}
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

      <div className="board_view_bot" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <div className="left_col">
          <button 
            onClick={handleDelete} 
            className="btn btn_skyblue_h46" 
            style={{ width: '100px', cursor: 'pointer' }}
          >
            삭제
          </button>
        </div>
        <div className="right_col" style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={handleEdit} 
            className="btn btn_blue_46" 
            style={{ width: '100px', cursor: 'pointer' }}
          >
            수정
          </button>
          <Link 
            to="/qna" 
            className="btn btn_blue_46" 
            style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
          >
            목록
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QnaDetail;
