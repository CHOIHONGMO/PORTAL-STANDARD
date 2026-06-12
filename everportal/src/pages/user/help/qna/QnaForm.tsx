import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

const QnaForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [wrterNm, setWrterNm] = useState('');
  const [writngPassword, setWritngPassword] = useState('');
  const [areaNo, setAreaNo] = useState('');
  const [middleTelno, setMiddleTelno] = useState('');
  const [endTelno, setEndTelno] = useState('');
  const [emailAdres, setEmailAdres] = useState('');
  const [qestnSj, setQestnSj] = useState('');
  const [qestnCn, setQestnCn] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      fetchQnaDetail();
    }
  }, [id]);

  const fetchQnaDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/help/qna/selectQnaDetail.api?qaId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        const detail = response.result;
        setWrterNm(detail.wrterNm || '');
        setWritngPassword(detail.writngPassword || ''); // 복호화된 비번이 옴
        setAreaNo(detail.areaNo || '');
        setMiddleTelno(detail.middleTelno || '');
        setEndTelno(detail.endTelno || '');
        setEmailAdres(detail.emailAdres || '');
        setQestnSj(detail.qestnSj || '');
        setQestnCn(detail.qestnCn || '');
      }
    } catch (error) {
      console.error('수정 대상 Q&A 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!wrterNm.trim()) {
      alert('작성자명은 필수 입력 항목입니다.');
      return;
    }
    if (!writngPassword.trim()) {
      alert('작성 비밀번호는 필수 입력 항목입니다.');
      return;
    }
    if (!qestnSj.trim()) {
      alert('질문제목은 필수 입력 항목입니다.');
      return;
    }
    if (!qestnCn.trim()) {
      alert('질문내용은 필수 입력 항목입니다.');
      return;
    }

    try {
      setLoading(true);
      const payload = {
        qaId: id || '',
        wrterNm,
        writngPassword,
        areaNo,
        middleTelno,
        endTelno,
        emailAdres,
        qestnSj,
        qestnCn,
      };

      const url = isEdit ? '/user/help/qna/updateQna.api' : '/user/help/qna/insertQna.api';
      const response: any = await apiClient.post(url, payload);

      if (response.resultCode === 'SUCCESS') {
        alert(isEdit ? '수정이 완료되었습니다.' : 'Q&A가 등록되었습니다.');
        navigate(isEdit ? `/qna/${id}` : '/qna');
      } else {
        alert(response.resultMessage || '처리에 실패했습니다.');
      }
    } catch (error) {
      console.error('Q&A 처리 중 오류 발생', error);
      alert('서버와 통신하는 도중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>{isEdit ? 'Q&A 내용수정' : 'Q&A 내용등록'}</h2>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="board_view2">
          <table>
            <caption>Q&A 입력 폼</caption>
            <colgroup>
              <col style={{ width: '190px' }} />
              <col style={{ width: 'auto' }} />
            </colgroup>
            <tbody>
              <tr>
                <td className="lb">
                  <label htmlFor="wrterNm">작성자명</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="wrterNm" 
                    className="f_txt" 
                    maxLength={20}
                    value={wrterNm}
                    onChange={(e) => setWrterNm(e.target.value)}
                    placeholder="작성자명 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="writngPassword">작성 비밀번호</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="password" 
                    id="writngPassword" 
                    className="f_txt" 
                    maxLength={20}
                    value={writngPassword}
                    onChange={(e) => setWritngPassword(e.target.value)}
                    placeholder="비밀번호 입력"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="areaNo">전화번호</label>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="areaNo" 
                    className="f_txt w_80" 
                    maxLength={4}
                    value={areaNo}
                    onChange={(e) => setAreaNo(e.target.value)}
                  />
                  <span className="f_txt_inner mr5 ml5">-</span>
                  <input 
                    type="text" 
                    className="f_txt w_80" 
                    maxLength={4}
                    value={middleTelno}
                    onChange={(e) => setMiddleTelno(e.target.value)}
                    title="전화번호(국번)"
                  />
                  <span className="f_txt_inner mr5 ml5">-</span>
                  <input 
                    type="text" 
                    className="f_txt w_80" 
                    maxLength={4}
                    value={endTelno}
                    onChange={(e) => setEndTelno(e.target.value)}
                    title="전화번호(지번)"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="emailAdres">이메일</label>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="emailAdres" 
                    className="f_txt w_half" 
                    maxLength={30}
                    value={emailAdres}
                    onChange={(e) => setEmailAdres(e.target.value)}
                    placeholder="example@email.com"
                  />
                </td>
              </tr>
              <tr>
                <td className="lb">
                  <label htmlFor="qestnSj">질문제목</label>
                  <span className="req">필수</span>
                </td>
                <td>
                  <input 
                    type="text" 
                    id="qestnSj" 
                    className="f_txt w_full" 
                    maxLength={70}
                    value={qestnSj}
                    onChange={(e) => setQestnSj(e.target.value)}
                    placeholder="질문제목 입력"
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
                    className="f_txtar w_full h_200" 
                    value={qestnCn}
                    onChange={(e) => setQestnCn(e.target.value)}
                    placeholder="질문내용 입력"
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
            to={isEdit ? `/qna/${id}` : '/qna'} 
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

export default QnaForm;
