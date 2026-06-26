package com.portal.system.calendar.service;

import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import com.portal.system.calendar.service.impl.RestdeManageMapper;
import jakarta.annotation.Resource;

/**
 * 휴일에 관한 서비스 클래스를 정의한다
 * @author ST-Ones Corp.
 * @since 2009.04.01
 * @version 1.0
 */
@Service("RestdeManageService")
public class CalRestdeManageService extends EgovAbstractServiceImpl {

    @Resource(name="RestdeManageMapper")
    private RestdeManageMapper restdeManageMapper;

    private Restde convertToRestde(Map<String, Object> map) {
        Restde restde = new Restde();
        try {
            org.apache.commons.beanutils.BeanUtils.populate(restde, map);
        } catch (Exception e) {
            // 예외 처리
        }
        return restde;
    }

    private RestdeVO convertToRestdeVO(Map<String, Object> map) {
        RestdeVO restdeVO = new RestdeVO();
        try {
            org.apache.commons.beanutils.BeanUtils.populate(restdeVO, map);
        } catch (Exception e) {
            // 예외 처리
        }
        return restdeVO;
    }

    private Map<String, Object> convertRestdeToMap(Restde ret) {
        Map<String, Object> resultMap = new HashMap<>();
        if (ret == null) return resultMap;
        resultMap.put("restdeNo", ret.getRestdeNo());
        resultMap.put("restdeDe", ret.getRestdeDe());
        resultMap.put("restdeNm", ret.getRestdeNm());
        resultMap.put("restdeDc", ret.getRestdeDc());
        resultMap.put("restdeSe", ret.getRestdeSe());
        resultMap.put("restdeSeCode", ret.getRestdeSeCode());
        resultMap.put("frstRegisterId", ret.getFrstRegisterId());
        resultMap.put("lastUpdusrId", ret.getLastUpdusrId());
        resultMap.put("year", ret.getYear());
        resultMap.put("month", ret.getMonth());
        resultMap.put("day", ret.getDay());
        resultMap.put("restdeAt", ret.getRestdeAt());
        resultMap.put("cellNum", ret.getCellNum());
        resultMap.put("weeks", ret.getWeeks());
        resultMap.put("maxWeeks", ret.getMaxWeeks());
        resultMap.put("week", ret.getWeek());
        resultMap.put("startWeekMonth", ret.getStartWeekMonth());
        resultMap.put("lastDayMonth", ret.getLastDayMonth());
        return resultMap;
    }

	/**
	 * 일반달력 팝업 정보를 조회한다.
	 */
	public List<?> selectNormalRestdePopup(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectNormalRestdePopup(convertToRestde(map));
	}

	/**
	 * 행정달력 팝업 정보를 조회한다.
	 */
	public List<?> selectAdministRestdePopup(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectAdministRestdePopup(convertToRestde(map));
	}

	/**
	 * 일반달력 일간 정보를 조회한다.
	 */
	public List<?> selectNormalDayCal(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectNormalDayCal(convertToRestde(map));
	}

	/**
	 * 일반달력 일간 휴일을 조회한다.
	 */
	public List<?> selectNormalDayRestde(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectNormalDayRestde(convertToRestde(map));
	}

	/**
	 * 일반달력 월간 휴일을 조회한다.
	 */
	public List<?> selectNormalMonthRestde(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectNormalMonthRestde(convertToRestde(map));
	}

	/**
	 * 행정달력 일간 정보를 조회한다.
	 */
	public List<?> selectAdministDayCal(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectAdministDayCal(convertToRestde(map));
	}

	/**
	 * 행정달력 일간 휴일을 조회한다.
	 */
	public List<?> selectAdministDayRestde(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectAdministDayRestde(convertToRestde(map));
	}

	/**
	 * 행정달력 월간 휴일을 조회한다.
	 */
	public List<?> selectAdministMonthRestde(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectAdministMonthRestde(convertToRestde(map));
	}

	/**
	 * 휴일을 삭제한다.
	 */
	public void deleteRestde(Map<String, Object> map) throws Exception {
		restdeManageMapper.deleteRestde(convertToRestde(map));
	}

	/**
	 * 휴일을 등록한다.
	 */
	public void insertRestde(Map<String, Object> map) throws Exception {
		restdeManageMapper.insertRestde(convertToRestde(map));
	}

	/**
	 * 휴일 상세항목을 조회한다.
	 */
	public Map<String, Object> selectRestdeDetail(Map<String, Object> map) throws Exception {
		Restde ret = restdeManageMapper.selectRestdeDetail(convertToRestde(map));
		return convertRestdeToMap(ret);
	}

	/**
	 * 휴일 목록을 조회한다.
	 */
	public List<?> selectRestdeList(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectRestdeList(convertToRestdeVO(map));
	}

	/**
	 * 휴일 총 갯수를 조회한다.
	 */
	public int selectRestdeListTotCnt(Map<String, Object> map) throws Exception {
		return restdeManageMapper.selectRestdeListTotCnt(convertToRestdeVO(map));
	}

	/**
	 * 휴일을 수정한다.
	 */
	public void updateRestde(Map<String, Object> map) throws Exception {
		restdeManageMapper.updateRestde(convertToRestde(map));
	}

}
