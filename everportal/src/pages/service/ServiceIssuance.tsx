import { useState } from 'react';

interface CivilServiceItem {
  id: number;
  title: string;
  applyText: string;
  handlingOrg: string;
  belongingOrg: string;
  deliveryMethod: string;
  certRequired: boolean;
}

const MOCK_SERVICES: CivilServiceItem[] = [
  { id: 3, title: '표준프레임워크 인증서 발급', applyText: '신청', handlingOrg: '행정안전부', belongingOrg: '삼성SDS', deliveryMethod: '전자발급', certRequired: false },
  { id: 2, title: '표준프레임워크 기술자 자격인증', applyText: '신청', handlingOrg: '과학기술정보통신부', belongingOrg: '한국소프트웨어산업협회', deliveryMethod: '우편수령', certRequired: true },
  { id: 1, title: '표준프레임워크 교육 수료증', applyText: '신청', handlingOrg: '한국지능정보사회진흥원', belongingOrg: '교육센터', deliveryMethod: '방문수령', certRequired: false }
];

const ServiceIssuance = () => {
  const [searchWrd, setSearchWrd] = useState('');
  const [belongingOrgFilter, setBelongingOrgFilter] = useState('ALL');
  const [handlingOrgFilter, setHandlingOrgFilter] = useState('ALL');
  const [certOnly, setCertOnly] = useState(false);
  const [items, setItems] = useState<CivilServiceItem[]>(MOCK_SERVICES);

  const handleSearch = () => {
    let filtered = MOCK_SERVICES.filter(item => {
      // keyword search
      const matchesKeyword = item.title.toLowerCase().includes(searchWrd.toLowerCase()) ||
                             item.handlingOrg.toLowerCase().includes(searchWrd.toLowerCase()) ||
                             item.belongingOrg.toLowerCase().includes(searchWrd.toLowerCase());
      
      // belonging filter
      const matchesBelonging = belongingOrgFilter === 'ALL' || item.belongingOrg === belongingOrgFilter;

      // handling filter
      const matchesHandling = handlingOrgFilter === 'ALL' || item.handlingOrg === handlingOrgFilter;

      // certificate filter
      const matchesCert = !certOnly || item.certRequired;

      return matchesKeyword && matchesBelonging && matchesHandling && matchesCert;
    });
    setItems(filtered);
  };

  const handleApplyClick = (title: string) => {
    alert(`"${title}" 민원 발급 신청이 완료되었습니다.`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>민원광장</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>민원발급</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>민원발급</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        프레임워크 관련 서비스의 운영개선을 위한 창조적인 의견이나 아이디어 제안을 기다립니다.
      </p>

      {/* Main Search Filter Box */}
      <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', marginBottom: '32px' }}>
        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <select className="form-input" style={{ width: '150px' }}>
            <option value="0">민원사무명 검색</option>
          </select>
          <input 
            type="text" 
            className="form-input" 
            placeholder="검색어를 입력하세요." 
            value={searchWrd}
            onChange={(e) => setSearchWrd(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSearch(); }}
            style={{ flex: 1 }}
          />
          <button className="btn-search" onClick={handleSearch} style={{ cursor: 'pointer' }}>조회</button>
        </div>

        {/* Extended Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>소속기관별</span>
            <select 
              className="form-input" 
              value={belongingOrgFilter}
              onChange={(e) => setBelongingOrgFilter(e.target.value)}
              style={{ width: '160px', padding: '8px 12px' }}
            >
              <option value="ALL">통합검색 (전체)</option>
              <option value="삼성SDS">삼성SDS</option>
              <option value="한국소프트웨어산업협회">한국소프트웨어산업협회</option>
              <option value="교육센터">교육센터</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>처리기관별</span>
            <select 
              className="form-input" 
              value={handlingOrgFilter}
              onChange={(e) => setHandlingOrgFilter(e.target.value)}
              style={{ width: '160px', padding: '8px 12px' }}
            >
              <option value="ALL">통합검색 (전체)</option>
              <option value="행정안전부">행정안전부</option>
              <option value="과학기술정보통신부">과학기술정보통신부</option>
              <option value="한국지능정보사회진흥원">한국지능정보사회진흥원</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-main)' }}>
              <input 
                type="checkbox" 
                checked={certOnly}
                onChange={(e) => setCertOnly(e.target.checked)}
                style={{ width: '16px', height: '16px' }}
              />
              인증서 필요
            </label>
          </div>
        </div>
      </div>

      {/* List Sub-header */}
      <div className="list-utils" style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>
          인터넷 민원신청
        </div>
        <div className="total-count" style={{ fontSize: '0.925rem' }}>
          총 <strong>{items.length}</strong> 건
        </div>
      </div>

      {/* Data Table */}
      <table className="data-table">
        <colgroup>
          <col style={{ width: '80px' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '150px' }} />
          <col style={{ width: '180px' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '100px' }} />
        </colgroup>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>번호</th>
            <th>민원사무명</th>
            <th style={{ textAlign: 'center' }}>인터넷신청</th>
            <th>처리기관</th>
            <th>소속기관</th>
            <th>수령방법</th>
            <th style={{ textAlign: 'center' }}>인증서</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                검색된 민원사무 내역이 없습니다.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td style={{ textAlign: 'center' }}>{item.id}</td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</span>
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => handleApplyClick(item.title)}
                    className="btn-submit" 
                    style={{ 
                      width: 'auto', padding: '6px 16px', fontSize: '0.875rem', 
                      marginTop: 0, backgroundColor: 'var(--primary-color)', cursor: 'pointer' 
                    }}
                  >
                    {item.applyText}
                  </button>
                </td>
                <td>{item.handlingOrg}</td>
                <td>{item.belongingOrg}</td>
                <td>{item.deliveryMethod}</td>
                <td style={{ textAlign: 'center' }}>
                  <span style={{ 
                    fontWeight: 600, 
                    color: item.certRequired ? '#ef4444' : 'var(--text-muted)' 
                  }}>
                    {item.certRequired ? '필요' : '불필요'}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ServiceIssuance;
