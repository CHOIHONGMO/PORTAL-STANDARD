package com.portal.board.com.web;

import java.util.HashMap;
import java.util.Map;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.board.com.service.BoardUseInf;
import com.portal.board.com.service.BoardUseInfVO;
import com.portal.board.com.service.BBSUseInfoManageService;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/board/com")
public class BBSUseInfoApiManageController {

    @Resource(name = "BBSUseInfoManageService")
    private BBSUseInfoManageService bbsUseService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    /**
     * 게시판 사용정보 목록을 조회한다.
     */
    @RequestMapping(value = "/selectBBSUseInfs.api", method = RequestMethod.GET)
    public Map<String, Object> selectBBSUseInfs(@ModelAttribute("searchVO") BoardUseInfVO bdUseVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            bdUseVO.setPageUnit(propertyService.getInt("pageUnit"));
            bdUseVO.setPageSize(propertyService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(bdUseVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(bdUseVO.getPageUnit());
            paginationInfo.setPageSize(bdUseVO.getPageSize());

            bdUseVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            bdUseVO.setLastIndex(paginationInfo.getLastRecordIndex());
            bdUseVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = bbsUseService.selectBBSUseInfs(bdUseVO);
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
     * 게시판 사용정보에 대한 상세정보를 조회한다.
     */
    @RequestMapping(value = "/selectBBSUseInf.api", method = RequestMethod.GET)
    public Map<String, Object> selectBBSUseInf(@RequestParam("bbsId") String bbsId, @RequestParam("trgetId") String trgetId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            BoardUseInfVO bdUseVO = new BoardUseInfVO();
            bdUseVO.setBbsId(bbsId);
            bdUseVO.setTrgetId(trgetId);

            BoardUseInfVO vo = bbsUseService.selectBBSUseInf(bdUseVO);

            // 시스템 사용 게시판의 경우 URL 표시
            if ("SYSTEM_DEFAULT_BOARD".equals(vo.getTrgetId())) {
                if ("BBST02".equals(vo.getBbsTyCode())) { // 익명게시판
                    vo.setProvdUrl("/cop/bbs/anonymous/selectBoardList.do?bbsId=" + vo.getBbsId());
                } else {
                    vo.setProvdUrl("/cop/bbs/selectBoardList.do?bbsId=" + vo.getBbsId());
                }
            }

            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시판 사용정보를 등록한다.
     */
    @RequestMapping(value = "/insertBBSUseInf.api", method = RequestMethod.POST)
    public Map<String, Object> insertBBSUseInf(@RequestBody BoardUseInf boardUseInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String trgetType = boardUseInf.getTrgetType();
            String registSeCode = "";

            if ("CMMNTY".equals(trgetType)) {
                registSeCode = "REGC06";
            } else if ("CLUB".equals(trgetType)) {
                registSeCode = "REGC05";
            } else {
                registSeCode = "REGC01"; // SYSTEM
            }

            boardUseInf.setUseAt("Y");
            boardUseInf.setFrstRegisterId("USRCNFRM_00000000000");
            boardUseInf.setRegistSeCode(registSeCode);

            bbsUseService.insertBBSUseInf(boardUseInf);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시판 사용정보를 수정한다.
     */
    @RequestMapping(value = "/updateBBSUseInf.api", method = RequestMethod.POST)
    public Map<String, Object> updateBBSUseInf(@RequestBody BoardUseInf boardUseInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            bbsUseService.updateBBSUseInf(boardUseInf);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시판 사용 정보를 삭제한다.
     */
    @RequestMapping(value = "/deleteBBSUseInf.api", method = RequestMethod.POST)
    public Map<String, Object> deleteBBSUseInf(@RequestBody BoardUseInf boardUseInf) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            bbsUseService.deleteBBSUseInf(boardUseInf);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
