import { useState } from 'react';

interface ServiceResultItem {
  id: number;
  applyDate: string;
  title: string;
  count: number;
  status: string;
  agency: string;
  contact: string;
}

const MOCK_RESULTS: ServiceResultItem[] = [
  { id: 3, applyDate: '2026-06-13', title: '표준프레임워크 인증서 발급', count: 300, status: '발급완료', agency: '행정안전부', contact: '1544-5555' },
  { id: 2, applyDate: '2026-06-12', title: '표준프레임워크 기술자 자격인증', count: 10, status: '발급완료', agency: '과학기술정보통신부', contact: '1544-5555' },
  { id: 1, applyDate: '2026-06-11', title: '표준프레임워크 교육 수료증', count: 1, status: '발급완료', agency: '한국지능정보사회진흥원', contact: '1544-5555' }
];

const EgovServiceResult = () => {
  const [startMonth, setStartMonth] = useState('06');
  const [startDay, setStartDay] = useState('01');
  const [endMonth, setEndMonth] = useState('06');
  const [endDay, setEndDay] = useState('30');
  const [items, setItems] = useState<ServiceResultItem[]>(MOCK_RESULTS);
  const [page, setPage] = useState(1);

  const handleSearch = () => {
    const startDate = `2026-${startMonth}-${startDay}`;
    const endDate = `2026-${endMonth}-${endDay}`;

    const filtered = MOCK_RESULTS.filter(item => {
      return item.applyDate >= startDate && item.applyDate <= endDate;
    });
    setItems(filtered);
    setPage(1);
  };

  const handleActionClick = (title: string) => {
    alert(`"${title}" 결과 문서 출력을 시작합니다.`);
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>민원광장</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>민원결과확인</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>민원결과확인</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '16px' }}>
        프레임워크 관련 서비스의 운영개선을 위한 창조적인 의견이나 아이디어 제안을 기다립니다.
      </p>

      <p style={{ fontSize: '0.9rem', color: '#f59e0b', fontWeight: 600, marginBottom: '24px' }}>
        ※ 7일 이전의 신청내용은 검색기간을 입력한 후 확인하시기 바랍니다.
      </p>

      {/* Date Search Filter */}
      <div className="glass" style={{ 
        padding: '20px 24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', 
        backgroundColor: 'var(--surface-color)', marginBottom: '32px', display: 'flex', flexWrap: 'wrap', 
        alignItems: 'center', gap: '12px' 
      }}>
        <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>기간별 검색</span>
        
        {/* Start Date */}
        <select className="form-input" style={{ width: '90px', padding: '8px 12px' }}>
          <option value="2026">2026년</option>
        </select>
        <select 
          className="form-input" 
          value={startMonth}
          onChange={(e) => setStartMonth(e.target.value)}
          style={{ width: '80px', padding: '8px 12px' }}
        >
          <option value="05">05월</option>
          <option value="06">06월</option>
        </select>
        <select 
          className="form-input" 
          value={startDay}
          onChange={(e) => setStartDay(e.target.value)}
          style={{ width: '80px', padding: '8px 12px' }}
        >
          {Array.from({ length: 30 }, (_, i) => {
            const d = String(i + 1).padStart(2, '0');
            return <option key={d} value={d}>{d}일</option>;
          })}
        </select>

        <span style={{ color: 'var(--text-muted)' }}>부터 ~</span>

        {/* End Date */}
        <select className="form-input" style={{ width: '90px', padding: '8px 12px' }}>
          <option value="2026">2026년</option>
        </select>
        <select 
          className="form-input" 
          value={endMonth}
          onChange={(e) => setEndMonth(e.target.value)}
          style={{ width: '80px', padding: '8px 12px' }}
        >
          <option value="05">05월</option>
          <option value="06">06월</option>
        </select>
        <select 
          className="form-input" 
          value={endDay}
          onChange={(e) => setEndDay(e.target.value)}
          style={{ width: '80px', padding: '8px 12px' }}
        >
          {Array.from({ length: 30 }, (_, i) => {
            const d = String(i + 1).padStart(2, '0');
            return <option key={d} value={d}>{d}일</option>;
          })}
        </select>

        <span style={{ color: 'var(--text-muted)', marginRight: '8px' }}>까지</span>

        <button className="btn-search" onClick={handleSearch} style={{ cursor: 'pointer' }}>조회</button>
      </div>

      {/* Data Table */}
      <table className="data-table">
        <colgroup>
          <col style={{ width: '180px' }} />
          <col style={{ width: 'auto' }} />
          <col style={{ width: '90px' }} />
          <col style={{ width: '120px' }} />
          <col style={{ width: '140px' }} />
          <col style={{ width: '130px' }} />
          <col style={{ width: '100px' }} />
        </colgroup>
        <thead>
          <tr>
            <th>민원접수일</th>
            <th>민원사무명</th>
            <th style={{ textAlign: 'center' }}>부수</th>
            <th>처리상태</th>
            <th>교부기관</th>
            <th>연락처</th>
            <th style={{ textAlign: 'center' }}>추가신청</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan={7} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                지정된 기간 내에 처리 완료된 민원결과 내역이 없습니다.
              </td>
            </tr>
          ) : (
            items.map((item) => (
              <tr key={item.id}>
                <td style={{ fontWeight: 600 }}>{item.applyDate}</td>
                <td>
                  <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</span>
                </td>
                <td style={{ textAlign: 'center' }}>{item.count}</td>
                <td>
                  <span style={{ 
                    fontWeight: 600, 
                    color: item.status === '발급대기' ? '#f59e0b' : 'var(--primary-color)' 
                  }}>
                    {item.status}
                  </span>
                </td>
                <td>{item.agency}</td>
                <td>{item.contact}</td>
                <td style={{ textAlign: 'center' }}>
                  <button 
                    onClick={() => handleActionClick(item.title)}
                    className="btn-submit" 
                    style={{ 
                      width: 'auto', padding: '6px 14px', fontSize: '0.85rem', 
                      marginTop: 0, backgroundColor: 'var(--primary-color)', cursor: 'pointer' 
                    }}
                  >
                    출력
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination component */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <div className="paging" id="paging_div">
          <ul style={{ display: 'flex', listStyle: 'none', gap: '6px', alignItems: 'center' }}>
            <li className="btn"><button style={{ border: '1px solid var(--border-color)', background: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>처음</button></li>
            <li className="btn"><button style={{ border: '1px solid var(--border-color)', background: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>이전</button></li>
            <li><button style={{ border: 'none', background: 'var(--primary-color)', color: 'white', padding: '6px 12px', borderRadius: '4px', fontWeight: 700 }}>{page}</button></li>
            <li className="btn"><button style={{ border: '1px solid var(--border-color)', background: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>다음</button></li>
            <li className="btn"><button style={{ border: '1px solid var(--border-color)', background: 'white', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>마지막</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EgovServiceResult;
