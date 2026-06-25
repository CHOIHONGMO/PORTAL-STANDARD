package com.portal.login.web;

import org.egovframe.rte.fdl.cmmn.trace.LeaveaTrace;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.Map;
import java.util.HashMap;

import com.portal.common.message.PortalMessageSource;
import com.portal.common.model.LoginVO;
import com.portal.login.service.LoginService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 일반 로그인을 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.24
 * @version 1.0
 */
@RestController
public class LoginController {

	/** LoginService */
	@Resource(name = "loginService")
    private LoginService loginService;

	/** PortalMessageSource */
    @Resource(name="egovMessageSource")
    PortalMessageSource egovMessageSource;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /** TRACE */
    @Resource(name="leaveaTrace")
    LeaveaTrace leaveaTrace;

    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository;

    public LoginController(AuthenticationManager authenticationManager, SecurityContextRepository securityContextRepository) {
    	this.authenticationManager = authenticationManager;
    	this.securityContextRepository = securityContextRepository;
    }

	/**
	 * 일반(스프링 시큐리티) 로그인을 처리한다
	 * @param loginVO - 아이디, 비밀번호가 담긴 LoginVO
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @param response - 응답처리를 위한 HttpServletResponse
	 * @return result - 로그인결과(세션정보)
	 * @throws Exception
	 */
    @RequestMapping(value="/uat/uia/actionSecurityLogin.do")
    public Map<String, Object> actionSecurityLogin(@ModelAttribute("loginVO") LoginVO loginVO, HttpServletRequest request, HttpServletResponse response) throws Exception {
    	// 일반 로그인 처리
        LoginVO resultVO = loginService.actionLogin(loginVO);
        Map<String, Object> resultMap = new HashMap<>();

		if (resultVO != null && resultVO.getId() != null && !resultVO.getId().equals("")) {
        	actionSecurityProcess(resultVO, request, response);
            resultMap.put("success", true);
            resultMap.put("resultVO", resultVO);
        } else {
            resultMap.put("success", false);
            resultMap.put("message", egovMessageSource.getMessage("fail.common.login"));
        }
        return resultMap;
    }

    @RequestMapping(value="/uat/uia/actionSecurityProcess.do")
    public void actionSecurityProcess(LoginVO resultVO, HttpServletRequest request, HttpServletResponse response) {
    	// 1. 로그인 정보를 세션에 저장
    	request.getSession().setAttribute("LoginVO", resultVO);

        // 2. 인증 토큰 구성
        UsernamePasswordAuthenticationToken token = UsernamePasswordAuthenticationToken.unauthenticated(resultVO.getUserSe().concat(resultVO.getId()), resultVO.getUniqId());

        // 3. 인증 수행
        Authentication authResult = authenticationManager.authenticate(token);

        // 4. SecurityContext 저장
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        context.setAuthentication(authResult);
        SecurityContextHolder.setContext(context);
        securityContextRepository.saveContext(context, request, response);
    }

    /**
	 * 로그아웃한다.
	 * @param request - 세션처리를 위한 HttpServletRequest
	 * @throws Exception
	 */
    @RequestMapping(value="/uat/uia/actionLogout.do")
	public void actionLogout(HttpServletRequest request) throws Exception {
    	request.getSession().setAttribute("LoginVO", null);
    	SecurityContextHolder.clearContext();
    }

}
