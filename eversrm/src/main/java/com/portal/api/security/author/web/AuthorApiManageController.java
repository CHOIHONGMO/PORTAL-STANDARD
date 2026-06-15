package com.portal.api.security.author.web;

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

import com.portal.security.authority.service.AuthorManage;
import com.portal.security.authority.service.AuthorManageService;
import com.portal.security.authority.service.AuthorManageVO;
import jakarta.annotation.Resource;

/**
 * 권한관리 REST API 컨트롤러
 */
@RestController
@RequestMapping("/api/security/author")
public class AuthorApiManageController {

    @Resource(name = "egovAuthorManageService")
    private AuthorManageService egovAuthorManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 권한 목록을 조회한다.
     */
    @RequestMapping(value = "/selectAuthorList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorList(@ModelAttribute AuthorManageVO authorManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            authorManageVO.setPageUnit(propertiesService.getInt("pageUnit"));
            authorManageVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(authorManageVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(authorManageVO.getPageUnit());
            paginationInfo.setPageSize(authorManageVO.getPageSize());

            authorManageVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            authorManageVO.setLastIndex(paginationInfo.getLastRecordIndex());
            authorManageVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<AuthorManageVO> resultList = egovAuthorManageService.selectAuthorList(authorManageVO);
            int totCnt = egovAuthorManageService.selectAuthorListTotCnt(authorManageVO);
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
     */
    @RequestMapping(value = "/selectAuthorAllList.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthorAllList(@ModelAttribute AuthorManageVO authorManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<AuthorManageVO> resultList = egovAuthorManageService.selectAuthorAllList(authorManageVO);
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
     */
    @RequestMapping(value = "/selectAuthor.api", method = RequestMethod.GET)
    public Map<String, Object> selectAuthor(@RequestParam("authorCode") String authorCode) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            AuthorManageVO authorManageVO = new AuthorManageVO();
            authorManageVO.setAuthorCode(authorCode);
            AuthorManageVO result = egovAuthorManageService.selectAuthor(authorManageVO);
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
     */
    @RequestMapping(value = "/insertAuthor.api", method = RequestMethod.POST)
    public Map<String, Object> insertAuthor(@RequestBody AuthorManage authorManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            egovAuthorManageService.insertAuthor(authorManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 정보를 수정한다.
     */
    @RequestMapping(value = "/updateAuthor.api", method = RequestMethod.POST)
    public Map<String, Object> updateAuthor(@RequestBody AuthorManage authorManage) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            egovAuthorManageService.updateAuthor(authorManage);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 권한 목록을 삭제한다.
     */
    @RequestMapping(value = "/deleteAuthorList.api", method = RequestMethod.POST)
    public Map<String, Object> deleteAuthorList(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            String[] authorCodes = checkedIdForDel.split(",");
            AuthorManage authorManage = new AuthorManage();
            for (String authorCode : authorCodes) {
                authorManage.setAuthorCode(authorCode.trim());
                egovAuthorManageService.deleteAuthor(authorManage);
            }
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
