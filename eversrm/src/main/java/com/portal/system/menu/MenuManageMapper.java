package com.portal.system.menu;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 메뉴관리에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@EgovMapper("menuManageMapper")
public interface MenuManageMapper {

	/**
	 * MainMenu Head Menu 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	List<Map<String, Object>> selectMainMenuHead(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Left Menu 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	List<Map<String, Object>> selectMainMenuLeft(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Head MenuURL 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return String 메뉴 URL
	 * @exception Exception
	 */
	String selectLastMenuURL(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Left Menu 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return int 메뉴 번호
	 * @exception Exception
	 */
	int selectLastMenuNo(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Left Menu 조회
	 * @param vo 메뉴 조회 조건 Map
	 * @return int 메뉴 번호 개수
	 * @exception Exception
	 */
	int selectLastMenuNoCnt(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Head Menu 조회 - Anonymous
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	List<Map<String, Object>> selectMainMenuHeadByAuthor(Map<String, Object> vo) throws Exception;

	/**
	 * MainMenu Left Menu 조회 - Anonymous
	 * @param vo 메뉴 조회 조건 Map
	 * @return List<Map<String, Object>> 메뉴 목록
	 * @exception Exception
	 */
	List<Map<String, Object>> selectMainMenuLeftByAuthor(Map<String, Object> vo) throws Exception;

}
