package com.portal.api.uss.olh.faq.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.olh.faq.service.FaqManageService;
import com.portal.user.olh.faq.service.FaqManageDefaultVO;
import com.portal.user.olh.faq.service.FaqManageVO;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@RestController
@RequestMapping("/api/uss/olh/faq")
public class FaqApiManageController {

    @Autowired
    @Qualifier("FaqManageService")
    private FaqManageService faqManageService;

    @RequestMapping(value = "/selectFaqList.api", method = RequestMethod.GET)
    public Map<String, Object> selectFaqList(@ModelAttribute("searchVO") FaqManageDefaultVO searchVO) throws Exception {
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

            List<?> faqList = faqManageService.selectFaqList(searchVO);
            int totCnt = faqManageService.selectFaqListTotCnt(searchVO);

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
    public Map<String, Object> selectFaqDetail(@ModelAttribute FaqManageVO faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            FaqManageVO vo = faqManageService.selectFaqListDetail(faqManageVO);
            if (vo != null) {
                // 조회수 증가
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
    public Map<String, Object> insertFaq(@RequestBody FaqManageVO faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            faqManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            faqManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            faqManageService.insertFaqCn(faqManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/updateFaq.api", method = RequestMethod.POST)
    public Map<String, Object> updateFaq(@RequestBody FaqManageVO faqManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            faqManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            faqManageService.updateFaqCn(faqManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/deleteFaq.api", method = RequestMethod.POST)
    public Map<String, Object> deleteFaq(@RequestBody FaqManageVO faqManageVO) throws Exception {
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
