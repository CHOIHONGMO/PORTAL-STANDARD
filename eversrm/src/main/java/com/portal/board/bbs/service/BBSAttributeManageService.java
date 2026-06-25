package com.portal.board.bbs.service;

import java.util.HashMap;
import java.util.Iterator;
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
import com.portal.board.com.service.UserInfVO;
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

			UserInfVO userVO = new UserInfVO();
			userVO.setTrgetId(boardMaster.getTrgetId());

			List<UserInfVO> tmpList = null;
			Iterator<UserInfVO> iter = null;

			if ("REGC05".equals(boardMaster.getRegistSeCode())) {
				tmpList = userService.selectAllClubUser(userVO);
				iter = tmpList.iterator();
				while (iter.hasNext()) {
					bdUseInf = new BoardUseInf();
					bdUseInf.setBbsId(bbsId);
					bdUseInf.setTrgetId(((UserInfVO) iter.next()).getUniqId());
					bdUseInf.setRegistSeCode("REGC07");
					bdUseInf.setUseAt("Y");
					bdUseInf.setFrstRegisterId(boardMaster.getFrstRegisterId());

					bbsUseMapper.insertBBSUseInf(bdUseInf);
				}
			} else if ("REGC06".equals(boardMaster.getRegistSeCode())) {
				tmpList = userService.selectAllCmmntyUser(userVO);
				iter = tmpList.iterator();
				while (iter.hasNext()) {
					bdUseInf = new BoardUseInf();
					bdUseInf.setBbsId(bbsId);
					bdUseInf.setTrgetId(((UserInfVO) iter.next()).getUniqId());
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
	 * @param vo
	 * @return List<BoardMasterVO>
	 * @throws Exception
	 */
	public List<BoardMasterVO> selectAllBBSMasteInf(BoardMasterVO vo) throws Exception {
		return attrbMngMapper.selectAllBBSMasteInf(vo);
	}

	/**
	 * 게시판 속성정보 한 건을 상세조회한다.
	 * 
	 * @param searchVO
	 * @return BoardMasterVO
	 * @throws Exception
	 */
	public BoardMasterVO selectBBSMasterInf(BoardMaster searchVO) throws Exception {
		BoardMasterVO result = attrbMngMapper.selectBBSMasterInf(searchVO);

		String flag = propertyService.getString("Globals.addedOptions");
		if (flag != null && flag.trim().equalsIgnoreCase("true")) {
			BoardMasterVO options = addedOptionsMapper.selectAddedOptionsInf(searchVO);

			if (options != null) {
				if (options.getCommentAt().equals("Y")) {
					result.setOption("comment");
				}
				if (options.getStsfdgAt().equals("Y")) {
					result.setOption("stsfdg");
				}
			} else {
				result.setOption("na");
			}
		}
		return result;
	}

	/**
	 * 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBBSMasterInfs(BoardMasterVO searchVO) throws Exception {
		List<BoardMasterVO> result = attrbMngMapper.selectBBSMasterInfs(searchVO);
		int cnt = attrbMngMapper.selectBBSMasterInfsCnt(searchVO);

		Map<String, Object> map = new HashMap<String, Object>();
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
			BoardMasterVO options = addedOptionsMapper.selectAddedOptionsInf(boardMaster);

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
	 * @param searchVO
	 * @throws Exception
	 */
	public void validateTemplate(BoardMasterVO searchVO) throws Exception {
		LOGGER.debug("validateTemplate method ignored...");
	}

	/**
	 * 사용중인 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param vo
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBdMstrListByTrget(BoardMasterVO vo) throws Exception {
		List<BoardMasterVO> result = attrbMngMapper.selectBdMstrListByTrget(vo);
		int cnt = attrbMngMapper.selectBdMstrListCntByTrget(vo);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 커뮤니티, 동호회에서 사용중인 게시판 속성 정보의 목록을 전체조회 한다.
	 * 
	 * @param vo
	 * @return List<BoardMasterVO>
	 * @throws Exception
	 */
	public List<BoardMasterVO> selectAllBdMstrByTrget(BoardMasterVO vo) throws Exception {
		return attrbMngMapper.selectAllBdMstrByTrget(vo);
	}

	/**
	 * 사용중이지 않은 게시판 속성 정보의 목록을 조회 한다.
	 * 
	 * @param searchVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectNotUsedBdMstrList(BoardMasterVO searchVO) throws Exception {
		List<BoardMasterVO> result = attrbMngMapper.selectNotUsedBdMstrList(searchVO);
		int cnt = attrbMngMapper.selectNotUsedBdMstrListCnt(searchVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}
}