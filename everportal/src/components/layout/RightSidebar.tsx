import { Link } from 'react-router-dom';

interface RightSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const RightSidebar = ({ isOpen, onClose }: RightSidebarProps) => {
  return (
    <aside className={`right-sidebar usa-sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <div className="right-sidebar-header">
        <button className="right-sidebar-close-btn" onClick={onClose} title="우측 영역 접기">
          <span>✕ 접기</span>
        </button>
      </div>
      {/* USWDS Warning Alert Card */}
      <div className="usa-alert usa-alert--warning">
        <div className="usa-alert__body">
          <div className="usa-alert__header">
            <span className="usa-alert__icon" aria-hidden="true">⚠️</span>
            <h4 className="usa-alert__heading">시스템 정기 점검</h4>
          </div>
          <p className="usa-alert__text">
            금일 22:00 ~ 익일 02:00까지 시스템 정기 점검으로 서비스가 일시 중단될 수 있습니다.
          </p>
          <span className="usa-alert__date">2026.07.02</span>
        </div>
      </div>

      {/* USWDS Info Alert Card (Customer Support) */}
      <div className="usa-alert usa-alert--info">
        <div className="usa-alert__body">
          <div className="usa-alert__header">
            <span className="usa-alert__icon" aria-hidden="true">📞</span>
            <h4 className="usa-alert__heading">고객만족지원센터</h4>
          </div>
          <div className="usa-alert__content">
            <div className="usa-alert__phone">1566-0000</div>
            <div className="usa-alert__details">
              <p><strong>팩스:</strong> 02-0000-0000</p>
              <p><strong>운영:</strong> 평일 09:00 ~ 18:00</p>
              <p className="usa-alert__subtext">(주말 및 공휴일 휴무)</p>
            </div>
          </div>
        </div>
      </div>

      {/* USWDS Style Quick Access Links */}
      <div className="usa-quick-links-card">
        <h4 className="usa-quick-links-title">빠른 서비스 안내</h4>
        <div className="usa-quick-links-list">
          <Link to="/service/apply" className="usa-button usa-button--outline">
            <span>📝 온라인 민원 신청</span>
            <span className="arrow">→</span>
          </Link>
          <Link to="/faq" className="usa-button usa-button--outline">
            <span>❓ 자주 묻는 질문</span>
            <span className="arrow">→</span>
          </Link>
          <Link to="/qna/new" className="usa-button usa-button--outline">
            <span>💬 1:1 온라인 문의</span>
            <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
