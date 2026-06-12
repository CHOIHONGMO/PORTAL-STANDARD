package com.portal.api.cmm.code.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.portal.common.ComDefaultCodeVO;
import com.portal.common.service.CmmUseService;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/cmm/code")
public class CmmCodeApiManageController {

    @Resource(name = "CmmUseService")
    private CmmUseService cmmUseService;

    /**
     * 회원 가입 및 정보 수정 시 필요한 공통 코드를 일괄 조회한다.
     */
    @RequestMapping(value = "/selectMemberCodeDetails.api", method = RequestMethod.GET)
    public Map<String, Object> selectMemberCodeDetails() throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            ComDefaultCodeVO vo = new ComDefaultCodeVO();

            // 패스워드 힌트 목록 (COM022)
            vo.setCodeId("COM022");
            List<?> passwordHintResult = cmmUseService.selectCmmCodeDetail(vo);

            // 성별구분코드 (COM014)
            vo.setCodeId("COM014");
            List<?> sexdstnCodeResult = cmmUseService.selectCmmCodeDetail(vo);

            // 회원상태코드 (COM013)
            vo.setCodeId("COM013");
            List<?> mberSttusResult = cmmUseService.selectCmmCodeDetail(vo);

            // 그룹정보 (LETTNORGNZTINFO)
            vo.setCodeId("");
            vo.setTableNm("LETTNORGNZTINFO");
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
