package com.portal.security.authority;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 권한별 롤 관계 관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("authorRoleManageMapper")
public interface AuthorRoleManageMapper {

    /**
     * 권한 롤 관계정보 목록 조회
     * @param authorRoleManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한 롤 관계 목록
     */
    List<Map<String, Object>> selectAuthorRoleList(Map<String, Object> authorRoleManageVO);

    /**
     * 권한 롤 관계정보 목록 총 갯수를 조회한다.
     * @param authorRoleManageVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectAuthorRoleListTotCnt(Map<String, Object> authorRoleManageVO);

    /**
     * 권한 롤 관계정보를 등록한다.
     * @param authorRoleManage 등록정보 Map
     */
    void insertAuthorRole(Map<String, Object> authorRoleManage);

    /**
     * 권한 롤 관계정보를 삭제한다.
     * @param authorRoleManage 삭제조건 Map
     */
    void deleteAuthorRole(Map<String, Object> authorRoleManage);

}
