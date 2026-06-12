import { useState, useEffect } from 'react';
import apiClient from '@/api/apiClient';

interface QestnSimple {
  qestnrQesitmId: string;
  qestnCn: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (qestnrQesitmId: string, qestnCn: string) => void;
  qestnrId?: string; // 특정 설문지의 문항만 필터링할 때 사용
}

const QustnrQestnListPopup = ({ isOpen, onClose, onSelect, qestnrId }: Props) => {
  const [dataList, setDataList] = useState<QestnSimple[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [pageIndex, setPageIndex] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchQestnList();
    }
  }, [isOpen, pageIndex, qestnrId]);

  const fetchQestnList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      
      if (qestnrId) {
        params.append('searchMode', 'Y');
        params.append('qestnrId', qestnrId);
      } else {
        params.append('searchCondition', 'QESTN_CN');
        if (searchKeyword) params.append('searchKeyword', searchKeyword);
      }

      const response: any = await apiClient.get(`/user/poll/qqm/selectQustnrQestnList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('문항 팝업 리스트 로드 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchQestnList();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex',
      justifyContent: 'center', alignItems: 'center', zIndex: 9999
    }}>
      <div className="glass" style={{
        width: '600px', backgroundColor: 'var(--surface-color)',
        padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)',
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.15)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>설문문항 선택</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-muted)' }}>&times;</button>
        </div>

        {!qestnrId && (
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
            <input 
              type="text" 
              className="f_input w_full" 
              placeholder="질문내용 검색" 
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
            <button className="btn btn_blue_46" onClick={handleSearch} style={{ height: '46px', width: '80px', padding: 0 }}>검색</button>
          </div>
        )}

        <div style={{ maxHeight: '250px', overflowY: 'auto', marginBottom: '16px' }}>
          <table className="data-table" style={{ fontSize: '0.9rem' }}>
            <thead>
              <tr>
                <th style={{ width: '80px' }}>선택</th>
                <th>질문내용</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={2} style={{ textAlign: 'center', padding: '20px' }}>로딩중...</td></tr>
              ) : dataList.length === 0 ? (
                <tr><td colSpan={2} style={{ textAlign: 'center', padding: '20px' }}>검색 결과가 없습니다.</td></tr>
              ) : (
                dataList.map((item) => (
                  <tr key={item.qestnrQesitmId}>
                    <td>
                      <button 
                        className="btn btn_blue_30" 
                        onClick={() => onSelect(item.qestnrQesitmId, item.qestnCn)}
                        style={{ padding: '2px 8px', fontSize: '0.8rem' }}
                      >
                        선택
                      </button>
                    </td>
                    <td style={{ textAlign: 'left' }}>{item.qestnCn}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalCount > 10 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '16px' }}>
            {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i + 1).map((page) => (
              <button 
                key={page} 
                onClick={() => setPageIndex(page)}
                style={{
                  padding: '4px 8px',
                  border: '1px solid var(--border-color)',
                  backgroundColor: pageIndex === page ? 'var(--primary-color)' : 'transparent',
                  color: pageIndex === page ? '#fff' : 'var(--text-main)',
                  borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem'
                }}
              >
                {page}
              </button>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn_skyblue_h46" onClick={onClose} style={{ height: '40px', width: '80px', padding: 0 }}>닫기</button>
        </div>
      </div>
    </div>
  );
};

export default QustnrQestnListPopup;
