package com.portal.user.banner;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
 * 배너에 대한 마이바티스 Mapper 인터페이스를 정의한다.
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("bannerMapper")
public interface BannerMapper {

	/**
	 * 배너를 관리하기 위해 등록된 배너목록을 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return List - 배너 목록 Map List
	 * @throws Exception
	 */
	List<Map<String, Object>> selectBannerList(Map<String, Object> bannerVO) throws Exception;

	/**
	 * 배너목록 총 갯수를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return int - 배너 카운트 수
	 * @throws Exception
	 */
	int selectBannerListTotCnt(Map<String, Object> bannerVO) throws Exception;

	/**
	 * 등록된 배너의 상세정보를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return Map<String, Object> - 배너 Map
	 * @throws Exception
	 */
	Map<String, Object> selectBanner(Map<String, Object> bannerVO) throws Exception;

	/**
	 * 배너정보를 신규로 등록한다.
	 * @param banner - 배너 Map
	 * @throws Exception
	 */
	void insertBanner(Map<String, Object> banner) throws Exception;

	/**
	 * 기 등록된 배너정보를 수정한다.
	 * @param banner - 배너 Map
	 * @throws Exception
	 */
	void updateBanner(Map<String, Object> banner) throws Exception;

	/**
	 * 기 등록된 배너정보를 삭제한다.
	 * @param banner - 배너 Map
	 * @throws Exception
	 */
	void deleteBanner(Map<String, Object> banner) throws Exception;

	/**
	 * 기 등록된 배너정보의 이미지파일을 삭제하기 위해 파일정보를 조회한다.
	 * @param banner - 배너 Map
	 * @return Map - 파일 정보 Map
	 * @throws Exception
	 */
	Map<String, Object> selectBannerFile(Map<String, Object> banner) throws Exception;

	/**
	 * 배너가 특정화면에 반영된 결과를 조회한다.
	 * @param bannerVO - 배너 Map
	 * @return List - 배너 목록 Map List
	 * @throws Exception
	 */
	List<Map<String, Object>> selectBannerResult(Map<String, Object> bannerVO) throws Exception;
}
