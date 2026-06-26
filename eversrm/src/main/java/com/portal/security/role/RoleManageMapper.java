package com.portal.security.role;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 롤관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("roleManageMapper")
public interface RoleManageMapper {

    /**
     * 등록된 롤 정보를 조회한다.
     * @param roleManageVO 조회조건 Map
     * @return Map<String, Object> 롤 정보 Map
     */
    Map<String, Object> selectRole(Map<String, Object> roleManageVO);

    /**
     * 등록된 롤 정보 목록을 조회한다.
     * @param roleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 롤 목록 Map List
     */
    List<Map<String, Object>> selectRoleList(Map<String, Object> roleManageVO);

    /**
     * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록한다.
     * @param roleManage 등록할 롤 정보 Map
     */
    void insertRole(Map<String, Object> roleManage);

    /**
     * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 수정한다.
     * @param roleManage 수정할 롤 정보 Map
     */
    void updateRole(Map<String, Object> roleManage);

    /**
     * 롤 정보를 삭제한다.
     * @param roleManage 삭제할 롤 정보 Map
     */
    void deleteRole(Map<String, Object> roleManage);

    /**
     * 롤 목록 총 갯수를 조회한다.
     * @param roleManageVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectRoleListTotCnt(Map<String, Object> roleManageVO);

    /**
     * 등록된 모든 롤 정보 목록을 조회한다.
     * @param roleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 모든 롤 목록 Map List
     */
    List<Map<String, Object>> selectRoleAllList(Map<String, Object> roleManageVO);

}
