package com.builder.web;

import com.builder.service.BuilderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.web.bind.annotation.*;

import jakarta.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Visual Screen Builder — 파일 생성 REST API Controller
 * <p>
 * everportal 빌더에서 정의한 화면 JSON을 받아
 * 실제 프로젝트 파일(.tsx, .schema.ts, .handler.ts)을 생성합니다.
 *
 * @author Visual Screen Builder
 * @since 2026-06-26
 */
@RestController
@RequestMapping("/builder")
@ConditionalOnProperty(name = "builder.enabled", havingValue = "true", matchIfMissing = false)
public class BuilderController {

    private static final Logger LOGGER = LoggerFactory.getLogger(BuilderController.class);

    @Resource(name = "BuilderService")
    private BuilderService builderService;

    /**
     * 코드 파일 생성 API
     * POST /api/builder/generate
     *
     * @param request 화면 정의 + 생성된 코드 내용
     * @return 저장된 파일 경로 목록
     */
    @PostMapping("/generate")
    public Map<String, Object> generateFiles(@RequestBody Map<String, Object> request) {
        Map<String, Object> result = new HashMap<>();
        try {
            @SuppressWarnings("unchecked")
            Map<String, Object> generatedCode = (Map<String, Object>) request.get("generatedCode");
            @SuppressWarnings("unchecked")
            Map<String, Object> filePaths = (Map<String, Object>) generatedCode.get("filePaths");

            String pageTsx = (String) generatedCode.get("pageTsx");
            String schemaTts = (String) generatedCode.get("schemaTts");
            String handlerTs = (String) generatedCode.get("handlerTs");
            String pagePath = (String) filePaths.get("page");
            String schemaPath = (String) filePaths.get("schema");
            String handlerPath = (String) filePaths.get("handler");

            List<String> savedFiles = builderService.generateAndSaveFiles(
                pageTsx, pagePath,
                schemaTts, schemaPath,
                handlerTs, handlerPath
            );

            result.put("resultCode", "SUCCESS");
            result.put("resultMessage", "파일이 성공적으로 생성되었습니다.");
            result.put("savedFiles", savedFiles);
            LOGGER.info("[BuilderController] 파일 생성 완료: {}", savedFiles);

        } catch (Exception e) {
            LOGGER.error("[BuilderController] 파일 생성 실패", e);
            result.put("resultCode", "ERROR");
            result.put("resultMessage", "파일 생성 실패: " + e.getMessage());
        }
        return result;
    }

    /**
     * 화면 정의 저장 API (JSON 메타 파일)
     * POST /api/builder/screens
     */
    @PostMapping("/screens")
    public Map<String, Object> saveScreen(@RequestBody Map<String, Object> screenDefinition) {
        Map<String, Object> result = new HashMap<>();
        try {
            String screenId = (String) screenDefinition.get("screenId");
            String savedPath = builderService.saveScreenDefinition(screenId, screenDefinition);
            result.put("resultCode", "SUCCESS");
            result.put("resultMessage", "화면 정의가 저장되었습니다.");
            result.put("savedPath", savedPath);
        } catch (Exception e) {
            LOGGER.error("[BuilderController] 화면 정의 저장 실패", e);
            result.put("resultCode", "ERROR");
            result.put("resultMessage", "저장 실패: " + e.getMessage());
        }
        return result;
    }

    /**
     * 화면 정의 목록 조회
     * GET /api/builder/screens
     */
    @GetMapping("/screens")
    public Map<String, Object> getScreenList() {
        Map<String, Object> result = new HashMap<>();
        try {
            List<Map<String, Object>> screens = builderService.getScreenList();
            result.put("resultCode", "SUCCESS");
            result.put("screens", screens);
        } catch (Exception e) {
            LOGGER.error("[BuilderController] 화면 목록 조회 실패", e);
            result.put("resultCode", "ERROR");
            result.put("resultMessage", e.getMessage());
            result.put("screens", List.of());
        }
        return result;
    }

    /**
     * 화면 정의 삭제
     * DELETE /api/builder/screens/{screenId}
     */
    @DeleteMapping("/screens/{screenId}")
    public Map<String, Object> deleteScreen(@PathVariable String screenId) {
        Map<String, Object> result = new HashMap<>();
        try {
            builderService.deleteScreenDefinition(screenId);
            result.put("resultCode", "SUCCESS");
            result.put("resultMessage", "삭제되었습니다.");
        } catch (Exception e) {
            LOGGER.error("[BuilderController] 화면 정의 삭제 실패", e);
            result.put("resultCode", "ERROR");
            result.put("resultMessage", "삭제 실패: " + e.getMessage());
        }
        return result;
    }

    /**
     * src/pages 하위 디렉토리 목록 조회 API
     * GET /api/builder/pages-dirs
     */
    @GetMapping("/pages-dirs")
    public Map<String, Object> getPagesDirs() {
        Map<String, Object> result = new HashMap<>();
        try {
            List<String> dirs = builderService.getPagesSubdirectories();
            result.put("resultCode", "SUCCESS");
            result.put("dirs", dirs);
        } catch (Exception e) {
            LOGGER.error("[BuilderController] 페이지 디렉토리 목록 조회 실패", e);
            result.put("resultCode", "ERROR");
            result.put("resultMessage", e.getMessage());
            result.put("dirs", List.of());
        }
        return result;
    }
}
