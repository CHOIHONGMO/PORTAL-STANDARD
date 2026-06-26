package com.portal.user.poll.qtm.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.poll.qtm.service.QustnrTmplatManageService;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletResponse;

/**
 * 설문템플릿관리를 처리하는 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2026.06.26
 * @version 1.0
 */
@RestController
@RequestMapping("/api/user/poll/qtm")
public class QustnrTmplatManageController {

    @Resource(name = "qustnrTmplatManageService")
    private QustnrTmplatManageService qustnrTmplatManageService;

    /**
     * 설문템플릿 목록을 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrTmplatManageList.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatManageList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = 10;
            int pageSize = 10;

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            List<?> list = qustnrTmplatManageService.selectQustnrTmplatManageList(searchMap);
            int totCnt = qustnrTmplatManageService.selectQustnrTmplatManageListCnt(searchMap);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", list);
            response.put("totalCount", totCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문템플릿 상세 정보를 조회한다.
     * @param searchMap 조회조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrTmplatManageDetail.api", method = RequestMethod.GET)
    public Map<String, Object> selectQustnrTmplatManageDetail(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            List<?> detail = qustnrTmplatManageService.selectQustnrTmplatManageDetail(searchMap);
            response.put("resultCode", "SUCCESS");
            response.put("result", detail.size() > 0 ? detail.get(0) : null);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문템플릿 이미지를 조회하여 스트리밍 출력한다.
     * @param response HttpServletResponse 객체
     * @param searchMap 조회조건 Map
     * @throws Exception
     */
    @RequestMapping(value = "/selectQustnrTmplatManageImg.api", method = RequestMethod.GET)
    public void selectQustnrTmplatManageImg(HttpServletResponse response, @RequestParam Map<String, Object> searchMap) throws Exception {
        try {
            Map<?, ?> mapResult = qustnrTmplatManageService.selectQustnrTmplatManageTmplatImagepathnm(searchMap);
            byte[] img = (byte[]) mapResult.get("QUSTNR_TMPLAT_IMAGE_INFOPATHNM");
            if (img != null) {
                response.setHeader("Content-Type", "image/jpeg");
                response.setHeader("Content-Length", "" + img.length);
                response.getOutputStream().write(img);
                response.getOutputStream().flush();
                response.getOutputStream().close();
            }
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
        }
    }

    /**
     * 설문템플릿을 등록한다.
     * @param searchMap 등록정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/insertQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> insertQustnrTmplatManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("frstRegisterId", "USRCNFRM_00000000000");
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            if (searchMap.get("qestnrTmplatImagepathnm") == null && searchMap.get("qestnrTmplatImagepathnmVal") != null) {
                String base64Str = (String) searchMap.get("qestnrTmplatImagepathnmVal");
                if (base64Str.contains(",")) {
                    base64Str = base64Str.split(",")[1];
                }
                searchMap.put("qestnrTmplatImagepathnm", java.util.Base64.getDecoder().decode(base64Str));
            }
            qustnrTmplatManageService.insertQustnrTmplatManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문템플릿을 수정한다.
     * @param searchMap 수정정보 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/updateQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> updateQustnrTmplatManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            searchMap.put("lastUpdusrId", "USRCNFRM_00000000000");
            if (searchMap.get("qestnrTmplatImagepathnm") == null && searchMap.get("qestnrTmplatImagepathnmVal") != null) {
                String base64Str = (String) searchMap.get("qestnrTmplatImagepathnmVal");
                if (base64Str.contains(",")) {
                    base64Str = base64Str.split(",")[1];
                }
                searchMap.put("qestnrTmplatImagepathnm", java.util.Base64.getDecoder().decode(base64Str));
            }
            qustnrTmplatManageService.updateQustnrTmplatManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 설문템플릿을 삭제한다.
     * @param searchMap 삭제조건 Map
     * @return Map<String, Object> 결과 Map
     * @throws Exception
     */
    @RequestMapping(value = "/deleteQustnrTmplatManage.api", method = RequestMethod.POST)
    public Map<String, Object> deleteQustnrTmplatManage(@RequestBody Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            qustnrTmplatManageService.deleteQustnrTmplatManage(searchMap);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
