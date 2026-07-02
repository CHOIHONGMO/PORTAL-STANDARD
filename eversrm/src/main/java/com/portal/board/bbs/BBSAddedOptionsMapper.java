package com.portal.board.bbs;

import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 2단계 기능 추가 (댓글관리, 만족도조사) 관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("BBSAddedOptionsMapper")
public interface BBSAddedOptionsMapper {

    int insertAddedOptionsInf(Map<String, Object> paramMap) throws Exception;

    Map<String, Object> selectAddedOptionsInf(Map<String, Object> paramMap) throws Exception;

    void updateAddedOptionsInf(Map<String, Object> paramMap) throws Exception;
}
