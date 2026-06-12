import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import MainPage from './pages/MainPage';

import LoginUsr from './pages/login/LoginUsr';

import NoticeList from './pages/board/NoticeList';
import NoticeDetail from './pages/board/NoticeDetail';
import NoticeForm from './pages/board/NoticeForm';

import FaqList from './pages/faq/FaqList';
import FaqDetail from './pages/faq/FaqDetail';
import FaqForm from './pages/faq/FaqForm';

// 공통 에러 페이지
import AccessDenied from './pages/cmm/error/AccessDenied';
import DataAccessFailure from './pages/cmm/error/DataAccessFailure';
import EgovBizException from './pages/cmm/error/EgovBizException';
import EgovError from './pages/cmm/error/EgovError';
import TransactionFailure from './pages/cmm/error/TransactionFailure';

// 회원 및 회원관리 페이지
import EgovMberSbscrb from './pages/cmm/uss/umt/EgovMberSbscrb';
import EgovMberManage from './pages/cmm/uss/umt/EgovMberManage';
import EgovMberInsert from './pages/cmm/uss/umt/EgovMberInsert';
import EgovMberSelectUpdt from './pages/cmm/uss/umt/EgovMberSelectUpdt';
import EgovMberPasswordUpdt from './pages/cmm/uss/umt/EgovMberPasswordUpdt';

// 게시판 마스터 관리
import EgovBoardMstrList from './pages/cop/bbs/EgovBoardMstrList';
import EgovBoardMstrRegist from './pages/cop/bbs/EgovBoardMstrRegist';
import EgovBoardMstrUpdt from './pages/cop/bbs/EgovBoardMstrUpdt';

// 게시판 사용관리 & 템플릿 관리
import EgovBoardUseInfList from './pages/cop/com/EgovBoardUseInfList';
import EgovBoardUseInfRegist from './pages/cop/com/EgovBoardUseInfRegist';
import EgovBoardUseInfInqire from './pages/cop/com/EgovBoardUseInfInqire';
import EgovTemplateList from './pages/cop/com/EgovTemplateList';
import EgovTemplateRegist from './pages/cop/com/EgovTemplateRegist';
import EgovTemplateUpdt from './pages/cop/com/EgovTemplateUpdt';

import AboutLayout from './components/layout/AboutLayout';
import EgovAboutSite from './pages/about/EgovAboutSite';
import EgovHistory from './pages/about/EgovHistory';
import EgovOrganization from './pages/about/EgovOrganization';
import EgovLocation from './pages/about/EgovLocation';

import ServiceLayout from './components/layout/ServiceLayout';
import EgovServiceIssuance from './pages/service/EgovServiceIssuance';
import EgovServiceManage from './pages/service/EgovServiceManage';
import EgovServiceResult from './pages/service/EgovServiceResult';

import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<MainPage />} />
          
          {/* 로그인 & 회원가입 */}
          <Route path="login" element={<LoginUsr />} />
          <Route path="signup" element={<EgovMberSbscrb />} />
          
          {/* 회원관리 (관리자용) */}
          <Route path="admin/member" element={<EgovMberManage />} />
          <Route path="admin/member/new" element={<EgovMberInsert />} />
          <Route path="admin/member/:id" element={<EgovMberSelectUpdt />} />
          <Route path="admin/member/:id/password" element={<EgovMberPasswordUpdt />} />

          {/* 게시판 마스터 관리 */}
          <Route path="admin/board" element={<EgovBoardMstrList />} />
          <Route path="admin/board/new" element={<EgovBoardMstrRegist />} />
          <Route path="admin/board/:id" element={<EgovBoardMstrUpdt />} />

          {/* 게시판 사용관리 */}
          <Route path="admin/usage" element={<EgovBoardUseInfList />} />
          <Route path="admin/usage/new" element={<EgovBoardUseInfRegist />} />
          <Route path="admin/usage/:bbsId/:trgetId" element={<EgovBoardUseInfInqire />} />

          {/* 템플릿 관리 */}
          <Route path="admin/template" element={<EgovTemplateList />} />
          <Route path="admin/template/new" element={<EgovTemplateRegist />} />
          <Route path="admin/template/:id" element={<EgovTemplateUpdt />} />

          {/* 포털소개 (About) */}
          <Route path="about" element={<AboutLayout />}>
            <Route index element={<EgovAboutSite />} />
            <Route path="history" element={<EgovHistory />} />
            <Route path="organization" element={<EgovOrganization />} />
            <Route path="location" element={<EgovLocation />} />
          </Route>

          {/* 민원광장 (Service Plaza) */}
          <Route path="service" element={<ServiceLayout />}>
            <Route path="issuance" element={<EgovServiceIssuance />} />
            <Route path="apply" element={<EgovServiceManage />} />
            <Route path="result" element={<EgovServiceResult />} />
          </Route>
          
          {/* 게시판 (공지사항 기준) */}
          <Route path="board/notice" element={<NoticeList />} />
          <Route path="board/notice/new" element={<NoticeForm />} />
          <Route path="board/notice/:id" element={<NoticeDetail />} />
          <Route path="board/notice/:id/edit" element={<NoticeForm />} />
          
          {/* FAQ */}
          <Route path="faq" element={<FaqList />} />
          <Route path="faq/new" element={<FaqForm />} />
          <Route path="faq/:id" element={<FaqDetail />} />
          <Route path="faq/:id/edit" element={<FaqForm />} />

          {/* 에러 페이지 */}
          <Route path="cmm/error/accessDenied" element={<AccessDenied />} />
          <Route path="cmm/error/dataAccessFailure" element={<DataAccessFailure />} />
          <Route path="cmm/error/egovBizException" element={<EgovBizException />} />
          <Route path="cmm/error/egovError" element={<EgovError />} />
          <Route path="cmm/error/transactionFailure" element={<TransactionFailure />} />
          
          {/* 404 예외 처리 */}
          <Route path="*" element={<div className="container p_main"><div className="page-header"><h2>페이지를 찾을 수 없습니다.</h2></div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
