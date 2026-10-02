import { Link } from 'react-router-dom';
import { companyInfo } from '@/common/stOnesData';

const ContactBanner = () => {
  return (
    <section 
      className="glass" 
      style={{ 
        padding: '32px 36px', 
        borderRadius: 'var(--radius-lg)', 
        background: 'linear-gradient(135deg, rgba(37,99,235,0.08) 0%, rgba(56,189,248,0.08) 100%)', 
        border: '1px solid rgba(37,99,235,0.2)',
        marginTop: '32px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '24px'
      }}
    >
      <div>
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '1px' }}>
          CONTACT &amp; CONSULTING
        </span>
        <h3 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0 8px 0', color: 'var(--text-main)' }}>
          전자구매 시스템 도입 및 기술 컨설팅 문의
        </h3>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.6' }}>
          대기업·중견기업·공공기관 SCM 프로젝트 13년 노하우를 바탕으로 최적의 솔루션을 제안해 드립니다.
        </p>
        <div style={{ display: 'flex', gap: '20px', marginTop: '14px', fontSize: '0.9rem', color: 'var(--text-main)', flexWrap: 'wrap' }}>
          <div>
            <strong>대표전화 :</strong> <a href={`tel:${companyInfo.tel}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>{companyInfo.tel}</a>
          </div>
          <div>
            <strong>이메일 :</strong> <a href={`mailto:${companyInfo.email}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 700 }}>{companyInfo.email}</a>
          </div>
          <div>
            <strong>주소 :</strong> {companyInfo.address.road}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '12px' }}>
        <Link
          to="/about/organization"
          style={{
            padding: '12px 20px',
            borderRadius: '8px',
            background: 'var(--surface-color)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-main)',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none'
          }}
        >
          담당자 연락망 확인
        </Link>
        <Link
          to="/qna/new"
          style={{
            padding: '12px 24px',
            borderRadius: '8px',
            background: 'var(--primary-color)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            textDecoration: 'none',
            boxShadow: '0 4px 12px rgba(37,99,235,0.3)'
          }}
        >
          온라인 문의하기 →
        </Link>
      </div>
    </section>
  );
};

export default ContactBanner;
