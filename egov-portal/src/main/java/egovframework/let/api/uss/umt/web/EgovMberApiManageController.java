package egovframework.let.api.uss.umt.web;

import java.util.HashMap;
import java.util.Map;
import java.util.List;

import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.let.uss.umt.service.EgovMberManageService;
import egovframework.let.uss.umt.service.MberManageVO;
import egovframework.let.uss.umt.service.UserDefaultVO;
import egovframework.let.utl.sim.service.EgovFileScrty;
import jakarta.annotation.Resource;

@RestController
@RequestMapping("/api/uss/umt")
public class EgovMberApiManageController {

    @Resource(name = "mberManageService")
    private EgovMberManageService mberManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /**
     * 회원 목록을 조회한다.
     */
    @RequestMapping(value = "/mber/selectMberList.api", method = RequestMethod.GET)
    public Map<String, Object> selectMberList(@ModelAttribute("userSearchVO") UserDefaultVO userSearchVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            userSearchVO.setPageUnit(propertiesService.getInt("pageUnit"));
            userSearchVO.setPageSize(propertiesService.getInt("pageSize"));

            PaginationInfo paginationInfo = new PaginationInfo();
            paginationInfo.setCurrentPageNo(userSearchVO.getPageIndex());
            paginationInfo.setRecordCountPerPage(userSearchVO.getPageUnit());
            paginationInfo.setPageSize(userSearchVO.getPageSize());

            userSearchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
            userSearchVO.setLastIndex(paginationInfo.getLastRecordIndex());
            userSearchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());

            List<?> resultList = mberManageService.selectMberList(userSearchVO);
            int totCnt = mberManageService.selectMberListTotCnt(userSearchVO);
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
            MberManageVO mberManageVO = mberManageService.selectMber(mberId);
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
    public Map<String, Object> insertMber(@RequestBody MberManageVO mberManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            // 패스워드 암호화
            String pass = EgovFileScrty.encryptPassword(mberManageVO.getPassword(), mberManageVO.getMberId());
            mberManageVO.setPassword(pass);
            
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
    public Map<String, Object> insertMberSbscrb(@RequestBody MberManageVO mberManageVO) throws Exception {
        Map<String, Object> response = new HashMap<>();
        try {
            mberManageVO.setMberSttus("A"); // 가입신청 상태
            mberManageVO.setGroupId("GROUP_00000000000000"); // 기본그룹
            
            // 패스워드 암호화
            String pass = EgovFileScrty.encryptPassword(mberManageVO.getPassword(), mberManageVO.getMberId());
            mberManageVO.setPassword(pass);
            
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
    public Map<String, Object> updateMber(@RequestBody MberManageVO mberManageVO) throws Exception {
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

            MberManageVO mberManageVO = new MberManageVO();
            mberManageVO.setMberId(mberId);
            mberManageVO.setPassword(newPassword);
            mberManageVO.setOldPassword(oldPassword);
            mberManageVO.setUniqId(uniqId);

            MberManageVO resultVO = mberManageService.selectPassword(mberManageVO);
            String encryptPass = EgovFileScrty.encryptPassword(oldPassword, mberId);

            if (encryptPass.equals(resultVO.getPassword())) {
                mberManageVO.setPassword(EgovFileScrty.encryptPassword(newPassword, mberId));
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
