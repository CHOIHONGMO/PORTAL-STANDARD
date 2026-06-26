package com.portal.user.poll.qri.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.poll.qri.service.QustnrRespondInfoService;
import com.portal.user.poll.qrm.service.QustnrRespondManageService;
import jakarta.annotation.Resource;

/**
 * 설문응답 및 설문응답결과를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll")
public class QustnrRespondInfoController {

    @Resource(name = "qustnrRespondInfoService")
    private QustnrRespondInfoService qustnrRespondInfoService;

    @Resource(name = "qustnrRespondManageService")
    private QustnrRespondManageService qustnrRespondManageService;

    /* ========================================================
     * 1. 설문응답 및 통계 (qnn) APIs
     * ======================================================== */

    /**
     * 설문 응답 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qnn/selectQustnrRespondList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = 10;
            int pageSize = 10;

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            List<?> respondList = qustnrRespondInfoService.selectQustnrRespondInfoManageList(searchMap);
            int totCnt = qustnrRespondInfoService.selectQustnrRespondInfoManageListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", respondList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문 상세 응답 정보를 조회한다 (문항, 항목 포함).
     * @param qestnrId 설문지ID
     * @param qestnrTmplatId 설문템플릿ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
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

    /**
     * 설문 응답 정보를 등록한다 (설문참여).
     * @param requestPayload 설문응답 데이터 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @SuppressWarnings("unchecked")
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
                            Map<String, Object> vo = new HashMap<>();
                            vo.put("qestnrTmplatId", qestnrTmplatId);
                            vo.put("qestnrId", qestnrId);
                            vo.put("qestnrQesitmId", qestnrQesitmId);
                            vo.put("qustnrIemId", qustnrIemId);
                            vo.put("respondAnswerCn", "");
                            vo.put("respondNm", respondNm);
                            vo.put("etcAnswerCn", (String) ans.get("etcAnswerCn_" + qustnrIemId));
                            vo.put("frstRegisterId", "USRCNFRM_00000000000");
                            vo.put("lastUpdusrId", "USRCNFRM_00000000000");
                            qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                        }
                    } else {
                        String qustnrIemId = (String) iemObj;
                        Map<String, Object> vo = new HashMap<>();
                        vo.put("qestnrTmplatId", qestnrTmplatId);
                        vo.put("qestnrId", qestnrId);
                        vo.put("qestnrQesitmId", qestnrQesitmId);
                        vo.put("qustnrIemId", qustnrIemId);
                        vo.put("respondAnswerCn", "");
                        vo.put("respondNm", respondNm);
                        vo.put("etcAnswerCn", (String) ans.get("etcAnswerCn"));
                        vo.put("frstRegisterId", "USRCNFRM_00000000000");
                        vo.put("lastUpdusrId", "USRCNFRM_00000000000");
                        qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                    }
                } else if ("2".equals(qestnTyCode)) { // 주관식
                    Map<String, Object> vo = new HashMap<>();
                    vo.put("qestnrTmplatId", qestnrTmplatId);
                    vo.put("qestnrId", qestnrId);
                    vo.put("qestnrQesitmId", qestnrQesitmId);
                    vo.put("qustnrIemId", null);
                    vo.put("respondAnswerCn", (String) ans.get("respondAnswerCn"));
                    vo.put("respondNm", respondNm);
                    vo.put("etcAnswerCn", null);
                    vo.put("frstRegisterId", "USRCNFRM_00000000000");
                    vo.put("lastUpdusrId", "USRCNFRM_00000000000");
                    qustnrRespondInfoService.insertQustnrRespondInfo(vo);
                }
            }

            // 설문 응답자 마스터 정보 저장
            Map<String, Object> manageVO = new HashMap<>();
            manageVO.put("qestnrId", qestnrId);
            manageVO.put("qestnrTmplatId", qestnrTmplatId);
            manageVO.put("sexdstnCode", sexdstnCode);
            manageVO.put("occpTyCode", occpTyCode);
            manageVO.put("brth", brth);
            manageVO.put("respondNm", respondNm);
            manageVO.put("frstRegisterId", "USRCNFRM_00000000000");
            manageVO.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrRespondManageService.insertQustnrRespondManage(manageVO);

            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문조사 통계 결과를 조회한다.
     * @param qestnrId 설문지ID
     * @param qestnrTmplatId 설문템플릿ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
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
     * 2. 설문응답결과 관리 (qri) APIs
     * ======================================================== */

    /**
     * 응답자결과 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @param searchMode 조회모드
     * @param qestnrId 설문지ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qri/selectQustnrRespondInfoList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondInfoList(@RequestParam Map<String, Object> searchMap,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrId", required = false) String qestnrId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrId != null) {
                searchMap.put("searchCondition", "QESTNR_ID");
                searchMap.put("searchKeyword", qestnrId);
            }
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = 10;
            int pageSize = 10;

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            List<?> list = qustnrRespondInfoService.selectQustnrRespondInfoList(searchMap);
            int totCnt = qustnrRespondInfoService.selectQustnrRespondInfoListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자결과 상세조회를 처리한다.
     * @param searchMap 상세조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qri/selectQustnrRespondInfoDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondInfoDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrRespondInfoService.selectQustnrRespondInfoDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자결과를 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qri/insertQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrRespondInfo(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrRespondInfoService.insertQustnrRespondInfo(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자결과를 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qri/updateQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrRespondInfo(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrRespondInfoService.updateQustnrRespondInfo(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자결과를 삭제한다.
     * @param searchMap 삭제정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qri/deleteQustnrRespondInfo.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrRespondInfo(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondInfoService.deleteQustnrRespondInfo(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
