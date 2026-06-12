import VisualBanner from '../components/main/VisualBanner';
import BoardTabs from '../components/main/BoardTabs';
import FaqSection from '../components/main/FaqSection';
import ShortcutSection from '../components/main/ShortcutSection';

const MainPage = () => {
  return (
    <main className="container p_main">
      <VisualBanner />
      
      <BoardTabs />
      
      <div className="g_area">
        <div className="left_col">
          <FaqSection />
        </div>
        <div className="right_col">
          <ShortcutSection />
        </div>
      </div>
    </main>
  );
};

export default MainPage;
