package com.portal.user.help.faq.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.help.faq.service.FaqManageService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@RestController
@RequestMapping("/api/user/help/faq")
public class FaqManageController {

    @Autowired
    @Qualifier("FaqManageService")
    private FaqManageService faqManageService;

    @RequestMapping(value = "/selectFaqList.api", method = RequestMethod.GET)
    public Map<String, Object> selectFaqList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = 10;
            int pageSize = 10;

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            List<Map<String, Object>> faqList = faqManageService.selectFaqList(searchMap);
            int totCnt = faqManageService.selectFaqListTotCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", faqList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/selectFaqDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectFaqDetail(@RequestParam Map<String, Object> faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> vo = faqManageService.selectFaqListDetail(faqManageVO);
            if (vo != null) {
                // 조회수 증가
                faqManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");
                faqManageService.updateFaqInqireCo(faqManageVO);
            }
            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/insertFaq.api", method = RequestMethod.POST)
    public Map<String, Object> insertFaq(@RequestBody Map<String, Object> faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            faqManageVO.put("frstRegisterId", "USRCNFRM_00000000000");
            faqManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");
            faqManageService.insertFaqCn(faqManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/updateFaq.api", method = RequestMethod.POST)
    public Map<String, Object> updateFaq(@RequestBody Map<String, Object> faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            faqManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");
            faqManageService.updateFaqCn(faqManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/deleteFaq.api", method = RequestMethod.POST)
    public Map<String, Object> deleteFaq(@RequestBody Map<String, Object> faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            faqManageService.deleteFaqCn(faqManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
