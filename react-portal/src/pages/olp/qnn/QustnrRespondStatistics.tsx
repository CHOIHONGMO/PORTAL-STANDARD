import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
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
}

interface Statistic1Data {
  qestnrQesitmId: string;
  qustnrIemId: string;
  qustnrPercent: number; // 백분율 값 (예: 50.0)
  qustnrRtCo: number;    // 응답 수
}

interface Statistic2Data {
  qestnrQesitmId: string;
  respondAnswerCn: string;
  respondNm: string;
}

const QustnrRespondStatistics = () => {
  const { id } = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const qestnrTmplatId = searchParams.get('qestnrTmplatId') || '';

  const [qustnrInfo, setQustnrInfo] = useState<any>(null);
  const [qestnList, setQestnList] = useState<QestnData[]>([]);
  const [itemList, setItemList] = useState<ItemData[]>([]);
  const [stat1, setStat1] = useState<Statistic1Data[]>([]);
  const [stat2, setStat2] = useState<Statistic2Data[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStatistics();
  }, [id, qestnrTmplatId]);

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(`/uss/olp/qnn/selectQustnrStatistics.api?qestnrId=${id}&qestnrTmplatId=${qestnrTmplatId}`);
      if (response.resultCode === 'SUCCESS') {
        setQustnrInfo(response.qustnrInfo);
        setQestnList(response.qestnList || []);
        setItemList(response.itemList || []);
        setStat1(response.qestnrStatistic1 || []);
        setStat2(response.qestnrStatistic2 || []);
      }
    } catch (error) {
      console.error('설문 통계 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container p_main" style={{ textAlign: 'center', padding: '100px 0' }}>
        <h2>통계 데이터 불러오는 중...</h2>
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
        <h2>설문조사 결과 통계</h2>
      </div>

      <div className="glass" style={{ padding: '24px', borderRadius: '12px', marginBottom: '32px', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '8px', color: 'var(--primary-color)' }}>{qustnrInfo.qestnrSj}</h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-main)', whiteSpace: 'pre-wrap', marginBottom: '12px' }}>{qustnrInfo.qestnrPurps}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          설문 기간: {qustnrInfo.qestnrBeginDe ? `${qustnrInfo.qestnrBeginDe.substring(0, 4)}-${qustnrInfo.qestnrBeginDe.substring(4, 6)}-${qustnrInfo.qestnrBeginDe.substring(6, 8)}` : ''} ~ {qustnrInfo.qestnrEndDe ? `${qustnrInfo.qestnrEndDe.substring(0, 4)}-${qustnrInfo.qestnrEndDe.substring(4, 6)}-${qustnrInfo.qestnrEndDe.substring(6, 8)}` : ''}
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginBottom: '40px' }}>
        {qestnList.map((q, qidx) => {
          const isMultipleChoice = q.qestnTyCode === '1';

          return (
            <div 
              key={q.qestnrQesitmId} 
              className="glass" 
              style={{ padding: '24px', borderRadius: '8px', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}
            >
              <div style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '20px', color: 'var(--text-main)' }}>
                Q{qidx + 1}. {q.qestnCn} <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>({isMultipleChoice ? '객관식' : '주관식'})</span>
              </div>

              {/* 객관식 문항 통계 */}
              {isMultipleChoice ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {itemList
                    .filter(item => item.qestnrQesitmId === q.qestnrQesitmId)
                    .map(item => {
                      // 통계 매칭
                      const stat = stat1.find(s => s.qustnrIemId === item.qustnrIemId);
                      const percent = stat ? Number(stat.qustnrPercent) : 0;
                      const count = stat ? Number(stat.qustnrRtCo) : 0;

                      return (
                        <div key={item.qustnrIemId}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.925rem', color: 'var(--text-main)' }}>
                            <span>{item.iemCn}</span>
                            <span style={{ fontWeight: 'bold' }}>{count}표 ({percent}%)</span>
                          </div>
                          {/* 프로그레스 바 시각화 */}
                          <div style={{
                            width: '100%', height: '14px', backgroundColor: 'var(--border-color)',
                            borderRadius: '7px', overflow: 'hidden'
                          }}>
                            <div style={{
                              width: `${percent}%`, height: '100%',
                              backgroundColor: 'var(--primary-color)', borderRadius: '7px',
                              transition: 'width 0.5s ease-in-out'
                            }} />
                          </div>
                        </div>
                      );
                    })}
                </div>
              ) : (
                /* 주관식 답변 리스트 */
                <div>
                  <h4 style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '10px' }}>답변 리스트</h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
                    {stat2
                      .filter(ans => ans.qestnrQesitmId === q.qestnrQesitmId)
                      .map((ans, aidx) => (
                        <div 
                          key={aidx} 
                          style={{
                            padding: '10px 14px', borderRadius: '4px',
                            backgroundColor: 'rgba(0, 0, 0, 0.02)', borderLeft: '3px solid var(--primary-color)',
                            fontSize: '0.9rem', color: 'var(--text-main)'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            <span>작성자: {ans.respondNm || '익명'}</span>
                          </div>
                          <div>{ans.respondAnswerCn}</div>
                        </div>
                      ))}
                    {stat2.filter(ans => ans.qestnrQesitmId === q.qestnrQesitmId).length === 0 && (
                      <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>제출된 주관식 답변이 없습니다.</div>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="board_view_bot" style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
        <Link to="/qustnr-respond" className="btn btn_blue_46" style={{ width: '120px', textAlign: 'center', lineHeight: '44px', textDecoration: 'none' }}>목록으로</Link>
      </div>
    </div>
  );
};

export default QustnrRespondStatistics;
