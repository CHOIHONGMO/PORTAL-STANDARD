package com.portal.board.com;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.com.service.TemplateInf;
import com.portal.board.com.service.TemplateInfVO;

/**
 * 템플릿 정보관리를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("TemplateManageMapper")
public interface TemplateManageMapper {

    void deleteTemplateInf(TemplateInf tmplatInf) throws Exception;

    void insertTemplateInf(TemplateInf tmplatInf) throws Exception;

    void updateTemplateInf(TemplateInf tmplatInf) throws Exception;

    List<TemplateInfVO> selectTemplateInfs(TemplateInfVO tmplatInfVO) throws Exception;

    int selectTemplateInfsCnt(TemplateInfVO tmplatInfVO) throws Exception;

    TemplateInfVO selectTemplateInf(TemplateInfVO tmplatInfVO) throws Exception;

    TemplateInfVO selectTemplatePreview(TemplateInfVO tmplatInfVO) throws Exception;

    List<TemplateInfVO> selectTemplateInfsByCode(TemplateInfVO tmplatInfVO) throws Exception;
}
