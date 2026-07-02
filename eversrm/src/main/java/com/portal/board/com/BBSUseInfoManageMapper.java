package com.portal.board.com;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 게시판 이용정보를 관리하기 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSUseInfoManageMapper")
public interface BBSUseInfoManageMapper {

    void deleteBBSUseInf(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectBBSUseInfByCmmnty(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectBBSUseInfByClub(Map<String, Object> searchMap) throws Exception;

    void deleteAllBBSUseInfByCmmnty(Map<String, Object> paramMap) throws Exception;

    void deleteAllBBSUseInfByClub(Map<String, Object> paramMap) throws Exception;

    void insertBBSUseInf(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectBBSUseInfs(Map<String, Object> searchMap) throws Exception;

    int selectBBSUseInfsCnt(Map<String, Object> searchMap) throws Exception;

    Map<String, Object> selectBBSUseInf(Map<String, Object> searchMap) throws Exception;

    void updateBBSUseInf(Map<String, Object> paramMap) throws Exception;

    void deleteBBSUseInfByBoardId(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectBBSUseInfsByTrget(Map<String, Object> searchMap) throws Exception;

    int selectBBSUseInfsCntByTrget(Map<String, Object> searchMap) throws Exception;

    void updateBBSUseInfByTrget(Map<String, Object> paramMap) throws Exception;
}
