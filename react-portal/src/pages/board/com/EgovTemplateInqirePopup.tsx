import React, { useState } from 'react';
import apiClient from '@/api/apiClient';

interface TemplateInfo {
  tmplatId: string;
  tmplatNm: string;
  tmplatSeCodeNm: string;
  tmplatCours: string;
  useAt: string;
}

interface EgovTemplateInqirePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (tmplatId: string, tmplatNm: string) => void;
  typeFlag?: string; // e.g. "BBS" (BBS template)
}

const EgovTemplateInqirePopup: React.FC<EgovTemplateInqirePopupProps> = ({ isOpen, onClose, onSelect, typeFlag = 'BBS' }) => {
  const [searchCnd, setSearchCnd] = useState('0'); // 0: Name, 1: Code
  const [searchWrd, setSearchWrd] = useState('');
  const [resultList, setResultList] = useState<TemplateInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  if (!isOpen) return null;

  const handleSearch = async (page = 1) => {
    try {
      setLoading(true);
      const response: any = await apiClient.get(
        `/cop/com/selectTemplateInfsPop.api?searchCnd=${searchCnd}&searchWrd=${encodeURIComponent(searchWrd)}&pageIndex=${page}&typeFlag=${typeFlag}`
      );
      if (response.resultCode === 'SUCCESS') {
        setResultList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
        setPageIndex(page);
      }
    } catch (error) {
      console.error('템플릿 팝업 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
    }}>
      <div className="glass" style={{
        width: '90%', maxWidth: '750px', maxHeight: '85vh',
        borderRadius: 'var(--radius-lg)', padding: '24px', overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)', position: 'relative', border: '1px solid rgba(255,255,255,0.4)',
        backgroundColor: 'var(--surface-color)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>템플릿 선택</h3>
          <button onClick={onClose} style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-light)', cursor: 'pointer' }}>&times;</button>
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <select
            className="form-input"
            value={searchCnd}
            onChange={(e) => setSearchCnd(e.target.value)}
            style={{ width: '130px' }}
          >
            <option value="0">템플릿명</option>
            <option value="1">템플릿구분</option>
          </select>
          <input
            type="text"
            className="form-input"
            placeholder="검색어 입력"
            value={searchWrd}
            onChange={(e) => setSearchWrd(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch(1);
            }}
            style={{ flex: 1 }}
          />
          <button className="btn-search" onClick={() => handleSearch(1)} style={{ cursor: 'pointer' }}>조회</button>
        </div>

        {/* Results */}
        <div style={{ overflowX: 'auto', maxHeight: '40vh', marginBottom: '20px' }}>
          <table className="data-table" style={{ width: '100%', marginBottom: 0 }}>
            <colgroup>
              <col width="10%" />
              <col width="30%" />
              <col width="20%" />
              <col width="25%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th style={{ padding: '12px', textAlign: 'center' }}>번호</th>
                <th style={{ padding: '12px' }}>템플릿명</th>
                <th style={{ padding: '12px' }}>구분</th>
                <th style={{ padding: '12px' }}>경로</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>선택</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>조회 중입니다...</td>
                </tr>
              ) : resultList.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                    조회된 템플릿 정보가 없습니다.
                  </td>
                </tr>
              ) : (
                resultList.map((item, idx) => (
                  <tr key={item.tmplatId}>
                    <td style={{ padding: '12px', textAlign: 'center' }}>{(pageIndex - 1) * 10 + idx + 1}</td>
                    <td style={{ padding: '12px', fontWeight: 600 }}>{item.tmplatNm}</td>
                    <td style={{ padding: '12px' }}>{item.tmplatSeCodeNm}</td>
                    <td style={{ padding: '12px', fontSize: '0.85rem' }}>{item.tmplatCours}</td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        className="btn-submit"
                        onClick={() => {
                          onSelect(item.tmplatId, item.tmplatNm);
                          onClose();
                        }}
                        style={{
                          width: 'auto', padding: '6px 12px', fontSize: '0.85rem',
                          marginTop: 0, backgroundColor: 'var(--secondary-color)', cursor: 'pointer'
                        }}
                      >
                        선택
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalCount > 10 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '10px' }}>
            <button
              disabled={pageIndex === 1}
              onClick={() => handleSearch(pageIndex - 1)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            >
              이전
            </button>
            <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>{pageIndex} / {Math.ceil(totalCount / 10)}</span>
            <button
              disabled={pageIndex >= Math.ceil(totalCount / 10)}
              onClick={() => handleSearch(pageIndex + 1)}
              style={{ padding: '4px 8px', borderRadius: '4px', border: '1px solid var(--border-color)', cursor: 'pointer' }}
            >
              다음
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EgovTemplateInqirePopup;
