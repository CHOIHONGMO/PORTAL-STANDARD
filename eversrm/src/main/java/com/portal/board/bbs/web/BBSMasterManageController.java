package com.portal.board.bbs.web;

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
import com.portal.board.bbs.service.BoardMaster;
import com.portal.board.bbs.service.BBSAttributeManageService;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/board/bbs")
public class BBSMasterManageController {

    @Resource(name = "BBSAttributeManageService")
    private BBSAttributeManageService bbsAttrbService;

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    /**
     * 게시판 마스터 목록을 조회한다.
     */
    @RequestMapping(value = "/SelectBBSMasterInfs", method = RequestMethod.GET)
    public Map<String, Object> selectBBSMasterInfs(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            Map<String, Object> map = bbsAttrbService.selectBBSMasterInfs(searchMap);
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
     * 게시판 마스터 상세내용을 조회한다.
     */
    @RequestMapping(value = "/SelectBBSMasterInf", method = RequestMethod.GET)
    public Map<String, Object> selectBBSMasterInf(@RequestParam("bbsId") String bbsId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            BoardMaster searchVO = new BoardMaster();
            searchVO.setBbsId(bbsId);
            Map<String, Object> vo = bbsAttrbService.selectBBSMasterInf(searchVO);

            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 신규 게시판 마스터 정보를 등록한다.
     */
    @RequestMapping(value = "/insertBBSMasterInf", method = RequestMethod.POST)
    public Map<String, Object> insertBBSMasterInf(@RequestBody BoardMaster boardMaster) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            boardMaster.setFrstRegisterId("USRCNFRM_00000000000");
            boardMaster.setUseAt("Y");
            boardMaster.setTrgetId("SYSTEMDEFAULT_REGIST");

            String fileSize = propertyService.getString("Globals.posblAtchFileSize");
            if (fileSize == null || fileSize.trim().isEmpty()) {
                fileSize = "10485760"; // 10MB
            }
            boardMaster.setPosblAtchFileSize(fileSize);

            bbsAttrbService.insertBBSMastetInf(boardMaster);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시판 마스터 정보를 수정한다.
     */
    @RequestMapping(value = "/UpdateBBSMasterInf", method = RequestMethod.POST)
    public Map<String, Object> updateBBSMasterInf(@RequestBody BoardMaster boardMaster) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            boardMaster.setLastUpdusrId("USRCNFRM_00000000000");

            String fileSize = propertyService.getString("Globals.posblAtchFileSize");
            if (fileSize == null || fileSize.trim().isEmpty()) {
                fileSize = "10485760";
            }
            boardMaster.setPosblAtchFileSize(fileSize);

            bbsAttrbService.updateBBSMasterInf(boardMaster);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시판 마스터 정보를 삭제한다.
     */
    @RequestMapping(value = "/DeleteBBSMasterInf", method = RequestMethod.POST)
    public Map<String, Object> deleteBBSMasterInf(@RequestBody BoardMaster boardMaster) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            boardMaster.setLastUpdusrId("USRCNFRM_00000000000");
            bbsAttrbService.deleteBBSMasterInf(boardMaster);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 팝업을 위한 게시판 마스터 목록을 조회한다.
     */
    @RequestMapping(value = "/SelectBBSMasterInfsPop", method = RequestMethod.GET)
    public Map<String, Object> selectBBSMasterInfsPop(@RequestParam Map<String, Object> searchMap) throws Exception {
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
            searchMap.put("useAt", "Y");

            Map<String, Object> map = bbsAttrbService.selectNotUsedBdMstrList(searchMap);
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
     * 게시판 관련 공통 코드를 조회한다 (게시판 유형 COM004, 게시판 속성 COM009)
     */
    @RequestMapping(value = "/selectBBSCodeDetails", method = RequestMethod.GET)
    public Map<String, Object> selectBBSCodeDetails() throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> vo = new HashMap<>();

            // 게시판 유형 (COM004)
            vo.put("codeId", "COM004");
            List<?> typeList = cmmUseService.selectCmmCodeDetail(vo);

            // 게시판 속성 (COM009)
            vo.put("codeId", "COM009");
            List<?> attrbList = cmmUseService.selectCmmCodeDetail(vo);

            Map<String, Object> result = new HashMap<>();
            result.put("typeList", typeList);
            result.put("attrbList", attrbList);

            response.put("resultCode", "SUCCESS");
            response.put("result", result);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
