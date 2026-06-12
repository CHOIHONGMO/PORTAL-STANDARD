package com.portal.api.uss.olp.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.common.ComDefaultCodeVO;
import com.portal.common.ComDefaultVO;
import com.portal.common.service.CmmUseService;
import com.portal.user.olp.qmc.service.QustnrManageService;
import com.portal.user.olp.qmc.service.QustnrManageVO;
import com.portal.user.olp.qqm.service.QustnrQestnManageService;
import com.portal.user.olp.qqm.service.QustnrQestnManageVO;
import com.portal.user.olp.qim.service.QustnrItemManageService;
import com.portal.user.olp.qim.service.QustnrItemManageVO;
import com.portal.user.olp.qri.service.QustnrRespondInfoService;
import com.portal.user.olp.qri.service.QustnrRespondInfoVO;
import com.portal.user.olp.qrm.service.QustnrRespondManageService;
import com.portal.user.olp.qrm.service.QustnrRespondManageVO;
import com.portal.user.olp.qtm.service.QustnrTmplatManageService;
import com.portal.user.olp.qtm.service.QustnrTmplatManageVO;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api/uss/olp")
public class QustnrApiManageController {

    @Autowired
    @Qualifier("egovQustnrManageService")
    private QustnrManageService qustnrManageService;

    @Autowired
    @Qualifier("egovQustnrQestnManageService")
    private QustnrQestnManageService qustnrQestnManageService;

    @Autowired
    @Qualifier("egovQustnrItemManageService")
    private QustnrItemManageService qustnrItemManageService;

    @Autowired
    @Qualifier("egovQustnrRespondInfoService")
    private QustnrRespondInfoService qustnrRespondInfoService;

    @Autowired
    @Qualifier("egovQustnrRespondManageService")
    private QustnrRespondManageService qustnrRespondManageService;

    @Autowired
    @Qualifier("egovQustnrTmplatManageService")
    private QustnrTmplatManageService qustnrTmplatManageService;

    @Autowired
    @Qualifier("CmmUseService")
    private CmmUseService cmmUseService;

    // 공통 코드 조회 API (COM034: 직업유형, COM014: 성별, COM018: 질문유형)
    @RequestMapping(value = "/cmm/selectCmmCode.api", method = RequestMethod.GET)
    public Map<String, Object> selectCmmCode(@RequestParam("codeId") String codeId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            ComDefaultCodeVO voComCode = new ComDefaultCodeVO();
            voComCode.setCodeId(codeId);
            List<?> codeList = cmmUseService.selectCmmCodeDetail(voComCode);
            response.put("resultCode", "SUCCESS");
            response.put("resultList", codeList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 1. 설문지 관리 (qmc) APIs
     * ======================================================== */

    @RequestMapping(value = "/qmc/selectQustnrList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrList(@ModelAttribute("searchVO") ComDefaultVO searchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> qustnrList = qustnrManageService.selectQustnrManageList(searchVO);
            int totCnt = qustnrManageService.selectQustnrManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qustnrList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qmc/selectQustnrDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrDetail(@ModelAttribute QustnrManageVO qustnrManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrManageService.selectQustnrManageDetail(qustnrManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qmc/insertQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnr(@RequestBody QustnrManageVO qustnrManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrManageService.insertQustnrManage(qustnrManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qmc/updateQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnr(@RequestBody QustnrManageVO qustnrManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrManageService.updateQustnrManage(qustnrManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qmc/deleteQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnr(@RequestBody QustnrManageVO qustnrManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrManageService.deleteQustnrManage(qustnrManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qmc/selectQustnrTmplatList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatList(@ModelAttribute QustnrManageVO qustnrManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> tmplatList = qustnrManageService.selectQustnrTmplatManageList(qustnrManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("resultList", tmplatList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 2. 설문문항 관리 (qqm) APIs
     * ======================================================== */

    @RequestMapping(value = "/qqm/selectQustnrQestnList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrQestnList(@ModelAttribute("searchVO") ComDefaultVO searchVO,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrId", required = false) String qestnrId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrId != null) {
                searchVO.setSearchCondition("QESTNR_ID");
                searchVO.setSearchKeyword(qestnrId);
            }
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> qestnList = qustnrQestnManageService.selectQustnrQestnManageList(searchVO);
            int totCnt = qustnrQestnManageService.selectQustnrQestnManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qestnList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qqm/selectQustnrQestnDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrQestnDetail(@ModelAttribute QustnrQestnManageVO qustnrQestnManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrQestnManageService.selectQustnrQestnManageDetail(qustnrQestnManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qqm/insertQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrQestn(@RequestBody QustnrQestnManageVO qustnrQestnManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrQestnManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrQestnManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrQestnManageService.insertQustnrQestnManage(qustnrQestnManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qqm/updateQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrQestn(@RequestBody QustnrQestnManageVO qustnrQestnManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrQestnManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrQestnManageService.updateQustnrQestnManage(qustnrQestnManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qqm/deleteQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrQestn(@RequestBody QustnrQestnManageVO qustnrQestnManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrQestnManageService.deleteQustnrQestnManage(qustnrQestnManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 3. 설문항목 관리 (qim) APIs
     * ======================================================== */

    @RequestMapping(value = "/qim/selectQustnrItemList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrItemList(@ModelAttribute("searchVO") ComDefaultVO searchVO,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrQesitmId", required = false) String qestnrQesitmId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrQesitmId != null) {
                searchVO.setSearchCondition("QUSTNR_QESITM_ID");
                searchVO.setSearchKeyword(qestnrQesitmId);
            }
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> itemList = qustnrItemManageService.selectQustnrItemManageList(searchVO);
            int totCnt = qustnrItemManageService.selectQustnrItemManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", itemList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qim/selectQustnrItemDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrItemDetail(@ModelAttribute QustnrItemManageVO qustnrItemManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrItemManageService.selectQustnrItemManageDetail(qustnrItemManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qim/insertQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrItem(@RequestBody QustnrItemManageVO qustnrItemManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrItemManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrItemManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrItemManageService.insertQustnrItemManage(qustnrItemManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qim/updateQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrItem(@RequestBody QustnrItemManageVO qustnrItemManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrItemManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrItemManageService.updateQustnrItemManage(qustnrItemManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qim/deleteQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrItem(@RequestBody QustnrItemManageVO qustnrItemManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrItemManageService.deleteQustnrItemManage(qustnrItemManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 4. 설문응답 및 통계 (qnn/qri) APIs
     * ======================================================== */

    @RequestMapping(value = "/qnn/selectQustnrRespondList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondList(@ModelAttribute("searchVO") ComDefaultVO searchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> respondList = qustnrRespondInfoService.selectQustnrRespondInfoManageList(searchVO);
            int totCnt = qustnrRespondInfoService.selectQustnrRespondInfoManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", respondList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qnn/selectQustnrRespondDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondDetail(@RequestParam("qestnrId") String qestnrId,
            @RequestParam("qestnrTmplatId") String qestnrTmplatId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> commandMap = new HashMap<>();
            commandMap.put("qestnrId", qestnrId);
            commandMap.put("qestnrTmplatId", qestnrTmplatId);

            // 설문정보
            Object qustnrInfo = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqestnrinfo(commandMap);
            // 문항정보
            List<?> qestnList = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqustnrqesitm(commandMap);
            // 항목정보
            List<?> itemList = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqustnriem(commandMap);

            response.put("resultCode", "SUCCESS");
            response.put("qustnrInfo", qustnrInfo);
            response.put("qestnList", qestnList);
            response.put("itemList", itemList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qnn/insertQustnrRespond.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrRespond(@RequestBody Map<String, Object> requestPayload) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String qestnrId = (String) requestPayload.get("qestnrId");
            String qestnrTmplatId = (String) requestPayload.get("qestnrTmplatId");
            String sexdstnCode = (String) requestPayload.get("sexdstnCode");
            String occpTyCode = (String) requestPayload.get("occpTyCode");
            String brth = (String) requestPayload.get("brth");
            String respondNm = (String) requestPayload.get("respondNm");

            List<Map<String, Object>> answers = (List<Map<String, Object>>) requestPayload.get("answers");

            for (Map<String, Object> ans : answers) {
                String qestnrQesitmId = (String) ans.get("qestnrQesitmId");
                String qestnTyCode = (String) ans.get("qestnTyCode");

                if ("1".equals(qestnTyCode)) { // 객관식
                    Object iemObj = ans.get("qustnrIemId");
                    if (iemObj instanceof List) {
                        List<String> iemList = (List<String>) iemObj;
                        for (String qustnrIemId : iemList) {
                            QustnrRespondInfoVO vo = new QustnrRespondInfoVO();
                            vo.setQestnrTmplatId(qestnrTmplatId);
                            vo.setQestnrId(qestnrId);
                            vo.setQestnrQesitmId(qestnrQesitmId);
                            vo.setQustnrIemId(qustnrIemId);
                            vo.setRespondAnswerCn("");
                            vo.setRespondNm(respondNm);
                            vo.setEtcAnswerCn((String) ans.get("etcAnswerCn_" + qustnrIemId));
                            vo.setFrstRegisterId("USRCNFRM_00000000000");
                            vo.setLastUpdusrId("USRCNFRM_00000000000");
                            qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                        }
                    } else {
                        String qustnrIemId = (String) iemObj;
                        QustnrRespondInfoVO vo = new QustnrRespondInfoVO();
                        vo.setQestnrTmplatId(qestnrTmplatId);
                        vo.setQestnrId(qestnrId);
                        vo.setQestnrQesitmId(qestnrQesitmId);
                        vo.setQustnrIemId(qustnrIemId);
                        vo.setRespondAnswerCn("");
                        vo.setRespondNm(respondNm);
                        vo.setEtcAnswerCn((String) ans.get("etcAnswerCn"));
                        vo.setFrstRegisterId("USRCNFRM_00000000000");
                        vo.setLastUpdusrId("USRCNFRM_00000000000");
                        qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                    }
                } else if ("2".equals(qestnTyCode)) { // 주관식
                    QustnrRespondInfoVO vo = new QustnrRespondInfoVO();
                    vo.setQestnrTmplatId(qestnrTmplatId);
                    vo.setQestnrId(qestnrId);
                    vo.setQestnrQesitmId(qestnrQesitmId);
                    vo.setQustnrIemId(null);
                    vo.setRespondAnswerCn((String) ans.get("respondAnswerCn"));
                    vo.setRespondNm(respondNm);
                    vo.setEtcAnswerCn(null);
                    vo.setFrstRegisterId("USRCNFRM_00000000000");
                    vo.setLastUpdusrId("USRCNFRM_00000000000");
                    qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                }
            }

            // 설문 응답자 마스터 정보 저장
            QustnrRespondManageVO manageVO = new QustnrRespondManageVO();
            manageVO.setQestnrId(qestnrId);
            manageVO.setQestnrTmplatId(qestnrTmplatId);
            manageVO.setSexdstnCode(sexdstnCode);
            manageVO.setOccpTyCode(occpTyCode);
            manageVO.setBrth(brth);
            manageVO.setRespondNm(respondNm);
            manageVO.setFrstRegisterId("USRCNFRM_00000000000");
            manageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrRespondManageService.insertQustnrRespondManage(manageVO);

            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qnn/selectQustnrStatistics.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrStatistics(@RequestParam("qestnrId") String qestnrId,
            @RequestParam("qestnrTmplatId") String qestnrTmplatId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> commandMap = new HashMap<>();
            commandMap.put("qestnrId", qestnrId);
            commandMap.put("qestnrTmplatId", qestnrTmplatId);

            // 설문정보
            Object qustnrInfo = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqestnrinfo(commandMap);
            // 문항정보
            List<?> qestnList = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqustnrqesitm(commandMap);
            // 항목정보
            List<?> itemList = qustnrRespondInfoService.selectQustnrRespondInfoManageComtnqustnriem(commandMap);
            // 객관식 통계 결과
            List<?> qestnrStatistic1 = qustnrRespondInfoService.selectQustnrRespondInfoManageStatistics1(commandMap);
            // 주관식 통계 결과
            List<?> qestnrStatistic2 = qustnrRespondInfoService.selectQustnrRespondInfoManageStatistics2(commandMap);

            response.put("resultCode", "SUCCESS");
            response.put("qustnrInfo", qustnrInfo);
            response.put("qestnList", qestnList);
            response.put("itemList", itemList);
            response.put("qestnrStatistic1", qestnrStatistic1);
            response.put("qestnrStatistic2", qestnrStatistic2);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 5. 설문응답결과 관리 (qri) APIs
     * ======================================================== */

    @RequestMapping(value = "/qri/selectQustnrRespondInfoList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondInfoList(@ModelAttribute("searchVO") ComDefaultVO searchVO,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrId", required = false) String qestnrId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrId != null) {
                searchVO.setSearchCondition("QESTNR_ID");
                searchVO.setSearchKeyword(qestnrId);
            }
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> list = qustnrRespondInfoService.selectQustnrRespondInfoList(searchVO);
            int totCnt = qustnrRespondInfoService.selectQustnrRespondInfoListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qri/selectQustnrRespondInfoDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondInfoDetail(@ModelAttribute QustnrRespondInfoVO qustnrRespondInfoVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrRespondInfoService.selectQustnrRespondInfoDetail(qustnrRespondInfoVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qri/insertQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrRespondInfo(@RequestBody QustnrRespondInfoVO qustnrRespondInfoVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondInfoVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrRespondInfoVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrRespondInfoService.insertQustnrRespondInfo(qustnrRespondInfoVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qri/updateQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrRespondInfo(@RequestBody QustnrRespondInfoVO qustnrRespondInfoVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondInfoVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrRespondInfoService.updateQustnrRespondInfo(qustnrRespondInfoVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qri/deleteQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrRespondInfo(@RequestBody QustnrRespondInfoVO qustnrRespondInfoVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondInfoService.deleteQustnrRespondInfo(qustnrRespondInfoVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 6. 설문응답자정보 관리 (qrm) APIs
     * ======================================================== */

    @RequestMapping(value = "/qrm/selectQustnrRespondManageList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondManageList(@ModelAttribute("searchVO") ComDefaultVO searchVO,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrId", required = false) String qestnrId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrId != null) {
                searchVO.setSearchCondition("QESTNR_ID");
                searchVO.setSearchKeyword(qestnrId);
            }
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> list = qustnrRespondManageService.selectQustnrRespondManageList(searchVO);
            int totCnt = qustnrRespondManageService.selectQustnrRespondManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qrm/selectQustnrRespondManageDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondManageDetail(@ModelAttribute QustnrRespondManageVO qustnrRespondManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrRespondManageService.selectQustnrRespondManageDetail(qustnrRespondManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qrm/insertQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrRespondManage(@RequestBody QustnrRespondManageVO qustnrRespondManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrRespondManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrRespondManageService.insertQustnrRespondManage(qustnrRespondManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qrm/updateQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrRespondManage(@RequestBody QustnrRespondManageVO qustnrRespondManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qustnrRespondManageService.updateQustnrRespondManage(qustnrRespondManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qrm/deleteQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrRespondManage(@RequestBody QustnrRespondManageVO qustnrRespondManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondManageService.deleteQustnrRespondManage(qustnrRespondManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* ========================================================
     * 7. 설문템플릿 관리 (qtm) APIs
     * ======================================================== */

    @RequestMapping(value = "/qtm/selectQustnrTmplatManageList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatManageList(@ModelAttribute("searchVO") ComDefaultVO searchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> list = qustnrTmplatManageService.selectQustnrTmplatManageList(searchVO);
            int totCnt = qustnrTmplatManageService.selectQustnrTmplatManageListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qtm/selectQustnrTmplatManageDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatManageDetail(@ModelAttribute QustnrTmplatManageVO qustnrTmplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrTmplatManageService.selectQustnrTmplatManageDetail(qustnrTmplatManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qtm/selectQustnrTmplatManageImg.api", method = RequestMethod.GET)
    public void selectQustnrTmplatManageImg(HttpServletResponse response, @ModelAttribute QustnrTmplatManageVO qustnrTmplatManageVO) throws Exception {
        try {
            Map<?, ?> mapResult = qustnrTmplatManageService.selectQustnrTmplatManageTmplatImagepathnm(qustnrTmplatManageVO);
            byte[] img = (byte[]) mapResult.get("QUSTNR_TMPLAT_IMAGE_INFOPATHNM");
            if (img != null) {
                response.setHeader("Content-Type", "image/jpeg");
                response.setHeader("Content-Length", "" + img.length);
                response.getOutputStream().write(img);
                response.getOutputStream().flush();
                response.getOutputStream().close();
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    @RequestMapping(value = "/qtm/insertQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrTmplatManage(@RequestBody QustnrTmplatManageVO qustnrTmplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrTmplatManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qustnrTmplatManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            if (qustnrTmplatManageVO.getQestnrTmplatImagepathnm() == null && qustnrTmplatManageVO.getQestnrTmplatImagepathnmVal() != null) {
                String base64Str = qustnrTmplatManageVO.getQestnrTmplatImagepathnmVal();
                if (base64Str.contains(",")) {
                    base64Str = base64Str.split(",")[1];
                }
                qustnrTmplatManageVO.setQestnrTmplatImagepathnm(java.util.Base64.getDecoder().decode(base64Str));
            }
            qustnrTmplatManageService.insertQustnrTmplatManage(qustnrTmplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qtm/updateQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrTmplatManage(@RequestBody QustnrTmplatManageVO qustnrTmplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrTmplatManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            if (qustnrTmplatManageVO.getQestnrTmplatImagepathnm() == null && qustnrTmplatManageVO.getQestnrTmplatImagepathnmVal() != null) {
                String base64Str = qustnrTmplatManageVO.getQestnrTmplatImagepathnmVal();
                if (base64Str.contains(",")) {
                    base64Str = base64Str.split(",")[1];
                }
                qustnrTmplatManageVO.setQestnrTmplatImagepathnm(java.util.Base64.getDecoder().decode(base64Str));
            }
            qustnrTmplatManageService.updateQustnrTmplatManage(qustnrTmplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/qtm/deleteQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrTmplatManage(@RequestBody QustnrTmplatManageVO qustnrTmplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrTmplatManageService.deleteQustnrTmplatManage(qustnrTmplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
