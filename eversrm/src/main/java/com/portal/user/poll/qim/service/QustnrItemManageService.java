package com.portal.user.poll.qim.service;

import java.util.List;

import com.portal.common.model.ComDefaultVO;
/**
 * 설문항목관리를 처리하는 Service Class 구현
 * @author ST-Ones Corp.
 * @since 2009.03.20
 * @version 1.0
 * @see
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자           수정내용
 *  -------    --------    ---------------------------
 *
 * </pre>
 */
public interface QustnrItemManageService {

    /**
	 * 설문템플릿(을)를  목록을 조회한다.
	 * @param qustnrItemManageVO - 설문항목 정보 담김 VO
	 * @return List
	 * @throws Exception
	 */
	public List<?> selectQustnrTmplatManageList(QustnrItemManageVO qustnrItemManageVO) throws Exception;

    /**
	 * 설문항목 목록을 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return List
	 * @throws Exception
	 */
	public List<?> selectQustnrItemManageList(ComDefaultVO searchVO) throws Exception;

    /**
	 * 설문항목를(을) 상세조회 한다.
	 * @param qustnrItemManageVO - 설문항목 정보 담김 VO
	 * @return List
	 * @throws Exception
	 */
	public List<?> selectQustnrItemManageDetail(QustnrItemManageVO qustnrItemManageVO) throws Exception;

    /**
	 * 설문항목를(을) 목록 전체 건수를(을) 조회한다.
	 * @param searchVO - 조회할 정보가 담긴 VO
	 * @return int
	 * @throws Exception
	 */
	public int selectQustnrItemManageListCnt(ComDefaultVO searchVO) throws Exception;

    /**
	 * 설문항목를(을) 등록한다.
	 * @param qustnrItemManageVO - 설문항목 정보 담김 VO
	 * @throws Exception
	 */
	void  insertQustnrItemManage(QustnrItemManageVO qustnrItemManageVO) throws Exception;

    /**
	 * 설문항목를(을) 수정한다.
	 * @param qustnrItemManageVO - 설문항목 정보 담김 VO
	 * @throws Exception
	 */
	void  updateQustnrItemManage(QustnrItemManageVO qustnrItemManageVO) throws Exception;

    /**
	 * 설문항목를(을) 삭제한다.
	 * @param qustnrItemManageVO - 설문항목 정보 담김 VO
	 * @throws Exception
	 */
	void  deleteQustnrItemManage(QustnrItemManageVO qustnrItemManageVO) throws Exception;


}
