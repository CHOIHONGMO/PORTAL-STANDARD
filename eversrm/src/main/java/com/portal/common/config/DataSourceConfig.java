package com.portal.common.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class DataSourceConfig {

    @Value("${Globals.DriverClassName}")
    private String driverClassName;

    @Value("${Globals.Url}")
    private String url;

    @Value("${Globals.UserName}")
    private String username;

    @Value("${Globals.Password}")
    private String password;

    @Bean(name = {"egov.dataSource", "dataSource"}, destroyMethod = "close")
    public DataSource dataSource() {
        BasicDataSource dataSource = new BasicDataSource();
        dataSource.setDriverClassName(driverClassName);
        dataSource.setUrl(url);
        dataSource.setUsername(username);
        dataSource.setPassword(password);
        return dataSource;
    }
}
