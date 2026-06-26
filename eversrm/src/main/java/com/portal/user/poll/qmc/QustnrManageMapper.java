package com.portal.user.poll.qmc;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrManageMapper")
public interface QustnrManageMapper {

    List<Map<String, Object>> selectQustnrManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrManageDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrManage(Map<String, Object> searchVO) throws Exception;

    void updateQustnrManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrItemManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrQestnManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrManage(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrTmplatManageList(Map<String, Object> searchVO) throws Exception;

}
