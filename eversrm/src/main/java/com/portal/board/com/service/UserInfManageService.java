package com.portal.board.com.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.board.com.UserInfManageMapper;
import jakarta.annotation.Resource;

/**
 * 협업에서 사용할 사용자 조회 서비스 기능 구현 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("UserInfManageService")
public class UserInfManageService extends EgovAbstractServiceImpl {

	@Resource(name = "UserInfManageMapper")
	private UserInfManageMapper userInfMapper;

	/**
	 * 동호회 운영자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectClubOprtrList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = userInfMapper.selectClubOprtrList(searchMap);
		int cnt = userInfMapper.selectClubOprtrListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 동호회 사용자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectClubUserList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = userInfMapper.selectClubUserList(searchMap);
		int cnt = userInfMapper.selectClubUserListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티 관리자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectCmmntyMngrList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = userInfMapper.selectCmmntyMngrList(searchMap);
		int cnt = userInfMapper.selectCmmntyMngrListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티 사용자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectCmmntyUserList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = userInfMapper.selectCmmntyUserList(searchMap);
		int cnt = userInfMapper.selectCmmntyUserListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 사용자 정보에 대한 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectUserList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = userInfMapper.selectUserList(searchMap);
		int cnt = userInfMapper.selectUserListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 동호회에 대한 모든 사용자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return List<Map<String, Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectAllClubUser(Map<String, Object> searchMap) throws Exception {
		return userInfMapper.selectAllClubUser(searchMap);
	}

	/**
	 * 커뮤니티에 대한 모든 사용자 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return List<Map<String, Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectAllCmmntyUser(Map<String, Object> searchMap) throws Exception {
		return userInfMapper.selectAllCmmntyUser(searchMap);
	}
}
