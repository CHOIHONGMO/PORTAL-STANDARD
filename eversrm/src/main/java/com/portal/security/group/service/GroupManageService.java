package com.portal.security.group.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.security.group.GroupManageMapper;
import jakarta.annotation.Resource;

/**
 * 그룹관리에 관한 비즈니스 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("groupManageService")
public class GroupManageService extends EgovAbstractServiceImpl {

    @Resource(name = "groupManageMapper")
    private GroupManageMapper groupManageMapper;

    /**
     * 시스템사용 목적별 그룹 목록 조회
     * @param groupManageVO 조회조건 Map
     * @return List<Map<String, Object>> 그룹 목록 Map List
     * @throws Exception
     */
    public List<Map<String, Object>> selectGroupList(Map<String, Object> groupManageVO) throws Exception {
        return groupManageMapper.selectGroupList(groupManageVO);
    }
    
    /**
     * 검색조건에 따른 그룹정보를 조회한다.
     * @param groupManageVO 조회조건 Map
     * @return Map<String, Object> 그룹정보 Map
     * @throws Exception
     */
    public Map<String, Object> selectGroup(Map<String, Object> groupManageVO) throws Exception {
        return groupManageMapper.selectGroup(groupManageVO);
    }

    /**
     * 그룹 기본정보를 등록하고 등록된 결과를 조회하여 반환한다.
     * @param groupManage 등록할 그룹 정보 Map
     * @param groupManageVO 조회조건 Map
     * @return Map<String, Object> 등록된 그룹정보 Map
     * @throws Exception
     */
    public Map<String, Object> insertGroup(Map<String, Object> groupManage, Map<String, Object> groupManageVO) throws Exception {
        groupManageMapper.insertGroup(groupManage);
        groupManageVO.put("groupId", groupManage.get("groupId"));
        return groupManageMapper.selectGroup(groupManageVO);
    }

    /**
     * 그룹 정보를 수정한다.
     * @param groupManage 수정할 그룹 정보 Map
     * @throws Exception
     */
    public void updateGroup(Map<String, Object> groupManage) throws Exception {
        groupManageMapper.updateGroup(groupManage);
    }
    
    /**
     * 그룹 정보를 삭제한다.
     * @param groupManage 삭제할 그룹 정보 Map
     * @throws Exception
     */
    public void deleteGroup(Map<String, Object> groupManage) throws Exception {
        groupManageMapper.deleteGroup(groupManage);
    }
    
    /**
     * 그룹 목록 총 갯수를 조회한다.
     * @param groupManageVO 조회조건 Map
     * @return int 총 갯수
     * @throws Exception
     */
    public int selectGroupListTotCnt(Map<String, Object> groupManageVO) throws Exception {
        return groupManageMapper.selectGroupListTotCnt(groupManageVO);
    }

}