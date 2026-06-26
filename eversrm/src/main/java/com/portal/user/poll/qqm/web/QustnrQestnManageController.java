package com.portal.user.poll.qqm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.poll.qqm.service.QustnrQestnManageService;
import jakarta.annotation.Resource;

/**
 * 설문문항 관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll/qqm")
public class QustnrQestnManageController {

    @Resource(name = "qustnrQestnManageService")
    private QustnrQestnManageService qustnrQestnManageService;

    /**
     * 설문문항 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @param searchMode 조회모드
     * @param qestnrId 설문지ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrQestnList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrQestnList(@RequestParam Map<String, Object> searchMap,
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

            List<?> qestnList = qustnrQestnManageService.selectQustnrQestnManageList(searchMap);
            int totCnt = qustnrQestnManageService.selectQustnrQestnManageListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qestnList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문문항 상세 정보를 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrQestnDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrQestnDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrQestnManageService.selectQustnrQestnManageDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문문항을 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrQestn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrQestnManageService.insertQustnrQestnManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문문항을 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrQestn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrQestnManageService.updateQustnrQestnManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문문항을 삭제한다.
     * @param searchMap 삭제조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteQustnrQestn.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrQestn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrQestnManageService.deleteQustnrQestnManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
