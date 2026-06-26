package com.portal.security.group.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.security.group.service.GroupManageService;
import jakarta.annotation.Resource;

/**
 * 그룹관리 REST API 컨트롤러
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/security/group")
public class GroupManageController {

    @Resource(name = "groupManageService")
    private GroupManageService groupManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name = "egovGroupIdGnrService")
    private EgovIdGnrService egovGroupIdGnrService;

    /**
     * 그룹 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectGroupList.api", method = RequestMethod.GET)
    public Map<String, Object> selectGroupList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<Map<String, Object>> resultList = groupManageService.selectGroupList(searchMap);
            int totCnt = groupManageService.selectGroupListTotCnt(searchMap);
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
     * 그룹 상세 정보를 조회한다.
     * @param groupId 그룹ID
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectGroup.api", method = RequestMethod.GET)
    public Map<String, Object> selectGroup(@RequestParam("groupId") String groupId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("groupId", groupId);
            Map<String, Object> result = groupManageService.selectGroup(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", result);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 그룹을 등록한다.
     * @param groupManage 등록할 그룹 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertGroup.api", method = RequestMethod.POST)
    public Map<String, Object> insertGroup(@RequestBody Map<String, Object> groupManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String groupId = egovGroupIdGnrService.getNextStringId();
            groupManage.put("groupId", groupId);
            Map<String, Object> groupManageVO = new HashMap<>();
            groupManageVO.put("groupId", groupId);
            groupManageService.insertGroup(groupManage, groupManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("groupId", groupId);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 그룹 정보를 수정한다.
     * @param groupManage 수정할 그룹 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateGroup.api", method = RequestMethod.POST)
    public Map<String, Object> updateGroup(@RequestBody Map<String, Object> groupManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            groupManageService.updateGroup(groupManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 그룹 목록을 삭제한다.
     * @param requestBody 삭제할 대상 목록 정보 Map
     * @return Map<String, Object> 응답결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteGroupList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteGroupList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] groupIds = checkedIdForDel.split(",");
            for (String groupId : groupIds) {
                Map<String, Object> groupManage = new HashMap<>();
                groupManage.put("groupId", groupId.trim());
                groupManageService.deleteGroup(groupManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

}
