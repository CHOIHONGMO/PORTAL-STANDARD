package com.portal.board.bbs.web;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestBody;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

import com.portal.board.bbs.service.BBSManageService;

@RestController
@RequestMapping("/api/board/bbs")
public class BBSManageController {

    @Autowired
    @Qualifier("BBSManageService")
    private BBSManageService bbsMngService;

    /**
     * 게시물에 대한 목록을 조회한다.
     */
    @RequestMapping(value = "/selectBoardList", method = RequestMethod.GET)
    public Map<String, Object> selectBoardList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();

        try {
            if (searchMap.get("bbsId") == null || "".equals(searchMap.get("bbsId"))) {
                searchMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");
            }

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

            Map<String, Object> map = bbsMngService.selectBoardArticles(searchMap, "BBSA02");

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
    @RequestMapping(value = "/selectBoardArticle", method = RequestMethod.GET)
    public Map<String, Object> selectBoardArticle(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if (searchMap.get("bbsId") == null || "".equals(searchMap.get("bbsId"))) {
                searchMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");
            }
            Map<String, Object> result = bbsMngService.selectBoardArticle(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", result);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 게시물을 등록한다.
     */
    @RequestMapping(value = "/insertBoardArticle", method = RequestMethod.POST)
    public Map<String, Object> insertBoardArticle(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if (paramMap.get("bbsId") == null || "".equals(paramMap.get("bbsId"))) {
                paramMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");
            }
            // 임시 사용자 아이디 세팅 (로그인 연동 전)
            paramMap.put("frstRegisterId", "USRCNFRM_00000000000");
            paramMap.put("password", "dummy");

            bbsMngService.insertBoardArticle(paramMap);
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
    @RequestMapping(value = "/updateBoardArticle", method = RequestMethod.POST)
    public Map<String, Object> updateBoardArticle(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if (paramMap.get("bbsId") == null || "".equals(paramMap.get("bbsId"))) {
                paramMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");
            }
            paramMap.put("lastUpdusrId", "USRCNFRM_00000000000");

            bbsMngService.updateBoardArticle(paramMap);
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
    @RequestMapping(value = "/deleteBoardArticle", method = RequestMethod.POST)
    public Map<String, Object> deleteBoardArticle(@RequestBody Map<String, Object> paramMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            if (paramMap.get("bbsId") == null || "".equals(paramMap.get("bbsId"))) {
                paramMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");
            }
            bbsMngService.deleteBoardArticle(paramMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
