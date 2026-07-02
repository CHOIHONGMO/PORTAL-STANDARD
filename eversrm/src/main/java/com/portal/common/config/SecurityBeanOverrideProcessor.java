package com.portal.common.config;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanDefinition;
import org.springframework.beans.factory.config.BeanFactoryPostProcessor;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.stereotype.Component;

/**
 * eGovFrame 5.0 Security 기동 에러 방지를 위한 BeanFactoryPostProcessor
 * EgovSecurityConfiguration에 의해 정의된 securedObjectService BeanDefinition을
 * 커스텀 클래스인 CustomSecuredObjectService로 동적 교체합니다.
 */
@Component
public class SecurityBeanOverrideProcessor implements BeanFactoryPostProcessor {

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) throws BeansException {
        if (beanFactory.containsBeanDefinition("securedObjectService")) {
            BeanDefinition bd = beanFactory.getBeanDefinition("securedObjectService");
            // Bean 클래스를 커스텀 구현체로 교체
            bd.setBeanClassName(CustomSecuredObjectService.class.getName());
            // 팩토리 메서드 방식을 해제하여 생성자 기반으로 인스턴스화되도록 처리
            bd.setFactoryBeanName(null);
            bd.setFactoryMethodName(null);
        }
    }
}
