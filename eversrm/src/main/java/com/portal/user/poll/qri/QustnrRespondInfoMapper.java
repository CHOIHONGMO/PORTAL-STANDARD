package com.portal.user.poll.qri;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrRespondInfoMapper")
public interface QustnrRespondInfoMapper {

    List<Map<String, Object>> selectQustnrRespondInfoManageComtnqestnrinfo(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoManageComtnqustnrqesitm(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoManageComtnqustnriem(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoManageStatistics1(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoManageStatistics2(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrRespondInfoManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrRespondInfoListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondInfoDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void updateQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

}
