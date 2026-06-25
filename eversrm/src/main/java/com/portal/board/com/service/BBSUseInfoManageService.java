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
	 * @param bdUseVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSUseInfs(BoardUseInfVO bdUseVO) throws Exception {
		List<BoardUseInfVO> result = bbsUseMapper.selectBBSUseInfs(bdUseVO);
		int cnt = bbsUseMapper.selectBBSUseInfsCnt(bdUseVO);

		Map<String, Object> map = new HashMap<String, Object>();
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
	 * @param bdUseVO
	 * @return BoardUseInfVO
	 * @throws Exception
	 */
	public BoardUseInfVO selectBBSUseInf(BoardUseInfVO bdUseVO) throws Exception {
		return bbsUseMapper.selectBBSUseInf(bdUseVO);
	}

	/**
	 * 동호회에 사용되는 게시판 사용정보를 삭제한다.
	 * 
	 * @param bdUseVO
	 * @throws Exception
	 */
	public void deleteBBSUseInfByClub(BoardUseInfVO bdUseVO) throws Exception {
		List<BoardUseInf> result = bbsUseMapper.selectBBSUseInfByClub(bdUseVO);

		BoardUseInf bdUseInf = null;
		Iterator<BoardUseInf> iter = result.iterator();
		while (iter.hasNext()) {
			bdUseInf = (BoardUseInf) iter.next();
			bdUseInf.setLastUpdusrId(bdUseVO.getLastUpdusrId());
			bdUseInf.setTrgetId(bdUseVO.getTrgetId());
			bbsUseMapper.deleteBBSUseInf(bdUseInf);
		}
	}

	/**
	 * 커뮤니티에 사용되는 게시판 사용정보를 삭제한다.
	 * 
	 * @param bdUseVO
	 * @throws Exception
	 */
	public void deleteBBSUseInfByCmmnty(BoardUseInfVO bdUseVO) throws Exception {
		List<BoardUseInf> result = bbsUseMapper.selectBBSUseInfByCmmnty(bdUseVO);

		BoardUseInf bdUseInf = null;
		Iterator<BoardUseInf> iter = result.iterator();
		while (iter.hasNext()) {
			bdUseInf = (BoardUseInf) iter.next();
			bdUseInf.setLastUpdusrId(bdUseVO.getLastUpdusrId());
			bdUseInf.setTrgetId(bdUseVO.getTrgetId());
			bbsUseMapper.deleteBBSUseInf(bdUseInf);
		}
	}

	/**
	 * 동호회에 사용되는 모든 게시판 사용정보를 삭제한다.
	 * 
	 * @param bdUseVO
	 * @throws Exception
	 */
	public void deleteAllBBSUseInfByClub(BoardUseInfVO bdUseVO) throws Exception {
		bbsUseMapper.deleteAllBBSUseInfByClub(bdUseVO);
	}

	/**
	 * 커뮤니티에 사용되는 모든 게시판 사용정보를 삭제한다.
	 * 
	 * @param bdUseVO
	 * @throws Exception
	 */
	public void deleteAllBBSUseInfByCmmnty(BoardUseInfVO bdUseVO) throws Exception {
		bbsUseMapper.deleteAllBBSUseInfByCmmnty(bdUseVO);
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
	 * @param bdUseVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSUseInfsByTrget(BoardUseInfVO bdUseVO) throws Exception {
		List<BoardUseInfVO> result = bbsUseMapper.selectBBSUseInfsByTrget(bdUseVO);
		int cnt = bbsUseMapper.selectBBSUseInfsCntByTrget(bdUseVO);

		Map<String, Object> map = new HashMap<String, Object>();
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
