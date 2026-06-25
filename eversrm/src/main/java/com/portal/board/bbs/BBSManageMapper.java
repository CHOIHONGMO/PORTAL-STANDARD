package com.portal.board.bbs;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.bbs.service.Board;
import com.portal.board.bbs.service.BoardVO;

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

    BoardVO selectBoardArticle(BoardVO boardVO) throws Exception;

    List<BoardVO> selectBoardArticleList(BoardVO boardVO) throws Exception;

    int selectBoardArticleListCnt(BoardVO boardVO) throws Exception;

    void updateBoardArticle(Board board) throws Exception;

    void deleteBoardArticle(Board board) throws Exception;

    void updateInqireCo(BoardVO boardVO) throws Exception;

    int selectMaxInqireCo(BoardVO boardVO) throws Exception;

    List<BoardVO> selectNoticeListForSort(Board board) throws Exception;

    void updateSortOrder(BoardVO vo) throws Exception;

    long selectNoticeItemForSort(Board board) throws Exception;

    List<BoardVO> selectGuestList(BoardVO boardVO) throws Exception;

    int selectGuestListCnt(BoardVO boardVO) throws Exception;

    void deleteGuestList(BoardVO boardVO) throws Exception;

    String getPasswordInf(Board board) throws Exception;
}
