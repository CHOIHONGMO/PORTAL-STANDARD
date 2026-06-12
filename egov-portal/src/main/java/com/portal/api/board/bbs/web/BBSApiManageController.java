package com.portal.api.board.bbs.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;

import com.portal.board.bbs.service.BoardVO;
import com.portal.board.bbs.service.BBSManageService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@RestController
@RequestMapping("/api/board/bbs")
public class BBSApiManageController {

    @Autowired
    @Qualifier("BBSManageService")
    private BBSManageService bbsMngService;

    /**
     * 게시물에 대한 목록을 조회한다. (REST API)
     */
    @RequestMapping(value = "/selectBoardList.api", method = RequestMethod.GET)
    public Map<String, Object> selectBoardList(@ModelAttribute("searchVO") BoardVO boardVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        
        try {
            // 기본 게시판 ID (공지사항 예시: BBSMSTR_AAAAAAAAAAAA)
            if(boardVO.getBbsId() == null || boardVO.getBbsId().isEmpty()) {
                boardVO.setBbsId("BBSMSTR_AAAAAAAAAAAA");
            }
            
            boardVO.setPageUnit(10);
            boardVO.setPageSize(10);

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(boardVO.getPageUnit());
            paginationInfo.setPageSize(boardVO.getPageSize());

            boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
            boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            Map<String, Object> map = bbsMngService.selectBoardArticles(boardVO, "BBSA02");
            
            response.put("resultCode", "SUCCESS");
            response.put("resultMessage", "게시물 목록 조회 성공");
            response.put("result", map.get("resultList"));
            response.put("totalCount", map.get("resultCnt"));
            
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", "조회 중 오류가 발생했습니다: " + e.getMessage());
        }
        
        return response;
    }

    /**
     * 게시물에 대한 상세 정보를 조회한다.
     */
    @RequestMapping(value = "/selectBoardArticle.api", method = RequestMethod.GET)
    public Map<String, Object> selectBoardArticle(@ModelAttribute("searchVO") BoardVO boardVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if(boardVO.getBbsId() == null || boardVO.getBbsId().isEmpty()) {
                boardVO.setBbsId("BBSMSTR_AAAAAAAAAAAA");
            }
            BoardVO vo = bbsMngService.selectBoardArticle(boardVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시물을 등록한다.
     */
    @RequestMapping(value = "/insertBoardArticle.api", method = RequestMethod.POST)
    public Map<String, Object> insertBoardArticle(@org.springframework.web.bind.annotation.RequestBody com.portal.board.bbs.service.Board board) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if(board.getBbsId() == null || board.getBbsId().isEmpty()) {
                board.setBbsId("BBSMSTR_AAAAAAAAAAAA");
            }
            // 임시 사용자 아이디 세팅 (로그인 연동 전)
            board.setFrstRegisterId("USRCNFRM_00000000000");
            board.setPassword("dummy"); // egovframework requires password for some reason
            
            bbsMngService.insertBoardArticle(board);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시물을 수정한다.
     */
    @RequestMapping(value = "/updateBoardArticle.api", method = RequestMethod.POST)
    public Map<String, Object> updateBoardArticle(@org.springframework.web.bind.annotation.RequestBody com.portal.board.bbs.service.Board board) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if(board.getBbsId() == null || board.getBbsId().isEmpty()) {
                board.setBbsId("BBSMSTR_AAAAAAAAAAAA");
            }
            board.setLastUpdusrId("USRCNFRM_00000000000");
            
            bbsMngService.updateBoardArticle(board);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시물을 삭제한다.
     */
    @RequestMapping(value = "/deleteBoardArticle.api", method = RequestMethod.POST)
    public Map<String, Object> deleteBoardArticle(@org.springframework.web.bind.annotation.RequestBody com.portal.board.bbs.service.Board board) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if(board.getBbsId() == null || board.getBbsId().isEmpty()) {
                board.setBbsId("BBSMSTR_AAAAAAAAAAAA");
            }
            bbsMngService.deleteBoardArticle(board);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
