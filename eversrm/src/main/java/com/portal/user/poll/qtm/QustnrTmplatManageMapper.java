package com.portal.user.poll.qtm;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrTmplatManageMapper")
public interface QustnrTmplatManageMapper {

    List<Map<String, Object>> selectQustnrTmplatManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrTmplatManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrTmplatManageDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrTmplatManage(Map<String, Object> searchVO) throws Exception;

    void updateQustnrTmplatManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrItemManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrQestnManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrTmplatManage(Map<String, Object> searchVO) throws Exception;

    Map<String, Object> selectQustnrTmplatManageTmplatImagepathnm(Map<String, Object> searchVO) throws Exception;

}
