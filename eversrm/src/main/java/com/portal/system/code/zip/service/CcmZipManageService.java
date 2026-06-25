package com.portal.system.code.zip.service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.system.code.zip.ZipManageMapper;
import jakarta.annotation.Resource;

/**
 * 우편번호에 관한 서비스 구현 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2009.04.01
 * @version 1.0
 */
@Service("ZipManageService")
public class CcmZipManageService extends EgovAbstractServiceImpl {

	@Resource(name="ZipManageMapper")
	private ZipManageMapper zipManageMapper;

	/**
	 * 우편번호를 삭제한다.
	 * @param zip 우편번호 정보 Map
	 * @throws Exception
	 */
	public void deleteZip(Map<String, Object> zip) throws Exception {
		zipManageMapper.deleteZip(zip);
	}

	/**
	 * 우편번호 전체를 삭제한다.
	 * @throws Exception
	 */
	public void deleteAllZip() throws Exception {
		zipManageMapper.deleteAllZip();
	}

	/**
	 * 우편번호를 등록한다.
	 * @param zip 우편번호 정보 Map
	 * @throws Exception
	 */
	public void insertZip(Map<String, Object> zip) throws Exception {
		zipManageMapper.insertZip(zip);
	}

	/**
	 * 우편번호 엑셀파일을 등록한다.
	 * @param file 입력 스트림
	 * @throws Exception
	 */
	public void insertExcelZip(InputStream file) throws Exception {
		// 레거시에서도 비어 있던 비즈니스 로직
	}

	/**
	 * 우편번호 상세항목을 조회한다.
	 * @param zip 조회 조건 Map
	 * @return Map<String, Object> 우편번호 상세정보
	 * @throws Exception
	 */
	public Map<String, Object> selectZipDetail(Map<String, Object> zip) throws Exception {
		return zipManageMapper.selectZipDetail(zip);
	}

	/**
	 * 우편번호 목록을 조회한다.
	 * @param searchMap 검색 조건 Map
	 * @return List<Map<String, Object>> 우편번호 목록
	 * @throws Exception
	 */
	public List<Map<String, Object>> selectZipList(Map<String, Object> searchMap) throws Exception {
		return zipManageMapper.selectZipList(searchMap);
	}

	/**
	 * 우편번호 총 갯수를 조회한다.
	 * @param searchMap 검색 조건 Map
	 * @return int 우편번호 총 갯수
	 * @throws Exception
	 */
	public int selectZipListTotCnt(Map<String, Object> searchMap) throws Exception {
		return zipManageMapper.selectZipListTotCnt(searchMap);
	}

	/**
	 * 우편번호를 수정한다.
	 * @param zip 우편번호 수정정보 Map
	 * @throws Exception
	 */
	public void updateZip(Map<String, Object> zip) throws Exception {
		zipManageMapper.updateZip(zip);
	}

}
