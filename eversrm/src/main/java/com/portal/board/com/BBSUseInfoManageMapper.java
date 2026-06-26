package com.portal.board.com;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.com.service.BoardUseInf;

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

    List<BoardUseInf> selectBBSUseInfByCmmnty(Map<String, Object> searchMap) throws Exception;

    List<BoardUseInf> selectBBSUseInfByClub(Map<String, Object> searchMap) throws Exception;

    void deleteAllBBSUseInfByCmmnty(Map<String, Object> searchMap) throws Exception;

    void deleteAllBBSUseInfByClub(Map<String, Object> searchMap) throws Exception;

    void insertBBSUseInf(BoardUseInf bdUseInf) throws Exception;

    List<Map<String, Object>> selectBBSUseInfs(Map<String, Object> searchMap) throws Exception;

    int selectBBSUseInfsCnt(Map<String, Object> searchMap) throws Exception;

    Map<String, Object> selectBBSUseInf(Map<String, Object> searchMap) throws Exception;

    void updateBBSUseInf(BoardUseInf bdUseInf) throws Exception;

    void deleteBBSUseInfByBoardId(BoardUseInf bdUseInf) throws Exception;

    List<Map<String, Object>> selectBBSUseInfsByTrget(Map<String, Object> searchMap) throws Exception;

    int selectBBSUseInfsCntByTrget(Map<String, Object> searchMap) throws Exception;

    void updateBBSUseInfByTrget(BoardUseInf bdUseInf) throws Exception;
}
