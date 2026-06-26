package com.portal.user.poll.qrm;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrRespondManageMapper")
public interface QustnrRespondManageMapper {

    List<Map<String, Object>> selectQustnrRespondManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrRespondManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrRespondManageDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrRespondManage(Map<String, Object> searchVO) throws Exception;

    void updateQustnrRespondManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondManage(Map<String, Object> searchVO) throws Exception;

}
