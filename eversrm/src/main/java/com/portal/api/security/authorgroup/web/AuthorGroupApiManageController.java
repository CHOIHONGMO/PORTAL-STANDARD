package com.portal.api.security.authorgroup.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.security.groupauthority.service.AuthorGroup;
import com.portal.security.groupauthority.service.AuthorGroupVO;
import com.portal.security.groupauthority.service.AuthorGroupService;
import jakarta.annotation.Resource;

/**
 * 사용자별 권한관리 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/security/authorGroup")
public class AuthorGroupApiManageController {

    @Resource(name = "egovAuthorGroupService")
    private AuthorGroupService egovAuthorGroupService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 사용자별 권한 할당 목록을 조회한다.
     */
    @RequestMapping(value = "/selectAuthorGroupList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorGroupList(@ModelAttribute AuthorGroupVO authorGroupVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            authorGroupVO.setPageUnit(propertiesService.getInt("pageUnit"));
            authorGroupVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(authorGroupVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(authorGroupVO.getPageUnit());
            paginationInfo.setPageSize(authorGroupVO.getPageSize());

            authorGroupVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            authorGroupVO.setLastIndex(paginationInfo.getLastRecordIndex());
            authorGroupVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<AuthorGroupVO> resultList = egovAuthorGroupService.selectAuthorGroupList(authorGroupVO);
            int totCnt = egovAuthorGroupService.selectAuthorGroupListTotCnt(authorGroupVO);
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

            AuthorGroup authorGroup = new AuthorGroup();
            for (int i = 0; i < strUserIds.length; i++) {
                authorGroup.setUniqId(strUserIds[i].trim());
                authorGroup.setAuthorCode(strAuthorCodes[i].trim());
                authorGroup.setMberTyCode(strMberTyCodes[i].trim());

                if ("N".equals(strRegYns[i].trim())) {
                    egovAuthorGroupService.insertAuthorGroup(authorGroup);
                } else {
                    egovAuthorGroupService.updateAuthorGroup(authorGroup);
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
            AuthorGroup authorGroup = new AuthorGroup();
            for (String userId : strUserIds) {
                authorGroup.setUniqId(userId.trim());
                egovAuthorGroupService.deleteAuthorGroup(authorGroup);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
