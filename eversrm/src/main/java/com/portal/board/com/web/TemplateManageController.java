package com.portal.board.com.web;

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

import com.portal.common.service.CmmUseService;
import com.portal.board.com.service.TemplateManageService;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/board/com")
public class TemplateManageController {

    @Resource(name = "TemplateManageService")
    private TemplateManageService tmplatService;

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    /**
     * 템플릿 목록을 조회한다.
     */
    @RequestMapping(value = "/selectTemplateInfs", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInfs(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = propertyService.getInt("pageUnit");
            int pageSize = propertyService.getInt("pageSize");

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = tmplatService.selectTemplateInfs(searchMap);
            int totCnt = Integer.parseInt((String) map.get("resultCnt"));
            paginationInfo.setTotalRecordCount(totCnt);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", map.get("resultList"));
            response.put("totalCount", totCnt);
            response.put("paginationInfo", paginationInfo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 템플릿에 대한 상세정보를 조회한다.
     */
    @RequestMapping(value = "/selectTemplateInf", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInf(@RequestParam("tmplatId") String tmplatId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> searchMap = new HashMap<>();
            searchMap.put("tmplatId", tmplatId);
            Map<String, Object> vo = tmplatService.selectTemplateInf(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 템플릿 정보를 등록한다.
     */
    @RequestMapping(value = "/insertTemplateInf", method = RequestMethod.POST)
    public Map<String, Object> insertTemplateInf(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            paramMap.put("frstRegisterId", "USRCNFRM_00000000000");
            tmplatService.insertTemplateInf(paramMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 템플릿 정보를 수정한다.
     */
    @RequestMapping(value = "/updateTemplateInf", method = RequestMethod.POST)
    public Map<String, Object> updateTemplateInf(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            paramMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            tmplatService.updateTemplateInf(paramMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 템플릿 정보를 삭제한다.
     */
    @RequestMapping(value = "/deleteTemplateInf", method = RequestMethod.POST)
    public Map<String, Object> deleteTemplateInf(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            paramMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            tmplatService.deleteTemplateInf(paramMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 팝업을 위한 템플릿 목록을 조회한다.
     */
    @RequestMapping(value = "/selectTemplateInfsPop", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInfsPop(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String typeFlag = (String) searchMap.get("typeFlag");
            if ("CLB".equals(typeFlag)) {
                searchMap.put("tmplatSeCode", "TMPT03");
            } else if ("CMY".equals(typeFlag)) {
                searchMap.put("tmplatSeCode", "TMPT02");
            } else {
                searchMap.put("tmplatSeCode", "TMPT01");
            }

            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = propertyService.getInt("pageUnit");
            int pageSize = propertyService.getInt("pageSize");

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = tmplatService.selectTemplateInfs(searchMap);
            int totCnt = Integer.parseInt((String) map.get("resultCnt"));
            paginationInfo.setTotalRecordCount(totCnt);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", map.get("resultList"));
            response.put("totalCount", totCnt);
            response.put("paginationInfo", paginationInfo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 템플릿 구분 공통 코드 (COM005) 조회
     */
    @RequestMapping(value = "/selectTemplateCodes", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateCodes() throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> codeVO = new HashMap<>();
            codeVO.put("codeId", "COM005");
            List<?> resultList = cmmUseService.selectCmmCodeDetail(codeVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", resultList);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
