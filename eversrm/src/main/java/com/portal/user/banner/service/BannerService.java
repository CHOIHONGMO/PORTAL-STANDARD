package com.portal.user.banner.service;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.user.banner.BannerMapper;
import jakarta.annotation.Resource;

/**
 * 배너에 대한 Service 클래스를 정의한다.
 * 배너에 대한 등록, 수정, 삭제, 조회, 반영확인 기능을 제공한다.
 * 배너의 조회기능은 목록조회, 상세조회로 구분된다.
 * @author ST-Ones Corp.
 * @since 2009.08.03
 * @version 1.0
 */
@Service("egovBannerService")
public class BannerService extends EgovAbstractServiceImpl {

	@Resource(name="bannerMapper")
	private BannerMapper bannerMapper;

	/**
	 * 배너를 관리하기 위해 등록된 배너목록을 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return List - 배너 목록 Map List
	 */
	public List<Map<String, Object>> selectBannerList(Map<String, Object> bannerVO) throws Exception {
		return bannerMapper.selectBannerList(bannerVO);
	}

	/**
	 * 배너목록 총 갯수를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return int - 배너 카운트 수
	 */
	public int selectBannerListTotCnt(Map<String, Object> bannerVO) throws Exception {
		return bannerMapper.selectBannerListTotCnt(bannerVO);
	}
	
	/**
	 * 등록된 배너의 상세정보를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object> - 배너 상세정보 Map
	 */
	public Map<String, Object> selectBanner(Map<String, Object> bannerVO) throws Exception {
		return bannerMapper.selectBanner(bannerVO);
	}

	/**
	 * 배너정보를 신규로 등록한다.
	 * @param banner - 배너 Map
	 * @return Map<String, Object> - 등록된 배너 상세정보 Map
	 */
	public Map<String, Object> insertBanner(Map<String, Object> banner) throws Exception {
		bannerMapper.insertBanner(banner);
		return selectBanner(banner);
	}

	/**
	 * 기 등록된 배너정보를 수정한다.
	 * @param banner - 배너 Map
	 */
	public void updateBanner(Map<String, Object> banner) throws Exception {
		bannerMapper.updateBanner(banner);
	}

	/**
	 * 기 등록된 배너정보를 삭제한다.
	 * @param banner - 배너 Map
	 */
	public void deleteBanner(Map<String, Object> banner) throws Exception {
		deleteBannerFile(banner);
		bannerMapper.deleteBanner(banner);
	}

	/**
	 * 기 등록된 배너정보의 이미지파일을 삭제한다.
	 * @param banner - 배너 Map
	 */
	public void deleteBannerFile(Map<String, Object> banner) throws Exception {
		Map<String, Object> fileVO = bannerMapper.selectBannerFile(banner);
		if (fileVO != null) {
			File file = new File((String) fileVO.get("fileStreCours") + (String) fileVO.get("streFileNm"));
			file.delete();
		}
	}

	/**
	 * 배너가 특정화면에 반영된 결과를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return List - 배너 결과 Map List
	 */
	public List<Map<String, Object>> selectBannerResult(Map<String, Object> bannerVO) throws Exception {
		return bannerMapper.selectBannerResult(bannerVO);
	}
}
