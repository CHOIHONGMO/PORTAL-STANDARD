package com.portal.user.member.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.member.MberManageMapper;
import com.portal.util.crypto.FileScrty;
import jakarta.annotation.Resource;

/**
 * 일반회원관리에 관한 비즈니스 클래스를 정의한다.
 * @author ST-Ones Corp.
 * @since 2009.04.10
 * @version 1.0
 */
@Service("mberManageService")
public class MberManageService extends EgovAbstractServiceImpl {

	/** mberManageMapper */
	@Resource(name="mberManageMapper")
	private MberManageMapper mberManageMapper;

	/** egovUsrCnfrmIdGnrService */
	@Resource(name="egovUsrCnfrmIdGnrService")
	private EgovIdGnrService idgenService;

	/**
	 * 사용자의 기본정보를 화면에서 입력하여 항목의 정합성을 체크하고 데이터베이스에 저장
	 * @param mberManageVO 일반회원 등록정보 Map
	 * @return result 등록결과
	 * @throws Exception
	 */
	public int insertMber(Map<String, Object> mberManageVO) throws Exception  {
		//고유아이디 셋팅
		String uniqId = idgenService.getNextStringId();
		mberManageVO.put("uniqId", uniqId);
		//패스워드 암호화
		String password = (String) mberManageVO.get("password");
		String mberId = (String) mberManageVO.get("mberId");
		String pass = FileScrty.encryptPassword(password, mberId);
		mberManageVO.put("password", pass);

		int result = mberManageMapper.insertMber(mberManageVO);
		return result;
	}

	/**
	 * 기 등록된 사용자 중 검색조건에 맞는 일반회원의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param uniqId 상세조회대상 일반회원아이디
	 * @return Map<String, Object> 일반회원상세정보 Map
	 * @throws Exception
	 */
	public Map<String, Object> selectMber(String uniqId) {
		Map<String, Object> mberManageVO = mberManageMapper.selectMber(uniqId);
		return mberManageVO;
	}

	/**
	 * 기 등록된 회원 중 검색조건에 맞는 회원들의 정보를 데이터베이스에서 읽어와 화면에 출력
	 * @param userSearchVO 검색조건 Map
	 * @return List<Map<String, Object>> 일반회원목록정보 Map List
	 */
	public List<Map<String, Object>> selectMberList(Map<String, Object> userSearchVO) {
		return mberManageMapper.selectMberList(userSearchVO);
	}

    /**
     * 일반회원 총 갯수를 조회한다.
     * @param userSearchVO 검색조건 Map
     * @return 일반회원총갯수(int)
     */
	public int selectMberListTotCnt(Map<String, Object> userSearchVO) {
    	return mberManageMapper.selectMberListTotCnt(userSearchVO);
    }

	/**
	 * 화면에 조회된 일반회원의 기본정보를 수정하여 항목의 정합성을 체크하고 수정된 데이터를 데이터베이스에 반영
	 * @param mberManageVO 일반회원수정정보 Map
	 * @throws Exception
	 */
	public void updateMber(Map<String, Object> mberManageVO) throws Exception {
		//패스워드 암호화
		String password = (String) mberManageVO.get("password");
		String mberId = (String) mberManageVO.get("mberId");
		String pass = FileScrty.encryptPassword(password, mberId);
		mberManageVO.put("password", pass);
		mberManageMapper.updateMber(mberManageVO);
	}

	/**
	 * 화면에 조회된 사용자의 정보를 데이터베이스에서 삭제
	 * @param checkedIdForDel 삭제대상 일반회원아이디
	 * @throws Exception
	 */
	public void deleteMber(String checkedIdForDel)  {
		String [] delId = checkedIdForDel.split(",");
		for (int i=0; i<delId.length ; i++){
			String [] id = delId[i].split(":");
			if (id[0].equals("USR03")){
		        //업무사용자(직원)삭제
			}else if(id[0].equals("USR01")){
				//일반회원삭제
				mberManageMapper.deleteMber(id[1]);
			}else if(id[0].equals("USR02")){
				//기업회원삭제
			}
		}
	}

	/**
	 * 일반회원 약관확인
	 * @param stplatId 일반회원약관아이디
	 * @return 일반회원약관정보(List)
	 * @throws Exception
	 */
	public List<?> selectStplat(String stplatId)  {
        return mberManageMapper.selectStplat(stplatId);
	}

	/**
	 * 일반회원암호수정
	 * @param mberManageVO 일반회원수정정보 Map(비밀번호)
	 * @throws Exception
	 */
	public void updatePassword(Map<String, Object> mberManageVO) {
		mberManageMapper.updatePassword(mberManageVO);
	}

	/**
	 * 일반회원이 비밀번호를 기억하지 못할 때 비밀번호를 찾을 수 있도록 함
	 * @param passVO 일반회원암호 조회조건정보 Map
	 * @return Map<String, Object> 일반회원암호정보 Map
	 * @throws Exception
	 */
	public Map<String, Object> selectPassword(Map<String, Object> passVO) {
		Map<String, Object> mberManageVO = mberManageMapper.selectPassword(passVO);
		return mberManageVO;
	}

	/**
	 * 입력한 사용자아이디의 중복여부를 체크하여 사용가능여부를 확인
	 * @param checkId 중복여부 확인대상 아이디
	 * @return 사용가능여부(아이디 사용회수 int)
	 * @throws Exception
	 */
	public int checkIdDplct(String checkId) {
		return mberManageMapper.checkIdDplct(checkId);
	}

}