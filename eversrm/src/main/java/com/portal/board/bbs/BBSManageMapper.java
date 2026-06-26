package com.portal.board.bbs;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.bbs.service.Board;

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

    void insertBoardArticle(Board board) throws Exception;

    void replyBoardArticle(Board board) throws Exception;

    long getParentNttNo(Board board) throws Exception;

    void updateOtherNttNo(Board board) throws Exception;

    void updateNttNo(Board board) throws Exception;

    Map<String, Object> selectBoardArticle(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectBoardArticleList(Map<String, Object> searchMap) throws Exception;

    int selectBoardArticleListCnt(Map<String, Object> searchMap) throws Exception;

    void updateBoardArticle(Board board) throws Exception;

    void deleteBoardArticle(Board board) throws Exception;

    void updateInqireCo(Map<String, Object> searchMap) throws Exception;

    int selectMaxInqireCo(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectNoticeListForSort(Board board) throws Exception;

    void updateSortOrder(Map<String, Object> searchMap) throws Exception;

    long selectNoticeItemForSort(Board board) throws Exception;

    List<Map<String, Object>> selectGuestList(Map<String, Object> searchMap) throws Exception;

    int selectGuestListCnt(Map<String, Object> searchMap) throws Exception;

    void deleteGuestList(Map<String, Object> searchMap) throws Exception;

    String getPasswordInf(Board board) throws Exception;
}
