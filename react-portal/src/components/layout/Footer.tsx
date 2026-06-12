import '@/components/layout/layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container footer-container">
        <div className="footer-links">
          <a href="#policy" className="privacy-policy">개인정보처리방침</a>
          <a href="#terms">이용약관</a>
          <a href="#contact">찾아오시는길</a>
        </div>
        <div className="footer-info">
          <p>대표전화 : 1566-0000 | 팩스 : 02-0000-0000</p>
          <p>서울특별시 중구 세종대로 000 (우)00000</p>
          <p className="copyright">Copyright © 2026 eGovFramework. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
