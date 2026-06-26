# eversrm JPA 변환 가이드라인

본 문서는 **eversrm** 백엔드 API 프로젝트의 영속성 프레임워크를 기존 MyBatis에서 **JPA (Spring Data JPA)**로 점진적 변환(마이그레이션)하기 위한 설계 원칙과 기술적 가이드를 제공합니다.

---

## 1. 개요 및 마이그레이션 전략

- **점진적 마이그레이션**: 서비스 중단 및 리스크 최소화를 위해 빅뱅 방식이 아닌 **도메인 단위(예: user, board, system 등)로 점진적 변환**을 진행합니다.
- **MyBatis와 JPA의 병행**: 변환 과도기 동안 MyBatis와 JPA는 동일한 데이터베이스 및 동일한 트랜잭션 컨텍스트를 공유하여 데이터 일관성을 유지해야 합니다.
- **아키텍처 변화**: 기존 `Controller - Service - Mapper (XML)` 구조에서 **`Controller - Service - Repository (Entity)`** 구조로 패러다임이 전환됩니다.

---

## 2. 환경 설정 및 트랜잭션 통합

### 2.1. Maven 의존성 추가 (pom.xml)
`pom.xml`에 Spring Boot Starter Data JPA 의존성을 추가합니다.

```xml
<!-- Spring Boot Starter Data JPA -->
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
```

### 2.2. application.properties 설정 추가
`src/main/resources/application.properties` 파일에 JPA 및 Hibernate 설정을 추가합니다.

```properties
# =======================================================================
# JPA / Hibernate Configurations
# =======================================================================
# 운영 환경에서는 ddl-auto를 반드시 'none' 또는 'validate'로 설정합니다.
spring.jpa.hibernate.ddl-auto=none
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.use_sql_comments=true
# 데이터베이스 방언 설정 (MySQL 8 이상 기준)
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
# 지연 로딩 시점 트랜잭션 밖 세션 유지 여부 (기본값 false 권장)
spring.jpa.open-in-view=false
```

### 2.3. 트랜잭션 매니저 및 엔티티 매니저 수동 설정
eversrm 프로젝트는 `PortalApplication.java`에서 `DataSourceAutoConfiguration`과 `DataSourceTransactionManagerAutoConfiguration`을 **exclude**한 상태에서 `DataSourceConfig`와 `TransactionConfig`를 자바 빈으로 수동 등록하여 쓰고 있습니다.

따라서 JPA 자동 설정에만 의존할 수 없으며, **`TransactionConfig.java`를 수정하여 `JpaTransactionManager`로 교체하고 `EntityManagerFactory`를 수동 빈으로 등록**해야 합니다.

#### [수정] [TransactionConfig.java](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/java/com/portal/common/config/TransactionConfig.java)
기존의 `DataSourceTransactionManager` 빈 설정을 아래와 같이 `LocalContainerEntityManagerFactoryBean` 및 `JpaTransactionManager`로 교체합니다.

```java
package com.portal.common.config;

import org.springframework.aop.Advisor;
import org.springframework.aop.aspectj.AspectJExpressionPointcut;
import org.springframework.aop.support.DefaultPointcutAdvisor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.interceptor.RollbackRuleAttribute;
import org.springframework.transaction.interceptor.RuleBasedTransactionAttribute;
import org.springframework.transaction.interceptor.TransactionInterceptor;
import org.springframework.transaction.interceptor.NameMatchTransactionAttributeSource;

import jakarta.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Collections;
import java.util.Properties;

@Configuration
@EnableTransactionManagement // 선언적 @Transactional 활성화
public class TransactionConfig {

    /**
     * JPA EntityManagerFactory 설정
     */
    @Bean(name = "entityManagerFactory")
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(
            @Qualifier("egov.dataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        // 엔티티 패키지 스캔 경로 설정
        em.setPackagesToScan("com.portal");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        em.setJpaVendorAdapter(vendorAdapter);

        Properties properties = new Properties();
        properties.setProperty("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        properties.setProperty("hibernate.show_sql", "true");
        properties.setProperty("hibernate.format_sql", "true");
        properties.setProperty("hibernate.use_sql_comments", "true");
        em.setJpaProperties(properties);

        return em;
    }

    /**
     * JpaTransactionManager로 통합 트랜잭션 관리
     * (MyBatis와 Connection 및 트랜잭션 컨텍스트를 동기화하여 처리함)
     */
    @Bean(name = "txManager")
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        JpaTransactionManager txManager = new JpaTransactionManager();
        txManager.setEntityManagerFactory(entityManagerFactory);
        return txManager;
    }

    @Bean(name = "txAdvice")
    public TransactionInterceptor txAdvice(@Qualifier("txManager") PlatformTransactionManager transactionManager) {
        NameMatchTransactionAttributeSource source = new NameMatchTransactionAttributeSource();
        
        RuleBasedTransactionAttribute requiredTx = new RuleBasedTransactionAttribute();
        requiredTx.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRED);
        requiredTx.setRollbackRules(Collections.singletonList(new RollbackRuleAttribute(Exception.class)));

        source.addTransactionalMethod("*", requiredTx);
        return new TransactionInterceptor(transactionManager, source);
    }

    @Bean
    public Advisor txAdviceAdvisor(@Qualifier("txAdvice") TransactionInterceptor txAdvice) {
        AspectJExpressionPointcut pointcut = new AspectJExpressionPointcut();
        // 서비스 클래스에 트랜잭션 AOP 일괄 적용
        pointcut.setExpression("execution(* com.portal..service..*Service.*(..))");
        return new DefaultPointcutAdvisor(pointcut, txAdvice);
    }
}
```

---

## 3. 엔티티(Entity) 설계 규칙

기존의 단순 값 전달 객체인 VO/DTO 대신, 데이터베이스 테이블과 매핑되는 고유의 비즈니스 로직을 가진 **도메인 엔티티(Entity)**를 설계합니다.

### 3.1. 기본 패키지 위치
- `com.portal.[도메인명].domain` 또는 `com.portal.[도메인명].entity` 하위에 배치합니다.

### 3.2. Lombok 및 엔티티 어노테이션 규칙
- **`@Getter`**: 필수로 클래스 상단에 추가합니다.
- **`@Setter` 금지**: 데이터의 무결성을 깨뜨릴 수 있으므로 `@Setter`는 사용하지 않습니다. 데이터 변경 시에는 엔티티 내에 의미 있는 비즈니스 메서드(예: `updatePassword()`, `changeEmail()`)를 작성하여 객체의 변경 시점을 명확히 제어합니다.
- **기본 생성자 제한**: JPA 프록시 기술 구현 및 무분별한 객체 생성을 막기 위해 `@NoArgsConstructor(access = AccessLevel.PROTECTED)`를 필수로 지정합니다.
- **`@ToString` 주의**: 연관 관계 필드가 포함될 경우 순환 참조로 인한 StackOverflowError가 발생하므로, `@ToString(exclude = {"연관필드명"})`를 사용하거나 직접 작성합니다.

### 3.3. ID 매핑 (Primary Key)
- 데이터베이스의 Auto Increment 설정을 따를 경우 `@GeneratedValue(strategy = GenerationType.IDENTITY)`를 사용합니다.
- 기존 전자정부 표준 ID Generation Service(`EgovIdGnrService`)를 유지해야 하는 비즈니스 키의 경우, 엔티티 저장 전(`save()` 호출 전)에 서비스 레이어에서 생성된 ID를 할당해 준 뒤 영속화합니다.

```java
package com.portal.user.member.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "LETTNMBER") // 기존 회원 테이블 매핑
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @Column(name = "MBER_ID", length = 20)
    private String mberId; // 자연키 또는 eGov ID Generator를 활용한 키

    @Column(name = "UNIQ_ID", unique = true, nullable = false, length = 20)
    private String uniqId;

    @Column(name = "MBER_NM", nullable = false, length = 50)
    private String mberNm;

    @Column(name = "PASSWORD", nullable = false, length = 200)
    private String password;

    @Column(name = "MBER_EMAIL_ADRES", length = 50)
    private String email;

    @Column(name = "SBSCRB_DE")
    private LocalDateTime sbscrbDe;

    @Builder
    public Member(String mberId, String uniqId, String mberNm, String password, String email, LocalDateTime sbscrbDe) {
        this.mberId = mberId;
        this.uniqId = uniqId;
        this.mberNm = mberNm;
        this.password = password;
        this.email = email;
        this.sbscrbDe = sbscrbDe;
    }

    /**
     * 비밀번호 수정 (비즈니스 메서드 예시)
     */
    public void changePassword(String encryptedPassword) {
        this.password = encryptedPassword;
    }
    
    /**
     * 회원 정보 수정 (비즈니스 메서드 예시)
     */
    public void updateInfo(String mberNm, String email) {
        this.mberNm = mberNm;
        this.email = email;
    }
}
```

---

## 4. 리포지토리(Repository) 설계 및 Querydsl 도입

### 4.1. JpaRepository 기본 구현
`JpaRepository<Entity, ID>` 인터페이스를 상속하여 기본적인 CRUD 및 간단한 쿼리 메서드를 구현합니다.
- 패키지: `com.portal.[도메인명].repository`

```java
package com.portal.user.member.repository;

import com.portal.user.member.domain.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, String> {
    Optional<Member> findByUniqId(String uniqId);
    boolean existsByMberId(String mberId);
}
```

### 4.2. 동적 쿼리 처리를 위한 Querydsl 도입 권장
MyBatis에서 널리 쓰이던 `<if>`, `<choose>`, `<where>` 등 조건절 동적 쿼리를 타입 안정성을 유지하며 JPA로 대체하기 위해 **Querydsl** 도입이 필수적입니다.

#### Querydsl 연동 클래스 구조 (직접 조회용 Query 리포지토리 패턴)
프로젝트 내에서 서비스 인터페이스 및 `Impl` 구현체 분리를 배제하고 있으므로, Querydsl 역시 복잡한 Custom 인터페이스 + `Impl` 구현 패턴 대신 **직접 조회 전용 Query Repository 클래스**를 별도로 생성하는 방식을 권장합니다.

1. **Query Repository 클래스 작성**: `MemberQueryRepository` (인터페이스 없이 `@Repository` 빈으로 직접 등록하며 `JPAQueryFactory` 주입)
2. **서비스 레이어에서 주입**: `MberManageService`에서 필요 시 `MemberRepository`(기본 CRUD)와 `MemberQueryRepository`(복잡한 동적 쿼리)를 각각 주입받아 사용.

#### Querydsl 구현 예시
```java
package com.portal.user.member.repository;

import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.portal.user.member.domain.Member;
import com.portal.user.member.domain.QMember; // Q-Class 자동 생성
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Map;

@Repository
@RequiredArgsConstructor
public class MemberQueryRepository {

    private final JPAQueryFactory queryFactory;

    /**
     * 회원 동적 쿼리 조회
     */
    public List<Member> searchMembers(Map<String, Object> searchCond) {
        QMember member = QMember.member;

        return queryFactory
                .selectFrom(member)
                .where(
                        containsName((String) searchCond.get("searchNm")),
                        eqEmail((String) searchCond.get("searchEmail"))
                )
                .fetch();
    }

    private BooleanExpression containsName(String name) {
        return name != null ? QMember.member.mberNm.contains(name) : null;
    }

    private BooleanExpression eqEmail(String email) {
        return email != null ? QMember.member.email.eq(email) : null;
    }
}
```

---

## 5. MyBatis와 JPA 병행 사용 시의 핵심 주의사항

점진적 전환 중 동일 서비스나 단일 트랜잭션 안에서 MyBatis Mapper와 JPA Repository를 섞어 쓸 때 발생하기 쉬운 문제들을 사전에 대비해야 합니다.

### 5.1. 영속성 컨텍스트 쓰기 지연과 MyBatis 조회 불일치 (가장 중요)
- **증상**: 동일 트랜잭션(`@Transactional`) 안에서 JPA로 엔티티 데이터를 생성/수정(예: `save()`)한 후 곧바로 MyBatis Mapper를 통해 이를 다시 조회할 때, 변경 내용이 조회되지 않는 현상이 발생합니다.
- **원인**: JPA는 트랜잭션이 종료(커밋)되거나 DB로 쓰기 작업이 flush 되기 전까지 SQL 실행을 미루고 영속성 컨텍스트(1차 캐시)에 보관합니다. 그러나 MyBatis는 영속성 컨텍스트를 거치지 않고 DB에 다이렉트로 쿼리를 전송하므로, 아직 변경사항이 반영되지 않은 테이블 데이터를 조회하게 됩니다.
- **해결책**: JPA로 데이터 수정 후 MyBatis 조회가 필요할 경우, 조회 직전에 **`repository.saveAndFlush(entity)`** 혹은 **`entityManager.flush()`**를 명시적으로 호출해 변경 사안을 DB로 강제 싱크해야 합니다.

```java
@Transactional
public void modifyMemberAndLog(Map<String, Object> mberVO) {
    // 1. JPA로 데이터 수정
    Member member = memberRepository.findById(id).orElseThrow();
    member.updateInfo(newName, newEmail);
    
    // [중요] MyBatis 쿼리 실행 전에 반드시 영속성 컨텍스트의 변경사항을 DB에 flush 해줍니다.
    memberRepository.saveAndFlush(member); 

    // 2. MyBatis를 통해 로그 기록 또는 조인 쿼리 수행
    myBatisMapper.insertChangeHistoryLog(mberVO); 
}
```

### 5.2. 트랜잭션 격리수준 및 읽기 일관성
- 복잡한 로직 내에서는 JPA가 영속화한 객체와 MyBatis가 호출한 로우 데이터가 논리적으로 동기화되는 순서에 맞춰 코드 라인을 배치하고 설계해야 예기치 못한 동시성 데이터 왜곡을 방지할 수 있습니다.

---

## 6. 서비스(Service) 레이어 전환 예시

기존의 `Map<String, Object>` 파라미터 구조를 도메인 엔티티를 반환/활용하는 구조로 리팩토링합니다.

### [기존] MyBatis 기반 서비스
```java
@Service("mberManageService")
public class MberManageService extends EgovAbstractServiceImpl {

    @Resource(name="mberManageMapper")
    private MberManageMapper mberManageMapper;

    public Map<String, Object> selectMber(String uniqId) {
        return mberManageMapper.selectMber(uniqId);
    }

    public int insertMber(Map<String, Object> mberManageVO) throws Exception {
        return mberManageMapper.insertMber(mberManageVO);
    }
}
```

### [변경 후] JPA 기반 서비스
```java
@Service("mberManageService")
@RequiredArgsConstructor
@Transactional(readOnly = true) // 성능 최적화
public class MberManageService extends EgovAbstractServiceImpl {

    private final MemberRepository memberRepository;
    private final EgovIdGnrService idgenService;

    public MemberResponseDTO selectMber(String uniqId) {
        Member member = memberRepository.findByUniqId(uniqId)
                .orElseThrow(() -> new EntityNotFoundException("사용자를 찾을 수 없습니다."));
        return MemberResponseDTO.from(member); // DTO로 변환 반환
    }

    @Transactional // 쓰기 작업인 경우 쓰기 트랜잭션 명시 선언
    public String insertMber(MemberCreateRequestDTO dto) throws Exception {
        // 1. eGov ID Generator를 이용한 고유 ID 채번
        String mberId = idgenService.getNextStringId();
        
        // 2. DTO -> Entity 변환
        Member member = dto.toEntity(mberId);
        
        // 3. 엔티티 영속화
        Member savedMember = memberRepository.save(member);
        return savedMember.getMberId();
    }
}
```
