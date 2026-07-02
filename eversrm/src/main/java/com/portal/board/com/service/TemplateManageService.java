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
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteTemplateInf(Map<String, Object> paramMap) throws Exception {
		tmplatMapper.deleteTemplateInf(paramMap);
	}

	/**
	 * 템플릿 정보를 등록한다.
	 * 
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertTemplateInf(Map<String, Object> paramMap) throws Exception {
		paramMap.put("tmplatId", idgenService.getNextStringId());
		tmplatMapper.insertTemplateInf(paramMap);
	}

	/**
	 * 템플릿에 대한 상세정보를 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectTemplateInf(Map<String, Object> searchMap) throws Exception {
		return tmplatMapper.selectTemplateInf(searchMap);
	}

	/**
	 * 템플릿에 대한 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectTemplateInfs(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = tmplatMapper.selectTemplateInfs(searchMap);
		int cnt = tmplatMapper.selectTemplateInfsCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 템플릿에 대한 미리보기 정보를 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectTemplatePreview(Map<String, Object> searchMap) throws Exception {
		return tmplatMapper.selectTemplatePreview(searchMap);
	}

	/**
	 * 템플릿 정보를 수정한다.
	 * 
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateTemplateInf(Map<String, Object> paramMap) throws Exception {
		tmplatMapper.updateTemplateInf(paramMap);
	}

	/**
	 * 템플릿 구분에 따른 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return List<Map<String, Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectTemplateInfsByCode(Map<String, Object> searchMap) throws Exception {
		return tmplatMapper.selectTemplateInfsByCode(searchMap);
	}
}