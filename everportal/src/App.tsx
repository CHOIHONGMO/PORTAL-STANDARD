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
import BizException from '@/pages/common/error/BizException';
import Error from '@/pages/common/error/Error';
import TransactionFailure from '@/pages/common/error/TransactionFailure';

// 회원 및 회원관리 페이지
import MberSbscrb from '@/pages/user/member/MberSbscrb';
import MberManage from '@/pages/user/member/MberManage';
import MberInsert from '@/pages/user/member/MberInsert';
import MberSelectUpdt from '@/pages/user/member/MberSelectUpdt';
import MberPasswordUpdt from '@/pages/user/member/MberPasswordUpdt';

// 게시판 마스터 관리
import BoardMstrList from '@/pages/board/bbs/BoardMstrList';
import BoardMstrRegist from '@/pages/board/bbs/BoardMstrRegist';
import BoardMstrUpdt from '@/pages/board/bbs/BoardMstrUpdt';

// 게시판 사용관리 & 템플릿 관리
import BoardUseInfList from '@/pages/board/com/BoardUseInfList';
import BoardUseInfRegist from '@/pages/board/com/BoardUseInfRegist';
import BoardUseInfInqire from '@/pages/board/com/BoardUseInfInqire';
import TemplateList from '@/pages/board/com/TemplateList';
import TemplateRegist from '@/pages/board/com/TemplateRegist';
import TemplateUpdt from '@/pages/board/com/TemplateUpdt';

// 테스트 생성 페이지
import PrList from '@/test/prList';

import AboutLayout from '@/components/layout/AboutLayout';
import AboutSite from '@/pages/about/AboutSite';
import History from '@/pages/about/History';
import Organization from '@/pages/about/Organization';
import Location from '@/pages/about/Location';

import ServiceLayout from '@/components/layout/ServiceLayout';
import ServiceIssuance from '@/pages/service/ServiceIssuance';
import ServiceManage from '@/pages/service/ServiceManage';
import ServiceResult from '@/pages/service/ServiceResult';

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
          <Route path="signup" element={<MberSbscrb />} />
          
          {/* 회원관리 (관리자용) */}
          <Route path="admin/member" element={<MberManage />} />
          <Route path="admin/member/new" element={<MberInsert />} />
          <Route path="admin/member/:id" element={<MberSelectUpdt />} />
          <Route path="admin/member/:id/password" element={<MberPasswordUpdt />} />

          {/* 테스트 페이지 */}
          <Route path="test/pr" element={<PrList />} />

          {/* 게시판 마스터 관리 */}
          <Route path="admin/board" element={<BoardMstrList />} />
          <Route path="admin/board/new" element={<BoardMstrRegist />} />
          <Route path="admin/board/:id" element={<BoardMstrUpdt />} />

          {/* 게시판 사용관리 */}
          <Route path="admin/usage" element={<BoardUseInfList />} />
          <Route path="admin/usage/new" element={<BoardUseInfRegist />} />
          <Route path="admin/usage/:bbsId/:trgetId" element={<BoardUseInfInqire />} />

          {/* 템플릿 관리 */}
          <Route path="admin/template" element={<TemplateList />} />
          <Route path="admin/template/new" element={<TemplateRegist />} />
          <Route path="admin/template/:id" element={<TemplateUpdt />} />

          {/* 포털소개 (About) */}
          <Route path="about" element={<AboutLayout />}>
            <Route index element={<AboutSite />} />
            <Route path="history" element={<History />} />
            <Route path="organization" element={<Organization />} />
            <Route path="location" element={<Location />} />
          </Route>

          {/* 민원광장 (Service Plaza) */}
          <Route path="service" element={<ServiceLayout />}>
            <Route path="issuance" element={<ServiceIssuance />} />
            <Route path="apply" element={<ServiceManage />} />
            <Route path="result" element={<ServiceResult />} />
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
          <Route path="cmm/error/egovBizException" element={<BizException />} />
          <Route path="cmm/error/egovError" element={<Error />} />
          <Route path="cmm/error/transactionFailure" element={<TransactionFailure />} />
          
          {/* 404 예외 처리 */}
          <Route path="*" element={<div className="container p_main"><div className="page-header"><h2>페이지를 찾을 수 없습니다.</h2></div></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
