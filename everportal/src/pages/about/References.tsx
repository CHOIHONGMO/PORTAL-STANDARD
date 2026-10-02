import { useState } from 'react';
import { referencesData } from '@/common/stOnesData';

const References = () => {
  const [filter, setFilter] = useState<string>('ALL');

  const categories = [
    { id: 'ALL', label: '전체' },
    { id: 'SRM', label: '전자구매 (SRM)' },
    { id: 'Contract', label: '전자계약' },
    { id: 'MRO', label: 'MRO 구매대행' },
    { id: 'Cost', label: '원가관리' }
  ];

  const filteredList = filter === 'ALL' 
    ? referencesData 
    : referencesData.filter(r => r.category === filter);

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out' }}>
      {/* Breadcrumbs */}
      <div className="location" style={{ marginBottom: '20px', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
        <span style={{ marginRight: '6px' }}>Home</span> &gt;
        <span style={{ margin: '0 6px' }}>회사 &amp; 솔루션</span> &gt;
        <span style={{ marginLeft: '6px', fontWeight: 600, color: 'var(--text-main)' }}>고객사례/실적</span>
      </div>

      <div className="page-header" style={{ marginBottom: '24px' }}>
        <h2>주요 고객사 및 사업 실적</h2>
      </div>

      <p style={{ fontSize: '1.125rem', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.7', wordBreak: 'keep-all' }}>
        항공, 유통, 제조, 금융, 공공 등 다양한 산업의 고객사와 함께 SRM·MRO·전자계약 시스템을 성공적으로 구축해 왔습니다.
      </p>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setFilter(c.id)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: '1px solid var(--border-color)',
              background: filter === c.id ? 'var(--primary-color)' : 'var(--surface-color)',
              color: filter === c.id ? '#fff' : 'var(--text-main)',
              fontWeight: filter === c.id ? 700 : 500,
              fontSize: '0.9rem',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            {c.label} {c.id === 'ALL' ? `(${referencesData.length})` : `(${referencesData.filter(r => r.category === c.id).length})`}
          </button>
        ))}
      </div>

      {/* References Table */}
      <div className="glass" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', backgroundColor: 'var(--surface-color)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ background: 'var(--bg-main)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 20px', width: '120px', color: 'var(--text-muted)', fontWeight: 700 }}>구축 연월</th>
              <th style={{ padding: '16px 20px', width: '150px', color: 'var(--text-muted)', fontWeight: 700 }}>고객사</th>
              <th style={{ padding: '16px 20px', color: 'var(--text-muted)', fontWeight: 700 }}>프로젝트명</th>
              <th style={{ padding: '16px 20px', width: '130px', color: 'var(--text-muted)', fontWeight: 700, textAlign: 'center' }}>솔루션 구분</th>
            </tr>
          </thead>
          <tbody>
            {filteredList.map((item, idx) => (
              <tr 
                key={idx}
                style={{ 
                  borderBottom: '1px solid var(--border-color)',
                  transition: 'background 0.15s'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-main)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <td style={{ padding: '14px 20px', color: 'var(--primary-color)', fontWeight: 700 }}>
                  {item.date}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--text-main)', fontWeight: 700 }}>
                  {item.client}
                </td>
                <td style={{ padding: '14px 20px', color: 'var(--text-main)' }}>
                  {item.project}
                </td>
                <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      padding: '3px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      background: 
                        item.category === 'SRM' ? 'rgba(37,99,235,0.1)' :
                        item.category === 'Contract' ? 'rgba(16,185,129,0.1)' :
                        item.category === 'MRO' ? 'rgba(245,158,11,0.1)' :
                        'rgba(147,51,234,0.1)',
                      color:
                        item.category === 'SRM' ? '#2563eb' :
                        item.category === 'Contract' ? '#10b981' :
                        item.category === 'MRO' ? '#f59e0b' :
                        '#9333ea'
                    }}
                  >
                    {item.category === 'SRM' ? '전자구매' :
                     item.category === 'Contract' ? '전자계약' :
                     item.category === 'MRO' ? 'MRO' : '원가관리'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default References;
