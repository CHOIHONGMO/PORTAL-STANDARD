package com.portal.board.bbs;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.bbs.service.BoardMaster;
import com.portal.board.bbs.service.BoardMasterVO;

/**
 * 게시판 속성정보 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSAttributeManageMapper")
public interface BBSAttributeManageMapper {

    void deleteBBSMasterInf(BoardMaster boardMaster) throws Exception;

    int insertBBSMasterInf(BoardMaster boardMaster) throws Exception;

    BoardMasterVO selectBBSMasterInf(BoardMaster vo) throws Exception;

    List<BoardMasterVO> selectBBSMasterInfs(BoardMasterVO vo) throws Exception;

    int selectBBSMasterInfsCnt(BoardMasterVO vo) throws Exception;

    void updateBBSMasterInf(BoardMaster boardMaster) throws Exception;

    boolean validateTemplate(BoardMasterVO vo) throws Exception;

    List<BoardMasterVO> selectAllBBSMasteInf(BoardMasterVO vo) throws Exception;

    List<BoardMasterVO> selectBdMstrListByTrget(BoardMasterVO vo) throws Exception;

    int selectBdMstrListCntByTrget(BoardMasterVO vo) throws Exception;

    List<BoardMasterVO> selectAllBdMstrByTrget(BoardMasterVO vo) throws Exception;

    List<BoardMasterVO> selectNotUsedBdMstrList(BoardMasterVO vo) throws Exception;

    int selectNotUsedBdMstrListCnt(BoardMasterVO vo) throws Exception;
}
