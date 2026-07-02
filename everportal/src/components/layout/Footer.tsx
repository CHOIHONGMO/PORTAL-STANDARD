import '@/components/layout/layout.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="layout-container footer-container">
        <div className="footer-links">
          <a href="#policy" className="privacy-policy">개인정보처리방침</a>
          <a href="#terms">이용약관</a>
          <a href="#contact">찾아오시는길</a>
        </div>
        <div className="footer-info">
          <p>대표전화 : 02-6959-2625 | 이메일 : sale@st-ones.com</p>
          <p>(06253) 서울특별시 강남구 강남대로66길 6, 7층 (역삼동, 두성타워)</p>
          <p className="copyright">Copyright © 2026 (주)에스티원즈. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
