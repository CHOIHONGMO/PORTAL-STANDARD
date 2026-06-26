package com.portal.user.poll.qim.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.poll.qim.service.QustnrItemManageService;
import jakarta.annotation.Resource;

/**
 * 설문항목 관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll/qim")
public class QustnrItemManageController {

    @Resource(name = "qustnrItemManageService")
    private QustnrItemManageService qustnrItemManageService;

    /**
     * 설문항목 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @param searchMode 조회모드
     * @param qestnrQesitmId 설문문항ID
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrItemList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrItemList(@RequestParam Map<String, Object> searchMap,
            @RequestParam(value = "searchMode", required = false) String searchMode,
            @RequestParam(value = "qestnrQesitmId", required = false) String qestnrQesitmId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("Y".equals(searchMode) && qestnrQesitmId != null) {
                searchMap.put("searchCondition", "QUSTNR_QESITM_ID");
                searchMap.put("searchKeyword", qestnrQesitmId);
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

            List<?> itemList = qustnrItemManageService.selectQustnrItemManageList(searchMap);
            int totCnt = qustnrItemManageService.selectQustnrItemManageListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", itemList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문항목 상세 정보를 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrItemDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrItemDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrItemManageService.selectQustnrItemManageDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문항목을 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrItem(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrItemManageService.insertQustnrItemManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문항목을 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrItem(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            qustnrItemManageService.updateQustnrItemManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문항목을 삭제한다.
     * @param searchMap 삭제조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteQustnrItem.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrItem(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrItemManageService.deleteQustnrItemManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
