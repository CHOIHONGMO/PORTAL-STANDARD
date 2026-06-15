package com.portal.api.security.role.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.security.role.service.RoleManage;
import com.portal.security.role.service.RoleManageService;
import com.portal.security.role.service.RoleManageVO;
import jakarta.annotation.Resource;

/**
 * 롤관리 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/security/role")
public class RoleApiManageController {

    @Resource(name = "egovRoleManageService")
    private RoleManageService egovRoleManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name = "egovRoleIdGnrService")
    private EgovIdGnrService egovRoleIdGnrService;

    /**
     * 롤 목록을 조회한다.
     */
    @RequestMapping(value = "/selectRoleList.api", method = RequestMethod.GET)
    public Map<String, Object> selectRoleList(@ModelAttribute RoleManageVO roleManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            roleManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
            roleManageVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(roleManageVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(roleManageVO.getPageUnit());
            paginationInfo.setPageSize(roleManageVO.getPageSize());

            roleManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            roleManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
            roleManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<RoleManageVO> resultList = egovRoleManageService.selectRoleList(roleManageVO);
            int totCnt = egovRoleManageService.selectRoleListTotCnt(roleManageVO);
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
     */
    @RequestMapping(value = "/selectRole.api", method = RequestMethod.GET)
    public Map<String, Object> selectRole(@RequestParam("roleCode") String roleCode) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            RoleManageVO roleManageVO = new RoleManageVO();
            roleManageVO.setRoleCode(roleCode);
            RoleManageVO result = egovRoleManageService.selectRole(roleManageVO);
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
     */
    @RequestMapping(value = "/insertRole.api", method = RequestMethod.POST)
    public Map<String, Object> insertRole(@RequestBody RoleManage roleManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            RoleManageVO roleManageVO = new RoleManageVO();
            roleManageVO.setRoleCode(roleManage.getRoleCode());
            egovRoleManageService.insertRole(roleManage, roleManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("roleCode", roleManage.getRoleCode());
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 롤 정보를 수정한다.
     */
    @RequestMapping(value = "/updateRole.api", method = RequestMethod.POST)
    public Map<String, Object> updateRole(@RequestBody RoleManage roleManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            egovRoleManageService.updateRole(roleManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 롤 목록을 삭제한다.
     */
    @RequestMapping(value = "/deleteRoleList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteRoleList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] roleCodes = checkedIdForDel.split(",");
            RoleManage roleManage = new RoleManage();
            for (String roleCode : roleCodes) {
                roleManage.setRoleCode(roleCode.trim());
                egovRoleManageService.deleteRole(roleManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
