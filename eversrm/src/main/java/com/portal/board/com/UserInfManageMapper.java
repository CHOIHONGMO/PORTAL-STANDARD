package com.portal.board.com;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 협업 활용 사용자 정보 조회를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("UserInfManageMapper")
public interface UserInfManageMapper {

    List<Map<String, Object>> selectUserList(Map<String, Object> searchMap) throws Exception;

    int selectUserListCnt(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectCmmntyUserList(Map<String, Object> searchMap) throws Exception;

    int selectCmmntyUserListCnt(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectCmmntyMngrList(Map<String, Object> searchMap) throws Exception;

    int selectCmmntyMngrListCnt(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectClubUserList(Map<String, Object> searchMap) throws Exception;

    int selectClubUserListCnt(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectClubOprtrList(Map<String, Object> searchMap) throws Exception;

    int selectClubOprtrListCnt(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectAllClubUser(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectAllCmmntyUser(Map<String, Object> searchMap) throws Exception;
}
