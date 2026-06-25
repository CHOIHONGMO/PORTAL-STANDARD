package com.portal.common.config;

import com.portal.common.handler.ComExcepHndlr;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.AfterThrowing;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.egovframe.rte.fdl.cmmn.aspect.ExceptionTransfer;
import org.egovframe.rte.fdl.cmmn.exception.handler.ExceptionHandler;
import org.egovframe.rte.fdl.cmmn.exception.manager.DefaultExceptionHandleManager;
import org.egovframe.rte.fdl.cmmn.exception.manager.ExceptionHandlerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.stereotype.Component;
import org.springframework.util.AntPathMatcher;

@Configuration
@EnableAspectJAutoProxy
public class AspectConfig {

    @Bean
    public ComExcepHndlr egovHandler() {
        return new ComExcepHndlr();
    }

    @Bean
    public ComExcepHndlr otherHandler() {
        return new ComExcepHndlr();
    }

    @Bean
    public DefaultExceptionHandleManager defaultExceptionHandleManager(
            @Qualifier("antPathMater") AntPathMatcher antPathMatcher,
            ComExcepHndlr egovHandler) {
        DefaultExceptionHandleManager manager = new DefaultExceptionHandleManager();
        manager.setReqExpMatcher(antPathMatcher);
        manager.setPatterns(new String[]{"**service.impl.*", "**service.*"});
        manager.setHandlers(new ExceptionHandler[]{egovHandler});
        return manager;
    }

    @Bean
    public DefaultExceptionHandleManager otherExceptionHandleManager(
            @Qualifier("antPathMater") AntPathMatcher antPathMatcher,
            ComExcepHndlr otherHandler) {
        DefaultExceptionHandleManager manager = new DefaultExceptionHandleManager();
        manager.setReqExpMatcher(antPathMatcher);
        manager.setPatterns(new String[]{"**service.impl.*", "**service.*"});
        manager.setHandlers(new ExceptionHandler[]{otherHandler});
        return manager;
    }

    @Bean
    public ExceptionTransfer exceptionTransfer(
            DefaultExceptionHandleManager defaultExceptionHandleManager,
            DefaultExceptionHandleManager otherExceptionHandleManager) {
        ExceptionTransfer exceptionTransfer = new ExceptionTransfer();
        exceptionTransfer.setExceptionHandlerService(new ExceptionHandlerService[]{
                defaultExceptionHandleManager,
                otherExceptionHandleManager
        });
        return exceptionTransfer;
    }

    @Aspect
    @Component
    public static class ExceptionTransferAspect {
        
        private final ExceptionTransfer exceptionTransfer;

        public ExceptionTransferAspect(ExceptionTransfer exceptionTransfer) {
            this.exceptionTransfer = exceptionTransfer;
        }

        @Pointcut("execution(* com.portal..impl.*Impl.*(..)) || execution(* com.portal..service..*Service.*(..))")
        public void serviceMethod() {}

        @AfterThrowing(pointcut = "serviceMethod()", throwing = "exception")
        public void afterThrowing(JoinPoint joinPoint, Exception exception) throws Exception {
            exceptionTransfer.transfer(joinPoint, exception);
        }
    }
}
