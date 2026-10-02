import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { solutionsData } from '@/common/stOnesData';
import '@/components/main/main.css';

const VisualBanner = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  // Auto slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % solutionsData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const cur = solutionsData[activeIdx];

  return (
    <section className="visual-banner-slider" style={{ position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-lg)', background: 'linear-gradient(135deg, #090d16 0%, #111827 50%, #1e293b 100%)', color: '#fff', padding: '48px 40px', marginBottom: '32px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 20px 40px -15px rgba(0,0,0,0.5)' }}>
      {/* Background Glow Effect */}
      <div style={{ position: 'absolute', top: '-20%', right: '-10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(37,99,235,0.25) 0%, rgba(37,99,235,0) 70%)', pointerEvents: 'none', filter: 'blur(40px)' }}></div>
      <div style={{ position: 'absolute', bottom: '-20%', left: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0) 70%)', pointerEvents: 'none', filter: 'blur(40px)' }}></div>

      <div style={{ position: 'relative', zIndex: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'center' }}>
        {/* Left Column: Solution Detail */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '2px', color: '#38bdf8', textTransform: 'uppercase' }}>
              {cur.brand}
            </span>
            {cur.isAi && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', background: 'rgba(56,189,248,0.15)', border: '1px solid rgba(56,189,248,0.3)', color: '#38bdf8', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700 }}>
                ✨ AI Powered
              </span>
            )}
            {cur.badge && (
              <span style={{ background: 'rgba(255,255,255,0.1)', color: '#cbd5e1', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem' }}>
                {cur.badge}
              </span>
            )}
          </div>

          <h2 style={{ fontSize: '2.25rem', fontWeight: 800, lineHeight: 1.2, margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            {cur.name}
          </h2>

          <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: '1.7', margin: '0 0 24px 0', maxWidth: '580px', wordBreak: 'keep-all' }}>
            {cur.desc}
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
            {cur.features.slice(0, 3).map((f, i) => (
              <span key={i} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.85rem', color: '#e2e8f0' }}>
                ✓ {f}
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Link 
              to={cur.link} 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#2563eb', color: '#fff', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', transition: 'background 0.2s', boxShadow: '0 4px 14px rgba(37,99,235,0.4)' }}
            >
              솔루션 자세히 보기 <span>→</span>
            </Link>
            <Link 
              to="/about/references" 
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.08)', color: '#fff', padding: '12px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.95rem', textDecoration: 'none', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              구축 실적 확인
            </Link>
          </div>
        </div>

        {/* Right Column: Solution Quick Nav Pills */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 600, marginBottom: '6px' }}>
            (주)에스티원즈 솔루션 라인업
          </div>
          {solutionsData.map((sol, idx) => {
            const isSelected = idx === activeIdx;
            return (
              <button
                key={sol.id}
                onClick={() => setActiveIdx(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '14px 18px',
                  borderRadius: '10px',
                  border: isSelected ? '1px solid #38bdf8' : '1px solid rgba(255,255,255,0.08)',
                  background: isSelected ? 'rgba(56,189,248,0.12)' : 'rgba(255,255,255,0.03)',
                  color: isSelected ? '#fff' : '#94a3b8',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.2s ease',
                  backdropFilter: 'blur(8px)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{sol.icon}</span>
                  <div>
                    <div style={{ fontWeight: isSelected ? 800 : 600, fontSize: '0.95rem', color: isSelected ? '#fff' : '#e2e8f0' }}>
                      {sol.name}
                      {sol.isAi && (
                        <span style={{ marginLeft: '6px', fontSize: '0.7rem', color: '#38bdf8', fontWeight: 700 }}>AI</span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: isSelected ? '#bae6fd' : '#64748b' }}>
                      {sol.brand}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize: '0.9rem', color: isSelected ? '#38bdf8' : '#475569', transform: isSelected ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }}>
                  →
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default VisualBanner;
