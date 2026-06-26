package com.portal.board.com.service;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.board.com.BBSUseInfoManageMapper;
import jakarta.annotation.Resource;

/**
 * 게시판 이용정보를 관리하기 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("BBSUseInfoManageService")
public class BBSUseInfoManageService extends EgovAbstractServiceImpl {

	@Resource(name = "BBSUseInfoManageMapper")
	private BBSUseInfoManageMapper bbsUseMapper;

	/**
	 * 게시판 사용 정보를 삭제한다.
	 * 
	 * @param bdUseInf
	 * @throws Exception
	 */
	public void deleteBBSUseInf(BoardUseInf bdUseInf) throws Exception {
		bbsUseMapper.deleteBBSUseInf(bdUseInf);
	}

	/**
	 * 게시판 사용정보를 등록한다.
	 * 
	 * @param bdUseInf
	 * @throws Exception
	 */
	public void insertBBSUseInf(BoardUseInf bdUseInf) throws Exception {
		bbsUseMapper.insertBBSUseInf(bdUseInf);
	}

	/**
	 * 게시판 사용정보 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSUseInfs(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = bbsUseMapper.selectBBSUseInfs(searchMap);
		int cnt = bbsUseMapper.selectBBSUseInfsCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 게시판 사용정보를 수정한다.
	 * 
	 * @param bdUseInf
	 * @throws Exception
	 */
	public void updateBBSUseInf(BoardUseInf bdUseInf) throws Exception {
		bbsUseMapper.updateBBSUseInf(bdUseInf);
	}

	/**
	 * 게시판 사용정보에 대한 상세정보를 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSUseInf(Map<String, Object> searchMap) throws Exception {
		return bbsUseMapper.selectBBSUseInf(searchMap);
	}

	/**
	 * 동호회에 사용되는 게시판 사용정보를 삭제한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void deleteBBSUseInfByClub(Map<String, Object> searchMap) throws Exception {
		List<BoardUseInf> result = bbsUseMapper.selectBBSUseInfByClub(searchMap);

		BoardUseInf bdUseInf = null;
		Iterator<BoardUseInf> iter = result.iterator();
		while (iter.hasNext()) {
			bdUseInf = iter.next();
			bdUseInf.setLastUpdusrId((String) searchMap.get("lastUpdusrId"));
			bdUseInf.setTrgetId((String) searchMap.get("trgetId"));
			bbsUseMapper.deleteBBSUseInf(bdUseInf);
		}
	}

	/**
	 * 커뮤니티에 사용되는 게시판 사용정보를 삭제한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void deleteBBSUseInfByCmmnty(Map<String, Object> searchMap) throws Exception {
		List<BoardUseInf> result = bbsUseMapper.selectBBSUseInfByCmmnty(searchMap);

		BoardUseInf bdUseInf = null;
		Iterator<BoardUseInf> iter = result.iterator();
		while (iter.hasNext()) {
			bdUseInf = iter.next();
			bdUseInf.setLastUpdusrId((String) searchMap.get("lastUpdusrId"));
			bdUseInf.setTrgetId((String) searchMap.get("trgetId"));
			bbsUseMapper.deleteBBSUseInf(bdUseInf);
		}
	}

	/**
	 * 동호회에 사용되는 모든 게시판 사용정보를 삭제한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void deleteAllBBSUseInfByClub(Map<String, Object> searchMap) throws Exception {
		bbsUseMapper.deleteAllBBSUseInfByClub(searchMap);
	}

	/**
	 * 커뮤니티에 사용되는 모든 게시판 사용정보를 삭제한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void deleteAllBBSUseInfByCmmnty(Map<String, Object> searchMap) throws Exception {
		bbsUseMapper.deleteAllBBSUseInfByCmmnty(searchMap);
	}

	/**
	 * 게시판에 대한 사용정보를 삭제한다.
	 * 
	 * @param bdUseInf
	 * @throws Exception
	 */
	public void deleteBBSUseInfByBoardId(BoardUseInf bdUseInf) throws Exception {
		bbsUseMapper.deleteBBSUseInfByBoardId(bdUseInf);
	}

	/**
	 * 커뮤니티, 동호회에 사용되는 게시판 사용정보에 대한 목록을 조회한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSUseInfsByTrget(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = bbsUseMapper.selectBBSUseInfsByTrget(searchMap);
		int cnt = bbsUseMapper.selectBBSUseInfsCntByTrget(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티, 동호회에 사용되는 게시판 사용정보를 수정한다.
	 * 
	 * @param bdUseInf
	 * @throws Exception
	 */
	public void updateBBSUseInfByTrget(BoardUseInf bdUseInf) throws Exception {
		bbsUseMapper.updateBBSUseInfByTrget(bdUseInf);
	}
}
