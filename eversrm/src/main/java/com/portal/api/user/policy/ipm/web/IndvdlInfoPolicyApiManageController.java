package com.portal.api.user.policy.ipm.web;

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

import com.portal.common.model.ComDefaultVO;
import com.portal.user.policy.ipm.service.IndvdlInfoPolicyService;
import com.portal.user.policy.ipm.service.IndvdlInfoPolicy;

@RestController
@RequestMapping("/api/user/policy/ipm")
public class IndvdlInfoPolicyApiManageController {

    @Autowired
    @Qualifier("egovIndvdlInfoPolicyService")
    private IndvdlInfoPolicyService indvdlInfoPolicyService;

    @RequestMapping(value = "/selectIndvdlInfoPolicyList.api", method = RequestMethod.GET)
    public Map<String, Object> selectIndvdlInfoPolicyList(@ModelAttribute("searchVO") ComDefaultVO searchVO) throws Exception {
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

            List<?> list = indvdlInfoPolicyService.selectIndvdlInfoPolicyList(searchVO);
            int totCnt = indvdlInfoPolicyService.selectIndvdlInfoPolicyListCnt(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/selectIndvdlInfoPolicyDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectIndvdlInfoPolicyDetail(@ModelAttribute IndvdlInfoPolicy indvdlInfoPolicy) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            IndvdlInfoPolicy detail = indvdlInfoPolicyService.selectIndvdlInfoPolicyDetail(indvdlInfoPolicy);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/insertIndvdlInfoPolicy.api", method = RequestMethod.POST)
    public Map<String, Object> insertIndvdlInfoPolicy(@RequestBody IndvdlInfoPolicy indvdlInfoPolicy) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            indvdlInfoPolicy.setFrstRegisterId("USRCNFRM_00000000000");
            indvdlInfoPolicy.setLastUpdusrId("USRCNFRM_00000000000");
            indvdlInfoPolicyService.insertIndvdlInfoPolicy(indvdlInfoPolicy);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/updateIndvdlInfoPolicy.api", method = RequestMethod.POST)
    public Map<String, Object> updateIndvdlInfoPolicy(@RequestBody IndvdlInfoPolicy indvdlInfoPolicy) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            indvdlInfoPolicy.setLastUpdusrId("USRCNFRM_00000000000");
            indvdlInfoPolicyService.updateIndvdlInfoPolicy(indvdlInfoPolicy);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/deleteIndvdlInfoPolicy.api", method = RequestMethod.POST)
    public Map<String, Object> deleteIndvdlInfoPolicy(@RequestBody IndvdlInfoPolicy indvdlInfoPolicy) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            indvdlInfoPolicyService.deleteIndvdlInfoPolicy(indvdlInfoPolicy);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
