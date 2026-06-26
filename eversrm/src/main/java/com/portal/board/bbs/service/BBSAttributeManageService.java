package com.portal.board.bbs.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.portal.board.bbs.BBSAddedOptionsMapper;
import com.portal.board.bbs.BBSAttributeManageMapper;
import com.portal.board.com.BBSUseInfoManageMapper;
import com.portal.board.com.service.BoardUseInf;
import com.portal.board.com.service.UserInfManageService;
import jakarta.annotation.Resource;

/**
 * 게시판 속성관리를 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("BBSAttributeManageService")
public class BBSAttributeManageService extends EgovAbstractServiceImpl {

	private static final Logger LOGGER = LoggerFactory.getLogger(BBSAttributeManageService.class);

	@Resource(name = "BBSAttributeManageMapper")
	private BBSAttributeManageMapper attrbMngMapper;

	@Resource(name = "BBSUseInfoManageMapper")
	private BBSUseInfoManageMapper bbsUseMapper;

	@Resource(name = "UserInfManageService")
	private UserInfManageService userService;

	@Resource(name = "egovBBSMstrIdGnrService")
	private EgovIdGnrService idgenService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	@Resource(name = "BBSAddedOptionsMapper")
	private BBSAddedOptionsMapper addedOptionsMapper;

	/**
	 * 등록된 게시판 속성정보를 삭제한다.
	 * 
	 * @param boardMaster
	 * @throws Exception
	 */
	public void deleteBBSMasterInf(BoardMaster boardMaster) throws Exception {
		attrbMngMapper.deleteBBSMasterInf(boardMaster);

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
	public String insertBBSMastetInf(BoardMaster boardMaster) throws Exception {
		String bbsId = idgenService.getNextStringId();
		boardMaster.setBbsId(bbsId);

		attrbMngMapper.insertBBSMasterInf(boardMaster);

		if (boardMaster.getOption().equals("comment") || boardMaster.getOption().equals("stsfdg")) {
			addedOptionsMapper.insertAddedOptionsInf(boardMaster);
		}

		if ("Y".equals(boardMaster.getBbsUseFlag())) {
			BoardUseInf bdUseInf = new BoardUseInf();
			bdUseInf.setBbsId(bbsId);
			bdUseInf.setTrgetId(boardMaster.getTrgetId());
			bdUseInf.setRegistSeCode(boardMaster.getRegistSeCode());
			bdUseInf.setFrstRegisterId(boardMaster.getFrstRegisterId());
			bdUseInf.setUseAt("Y");

			bbsUseMapper.insertBBSUseInf(bdUseInf);

			Map<String, Object> userSearchMap = new HashMap<>();
			userSearchMap.put("trgetId", boardMaster.getTrgetId());

			if ("REGC05".equals(boardMaster.getRegistSeCode())) {
				List<Map<String, Object>> tmpList = userService.selectAllClubUser(userSearchMap);
				for (Map<String, Object> userMap : tmpList) {
					bdUseInf = new BoardUseInf();
					bdUseInf.setBbsId(bbsId);
					bdUseInf.setTrgetId((String) userMap.get("uniqId"));
					bdUseInf.setRegistSeCode("REGC07");
					bdUseInf.setUseAt("Y");
					bdUseInf.setFrstRegisterId(boardMaster.getFrstRegisterId());
					bbsUseMapper.insertBBSUseInf(bdUseInf);
				}
			} else if ("REGC06".equals(boardMaster.getRegistSeCode())) {
				List<Map<String, Object>> tmpList = userService.selectAllCmmntyUser(userSearchMap);
				for (Map<String, Object> userMap : tmpList) {
					bdUseInf = new BoardUseInf();
					bdUseInf.setBbsId(bbsId);
					bdUseInf.setTrgetId((String) userMap.get("uniqId"));
					bdUseInf.setRegistSeCode("REGC07");
					bdUseInf.setUseAt("Y");
					bdUseInf.setFrstRegisterId(boardMaster.getFrstRegisterId());
					bbsUseMapper.insertBBSUseInf(bdUseInf);
				}
			}
		}
		return bbsId;
	}

	/**
	 * 유효한 게시판 마스터 정보를 호출한다.
	 * 
	 * @param searchMap
	 * @return List<Map<String, Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectAllBBSMasteInf(Map<String, Object> searchMap) throws Exception {
		return attrbMngMapper.selectAllBBSMasteInf(searchMap);
	}

	/**
	 * 게시판 속성정보 한 건을 상세조회한다.
	 * 
	 * @param boardMaster
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSMasterInf(BoardMaster boardMaster) throws Exception {
		Map<String, Object> result = attrbMngMapper.selectBBSMasterInf(boardMaster);

		String flag = propertyService.getString("Globals.addedOptions");
		if (flag != null && flag.trim().equalsIgnoreCase("true")) {
			Map<String, Object> options = addedOptionsMapper.selectAddedOptionsInf(boardMaster);

			if (options != null) {
				if ("Y".equals(options.get("commentAt"))) {
					result.put("option", "comment");
				}
				if ("Y".equals(options.get("stsfdgAt"))) {
					result.put("option", "stsfdg");
				}
			} else {
				result.put("option", "na");
			}
		}
		return result;
	}

	/**
	 * 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSMasterInfs(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = attrbMngMapper.selectBBSMasterInfs(searchMap);
		int cnt = attrbMngMapper.selectBBSMasterInfsCnt(searchMap);

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
	public void updateBBSMasterInf(BoardMaster boardMaster) throws Exception {
		attrbMngMapper.updateBBSMasterInf(boardMaster);

		String flag = propertyService.getString("Globals.addedOptions");
		if (flag != null && flag.trim().equalsIgnoreCase("true")) {
			if (boardMaster.getOption().equals("na")) {
				return;
			}
			Map<String, Object> options = addedOptionsMapper.selectAddedOptionsInf(boardMaster);

			if (options == null) {
				boardMaster.setFrstRegisterId(boardMaster.getLastUpdusrId());
				addedOptionsMapper.insertAddedOptionsInf(boardMaster);
			} else {
				LOGGER.debug("BBS Master update ignored...");
			}
		}
	}

	/**
	 * 템플릿의 유효여부를 점검한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void validateTemplate(Map<String, Object> searchMap) throws Exception {
		LOGGER.debug("validateTemplate method ignored...");
	}

	/**
	 * 사용중인 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBdMstrListByTrget(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = attrbMngMapper.selectBdMstrListByTrget(searchMap);
		int cnt = attrbMngMapper.selectBdMstrListCntByTrget(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티, 동호회에서 사용중인 게시판 속성 정보의 목록을 전체조회 한다.
	 * 
	 * @param searchMap
	 * @return List<Map<String, Object>>
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectAllBdMstrByTrget(Map<String, Object> searchMap) throws Exception {
		return attrbMngMapper.selectAllBdMstrByTrget(searchMap);
	}

	/**
	 * 사용중이지 않은 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectNotUsedBdMstrList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = attrbMngMapper.selectNotUsedBdMstrList(searchMap);
		int cnt = attrbMngMapper.selectNotUsedBdMstrListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
}