package com.portal.api.sym.ccm.zip.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.portal.system.ccm.zip.service.CcmZipManageService;
import com.portal.system.ccm.zip.service.ZipVO;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/sym/ccm/zip")
public class ZipApiManageController {

    @Resource(name = "ZipManageService")
    private CcmZipManageService zipManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 우편번호 찾기 목록을 조회한다.
     */
    @RequestMapping(value = "/selectZipList.api", method = RequestMethod.GET)
    public Map<String, Object> selectZipList(@ModelAttribute("searchVO") ZipVO searchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
            searchVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
            paginationInfo.setPageSize(searchVO.getPageSize());

            searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> resultList = zipManageService.selectZipList(searchVO);
            int totCnt = zipManageService.selectZipListTotCnt(searchVO);
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
}
