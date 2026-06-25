package com.portal.system.code.zip.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.system.code.zip.service.CcmZipManageService;
import jakarta.annotation.Resource;

/**
 * 우편번호 찾기에 관한 컨트롤러 클래스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.25
 * @version 1.0
 */
@RestController
@RequestMapping("/api/system/zip")
public class ZipApiManageController {

	@Resource(name = "ZipManageService")
	private CcmZipManageService zipManageService;

	@Resource(name = "propertiesService")
	protected EgovPropertyService propertiesService;

	/**
	 * 우편번호 찾기 목록을 조회한다.
	 */
	@RequestMapping(value = "/selectZipList.api", method = RequestMethod.GET)
	public Map<String, Object> selectZipList(@RequestParam Map<String, Object> searchMap) throws Exception {
		Map<String, Object> response = new HashMap<>();
		try {
			int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
			int pageUnit = propertiesService.getInt("pageUnit");
			int pageSize = propertiesService.getInt("pageSize");

			PaginationInfo paginationInfo = new PaginationInfo();
			paginationInfo.setCurrentPageNo(pageIndex);
			paginationInfo.setRecordCountPerPage(pageUnit);
			paginationInfo.setPageSize(pageSize);

			searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
			searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
			searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

			List<?> resultList = zipManageService.selectZipList(searchMap);
			int totCnt = zipManageService.selectZipListTotCnt(searchMap);
			paginationInfo.setTotalRecordCount(totCnt);

			response.put("resultCode", "SUCCESS");
			response.put("resultList", resultList);
			response.put("totalCount", totCnt);
			response.put("paginationInfo", paginationInfo);
		} catch (Exception e) {
			response.put("resultCode", "ERROR");
			response.put("resultMessage", e.getMessage());
		}
		return response;
	}
}
