package com.portal.security.role.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.security.role.RoleManageMapper;
import jakarta.annotation.Resource;

/**
 * 롤관리에 관한 비즈니스 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("roleManageService")
public class RoleManageService extends EgovAbstractServiceImpl {

    @Resource(name = "roleManageMapper")
    private RoleManageMapper roleManageMapper;

    /**
     * 등록된 롤 정보 조회
     * @param roleManageVO 조회조건 Map
     * @return Map<String, Object> 롤 정보 Map
     * @throws Exception
     */
    public Map<String, Object> selectRole(Map<String, Object> roleManageVO) throws Exception {
        return roleManageMapper.selectRole(roleManageVO);
    }

    /**
     * 등록된 롤 정보 목록 조회
     * @param roleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 롤 목록 Map List
     * @throws Exception
     */
    public List<Map<String, Object>> selectRoleList(Map<String, Object> roleManageVO) throws Exception {
        return roleManageMapper.selectRoleList(roleManageVO);
    }

    /**
     * 불필요한 롤정보를 화면에 조회하여 데이터베이스에서 삭제
     * @param roleManage 삭제할 롤 정보 Map
     * @throws Exception
     */
    public void deleteRole(Map<String, Object> roleManage) throws Exception {
        roleManageMapper.deleteRole(roleManage);
    }
    
    /**
     * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 수정
     * @param roleManage 수정할 롤 정보 Map
     * @throws Exception
     */
    public void updateRole(Map<String, Object> roleManage) throws Exception {
        roleManageMapper.updateRole(roleManage);
    }
    
    /**
     * 시스템 메뉴에 따른 접근권한, 데이터 입력, 수정, 삭제의 권한 롤을 등록
     * @param roleManage 등록할 롤 정보 Map
     * @param roleManageVO 조회조건 Map
     * @return Map<String, Object> 등록된 롤 정보 Map
     * @throws Exception
     */
    public Map<String, Object> insertRole(Map<String, Object> roleManage, Map<String, Object> roleManageVO) throws Exception {
        roleManageMapper.insertRole(roleManage);    
        roleManageVO.put("roleCode", roleManage.get("roleCode"));
        return roleManageMapper.selectRole(roleManageVO);
    }
    
    /**
     * 목록조회 카운트를 반환한다
     * @param roleManageVO 조회조건 Map
     * @return int 총 갯수
     * @throws Exception
     */
    public int selectRoleListTotCnt(Map<String, Object> roleManageVO) throws Exception {
        return roleManageMapper.selectRoleListTotCnt(roleManageVO);
    }
    
    /**
     * 등록된 모든 롤 정보 목록 조회
     * @param roleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 모든 롤 목록 Map List
     * @throws Exception
     */
    public List<Map<String, Object>> selectRoleAllList(Map<String, Object> roleManageVO) throws Exception {
        return roleManageMapper.selectRoleAllList(roleManageVO);
    } 

}