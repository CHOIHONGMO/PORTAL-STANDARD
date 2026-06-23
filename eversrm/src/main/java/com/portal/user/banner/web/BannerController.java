package com.portal.user.banner.web;

import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.support.SessionStatus;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.portal.common.PortalMessageSource;
import com.portal.common.LoginVO;
import com.portal.common.service.FileMngService;
import com.portal.common.service.FileMngUtil;
import com.portal.common.service.FileVO;
import com.portal.user.banner.service.Banner;
import com.portal.user.banner.service.BannerVO;
import com.portal.user.banner.service.BannerService;
import jakarta.annotation.Resource;
import jakarta.validation.Valid;

/**
 * 배너에 대한 controller 클래스를 정의한다.
 * 배너에 대한 등록, 수정, 삭제, 조회, 반영확인 기능을 제공한다.
 * 배너의 조회기능은 목록조회, 상세조회로 구분된다.
 * 
 * @author 공통서비스개발팀 lee.m.j
 * @since 2009.08.03
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *   2009.08.03  lee.m.j        최초 생성
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *      </pre>
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
	 * @param bannerVO - 배너 VO
	 * @return String - 리턴 URL
	 * @throws Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/selectBannerList.do")
	public Map<String, Object> selectBannerList(@ModelAttribute("bannerVO") BannerVO bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		/** paging */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(bannerVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(bannerVO.getPageUnit());
		paginationInfo.setPageSize(bannerVO.getPageSize());

		bannerVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		bannerVO.setLastIndex(paginationInfo.getLastRecordIndex());
		bannerVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		bannerVO.setBannerList(egovBannerService.selectBannerList(bannerVO));

		resultMap.put("bannerList", bannerVO.getBannerList());

		int totCnt = egovBannerService.selectBannerListTotCnt(bannerVO);
		paginationInfo.setTotalRecordCount(totCnt);
		resultMap.put("paginationInfo", paginationInfo);

		resultMap.put("message", egovMessageSource.getMessage("success.common.select"));

		return resultMap;
	}

	/**
	 * 등록된 배너의 상세정보를 조회한다.
	 * 
	 * @param bannerVO - 배너 Vo
	 * @return String - 리턴 Url
	 */
	@RequestMapping(value = "/uss/ion/bnr/getBanner.do")
	public Map<String, Object> selectBanner(@RequestParam("bannerId") String bannerId, @ModelAttribute("bannerVO") BannerVO bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		bannerVO.setBannerId(bannerId);

		resultMap.put("banner", egovBannerService.selectBanner(bannerVO));
		resultMap.put("message", egovMessageSource.getMessage("success.common.select"));

		return resultMap;
	}

	/**
	 * 배너정보를 신규로 등록한다.
	 * 
	 * @param banner - 배너 model
	 * @return String - 리턴 Url
	 */
	@RequestMapping(value = "/uss/ion/bnr/addBanner.do")
	public Map<String, Object> insertBanner(final MultipartHttpServletRequest multiRequest,
			@Valid @ModelAttribute("banner") Banner banner, BindingResult bindingResult,
			@ModelAttribute("bannerVO") BannerVO bannerVO, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		if (bindingResult.hasErrors()) {
			resultMap.put("bannerVO", bannerVO);
			resultMap.put("success", false);
			return resultMap;
		} else {
			List<FileVO> result = null;

			String uploadFolder = "";
			String bannerImage = "";
			String atchFileId = "";

			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			if (!files.isEmpty()) {
				result = fileUtil.parseFileInf(files, "BNR_", 0, "", uploadFolder);
				atchFileId = fileMngService.insertFileInfs(result);

				FileVO vo = result.get(0);
				Iterator<FileVO> iter = result.iterator();

				while (iter.hasNext()) {
					vo = iter.next();
					bannerImage = vo.getOrignlFileNm();
				}
			}

			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();

			banner.setBannerId(egovBannerIdGnrService.getNextStringId());
			banner.setBannerImage(bannerImage);
			banner.setBannerImageFile(atchFileId);
			banner.setUserId(user.getId());
			bannerVO.setBannerId(banner.getBannerId());
			status.setComplete();
			resultMap.put("success", true);
			resultMap.put("message", egovMessageSource.getMessage("success.common.insert"));
			resultMap.put("banner", egovBannerService.insertBanner(banner, bannerVO));

			return resultMap;

		}
	}

	/**
	 * 기 등록된 배너정보를 수정한다.
	 * 
	 * @param banner - 배너 model
	 * @return String - 리턴 Url
	 */
	@RequestMapping(value = "/uss/ion/bnr/updtBanner.do")
	public Map<String, Object> updateBanner(final MultipartHttpServletRequest multiRequest,
			@Valid @ModelAttribute("banner") Banner banner, BindingResult bindingResult, SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		if (bindingResult.hasErrors()) {
			resultMap.put("bannerVO", banner);
			resultMap.put("success", false);
			return resultMap;
		} else {

			List<FileVO> result = null;

			String uploadFolder = "";
			String bannerImage = "";
			String atchFileId = "";

			final Map<String, MultipartFile> files = multiRequest.getFileMap();

			if (!files.isEmpty()) {
				result = fileUtil.parseFileInf(files, "BNR_", 0, "", uploadFolder);
				atchFileId = fileMngService.insertFileInfs(result);

				FileVO vo = null;
				Iterator<FileVO> iter = result.iterator();

				while (iter.hasNext()) {
					vo = iter.next();
					bannerImage = vo.getOrignlFileNm();
				}

				if (vo == null) {
					banner.setAtchFile(false);
				} else {
					banner.setBannerImage(bannerImage);
					banner.setBannerImageFile(atchFileId);
					banner.setAtchFile(true);
				}
			} else {
				banner.setAtchFile(false);
			}

			LoginVO user = (LoginVO) EgovUserDetailsHelper.getAuthenticatedUser();
			banner.setUserId(user.getId());

			egovBannerService.updateBanner(banner);

			resultMap.put("success", true);
			return resultMap;

		}
	}

	/**
	 * 기 등록된 배너정보를 삭제한다.
	 * 
	 * @param banner Banner
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/removeBanner.do")
	public Map<String, Object> deleteBanner(@RequestParam("bannerId") String bannerId, @ModelAttribute("banner") Banner banner,
			SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		banner.setBannerId(bannerId);
		egovBannerService.deleteBanner(banner);
		status.setComplete();
		resultMap.put("success", true);
		resultMap.put("message", egovMessageSource.getMessage("success.common.delete"));

		return resultMap;
	}

	/**
	 * 기 등록된 배너정보목록을 일괄 삭제한다.
	 * 
	 * @param banners String
	 * @param banner  Banner
	 * @return String
	 * @exception Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/removeBannerList.do")
	public Map<String, Object> deleteBannerList(@RequestParam("bannerIds") String bannerIds, @ModelAttribute("banner") Banner banner,
			SessionStatus status) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		// 26.03.24 KISA 보안취약점 조치 : null check 추가
		String[] strBannerIds = bannerIds != null ? bannerIds.split(";") : new String[0];

		if (strBannerIds.length == 0) {
			resultMap.put("success", false);
			resultMap.put("message", egovMessageSource.getMessage("fail.common.delete"));
			return resultMap;
		}

		for (int i = 0; i < strBannerIds.length; i++) {
			banner.setBannerId(strBannerIds[i]);
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
	 * @param bannerVO - 배너 VO
	 * @return String - 리턴 Url
	 */
	@RequestMapping(value = "/uss/ion/bnr/getBannerImage.do")
	public Map<String, Object> selectBannerResult(@ModelAttribute("bannerVO") BannerVO bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		List<BannerVO> fileList = egovBannerService.selectBannerResult(bannerVO);
		resultMap.put("fileList", fileList);
		resultMap.put("resultType", bannerVO.getResultType());

		return resultMap;
	}

	/**
	 * MyPage에 배너정보를 제공하기 위해 목록을 조회한다.
	 * 
	 * @param bannerVO - 배너 VO
	 * @return String - 리턴 URL
	 * @throws Exception
	 */
	@RequestMapping(value = "/uss/ion/bnr/selectBannerMainList.do")
	public Map<String, Object> selectBannerMainList(@ModelAttribute("bannerVO") BannerVO bannerVO) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();
		/** paging */
		PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(bannerVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(5);
		paginationInfo.setPageSize(bannerVO.getPageSize());

		bannerVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		bannerVO.setLastIndex(paginationInfo.getLastRecordIndex());
		bannerVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

		bannerVO.setBannerList(egovBannerService.selectBannerList(bannerVO));

		resultMap.put("bannerList", bannerVO.getBannerList());

		return resultMap;
	}
}
