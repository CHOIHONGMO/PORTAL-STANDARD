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
	 * @param userVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectClubOprtrList(UserInfVO userVO) throws Exception {
		List<UserInfVO> result = userInfMapper.selectClubOprtrList(userVO);
		int cnt = userInfMapper.selectClubOprtrListCnt(userVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 동호회 사용자 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectClubUserList(UserInfVO userVO) throws Exception {
		List<UserInfVO> result = userInfMapper.selectClubUserList(userVO);
		int cnt = userInfMapper.selectClubUserListCnt(userVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티 관리자 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectCmmntyMngrList(UserInfVO userVO) throws Exception {
		List<UserInfVO> result = userInfMapper.selectCmmntyMngrList(userVO);
		int cnt = userInfMapper.selectCmmntyMngrListCnt(userVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티 사용자 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectCmmntyUserList(UserInfVO userVO) throws Exception {
		List<UserInfVO> result = userInfMapper.selectCmmntyUserList(userVO);
		int cnt = userInfMapper.selectCmmntyUserListCnt(userVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 사용자 정보에 대한 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectUserList(UserInfVO userVO) throws Exception {
		List<UserInfVO> result = userInfMapper.selectUserList(userVO);
		int cnt = userInfMapper.selectUserListCnt(userVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 동호회에 대한 모든 사용자 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return List<UserInfVO>
	 * @throws Exception
	 */
	public List<UserInfVO> selectAllClubUser(UserInfVO userVO) throws Exception {
		return userInfMapper.selectAllClubUser(userVO);
	}

	/**
	 * 커뮤니티에 대한 모든 사용자 목록을 조회한다.
	 * 
	 * @param userVO
	 * @return List<UserInfVO>
	 * @throws Exception
	 */
	public List<UserInfVO> selectAllCmmntyUser(UserInfVO userVO) throws Exception {
		return userInfMapper.selectAllCmmntyUser(userVO);
	}
}
