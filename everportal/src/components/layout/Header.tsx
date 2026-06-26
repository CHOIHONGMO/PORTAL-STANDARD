import { useState } from 'react';
import { Link } from 'react-router-dom';
import IntroModal from '@/components/main/IntroModal';
import '@/components/layout/layout.css';

const Header = () => {
  const [isIntroOpen, setIsIntroOpen] = useState(false);

  return (
    <header className="header glass">
      <div className="container header-container">
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link to="/">
            <span className="logo-icon"></span>
            <strong>ST-ones</strong> Portal
          </Link>
          <button 
            onClick={() => setIsIntroOpen(true)}
            style={{ 
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              display: 'flex', alignItems: 'center'
            }}
            title="메뉴구성 설명"
          >
            <img src="/images/ico_question.png" alt="메뉴구성 설명" style={{ width: '18px', height: '18px' }} />
          </button>
        </div>
        <nav className="gnb">
          <ul>
            <li className="dropdown">
              <span className="nav-item dropdown-trigger">포털 소개 & 소식</span>
              <div className="mega-dropdown cols-2">
                <div className="mega-col">
                  <h4 className="mega-col-title">포털 소개</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/about" className="mega-link-item">
                        <span className="mega-link-title">사이트소개</span>
                        <span className="mega-link-desc">포털 서비스와 비전을 소개합니다.</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/history" className="mega-link-item">
                        <span className="mega-link-title">연혁</span>
                        <span className="mega-link-desc">포털의 주요 발자취와 역사입니다.</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/organization" className="mega-link-item">
                        <span className="mega-link-title">조직소개</span>
                        <span className="mega-link-desc">조직도 및 업무 분장 정보입니다.</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/location" className="mega-link-item">
                        <span className="mega-link-title">찾아오시는 길</span>
                        <span className="mega-link-desc">오시는 길과 연락처 안내입니다.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-col">
                  <h4 className="mega-col-title">정보마당</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/board/notice" className="mega-link-item">
                        <span className="mega-link-title">공지사항</span>
                        <span className="mega-link-desc">포털의 주요 소식 및 공지사항입니다.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="dropdown">
              <span className="nav-item dropdown-trigger">민원 & 설문</span>
              <div className="mega-dropdown cols-2">
                <div className="mega-col">
                  <h4 className="mega-col-title">민원 서비스</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/service/issuance" className="mega-link-item">
                        <span className="mega-link-title">민원발급</span>
                        <span className="mega-link-desc">각종 증명서 및 민원 서류 발급</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/service/apply" className="mega-link-item">
                        <span className="mega-link-title">민원신청</span>
                        <span className="mega-link-desc">온라인 민원 신청 및 접수</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/service/result" className="mega-link-item">
                        <span className="mega-link-title">민원결과확인</span>
                        <span className="mega-link-desc">신청한 민원의 처리 결과를 조회합니다.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="mega-col">
                  <h4 className="mega-col-title">의견 수렴</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/qustnr-respond" className="mega-link-item">
                        <span className="mega-link-title">설문참여</span>
                        <span className="mega-link-desc">설문조사에 참여하여 의견을 나누어 주세요.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="dropdown">
              <span className="nav-item dropdown-trigger">고객지원</span>
              <div className="mega-dropdown cols-1">
                <div className="mega-col">
                  <h4 className="mega-col-title">도움말 & 지원</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/faq" className="mega-link-item">
                        <span className="mega-link-title">FAQ</span>
                        <span className="mega-link-desc">자주 묻는 질문과 답변입니다.</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/qna" className="mega-link-item">
                        <span className="mega-link-title">Q&A</span>
                        <span className="mega-link-desc">궁금한 사항을 묻고 답하는 공간입니다.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="dropdown">
              <span className="nav-item dropdown-trigger">시스템 관리</span>
              <div className="mega-dropdown cols-4">
                <div className="mega-col">
                  <h4 className="mega-col-title">사용자 & 권한</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/admin/member" className="mega-link-item">
                        <span className="mega-link-title">회원 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/role" className="mega-link-item">
                        <span className="mega-link-title">롤 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/author" className="mega-link-item">
                        <span className="mega-link-title">권한 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/group" className="mega-link-item">
                        <span className="mega-link-title">그룹 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/author-group" className="mega-link-item">
                        <span className="mega-link-title">그룹 권한 관리</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mega-col">
                  <h4 className="mega-col-title">게시판 & 콘텐츠</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/admin/board" className="mega-link-item">
                        <span className="mega-link-title">게시판 생성 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/usage" className="mega-link-item">
                        <span className="mega-link-title">게시판 사용 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/template" className="mega-link-item">
                        <span className="mega-link-title">템플릿 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/qna" className="mega-link-item">
                        <span className="mega-link-title">Q&A 답변 관리</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mega-col">
                  <h4 className="mega-col-title">설문 관리</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/admin/qustnr" className="mega-link-item">
                        <span className="mega-link-title">설문지 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/qustnr-tmplat" className="mega-link-item">
                        <span className="mega-link-title">설문 템플릿 관리</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/qustnr-respond-info" className="mega-link-item">
                        <span className="mega-link-title">설문 응답 결과</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/qustnr-respond-manage" className="mega-link-item">
                        <span className="mega-link-title">설문 응답자 정보</span>
                      </Link>
                    </li>
                  </ul>
                </div>

                <div className="mega-col">
                  <h4 className="mega-col-title">정책 & 약관</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/admin/policy" className="mega-link-item">
                        <span className="mega-link-title">개인정보보호정책</span>
                      </Link>
                    </li>
                    <li>
                      <Link to="/admin/stplat" className="mega-link-item">
                        <span className="mega-link-title">약관 관리</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="dropdown">
              <span className="nav-item dropdown-trigger">빌더 테스트</span>
              <div className="mega-dropdown cols-1">
                <div className="mega-col">
                  <h4 className="mega-col-title">테스트 화면</h4>
                  <ul className="mega-link-list">
                    <li>
                      <Link to="/test/pr" className="mega-link-item">
                        <span className="mega-link-title">구매요청현황</span>
                        <span className="mega-link-desc">Screen Builder로 자동 생성된 화면입니다.</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </nav>

        <div className="header-utils">
          <Link to="/login" className="btn-login">로그인</Link>
          <Link to="/signup" className="btn-signup">회원가입</Link>
        </div>
      </div>

      <IntroModal isOpen={isIntroOpen} onClose={() => setIsIntroOpen(false)} />
    </header>
  );
};

export default Header;
