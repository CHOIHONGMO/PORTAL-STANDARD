package com.portal.security.authority;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 권한관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("authorManageMapper")
public interface AuthorManageMapper {

    /**
     * 모든 권한목록을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한목록
     */
    List<Map<String, Object>> selectAuthorAllList(Map<String, Object> authorManageVO);

    /**
     * 권한 목록을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한목록
     */
    List<Map<String, Object>> selectAuthorList(Map<String, Object> authorManageVO);

    /**
     * 권한 목록 총 갯수를 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectAuthorListTotCnt(Map<String, Object> authorManageVO);

    /**
     * 개별 권한을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return Map<String, Object> 권한정보
     */
    Map<String, Object> selectAuthor(Map<String, Object> authorManageVO);

    /**
     * 권한을 등록한다.
     * @param authorManage 등록정보 Map
     */
    void insertAuthor(Map<String, Object> authorManage);

    /**
     * 권한정보를 수정한다.
     * @param authorManage 수정정보 Map
     */
    void updateAuthor(Map<String, Object> authorManage);

    /**
     * 권한정보를 삭제한다.
     * @param authorManage 삭제조건 Map
     */
    void deleteAuthor(Map<String, Object> authorManage);

}
