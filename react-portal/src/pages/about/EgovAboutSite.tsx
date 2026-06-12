const EgovAboutSite = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>사이트 소개</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>사이트 소개</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>사이트 소개</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        표준프레임워크 경량환경 포털사이트를 소개합니다.
      </p>

      <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', lineHeight: '1.8' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-color)' }}>전자정부 표준프레임워크 소개</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
          전자정부 표준 프레임워크는 응용SW의 구성기반이 되며 응용SW 실행 시 필요한 기본 기능을 제공하는 환경입니다.<br/><br/>
          전자정부 표준 프레임워크는 ‘전자정부 서비스의 품질향상 및 정보화 투자 효율성 향상’을 위해 개발 프레임워크 표준을 정립하고, 
          개발 프레임워크 표준 적용을 통한 응용 SW의 표준화 및 품질과 재사용성 향상을 목표로 합니다.
        </p>
      </div>
    </div>
  );
};

export default EgovAboutSite;
