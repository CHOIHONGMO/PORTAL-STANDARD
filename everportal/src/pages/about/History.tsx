import { historyData } from '@/common/companyData';

const History = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>연혁</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>에스티원즈 연혁</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.7' }}>
        2013년 설립 이래 대한민국 전자구매 및 SCM 시장을 선도해 온 (주)에스티원즈의 주요 발자취입니다.
      </p>

      {/* History Timeline */}
      <div className="glass" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)' }}>
        <div style={{ position: 'relative', paddingLeft: '24px', borderLeft: '2px solid rgba(37,99,235,0.2)' }}>
          {historyData.map((item, idx) => (
            <div key={idx} style={{ marginBottom: idx === historyData.length - 1 ? '0' : '36px', position: 'relative' }}>
              {/* Timeline Bullet */}
              <div 
                style={{
                  position: 'absolute',
                  left: '-31px',
                  top: '4px',
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor: '#2563eb',
                  border: '3px solid #fff',
                  boxShadow: '0 0 0 2px rgba(37,99,235,0.3)'
                }}
              />

              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary-color)', marginBottom: '14px', letterSpacing: '-0.5px' }}>
                {item.year}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {item.events.map((ev, evIdx) => (
                  <div 
                    key={evIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '14px',
                      padding: '10px 14px',
                      background: 'var(--bg-main)',
                      borderRadius: '8px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#38bdf8', minWidth: '50px' }}>
                      {ev.month}
                    </span>
                    <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.5' }}>
                      {ev.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default History;
