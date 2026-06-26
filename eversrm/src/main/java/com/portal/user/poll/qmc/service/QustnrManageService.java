package com.portal.user.poll.qmc.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qmc.QustnrManageMapper;
import jakarta.annotation.Resource;

/**
 * 설문관리를 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrManageService")
public class QustnrManageService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrManageMapper")
    private QustnrManageMapper qustnrManageMapper;

    @Resource(name = "egovQustnrManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 설문템플릿 목록을 조회한다.
     * @param qustnrManageVO 조회조건 Map
     * @return List<Map<String, Object>> 템플릿 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrTmplatManageList(Map<String, Object> qustnrManageVO) throws Exception {
        return qustnrManageMapper.selectQustnrTmplatManageList(qustnrManageVO);
    }

    /**
     * 설문관리 목록을 조회한다.
     * @param searchVO 조회할 정보가 담긴 Map
     * @return List<Map<String, Object>> 설문 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrManageMapper.selectQustnrManageList(searchVO);
    }

    /**
     * 설문관리를 상세조회 한다.
     * @param qustnrManageVO 설문관리 정보 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrManageDetail(Map<String, Object> qustnrManageVO) throws Exception {
        return qustnrManageMapper.selectQustnrManageDetail(qustnrManageVO);
    }

    /**
     * 설문관리 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrManageMapper.selectQustnrManageListCnt(searchVO);
    }

    /**
     * 설문관리를 등록한다.
     * @param qustnrManageVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrManage(Map<String, Object> qustnrManageVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrManageVO.put("qestnrId", sMakeId);
        qustnrManageMapper.insertQustnrManage(qustnrManageVO);
    }

    /**
     * 설문관리를 수정한다.
     * @param qustnrManageVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrManage(Map<String, Object> qustnrManageVO) throws Exception {
        qustnrManageMapper.updateQustnrManage(qustnrManageVO);
    }

    /**
     * 설문관리를 삭제한다.
     * @param qustnrManageVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrManage(Map<String, Object> qustnrManageVO) throws Exception {
        qustnrManageMapper.deleteQustnrRespondManage(qustnrManageVO);
        qustnrManageMapper.deleteQustnrRespondInfo(qustnrManageVO);
        qustnrManageMapper.deleteQustnrItemManage(qustnrManageVO);
        qustnrManageMapper.deleteQustnrQestnManage(qustnrManageVO);
        qustnrManageMapper.deleteQustnrManage(qustnrManageVO);
    }

}
