package com.portal.user.poll.qim;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrItemManageMapper")
public interface QustnrItemManageMapper {

    List<Map<String, Object>> selectQustnrItemManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrItemManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrItemManageDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrItemManage(Map<String, Object> searchVO) throws Exception;

    void updateQustnrItemManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrItemManage(Map<String, Object> searchVO) throws Exception;

}
