package com.portal.user.banner.web;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.portal.common.message.PortalMessageSource;
import com.portal.common.model.LoginVO;
import com.portal.common.service.FileMngService;
import com.portal.common.service.FileMngUtil;
import com.portal.user.banner.service.BannerService;
import jakarta.annotation.Resource;

/**
 * 배너에 대한 controller 클래스를 정의한다.
 * 배너에 대한 등록, 수정, 삭제, 조회, 반영확인 기능을 제공한다.
 * 배너의 조회기능은 목록조회, 상세조회로 구분된다.
 * 
 * @author ST-Ones Corp.
 * @since 2009.08.03
 * @version 1.0
 */
@RestController
public class BannerController {

	@Resource(name = "egovMessageSource")
	PortalMessageSource egovMessageSource;

	@Resource(name = "FileMngService")
	private FileMngService fileMngService;

	@Resource(name = "FileMngUtil")
	private FileMngUtil fileUtil;

	@Resource(name = "egovBannerService")
	private BannerService egovBannerService;

	/** Message ID Generation */
	@Resource(name = "egovBannerIdGnrService")
	private EgovIdGnrService egovBannerIdGnrService;

	/**
	 * 배너를 관리하기 위해 등록된 배너목록을 조회한다.
	 * 
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/selectBannerList.do")
	public Map<String, Object> selectBannerList(@RequestParam Map<String, Object> bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		
		int pageIndex = bannerVO.get("pageIndex") != null ? Integer.parseInt(String.valueOf(bannerVO.get("pageIndex"))) : 1;
		int pageUnit = bannerVO.get("pageUnit") != null ? Integer.parseInt(String.valueOf(bannerVO.get("pageUnit"))) : 10;
		int pageSize = bannerVO.get("pageSize") != null ? Integer.parseInt(String.valueOf(bannerVO.get("pageSize"))) : 10;

		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(pageIndex);
		paginationInfo.setRecordCountPerPage(pageUnit);
		paginationInfo.setPageSize(pageSize);

		bannerVO.put("firstIndex", paginationInfo.getFirstRecordIndex());
		bannerVO.put("lastIndex", paginationInfo.getLastRecordIndex());
		bannerVO.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		List<Map<String, Object>> bannerList = egovBannerService.selectBannerList(bannerVO);
		resultMap.put("bannerList", bannerList);

		int totCnt = egovBannerService.selectBannerListTotCnt(bannerVO);
		paginationInfo.setTotalRecordCount(totCnt);
		resultMap.put("paginationInfo", paginationInfo);

		resultMap.put("message", egovMessageSource.getMessage("success.common.select"));

		return resultMap;
	}

	/**
	 * 등록된 배너의 상세정보를 조회한다.
	 * 
	 * @param bannerId - 배너 ID
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/uss/ion/bnr/getBanner.do")
	public Map<String, Object> selectBanner(@RequestParam("bannerId") String bannerId, @RequestParam Map<String, Object> bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		bannerVO.put("bannerId", bannerId);

		resultMap.put("banner", egovBannerService.selectBanner(bannerVO));
		resultMap.put("message", egovMessageSource.getMessage("success.common.select"));

		return resultMap;
	}

	/**
	 * 배너정보를 신규로 등록한다.
	 * 
	 * @param multiRequest - Multipart Request
	 * @param banner - 배너 Map
	 * @param status - Session Status
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/uss/ion/bnr/addBanner.do")
	public Map<String, Object> insertBanner(final MultipartHttpServletRequest multiRequest,
			@RequestParam Map<String, Object> banner, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		List<Map<String, Object>> result = null;

		String uploadFolder = "";
		String bannerImage = "";
		String atchFileId = "";

		final Map<String, MultipartFile> files = multiRequest.getFileMap();

		if (!files.isEmpty()) {
			result = fileUtil.parseFileInf(files, "BNR_", 0, "", uploadFolder);
			atchFileId = fileMngService.insertFileInfs(result);

			Map<String, Object> vo = result.get(0);
			Iterator<Map<String, Object>> iter = result.iterator();

			while (iter.hasNext()) {
				vo = iter.next();
				bannerImage = (String) vo.get("orignlFileNm");
			}
		}

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

		banner.put("bannerId", egovBannerIdGnrService.getNextStringId());
		banner.put("bannerImage", bannerImage);
		banner.put("bannerImageFile", atchFileId);
		banner.put("userId", user.getId());
		status.setComplete();
		
		resultMap.put("success", true);
		resultMap.put("message", egovMessageSource.getMessage("success.common.insert"));
		resultMap.put("banner", egovBannerService.insertBanner(banner));

		return resultMap;
	}

	/**
	 * 기 등록된 배너정보를 수정한다.
	 * 
	 * @param multiRequest - Multipart Request
	 * @param banner - 배너 Map
	 * @param status - Session Status
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/uss/ion/bnr/updtBanner.do")
	public Map<String, Object> updateBanner(final MultipartHttpServletRequest multiRequest,
			@RequestParam Map<String, Object> banner, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		List<Map<String, Object>> result = null;

		String uploadFolder = "";
		String bannerImage = "";
		String atchFileId = "";

		final Map<String, MultipartFile> files = multiRequest.getFileMap();

		if (!files.isEmpty()) {
			result = fileUtil.parseFileInf(files, "BNR_", 0, "", uploadFolder);
			atchFileId = fileMngService.insertFileInfs(result);

			Map<String, Object> vo = null;
			Iterator<Map<String, Object>> iter = result.iterator();

			while (iter.hasNext()) {
				vo = iter.next();
				bannerImage = (String) vo.get("orignlFileNm");
			}

			if (vo == null) {
				banner.put("isAtchFile", "false");
			} else {
				banner.put("bannerImage", bannerImage);
				banner.put("bannerImageFile", atchFileId);
				banner.put("isAtchFile", "true");
			}
		} else {
			banner.put("isAtchFile", "false");
		}

		LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
		banner.put("userId", user.getId());

		egovBannerService.updateBanner(banner);

		resultMap.put("success", true);
		return resultMap;
	}

	/**
	 * 기 등록된 배너정보를 삭제한다.
	 * 
	 * @param bannerId - 배너 ID
	 * @param status - Session Status
	 * @return Map<String, Object>
	 * @exception Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/removeBanner.do")
	public Map<String, Object> deleteBanner(@RequestParam("bannerId") String bannerId, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		Map<String, Object> banner = new HashMap<>();
		banner.put("bannerId", bannerId);
		
		egovBannerService.deleteBanner(banner);
		status.setComplete();
		resultMap.put("success", true);
		resultMap.put("message", egovMessageSource.getMessage("success.common.delete"));

		return resultMap;
	}

	/**
	 * 기 등록된 배너정보목록을 일괄 삭제한다.
	 * 
	 * @param bannerIds - 배너 IDs
	 * @param status - Session Status
	 * @return Map<String, Object>
	 * @exception Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/removeBannerList.do")
	public Map<String, Object> deleteBannerList(@RequestParam("bannerIds") String bannerIds, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		String[] strBannerIds = bannerIds != null ? bannerIds.split(";") : new String[0];

		if (strBannerIds.length == 0) {
			resultMap.put("success", false);
			resultMap.put("message", egovMessageSource.getMessage("fail.common.delete"));
			return resultMap;
		}

		for (int i = 0; i < strBannerIds.length; i++) {
			Map<String, Object> banner = new HashMap<>();
			banner.put("bannerId", strBannerIds[i]);
			egovBannerService.deleteBanner(banner);
		}

		status.setComplete();
		resultMap.put("success", true);
		resultMap.put("message", egovMessageSource.getMessage("success.common.delete"));

		return resultMap;
	}

	/**
	 * 배너가 특정화면에 반영된 결과를 조회한다.
	 * 
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object>
	 */
	@RequestMapping(value = "/uss/ion/bnr/getBannerImage.do")
	public Map<String, Object> selectBannerResult(@RequestParam Map<String, Object> bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		List<Map<String, Object>> fileList = egovBannerService.selectBannerResult(bannerVO);
		resultMap.put("fileList", fileList);
		resultMap.put("resultType", bannerVO.getOrDefault("resultType", "horizontal"));

		return resultMap;
	}

	/**
	 * MyPage에 배너정보를 제공하기 위해 목록을 조회한다.
	 * 
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object>
	 * @throws Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/selectBannerMainList.do")
	public Map<String, Object> selectBannerMainList(@RequestParam Map<String, Object> bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		PaginationInfo paginationInfo = new PaginationInfo();
		
		int pageIndex = bannerVO.get("pageIndex") != null ? Integer.parseInt(String.valueOf(bannerVO.get("pageIndex"))) : 1;
		paginationInfo.setCurrentPageNo(pageIndex);
		paginationInfo.setRecordCountPerPage(5);
		paginationInfo.setPageSize(bannerVO.get("pageSize") != null ? Integer.parseInt(String.valueOf(bannerVO.get("pageSize"))) : 10);

		bannerVO.put("firstIndex", paginationInfo.getFirstRecordIndex());
		bannerVO.put("lastIndex", paginationInfo.getLastRecordIndex());
		bannerVO.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

		List<Map<String, Object>> bannerList = egovBannerService.selectBannerList(bannerVO);
		resultMap.put("bannerList", bannerList);

		return resultMap;
	}
}
