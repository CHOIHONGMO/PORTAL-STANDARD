package com.portal.user.policy.ipm.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.policy.ipm.IndvdlInfoPolicyMapper;
import jakarta.annotation.Resource;

/**
 * 개인정보보호정책을 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("indvdlInfoPolicyService")
public class IndvdlInfoPolicyService extends EgovAbstractServiceImpl {

    @Resource(name = "indvdlInfoPolicyMapper")
    private IndvdlInfoPolicyMapper indvdlInfoPolicyMapper;

    @Resource(name = "egovIndvdlInfoPolicyIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 개인정보보호정책 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectIndvdlInfoPolicyList(Map<String, Object> searchVO) throws Exception {
        return indvdlInfoPolicyMapper.selectIndvdlInfoPolicyList(searchVO);
    }

    /**
     * 개인정보보호정책 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectIndvdlInfoPolicyListCnt(Map<String, Object> searchVO) throws Exception {
        return indvdlInfoPolicyMapper.selectIndvdlInfoPolicyListCnt(searchVO);
    }

    /**
     * 개인정보보호정책 상세 내용을 조회한다.
     * @param searchVO 조회조건 Map
     * @return Map<String, Object> 상세 내용
     * @throws Exception
     */
    public Map<String, Object> selectIndvdlInfoPolicyDetail(Map<String, Object> searchVO) throws Exception {
        return indvdlInfoPolicyMapper.selectIndvdlInfoPolicyDetail(searchVO);
    }

    /**
     * 개인정보보호정책을 등록한다.
     * @param searchVO 등록정보 Map
     * @throws Exception
     */
    public void insertIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        searchVO.put("indvdlInfoId", sMakeId);
        indvdlInfoPolicyMapper.insertIndvdlInfoPolicy(searchVO);
    }

    /**
     * 개인정보보호정책을 수정한다.
     * @param searchVO 수정정보 Map
     * @throws Exception
     */
    public void updateIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception {
        indvdlInfoPolicyMapper.updateIndvdlInfoPolicy(searchVO);
    }

    /**
     * 개인정보보호정책을 삭제한다.
     * @param searchVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteIndvdlInfoPolicy(Map<String, Object> searchVO) throws Exception {
        indvdlInfoPolicyMapper.deleteIndvdlInfoPolicy(searchVO);
    }

}
