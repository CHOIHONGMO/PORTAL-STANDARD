import { Link } from 'react-router-dom';
import '@/components/main/main.css';

const VisualBanner = () => {
  return (
    <section className="visual-banner">
      <div className="visual-content">
        <h2 className="visual-title">
          <span className="t1">표준프레임워크</span>
          <span className="t2">경량환경 포털</span>
        </h2>
        <p className="visual-desc">
          표준프레임워크 경량화 포털에 대한 전반적인 지원과 최신 공지 및 서비스를 제공합니다.
        </p>
        <Link to="/about" className="btn-primary" style={{ display: 'inline-block', textDecoration: 'none' }}>
          자세히 알아보기
        </Link>
      </div>
      <div className="visual-bg"></div>
    </section>
  );
};

export default VisualBanner;
