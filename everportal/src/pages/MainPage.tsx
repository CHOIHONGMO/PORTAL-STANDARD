import VisualBanner from '@/components/main/VisualBanner';
import ClientMarquee from '@/components/main/ClientMarquee';
import SolutionCards from '@/components/main/SolutionCards';
import BoardTabs from '@/components/main/BoardTabs';
import FaqSection from '@/components/main/FaqSection';
import ShortcutSection from '@/components/main/ShortcutSection';
import ContactBanner from '@/components/main/ContactBanner';

const MainPage = () => {
  return (
    <main className="container p_main" style={{ paddingBottom: '60px' }}>
      {/* 1. Hero Visual Banner (Ever SRM, Ever Contract, Ever MP 등) */}
      <VisualBanner />

      {/* 2. 주요 고객사 및 구축 실적 쇼케이스 */}
      <ClientMarquee />

      {/* 3. 5대 핵심 솔루션 라인업 카드 */}
      <SolutionCards />

      {/* 4. 공지사항 & 언론 보도자료 탭 */}
      <BoardTabs />

      {/* 5. FAQ & 숏컷 영역 */}
      <div className="g_area" style={{ marginTop: '32px' }}>
        <div className="left_col">
          <FaqSection />
        </div>
        <div className="right_col">
          <ShortcutSection />
        </div>
      </div>

      {/* 6. 솔루션 도입 문의 및 컨설팅 연락처 배너 */}
      <ContactBanner />
    </main>
  );
};

export default MainPage;
