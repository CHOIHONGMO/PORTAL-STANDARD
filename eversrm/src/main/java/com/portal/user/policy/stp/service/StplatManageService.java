package com.portal.user.policy.stp.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.policy.stp.StplatManageMapper;
import jakarta.annotation.Resource;

/**
 * 약관내용을 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("stplatManageService")
public class StplatManageService extends EgovAbstractServiceImpl {

    @Resource(name = "stplatManageMapper")
    private StplatManageMapper stplatManageMapper;

    /** ID Generation */
    @Resource(name = "egovStplatManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 약관 상세내용을 조회한다.
     * @param vo 조회조건 Map
     * @return Map<String, Object> 상세내용
     * @throws Exception
     */
    public Map<String, Object> selectStplatDetail(Map<String, Object> vo) throws Exception {
        Map<String, Object> resultVO = stplatManageMapper.selectStplatDetail(vo);
        if (resultVO == null) {
            throw processException("info.nodata.msg");
        }
        return resultVO;
    }

    /**
     * 약관 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectStplatList(Map<String, Object> searchVO) throws Exception {
        return stplatManageMapper.selectStplatList(searchVO);
    }

    /**
     * 약관 글 총 갯수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 갯수
     */
    public int selectStplatListTotCnt(Map<String, Object> searchVO) {
        return stplatManageMapper.selectStplatListTotCnt(searchVO);
    }

    /**
     * 약관 정보를 등록한다.
     * @param vo 등록정보 Map
     * @throws Exception
     */
    public void insertStplatCn(Map<String, Object> vo) throws Exception {
        String useStplatId = idgenService.getNextStringId();
        vo.put("useStplatId", useStplatId);
        stplatManageMapper.insertStplatCn(vo);
    }

    /**
     * 약관 정보를 수정한다.
     * @param vo 수정정보 Map
     * @throws Exception
     */
    public void updateStplatCn(Map<String, Object> vo) throws Exception {
        stplatManageMapper.updateStplatCn(vo);
    }

    /**
     * 약관 정보를 삭제한다.
     * @param vo 삭제조건 Map
     * @throws Exception
     */
    public void deleteStplatCn(Map<String, Object> vo) throws Exception {
        stplatManageMapper.deleteStplatCn(vo);
    }

}
