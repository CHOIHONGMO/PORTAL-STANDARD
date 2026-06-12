import '@/components/main/main.css';

const MOCK_FAQ = [
  { id: 1, q: '표준프레임워크 경량화 버전을 적용하려면?', a: '기존 프로젝트에서 불필요한 의존성을 제거하고 핵심 모듈만 남기는 방법으로...' },
  { id: 2, q: '공통컴포넌트 설치시 오류가 발생합니다.', a: '공통컴포넌트는 DB 스크립트 실행 후 서버를 기동해야 합니다.' },
  { id: 3, q: '로그인 후 권한 처리는 어떻게 하나요?', a: 'Spring Security를 통해 권한별 리소스 접근 제어를 설정할 수 있습니다.' },
];

const FaqSection = () => {
  return (
    <div className="faq-section glass">
      <div className="section-head">
        <h2>자주하는 질문 <span className="highlight">FAQ</span></h2>
        <p>표준프레임워크 경량화 서비스에 대한 자주하는 질문의 답변들을 볼 수 있습니다.</p>
      </div>
      
      <div className="faq-list">
        {MOCK_FAQ.map(item => (
          <dl key={item.id} className="faq-item">
            <dt>
              <span className="icon-q">Q</span>
              <a href="#faq">{item.q}</a>
            </dt>
            <dd>
              <span className="icon-a">A</span>
              <p>{item.a}</p>
            </dd>
          </dl>
        ))}
      </div>
      
      <a href="#faq-more" className="btn-outline-more">FAQ 더보기</a>
    </div>
  );
};

export default FaqSection;
