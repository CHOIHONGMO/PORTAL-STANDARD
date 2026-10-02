import { Link } from 'react-router-dom';
import { companyInfo } from '@/common/stOnesData';
import '@/components/layout/layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="layout-container footer-container">
        <div className="footer-top-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', paddingBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', marginBottom: '20px' }}>
          <div className="footer-brand" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#fff', letterSpacing: '-0.5px' }}>
              ST-ones
            </span>
            <span style={{ fontSize: '0.85rem', color: '#94a3b8', borderLeft: '1px solid rgba(255,255,255,0.2)', paddingLeft: '10px' }}>
              전자구매 시스템 구축 전문기업
            </span>
          </div>

          <div className="footer-links">
            <Link to="/about">회사소개</Link>
            <Link to="/about/solutions">솔루션 안내</Link>
            <Link to="/about/references">고객사례</Link>
            <Link to="/about/location">오시는 길</Link>
            <a href="https://www.st-ones.com" target="_blank" rel="noreferrer" style={{ color: '#38bdf8' }}>
              공식 웹사이트 ↗
            </a>
          </div>
        </div>

        <div className="footer-info" style={{ lineHeight: '1.8', fontSize: '0.85rem', color: '#94a3b8' }}>
          <p>
            <strong>{companyInfo.name}</strong> | 대표이사 : {companyInfo.ceo} | 사업자등록번호 : {companyInfo.bizNumber}
          </p>
          <p>
            주소 : ({companyInfo.address.zip}) {companyInfo.address.road} | 대표전화 : {companyInfo.tel} | 이메일 : {companyInfo.email}
          </p>
          <p style={{ marginTop: '8px', fontSize: '0.8rem', color: '#64748b' }}>
            주요 사업 : {companyInfo.mainBiz}
          </p>
          <p className="copyright" style={{ marginTop: '16px', color: '#64748b' }}>
            Copyright © 2026 {companyInfo.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
