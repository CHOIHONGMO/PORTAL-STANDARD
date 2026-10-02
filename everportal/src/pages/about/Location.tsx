import { companyInfo } from '@/common/companyData';

const Location = () => {
  const kakaoMapUrl = 'https://map.kakao.com/link/search/' + encodeURIComponent('서울특별시 강남구 강남대로66길 6');
  const naverMapUrl = 'https://map.naver.com/v5/search/' + encodeURIComponent('서울특별시 강남구 강남대로66길 6');

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>찾아오시는 길</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>찾아오시는 길</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: '1.7' }}>
        (주)에스티원즈 본사로 방문하시는 고객님을 환영합니다.
      </p>

      {/* Map Action Banner */}
      <div 
        className="glass" 
        style={{ 
          padding: '28px', 
          borderRadius: 'var(--radius-lg)', 
          border: '1px solid var(--border-color)', 
          backgroundColor: 'var(--surface-color)', 
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px'
        }}
      >
        <div>
          <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)' }}>HEADQUARTERS</span>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 6px 0', color: 'var(--text-main)' }}>
            ({companyInfo.address.zip}) {companyInfo.address.road}
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
            {companyInfo.address.detail}
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <a
            href={kakaoMapUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#FEE500',
              color: '#000',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            카카오맵 보기 ↗
          </a>
          <a
            href={naverMapUrl}
            target="_blank"
            rel="noreferrer"
            style={{
              padding: '10px 18px',
              borderRadius: '8px',
              background: '#03C75A',
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.9rem',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            네이버지도 보기 ↗
          </a>
        </div>
      </div>

      {/* Transport & Contact Information Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Subway & Bus Guide */}
        <div className="glass" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚇</span> 대중교통 이용 안내
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ padding: '14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }}></span>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>지하철 2호선 / 신분당선 강남역</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                강남역 <strong>4번 출구</strong>에서 뱅뱅사거리 방면으로 직진 후 도보 약 7분 (두성타워 7층)
              </p>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></span>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>지하철 3호선 / 신분당선 양재역</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                양재역 <strong>3번 출구</strong>에서 뱅뱅사거리 방면으로 도보 약 10분
              </p>
            </div>

            <div style={{ padding: '14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></span>
                <strong style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>버스 정류장</strong>
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                ‘뱅뱅사거리’ 또는 ‘우성아파트’ 정류장 하차 후 도보 3분
              </p>
            </div>
          </div>
        </div>

        {/* Contact & Parking Guide */}
        <div className="glass" style={{ padding: '28px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📞</span> 연락처 및 주차 안내
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>대표전화</span>
                <strong style={{ color: 'var(--text-main)' }}>{companyInfo.tel}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>공식 이메일</span>
                <strong style={{ color: 'var(--text-main)' }}>{companyInfo.email}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 14px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>운영 시간</span>
                <strong style={{ color: 'var(--text-main)' }}>평일 09:00 ~ 18:00 (주말/공휴일 휴무)</strong>
              </div>
            </div>
          </div>

          <div style={{ padding: '16px', borderRadius: '8px', background: 'rgba(37,99,235,0.06)', border: '1px solid rgba(37,99,235,0.15)' }}>
            <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.9rem', marginBottom: '4px' }}>
              🚗 주차 안내
            </strong>
            <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              건물(두성타워) 내 기계식 주차장이 구비되어 있습니다. 대형차량이나 SUV는 인근 유료 주차장 이용을 권장해 드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Location;
