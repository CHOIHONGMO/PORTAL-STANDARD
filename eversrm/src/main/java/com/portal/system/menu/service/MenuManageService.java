package com.portal.system.menu.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.system.menu.MenuManageMapper;
import jakarta.annotation.Resource;

/**
 * 메뉴관리에 관한 비즈니스 구현 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2009.06.01
 * @version 1.0
 */
@Service("meunManageService")
public class MenuManageService extends EgovAbstractServiceImpl {

	@Resource(name="menuManageMapper")
	private MenuManageMapper menuManageMapper;

	/**
	 * MainMenu Head Menu 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	public List<Map<String, Object>> selectMainMenuHead(Map<String, Object> vo) throws Exception {
		return menuManageMapper.selectMainMenuHead(vo);
	}

	/**
	 * MainMenu Head Left 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	public List<Map<String, Object>> selectMainMenuLeft(Map<String, Object> vo) throws Exception {
		return menuManageMapper.selectMainMenuLeft(vo);
	}

	/**
	 * MainMenu Head MenuURL 조회
	 * @param iMenuNo 메뉴번호
	 * @param sUniqId 고유아이디
	 * @return String 마지막 메뉴 URL
	 * @exception Exception
	 */
	public String selectLastMenuURL(int iMenuNo, String sUniqId) throws Exception {
		Map<String, Object> vo = new HashMap<>();
		vo.put("menuNo", selectLastMenuNo(iMenuNo, sUniqId));
		return menuManageMapper.selectLastMenuURL(vo);
	}

	/**
	 * MainMenu Head Menu MenuNo 조회
	 */
	private int selectLastMenuNo(int iMenuNo, String sUniqId) throws Exception {
		int chkMenuNo = iMenuNo;
		int cntMenuNo = 0;
		for(;chkMenuNo > -1;){
			chkMenuNo = selectLastMenuNoChk(chkMenuNo, sUniqId);
			if(chkMenuNo > 0){
				cntMenuNo = chkMenuNo;
			}
		}
		return cntMenuNo;
	}

	/**
	 * MainMenu Head Menu Last MenuNo 조회
	 */
	private int selectLastMenuNoChk(int iMenuNo, String sUniqId) throws Exception {
		Map<String, Object> vo = new HashMap<>();
		vo.put("menuNo", iMenuNo);
		vo.put("tempValue", sUniqId);
		int chkMenuNo = 0;
		int cntMenuNo = 0;
		cntMenuNo = menuManageMapper.selectLastMenuNoCnt(vo);
		if(cntMenuNo > 0){
			chkMenuNo = menuManageMapper.selectLastMenuNo(vo);
		}else{
			chkMenuNo = -1;
		}
		return chkMenuNo;
	}

	/**
	 * MainMenu Head Menu 조회 - Anonymous
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	public List<Map<String, Object>> selectMainMenuHeadByAuthor(Map<String, Object> vo) throws Exception {
		return menuManageMapper.selectMainMenuHeadByAuthor(vo);
	}

	/**
	 * MainMenu Head Left 조회 - Anonymous
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	public List<Map<String, Object>> selectMainMenuLeftByAuthor(Map<String, Object> vo) throws Exception {
		return menuManageMapper.selectMainMenuLeftByAuthor(vo);
	}

}