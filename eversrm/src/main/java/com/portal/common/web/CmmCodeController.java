package com.portal.common.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.portal.common.service.CmmUseService;
import jakarta.annotation.Resource;

/**
 * 공통코드 조회를 처리하는 REST API 컨트롤러
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/common/code")
public class CmmCodeController {

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;

    /**
     * 회원 가입 및 정보 수정 시 필요한 공통 코드를 일괄 조회한다.
     * @return Map<String, Object> 공통코드 리스트 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectMemberCodeDetails.api", method = RequestMethod.GET)
    public Map<String, Object> selectMemberCodeDetails() throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> vo = new HashMap<>();

            // 패스워드 힌트 목록 (COM022)
            vo.put("codeId", "COM022");
            List<?> passwordHintResult = cmmUseService.selectCmmCodeDetail(vo);

            // 성별구분코드 (COM014)
            vo.put("codeId", "COM014");
            List<?> sexdstnCodeResult = cmmUseService.selectCmmCodeDetail(vo);

            // 회원상태코드 (COM013)
            vo.put("codeId", "COM013");
            List<?> mberSttusResult = cmmUseService.selectCmmCodeDetail(vo);

            // 그룹정보 (LETTNORGNZTINFO)
            vo.put("codeId", "");
            vo.put("tableNm", "LETTNORGNZTINFO");
            List<?> groupIdResult = cmmUseService.selectGroupIdDetail(vo);

            Map<String, Object> data = new HashMap<>();
            data.put("passwordHintList", passwordHintResult);
            data.put("sexdstnCodeList", sexdstnCodeResult);
            data.put("mberSttusList", mberSttusResult);
            data.put("groupIdList", groupIdResult);

            response.put("resultCode", "SUCCESS");
            response.put("result", data);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
