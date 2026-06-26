package com.portal;

import com.portal.common.filter.HTMLTagFilter;
import com.portal.common.web.BindingInitializer;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.ImportResource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.support.WebBindingInitializer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.Arrays;

@SpringBootApplication(exclude = {
        DataSourceAutoConfiguration.class,
        DataSourceTransactionManagerAutoConfiguration.class
})
@ImportResource({
        "classpath:spring/context-idgen.xml"
})
@ComponentScan(basePackages = {
        "com.portal",
        "com.builder",
        "org.egovframe.rte.fdl.security",
        "org.egovframe.rte.fdl.crypto"
})
public class PortalApplication implements WebMvcConfigurer {

    public static void main(String[] args) {
        SpringApplication.run(PortalApplication.class, args);
    }

    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    /**
     * XSS 방지를 위한 HTMLTagFilter 등록
     */
    @Bean
    public FilterRegistrationBean<HTMLTagFilter> htmlTagFilter() {
        FilterRegistrationBean<HTMLTagFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new HTMLTagFilter());
        registrationBean.setUrlPatterns(Arrays.asList("*.do", "*.api"));
        registrationBean.setName("HTMLTagFilter");
        registrationBean.setOrder(1);
        return registrationBean;
    }

    /**
     * 기존 com-servlet.xml에 정의되어 있던 WebBindingInitializer 빈 등록
     */
    @Bean
    public WebBindingInitializer webBindingInitializer() {
        return new BindingInitializer();
    }

    /**
     * React 프론트엔드 연동을 위한 글로벌 CORS 설정
     */
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowCredentials(true);
    }
}
