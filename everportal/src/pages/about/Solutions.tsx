import { Link } from 'react-router-dom';
import { solutionsData } from '@/common/companyData';

const Solutions = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>솔루션 소개</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>에스티원즈 솔루션 라인업</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.7', wordBreak: 'keep-all' }}>
        (주)에스티원즈의 핵심 솔루션은 웹 표준 및 AI 기술을 기반으로 대기업·중견기업·공공기관의 구매 및 공급망 관리 전 과정을 획기적으로 혁신합니다.
      </p>

      {/* Solutions Detailed List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', marginBottom: '40px' }}>
        {solutionsData.map((sol) => (
          <div 
            key={sol.id}
            id={sol.id}
            className="glass"
            style={{
              padding: '36px',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-color)',
              backgroundColor: 'var(--surface-color)',
              scrollMarginTop: '100px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '2.5rem' }}>{sol.icon}</span>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '1px' }}>
                      {sol.brand}
                    </span>
                    {sol.isAi && (
                      <span style={{ background: 'rgba(37,99,235,0.1)', color: 'var(--primary-color)', border: '1px solid rgba(37,99,235,0.3)', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800 }}>
                        ✨ AI Powered
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 0 0' }}>
                    {sol.name}
                  </h3>
                </div>
              </div>

              <Link
                to="/qna/new"
                style={{
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: 'var(--primary-color)',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                도입 상담 신청
              </Link>
            </div>

            <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', lineHeight: '1.7', margin: '0 0 20px 0', wordBreak: 'keep-all' }}>
              {sol.desc}
            </p>

            <div style={{ padding: '20px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <strong style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)', marginBottom: '12px' }}>
                핵심 특장점 및 기능
              </strong>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '10px' }}>
                {sol.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <span style={{ color: 'var(--primary-color)', fontWeight: 800 }}>✔</span>
                    <span style={{ lineHeight: '1.5' }}>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div 
        className="glass"
        style={{
          padding: '28px',
          borderRadius: 'var(--radius-lg)',
          textAlign: 'center',
          border: '1px solid var(--border-color)',
          background: 'linear-gradient(135deg, rgba(37,99,235,0.05) 0%, rgba(56,189,248,0.05) 100%)'
        }}
      >
        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-main)' }}>
          우리 회사에 맞는 최적의 구매시스템을 찾고 계신가요?
        </h4>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: '0 0 20px 0' }}>
          에스티원즈 전문 컨설턴트가 귀사의 요구사항을 면밀히 분석하여 맞춤형 구축 방안을 제안해 드립니다.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
          <Link to="/about/organization" className="btn-secondary" style={{ padding: '10px 20px', borderRadius: '6px', textDecoration: 'none', fontWeight: 600 }}>
            전문가 연락망 보기
          </Link>
          <Link to="/qna/new" className="btn-primary" style={{ padding: '10px 24px', borderRadius: '6px', textDecoration: 'none', fontWeight: 700 }}>
            온라인 도입 문의하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Solutions;
