package com.portal.user.poll.qmc.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.common.service.CmmUseService;
import com.portal.user.poll.qmc.service.QustnrManageService;
import jakarta.annotation.Resource;

/**
 * 설문지 관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll")
public class QustnrManageController {

    @Resource(name = "qustnrManageService")
    private QustnrManageService qustnrManageService;

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;

    /**
     * 공통 코드를 조회한다.
     * @param codeId 공통코드ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/cmm/selectCmmCode.api", method = RequestMethod.GET)
    public Map<String, Object> selectCmmCode(@RequestParam("codeId") String codeId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> voComCode = new HashMap<>();
            voComCode.put("codeId", codeId);
            List<?> codeList = cmmUseService.selectCmmCodeDetail(voComCode);
            response.put("resultCode", "SUCCESS");
            response.put("resultList", codeList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/selectQustnrList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<?> qustnrList = qustnrManageService.selectQustnrManageList(searchMap);
            int totCnt = qustnrManageService.selectQustnrManageListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qustnrList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문 상세 정보를 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/selectQustnrDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrManageService.selectQustnrManageDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문을 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/insertQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnr(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrManageService.insertQustnrManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문을 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/updateQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnr(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrManageService.updateQustnrManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문을 삭제한다.
     * @param searchMap 삭제조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/deleteQustnr.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnr(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrManageService.deleteQustnrManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문 템플릿 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/qmc/selectQustnrTmplatList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> tmplatList = qustnrManageService.selectQustnrTmplatManageList(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("resultList", tmplatList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
