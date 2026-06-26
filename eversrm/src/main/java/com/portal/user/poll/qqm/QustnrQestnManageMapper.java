package com.portal.user.poll.qqm;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

@EgovMapper("qustnrQestnManageMapper")
public interface QustnrQestnManageMapper {

    List<Map<String, Object>> selectQustnrQestnManageList(Map<String, Object> searchVO) throws Exception;

    int selectQustnrQestnManageListCnt(Map<String, Object> searchVO) throws Exception;

    List<Map<String, Object>> selectQustnrQestnManageDetail(Map<String, Object> searchVO) throws Exception;

    void insertQustnrQestnManage(Map<String, Object> searchVO) throws Exception;

    void updateQustnrQestnManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrRespondInfo(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrItemManage(Map<String, Object> searchVO) throws Exception;

    void deleteQustnrQestnManage(Map<String, Object> searchVO) throws Exception;

}
