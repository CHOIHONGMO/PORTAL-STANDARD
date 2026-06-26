package com.portal.security.authority.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.security.authority.AuthorManageMapper;
import jakarta.annotation.Resource;

/**
 * 권한관리에 관한 비즈니스 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("authorManageService")
public class AuthorManageService extends EgovAbstractServiceImpl {

    @Resource(name = "authorManageMapper")
    private AuthorManageMapper authorManageMapper;

    /**
     * 모든 권한목록을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectAuthorAllList(Map<String, Object> authorManageVO) throws Exception {
        return authorManageMapper.selectAuthorAllList(authorManageVO);
    }

    /**
     * 권한 목록을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return List<Map<String, Object>> 권한목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectAuthorList(Map<String, Object> authorManageVO) throws Exception {
        return authorManageMapper.selectAuthorList(authorManageVO);
    }

    /**
     * 권한 목록 총 갯수를 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return int 총 갯수
     * @throws Exception
     */
    public int selectAuthorListTotCnt(Map<String, Object> authorManageVO) throws Exception {
        return authorManageMapper.selectAuthorListTotCnt(authorManageVO);
    }

    /**
     * 개별 권한을 조회한다.
     * @param authorManageVO 조회조건 Map
     * @return Map<String, Object> 권한정보
     * @throws Exception
     */
    public Map<String, Object> selectAuthor(Map<String, Object> authorManageVO) throws Exception {
        Map<String, Object> result = authorManageMapper.selectAuthor(authorManageVO);
        if (result == null) {
            throw processException("info.nodata.msg");
        }
        return result;
    }

    /**
     * 권한을 등록한다.
     * @param authorManage 등록정보 Map
     * @throws Exception
     */
    public void insertAuthor(Map<String, Object> authorManage) throws Exception {
        authorManageMapper.insertAuthor(authorManage);
    }

    /**
     * 권한정보를 수정한다.
     * @param authorManage 수정정보 Map
     * @throws Exception
     */
    public void updateAuthor(Map<String, Object> authorManage) throws Exception {
        authorManageMapper.updateAuthor(authorManage);
    }

    /**
     * 권한정보를 삭제한다.
     * @param authorManage 삭제조건 Map
     * @throws Exception
     */
    public void deleteAuthor(Map<String, Object> authorManage) throws Exception {
        authorManageMapper.deleteAuthor(authorManage);
    }

}
