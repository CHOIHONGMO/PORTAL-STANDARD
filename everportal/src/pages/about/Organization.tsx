const EgovOrganization = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>사이트 소개</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>조직소개</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>조직소개</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px' }}>
        ST-ones Portal을 소개합니다.
      </p>

      <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', lineHeight: '1.8' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '16px', color: 'var(--primary-color)' }}>ST-ones Portal 조직 및 오픈커뮤니티</h3>
        <p style={{ fontSize: '1.05rem', color: 'var(--text-main)', wordBreak: 'keep-all' }}>
          오픈커뮤니티의 초기 정착을 위해 ST-ones Portal 개발 참여자와 국내 주요 오픈커뮤니티의 운영자·전문가를 리딩 그룹(PMC, 커미터)으로 구성하고, 
          오픈커뮤니티의 지속적인 확대·발전을 위해 프로젝트 활동에 적극적으로 참여하는 커뮤니티 회원이 리딩그룹의 역할을 획득할 수 있도록 
          투명하고 공정한 의사결정 체계를 수립하여 운영하고 있습니다.
        </p>
      </div>
    </div>
  );
};

export default EgovOrganization;
