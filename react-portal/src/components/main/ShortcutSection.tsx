import { Link } from 'react-router-dom';
import '@/components/main/main.css';

const ShortcutSection = () => {
  return (
    <div className="shortcut-section">
      <div className="shortcut-card complaint hover-lift">
        <div className="card-content">
          <h2>한방에 신청하는 <br/><span>민원</span></h2>
          <div className="shortcut-links">
            <Link to="/service/apply" className="btn-shortcut">기술지원 필요시<br/>유지보수 민원</Link>
            <Link to="/service/apply" className="btn-shortcut">구매 제품<br/>A/S 민원</Link>
          </div>
        </div>
      </div>

      <div className="shortcut-card survey hover-lift">
        <div className="card-content">
          <h2>포털 설문 <span>참여</span></h2>
          <p>표준프레임워크 경량환경 포털 홈페이지 이용에 대해서 사용자 여러분들께 설문조사를 진행합니다.</p>
          <Link to="/service/result" className="btn-survey">참여하기 &rarr;</Link>
        </div>
      </div>
    </div>
  );
};

export default ShortcutSection;
