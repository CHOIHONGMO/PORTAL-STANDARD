package com.portal.common.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.common.FileMngMapper;
import jakarta.annotation.Resource;

/**
 * 파일정보의 관리를 위한 서비스 클래스
 * 
 * @author ST-Ones Corp.
 */
@Service("FileMngService")
public class FileMngService extends EgovAbstractServiceImpl {

	@Resource(name = "fileMngMapper")
	private FileMngMapper fileMngMapper;

	/**
	 * 여러 개의 파일을 삭제한다.
	 */
	public void deleteFileInfs(List<?> fvoList) throws Exception {
		for (Object obj : fvoList) {
			Map<String, Object> fvo = (Map<String, Object>) obj;
			fileMngMapper.deleteFileDetail(fvo);
		}
	}

	/**
	 * 하나의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 */
	public String insertFileInf(Map<String, Object> fvo) throws Exception {
		String atchFileId = (String) fvo.get("atchFileId");
		fileMngMapper.insertFileMaster(fvo);
		fileMngMapper.insertFileDetail(fvo);
		return atchFileId;
	}

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 등록한다.
	 */
	public String insertFileInfs(List<?> fvoList) throws Exception {
		String atchFileId = "";

		if (fvoList != null && !fvoList.isEmpty()) {
			Map<String, Object> firstVo = (Map<String, Object>) fvoList.get(0);
			atchFileId = (String) firstVo.get("atchFileId");
			fileMngMapper.insertFileMaster(firstVo);
			for (Object obj : fvoList) {
				Map<String, Object> fvo = (Map<String, Object>) obj;
				fileMngMapper.insertFileDetail(fvo);
			}
		}
		if ("".equals(atchFileId)) {
			atchFileId = null;
		}
		return atchFileId;
	}

	/**
	 * 파일에 대한 목록을 조회한다.
	 */
	public List<Map<String, Object>> selectFileInfs(Map<String, Object> fvo) throws Exception {
		return fileMngMapper.selectFileList(fvo);
	}

	/**
	 * 여러 개의 파일에 대한 정보(속성 및 상세)를 수정한다.
	 */
	public void updateFileInfs(List<?> fvoList) throws Exception {
		for (Object obj : fvoList) {
			Map<String, Object> fvo = (Map<String, Object>) obj;
			fileMngMapper.insertFileDetail(fvo);
		}
	}

	/**
	 * 하나의 파일을 삭제한다.
	 */
	public void deleteFileInf(Map<String, Object> fvo) throws Exception {
		fileMngMapper.deleteFileDetail(fvo);
	}

	/**
	 * 파일에 대한 상세정보를 조회한다.
	 */
	public Map<String, Object> selectFileInf(Map<String, Object> fvo) throws Exception {
		return fileMngMapper.selectFileInf(fvo);
	}

	/**
	 * 파일 구분자에 대한 최대값을 구한다.
	 */
	public int getMaxFileSN(Map<String, Object> fvo) throws Exception {
		Integer sn = fileMngMapper.getMaxFileSN(fvo);
		return sn == null ? 0 : sn;
	}

	/**
	 * 전체 파일을 삭제한다.
	 */
	public void deleteAllFileInf(Map<String, Object> fvo) throws Exception {
		fileMngMapper.deleteCOMTNFILE(fvo);
	}

	/**
	 * 파일명 검색에 대한 목록을 조회한다.
	 */
	public Map<String, Object> selectFileListByFileNm(Map<String, Object> fvo) throws Exception {
		List<Map<String, Object>> result = fileMngMapper.selectFileListByFileNm(fvo);
		int cnt = fileMngMapper.selectFileListCntByFileNm(fvo);

		Map<String, Object> map = new HashMap<>();
		map.put("resultList", result);
		map.put("resultCnt", Integer.toString(cnt));

		return map;
	}

	/**
	 * 이미지 파일에 대한 목록을 조회한다.
	 */
	public List<Map<String, Object>> selectImageFileList(Map<String, Object> vo) throws Exception {
		return fileMngMapper.selectImageFileList(vo);
	}
}
