# eversrm (Backend) Development Guide

이 문서는 **eversrm** 백엔드 API 프로젝트의 개발을 위한 가이드라인입니다. 
프로젝트 개발 및 백엔드 로직 수정 시 항상 이 문서를 기준으로 아키텍처 및 개발 규칙을 준수해 주시기 바랍니다.

---

## 1. 프로젝트 개요 및 기술 스택

- **프레임워크**: Spring Boot 3 + 전자정부 표준프레임워크(eGovFramework) Boot Parent 5.0.0
- **언어 및 런타임**: Java 17
- **영속성 계층 (Persistence)**: 
  - **MyBatis 3**: XML Mapper 기반 동적 SQL 매핑
  - **Spring Data JPA / QueryDSL 5.0 (Jakarta)**: 엔티티 및 타입 세이프 쿼리 지원
- **데이터베이스**: MySQL 8.x + Log4jdbc (`net.sf.log4jdbc.DriverSpy`) + Apache Commons DBCP2
- **보안 및 암호화**: eGovFrame Security, eGovFrame Crypto (SHA-256)
- **보안 필터**: XSS 방지 필터 (`HTMLTagFilter`), 글로벌 CORS 설정 (`addCorsMappings`)
- **로깅**: SLF4J + Logback (`logback-spring.xml`)
- **빌드 도구**: Apache Maven

---

## 2. 프로젝트 디렉토리 구조

```
eversrm/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   ├── com/
│   │   │   │   ├── builder/            # [Visual Screen Builder API] 프론트엔드 연동 화면 빌더
│   │   │   │   │   ├── service/        # 화면 스키마 JSON 파일 입출력 및 코드 생성 서비스
│   │   │   │   │   └── web/            # 빌더 REST 컨트롤러 (/api/builder/**)
│   │   │   │   └── portal/             # 포털 서비스 메인 패키지
│   │   │   │       ├── PortalApplication.java # Spring Boot 진입점, CORS 및 XSS 필터 등록
│   │   │   │       ├── main/           # 메인 대시보드 API (MainController: 배너, 공지, 설문 통계)
│   │   │   │       ├── board/          # 게시판 도메인
│   │   │   │       │   ├── bbs/        # 게시판 마스터 관리
│   │   │   │       │   └── com/        # 게시판 사용관리 및 템플릿 관리
│   │   │   │       ├── user/           # 회원 및 대민 서비스 도메인
│   │   │   │       │   ├── member/     # 회원가입 및 관리자 회원관리
│   │   │   │       │   ├── help/       # 고객지원 (FAQ, Q&A 및 관리자 답변)
│   │   │   │       │   ├── poll/       # 설문조사 시스템 (설문지, 문항, 항목, 응답/통계, 템플릿)
│   │   │   │       │   ├── policy/     # 정책 및 약관 (개인정보보호정책, 이용약관)
│   │   │   │       │   └── banner/     # 메인 배너 관리
│   │   │   │       ├── system/         # 시스템 관리 도메인
│   │   │   │       │   ├── code/       # 공통 코드 관리
│   │   │   │       │   ├── menu/       # 시스템 메뉴 관리
│   │   │   │       │   └── calendar/   # 업무 일정 관리
│   │   │   │       ├── security/       # 권한 및 보안 도메인
│   │   │   │       │   ├── role/       # 롤(Role) 관리
│   │   │   │       │   ├── authority/  # 권한(Author) 관리
│   │   │   │       │   ├── group/      # 사용자 그룹(Group) 관리
│   │   │   │       │   └── groupauthority/ # 그룹별 권한 매핑
│   │   │   │       ├── login/          # 로그인 및 사용자 인증 처리
│   │   │   │       ├── common/         # 공통 컴포넌트, XSS 필터, WebBinding, 예외 핸들러
│   │   │   │       └── util/           # 유틸리티 (날짜, 페이징, 문자열 처리 등)
│   │   │
│   │   └── resources/
│   │       ├── application.properties  # Spring Boot 및 eGovFrame 환경설정 (DB, CORS, 빌더 등)
│   │       ├── builder-screens/        # Visual Screen Builder로 저장된 화면 스키마 JSON 파일 저장소
│   │       ├── mapper/                 # MyBatis Mapper XML 파일 디렉토리
│   │       │   ├── config/             # MyBatis 글로벌 매퍼 설정
│   │       │   └── com/portal/         # 도메인별 SQL XML 매퍼
│   │       │       ├── board/          # 게시판 관련 쿼리
│   │       │       ├── user/           # 회원, 고객지원, 설문 관련 쿼리
│   │       │       ├── system/         # 공통코드, 메뉴 관련 쿼리
│   │       │       ├── security/       # 보안/권한/롤 관련 쿼리
│   │       │       ├── login/          # 로그인 인증 관련 쿼리
│   │       │       └── common/         # 공통 쿼리
│   │       ├── egovframework/          # eGovFrame 프로퍼티 및 보안 환경설정
│   │       ├── spring/                 # Spring XML 빈 설정 (context-idgen.xml 등)
│   │       ├── logback-spring.xml      # SLF4J/Logback 로깅 설정
│   │       ├── message/                # 다국어 및 안내 메시지 프로퍼티
│   │       └── validator/              # 유효성 검증 규칙 파일
│   └── test/                           # 단위 및 통합 테스트 코드
└── pom.xml                             # Maven 의존성 및 플러그인 설정
```

---

## 3. 백엔드 개발 규칙 및 아키텍처

### 3.1. 계층 분리 아키텍처 (Layered Architecture)
- **Controller (`@RestController`)**: 
  - HTTP 요청을 수신하여 유효성을 검증하고 서비스 계층으로 전달합니다.
  - 프론트엔드(`everportal`)와 완벽히 분리된 REST API를 제공하며, 모든 응답은 JSON 형식으로 반환합니다.
- **Service (`@Service`)**: 
  - 비즈니스 로직 및 트랜잭션 관리(`@Transactional`)를 담당합니다.
  - 인터페이스(`~Service`)와 구현 클래스(`~ServiceImpl`) 패턴을 준수합니다.
- **Data Access Layer (`@Mapper` / JPA Repository)**: 
  - DB 입출력은 MyBatis 매퍼 인터페이스(`@Mapper`)를 기본으로 사용하며, `resources/mapper/com/portal/[도메인]/` 하위의 XML 파일과 매핑됩니다.
  - 필요에 따라 Spring Data JPA 및 QueryDSL을 활용하여 복합 쿼리를 타입 세이프하게 구성할 수 있습니다.

### 3.2. 코드 컨벤션 및 패키지 구조
- **도메인 단위 패키징**: `com.portal.[도메인].[기능].[service|web]` 형태로 응집도를 높여 구성합니다.
  - 예: `com.portal.board.bbs.web.BoardMstrController`, `com.portal.board.bbs.service.BoardMstrService`
- **명명 규칙**:
  - Controller: `*Controller`
  - Service: `*Service` (인터페이스), `*ServiceImpl` (구현체)
  - Mapper: `*Mapper` (인터페이스)
  - VO / DTO: `*VO` 또는 `*DTO` (Lombok의 `@Getter`, `@Setter`, `@ToString` 적극 활용)
- **CORS 및 보안**:
  - React 개발 서버(`http://localhost:5173`)와의 통신을 위해 `PortalApplication.java`에서 글로벌 CORS를 허용합니다 (`cors.allowed-origins` 프로퍼티 연동).
  - 클라이언트 입력값의 XSS 공격을 차단하기 위해 `HTMLTagFilter`를 전역 등록하여 필터링합니다.

### 3.3. SQL 및 MyBatis XML 관리 규칙
- 모든 SQL XML 파일은 `src/main/resources/mapper/com/portal/[도메인]/` 경로 아래에 위치시킵니다.
- XML 파일의 `namespace`는 매핑되는 Java Mapper 인터페이스의 Full Qualified Name과 일치해야 합니다.
  - 예: `namespace="com.portal.board.bbs.service.impl.BoardMstrMapper"`
- 동적 SQL 작성 시 `<if test="...">`, `<choose>`, `<foreach>` 태그를 사용하며, 대소문자 컨벤션(SQL 예약어는 대문자, 테이블 및 컬럼은 언더스코어 표기)을 준수합니다.

### 3.4. Visual Screen Builder API 연동
- `com.builder` 패키지는 프론트엔드의 화면 빌더 도구와 통신하는 전용 모듈입니다.
- 화면 정의 JSON을 읽고 쓰는 API(`GET/POST /api/builder/screens/**`)와 신규 생성된 컴포넌트 코드를 `everportal` 소스 트리에 자동 배치하는 파일 입출력 로직을 포함합니다.
- `application.properties`의 `builder.enabled=true` 설정을 통해 로컬/개발 환경에서만 활성화하고 운영 배포 시에는 비활성화합니다.

---

## 4. 환경 설정 및 실행 방법

### 4.1. 환경 설정 (`application.properties`)
```properties
# 서버 포트
server.port=8080

# 데이터베이스 연결 정보 (MySQL + Log4jdbc)
Globals.DbType=mysql
Globals.DriverClassName=net.sf.log4jdbc.DriverSpy
Globals.Url=jdbc:log4jdbc:mysql://127.0.0.1:3306/egov-mysql
Globals.UserName=egov-mysql
Globals.Password=egov-mysql

# CORS 허용 프론트엔드 Origin
cors.allowed-origins=http://localhost:5173

# Visual Screen Builder 경로 설정
builder.enabled=true
builder.frontend-path=C:/ST-onesIDE/workspace/PORTAL-STANDARD/everportal
builder.screens-path=C:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/resources/builder-screens
```

### 4.2. 빌드 및 서버 실행
```bash
# 1. Maven 의존성 다운로드 및 프로젝트 빌드 (테스트 제외 빌드)
mvn clean install -DskipTests

# 2. Spring Boot 개발 서버 구동 (기본 포트: 8080)
mvn spring-boot:run

# 또는 IDE(IntelliJ, Eclipse 등)에서 com.portal.PortalApplication.java 직접 실행
```
