package egovframework.let.api.uss.sam.stp.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import egovframework.let.uss.sam.stp.service.EgovStplatManageService;
import egovframework.let.uss.sam.stp.service.StplatManageDefaultVO;
import egovframework.let.uss.sam.stp.service.StplatManageVO;

@RestController
@RequestMapping("/api/uss/sam/stp")
public class EgovStplatApiManageController {

    @Autowired
    @Qualifier("StplatManageService")
    private EgovStplatManageService stplatManageService;

    @RequestMapping(value = "/selectStplatList.api", method = RequestMethod.GET)
    public Map<String, Object> selectStplatList(@ModelAttribute("searchVO") StplatManageDefaultVO searchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchVO.setPageUnit(10);
            searchVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> list = stplatManageService.selectStplatList(searchVO);
            int totCnt = stplatManageService.selectStplatListTotCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/selectStplatDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectStplatDetail(@ModelAttribute StplatManageVO stplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            StplatManageVO detail = stplatManageService.selectStplatDetail(stplatManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/insertStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> insertStplatCn(@RequestBody StplatManageVO stplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            stplatManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            stplatManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            stplatManageService.insertStplatCn(stplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/updateStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> updateStplatCn(@RequestBody StplatManageVO stplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            stplatManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            stplatManageService.updateStplatCn(stplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/deleteStplatCn.api", method = RequestMethod.POST)
    public Map<String, Object> deleteStplatCn(@RequestBody StplatManageVO stplatManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            stplatManageService.deleteStplatCn(stplatManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
