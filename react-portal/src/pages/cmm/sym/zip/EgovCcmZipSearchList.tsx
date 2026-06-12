import React, { useState } from 'react';
import apiClient from '../../../../api/apiClient';

interface ZipInfo {
  zip: string;
  ctprvnNm: string;
  signguNm: string;
  emdNm: string;
  liBuldNm: string;
  lnbrDongHo: string;
}

interface EgovCcmZipSearchListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (zip: string, address: string) => void;
}

const EgovCcmZipSearchList: React.FC<EgovCcmZipSearchListProps> = ({ isOpen, onClose, onSelect }) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [resultList, setResultList] = useState<ZipInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [pageIndex, setPageIndex] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  if (!isOpen) return null;

  const handleSearch = async (page = 1) => {
    if (!searchKeyword.trim()) {
      alert('동 명을 입력하세요.');
      return;
    }
    try {
      setLoading(true);
      const response: any = await apiClient.get(
        `/sym/ccm/zip/selectZipList.api?searchKeyword=${encodeURIComponent(searchKeyword)}&pageIndex=${page}`
      );
      if (response.resultCode === 'SUCCESS') {
        setResultList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
        setPageIndex(page);
      }
    } catch (error) {
      console.error('우편번호 검색 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const selectAddress = (info: ZipInfo) => {
    const vZip = info.zip.substring(0, 3) + '-' + info.zip.substring(3, 6);
    const fullAddr = `${info.ctprvnNm} ${info.signguNm} ${info.emdNm} ${info.liBuldNm}`.trim();
    onSelect(vZip, fullAddr);
    onClose();
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
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800 }}>우편번호 찾기</h3>
          <button onClick={onClose} style={{ fontSize: '1.5rem', fontWeight: 600, color: 'var(--text-light)', cursor: 'pointer' }}>&times;</button>
        </div>

        {/* Search Input */}
        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <input
            type="text"
            className="form-input"
            placeholder="동 명을 입력하세요 (예: 역삼, 삼성)"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
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
              <col width="20%" />
              <col width="65%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th style={{ padding: '12px' }}>우편번호</th>
                <th style={{ padding: '12px' }}>주소</th>
                <th style={{ padding: '12px', textAlign: 'center' }}>선택</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>검색 중입니다...</td>
                </tr>
              ) : resultList.length === 0 ? (
                <tr>
                  <td colSpan={3} style={{ textAlign: 'center', padding: '24px', color: 'var(--text-muted)' }}>
                    {searchKeyword ? '조회된 우편번호가 없습니다.' : '검색어를 입력해 주세요.'}
                  </td>
                </tr>
              ) : (
                resultList.map((item, idx) => (
                  <tr key={idx}>
                    <td style={{ padding: '12px' }}>
                      {item.zip.substring(0, 3)}-{item.zip.substring(3, 6)}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'left' }}>
                      {`${item.ctprvnNm} ${item.signguNm} ${item.emdNm} ${item.liBuldNm} ${item.lnbrDongHo}`.trim()}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        className="btn-submit"
                        onClick={() => selectAddress(item)}
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

export default EgovCcmZipSearchList;
