import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import MainPage from '@/pages/MainPage';

import LoginUsr from '@/pages/auth/LoginUsr';

import NoticeList from '@/pages/board/notice/NoticeList';
import NoticeDetail from '@/pages/board/notice/NoticeDetail';
import NoticeForm from '@/pages/board/notice/NoticeForm';

import FaqList from '@/pages/user/help/faq/FaqList';
import FaqDetail from '@/pages/user/help/faq/FaqDetail';
import FaqForm from '@/pages/user/help/faq/FaqForm';

// Q&A
import QnaList from '@/pages/user/help/qna/QnaList';
import QnaDetail from '@/pages/user/help/qna/QnaDetail';
import QnaForm from '@/pages/user/help/qna/QnaForm';
import QnaPasswordConfirm from '@/pages/user/help/qna/QnaPasswordConfirm';

// Q&A 답변 관리 (관리자용)
import QnaAnswerList from '@/pages/user/help/qna/admin/QnaAnswerList';
import QnaAnswerDetail from '@/pages/user/help/qna/admin/QnaAnswerDetail';
import QnaAnswerForm from '@/pages/user/help/qna/admin/QnaAnswerForm';

// 설문지 관리 (qmc)
import QustnrList from '@/pages/user/poll/qmc/QustnrList';
import QustnrDetail from '@/pages/user/poll/qmc/QustnrDetail';
import QustnrForm from '@/pages/user/poll/qmc/QustnrForm';

// 설문문항 관리 (qqm)
import QustnrQestnList from '@/pages/user/poll/qqm/QustnrQestnList';
import QustnrQestnDetail from '@/pages/user/poll/qqm/QustnrQestnDetail';
import QustnrQestnForm from '@/pages/user/poll/qqm/QustnrQestnForm';

// 설문항목 관리 (qim)
import QustnrItemList from '@/pages/user/poll/qim/QustnrItemList';
import QustnrItemDetail from '@/pages/user/poll/qim/QustnrItemDetail';
import QustnrItemForm from '@/pages/user/poll/qim/QustnrItemForm';

// 설문응답 및 통계 (qnn)
import QustnrRespondList from '@/pages/user/poll/qnn/QustnrRespondList';
import QustnrRespondForm from '@/pages/user/poll/qnn/QustnrRespondForm';
import QustnrRespondStatistics from '@/pages/user/poll/qnn/QustnrRespondStatistics';

// 설문템플릿 관리 (qtm)
import QustnrTmplatManageList from '@/pages/user/poll/qtm/QustnrTmplatManageList';
import QustnrTmplatManageDetail from '@/pages/user/poll/qtm/QustnrTmplatManageDetail';
import QustnrTmplatManageForm from '@/pages/user/poll/qtm/QustnrTmplatManageForm';

// 설문응답결과 관리 (qri)
import QustnrRespondInfoList from '@/pages/user/poll/qri/QustnrRespondInfoList';
import QustnrRespondInfoDetail from '@/pages/user/poll/qri/QustnrRespondInfoDetail';
import QustnrRespondInfoForm from '@/pages/user/poll/qri/QustnrRespondInfoForm';

// 설문응답자정보 관리 (qrm)
import QustnrRespondManageList from '@/pages/user/poll/qrm/QustnrRespondManageList';
import QustnrRespondManageDetail from '@/pages/user/poll/qrm/QustnrRespondManageDetail';
import QustnrRespondManageForm from '@/pages/user/poll/qrm/QustnrRespondManageForm';

// 개인정보보호정책 관리 (ipm)
import IndvdlInfoPolicyList from '@/pages/user/policy/ipm/IndvdlInfoPolicyList';
import IndvdlInfoPolicyDetail from '@/pages/user/policy/ipm/IndvdlInfoPolicyDetail';
import IndvdlInfoPolicyForm from '@/pages/user/policy/ipm/IndvdlInfoPolicyForm';

// 이용약관 관리 (stp)
import StplatList from '@/pages/user/policy/stp/StplatList';
import StplatDetail from '@/pages/user/policy/stp/StplatDetail';
import StplatForm from '@/pages/user/policy/stp/StplatForm';

// 보안 관리 - 롤/권한/그룹
import RoleList from '@/pages/security/role/RoleList';
import RoleForm from '@/pages/security/role/RoleForm';
import AuthorList from '@/pages/security/author/AuthorList';
import AuthorForm from '@/pages/security/author/AuthorForm';
import GroupList from '@/pages/security/group/GroupList';
import GroupForm from '@/pages/security/group/GroupForm';
import AuthorGroupList from '@/pages/security/authorgroup/AuthorGroupList';

// 공통 에러 페이지
import AccessDenied from '@/pages/common/error/AccessDenied';
import DataAccessFailure from '@/pages/common/error/DataAccessFailure';
import EgovBizException from '@/pages/common/error/EgovBizException';
import EgovError from '@/pages/common/error/EgovError';
import TransactionFailure from '@/pages/common/error/TransactionFailure';

// 회원 및 회원관리 페이지
import EgovMberSbscrb from '@/pages/user/member/EgovMberSbscrb';
import EgovMberManage from '@/pages/user/member/EgovMberManage';
import EgovMberInsert from '@/pages/user/member/EgovMberInsert';
import EgovMberSelectUpdt from '@/pages/user/member/EgovMberSelectUpdt';
import EgovMberPasswordUpdt from '@/pages/user/member/EgovMberPasswordUpdt';

// 게시판 마스터 관리
import EgovBoardMstrList from '@/pages/board/bbs/EgovBoardMstrList';
import EgovBoardMstrRegist from '@/pages/board/bbs/EgovBoardMstrRegist';
import EgovBoardMstrUpdt from '@/pages/board/bbs/EgovBoardMstrUpdt';

// 게시판 사용관리 & 템플릿 관리
import EgovBoardUseInfList from '@/pages/board/com/EgovBoardUseInfList';
import EgovBoardUseInfRegist from '@/pages/board/com/EgovBoardUseInfRegist';
import EgovBoardUseInfInqire from '@/pages/board/com/EgovBoardUseInfInqire';
import EgovTemplateList from '@/pages/board/com/EgovTemplateList';
import EgovTemplateRegist from '@/pages/board/com/EgovTemplateRegist';
import EgovTemplateUpdt from '@/pages/board/com/EgovTemplateUpdt';

import AboutLayout from '@/components/layout/AboutLayout';
import EgovAboutSite from '@/pages/about/EgovAboutSite';
import EgovHistory from '@/pages/about/EgovHistory';
import EgovOrganization from '@/pages/about/EgovOrganization';
import EgovLocation from '@/pages/about/EgovLocation';

import ServiceLayout from '@/components/layout/ServiceLayout';
import EgovServiceIssuance from '@/pages/service/EgovServiceIssuance';
import EgovServiceManage from '@/pages/service/EgovServiceManage';
import EgovServiceResult from '@/pages/service/EgovServiceResult';

// Visual Screen Builder (독립 레이아웃, 동적 로딩)
const BuilderPage = React.lazy(() => import('@/builder/BuilderPage'));
const isBuilderEnabled = import.meta.env.VITE_BUILDER_ENABLED === 'true';

import '@/index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Visual Screen Builder — 독립 라우트 (운영 빌드 시 제외) */}
        {isBuilderEnabled && (
          <Route 
            path="/builder" 
            element={
              <Suspense fallback={<div style={{ padding: 20, color: '#fff' }}>Loading Builder...</div>}>
                <BuilderPage />
              </Suspense>
            } 
          />
        )}

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

          {/* Q&A */}
          <Route path="qna" element={<QnaList />} />
          <Route path="qna/new" element={<QnaForm />} />
          <Route path="qna/:id" element={<QnaDetail />} />
          <Route path="qna/:id/edit" element={<QnaForm />} />
          <Route path="qna/:id/confirm" element={<QnaPasswordConfirm />} />

          {/* Q&A 답변 관리 */}
          <Route path="admin/qna" element={<QnaAnswerList />} />
          <Route path="admin/qna/:id" element={<QnaAnswerDetail />} />
          <Route path="admin/qna/:id/answer" element={<QnaAnswerForm />} />

          {/* 설문지 관리 */}
          <Route path="admin/qustnr" element={<QustnrList />} />
          <Route path="admin/qustnr/new" element={<QustnrForm />} />
          <Route path="admin/qustnr/:id" element={<QustnrDetail />} />
          <Route path="admin/qustnr/:id/edit" element={<QustnrForm />} />

          {/* 설문문항 관리 */}
          <Route path="admin/qustnr-qestn" element={<QustnrQestnList />} />
          <Route path="admin/qustnr-qestn/new" element={<QustnrQestnForm />} />
          <Route path="admin/qustnr-qestn/:id" element={<QustnrQestnDetail />} />
          <Route path="admin/qustnr-qestn/:id/edit" element={<QustnrQestnForm />} />

          {/* 설문항목 관리 */}
          <Route path="admin/qustnr-item" element={<QustnrItemList />} />
          <Route path="admin/qustnr-item/new" element={<QustnrItemForm />} />
          <Route path="admin/qustnr-item/:id" element={<QustnrItemDetail />} />
          <Route path="admin/qustnr-item/:id/edit" element={<QustnrItemForm />} />

          {/* 설문응답 및 통계 */}
          <Route path="qustnr-respond" element={<QustnrRespondList />} />
          <Route path="qustnr-respond/:id/participate" element={<QustnrRespondForm />} />
          <Route path="qustnr-respond/:id/statistics" element={<QustnrRespondStatistics />} />

          {/* 설문템플릿 관리 */}
          <Route path="admin/qustnr-tmplat" element={<QustnrTmplatManageList />} />
          <Route path="admin/qustnr-tmplat/new" element={<QustnrTmplatManageForm />} />
          <Route path="admin/qustnr-tmplat/:id" element={<QustnrTmplatManageDetail />} />
          <Route path="admin/qustnr-tmplat/:id/edit" element={<QustnrTmplatManageForm />} />

          {/* 설문응답결과 관리 */}
          <Route path="admin/qustnr-respond-info" element={<QustnrRespondInfoList />} />
          <Route path="admin/qustnr-respond-info/new" element={<QustnrRespondInfoForm />} />
          <Route path="admin/qustnr-respond-info/:id" element={<QustnrRespondInfoDetail />} />
          <Route path="admin/qustnr-respond-info/:id/edit" element={<QustnrRespondInfoForm />} />

          {/* 설문응답자정보 관리 */}
          <Route path="admin/qustnr-respond-manage" element={<QustnrRespondManageList />} />
          <Route path="admin/qustnr-respond-manage/new" element={<QustnrRespondManageForm />} />
          <Route path="admin/qustnr-respond-manage/:id" element={<QustnrRespondManageDetail />} />
          <Route path="admin/qustnr-respond-manage/:id/edit" element={<QustnrRespondManageForm />} />

          {/* 개인정보보호정책 관리 */}
          <Route path="admin/policy" element={<IndvdlInfoPolicyList />} />
          <Route path="admin/policy/new" element={<IndvdlInfoPolicyForm />} />
          <Route path="admin/policy/:id" element={<IndvdlInfoPolicyDetail />} />
          <Route path="admin/policy/:id/edit" element={<IndvdlInfoPolicyForm />} />

          {/* 이용약관 관리 */}
          <Route path="admin/stplat" element={<StplatList />} />
          <Route path="admin/stplat/new" element={<StplatForm />} />
          <Route path="admin/stplat/:id" element={<StplatDetail />} />
          <Route path="admin/stplat/:id/edit" element={<StplatForm />} />

          {/* 보안 관리 - 롤/권한/그룹 */}
          <Route path="admin/role" element={<RoleList />} />
          <Route path="admin/role/:id" element={<RoleForm />} />
          <Route path="admin/author" element={<AuthorList />} />
          <Route path="admin/author/:id" element={<AuthorForm />} />
          <Route path="admin/group" element={<GroupList />} />
          <Route path="admin/group/:id" element={<GroupForm />} />
          <Route path="admin/author-group" element={<AuthorGroupList />} />

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
