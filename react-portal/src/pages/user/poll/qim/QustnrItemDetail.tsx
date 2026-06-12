import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface QimDetailData {
  qustnrIemId: string;
  iemSeq: number;
  iemCn: string;
  qestnCn: string;
  qestnrSj: string;
  qestnrId: string;
  qestnrQesitmId: string;
  etcAnswerAt: string;
  frstRegisterNm: string;
  frstRegistPnttm: string;
}

const QustnrItemDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<QimDetailData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItemDetail();
  }, [id]);

  const fetchItemDetail = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/user/poll/qim/selectQustnrItemDetail.api?qustnrIemId=${id}`);
      if (response.resultCode === 'SUCCESS') {
        setData(response.result);
      }
    } catch (error) {
      console.error('설문항목 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      try {
        const response: any = await apiClient.post('/qim/deleteQustnrItem.api', {
          qustnrIemId: id,
        });
        if (response.resultCode === 'SUCCESS') {
          alert('삭제가 완료되었습니다.');
          navigate(`/admin/qustnr-item?qestnrQesitmId=${data?.qestnrQesitmId}&qestnrId=${data?.qestnrId}`);
        } else {
          alert(response.resultMessage || '삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('설문항목 삭제 에러', error);
      }
    }
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
        <h2>존재하지 않는 설문항목입니다.</h2>
        <Link to="/admin/qustnr-item" className="btn btn_blue_46" style={{ marginTop: '20px', display: 'inline-block' }}>목록으로</Link>
      </div>
    );
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문항목 상세조회</h2>
      </div>

      <div className="board_view2">
        <table>
          <caption>설문항목 상세조회</caption>
          <colgroup>
            <col style={{ width: '190px' }} />
            <col style={{ width: 'auto' }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="lb">설문지명</td>
              <td>{data.qestnrSj}</td>
            </tr>
            <tr>
              <td className="lb">질문내용</td>
              <td>{data.qestnCn}</td>
            </tr>
            <tr>
              <td className="lb">항목순번</td>
              <td>{data.iemSeq}</td>
            </tr>
            <tr>
              <td className="lb">항목내용</td>
              <td>
                <textarea 
                  className="f_txtar w_full h_100" 
                  readOnly 
                  value={data.iemCn}
                  title="항목내용"
                />
              </td>
            </tr>
            <tr>
              <td className="lb">기타답변여부</td>
              <td>{data.etcAnswerAt === 'Y' ? '사용 (주관식 필드 노출)' : '미사용'}</td>
            </tr>
            <tr>
              <td className="lb">등록자명</td>
              <td>{data.frstRegisterNm}</td>
            </tr>
            <tr>
              <td className="lb">등록일자</td>
              <td>{data.frstRegistPnttm ? data.frstRegistPnttm.substring(0, 10) : ''}</td>
            </tr>
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
          <Link 
            to={`/admin/qustnr-item/${id}/edit`} 
            className="btn btn_blue_46" 
            style={{ width: '100px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}
          >
            수정
          </Link>
          <Link 
            to={`/admin/qustnr-item?qestnrQesitmId=${data.qestnrQesitmId}&qestnrId=${data.qestnrId}`} 
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

export default QustnrItemDetail;
