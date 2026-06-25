package com.portal.system.code.zip;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 우편번호에 관한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@EgovMapper("ZipManageMapper")
public interface ZipManageMapper {

	/**
	 * 우편번호를 삭제한다.
	 * @param zip 우편번호 정보 Map
	 * @throws Exception
	 */
	void deleteZip(Map<String, Object> zip) throws Exception;

	/**
	 * 우편번호 전체를 삭제한다.
	 * @throws Exception
	 */
	void deleteAllZip() throws Exception;

	/**
	 * 우편번호를 등록한다.
	 * @param zip 우편번호 정보 Map
	 * @throws Exception
	 */
	void insertZip(Map<String, Object> zip) throws Exception;

	/**
	 * 우편번호 상세항목을 조회한다.
	 * @param zip 조회 조건 Map
	 * @return Map<String, Object> 우편번호 상세정보
	 * @throws Exception
	 */
	Map<String, Object> selectZipDetail(Map<String, Object> zip) throws Exception;

	/**
	 * 우편번호 목록을 조회한다.
	 * @param searchMap 검색 조건 Map
	 * @return List<Map<String, Object>> 우편번호 목록
	 * @throws Exception
	 */
	List<Map<String, Object>> selectZipList(Map<String, Object> searchMap) throws Exception;

	/**
	 * 우편번호 총 갯수를 조회한다.
	 * @param searchMap 검색 조건 Map
	 * @return int 우편번호 총 갯수
	 * @throws Exception
	 */
	int selectZipListTotCnt(Map<String, Object> searchMap) throws Exception;

	/**
	 * 우편번호를 수정한다.
	 * @param zip 우편번호 수정정보 Map
	 * @throws Exception
	 */
	void updateZip(Map<String, Object> zip) throws Exception;

}
