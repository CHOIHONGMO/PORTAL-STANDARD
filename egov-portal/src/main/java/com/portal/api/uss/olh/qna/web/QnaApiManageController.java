package com.portal.api.uss.olh.qna.web;

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

import com.portal.user.olh.qna.service.QnaManageService;
import com.portal.user.olh.qna.service.QnaManageDefaultVO;
import com.portal.user.olh.qna.service.QnaManageVO;
import com.portal.util.sim.service.FileScrty;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;

@RestController
@RequestMapping("/api/uss/olh/qna")
public class QnaApiManageController {

    @Autowired
    @Qualifier("QnaManageService")
    private QnaManageService qnaManageService;

    @RequestMapping(value = "/selectQnaList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQnaList(@ModelAttribute("searchVO") QnaManageDefaultVO searchVO) throws Exception {
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

            List<?> qnaList = qnaManageService.selectQnaList(searchVO);
            int totCnt = qnaManageService.selectQnaListTotCnt(searchVO);

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
    public Map<String, Object> selectQnaDetail(@ModelAttribute QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            // 조회수 증가
            qnaManageService.updateQnaInqireCo(qnaManageVO);

            QnaManageVO vo = qnaManageService.selectQnaListDetail(qnaManageVO);
            if (vo != null) {
                // 작성 비밀번호를 복호화해서 반환
                String writngPassword = vo.getWritngPassword();
                vo.setWritngPassword(FileScrty.decode(writngPassword));
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
    public Map<String, Object> insertQna(@RequestBody QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.setFrstRegisterId("USRCNFRM_00000000000");
            qnaManageVO.setLastUpdusrId("USRCNFRM_00000000000");

            // 작성비밀번호 암호화
            String writngPassword = qnaManageVO.getWritngPassword();
            if (writngPassword != null) {
                qnaManageVO.setWritngPassword(FileScrty.encode(writngPassword));
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
    public Map<String, Object> updateQna(@RequestBody QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.setLastUpdusrId("USRCNFRM_00000000000");

            // 작성비밀번호 암호화
            String writngPassword = qnaManageVO.getWritngPassword();
            if (writngPassword != null) {
                qnaManageVO.setWritngPassword(FileScrty.encode(writngPassword));
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
    public Map<String, Object> deleteQna(@RequestBody QnaManageVO qnaManageVO) throws Exception {
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
    public Map<String, Object> confirmQnaPassword(@RequestBody QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String writngPassword = qnaManageVO.getWritngPassword();
            if (writngPassword != null) {
                qnaManageVO.setWritngPassword(FileScrty.encode(writngPassword));
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
    public Map<String, Object> selectQnaAnswerList(@ModelAttribute("searchVO") QnaManageDefaultVO searchVO) throws Exception {
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

            List<?> qnaAnswerList = qnaManageService.selectQnaAnswerList(searchVO);
            int totCnt = qnaManageService.selectQnaAnswerListTotCnt(searchVO);

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
    public Map<String, Object> selectQnaAnswerDetail(@ModelAttribute QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            QnaManageVO vo = qnaManageService.selectQnaListDetail(qnaManageVO);
            response.put("resultCode", "SUCCESS");
            response.put("result", vo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    @RequestMapping(value = "/admin/updateQnaAnswer.api", method = RequestMethod.POST)
    public Map<String, Object> updateQnaAnswer(@RequestBody QnaManageVO qnaManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qnaManageVO.setLastUpdusrId("USRCNFRM_00000000000");
            qnaManageService.updateQnaCnAnswer(qnaManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
