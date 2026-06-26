package com.portal.user.policy.stp.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.policy.stp.service.StplatManageService;
import jakarta.annotation.Resource;

/**
 * 약관관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/policy/stp")
public class StplatManageController {

    @Resource(name = "stplatManageService")
    private StplatManageService stplatManageService;

    /**
     * 약관 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectStplatList.api", method = RequestMethod.GET)
    public Map<String, Object> selectStplatList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<?> list = stplatManageService.selectStplatList(searchMap);
            int totCnt = stplatManageService.selectStplatListTotCnt(searchMap);

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
     * 약관 상세조회를 처리한다.
     * @param searchMap 상세조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectStplatDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectStplatDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> detail = stplatManageService.selectStplatDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 약관 정보를 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> insertStplatCn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            stplatManageService.insertStplatCn(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 약관 정보를 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> updateStplatCn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            stplatManageService.updateStplatCn(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 약관 정보를 삭제한다.
     * @param searchMap 삭제정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> deleteStplatCn(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            stplatManageService.deleteStplatCn(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

}
