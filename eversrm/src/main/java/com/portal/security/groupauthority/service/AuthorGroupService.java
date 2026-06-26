package com.portal.security.groupauthority.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.security.groupauthority.AuthorGroupMapper;
import jakarta.annotation.Resource;

/**
 * 권한그룹관리에 관한 비즈니스 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("authorGroupService")
public class AuthorGroupService extends EgovAbstractServiceImpl {

    @Resource(name = "authorGroupMapper")
    private AuthorGroupMapper authorGroupMapper;

    /**
     * 그룹별 할당된 권한 목록 조회
     * @param authorGroupVO 조회조건 Map
     * @return List<Map<String, Object>> 권한그룹 목록 Map List
     * @throws Exception
     */
    public List<Map<String, Object>> selectAuthorGroupList(Map<String, Object> authorGroupVO) throws Exception {
        return authorGroupMapper.selectAuthorGroupList(authorGroupVO);
    }
    
    /**
     * 그룹에 권한정보를 할당하여 데이터베이스에 등록
     * @param authorGroup 등록할 권한그룹 정보 Map
     * @throws Exception
     */
    public void insertAuthorGroup(Map<String, Object> authorGroup) throws Exception {
        authorGroupMapper.insertAuthorGroup(authorGroup);
    }
    
    /**
     * 화면에 조회된 그룹권한정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
     * @param authorGroup 수정할 권한그룹 정보 Map
     * @throws Exception
     */
    public void updateAuthorGroup(Map<String, Object> authorGroup) throws Exception {
        authorGroupMapper.updateAuthorGroup(authorGroup);
    }

    /**
     * 그룹별 할당된 시스템 메뉴 접근권한을 삭제
     * @param authorGroup 삭제할 권한그룹 정보 Map
     * @throws Exception
     */
    public void deleteAuthorGroup(Map<String, Object> authorGroup) throws Exception {
        authorGroupMapper.deleteAuthorGroup(authorGroup);
    }
    
    /**
     * 목록조회 카운트를 반환한다
     * @param authorGroupVO 조회조건 Map
     * @return int 총 갯수
     * @throws Exception
     */
    public int selectAuthorGroupListTotCnt(Map<String, Object> authorGroupVO) throws Exception {
        return authorGroupMapper.selectAuthorGroupListTotCnt(authorGroupVO);
    }

}