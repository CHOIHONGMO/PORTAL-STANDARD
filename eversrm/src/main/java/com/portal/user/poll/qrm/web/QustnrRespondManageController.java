package com.portal.user.poll.qrm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.poll.qrm.service.QustnrRespondManageService;
import jakarta.annotation.Resource;

/**
 * 설문응답자관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll/qrm")
public class QustnrRespondManageController {

    @Resource(name = "qustnrRespondManageService")
    private QustnrRespondManageService qustnrRespondManageService;

    /**
     * 응답자정보 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @param searchMode 조회모드
     * @param qestnrId 설문지ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrRespondManageList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondManageList(@RequestParam Map<String, Object> searchMap,
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

            List<?> list = qustnrRespondManageService.selectQustnrRespondManageList(searchMap);
            int totCnt = qustnrRespondManageService.selectQustnrRespondManageListCnt(searchMap);

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
     * 응답자정보 상세조회를 처리한다.
     * @param searchMap 상세조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrRespondManageDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrRespondManageDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrRespondManageService.selectQustnrRespondManageDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자정보를 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrRespondManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrRespondManageService.insertQustnrRespondManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자정보를 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrRespondManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrRespondManageService.updateQustnrRespondManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 응답자정보를 삭제한다.
     * @param searchMap 삭제정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteQustnrRespondManage.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrRespondManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrRespondManageService.deleteQustnrRespondManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
