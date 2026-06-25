package com.portal.board.bbs;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.bbs.service.BoardMaster;
import com.portal.board.bbs.service.BoardMasterVO;

/**
 * 2단계 기능 추가 (댓글관리, 만족도조사) 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSAddedOptionsMapper")
public interface BBSAddedOptionsMapper {

    int insertAddedOptionsInf(BoardMaster boardMaster) throws Exception;

    BoardMasterVO selectAddedOptionsInf(BoardMaster vo) throws Exception;

    void updateAddedOptionsInf(BoardMaster boardMaster) throws Exception;
}
