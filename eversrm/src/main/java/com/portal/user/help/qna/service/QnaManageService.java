package com.portal.user.help.qna.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.help.qna.QnaManageMapper;
import jakarta.annotation.Resource;

/**
 * Q&A정보를 처리하는 비즈니스 구현 클래스
 * @author ST-Ones Corp.
 * @since 2009.04.01
 * @version 1.0
 */
@Service("QnaManageService")
public class QnaManageService extends EgovAbstractServiceImpl {

    @Resource(name="qnaManageMapper")
    private QnaManageMapper qnaManageMapper;

    /** ID Generation */
    @Resource(name="egovQnaManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * Q&A 글을 조회한다.
     * @param map
     * @return 조회한 글 Map
     * @exception Exception
     */
    public Map<String, Object> selectQnaListDetail(Map<String, Object> map) throws Exception {
        Map<String, Object> result = qnaManageMapper.selectQnaListDetail(map);
        if (result == null) {
            throw processException("info.nodata.msg");
        }
        return result;
    }

    /**
     * Q&A 글을 수정한다.(조회수를 수정)
     * @param map
     * @exception Exception
     */
    public void updateQnaInqireCo(Map<String, Object> map) throws Exception {
        qnaManageMapper.updateQnaInqireCo(map);
    }

    /**
     * Q&A 글 목록을 조회한다.
     * @param map
     * @return 글 목록 List
     * @exception Exception
     */
    public List<Map<String, Object>> selectQnaList(Map<String, Object> map) throws Exception {
        return qnaManageMapper.selectQnaList(map);
    }

    /**
     * Q&A 글 총 갯수를 조회한다.
     * @param map
     * @return 글 총 갯수
     */
    public int selectQnaListTotCnt(Map<String, Object> map) {
        return qnaManageMapper.selectQnaListTotCnt(map);
    }

    /**
     * Q&A 글을 등록한다.
     * @param map
     * @exception Exception
     */
    public void insertQnaCn(Map<String, Object> map) throws Exception {
        String qaId = idgenService.getNextStringId();
        map.put("qaId", qaId);
        qnaManageMapper.insertQnaCn(map);
    }

    /**
     * 작성비밀번호를 확인한다.
     * @param map
     * @return 일치하는 글 갯수
     */
    public int selectQnaPasswordConfirmCnt(Map<String, Object> map) {
        return qnaManageMapper.selectQnaPasswordConfirmCnt(map);
    }

    /**
     * Q&A 글을 수정한다.
     * @param map
     * @exception Exception
     */
    public void updateQnaCn(Map<String, Object> map) throws Exception {
        qnaManageMapper.updateQnaCn(map);
    }

    /**
     * Q&A 글을 삭제한다.
     * @param map
     * @exception Exception
     */
    public void deleteQnaCn(Map<String, Object> map) throws Exception {
        qnaManageMapper.deleteQnaCn(map);
    }

    /**
     * Q&A 답변 글을 조회한다.
     * @param map
     * @return 조회한 글 Map
     * @exception Exception
     */
    public Map<String, Object> selectQnaAnswerListDetail(Map<String, Object> map) throws Exception {
        Map<String, Object> result = qnaManageMapper.selectQnaAnswerListDetail(map);
        if (result == null) {
            throw processException("info.nodata.msg");
        }
        return result;
    }

    /**
     * Q&A 답변 글 목록을 조회한다.
     * @param map
     * @return 글 목록 List
     * @exception Exception
     */
    public List<Map<String, Object>> selectQnaAnswerList(Map<String, Object> map) throws Exception {
        return qnaManageMapper.selectQnaAnswerList(map);
    }

    /**
     * Q&A 답변 글 총 갯수를 조회한다.
     * @param map
     * @return 글 총 갯수
     */
    public int selectQnaAnswerListTotCnt(Map<String, Object> map) {
        return qnaManageMapper.selectQnaAnswerListTotCnt(map);
    }

    /**
     * Q&A 답변 글을 수정한다.
     * @param map
     * @exception Exception
     */
    public void updateQnaCnAnswer(Map<String, Object> map) throws Exception {
        qnaManageMapper.updateQnaCnAnswer(map);
    }

}
