package com.portal.common;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 공통코드등에 관한 MyBatis Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 */
@EgovMapper("cmmUseMapper")
public interface CmmUseMapper {

    List<Map<String, Object>> selectCmmCodeDetail(Map<String, Object> vo) throws Exception;

    List<Map<String, Object>> selectOgrnztIdDetail(Map<String, Object> vo) throws Exception;

    List<Map<String, Object>> selectGroupIdDetail(Map<String, Object> vo) throws Exception;
}
