package com.portal.login;

import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;
import com.portal.common.model.LoginVO;

/**
 * 로그인을 처리하는 MyBatis Mapper 인터페이스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@EgovMapper("loginMapper")
public interface LoginMapper {

    /**
     * 일반 로그인을 처리한다.
     * @param vo LoginVO
     * @return LoginVO
     * @throws Exception
     */
    LoginVO actionLogin(LoginVO vo) throws Exception;

    /**
     * 아이디를 찾는다.
     * @param vo LoginVO
     * @return LoginVO
     * @throws Exception
     */
    LoginVO searchId(LoginVO vo) throws Exception;

    /**
     * 비밀번호를 찾는다.
     * @param vo LoginVO
     * @return LoginVO
     * @throws Exception
     */
    LoginVO searchPassword(LoginVO vo) throws Exception;

    /**
     * 변경된 비밀번호를 저장한다.
     * @param vo LoginVO
     * @throws Exception
     */
    void updatePassword(LoginVO vo) throws Exception;

}
