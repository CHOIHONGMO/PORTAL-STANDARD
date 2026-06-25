package com.portal.system.menu.web;

import java.util.HashMap;
import java.util.Map;

import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.common.model.LoginVO;
import com.portal.system.menu.service.MenuManageService;
import jakarta.annotation.Resource;

/**
 * 메뉴관리에 관한 컨트롤러 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@RestController
public class MenuManageController {

	@Resource(name = "meunManageService")
	private MenuManageService menuManageService;

	/**
	 * Header Page를 조회한다.
	 * @param menuManageMap Map
	 * @return Header data
	 * @exception Exception
	 */
	@RequestMapping(value="/sym/mms/EgovHeader.do")
	public Map<String, Object> selectHeader(
			@RequestParam(required=false) Map<String, Object> menuManageMap,
			@RequestParam(value="flag", required=false) String flag)
			throws Exception {
			
		Map<String, Object> resultMap = new HashMap<>();
		if (menuManageMap == null) {
			menuManageMap = new HashMap<>();
		}

		LoginVO user = EgovUserDetailsHelper.isAuthenticated() ? (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser() : null;

		if(EgovUserDetailsHelper.isAuthenticated() && user != null){
			menuManageMap.put("tmp_Id", user.getId());
			menuManageMap.put("tmp_Password", user.getPassword());
			menuManageMap.put("tmp_UserSe", user.getUserSe());
			menuManageMap.put("tmp_Name", user.getName());
			menuManageMap.put("tmp_Email", user.getEmail());
			menuManageMap.put("tmp_OrgnztId", user.getOrgnztId());
			menuManageMap.put("tmp_UniqId", user.getUniqId());
			resultMap.put("list_headmenu", menuManageService.selectMainMenuHead(menuManageMap));
			resultMap.put("list_menulist", menuManageService.selectMainMenuLeft(menuManageMap));
		}else{
			menuManageMap.put("authorCode", "ROLE_ANONYMOUS");
			resultMap.put("list_headmenu", menuManageService.selectMainMenuHeadByAuthor(menuManageMap));
			resultMap.put("list_menulist", menuManageService.selectMainMenuLeftByAuthor(menuManageMap));
		}

		return resultMap;
	}

	/**
	 * Main Menu Head를 조회한다.
	 * @param menuManageMap Map
	 * @return Head data
	 * @exception Exception
	 */
	@RequestMapping(value="/sym/mms/EgovMainMenuHead.do")
	public Map<String, Object> selectMainMenuHead(
			@RequestParam(required=false) Map<String, Object> menuManageMap,
			@RequestParam(value="flag", required=false) String flag)
			throws Exception {
			
		Map<String, Object> resultMap = new HashMap<>();
		if (menuManageMap == null) {
			menuManageMap = new HashMap<>();
		}

		LoginVO user = EgovUserDetailsHelper.isAuthenticated() ? (LoginVO)EgovUserDetailsHelper.getAuthenticatedUser() : null;
		if(EgovUserDetailsHelper.isAuthenticated() && user != null){
			menuManageMap.put("tmp_Id", user.getId());
			menuManageMap.put("tmp_Password", user.getPassword());
			menuManageMap.put("tmp_UserSe", user.getUserSe());
			menuManageMap.put("tmp_Name", user.getName());
			menuManageMap.put("tmp_Email", user.getEmail());
			menuManageMap.put("tmp_OrgnztId", user.getOrgnztId());
			menuManageMap.put("tmp_UniqId", user.getUniqId());
			resultMap.put("list_headmenu", menuManageService.selectMainMenuHead(menuManageMap));
			resultMap.put("list_menulist", menuManageService.selectMainMenuLeft(menuManageMap));
		}else{
			menuManageMap.put("authorCode", "ROLE_ANONYMOUS");
			resultMap.put("list_headmenu", menuManageService.selectMainMenuHeadByAuthor(menuManageMap));
			resultMap.put("list_menulist", menuManageService.selectMainMenuLeftByAuthor(menuManageMap));
		}

		return resultMap;
	}

}
