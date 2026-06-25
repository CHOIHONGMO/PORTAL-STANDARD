package com.portal.board.bbs.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.springframework.stereotype.Service;

import com.portal.common.service.FileMngService;
import com.portal.board.bbs.BBSManageMapper;
import com.portal.util.common.DateUtil;
import jakarta.annotation.Resource;

/**
 * 게시물 관리를 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@Service("BBSManageService")
public class BBSManageService extends EgovAbstractServiceImpl {

	@Resource(name = "BBSManageMapper")
	private BBSManageMapper bbsManageMapper;

	@Resource(name = "FileMngService")
	private FileMngService fileService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertyService;

	/**
	 * 게시물 한 건을 삭제 한다.
	 * 
	 * @param board
	 * @throws Exception
	 */
	public void deleteBoardArticle(Board board) throws Exception {
		Map<String, Object> fvo = new HashMap<>();
		fvo.put("atchFileId", board.getAtchFileId());

		board.setNttSj("이 글은 작성자에 의해서 삭제되었습니다.");

		bbsManageMapper.deleteBoardArticle(board);

		if (fvo.get("atchFileId") != null && !"".equals(fvo.get("atchFileId"))) {
			fileService.deleteAllFileInf(fvo);
		}
	}

	/**
	 * 게시판에 게시물 또는 답변 게시물을 등록 한다.
	 * 
	 * @param board
	 * @throws Exception
	 */
	public void insertBoardArticle(Board board) throws Exception {
		if ("Y".equals(board.getReplyAt())) {
			long nttId = bbsManageMapper.selectMaxNttId();
			board.setNttId(nttId);

			bbsManageMapper.replyBoardArticle(board);

			long nttNo = bbsManageMapper.getParentNttNo(board);

			board.setNttNo(nttNo);
			bbsManageMapper.updateOtherNttNo(board);

			board.setNttNo(nttNo + 1);
			bbsManageMapper.updateNttNo(board);
		} else {
			board.setParnts("0");
			board.setReplyLc("0");
			board.setReplyAt("N");

			long nttId = bbsManageMapper.selectMaxNttId();
			board.setNttId(nttId);

			bbsManageMapper.insertBoardArticle(board);
		}
	}

	/**
	 * 게시물 대하여 상세 내용을 조회 한다.
	 * 
	 * @param boardVO
	 * @return BoardVO
	 * @throws Exception
	 */
	public BoardVO selectBoardArticle(BoardVO boardVO) throws Exception {
		if (boardVO.isPlusCount()) {
			int iniqireCo = bbsManageMapper.selectMaxInqireCo(boardVO);
			boardVO.setInqireCo(iniqireCo);
			bbsManageMapper.updateInqireCo(boardVO);
		}

		return bbsManageMapper.selectBoardArticle(boardVO);
	}

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 * 
	 * @param boardVO
	 * @param attrbFlag
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBoardArticles(BoardVO boardVO, String attrbFlag) throws Exception {
		List<BoardVO> list = bbsManageMapper.selectBoardArticleList(boardVO);
		List<BoardVO> result = new ArrayList<BoardVO>();

		if ("BBSA01".equals(attrbFlag)) {
			String today = DateUtil.getToday();

			BoardVO vo;
			Iterator<BoardVO> iter = list.iterator();
			while (iter.hasNext()) {
				vo = (BoardVO) iter.next();

				if (vo.getNtceBgnde() != null && !"".equals(vo.getNtceBgnde()) || vo.getNtceEndde() != null && !"".equals(vo.getNtceEndde())) {
					if (DateUtil.getDaysDiff(today, vo.getNtceBgnde()) > 0 || DateUtil.getDaysDiff(today, vo.getNtceEndde()) < 0) {
						vo.setIsExpired("Y");
					}
				}
				result.add(vo);
			}
		} else {
			result = list;
		}

		int cnt = bbsManageMapper.selectBoardArticleListCnt(boardVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 게시물 한 건의 내용을 수정 한다.
	 * 
	 * @param board
	 * @throws Exception
	 */
	public void updateBoardArticle(Board board) throws Exception {
		bbsManageMapper.updateBoardArticle(board);
	}

	/**
	 * 방명록 내용을 삭제 한다.
	 * 
	 * @param boardVO
	 * @throws Exception
	 */
	public void deleteGuestList(BoardVO boardVO) throws Exception {
		bbsManageMapper.deleteGuestList(boardVO);
	}

	/**
	 * 방명록에 대한 목록을 조회 한다.
	 * 
	 * @param boardVO
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectGuestList(BoardVO boardVO) throws Exception {
		List<BoardVO> result = bbsManageMapper.selectGuestList(boardVO);
		int cnt = bbsManageMapper.selectGuestListCnt(boardVO);

		Map<String, Object> map = new HashMap<String, Object>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 방명록에 대한 패스워드를 조회 한다.
	 * 
	 * @param board
	 * @return String
	 * @throws Exception
	 */
	public String getPasswordInf(Board board) throws Exception {
		return bbsManageMapper.getPasswordInf(board);
	}
}