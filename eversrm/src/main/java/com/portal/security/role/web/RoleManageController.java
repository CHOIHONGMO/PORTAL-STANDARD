package com.portal.security.role.web;

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

import com.portal.security.role.service.RoleManageService;
import jakarta.annotation.Resource;

/**
 * 롤관리 REST API 컨트롤러
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/security/role")
public class RoleManageController {

    @Resource(name = "roleManageService")
    private RoleManageService roleManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 롤 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectRoleList.api", method = RequestMethod.GET)
    public Map<String, Object> selectRoleList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<Map<String, Object>> resultList = roleManageService.selectRoleList(searchMap);
            int totCnt = roleManageService.selectRoleListTotCnt(searchMap);
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
     * 롤 상세 정보를 조회한다.
     * @param roleCode 롤코드
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectRole.api", method = RequestMethod.GET)
    public Map<String, Object> selectRole(@RequestParam("roleCode") String roleCode) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("roleCode", roleCode);
            Map<String, Object> result = roleManageService.selectRole(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", result);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 롤을 등록한다.
     * @param roleManage 등록할 롤 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertRole.api", method = RequestMethod.POST)
    public Map<String, Object> insertRole(@RequestBody Map<String, Object> roleManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> roleManageVO = new HashMap<>();
            roleManageVO.put("roleCode", roleManage.get("roleCode"));
            roleManageService.insertRole(roleManage, roleManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("roleCode", roleManage.get("roleCode"));
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 롤 정보를 수정한다.
     * @param roleManage 수정할 롤 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateRole.api", method = RequestMethod.POST)
    public Map<String, Object> updateRole(@RequestBody Map<String, Object> roleManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            roleManageService.updateRole(roleManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 롤 목록을 삭제한다.
     * @param requestBody 삭제할 대상 목록 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteRoleList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteRoleList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] roleCodes = checkedIdForDel.split(",");
            for (String roleCode : roleCodes) {
                Map<String, Object> roleManage = new HashMap<>();
                roleManage.put("roleCode", roleCode.trim());
                roleManageService.deleteRole(roleManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

}
