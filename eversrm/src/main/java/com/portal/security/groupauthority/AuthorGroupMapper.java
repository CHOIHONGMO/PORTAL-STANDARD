package com.portal.security.groupauthority;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 권한그룹관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("authorGroupMapper")
public interface AuthorGroupMapper {

    /**
     * 그룹별 할당된 권한 목록을 조회한다.
     * @param authorGroupVO 조회조건 Map
     * @return List<Map<String, Object>> 권한그룹 목록 Map List
     */
    List<Map<String, Object>> selectAuthorGroupList(Map<String, Object> authorGroupVO);

    /**
     * 권한그룹 목록 총 갯수를 조회한다.
     * @param authorGroupVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectAuthorGroupListTotCnt(Map<String, Object> authorGroupVO);

    /**
     * 그룹에 권한정보를 할당하여 등록한다.
     * @param authorGroup 등록할 권한그룹 정보 Map
     */
    void insertAuthorGroup(Map<String, Object> authorGroup);

    /**
     * 그룹권한정보를 수정한다.
     * @param authorGroup 수정할 권한그룹 정보 Map
     */
    void updateAuthorGroup(Map<String, Object> authorGroup);

    /**
     * 그룹별 할당된 시스템 메뉴 접근권한을 삭제한다.
     * @param authorGroup 삭제할 권한그룹 정보 Map
     */
    void deleteAuthorGroup(Map<String, Object> authorGroup);

}
