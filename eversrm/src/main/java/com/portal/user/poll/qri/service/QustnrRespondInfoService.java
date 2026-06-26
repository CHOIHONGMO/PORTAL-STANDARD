package com.portal.user.poll.qri.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qri.QustnrRespondInfoMapper;
import jakarta.annotation.Resource;

/**
 * 설문조사(응답결과)를 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrRespondInfoService")
public class QustnrRespondInfoService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrRespondInfoMapper")
    private QustnrRespondInfoMapper qustnrRespondInfoMapper;

    @Resource(name = "qustnrRespondInfoIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 객관식 통계를 조회한다.
     * @param map 조회조건 Map
     * @return List<Map<String, Object>> 통계 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageStatistics1(Map<String, Object> map) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageStatistics1(map);
    }

    /**
     * 주관식 통계를 조회한다.
     * @param map 조회조건 Map
     * @return List<Map<String, Object>> 통계 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageStatistics2(Map<String, Object> map) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageStatistics2(map);
    }

    /**
     * 설문정보를 조회한다.
     * @param map 조회조건 Map
     * @return List<Map<String, Object>> 설문 정보
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageComtnqestnrinfo(Map<String, Object> map) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageComtnqestnrinfo(map);
    }

    /**
     * 문항정보를 조회한다.
     * @param map 조회조건 Map
     * @return List<Map<String, Object>> 문항 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageComtnqustnrqesitm(Map<String, Object> map) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageComtnqustnrqesitm(map);
    }

    /**
     * 항목정보를 조회한다.
     * @param map 조회조건 Map
     * @return List<Map<String, Object>> 항목 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageComtnqustnriem(Map<String, Object> map) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageComtnqustnriem(map);
    }

    /**
     * 설문조사 목록을 조회한다 (Respond용).
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageList(searchVO);
    }

    /**
     * 설문조사 목록 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrRespondInfoManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoManageListCnt(searchVO);
    }

    /**
     * 응답자결과 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoList(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoList(searchVO);
    }

    /**
     * 응답자결과 상세조회를 처리한다.
     * @param qustnrRespondInfoVO 조회조건 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrRespondInfoDetail(Map<String, Object> qustnrRespondInfoVO) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoDetail(qustnrRespondInfoVO);
    }

    /**
     * 응답자결과 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrRespondInfoListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrRespondInfoMapper.selectQustnrRespondInfoListCnt(searchVO);
    }

    /**
     * 응답자결과를 등록한다.
     * @param qustnrRespondInfoVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrRespondInfo(Map<String, Object> qustnrRespondInfoVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrRespondInfoVO.put("qestnrQesrspnsId", sMakeId);
        qustnrRespondInfoMapper.insertQustnrRespondInfo(qustnrRespondInfoVO);
    }

    /**
     * 응답자결과를 수정한다.
     * @param qustnrRespondInfoVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrRespondInfo(Map<String, Object> qustnrRespondInfoVO) throws Exception {
        qustnrRespondInfoMapper.updateQustnrRespondInfo(qustnrRespondInfoVO);
    }

    /**
     * 응답자결과를 삭제한다.
     * @param qustnrRespondInfoVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrRespondInfo(Map<String, Object> qustnrRespondInfoVO) throws Exception {
        qustnrRespondInfoMapper.deleteQustnrRespondInfo(qustnrRespondInfoVO);
    }

}
