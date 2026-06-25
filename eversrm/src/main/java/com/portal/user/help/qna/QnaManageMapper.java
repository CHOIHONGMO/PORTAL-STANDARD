package com.portal.user.help.qna;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * Q&A관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@EgovMapper("qnaManageMapper")
public interface QnaManageMapper {

    Map<String, Object> selectQnaListDetail(Map<String, Object> map);

    void updateQnaInqireCo(Map<String, Object> map);

    List<Map<String, Object>> selectQnaList(Map<String, Object> map);

    int selectQnaListTotCnt(Map<String, Object> map);

    void insertQnaCn(Map<String, Object> map);

    int selectQnaPasswordConfirmCnt(Map<String, Object> map);

    void updateQnaCn(Map<String, Object> map);

    void deleteQnaCn(Map<String, Object> map);

    Map<String, Object> selectQnaAnswerListDetail(Map<String, Object> map);

    List<Map<String, Object>> selectQnaAnswerList(Map<String, Object> map);

    int selectQnaAnswerListTotCnt(Map<String, Object> map);

    void updateQnaCnAnswer(Map<String, Object> map);
}
