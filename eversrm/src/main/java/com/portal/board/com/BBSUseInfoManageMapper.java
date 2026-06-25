package com.portal.board.com;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.com.service.BoardUseInf;
import com.portal.board.com.service.BoardUseInfVO;

/**
 * 게시판 이용정보를 관리하기 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSUseInfoManageMapper")
public interface BBSUseInfoManageMapper {

    void deleteBBSUseInf(BoardUseInf bdUseInf) throws Exception;

    List<BoardUseInf> selectBBSUseInfByCmmnty(BoardUseInfVO bdUseVO) throws Exception;

    List<BoardUseInf> selectBBSUseInfByClub(BoardUseInfVO bdUseVO) throws Exception;

    void deleteAllBBSUseInfByCmmnty(BoardUseInfVO bdUseVO) throws Exception;

    void deleteAllBBSUseInfByClub(BoardUseInfVO bdUseVO) throws Exception;

    void insertBBSUseInf(BoardUseInf bdUseInf) throws Exception;

    List<BoardUseInfVO> selectBBSUseInfs(BoardUseInfVO bdUseVO) throws Exception;

    int selectBBSUseInfsCnt(BoardUseInfVO bdUseVO) throws Exception;

    BoardUseInfVO selectBBSUseInf(BoardUseInfVO bdUseVO) throws Exception;

    void updateBBSUseInf(BoardUseInf bdUseInf) throws Exception;

    void deleteBBSUseInfByBoardId(BoardUseInf bdUseInf) throws Exception;

    List<BoardUseInfVO> selectBBSUseInfsByTrget(BoardUseInfVO bdUseVO) throws Exception;

    int selectBBSUseInfsCntByTrget(BoardUseInfVO bdUseVO) throws Exception;

    void updateBBSUseInfByTrget(BoardUseInf bdUseInf) throws Exception;
}
