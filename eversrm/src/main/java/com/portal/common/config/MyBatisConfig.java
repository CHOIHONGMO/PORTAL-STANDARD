package com.portal.common.config;

import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.jdbc.support.lob.DefaultLobHandler;
import org.springframework.jdbc.support.lob.LobHandler;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

import javax.sql.DataSource;

@Configuration
@MapperScan(
        basePackages = "com.portal",
        annotationClass = EgovMapper.class,
        sqlSessionTemplateRef = "egov.sqlSessionTemplate"
)
public class MyBatisConfig {

    @Bean(name = "egov.lobHandler")
    @Lazy
    public LobHandler lobHandler() {
        return new DefaultLobHandler();
    }

    @Bean(name = {"sqlSession", "egov.sqlSession"})
    public SqlSessionFactory sqlSessionFactory(
            @Qualifier("egov.dataSource") DataSource dataSource,
            ApplicationContext applicationContext) throws Exception {
        SqlSessionFactoryBean factoryBean = new SqlSessionFactoryBean();
        factoryBean.setDataSource(dataSource);
        factoryBean.setConfigLocation(applicationContext.getResource("classpath:/mapper/config/mapper-config.xml"));
        factoryBean.setMapperLocations(applicationContext.getResources("classpath:/mapper/com/portal/**/*.xml"));
        return factoryBean.getObject();
    }

    @Bean(name = "egov.sqlSessionTemplate")
    public SqlSessionTemplate sqlSessionTemplate(
            @Qualifier("egov.sqlSession") SqlSessionFactory sqlSessionFactory) {
        return new SqlSessionTemplate(sqlSessionFactory);
    }
}
