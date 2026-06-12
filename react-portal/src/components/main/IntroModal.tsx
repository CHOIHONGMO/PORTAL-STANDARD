import React from 'react';

interface IntroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const IntroModal: React.FC<IntroModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(15, 23, 42, 0.4)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <div className="glass" style={{
        width: '95%', maxWidth: '1000px', maxHeight: '90vh',
        borderRadius: 'var(--radius-lg)', padding: '24px 32px', overflowY: 'auto',
        boxShadow: 'var(--shadow-lg)', position: 'relative', border: '1px solid rgba(255,255,255,0.4)',
        backgroundColor: 'var(--surface-color)'
      }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
          <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-color)' }}>포탈사이트 템플릿 소개</h3>
          <button onClick={onClose} style={{ fontSize: '1.75rem', fontWeight: 600, color: 'var(--text-light)', cursor: 'pointer', background: 'none', border: 'none', padding: '0 8px' }}>&times;</button>
        </div>

        {/* Content */}
        <div style={{ color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.6' }}>
          <ul style={{ paddingLeft: '20px', marginBottom: '24px', listStyleType: 'disc' }}>
            <li style={{ marginBottom: '8px' }}>경량환경 템플릿은 개발자가 프레임워크를 쉽게 이해하고 활용할 수 있도록 지원합니다.</li>
            <li style={{ marginBottom: '8px' }}>홈페이지 템플릿은 공통컴포넌트를 기반으로 아래 구조와 같이 메뉴가 구성됩니다.</li>
            <li style={{ marginBottom: '8px' }}>관리자로 로그인하면 관리자용 메뉴를 추가로 사용할 수 있습니다.</li>
            <li style={{ marginBottom: '8px' }}><i>기울임체</i>로 표시된 메뉴는 구성을 위한 샘플페이지가 제공되며 실제 기능은 모의데이터(Mock-up) 기반으로 동작합니다.</li>
          </ul>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: '20px',
            borderRadius: 'var(--radius-md)'
          }}>
            {/* 1 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--primary-color)', paddingBottom: '6px', marginBottom: '10px' }}>사이트소개</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>사이트소개</li>
                <li>연혁</li>
                <li>조직소개</li>
                <li>찾아오시는길</li>
              </ul>
            </div>
            
            {/* 2 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--primary-color)', paddingBottom: '6px', marginBottom: '10px' }}>민원광장</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0, fontStyle: 'italic' }}>
                <li>민원발급</li>
                <li>민원신청</li>
                <li>민원결과확인</li>
              </ul>
            </div>

            {/* 3 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--primary-color)', paddingBottom: '6px', marginBottom: '10px' }}>알림마당</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>공지사항</li>
                <li>자유게시판</li>
              </ul>
            </div>

            {/* 4 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--primary-color)', paddingBottom: '6px', marginBottom: '10px' }}>정보마당</h4>
              <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li>FAQ</li>
                <li>QnA</li>
                <li>설문조사</li>
              </ul>
            </div>

            {/* 5 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)', gridColumn: 'span 2' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '6px', marginBottom: '10px' }}>포털서비스관리 (관리자 전용)</h4>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>설문관리</h5>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <li>- 설문지</li>
                    <li>- 설문템플릿</li>
                    <li>- 설문문항</li>
                    <li>- 설문항목</li>
                    <li>- 설문응답결과</li>
                  </ul>
                </div>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>서비스관리</h5>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <li>- FAQ관리</li>
                    <li>- QnA관리</li>
                    <li>- QnA답변관리</li>
                    <li>- 게시판생성관리</li>
                    <li>- 게시판사용관리</li>
                    <li>- 배너관리</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 6 */}
            <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.4)', padding: '16px', borderRadius: 'var(--radius-sm)', gridColumn: 'span 2' }}>
              <h4 style={{ fontWeight: 800, borderBottom: '2px solid var(--secondary-color)', paddingBottom: '6px', marginBottom: '10px' }}>포털시스템관리 (관리자 전용)</h4>
              <div style={{ display: 'flex', gap: '20px' }}>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>사용자관리</h5>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <li>- 회원관리</li>
                    <li>- 이용약관관리</li>
                    <li>- 개인정보보호관리</li>
                  </ul>
                </div>
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '6px' }}>사용자권한관리</h5>
                  <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '0.85rem', color: 'var(--text-light)' }}>
                    <li>- 권한관리</li>
                    <li>- 사용자그룹관리</li>
                    <li>- 사용자별권한관리</li>
                    <li>- 롤관리</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <img 
              src="/images/img_POP_TEMPLATE_INTRO.png" 
              alt="템플릿 소개 다이어그램" 
              style={{ maxWidth: '100%', height: 'auto', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;
