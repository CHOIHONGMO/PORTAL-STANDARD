package com.portal.board.bbs;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 게시판 속성정보 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSAttributeManageMapper")
public interface BBSAttributeManageMapper {

    void deleteBBSMasterInf(Map<String, Object> paramMap) throws Exception;

    int insertBBSMasterInf(Map<String, Object> paramMap) throws Exception;

    Map<String, Object> selectBBSMasterInf(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectBBSMasterInfs(Map<String, Object> searchMap) throws Exception;

    int selectBBSMasterInfsCnt(Map<String, Object> searchMap) throws Exception;

    void updateBBSMasterInf(Map<String, Object> paramMap) throws Exception;

    boolean validateTemplate(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectAllBBSMasteInf(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectBdMstrListByTrget(Map<String, Object> searchMap) throws Exception;

    int selectBdMstrListCntByTrget(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectAllBdMstrByTrget(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectNotUsedBdMstrList(Map<String, Object> searchMap) throws Exception;

    int selectNotUsedBdMstrListCnt(Map<String, Object> searchMap) throws Exception;
}
