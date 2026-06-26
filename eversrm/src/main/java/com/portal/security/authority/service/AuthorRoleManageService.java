package com.portal.security.authority.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.security.authority.AuthorRoleManageMapper;
import jakarta.annotation.Resource;

/**
 * 권한별 롤 관리에 관한 비즈니스 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("authorRoleManageService")
public class AuthorRoleManageService extends EgovAbstractServiceImpl {

    @Resource(name = "authorRoleManageMapper")
    private AuthorRoleManageMapper authorRoleManageMapper;

    /**
     * 권한 롤 관계정보 목록 조회
     * @param authorRoleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한 롤 관계 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectAuthorRoleList(Map<String, Object> authorRoleManageVO) throws Exception {
        return authorRoleManageMapper.selectAuthorRoleList(authorRoleManageVO);
    }

    /**
     * 권한 롤 관계정보 목록 총 갯수를 조회한다.
     * @param authorRoleManageVO 조회조건 Map
     * @return int 총 갯수
     * @throws Exception
     */
    public int selectAuthorRoleListTotCnt(Map<String, Object> authorRoleManageVO) throws Exception {
        return authorRoleManageMapper.selectAuthorRoleListTotCnt(authorRoleManageVO);
    }

    /**
     * 권한 롤 관계정보를 등록한다.
     * @param authorRoleManage 등록정보 Map
     * @throws Exception
     */
    public void insertAuthorRole(Map<String, Object> authorRoleManage) throws Exception {
        authorRoleManageMapper.insertAuthorRole(authorRoleManage);
    }

    /**
     * 권한 롤 관계정보를 삭제한다.
     * @param authorRoleManage 삭제조건 Map
     * @throws Exception
     */
    public void deleteAuthorRole(Map<String, Object> authorRoleManage) throws Exception {
        authorRoleManageMapper.deleteAuthorRole(authorRoleManage);
    }

}
