package com.portal.board.bbs.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.board.bbs.BBSLoneMasterMapper;
import com.portal.board.com.BBSUseInfoManageMapper;
import com.portal.board.com.service.BoardUseInf;
import jakarta.annotation.Resource;

/**
 * 게시판 속성관리를 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("BBSLoneMasterService")
public class BBSLoneMasterService extends EgovAbstractServiceImpl {

	@Resource(name = "BBSLoneMasterMapper")
	private BBSLoneMasterMapper masterMapper;

	@Resource(name = "BBSUseInfoManageMapper")
	private BBSUseInfoManageMapper bbsUseMapper;

	@Resource(name = "egovBBSMstrIdGnrService")
	private EgovIdGnrService idgenService;

	/**
	 * 등록된 게시판 속성정보를 삭제한다.
	 * 
	 * @param boardMaster
	 * @throws Exception
	 */
	public void deleteMaster(BoardMaster boardMaster) throws Exception {
		masterMapper.deleteMaster(boardMaster);

		BoardUseInf bdUseInf = new BoardUseInf();
		bdUseInf.setBbsId(boardMaster.getBbsId());
		bdUseInf.setLastUpdusrId(boardMaster.getLastUpdusrId());

		bbsUseMapper.deleteBBSUseInfByBoardId(bdUseInf);
	}

	/**
	 * 신규 게시판 속성정보를 생성한다.
	 * 
	 * @param boardMaster
	 * @return String
	 * @throws Exception
	 */
	public String insertMaster(BoardMaster boardMaster) throws Exception {
		String bbsId = idgenService.getNextStringId();
		boardMaster.setBbsId(bbsId);

		masterMapper.insertMaster(boardMaster);

		BoardUseInf bdUseInf = new BoardUseInf();
		bdUseInf.setBbsId(bbsId);
		bdUseInf.setTrgetId("SYSTEM_DEFAULT_BOARD");
		bdUseInf.setRegistSeCode("REGC01");
		bdUseInf.setFrstRegisterId(boardMaster.getFrstRegisterId());
		bdUseInf.setUseAt("Y");

		bbsUseMapper.insertBBSUseInf(bdUseInf);

		return bbsId;
	}

	/**
	 * 게시판 속성정보 한 건을 상세조회한다.
	 * 
	 * @param boardMaster
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectMaster(BoardMaster boardMaster) throws Exception {
		return masterMapper.selectMaster(boardMaster);
	}

	/**
	 * 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectMasterList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = masterMapper.selectMasterList(searchMap);
		int cnt = masterMapper.selectMasterListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 게시판 속성정보를 수정한다.
	 * 
	 * @param boardMaster
	 * @throws Exception
	 */
	public void updateMaster(BoardMaster boardMaster) throws Exception {
		masterMapper.updateMaster(boardMaster);
	}
}