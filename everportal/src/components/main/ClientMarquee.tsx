import { Link } from 'react-router-dom';
import { referencesData } from '@/common/stOnesData';

const ClientMarquee = () => {
  // 대표 고객사 리스트 추출
  const topClients = [
    { name: '삼양식품', project: '통합구매 및 기술자료 관리시스템' },
    { name: 'CJ CGV', project: '차세대 SRM 시스템 구축' },
    { name: '현대리바트', project: 'HB2B MRO 시스템 리뉴얼 구축' },
    { name: 'LF네트웍스', project: '컴플라이언스 전자계약시스템' },
    { name: '아시아나항공', project: 'AVEPS 2.0 구매포탈 고도화' },
    { name: '아이티센그룹', project: '전사 구매포탈 시스템 구축' },
    { name: '가온전선', project: '전자구매시스템 구축' },
    { name: '솔브레인', project: 'SRM 시스템 구축' },
    { name: '범농협', project: '통합 전자구매 시스템 구축' },
    { name: '동우화인켐', project: '통합구매 SRM 개선' },
    { name: '대명소노시즌', project: 'MRO 구매시스템 구축' },
    { name: '한화시스템', project: '구매조달 시스템 고도화' }
  ];

  return (
    <section className="client-showcase glass" style={{ padding: '24px 30px', borderRadius: 'var(--radius-lg)', marginBottom: '32px', border: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-color)', letterSpacing: '1px' }}>
            TRUSTED PARTNERS
          </span>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '2px 0 0 0', color: 'var(--text-main)' }}>
            주요 고객사 &amp; 구축 실적
          </h3>
        </div>
        <Link 
          to="/about/references" 
          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary-color)', textDecoration: 'none' }}
        >
          전체 실적 {referencesData.length}건 보기 →
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '12px' }}>
        {topClients.map((client, idx) => (
          <div 
            key={idx}
            className="hover-lift"
            style={{
              padding: '12px 14px',
              borderRadius: '8px',
              background: 'var(--bg-main)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center'
            }}
          >
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-main)', marginBottom: '2px' }}>
              {client.name}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {client.project}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientMarquee;
