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
	 * @param paramMap
	 * @throws Exception
	 */
	public void deleteBoardArticle(Map<String, Object> paramMap) throws Exception {
		Map<String, Object> fvo = new HashMap<>();
		fvo.put("atchFileId", paramMap.get("atchFileId"));

		paramMap.put("nttSj", "이 글은 작성자에 의해서 삭제되었습니다.");

		bbsManageMapper.deleteBoardArticle(paramMap);

		if (fvo.get("atchFileId") != null && !"".equals(fvo.get("atchFileId"))) {
			fileService.deleteAllFileInf(fvo);
		}
	}

	/**
	 * 게시판에 게시물 또는 답변 게시물을 등록 한다.
	 * 
	 * @param paramMap
	 * @throws Exception
	 */
	public void insertBoardArticle(Map<String, Object> paramMap) throws Exception {
		String replyAt = (String) paramMap.get("replyAt");
		if ("Y".equals(replyAt)) {
			long nttId = bbsManageMapper.selectMaxNttId();
			paramMap.put("nttId", nttId);

			bbsManageMapper.replyBoardArticle(paramMap);

			long nttNo = bbsManageMapper.getParentNttNo(paramMap);

			paramMap.put("nttNo", nttNo);
			bbsManageMapper.updateOtherNttNo(paramMap);

			paramMap.put("nttNo", nttNo + 1);
			bbsManageMapper.updateNttNo(paramMap);
		} else {
			paramMap.put("parnts", "0");
			paramMap.put("replyLc", "0");
			paramMap.put("replyAt", "N");

			long nttId = bbsManageMapper.selectMaxNttId();
			paramMap.put("nttId", nttId);

			bbsManageMapper.insertBoardArticle(paramMap);
		}
	}

	/**
	 * 게시물 대하여 상세 내용을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBoardArticle(Map<String, Object> searchMap) throws Exception {
		boolean plusCount = Boolean.TRUE.equals(searchMap.get("plusCount"));
		if (plusCount) {
			int iniqireCo = bbsManageMapper.selectMaxInqireCo(searchMap);
			searchMap.put("inqireCo", iniqireCo);
			bbsManageMapper.updateInqireCo(searchMap);
		}
		return bbsManageMapper.selectBoardArticle(searchMap);
	}

	/**
	 * 조건에 맞는 게시물 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @param attrbFlag
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectBoardArticles(Map<String, Object> searchMap, String attrbFlag) throws Exception {
		List<Map<String, Object>> list = bbsManageMapper.selectBoardArticleList(searchMap);
		List<Map<String, Object>> result = new ArrayList<>();

		if ("BBSA01".equals(attrbFlag)) {
			String today = DateUtil.getToday();

			Iterator<Map<String, Object>> iter = list.iterator();
			while (iter.hasNext()) {
				Map<String, Object> vo = iter.next();
				String ntceBgnde = (String) vo.get("ntceBgnde");
				String ntceEndde = (String) vo.get("ntceEndde");

				if ((ntceBgnde != null && !ntceBgnde.isEmpty()) || (ntceEndde != null && !ntceEndde.isEmpty())) {
					if (DateUtil.getDaysDiff(today, ntceBgnde) > 0 || DateUtil.getDaysDiff(today, ntceEndde) < 0) {
						vo.put("isExpired", "Y");
					}
				}
				result.add(vo);
			}
		} else {
			result = list;
		}

		int cnt = bbsManageMapper.selectBoardArticleListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 게시물 한 건의 내용을 수정 한다.
	 * 
	 * @param paramMap
	 * @throws Exception
	 */
	public void updateBoardArticle(Map<String, Object> paramMap) throws Exception {
		bbsManageMapper.updateBoardArticle(paramMap);
	}

	/**
	 * 방명록 내용을 삭제 한다.
	 * 
	 * @param searchMap
	 * @throws Exception
	 */
	public void deleteGuestList(Map<String, Object> searchMap) throws Exception {
		bbsManageMapper.deleteGuestList(searchMap);
	}

	/**
	 * 방명록에 대한 목록을 조회 한다.
	 * 
	 * @param searchMap
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	public Map<String, Object> selectGuestList(Map<String, Object> searchMap) throws Exception {
		List<Map<String, Object>> result = bbsManageMapper.selectGuestList(searchMap);
		int cnt = bbsManageMapper.selectGuestListCnt(searchMap);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 방명록에 대한 패스워드를 조회 한다.
	 * 
	 * @param paramMap
	 * @return String
	 * @throws Exception
	 */
	public String getPasswordInf(Map<String, Object> paramMap) throws Exception {
		return bbsManageMapper.getPasswordInf(paramMap);
	}
}