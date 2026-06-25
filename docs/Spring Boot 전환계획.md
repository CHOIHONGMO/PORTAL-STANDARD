# Spring Boot 전환 계획

본 문서는 기존 Maven 기반의 전자정부 표준프레임워크 5.0 (Spring Legacy) 프로젝트를 `egovframe-boot-starter-parent` (v5.0.0) 기반의 Spring Boot 3.x 프로젝트로 전환하기 위한 계획서입니다.

## 사용자 검토 필요 사항

> [!IMPORTANT]
> - **빌드 및 패키징 방식 변경**: 패키징 타입을 `war`에서 `jar`로 변경합니다. 외부 WAS(예: Tomcat)에 배포하는 방식 대신 Spring Boot의 내장 Tomcat 서버를 사용하여 실행 파일 형태로 구동하도록 설정합니다.
> - **기존 XML 설정 통합**: 기존 `src/main/resources/spring/context-*.xml`에 정의된 빈 설정(데이터소스, MyBatis 매퍼 스캔, ID 생성기, 암호화 설정 등)을 재작성하는 대신 `@ImportResource`를 사용하여 그대로 로드함으로써 안정성을 유지하고 휴먼 에러를 방지합니다.
> - **웹 서버 포트**: 내장 Tomcat 서버는 기본 포트인 `8080`으로 설정하여 실행합니다.

## 제안된 변경 사항

### [eversrm] 백엔드 설정 변경

#### [MODIFY] [pom.xml](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/pom.xml)
- 부모 POM(`<parent>`) 설정을 `org.egovframe.boot:egovframe-boot-starter-parent:5.0.0`으로 변경합니다.
- 패키징 타입을 `<packaging>jar</packaging>`로 변경합니다.
- `spring-boot-starter-web` 의존성을 추가합니다.
- 내장 서블릿 컨테이너 환경에서 불필요한 기존 서블릿, JSP API 및 개별적으로 지정되어 있던 slf4j/log4j 버전 설정을 제거합니다.
- `spring-boot-maven-plugin` 빌드 플러그인을 추가하여 실행 가능한 JAR 파일 빌드가 가능하도록 구성합니다.

#### [NEW] [PortalApplication.java](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/java/com/portal/PortalApplication.java)
- Spring Boot 애플리케이션의 시작점인 `@SpringBootApplication` 클래스를 생성합니다.
- `@ImportResource("classpath*:spring/context-*.xml")` 설정을 통해 기존 XML 빈 구성을 그대로 가져옵니다.
- `@ComponentScan(basePackages = {"com.portal", "org.egovframe.rte.fdl.security"})` 설정을 추가하여 컨트롤러, 서비스 빈 스캔 및 전자정부 표준프레임워크 보안 설정 클래스들을 정상 로드하도록 처리합니다.
- 기존 `web.xml`에 정의되어 있던 `HTMLTagFilter`를 Spring Boot의 `FilterRegistrationBean` 빈 설정을 통해 필터로 등록합니다.
- React 프론트엔드 연동을 위한 글로벌 Web MVC CORS 설정을 추가합니다.

#### [NEW] [application.properties](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/resources/application.properties)
- 기본적인 Spring Boot 프로퍼티 설정(서버 포트 8080 설정, 로그 설정파일 경로 지정 등)을 추가합니다.

#### [DELETE] [web.xml](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/webapp/WEB-INF/web.xml)
- 서블릿 및 필터 제어가 Spring Boot 내장 설정 및 자바 빈으로 자동화되므로, 레거시 `web.xml`을 삭제합니다.

#### [DELETE] [com-servlet.xml](file:///c:/ST-onesIDE/workspace/PORTAL-STANDARD/eversrm/src/main/webapp/WEB-INF/config/springmvc/com-servlet.xml)
- MVC 관련 설정이 Spring Boot의 자동설정 및 자바 기반의 CORS 설정 등으로 대체되므로, 기존 `com-servlet.xml`을 삭제합니다.

---

## 검증 계획

### 자동화 빌드 테스트
- `mvn clean package -DskipTests` 명령어를 실행하여 의존성 해결 및 백엔드 프로젝트 컴파일/빌드가 정상 완료되는지 확인합니다.

### 수동 검증
- Spring Boot 구동 시 내장 WAS가 성공적으로 기동되는지 콘솔 로그를 통해 확인합니다.
- 프론트엔드(React) 및 API 요청(로그인, 조회 등)이 정상적으로 라우팅 및 기능하는지 확인합니다.
