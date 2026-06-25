package com.portal.board.com;

import java.util.List;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.board.com.service.UserInfVO;

/**
 * 협업 활용 사용자 정보 조회를 위한 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("UserInfManageMapper")
public interface UserInfManageMapper {

    List<UserInfVO> selectUserList(UserInfVO userVO) throws Exception;

    int selectUserListCnt(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectCmmntyUserList(UserInfVO userVO) throws Exception;

    int selectCmmntyUserListCnt(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectCmmntyMngrList(UserInfVO userVO) throws Exception;

    int selectCmmntyMngrListCnt(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectClubUserList(UserInfVO userVO) throws Exception;

    int selectClubUserListCnt(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectClubOprtrList(UserInfVO userVO) throws Exception;

    int selectClubOprtrListCnt(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectAllClubUser(UserInfVO userVO) throws Exception;

    List<UserInfVO> selectAllCmmntyUser(UserInfVO userVO) throws Exception;
}
