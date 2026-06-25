package com.portal.board.com.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.board.com.TemplateManageMapper;
import jakarta.annotation.Resource;

/**
 * 템플릿 정보관리를 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("TemplateManageService")
public class TemplateManageService extends EgovAbstractServiceImpl {

	@Resource(name = "TemplateManageMapper")
	private TemplateManageMapper tmplatMapper;

	@Resource(name = "egovTmplatIdGnrService")
	private EgovIdGnrService idgenService;

	/**
	 * 템플릿 정보를 삭제한다.
	 * 
	 * @param tmplatInf
	 * @throws Exception
	 */
	public void deleteTemplateInf(TemplateInf tmplatInf) throws Exception {
		tmplatMapper.deleteTemplateInf(tmplatInf);
	}

	/**
	 * 템플릿 정보를 등록한다.
	 * 
	 * @param tmplatInf
	 * @throws Exception
	 */
	public void insertTemplateInf(TemplateInf tmplatInf) throws Exception {
		tmplatInf.setTmplatId(idgenService.getNextStringId());
		tmplatMapper.insertTemplateInf(tmplatInf);
	}

	/**
	 * 템플릿에 대한 상세정보를 조회한다.
	 * 
	 * @param tmplatInfVO
	 * @return TemplateInfVO
	 * @throws Exception
	 */
	public TemplateInfVO selectTemplateInf(TemplateInfVO tmplatInfVO) throws Exception {
		return tmplatMapper.selectTemplateInf(tmplatInfVO);
	}

	/**
	 * 템플릿에 대한 목록를 조회한다.
	 * 
	 * @param tmplatInfVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectTemplateInfs(TemplateInfVO tmplatInfVO) throws Exception {
		List<TemplateInfVO> result = tmplatMapper.selectTemplateInfs(tmplatInfVO);
		int cnt = tmplatMapper.selectTemplateInfsCnt(tmplatInfVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 템플릿에 대한 미리보기 정보를 조회한다.
	 * 
	 * @param tmplatInfVO
	 * @return TemplateInfVO
	 * @throws Exception
	 */
	public TemplateInfVO selectTemplatePreview(TemplateInfVO tmplatInfVO) throws Exception {
		return tmplatMapper.selectTemplatePreview(tmplatInfVO);
	}

	/**
	 * 템플릿 정보를 수정한다.
	 * 
	 * @param tmplatInf
	 * @throws Exception
	 */
	public void updateTemplateInf(TemplateInf tmplatInf) throws Exception {
		tmplatMapper.updateTemplateInf(tmplatInf);
	}

	/**
	 * 템플릿 구분에 따른 목록을 조회한다.
	 * 
	 * @param tmplatInfVO
	 * @return List<TemplateInfVO>
	 * @throws Exception
	 */
	public List<TemplateInfVO> selectTemplateInfsByCode(TemplateInfVO tmplatInfVO) throws Exception {
		return tmplatMapper.selectTemplateInfsByCode(tmplatInfVO);
	}
}