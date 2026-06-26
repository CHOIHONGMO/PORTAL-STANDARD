package com.portal.user.poll.qtm.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.poll.qtm.QustnrTmplatManageMapper;
import jakarta.annotation.Resource;

/**
 * 설문템플릿관리를 처리하는 비즈니스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@Service("qustnrTmplatManageService")
public class QustnrTmplatManageService extends EgovAbstractServiceImpl {

    @Resource(name = "qustnrTmplatManageMapper")
    private QustnrTmplatManageMapper qustnrTmplatManageMapper;

    @Resource(name = "egovQustnrTmplatManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * 템플릿파일명을 조회한다.
     * @param qustnrTmplatManageVO 조회조건 Map
     * @return Map<String, Object> 결과 정보
     * @throws Exception
     */
    public Map<String, Object> selectQustnrTmplatManageTmplatImagepathnm(Map<String, Object> qustnrTmplatManageVO) throws Exception {
        return qustnrTmplatManageMapper.selectQustnrTmplatManageTmplatImagepathnm(qustnrTmplatManageVO);
    }

    /**
     * 설문템플릿 목록을 조회한다.
     * @param searchVO 조회조건 Map
     * @return List<Map<String, Object>> 목록
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrTmplatManageList(Map<String, Object> searchVO) throws Exception {
        return qustnrTmplatManageMapper.selectQustnrTmplatManageList(searchVO);
    }

    /**
     * 설문템플릿를 상세조회 한다.
     * @param qustnrTmplatManageVO 조회조건 Map
     * @return List<Map<String, Object>> 상세 정보 리스트
     * @throws Exception
     */
    public List<Map<String, Object>> selectQustnrTmplatManageDetail(Map<String, Object> qustnrTmplatManageVO) throws Exception {
        return qustnrTmplatManageMapper.selectQustnrTmplatManageDetail(qustnrTmplatManageVO);
    }

    /**
     * 설문템플릿 목록 전체 건수를 조회한다.
     * @param searchVO 조회조건 Map
     * @return int 총 건수
     * @throws Exception
     */
    public int selectQustnrTmplatManageListCnt(Map<String, Object> searchVO) throws Exception {
        return qustnrTmplatManageMapper.selectQustnrTmplatManageListCnt(searchVO);
    }

    /**
     * 설문템플릿를 등록한다.
     * @param qustnrTmplatManageVO 등록정보 Map
     * @throws Exception
     */
    public void insertQustnrTmplatManage(Map<String, Object> qustnrTmplatManageVO) throws Exception {
        String sMakeId = idgenService.getNextStringId();
        qustnrTmplatManageVO.put("qestnrTmplatId", sMakeId);
        qustnrTmplatManageMapper.insertQustnrTmplatManage(qustnrTmplatManageVO);
    }

    /**
     * 설문템플릿를 수정한다.
     * @param qustnrTmplatManageVO 수정정보 Map
     * @throws Exception
     */
    public void updateQustnrTmplatManage(Map<String, Object> qustnrTmplatManageVO) throws Exception {
        qustnrTmplatManageMapper.updateQustnrTmplatManage(qustnrTmplatManageVO);
    }

    /**
     * 설문템플릿를 삭제한다.
     * @param qustnrTmplatManageVO 삭제조건 Map
     * @throws Exception
     */
    public void deleteQustnrTmplatManage(Map<String, Object> qustnrTmplatManageVO) throws Exception {
        qustnrTmplatManageMapper.deleteQustnrRespondManage(qustnrTmplatManageVO);
        qustnrTmplatManageMapper.deleteQustnrRespondInfo(qustnrTmplatManageVO);
        qustnrTmplatManageMapper.deleteQustnrItemManage(qustnrTmplatManageVO);
        qustnrTmplatManageMapper.deleteQustnrQestnManage(qustnrTmplatManageVO);
        qustnrTmplatManageMapper.deleteQustnrManage(qustnrTmplatManageVO);
        qustnrTmplatManageMapper.deleteQustnrTmplatManage(qustnrTmplatManageVO);
    }

}
