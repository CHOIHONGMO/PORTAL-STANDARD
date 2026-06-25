# eversrm (Backend) Development Guide

이 문서는 **eversrm** 백엔드 API 프로젝트의 개발을 위한 가이드라인입니다. 
프로젝트 개발 및 백엔드 로직 수정 시 항상 이 문서를 기준으로 작업해 주시기 바랍니다.

---

## 1. 프로젝트 개요 및 기술 스택
- **프레임워크**: Spring Boot 3 + eGovFramework Boot Parent 5.0.0
- **언어**: Java 17
- **데이터베이스 접근**: MyBatis (Mapper XML)
- **빌드 툴**: Maven
- **로깅**: SLF4J + Logback / Log4jdbc

---

## 2. 주요 디렉토리 구조
```
eversrm/
├── src/
│   ├── main/
│   │   ├── java/com/portal/
│   │   │   ├── api/       # 외부 시스템 연동용 API 패키지
│   │   │   ├── board/     # 게시판 관련 도메인 로직 (BBS)
│   │   │   ├── common/    # 공통 모듈, 유틸리티, 인터셉터 등
│   │   │   ├── login/     # 로그인 및 인증 로직
│   │   │   ├── security/  # 스프링 시큐리티 및 권한 제어 필터 등
│   │   │   ├── system/    # 시스템/메뉴 관리 도메인
│   │   │   ├── user/      # 사용자(회원) 관리 도메인
│   │   │   └── util/      # 날짜, 문자열, 페이징 등 공통 유틸리티
│   │   │
│   │   └── resources/
│   │       ├── application.yml   # Spring Boot 기본 프로퍼티 (DB 정보 등 포함)
│   │       ├── mapper/           # MyBatis SQL XML 파일 모음 (RDBMS 종속 쿼리 포함)
│   │       └── spring/           # 레거시 Spring XML 설정 및 빈 설정 파일 
│   └── test/                     # 단위 테스트 코드 폴더
└── pom.xml                       # Maven 의존성 설정 파일
```

---

## 3. 백엔드 개발 규칙 및 방법

### 3.1. 아키텍처 및 계층 분리 (Layered Architecture)
- **Controller (`@RestController` 권장)**: HTTP 요청을 받아 검증하고, Service 계층으로 데이터를 전달하며 JSON 형태의 응답을 반환합니다. 화면 렌더링은 Frontend(everportal)에서 수행하므로 JSP 등의 반환 대신 RESTful 원칙을 준수합니다.
- **Service (`@Service`)**: 비즈니스 로직을 수행합니다. 트랜잭션 관리(`@Transactional`)는 Service 계층에서 선언합니다.
- **Mapper (`@Mapper`)**: MyBatis 인터페이스로서 DB 쿼리 실행을 담당합니다. 실제 쿼리는 `resources/mapper/` 디렉토리 하위의 XML 파일에 매핑합니다.

### 3.2. 코드 컨벤션 및 패키지 구조
- **도메인 단위 패키징**: `com.portal.[도메인명].web`, `com.portal.[도메인명].service`, `com.portal.[도메인명].service.impl` 구조를 사용합니다.
- **클래스 네이밍**: Controller는 `~Controller`, Service는 `~Service` (인터페이스) 및 `~ServiceImpl` (구현체), Mapper는 `~Mapper`로 명명합니다. (레거시 코드인 경우 DAO 패턴이 일부 남아있을 수 있으나 신규 기능은 Mapper 인터페이스를 권장합니다.)
- **VO (Value Object)**: 데이터 전송에 사용되는 객체는 `~VO` 또는 `~DTO`로 네이밍하며, Lombok(`@Getter`, `@Setter`, `@ToString` 등)을 적극 활용하여 보일러플레이트를 줄입니다.

### 3.3. SQL 및 Mapper XML 관리
- 모든 SQL 쿼리는 `src/main/resources/mapper` 하위에 존재해야 합니다.
- 데이터베이스 엔진별로 특화된 쿼리는 환경별로 파일을 나누어 작성하며, 가급적 표준 SQL을 지향합니다.
- 동적 쿼리 사용 시 `<if>`, `<choose>` 등을 적절히 활용하여 조건부 검색 로직을 유연하게 처리합니다.

---

## 4. 환경 설정 및 구동
- **설정 파일**: 서버 구동 및 DB 커넥션 설정 등은 주로 `application.yml`에서 관리하며, 여러 환경(`dev`, `prod`)에 맞춰 프로필(`spring.profiles.active`)을 분리하여 사용합니다.
- **빌드**: `mvn clean install` 명렁어로 전체 의존성을 다운로드하고 빌드할 수 있습니다.
- **실행**: IDE 내에서 `PortalApplication.java` 클래스를 구동하거나, `mvn spring-boot:run`을 통해 실행할 수 있습니다.
