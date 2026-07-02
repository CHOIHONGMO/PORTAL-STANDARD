package com.builder.service;

import java.util.List;
import java.util.Map;

/**
 * Visual Screen Builder — 파일 생성 서비스 인터페이스
 *
 * @author Visual Screen Builder
 * @since 2026-06-26
 */
public interface BuilderService {

    /**
     * 생성된 코드를 파일 시스템에 저장합니다.
     *
     * @param pageTsx    페이지 TSX 코드
     * @param pagePath   페이지 파일 경로 (src/pages/...)
     * @param schemaTts  스키마 TS 코드
     * @param schemaPath 스키마 파일 경로
     * @param handlerTs  핸들러 TS 코드
     * @param handlerPath 핸들러 파일 경로
     * @return 저장된 절대 파일 경로 목록
     */
    List<String> generateAndSaveFiles(
        String pageTsx, String pagePath,
        String schemaTts, String schemaPath,
        String handlerTs, String handlerPath
    ) throws Exception;

    /**
     * 화면 정의 JSON을 파일로 저장합니다.
     *
     * @param screenId       화면 ID
     * @param screenDefinition 화면 정의 Map
     * @return 저장된 파일 경로
     */
    String saveScreenDefinition(String screenId, Map<String, Object> screenDefinition) throws Exception;

    /**
     * 저장된 화면 정의 목록을 조회합니다.
     *
     * @return 화면 정의 목록
     */
    List<Map<String, Object>> getScreenList() throws Exception;

    /**
     * 화면 정의 파일을 삭제합니다.
     *
     * @param screenId 화면 ID
     */
    void deleteScreenDefinition(String screenId) throws Exception;

    /**
     * src/pages 하위 디렉토리 목록을 조회합니다.
     *
     * @return 디렉토리 상대 경로 목록
     */
    List<String> getPagesSubdirectories() throws Exception;
}
