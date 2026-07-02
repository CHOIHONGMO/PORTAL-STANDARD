package com.portal.board.com;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 템플릿 정보관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("TemplateManageMapper")
public interface TemplateManageMapper {

    void deleteTemplateInf(Map<String, Object> paramMap) throws Exception;

    void insertTemplateInf(Map<String, Object> paramMap) throws Exception;

    void updateTemplateInf(Map<String, Object> paramMap) throws Exception;

    List<Map<String, Object>> selectTemplateInfs(Map<String, Object> searchMap) throws Exception;

    int selectTemplateInfsCnt(Map<String, Object> searchMap) throws Exception;

    Map<String, Object> selectTemplateInf(Map<String, Object> searchMap) throws Exception;

    Map<String, Object> selectTemplatePreview(Map<String, Object> searchMap) throws Exception;

    List<Map<String, Object>> selectTemplateInfsByCode(Map<String, Object> searchMap) throws Exception;
}
