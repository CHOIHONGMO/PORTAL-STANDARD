const EgovHistory = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>사이트 소개</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>연혁</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>연혁</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        표준프레임워크 경량환경 포털사이트를 소개합니다.
      </p>

      <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', lineHeight: '1.8' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-color)' }}>표준프레임워크센터 연혁</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
          표준프레임워크 활성화 전담조직으로 한국정보화진흥원(NIA)에 2010년 11월 4일 「표준프레임워크센터」가 설립되었으며 
          정책지원, 글로벌 확산 등을 담당할 NIA 인력과 R&D, 기술지원 등을 담당할 외부 민간 전문가로 구성되었습니다.
        </p>
      </div>
    </div>
  );
};

export default EgovHistory;
