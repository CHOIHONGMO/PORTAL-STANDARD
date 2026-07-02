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
@EgovMapper("BBSLoneMasterMapper")
public interface BBSLoneMasterMapper {

    void deleteMaster(Map<String, Object> paramMap) throws Exception;

    int insertMaster(Map<String, Object> paramMap) throws Exception;

    Map<String, Object> selectMaster(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectMasterList(Map<String, Object> searchMap) throws Exception;

    int selectMasterListCnt(Map<String, Object> searchMap) throws Exception;

    void updateMaster(Map<String, Object> paramMap) throws Exception;
}
