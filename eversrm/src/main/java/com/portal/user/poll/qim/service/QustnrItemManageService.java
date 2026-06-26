package com.portal.user.poll.qim.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qim.QustnrItemManageMapper;
import jakarta.annotation.Resource;

/**
 * 설문항목관리를 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrItemManageService")
public class QustnrItemManageService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrItemManageMapper")
    private QustnrItemManageMapper qustnrItemManageMapper;

    @Resource(name = "egovQustnrItemManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 설문항목 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrItemManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrItemManageMapper.selectQustnrItemManageList(searchVO);
    }

    /**
     * 설문항목를 상세조회 한다.
     * @param qustnrItemManageVO 조회조건 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrItemManageDetail(Map<String, Object> qustnrItemManageVO) throws Exception {
        return qustnrItemManageMapper.selectQustnrItemManageDetail(qustnrItemManageVO);
    }

    /**
     * 설문항목 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrItemManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrItemManageMapper.selectQustnrItemManageListCnt(searchVO);
    }

    /**
     * 설문항목를 등록한다.
     * @param qustnrItemManageVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrItemManage(Map<String, Object> qustnrItemManageVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrItemManageVO.put("qustnrIemId", sMakeId);
        qustnrItemManageMapper.insertQustnrItemManage(qustnrItemManageVO);
    }

    /**
     * 설문항목를 수정한다.
     * @param qustnrItemManageVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrItemManage(Map<String, Object> qustnrItemManageVO) throws Exception {
        qustnrItemManageMapper.updateQustnrItemManage(qustnrItemManageVO);
    }

    /**
     * 설문항목를 삭제한다.
     * @param qustnrItemManageVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrItemManage(Map<String, Object> qustnrItemManageVO) throws Exception {
        qustnrItemManageMapper.deleteQustnrRespondInfo(qustnrItemManageVO);
        qustnrItemManageMapper.deleteQustnrItemManage(qustnrItemManageVO);
    }

}
