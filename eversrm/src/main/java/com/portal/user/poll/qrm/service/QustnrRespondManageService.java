package com.portal.user.poll.qrm.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qrm.QustnrRespondManageMapper;
import jakarta.annotation.Resource;

/**
 * 설문응답자관리를 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrRespondManageService")
public class QustnrRespondManageService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrRespondManageMapper")
    private QustnrRespondManageMapper qustnrRespondManageMapper;

    @Resource(name = "qustnrRespondManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 응답자정보 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondManageMapper.selectQustnrRespondManageList(searchVO);
    }

    /**
     * 응답자정보를 상세조회 한다.
     * @param qustnrRespondManageVO 조회조건 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondManageDetail(Map<String, Object> qustnrRespondManageVO) throws Exception {
        return qustnrRespondManageMapper.selectQustnrRespondManageDetail(qustnrRespondManageVO);
    }

    /**
     * 응답자정보 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrRespondManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondManageMapper.selectQustnrRespondManageListCnt(searchVO);
    }

    /**
     * 응답자정보를 등록한다.
     * @param qustnrRespondManageVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrRespondManage(Map<String, Object> qustnrRespondManageVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrRespondManageVO.put("qestnrRespondId", sMakeId);
        qustnrRespondManageMapper.insertQustnrRespondManage(qustnrRespondManageVO);
    }

    /**
     * 응답자정보를 수정한다.
     * @param qustnrRespondManageVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrRespondManage(Map<String, Object> qustnrRespondManageVO) throws Exception {
        qustnrRespondManageMapper.updateQustnrRespondManage(qustnrRespondManageVO);
    }

    /**
     * 응답자정보를 삭제한다.
     * @param qustnrRespondManageVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrRespondManage(Map<String, Object> qustnrRespondManageVO) throws Exception {
        qustnrRespondManageMapper.deleteQustnrRespondManage(qustnrRespondManageVO);
    }

}
