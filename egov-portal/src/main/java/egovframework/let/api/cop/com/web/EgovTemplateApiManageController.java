package egovframework.let.api.cop.com.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.com.cmm.ComDefaultCodeVO;
import egovframework.com.cmm.service.EgovCmmUseService;
import egovframework.let.cop.com.service.EgovTemplateManageService;
import egovframework.let.cop.com.service.TemplateInf;
import egovframework.let.cop.com.service.TemplateInfVO;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/cop/com")
public class EgovTemplateApiManageController {

    @Resource(name = "EgovTemplateManageService")
    private EgovTemplateManageService tmplatService;

    @Resource(name = "EgovCmmUseService")
    private EgovCmmUseService cmmUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    /**
     * 템플릿 목록을 조회한다.
     */
    @RequestMapping(value = "/selectTemplateInfs.api", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInfs(@ModelAttribute("searchVO") TemplateInfVO tmplatInfVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            tmplatInfVO.setPageUnit(propertyService.getInt("pageUnit"));
            tmplatInfVO.setPageSize(propertyService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(tmplatInfVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(tmplatInfVO.getPageUnit());
            paginationInfo.setPageSize(tmplatInfVO.getPageSize());

            tmplatInfVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            tmplatInfVO.setLastIndex(paginationInfo.getLastRecordIndex());
            tmplatInfVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = tmplatService.selectTemplateInfs(tmplatInfVO);
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
    @RequestMapping(value = "/selectTemplateInf.api", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInf(@RequestParam("tmplatId") String tmplatId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            TemplateInfVO tmplatInfVO = new TemplateInfVO();
            tmplatInfVO.setTmplatId(tmplatId);
            TemplateInfVO vo = tmplatService.selectTemplateInf(tmplatInfVO);

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
    @RequestMapping(value = "/insertTemplateInf.api", method = RequestMethod.POST)
    public Map<String, Object> insertTemplateInf(@RequestBody TemplateInf templateInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            templateInf.setFrstRegisterId("USRCNFRM_00000000000");
            tmplatService.insertTemplateInf(templateInf);
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
    @RequestMapping(value = "/updateTemplateInf.api", method = RequestMethod.POST)
    public Map<String, Object> updateTemplateInf(@RequestBody TemplateInf templateInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            templateInf.setLastUpdusrId("USRCNFRM_00000000000");
            tmplatService.updateTemplateInf(templateInf);
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
    @RequestMapping(value = "/deleteTemplateInf.api", method = RequestMethod.POST)
    public Map<String, Object> deleteTemplateInf(@RequestBody TemplateInf templateInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            templateInf.setLastUpdusrId("USRCNFRM_00000000000");
            tmplatService.deleteTemplateInf(templateInf);
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
    @RequestMapping(value = "/selectTemplateInfsPop.api", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateInfsPop(@ModelAttribute("searchVO") TemplateInfVO tmplatInfVO, @RequestParam("typeFlag") String typeFlag) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if ("CLB".equals(typeFlag)) {
                tmplatInfVO.setTypeFlag(typeFlag);
                tmplatInfVO.setTmplatSeCode("TMPT03");
            } else if ("CMY".equals(typeFlag)) {
                tmplatInfVO.setTypeFlag(typeFlag);
                tmplatInfVO.setTmplatSeCode("TMPT02");
            } else {
                tmplatInfVO.setTypeFlag(typeFlag);
                tmplatInfVO.setTmplatSeCode("TMPT01");
            }

            tmplatInfVO.setPageUnit(propertyService.getInt("pageUnit"));
            tmplatInfVO.setPageSize(propertyService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(tmplatInfVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(tmplatInfVO.getPageUnit());
            paginationInfo.setPageSize(tmplatInfVO.getPageSize());

            tmplatInfVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            tmplatInfVO.setLastIndex(paginationInfo.getLastRecordIndex());
            tmplatInfVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = tmplatService.selectTemplateInfs(tmplatInfVO);
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
    @RequestMapping(value = "/selectTemplateCodes.api", method = RequestMethod.GET)
    public Map<String, Object> selectTemplateCodes() throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            ComDefaultCodeVO codeVO = new ComDefaultCodeVO();
            codeVO.setCodeId("COM005");
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
