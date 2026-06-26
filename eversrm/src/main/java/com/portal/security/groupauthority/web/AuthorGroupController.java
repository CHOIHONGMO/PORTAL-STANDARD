package com.portal.security.groupauthority.web;

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

import com.portal.security.groupauthority.service.AuthorGroupService;
import jakarta.annotation.Resource;

/**
 * 사용자별 권한관리 REST API 컨트롤러
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/security/authorGroup")
public class AuthorGroupController {

    @Resource(name = "authorGroupService")
    private AuthorGroupService authorGroupService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 사용자별 권한 할당 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectAuthorGroupList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorGroupList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<Map<String, Object>> resultList = authorGroupService.selectAuthorGroupList(searchMap);
            int totCnt = authorGroupService.selectAuthorGroupListTotCnt(searchMap);
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
     * 사용자 권한을 등록/수정한다.
     * @param requestBody 등록할 사용자 권한 매핑 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertAuthorGroup.api", method = RequestMethod.POST)
    public Map<String, Object> insertAuthorGroup(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String userIds = requestBody.get("userIds");
            String authorCodes = requestBody.get("authorCodes");
            String regYns = requestBody.get("regYns");
            String mberTyCodes = requestBody.get("mberTyCodes");

            if (userIds == null || userIds.isEmpty()) {
                throw new IllegalArgumentException("대상 사용자가 지정되지 않았습니다.");
            }

            String[] strUserIds = userIds.split(",");
            String[] strAuthorCodes = authorCodes.split(",");
            String[] strRegYns = regYns.split(",");
            String[] strMberTyCodes = mberTyCodes.split(",");

            for (int i = 0; i < strUserIds.length; i++) {
                Map<String, Object> authorGroup = new HashMap<>();
                authorGroup.put("uniqId", strUserIds[i].trim());
                authorGroup.put("authorCode", strAuthorCodes[i].trim());
                authorGroup.put("mberTyCode", strMberTyCodes[i].trim());

                if ("N".equals(strRegYns[i].trim())) {
                    authorGroupService.insertAuthorGroup(authorGroup);
                } else {
                    authorGroupService.updateAuthorGroup(authorGroup);
                }
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 사용자 권한 매핑을 해제(삭제)한다.
     * @param requestBody 해제할 사용자 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteAuthorGroupList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteAuthorGroupList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            if (checkedIdForDel == null || checkedIdForDel.isEmpty()) {
                throw new IllegalArgumentException("대상 사용자가 지정되지 않았습니다.");
            }

            String[] strUserIds = checkedIdForDel.split(",");
            for (String userId : strUserIds) {
                Map<String, Object> authorGroup = new HashMap<>();
                authorGroup.put("uniqId", userId.trim());
                authorGroupService.deleteAuthorGroup(authorGroup);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

}
