package com.portal.user.help.faq;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * FAQ관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@EgovMapper("faqManageMapper")
public interface FaqManageMapper {

    Map<String, Object> selectFaqListDetail(Map<String, Object> map);

    void updateFaqInqireCo(Map<String, Object> map);

    List<Map<String, Object>> selectFaqList(Map<String, Object> map);

    int selectFaqListTotCnt(Map<String, Object> map);

    void insertFaqCn(Map<String, Object> map);

    void updateFaqCn(Map<String, Object> map);

    void deleteFaqCn(Map<String, Object> map);
}
