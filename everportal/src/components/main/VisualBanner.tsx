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
          표준프레임워크 경량화 포탈에 대한 전반적인 지원을 약속합니다.
        </p>
        <button className="btn-primary">자세히 알아보기</button>
      </div>
      <div className="visual-bg"></div>
    </section>
  );
};

export default VisualBanner;
