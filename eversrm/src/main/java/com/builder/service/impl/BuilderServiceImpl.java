package com.builder.service.impl;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.builder.service.BuilderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Visual Screen Builder — 파일 생성 서비스 구현체
 * <p>
 * everportal 프론트엔드 프로젝트 경로에 .tsx / .schema.ts / .handler.ts 파일을 생성합니다.
 * application.yml의 builder.frontend-path 설정으로 생성 경로를 지정합니다.
 *
 * @author Visual Screen Builder
 * @since 2026-06-26
 */
@Service("BuilderService")
@ConditionalOnProperty(name = "builder.enabled", havingValue = "true", matchIfMissing = false)
public class BuilderServiceImpl implements BuilderService {

    private static final Logger LOGGER = LoggerFactory.getLogger(BuilderServiceImpl.class);

    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * everportal 프론트엔드 프로젝트 루트 경로
     * application.yml: builder.frontend-path 설정
     * 예) C:/ST-onesIDE/workspace/PORTAL-STANDARD/everportal
     */
    @Value("${builder.frontend-path:../everportal}")
    private String frontendPath;

    /**
     * 화면 정의 JSON 저장 디렉토리 (eversrm 내부)
     * 예) src/main/resources/builder/screens
     */
    @Value("${builder.screens-path:src/main/resources/builder/screens}")
    private String screensPath;

    // ─────────────────────────────────────────────────────────────────
    // 파일 생성
    // ─────────────────────────────────────────────────────────────────

    @Override
    public List<String> generateAndSaveFiles(
        String pageTsx, String pagePath,
        String schemaTts, String schemaPath,
        String handlerTs, String handlerPath
    ) throws Exception {
        List<String> savedPaths = new ArrayList<>();

        // handlerTs 파일은 기존에 있으면 덮어쓰지 않음 (개발자가 수정했을 수 있음)
        savedPaths.add(writeFile(frontendPath, pagePath, pageTsx, true));
        savedPaths.add(writeFile(frontendPath, schemaPath, schemaTts, true));
        savedPaths.add(writeFile(frontendPath, handlerPath, handlerTs, false)); // handler는 최초 1회만

        return savedPaths;
    }

    /**
     * 파일 쓰기
     *
     * @param basePath  기준 경로
     * @param relativePath 상대 경로 (src/pages/...)
     * @param content   파일 내용
     * @param overwrite true면 기존 파일 덮어쓰기
     * @return 절대 경로
     */
    private String writeFile(String basePath, String relativePath, String content, boolean overwrite) throws IOException {
        Path filePath = Paths.get(basePath, relativePath).normalize().toAbsolutePath();
        File file = filePath.toFile();

        // 디렉토리 생성
        File parentDir = file.getParentFile();
        if (!parentDir.exists()) {
            boolean created = parentDir.mkdirs();
            LOGGER.info("[BuilderService] 디렉토리 생성: {} (result={})", parentDir.getAbsolutePath(), created);
        }

        // 덮어쓰기 여부 확인
        if (!overwrite && file.exists()) {
            LOGGER.info("[BuilderService] 파일이 이미 존재하여 건너뜀 (handler): {}", filePath);
            return filePath.toString() + " (skipped - already exists)";
        }

        // 파일 쓰기
        try (FileWriter writer = new FileWriter(file, StandardCharsets.UTF_8)) {
            writer.write(content);
        }

        LOGGER.info("[BuilderService] 파일 생성 완료: {}", filePath);
        return filePath.toString();
    }

    // ─────────────────────────────────────────────────────────────────
    // 화면 정의 관리
    // ─────────────────────────────────────────────────────────────────

    @Override
    public String saveScreenDefinition(String screenId, Map<String, Object> screenDefinition) throws Exception {
        Path dir = Paths.get(screensPath).normalize().toAbsolutePath();
        if (!dir.toFile().exists()) {
            dir.toFile().mkdirs();
        }

        Path filePath = dir.resolve(screenId + ".json");
        String json = objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(screenDefinition);

        try (FileWriter writer = new FileWriter(filePath.toFile(), StandardCharsets.UTF_8)) {
            writer.write(json);
        }

        LOGGER.info("[BuilderService] 화면 정의 저장: {}", filePath);
        return filePath.toString();
    }

    @Override
    public List<Map<String, Object>> getScreenList() throws Exception {
        List<Map<String, Object>> list = new ArrayList<>();
        Path dir = Paths.get(screensPath).normalize().toAbsolutePath();

        if (!dir.toFile().exists()) {
            return list;
        }

        File[] files = dir.toFile().listFiles((d, name) -> name.endsWith(".json"));
        if (files == null) return list;

        for (File file : files) {
            try {
                String content = Files.readString(file.toPath(), StandardCharsets.UTF_8);
                @SuppressWarnings("unchecked")
                Map<String, Object> screen = objectMapper.readValue(content, Map.class);
                list.add(screen);
            } catch (Exception e) {
                LOGGER.warn("[BuilderService] 화면 정의 파일 읽기 실패: {}", file.getName(), e);
            }
        }

        return list;
    }

    @Override
    public void deleteScreenDefinition(String screenId) throws Exception {
        Path filePath = Paths.get(screensPath, screenId + ".json").normalize().toAbsolutePath();
        File file = filePath.toFile();
        if (file.exists()) {
            boolean deleted = file.delete();
            LOGGER.info("[BuilderService] 화면 정의 삭제: {} (result={})", filePath, deleted);
        }
    }

    @Override
    public List<String> getPagesSubdirectories() throws Exception {
        Path pagesPath = Paths.get(frontendPath, "src/pages").normalize().toAbsolutePath();
        List<String> relativeDirs = new ArrayList<>();
        // Root directory itself as an option
        relativeDirs.add(""); 
        
        if (pagesPath.toFile().exists()) {
            scanDirectories(pagesPath.toFile(), pagesPath.toString(), relativeDirs);
        }
        return relativeDirs;
    }

    private void scanDirectories(File currentDir, String rootPath, List<String> result) {
        File[] subFiles = currentDir.listFiles(File::isDirectory);
        if (subFiles == null) return;
        for (File subFile : subFiles) {
            if (subFile.getName().startsWith(".")) continue;
            if (subFile.getName().equalsIgnoreCase("node_modules")) continue;
            
            String relative = subFile.getAbsolutePath()
                    .replace(rootPath, "")
                    .replace("\\", "/");
            if (relative.startsWith("/")) {
                relative = relative.substring(1);
            }
            if (!relative.isEmpty()) {
                result.add(relative);
            }
            scanDirectories(subFile, rootPath, result);
        }
    }
}
