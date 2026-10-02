import { Link } from 'react-router-dom';
import { companyInfo } from '@/common/stOnesData';

const AboutSite = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>회사소개</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>에스티원즈 소개</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.7', wordBreak: 'keep-all' }}>
        (주)에스티원즈는 2013년 설립 이래 국내 대기업·중견기업·공공기관의 다양한 SCM 프로젝트를 수행하며 쌓아온 노하우를 바탕으로 고객의 신뢰를 받는 전자구매 및 공급망 관리(SCM) 전문 파트너입니다.
      </p>

      {/* Main Intro Hero Box */}
      <div className="glass" style={{ padding: '36px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', marginBottom: '32px', lineHeight: '1.8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '1px' }}>
            ABOUT ST-ONES
          </span>
        </div>
        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
          전자구매 시스템 구축 전문기업 주식회사 에스티원즈
        </h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', wordBreak: 'keep-all', margin: '0 0 16px 0' }}>
          자체 연구개발한 전자구매, 전자입찰, 전자계약, 전략적 공급사관리(SRM), MRO 마켓플레이스 솔루션으로 SCM 전 영역의 시스템 구축을 지원합니다.
          고객에게 필요한 맞춤형 SI 구축부터 통합 운영관리까지 원스톱으로 제공하며, ERP 및 그룹웨어와 유기적으로 연계되는 웹 표준 기반 포털 환경에 AI 기술을 더해 구매 및 조달 업무의 혁신적인 최적화를 이끌어냅니다.
        </p>
      </div>

      {/* 3 Core Principles */}
      <div style={{ marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
          에스티원즈의 3대 경영 원칙
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {companyInfo.principles.map((pr, idx) => (
            <div 
              key={idx} 
              className="glass hover-lift"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)'
              }}
            >
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)', marginBottom: '4px' }}>
                {pr.subtitle}
              </div>
              <h4 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-main)', margin: '0 0 12px 0' }}>
                {pr.title}
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.7', margin: 0, wordBreak: 'keep-all' }}>
                {pr.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Company Overview Table */}
      <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
          기업 개요
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '14px 18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>회사명</span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{companyInfo.name} ({companyInfo.nameEn})</strong>
          </div>
          <div style={{ padding: '14px 18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>대표이사</span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{companyInfo.ceo}</strong>
          </div>
          <div style={{ padding: '14px 18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>설립일</span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{companyInfo.foundedDate}</strong>
          </div>
          <div style={{ padding: '14px 18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>사업자등록번호</span>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)' }}>{companyInfo.bizNumber}</strong>
          </div>
        </div>

        <div style={{ marginTop: '16px', padding: '14px 18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>주요 사업</span>
          <strong style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>{companyInfo.mainBiz}</strong>
        </div>
      </div>

      {/* Navigation to Solutions & References */}
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
        <Link 
          to="/about/solutions"
          className="btn-primary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700 }}
        >
          에스티원즈 솔루션 보러가기 →
        </Link>
        <Link 
          to="/about/references"
          className="btn-secondary"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, border: '1px solid var(--border-color)', color: 'var(--text-main)', background: 'var(--surface-color)' }}
        >
          주요 고객사 &amp; 실적 확인
        </Link>
      </div>
    </div>
  );
};

export default AboutSite;
