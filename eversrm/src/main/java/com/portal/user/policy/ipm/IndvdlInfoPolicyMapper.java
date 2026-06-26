package com.portal.user.policy.ipm;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 개인정보보호정책에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@EgovMapper("indvdlInfoPolicyMapper")
public interface IndvdlInfoPolicyMapper {

    /**
     * 개인정보보호정책 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 개인정보보호정책 목록
     * @throws Exception
     */
    List<Map<String, Object>> selectIndvdlInfoPolicyList(Map<String, Object> searchVO) throws Exception;

    /**
     * 개인정보보호정책 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    int selectIndvdlInfoPolicyListCnt(Map<String, Object> searchVO) throws Exception;

    /**
     * 개인정보보호정책 상세 내용을 조회한다.
     * @param searchVO 조회조건 Map
     * @return Map<String, Object> 상세 내용
     * @throws Exception
     */
    Map<String, Object> selectIndvdlInfoPolicyDetail(Map<String, Object> searchVO) throws Exception;

    /**
     * 개인정보보호정책을 등록한다.
     * @param searchVO 등록정보 Map
     * @throws Exception
     */
    void insertIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception;

    /**
     * 개인정보보호정책을 수정한다.
     * @param searchVO 수정정보 Map
     * @throws Exception
     */
    void updateIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception;

    /**
     * 개인정보보호정책을 삭제한다.
     * @param searchVO 삭제조건 Map
     * @throws Exception
     */
    void deleteIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception;

}
