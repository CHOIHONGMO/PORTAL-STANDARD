package com.portal.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Arrays;
import java.util.List;

@Configuration
public class WhitelistConfig {

    @Bean(name = "egovPageLinkWhitelist")
    public List<String> egovPageLinkWhitelist() {
        return Arrays.asList(
                "main/sample_menu/EgovServiceIssuance",
                "main/sample_menu/EgovServiceManage",
                "main/sample_menu/EgovServiceResult",
                "main/sample_menu/EgovAboutSite",
                "main/sample_menu/EgovHistory",
                "main/sample_menu/EgovOrganization",
                "main/sample_menu/EgovLocation",
                "main/sample_menu/Intro",
                "main/inc/EgovIncHeaderOld",
                "main/inc/EgovIncFooterOld",
                "main/inc/EgovIncTborder"
        );
    }
}
