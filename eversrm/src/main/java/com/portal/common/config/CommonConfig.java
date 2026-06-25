package com.portal.common.config;

import com.portal.common.handler.ComTraceHandler;
import com.portal.common.pagination.ImagePaginationRenderer;
import com.portal.common.message.PortalMessageSource;
import com.portal.common.pagination.RenewPaginationRenderer;
import com.portal.common.web.MultipartResolver;
import org.egovframe.rte.fdl.cmmn.trace.LeaveaTrace;
import org.egovframe.rte.fdl.cmmn.trace.handler.TraceHandler;
import org.egovframe.rte.fdl.cmmn.trace.manager.DefaultTraceHandleManager;
import org.egovframe.rte.fdl.cmmn.trace.manager.TraceHandlerService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.DefaultPaginationManager;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationRenderer;
import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.util.AntPathMatcher;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class CommonConfig {

    @Bean(name = "egovMessageSource")
    public PortalMessageSource egovMessageSource(MessageSource messageSource) {
        PortalMessageSource portalMessageSource = new PortalMessageSource();
        if (messageSource instanceof ReloadableResourceBundleMessageSource) {
            portalMessageSource.setReloadableResourceBundleMessageSource((ReloadableResourceBundleMessageSource) messageSource);
        }
        return portalMessageSource;
    }

    @Bean(name = "messageSource")
    public ReloadableResourceBundleMessageSource messageSource() {
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.setBasenames(
                "classpath:/message/message-common",
                "classpath:/message/message-validation",
                "classpath:/org/egovframe/rte/fdl/idgnr/messages/idgnr",
                "classpath:/org/egovframe/rte/fdl/property/messages/properties"
        );
        messageSource.setCacheSeconds(60);
        return messageSource;
    }

    @Bean(name = "leaveaTrace")
    public LeaveaTrace leaveaTrace(TraceHandlerService traceHandlerService) {
        LeaveaTrace leaveaTrace = new LeaveaTrace();
        leaveaTrace.setTraceHandlerServices(new TraceHandlerService[]{traceHandlerService});
        return leaveaTrace;
    }

    @Bean(name = "traceHandlerService")
    public DefaultTraceHandleManager traceHandlerService(
            AntPathMatcher antPathMatcher,
            TraceHandler defaultTraceHandler) {
        DefaultTraceHandleManager manager = new DefaultTraceHandleManager();
        manager.setReqExpMatcher(antPathMatcher);
        manager.setPatterns(new String[]{"*"});
        manager.setHandlers(new TraceHandler[]{defaultTraceHandler});
        return manager;
    }

    @Bean(name = "antPathMater")
    public AntPathMatcher antPathMatcher() {
        return new AntPathMatcher();
    }

    @Bean(name = "defaultTraceHandler")
    public ComTraceHandler defaultTraceHandler() {
        return new ComTraceHandler();
    }

    @Bean(name = "imageRenderer")
    public ImagePaginationRenderer imageRenderer() {
        return new ImagePaginationRenderer();
    }

    @Bean(name = "renewRenderer")
    public RenewPaginationRenderer renewRenderer() {
        return new RenewPaginationRenderer();
    }

    @Bean(name = "paginationManager")
    public DefaultPaginationManager paginationManager(
            ImagePaginationRenderer imageRenderer,
            RenewPaginationRenderer renewRenderer) {
        DefaultPaginationManager manager = new DefaultPaginationManager();
        Map<String, PaginationRenderer> rendererType = new HashMap<>();
        rendererType.put("image", imageRenderer);
        rendererType.put("renew", renewRenderer);
        manager.setRendererType(rendererType);
        return manager;
    }

    @Bean(name = {"local.MultiCommonsMultipartResolver", "multipartResolver"})
    public MultipartResolver multipartResolver() {
        return new MultipartResolver();
    }
}
