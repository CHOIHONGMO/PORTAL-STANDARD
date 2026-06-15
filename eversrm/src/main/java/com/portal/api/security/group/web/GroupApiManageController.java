package com.portal.api.security.group.web;

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

import com.portal.security.group.service.GroupManage;
import com.portal.security.group.service.GroupManageService;
import com.portal.security.group.service.GroupManageVO;
import jakarta.annotation.Resource;

/**
 * 그룹관리 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/security/group")
public class GroupApiManageController {

    @Resource(name = "egovGroupManageService")
    private GroupManageService egovGroupManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    @Resource(name = "egovGroupIdGnrService")
    private EgovIdGnrService egovGroupIdGnrService;

    /**
     * 그룹 목록을 조회한다.
     */
    @RequestMapping(value = "/selectGroupList.api", method = RequestMethod.GET)
    public Map<String, Object> selectGroupList(@ModelAttribute GroupManageVO groupManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            groupManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
            groupManageVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(groupManageVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(groupManageVO.getPageUnit());
            paginationInfo.setPageSize(groupManageVO.getPageSize());

            groupManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            groupManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
            groupManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<GroupManageVO> resultList = egovGroupManageService.selectGroupList(groupManageVO);
            int totCnt = egovGroupManageService.selectGroupListTotCnt(groupManageVO);
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
     */
    @RequestMapping(value = "/selectGroup.api", method = RequestMethod.GET)
    public Map<String, Object> selectGroup(@RequestParam("groupId") String groupId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            GroupManageVO groupManageVO = new GroupManageVO();
            groupManageVO.setGroupId(groupId);
            GroupManageVO result = egovGroupManageService.selectGroup(groupManageVO);
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
     */
    @RequestMapping(value = "/insertGroup.api", method = RequestMethod.POST)
    public Map<String, Object> insertGroup(@RequestBody GroupManage groupManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            groupManage.setGroupId(egovGroupIdGnrService.getNextStringId());
            GroupManageVO groupManageVO = new GroupManageVO();
            groupManageVO.setGroupId(groupManage.getGroupId());
            egovGroupManageService.insertGroup(groupManage, groupManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("groupId", groupManage.getGroupId());
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 그룹 정보를 수정한다.
     */
    @RequestMapping(value = "/updateGroup.api", method = RequestMethod.POST)
    public Map<String, Object> updateGroup(@RequestBody GroupManage groupManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            egovGroupManageService.updateGroup(groupManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 그룹 목록을 삭제한다.
     */
    @RequestMapping(value = "/deleteGroupList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteGroupList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] groupIds = checkedIdForDel.split(",");
            GroupManage groupManage = new GroupManage();
            for (String groupId : groupIds) {
                groupManage.setGroupId(groupId.trim());
                egovGroupManageService.deleteGroup(groupManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
