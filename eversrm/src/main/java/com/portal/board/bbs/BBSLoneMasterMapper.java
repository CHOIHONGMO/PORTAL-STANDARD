package com.portal.board.bbs;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.bbs.service.BoardMaster;

/**
 * 게시판 속성정보 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSLoneMasterMapper")
public interface BBSLoneMasterMapper {

    void deleteMaster(BoardMaster boardMaster) throws Exception;

    int insertMaster(BoardMaster boardMaster) throws Exception;

    Map<String, Object> selectMaster(BoardMaster vo) throws Exception;

    List<Map<String, Object>> selectMasterList(Map<String, Object> searchMap) throws Exception;

    int selectMasterListCnt(Map<String, Object> searchMap) throws Exception;

    void updateMaster(BoardMaster boardMaster) throws Exception;
}
