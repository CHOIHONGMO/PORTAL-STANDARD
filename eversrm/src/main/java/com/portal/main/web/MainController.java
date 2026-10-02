package com.portal.main.web;

import java.util.Map;

import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.SessionAttributes;
import java.util.HashMap;

import com.portal.common.model.ComDefaultVO;
import com.portal.common.model.LoginVO;
import com.portal.board.bbs.service.BBSManageService;
import com.portal.user.help.faq.service.FaqManageService;
import com.portal.user.poll.qri.service.QustnrRespondInfoService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

import com.portal.user.poll.qmc.service.QustnrManageService;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * 템플릿 메인 페이지 컨트롤러 클래스(Sample 소스)
 * @author ST-Ones Corp.
 * @since 2011.08.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일              수정자           수정내용
 *  ----------  --------   ---------------------------
 *
 * </pre>
 */
@RestController
@SessionAttributes(types = ComDefaultVO.class)
public class MainController {

	private static final Logger LOGGER = LoggerFactory.getLogger(MainController.class);
	
	/**
	 * BBSManageService
	 */
	@Resource(name = "BBSManageService")
	private BBSManageService bbsMngService;

	/** FaqManageService */
	@Resource(name = "FaqManageService")
	private FaqManageService faqManageService;

	/** egovQustnrRespondInfoService */
	@Resource(name = "qustnrRespondInfoService")
	private QustnrRespondInfoService egovQustnrRespondInfoService;

	/** qustnrManageService */
	@Resource(name = "qustnrManageService")
	private QustnrManageService qustnrManageService;

	@RequestMapping(value = { "/cmm/main/mainPage.do", "/api/main/mainPage.api", "/api/cmm/main/mainPage.api" }, method = { RequestMethod.GET, RequestMethod.POST })
	public Map<String, Object> getMgtMainPage(HttpServletRequest request)
	  throws Exception{
		Map<String, Object> resultMap = new HashMap<>();
		try {
		
		// 공지사항 메인 컨텐츠 조회 시작 ---------------------------------
		Map<String, Object> boardSearchMap = new HashMap<>();
		boardSearchMap.put("useAt", "Y");
		boardSearchMap.put("bbsId", "BBSMSTR_AAAAAAAAAAAA");

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(1);
		paginationInfo.setRecordCountPerPage(5);
		paginationInfo.setPageSize(10);

		boardSearchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
		boardSearchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
		boardSearchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		Map<String, Object> map = bbsMngService.selectBoardArticles(boardSearchMap, "BBSA02");
		resultMap.put("notiList", map.get("resultList"));


		// 공지사항 메인컨텐츠 조회 끝 -----------------------------------

		// 자유게시판 메인 컨텐츠 조회 시작 ---------------------------------
		Map<String, Object> bbsSearchMap = new HashMap<>();
		bbsSearchMap.put("useAt", "Y");
		bbsSearchMap.put("bbsId", "BBSMSTR_BBBBBBBBBBBB");

		paginationInfo.setCurrentPageNo(1);
		paginationInfo.setRecordCountPerPage(5);
		paginationInfo.setPageSize(10);

		bbsSearchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
		bbsSearchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
		bbsSearchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		resultMap.put("bbsList", bbsMngService.selectBoardArticles(bbsSearchMap, "BBSA02").get("resultList"));

		// 자유게시판 메인컨텐츠 조회 끝 -----------------------------------

		// FAQ 메인 컨텐츠 조회 시작 ---------------------------------
		/** EgovPropertyService.SiteList */
		Map<String, Object> faqSearchVO = new HashMap<>();
		faqSearchVO.put("pageIndex", 1);
		faqSearchVO.put("pageUnit", 3);
		faqSearchVO.put("pageSize", 10);

		/** pageing */
		paginationInfo.setCurrentPageNo(1);
		paginationInfo.setRecordCountPerPage(3);
		paginationInfo.setPageSize(10);

		faqSearchVO.put("firstIndex", paginationInfo.getFirstRecordIndex());
		faqSearchVO.put("lastIndex", paginationInfo.getLastRecordIndex());
		faqSearchVO.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		resultMap.put("faqList", faqManageService.selectFaqList(faqSearchVO));

		// FAQ 메인 컨텐츠 조회 끝 -----------------------------------

		// 설문참여 메인 컨텐츠 조회 시작 -----------------------------------
		Map<String, Object> qVO = new HashMap<>();
		qVO.put("pageIndex", 1);
		qVO.put("pageUnit", 1);
		qVO.put("pageSize", 10);

		/** pageing */
		paginationInfo.setCurrentPageNo(1);
		paginationInfo.setRecordCountPerPage(1);
		paginationInfo.setPageSize(10);

		qVO.put("firstIndex", paginationInfo.getFirstRecordIndex());
		qVO.put("lastIndex", paginationInfo.getLastRecordIndex());
		qVO.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		resultMap.put("qriList", egovQustnrRespondInfoService.selectQustnrRespondInfoManageList(qVO));

		// 설문참여 메인 컨텐츠 조회 끝 -----------------------------------

		// 최신 설문지 메인 컨텐츠 조회 시작 ---------------------------------
		Map<String, Object> qustnrSearchMap = new HashMap<>();
		qustnrSearchMap.put("pageIndex", 1);
		qustnrSearchMap.put("recordCountPerPage", 3);
		qustnrSearchMap.put("firstIndex", 0);
		qustnrSearchMap.put("lastIndex", 3);
		resultMap.put("qustnrList", qustnrManageService.selectQustnrManageList(qustnrSearchMap));
		// 최신 설문지 메인 컨텐츠 조회 끝 -----------------------------------

		resultMap.put("resultCode", "SUCCESS");
		resultMap.put("resultMessage", "메인 페이지 데이터 조회 성공");

		} catch (Exception e) {
			LOGGER.error("메인 페이지 데이터 조회 실패: {}", e.getMessage(), e);
			resultMap.put("resultCode", "ERROR");
			resultMap.put("resultMessage", "메인 페이지 데이터 조회 실패: " + e.getMessage());
		}

		return resultMap;
	}
}