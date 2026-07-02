package com.portal.common.config;

import org.egovframe.rte.fdl.security.config.EgovSecurityConfig;
import org.egovframe.rte.fdl.security.secureobject.impl.SecuredObjectDAO;
import org.egovframe.rte.fdl.security.secureobject.impl.SecuredObjectServiceImpl;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;
import org.springframework.security.web.util.matcher.RegexRequestMatcher;
import org.springframework.stereotype.Service;
import jakarta.annotation.Resource;
import jakarta.annotation.PostConstruct;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * eGovFrame 5.0 Security ClassCastException 방지를 위해 SecuredObjectServiceImpl을 직접 상속받는 커스텀 빈
 * CGLIB 프록시 타입 일치 및 requestMatcherType = ant 일 때 AntPathRequestMatcher로 변환해 주는 역할을 수행합니다.
 */
public class CustomSecuredObjectService extends SecuredObjectServiceImpl {

    @Resource(name = "securedObjectDAO")
    private SecuredObjectDAO customSecuredObjectDAO;

    @Resource
    private EgovSecurityConfig egovSecurityConfig;

    public CustomSecuredObjectService(EgovSecurityConfig egovSecurityConfig) {
        super(egovSecurityConfig);
    }

    @PostConstruct
    public void init() {
        setSecuredObjectDAO(customSecuredObjectDAO);
    }

    @Override
    public LinkedHashMap<RequestMatcher, List<ConfigAttribute>> getRolesAndUrl() {
        String requestMatcherType = egovSecurityConfig.getRequestMatcherType();
        LinkedHashMap<Object, List<ConfigAttribute>> rawMap = customSecuredObjectDAO.getRolesAndUrl(requestMatcherType);
        
        LinkedHashMap<RequestMatcher, List<ConfigAttribute>> resolvedMap = new LinkedHashMap<>();
        for (Map.Entry<Object, List<ConfigAttribute>> entry : rawMap.entrySet()) {
            Object key = entry.getKey();
            RequestMatcher matcher;
            if (key instanceof RequestMatcher) {
                matcher = (RequestMatcher) key;
            } else if (key instanceof String) {
                String pattern = (String) key;
                if ("regex".equalsIgnoreCase(requestMatcherType) || "ciRegex".equalsIgnoreCase(requestMatcherType)) {
                    matcher = new RegexRequestMatcher(pattern, null);
                } else {
                    matcher = new AntPathRequestMatcher(pattern);
                }
            } else {
                throw new IllegalArgumentException("Unsupported key type in resource map: " + key.getClass());
            }
            resolvedMap.put(matcher, entry.getValue());
        }
        return resolvedMap;
    }
}
