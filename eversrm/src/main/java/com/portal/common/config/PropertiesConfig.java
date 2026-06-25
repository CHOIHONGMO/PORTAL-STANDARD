package com.portal.common.config;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.fdl.property.impl.EgovPropertyServiceImpl;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class PropertiesConfig {

    @Value("${Globals.fileUpload.maxRequestSize}")
    private String maxRequestSize;

    @Value("${Globals.fileStorePath}")
    private String fileStorePath;

    @Bean(name = "propertiesService", destroyMethod = "destroy")
    public EgovPropertyService propertiesService() {
        EgovPropertyServiceImpl service = new EgovPropertyServiceImpl();
        Map<String, String> map = new HashMap<>();
        map.put("pageUnit", "10");
        map.put("pageSize", "10");
        map.put("posblAtchFileSize", maxRequestSize);
        map.put("Globals.fileStorePath", fileStorePath);
        map.put("Globals.addedOptions", "false");
        service.setProperties(map);
        return service;
    }
}
