import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import apiClient from '@/api/apiClient';
import '@/pages/pages.css';

interface RespondManageDetail {
  qestnrRespondId: string;
  qestnrSj: string;
  respondNm: string;
  sexdstnCode: string;
  occpTyCode: string;
  brth: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
}

interface CodeDetail {
  code: string;
  codeNm: string;
}

const QustnrRespondManageDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [detail, setDetail] = useState<RespondManageDetail | null>(null);
  const [sexCodeList, setSexCodeList] = useState<CodeDetail[]>([]);
  const [jobCodeList, setJobCodeList] = useState<CodeDetail[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDetailAndCodes();
  }, [id]);

  const fetchDetailAndCodes = async () => {
    try {
      setLoading(true);
      // 1. 공통코드 조회 (성별: COM014, 직업: COM034)
      const [sexRes, jobRes, detailRes]: any[] = await Promise.all([
        apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM014'),
        apiClient.get('/uss/olp/cmm/selectCmmCode.api?codeId=COM034'),
        apiClient.get(`/uss/olp/qrm/selectQustnrRespondManageDetail.api?qestnrRespondId=${id}`)
      ]);

      if (sexRes.resultCode === 'SUCCESS') setSexCodeList(sexRes.resultList || []);
      if (jobRes.resultCode === 'SUCCESS') setJobCodeList(jobRes.resultList || []);
      if (detailRes.resultCode === 'SUCCESS') setDetail(detailRes.result || null);

    } catch (error) {
      console.error('설문응답자정보 상세 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('정말 삭제하시겠습니까?')) return;
    try {
      const response: any = await apiClient.post('/uss/olp/qrm/deleteQustnrRespondManage.api', { qestnrRespondId: id });
      if (response.resultCode === 'SUCCESS') {
        alert('성공적으로 삭제되었습니다.');
        navigate('/admin/qustnr-respond-manage');
      } else {
        alert(response.resultMessage || '삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('설문응답자정보 삭제 실패', error);
      alert('삭제 중 오류가 발생했습니다.');
    }
  };

  const getCodeName = (code: string, list: CodeDetail[]) => {
    const found = list.find(item => item.code === code);
    return found ? found.codeNm : code;
  };

  const formatBirth = (birthStr: string) => {
    if (!birthStr || birthStr.length < 8) return birthStr || '';
    return `${birthStr.substring(0, 4)}-${birthStr.substring(4, 6)}-${birthStr.substring(6, 8)}`;
  };

  if (loading) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>불러오는 중...</div>;
  }

  if (!detail) {
    return <div className="container" style={{ padding: '40px', textAlign: 'center' }}>정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문응답자정보 상세정보</h2>
      </div>

      <table className="form-table">
        <colgroup>
          <col width="20%" />
          <col width="*" />
        </colgroup>
        <tbody>
          <tr>
            <th>설문제목</th>
            <td>{detail.qestnrSj}</td>
          </tr>
          <tr>
            <th>응답자명</th>
            <td>{detail.respondNm}</td>
          </tr>
          <tr>
            <th>성별</th>
            <td>{getCodeName(detail.sexdstnCode, sexCodeList)}</td>
          </tr>
          <tr>
            <th>직업</th>
            <td>{getCodeName(detail.occpTyCode, jobCodeList)}</td>
          </tr>
          <tr>
            <th>생년월일</th>
            <td>{formatBirth(detail.brth)}</td>
          </tr>
          <tr>
            <th>등록자</th>
            <td>{detail.frstRegisterNm}</td>
          </tr>
          <tr>
            <th>등록일자</th>
            <td>{detail.frstRegisterPnttm}</td>
          </tr>
        </tbody>
      </table>

      <div className="btn-wrap" style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/admin/qustnr-respond-manage')} className="btn-back">목록</button>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={handleDelete} className="btn-delete" style={{ padding: '10px 20px' }}>삭제</button>
          <Link to={`/admin/qustnr-respond-manage/${detail.qestnrRespondId}/edit`} className="btn-submit" style={{ padding: '10px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}>수정</Link>
        </div>
      </div>
    </div>
  );
};

export default QustnrRespondManageDetail;
