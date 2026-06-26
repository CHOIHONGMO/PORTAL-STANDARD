package com.portal.security.authority.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.security.authority.service.AuthorManageService;
import jakarta.annotation.Resource;

/**
 * 권한관리 REST API 컨트롤러
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/security/author")
public class AuthorManageController {

    @Resource(name = "authorManageService")
    private AuthorManageService authorManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 권한 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectAuthorList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = propertiesService.getInt("pageUnit");
            int pageSize = propertiesService.getInt("pageSize");

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            List<Map<String, Object>> resultList = authorManageService.selectAuthorList(searchMap);
            int totCnt = authorManageService.selectAuthorListTotCnt(searchMap);
            paginationInfo.setTotalRecordCount(totCnt);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", resultList);
            response.put("totalCount", totCnt);
            response.put("paginationInfo", paginationInfo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 전체 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectAuthorAllList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorAllList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<Map<String, Object>> resultList = authorManageService.selectAuthorAllList(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("resultList", resultList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 상세 정보를 조회한다.
     * @param authorCode 권한코드
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectAuthor.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthor(@RequestParam("authorCode") String authorCode) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("authorCode", authorCode);
            Map<String, Object> result = authorManageService.selectAuthor(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", result);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한을 등록한다.
     * @param authorManage 등록정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertAuthor.api", method = RequestMethod.POST)
    public Map<String, Object> insertAuthor(@RequestBody Map<String, Object> authorManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            authorManageService.insertAuthor(authorManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 정보를 수정한다.
     * @param authorManage 수정정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateAuthor.api", method = RequestMethod.POST)
    public Map<String, Object> updateAuthor(@RequestBody Map<String, Object> authorManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            authorManageService.updateAuthor(authorManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 목록을 삭제한다.
     * @param requestBody 삭제할 대상 목록 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteAuthorList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteAuthorList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] authorCodes = checkedIdForDel.split(",");
            for (String authorCode : authorCodes) {
                Map<String, Object> authorManage = new HashMap<>();
                authorManage.put("authorCode", authorCode.trim());
                authorManageService.deleteAuthor(authorManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

}
