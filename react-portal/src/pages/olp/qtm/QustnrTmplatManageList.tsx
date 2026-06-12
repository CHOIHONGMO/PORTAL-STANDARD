import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../../../api/apiClient';
import '../../pages.css';

interface TmplatInfo {
  qestnrTmplatId: string;
  qestnrTmplatTy: string;
  qestnrTmplatCn: string;
  qestnrTmplatCours: string;
  frstRegisterNm: string;
  frstRegisterPnttm: string;
}

const QustnrTmplatManageList = () => {
  const navigate = useNavigate();
  const [dataList, setDataList] = useState<TmplatInfo[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchCondition, setSearchCondition] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [pageIndex, setPageIndex] = useState(1);

  useEffect(() => {
    fetchTmplatList();
  }, [pageIndex]);

  const fetchTmplatList = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      params.append('pageIndex', String(pageIndex));
      if (searchCondition) params.append('searchCondition', searchCondition);
      if (searchKeyword) params.append('searchKeyword', searchKeyword);

      const response: any = await apiClient.get(`/uss/olp/qtm/selectQustnrTmplatManageList.api?${params.toString()}`);
      if (response.resultCode === 'SUCCESS') {
        setDataList(response.resultList || []);
        setTotalCount(response.totalCount || 0);
      }
    } catch (error) {
      console.error('설문템플릿 목록 조회 실패', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setPageIndex(1);
    fetchTmplatList();
  };

  return (
    <div className="container p_main">
      <div className="page-header">
        <h2>설문템플릿 관리</h2>
      </div>

      <div className="list-utils">
        <div className="total-count">
          총 <strong>{totalCount}</strong>건
        </div>
        <div className="search-box">
          <select 
            className="form-input" 
            style={{ width: '130px', marginRight: '8px' }}
            value={searchCondition}
            onChange={(e) => setSearchCondition(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="QUSTNR_TMPLAT_DC">템플릿설명</option>
            <option value="QUSTNR_TMPLAT_TY">템플릿유형</option>
          </select>
          <input 
            type="text" 
            className="search-input" 
            placeholder="검색어 입력" 
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
          />
          <button className="btn-search" onClick={handleSearch}>검색</button>
        </div>
      </div>

      <table className="data-table">
        <colgroup>
          <col width="8%" />
          <col width="20%" />
          <col width="15%" />
          <col width="*" />
          <col width="15%" />
          <col width="12%" />
        </colgroup>
        <thead>
          <tr>
            <th>순번</th>
            <th>템플릿 유형</th>
            <th>이미지 정보</th>
            <th>템플릿 설명</th>
            <th>등록자</th>
            <th>등록일자</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>불러오는 중...</td></tr>
          ) : dataList.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center', padding: '40px' }}>데이터가 없습니다.</td></tr>
          ) : (
            dataList.map((item, idx) => (
              <tr key={item.qestnrTmplatId}>
                <td>{totalCount - ((pageIndex - 1) * 10) - idx}</td>
                <td>
                  <div className="divDotText" style={{ width: '120px' }}>{item.qestnrTmplatTy}</div>
                </td>
                <td>
                  <img 
                    src={`/api/uss/olp/qtm/selectQustnrTmplatManageImg.api?qestnrTmplatId=${item.qestnrTmplatId}`} 
                    alt={`${item.qestnrTmplatTy} 이미지`} 
                    style={{ width: '70px', height: '50px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2270%22%20height%3D%2250%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22100%25%22%20height%3D%22100%25%22%20fill%3D%22%23eee%22%2F%3E%3Ctext%20x%3D%2250%25%22%20y%3D%2250%25%22%20font-size%3D%2210%22%20fill%3D%22%23aaa%22%20font-family%3D%22sans-serif%22%20text-anchor%3D%22middle%22%20dy%3D%22.3em%22%3ENo%20Img%3C%2Ftext%3E%3C%2Fsvg%3E';
                    }}
                  />
                </td>
                <td style={{ textAlign: 'left' }}>
                  <Link to={`/admin/qustnr-tmplat/${item.qestnrTmplatId}`}>{item.qestnrTmplatCn}</Link>
                </td>
                <td>{item.frstRegisterNm}</td>
                <td>{item.frstRegisterPnttm ? item.frstRegisterPnttm.substring(0, 10) : ''}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {totalCount > 10 && (
        <div className="board_list_bot" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <div className="paging">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '8px', padding: 0 }}>
              {Array.from({ length: Math.ceil(totalCount / 10) }, (_, i) => i + 1).map((page) => (
                <li key={page}>
                  <button 
                    onClick={() => setPageIndex(page)}
                    style={{
                      padding: '6px 12px',
                      border: '1px solid var(--border-color)',
                      backgroundColor: pageIndex === page ? 'var(--primary-color)' : 'transparent',
                      color: pageIndex === page ? '#fff' : 'var(--text-main)',
                      cursor: 'pointer',
                      borderRadius: '4px'
                    }}
                  >
                    {page}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="btn-wrap" style={{ justifyContent: 'flex-end', borderTop: 'none', marginTop: '20px', paddingTop: 0 }}>
        <button 
          onClick={() => navigate('/admin/qustnr-tmplat/new')} 
          className="btn-submit" 
          style={{ width: 'auto', padding: '10px 24px', cursor: 'pointer' }}
        >
          템플릿 등록
        </button>
      </div>
    </div>
  );
};

export default QustnrTmplatManageList;
