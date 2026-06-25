package com.portal.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.common.CmmUseMapper;
import jakarta.annotation.Resource;

/**
 * 공통코드등 전체 업무에서 공용해서 사용해야 하는 서비스를 정의하기 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 */
@Service("CmmUseService")
public class CmmUseService extends EgovAbstractServiceImpl {

	@Resource(name = "cmmUseMapper")
	private CmmUseMapper cmmUseMapper;

	/**
	 * 공통코드를 조회한다.
	 */
	public List<Map<String, Object>> selectCmmCodeDetail(Map<String, Object> vo) throws Exception {
		return cmmUseMapper.selectCmmCodeDetail(vo);
	}

	/**
	 * 여러개의 코드 리스트를 맵에 담아서 리턴한다.
	 */
	@SuppressWarnings("unchecked")
	public Map<String, List<Map<String, Object>>> selectCmmCodeDetails(List<?> voList) throws Exception {
		Map<String, List<Map<String, Object>>> map = new HashMap<>();

		for (Object obj : voList) {
			Map<String, Object> vo = (Map<String, Object>) obj;
			map.put((String) vo.get("codeId"), cmmUseMapper.selectCmmCodeDetail(vo));
		}

		return map;
	}

	/**
	 * 조직정보를 코드형태로 리턴한다.
	 */
	public List<Map<String, Object>> selectOgrnztIdDetail(Map<String, Object> vo) throws Exception {
		return cmmUseMapper.selectOgrnztIdDetail(vo);
	}

	/**
	 * 그룹정보를 코드형태로 리턴한다.
	 */
	public List<Map<String, Object>> selectGroupIdDetail(Map<String, Object> vo) throws Exception {
		return cmmUseMapper.selectGroupIdDetail(vo);
	}
}
