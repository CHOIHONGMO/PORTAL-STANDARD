package com.portal.user.policy.stp.service;

import java.util.List;

/**
 *
 * 약관내용을 처리하는 서비스 클래스
 * @author ST-Ones Corp.
 * @since 2009.04.01
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
public interface StplatManageService {

    /**
	 * 약관정보 글을 조회한다.
	 * @param vo
	 * @return 조회한 글
	 * @exception Exception
	 */
	StplatManageVO selectStplatDetail(StplatManageVO vo) throws Exception;

    /**
	 * 약관정보 글 목록을 조회한다.
	 * @param searchVO
	 * @return 글 목록
	 * @exception Exception
	 */
	List<?> selectStplatList(StplatManageDefaultVO searchVO) throws Exception;

    /**
	 * 약관정보 글 총 갯수를 조회한다.
	 * @param searchVO
	 * @return 글 총 갯수
	 */
    int selectStplatListTotCnt(StplatManageDefaultVO searchVO);

	/**
	 * 약관정보 글을 등록한다.
	 * @param vo
	 * @exception Exception
	 */
    void insertStplatCn(StplatManageVO vo) throws Exception;


	/**
	 * 약관정보 글을 수정한다.
	 * @param vo
	 * @exception Exception
	 */
    void updateStplatCn(StplatManageVO vo) throws Exception;

	/**
	 * 약관정보 글을 삭제한다.
	 * @param vo
	 * @exception Exception
	 */
    void deleteStplatCn(StplatManageVO vo) throws Exception;


}
