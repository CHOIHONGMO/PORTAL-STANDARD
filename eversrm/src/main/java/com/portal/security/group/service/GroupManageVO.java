package com.portal.security.group.service;

import java.util.List;



/**
 * 그룹관리에 대한 Vo 클래스를 정의한다.
 * @author ST-Ones Corp.
 * @since 2009.06.01
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

public class GroupManageVO extends GroupManage {

	/**
	 * serialVersionUID
	 */
	private static final long serialVersionUID = 1L;
	/**
	 * 그룹 목록
	 */	
	List <GroupManageVO> groupManageList;
	/**
	 * 삭제대상 목록
	 */		
    String[] delYn;

	/**
	 * groupManageList attribute 를 리턴한다.
	 * @return List<GroupManageVO>
	 */
	public List<GroupManageVO> getGroupManageList() {
		return groupManageList;
	}

	/**
	 * groupManageList attribute 값을 설정한다.
	 * @param groupManageList List<GroupManageVO> 
	 */
	public void setGroupManageList(List<GroupManageVO> groupManageList) {
		this.groupManageList = groupManageList;
	}

	/**
	 * delYn attribute 를 리턴한다.
	 * @return String[]
	 */
	public String[] getDelYn() {
		return delYn;
	}

	/**
	 * delYn attribute 값을 설정한다.
	 * @param delYn String[] 
	 */
	public void setDelYn(String[] delYn) {
		this.delYn = delYn;
	}

}