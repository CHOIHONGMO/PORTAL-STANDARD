import { Link } from 'react-router-dom';
import { solutionsData } from '@/common/companyData';

const SolutionCards = () => {
  return (
    <section style={{ marginBottom: '32px' }}>
      <div style={{ marginBottom: '20px' }}>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '1px', textTransform: 'uppercase' }}>
          SOLUTIONS &amp; SERVICES
        </span>
        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-main)' }}>
          에스티원즈 전자구매 통합 솔루션
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
          ERP·그룹웨어와 연계되는 웹 표준 기반 포털에 AI를 더해 공급망 관리(SCM) 전 영역을 지원합니다.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        {solutionsData.map((sol) => (
          <div
            key={sol.id}
            className="glass hover-lift"
            style={{
              padding: '24px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              background: 'var(--surface-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {sol.isAi && (
              <span
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  background: 'rgba(37,99,235,0.1)',
                  color: 'var(--primary-color)',
                  border: '1px solid rgba(37,99,235,0.2)',
                  fontSize: '0.75rem',
                  fontWeight: 800,
                  padding: '2px 8px',
                  borderRadius: '12px'
                }}
              >
                ✨ AI
              </span>
            )}

            <div>
              <div style={{ fontSize: '2rem', marginBottom: '12px' }}>{sol.icon}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)', letterSpacing: '0.5px' }}>
                {sol.brand}
              </div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 10px 0' }}>
                {sol.name}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 0 16px 0', minHeight: '56px', wordBreak: 'keep-all' }}>
                {sol.desc}
              </p>

              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 20px 0', fontSize: '0.825rem', color: 'var(--text-main)', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {sol.features.slice(0, 2).map((feat, idx) => (
                  <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>•</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link
              to={sol.link}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '6px',
                background: 'var(--bg-main)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                fontWeight: 700,
                textDecoration: 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <span>자세히 보기</span>
              <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SolutionCards;
