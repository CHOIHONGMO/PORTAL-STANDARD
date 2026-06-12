const EgovLocation = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>사이트 소개</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>찾아오시는 길</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>찾아오시는 길</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '24px' }}>
        ST-ones Portal을 소개합니다.
      </p>

      {/* Map Image */}
      <div className="glass" style={{ padding: '16px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', marginBottom: '24px', textAlign: 'center' }}>
        <img 
          src="/images/map.png" 
          alt="약도" 
          style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)' }} 
        />
      </div>

      {/* Address & Contact Info Box */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        {/* Left Side: Addresses & QR */}
        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '12px' }}>ST-ones Portal 주소</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <strong style={{ display: 'inline-block', width: '90px', color: 'var(--text-muted)' }}>도로명주소</strong>
                <span style={{ color: 'var(--text-main)' }}>04513 서울특별시 중구 세종대로 39 대한서울상공회의소 7층</span>
              </div>
              <div>
                <strong style={{ display: 'inline-block', width: '90px', color: 'var(--text-muted)' }}>지번주소</strong>
                <span style={{ color: 'var(--text-main)' }}>04513 서울특별시 중구 남대문로4가 45 대한서울상공회의소 7층</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '16px', borderTop: '1px solid var(--border-color)', paddingTop: '20px', alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <strong style={{ display: 'block', marginBottom: '6px', color: 'var(--text-main)' }}>QR코드로 위치알아보기</strong>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
                스마트폰에서 QR코드 리더를 이용해 사진 및 지도 등 다양한 정보를 확인하세요.
              </p>
            </div>
            <div>
              <img 
                src="/images/qrcode.png" 
                alt="QR코드" 
                style={{ width: '80px', height: '80px', borderRadius: '4px', border: '1px solid var(--border-color)' }} 
              />
            </div>
          </div>
        </div>

        {/* Right Side: Subway & Contact */}
        <div className="glass" style={{ padding: '24px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '12px' }}>찾아오시는 길</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <strong style={{ display: 'inline-block', width: '100px', color: 'var(--text-muted)' }}>지하철 2호선</strong>
                <span style={{ color: 'var(--text-main)' }}>시청역 9번 출구에서 도보 5분</span>
              </div>
              <div>
                <strong style={{ display: 'inline-block', width: '100px', color: 'var(--text-muted)' }}>지하철 1호선</strong>
                <span style={{ color: 'var(--text-main)' }}>서울역 3번 출구에서 도보 5분</span>
              </div>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '12px' }}>연락처</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <strong style={{ display: 'inline-block', width: '80px', color: 'var(--text-muted)' }}>전화번호</strong>
                <span style={{ color: 'var(--text-main)' }}>0000-0000</span>
              </div>
              <div>
                <strong style={{ display: 'inline-block', width: '80px', color: 'var(--text-muted)' }}>이메일</strong>
                <span style={{ color: 'var(--text-main)' }}>support@st-ones.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EgovLocation;
