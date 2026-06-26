package com.portal.security.group;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 그룹관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("groupManageMapper")
public interface GroupManageMapper {

    /**
     * 검색조건에 따른 그룹정보를 조회한다.
     * @param groupManageVO 조회조건 Map
     * @return Map<String, Object> 그룹정보 Map
     */
    Map<String, Object> selectGroup(Map<String, Object> groupManageVO);

    /**
     * 시스템사용 목적별 그룹 목록을 조회한다.
     * @param groupManageVO 조회조건 Map
     * @return List<Map<String, Object>> 그룹 목록 Map List
     */
    List<Map<String, Object>> selectGroupList(Map<String, Object> groupManageVO);

    /**
     * 그룹 목록 총 갯수를 조회한다.
     * @param groupManageVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectGroupListTotCnt(Map<String, Object> groupManageVO);

    /**
     * 그룹 정보를 등록한다.
     * @param groupManage 등록할 그룹 정보 Map
     */
    void insertGroup(Map<String, Object> groupManage);

    /**
     * 그룹 정보를 수정한다.
     * @param groupManage 수정할 그룹 정보 Map
     */
    void updateGroup(Map<String, Object> groupManage);

    /**
     * 그룹 정보를 삭제한다.
     * @param groupManage 삭제할 그룹 정보 Map
     */
    void deleteGroup(Map<String, Object> groupManage);

}
