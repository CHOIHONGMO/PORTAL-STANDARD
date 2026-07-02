package com.portal.board.bbs;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 게시물 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSManageMapper")
public interface BBSManageMapper {

    long selectMaxNttId() throws Exception;

    void insertBoardArticle(Map<String, Object> paramMap) throws Exception;

    void replyBoardArticle(Map<String, Object> paramMap) throws Exception;

    long getParentNttNo(Map<String, Object> paramMap) throws Exception;

    void updateOtherNttNo(Map<String, Object> paramMap) throws Exception;

    void updateNttNo(Map<String, Object> paramMap) throws Exception;

    Map<String, Object> selectBoardArticle(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectBoardArticleList(Map<String, Object> searchMap) throws Exception;

    int selectBoardArticleListCnt(Map<String, Object> searchMap) throws Exception;

    void updateBoardArticle(Map<String, Object> paramMap) throws Exception;

    void deleteBoardArticle(Map<String, Object> paramMap) throws Exception;

    void updateInqireCo(Map<String, Object> searchMap) throws Exception;

    int selectMaxInqireCo(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectNoticeListForSort(Map<String, Object> paramMap) throws Exception;

    void updateSortOrder(Map<String, Object> searchMap) throws Exception;

    long selectNoticeItemForSort(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectGuestList(Map<String, Object> searchMap) throws Exception;

    int selectGuestListCnt(Map<String, Object> searchMap) throws Exception;

    void deleteGuestList(Map<String, Object> searchMap) throws Exception;

    String getPasswordInf(Map<String, Object> paramMap) throws Exception;
}
