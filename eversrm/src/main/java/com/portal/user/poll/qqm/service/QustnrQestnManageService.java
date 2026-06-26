package com.portal.user.poll.qqm.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qqm.QustnrQestnManageMapper;
import jakarta.annotation.Resource;

/**
 * 설문문항을 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrQestnManageService")
public class QustnrQestnManageService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrQestnManageMapper")
    private QustnrQestnManageMapper qustnrQestnManageMapper;

    @Resource(name = "egovQustnrQestnManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 설문문항 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrQestnManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrQestnManageMapper.selectQustnrQestnManageList(searchVO);
    }

    /**
     * 설문문항를 상세조회 한다.
     * @param qustnrQestnManageVO 조회조건 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrQestnManageDetail(Map<String, Object> qustnrQestnManageVO) throws Exception {
        return qustnrQestnManageMapper.selectQustnrQestnManageDetail(qustnrQestnManageVO);
    }

    /**
     * 설문문항 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrQestnManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrQestnManageMapper.selectQustnrQestnManageListCnt(searchVO);
    }

    /**
     * 설문문항를 등록한다.
     * @param qustnrQestnManageVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrQestnManage(Map<String, Object> qustnrQestnManageVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrQestnManageVO.put("qestnrQesitmId", sMakeId);
        qustnrQestnManageMapper.insertQustnrQestnManage(qustnrQestnManageVO);
    }

    /**
     * 설문문항를 수정한다.
     * @param qustnrQestnManageVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrQestnManage(Map<String, Object> qustnrQestnManageVO) throws Exception {
        qustnrQestnManageMapper.updateQustnrQestnManage(qustnrQestnManageVO);
    }

    /**
     * 설문문항를 삭제한다.
     * @param qustnrQestnManageVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrQestnManage(Map<String, Object> qustnrQestnManageVO) throws Exception {
        qustnrQestnManageMapper.deleteQustnrRespondInfo(qustnrQestnManageVO);
        qustnrQestnManageMapper.deleteQustnrItemManage(qustnrQestnManageVO);
        qustnrQestnManageMapper.deleteQustnrQestnManage(qustnrQestnManageVO);
    }

}
