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

import com.portal.common.ComDefaultVO;
import com.portal.common.LoginVO;
import com.portal.board.bbs.service.BoardVO;
import com.portal.board.bbs.service.BBSManageService;
import com.portal.system.menu.mpm.service.MenuManageService;
import com.portal.system.menu.mpm.service.MenuManageVO;
import com.portal.user.help.faq.service.FaqManageService;
import com.portal.user.help.faq.service.FaqManageDefaultVO;
import com.portal.user.poll.qri.service.QustnrRespondInfoService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

/**
 * 템플릿 메인 페이지 컨트롤러 클래스(Sample 소스)
 * @author 실행환경 개발팀 JJY
 * @since 2011.08.31
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *  수정일              수정자           수정내용
 *  ----------  --------   ---------------------------
 *  2011.08.31  JJY        최초 생성
 *  2021.08.12  신용호            추가 URL 생성 
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

	/** MenuManageService */
	@Resource(name = "meunManageService")
    private MenuManageService menuManageService;

	/** FaqManageService */
	@Resource(name = "FaqManageService")
    private FaqManageService faqManageService;

	/** egovQustnrRespondInfoService */
	@Resource(name = "egovQustnrRespondInfoService")
	private QustnrRespondInfoService egovQustnrRespondInfoService;

	@RequestMapping(value = "/cmm/main/mainPage.do")
	public Map<String, Object> getMgtMainPage(HttpServletRequest request)
	  throws Exception{
		Map<String, Object> resultMap = new HashMap<>();
		
		// 공지사항 메인 컨텐츠 조회 시작 ---------------------------------
		BoardVO boardVO = new BoardVO();
		boardVO.setUseAt("Y");
		boardVO.setPageUnit(5);
		boardVO.setPageSize(10);
		boardVO.setBbsId("BBSMSTR_AAAAAAAAAAAA");

		PaginationInfo paginationInfo = new PaginationInfo();

		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(boardVO.getPageUnit());
		paginationInfo.setPageSize(boardVO.getPageSize());

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		Map<String, Object> map = bbsMngService.selectBoardArticles(boardVO, "BBSA02");
		resultMap.put("notiList", map.get("resultList"));


		// 공지사항 메인컨텐츠 조회 끝 -----------------------------------

		// 자유게시판 메인 컨텐츠 조회 시작 ---------------------------------
		boardVO.setPageUnit(5);
		boardVO.setPageSize(10);
		boardVO.setBbsId("BBSMSTR_BBBBBBBBBBBB");

		paginationInfo.setCurrentPageNo(boardVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(boardVO.getPageUnit());
		paginationInfo.setPageSize(boardVO.getPageSize());

		boardVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		boardVO.setLastIndex(paginationInfo.getLastRecordIndex());
		boardVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		resultMap.put("bbsList", bbsMngService.selectBoardArticles(boardVO, "BBSA02").get("resultList"));

		// 자유게시판 메인컨텐츠 조회 끝 -----------------------------------

		// FAQ 메인 컨텐츠 조회 시작 ---------------------------------
		/** EgovPropertyService.SiteList */
		FaqManageDefaultVO searchVO = new FaqManageDefaultVO();
		searchVO.setPageUnit(3);
    	searchVO.setPageSize(10);

    	/** pageing */
    	paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());

		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        resultMap.put("faqList", faqManageService.selectFaqList(searchVO));

		// FAQ 메인 컨텐츠 조회 끝 -----------------------------------

        // 설문참여 메인 컨텐츠 조회 시작 -----------------------------------
        ComDefaultVO qVO = new ComDefaultVO();
    	qVO.setPageUnit(1);
    	qVO.setPageSize(10);

    	/** pageing */
		paginationInfo.setCurrentPageNo(qVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(qVO.getPageUnit());
		paginationInfo.setPageSize(qVO.getPageSize());

		qVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		qVO.setLastIndex(paginationInfo.getLastRecordIndex());
		qVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

        resultMap.put("qriList", egovQustnrRespondInfoService.selectQustnrRespondInfoManageList(qVO));

     // 설문참여 메인 컨텐츠 조회 끝 -----------------------------------

		return resultMap;
	}

	/**
     * Header Page를 조회한다.
     * @param menuManageVO MenuManageVO
     * @return Header data
     * @exception Exception
     */
	@RequestMapping(value="/sym/mms/EgovHeader.do")
    public Map<String, Object> selectHeader(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		@RequestParam(value="flag", required=false) String flag)
            throws Exception {
            
        Map<String, Object> resultMap = new HashMap<>();

		LoginVO user =  EgovUserDetailsHelper.isAuthenticated()? (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser():null;

		if(EgovUserDetailsHelper.isAuthenticated() && user!=null){
    		menuManageVO.setTmp_Id(user.getId());
        	menuManageVO.setTmp_Password(user.getPassword());
        	menuManageVO.setTmp_UserSe(user.getUserSe());
        	menuManageVO.setTmp_Name(user.getName());
        	menuManageVO.setTmp_Email(user.getEmail());
        	menuManageVO.setTmp_OrgnztId(user.getOrgnztId());
        	menuManageVO.setTmp_UniqId(user.getUniqId());
    		resultMap.put("list_headmenu", menuManageService.selectMainMenuHead(menuManageVO));
    		resultMap.put("list_menulist", menuManageService.selectMainMenuLeft(menuManageVO));
    	}else{
    		menuManageVO.setAuthorCode("ROLE_ANONYMOUS");
    		resultMap.put("list_headmenu", menuManageService.selectMainMenuHeadByAuthor(menuManageVO));
    		resultMap.put("list_menulist", menuManageService.selectMainMenuLeftByAuthor(menuManageVO));
    	}

    	return resultMap;

    }

	@RequestMapping(value="/sym/mms/EgovMainMenuHead.do")
    public Map<String, Object> selectMainMenuHead(
    		@ModelAttribute("menuManageVO") MenuManageVO menuManageVO,
    		@RequestParam(value="flag", required=false) String flag)
            throws Exception {
            
        Map<String, Object> resultMap = new HashMap<>();

    	LoginVO user =
    		EgovUserDetailsHelper.isAuthenticated()? (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser():null;
    	if(EgovUserDetailsHelper.isAuthenticated() && user!=null){
    		menuManageVO.setTmp_Id(user.getId());
        	menuManageVO.setTmp_Password(user.getPassword());
        	menuManageVO.setTmp_UserSe(user.getUserSe());
        	menuManageVO.setTmp_Name(user.getName());
        	menuManageVO.setTmp_Email(user.getEmail());
        	menuManageVO.setTmp_OrgnztId(user.getOrgnztId());
        	menuManageVO.setTmp_UniqId(user.getUniqId());
    		resultMap.put("list_headmenu", menuManageService.selectMainMenuHead(menuManageVO));
    		resultMap.put("list_menulist", menuManageService.selectMainMenuLeft(menuManageVO));
    	}else{
    		menuManageVO.setAuthorCode("ROLE_ANONYMOUS");
    		resultMap.put("list_headmenu", menuManageService.selectMainMenuHeadByAuthor(menuManageVO));
    		resultMap.put("list_menulist", menuManageService.selectMainMenuLeftByAuthor(menuManageVO));
    	}

    	return resultMap;
    }

}