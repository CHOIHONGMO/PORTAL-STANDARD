import { contactPersons } from '@/common/companyData';

const Organization = () => {
  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>조직 및 담당자 안내</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>조직 및 담당자 안내</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.7' }}>
        (주)에스티원즈는 전자구매 분야 13년 이상의 숙련된 전문가들이 고객의 성공적인 시스템 도입과 안정적인 운영을 완벽하게 지원합니다.
      </p>

      {/* Organization Structure Box */}
      <div className="glass" style={{ padding: '32px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', marginBottom: '36px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>
          조직 구성 및 핵심 역량
        </h3>
        <p style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.8', margin: '0 0 24px 0', wordBreak: 'keep-all' }}>
          에스티원즈는 경영지원본부, 솔루션사업본부, 기술연구소(R&amp;D), 그리고 SI/컨설팅사업본부로 유기적으로 구성되어 있습니다.
          자체 개발 Framework 기반의 고품질 솔루션 개발부터 고객사별 요구사항에 맞춘 최적화 SI, 철저한 컴플라이언스 및 사후 유지관리까지 체계적인 원스톱 프로세스를 가동합니다.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🎯</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>경영 및 전략기획</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>무차입 경영 기조, 중장기 전략 수립 및 핵심 제휴</p>
          </div>
          <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>💼</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>솔루션 영업 &amp; 컨설팅</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>구매 프로세스 진단, 솔루션 데모 및 맞춤형 견적 제안</p>
          </div>
          <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>🔬</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>기술연구소 (R&amp;D)</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>AI 구매/계약 분석 엔진, 전자서명·인장 보안 기술 연구</p>
          </div>
          <div style={{ padding: '18px', background: 'var(--bg-main)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>⚙️</div>
            <strong style={{ fontSize: '1.05rem', color: 'var(--text-main)', display: 'block', marginBottom: '6px' }}>SI 및 운영지원</strong>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>ERP 인터페이스 연계, 전문 엔지니어링 및 2선 유지보수</p>
          </div>
        </div>
      </div>

      {/* Contact Persons Directory */}
      <div>
        <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '20px', color: 'var(--text-main)' }}>
          솔루션 도입 및 기술지원 담당자
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {contactPersons.map((person, idx) => (
            <div 
              key={idx}
              className="glass hover-lift"
              style={{
                padding: '24px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary-color)', background: 'rgba(37,99,235,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                    {person.role}
                  </span>
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-main)', margin: '4px 0 8px 0' }}>
                  {person.name}
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0 0 16px 0' }}>
                  {person.duty}
                </p>
              </div>

              <div style={{ paddingTop: '16px', borderTop: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.875rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'inline-block', width: '50px' }}>이메일</span>
                  <a href={`mailto:${person.email}`} style={{ color: 'var(--primary-color)', textDecoration: 'none', fontWeight: 600 }}>{person.email}</a>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'inline-block', width: '50px' }}>전화</span>
                  <a href={`tel:${person.phone}`} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>{person.phone}</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Organization;
