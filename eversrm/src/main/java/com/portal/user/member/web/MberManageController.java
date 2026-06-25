package com.portal.user.member.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portal.user.member.service.MberManageService;
import com.portal.util.crypto.FileScrty;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/user/member")
public class MberManageController {

    @Resource(name = "mberManageService")
    private MberManageService mberManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 회원 목록을 조회한다.
     */
    @RequestMapping(value = "/mber/selectMberList.api", method = RequestMethod.GET)
    public Map<String, Object> selectMberList(@RequestParam Map<String, Object> searchMap) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int pageIndex = searchMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(searchMap.get("pageIndex"))) : 1;
            int pageUnit = propertiesService.getInt("pageUnit");
            int pageSize = propertiesService.getInt("pageSize");

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(pageIndex);
            paginationInfo.setRecordCountPerPage(pageUnit);
            paginationInfo.setPageSize(pageSize);

            searchMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
            searchMap.put("lastIndex", paginationInfo.getLastRecordIndex());
            searchMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());

            if (!searchMap.containsKey("sbscrbSttus")) {
                searchMap.put("sbscrbSttus", "0");
            }
            if (!searchMap.containsKey("searchCondition")) {
                searchMap.put("searchCondition", "");
            }
            if (!searchMap.containsKey("searchKeyword")) {
                searchMap.put("searchKeyword", "");
            }

            List<?> resultList = mberManageService.selectMberList(searchMap);
            int totCnt = mberManageService.selectMberListTotCnt(searchMap);
            paginationInfo.setTotalRecordCount(totCnt);

            response.put("resultCode", "SUCCESS");
            response.put("resultList", resultList);
            response.put("totalCount", totCnt);
            response.put("paginationInfo", paginationInfo);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 회원 상세 정보를 조회한다.
     */
    @RequestMapping(value = "/mber/selectMber.api", method = RequestMethod.GET)
    public Map<String, Object> selectMber(@RequestParam("selectedId") String mberId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            Map<String, Object> mberManageVO = mberManageService.selectMber(mberId);
            response.put("resultCode", "SUCCESS");
            response.put("result", mberManageVO);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 회원을 등록한다.
     */
    @RequestMapping(value = "/mber/insertMber.api", method = RequestMethod.POST)
    public Map<String, Object> insertMber(@RequestBody Map<String, Object> mberManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            // 패스워드 암호화
            String password = (String) mberManageVO.get("password");
            String mberId = (String) mberManageVO.get("mberId");
            String pass = FileScrty.encryptPassword(password, mberId);
            mberManageVO.put("password", pass);
            
            mberManageService.insertMber(mberManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 회원가입신청(일반회원)을 처리한다.
     */
    @RequestMapping(value = "/cmm/insertMberSbscrb.api", method = RequestMethod.POST)
    public Map<String, Object> insertMberSbscrb(@RequestBody Map<String, Object> mberManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            mberManageVO.put("mberSttus", "A"); // 가입신청 상태
            mberManageVO.put("groupId", "GROUP_00000000000000"); // 기본그룹
            
            // 패스워드 암호화
            String password = (String) mberManageVO.get("password");
            String mberId = (String) mberManageVO.get("mberId");
            String pass = FileScrty.encryptPassword(password, mberId);
            mberManageVO.put("password", pass);
            
            mberManageService.insertMber(mberManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 회원 정보를 수정한다.
     */
    @RequestMapping(value = "/mber/updateMber.api", method = RequestMethod.POST)
    public Map<String, Object> updateMber(@RequestBody Map<String, Object> mberManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            mberManageService.updateMber(mberManageVO);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 회원 정보를 삭제한다.
     */
    @RequestMapping(value = "/mber/deleteMber.api", method = RequestMethod.POST)
    public Map<String, Object> deleteMber(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String checkedIdForDel = requestBody.get("checkedIdForDel");
            mberManageService.deleteMber(checkedIdForDel);
            response.put("resultCode", "SUCCESS");
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 비밀번호를 변경한다.
     */
    @RequestMapping(value = "/mber/updatePassword.api", method = RequestMethod.POST)
    public Map<String, Object> updatePassword(@RequestBody Map<String, String> requestBody) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            String mberId = requestBody.get("mberId");
            String oldPassword = requestBody.get("oldPassword");
            String newPassword = requestBody.get("newPassword");
            String uniqId = requestBody.get("uniqId");

            Map<String, Object> mberManageVO = new HashMap<>();
            mberManageVO.put("mberId", mberId);
            mberManageVO.put("password", newPassword);
            mberManageVO.put("oldPassword", oldPassword);
            mberManageVO.put("uniqId", uniqId);

            Map<String, Object> resultVO = mberManageService.selectPassword(mberManageVO);
            String encryptPass = FileScrty.encryptPassword(oldPassword, mberId);

            if (encryptPass.equals(resultVO.get("password"))) {
                mberManageVO.put("password", FileScrty.encryptPassword(newPassword, mberId));
                mberManageService.updatePassword(mberManageVO);
                response.put("resultCode", "SUCCESS");
            } else {
                response.put("resultCode", "ERROR");
                response.put("resultMessage", "기존 비밀번호가 일치하지 않습니다.");
            }
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }

    /**
     * 아이디 중복 여부를 체크한다.
     */
    @RequestMapping(value = "/checkIdDplct.api", method = RequestMethod.GET)
    public Map<String, Object> checkIdDplct(@RequestParam("checkId") String checkId) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            int usedCnt = mberManageService.checkIdDplct(checkId);
            response.put("resultCode", "SUCCESS");
            response.put("usedCnt", usedCnt);
        } catch (Exception e) {
            response.put("resultCode", "ERROR");
            response.put("resultMessage", e.getMessage());
        }
        return response;
    }
}
