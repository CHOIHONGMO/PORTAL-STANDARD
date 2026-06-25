package com.portal.user.help.qna.web;

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

import com.portal.user.help.qna.service.QnaManageService;
import com.portal.util.crypto.FileScrty;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@RestController
@RequestMapping("/api/user/help/qna")
public class QnaManageController {

    @Autowired
    @Qualifier("QnaManageService")
    private QnaManageService qnaManageService;

    @RequestMapping(value = "/selectQnaList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQnaList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<Map<String, Object>> qnaList = qnaManageService.selectQnaList(searchMap);
            int totCnt = qnaManageService.selectQnaListTotCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qnaList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/selectQnaDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQnaDetail(@RequestParam Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            // 조회수 증가
            qnaManageService.updateQnaInqireCo(qnaManageVO);

            Map<String, Object> vo = qnaManageService.selectQnaListDetail(qnaManageVO);
            if (vo != null) {
                // 작성 비밀번호를 복호화해서 반환
                String writngPassword = (String) vo.get("writngPassword");
                if (writngPassword != null) {
                    vo.put("writngPassword", FileScrty.decode(writngPassword));
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

    @RequestMapping(value = "/insertQna.api", method = RequestMethod.POST)
    public Map<String, Object> insertQna(@RequestBody Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.put("frstRegisterId", "USRCNFRM_00000000000");
            qnaManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");

            // 작성비밀번호 암호화
            String writngPassword = (String) qnaManageVO.get("writngPassword");
            if (writngPassword != null) {
                qnaManageVO.put("writngPassword", FileScrty.encode(writngPassword));
            }

            qnaManageService.insertQnaCn(qnaManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/updateQna.api", method = RequestMethod.POST)
    public Map<String, Object> updateQna(@RequestBody Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");

            // 작성비밀번호 암호화
            String writngPassword = (String) qnaManageVO.get("writngPassword");
            if (writngPassword != null) {
                qnaManageVO.put("writngPassword", FileScrty.encode(writngPassword));
            }

            qnaManageService.updateQnaCn(qnaManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/deleteQna.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQna(@RequestBody Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageService.deleteQnaCn(qnaManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/confirmQnaPassword.api", method = RequestMethod.POST)
    public Map<String, Object> confirmQnaPassword(@RequestBody Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String writngPassword = (String) qnaManageVO.get("writngPassword");
            if (writngPassword != null) {
                qnaManageVO.put("writngPassword", FileScrty.encode(writngPassword));
            }

            int searchCnt = qnaManageService.selectQnaPasswordConfirmCnt(qnaManageVO);
            if (searchCnt > 0) {
                response.put("resultCode", "SUCCESS");
            } else {
                response.put("resultCode", "FAIL");
                response.put("resultMessage", "비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /* Admin APIs */

    @RequestMapping(value = "/admin/selectQnaAnswerList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQnaAnswerList(@RequestParam Map<String, Object> searchMap) throws Exception {
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

            List<Map<String, Object>> qnaAnswerList = qnaManageService.selectQnaAnswerList(searchMap);
            int totCnt = qnaManageService.selectQnaAnswerListTotCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", qnaAnswerList);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/admin/selectQnaAnswerDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQnaAnswerDetail(@RequestParam Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> vo = qnaManageService.selectQnaListDetail(qnaManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/admin/updateQnaAnswer.api", method = RequestMethod.POST)
    public Map<String, Object> updateQnaAnswer(@RequestBody Map<String, Object> qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.put("lastUpdusrId", "USRCNFRM_00000000000");
            qnaManageService.updateQnaCnAnswer(qnaManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
