package com.portal.user.policy.stp;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 약관관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("stplatManageMapper")
public interface StplatManageMapper {

    /**
     * 약관 상세내용을 조회한다.
     * @param vo 조회조건 Map
     * @return Map<String, Object> 상세내용
     * @throws Exception
     */
    Map<String, Object> selectStplatDetail(Map<String, Object> vo) throws Exception;

    /**
     * 약관 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 약관 목록
     * @throws Exception
     */
    List<Map<String, Object>> selectStplatList(Map<String, Object> searchVO) throws Exception;

    /**
     * 약관 글 총 갯수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 갯수
     */
    int selectStplatListTotCnt(Map<String, Object> searchVO);

    /**
     * 약관 정보를 등록한다.
     * @param vo 등록정보 Map
     * @throws Exception
     */
    void insertStplatCn(Map<String, Object> vo) throws Exception;

    /**
     * 약관 정보를 수정한다.
     * @param vo 수정정보 Map
     * @throws Exception
     */
    void updateStplatCn(Map<String, Object> vo) throws Exception;

    /**
     * 약관 정보를 삭제한다.
     * @param vo 삭제조건 Map
     * @throws Exception
     */
    void deleteStplatCn(Map<String, Object> vo) throws Exception;

}
