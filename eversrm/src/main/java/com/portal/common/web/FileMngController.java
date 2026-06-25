package com.portal.common.web;

import java.util.Base64;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.egovframe.rte.fdl.crypto.EgovCryptoService;
import org.egovframe.rte.fdl.security.userdetails.util.EgovUserDetailsHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import com.portal.common.service.FileMngService;
import com.portal.common.service.PortalProperties;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServletRequest;

/**
 * 파일 조회, 삭제, 다운로드 처리를 위한 컨트롤러 클래스
 * 
 * @author ST-Ones Corp.
 */
@RestController
public class FileMngController {

	private static final Logger LOGGER = LoggerFactory.getLogger(FileMngController.class);

	/** 암호화서비스 */
	private static EgovCryptoService cryptoService;

	@Resource(name = "egovARIACryptoService")
	public void setEgovCryptoService(EgovCryptoService cryptoService) {
		FileMngController.cryptoService = cryptoService;
	}

	@Resource(name = "FileMngService")
	private FileMngService fileService;

	public static final String ALGORITHM_KEY = PortalProperties.getProperty("Globals.File.algorithmKey");

	/**
	 * 첨부파일에 대한 목록을 조회한다.
	 */
	@GetMapping("/cmm/fms/selectFileInfs.do")
	public Map<String, Object> selectFileInfs(HttpServletRequest request,
			@RequestParam Map<String, Object> commandMap) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();

		String param_atchFileId = (String) commandMap.get("param_atchFileId");
		String decodedAtchFileId = "";
		if (param_atchFileId != null && !"".equals(param_atchFileId)) {
			byte[] encrypted_atchFileId = Base64.getDecoder().decode(param_atchFileId);
			decodedAtchFileId = new String(cryptoService.decrypt(encrypted_atchFileId, ALGORITHM_KEY));
		}

		Map<String, Object> fileVO = new HashMap<>();
		fileVO.put("atchFileId", decodedAtchFileId);
		List<Map<String, Object>> result = fileService.selectFileInfs(fileVO);

		// FileId를 유추하지 못하도록 세션ID와 함께 암호화하여 표시한다.
		for (Map<String, Object> file : result) {
			String sessionId = request.getSession().getId();
			String fileId = (String) file.get("atchFileId");
			String toEncrypt = sessionId + "|" + fileId;
			file.put("atchFileId", Base64.getEncoder().encodeToString(
					cryptoService.encrypt(toEncrypt.getBytes(), ALGORITHM_KEY)));
		}

		resultMap.put("fileList", result);
		resultMap.put("updateFlag", "N");
		resultMap.put("fileListCnt", result.size());
		resultMap.put("atchFileId", param_atchFileId);

		return resultMap;
	}

	/**
	 * 첨부파일 변경을 위한 수정페이지로 이동한다.
	 */
	@RequestMapping(value = "/cmm/fms/selectFileInfsForUpdate.do", method = {RequestMethod.GET, RequestMethod.POST})
	public Map<String, Object> selectFileInfsForUpdate(@RequestParam Map<String, Object> commandMap,
			HttpServletRequest request) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();

		String param_atchFileId = (String) commandMap.get("param_atchFileId");
		String decodedAtchFileId = "";
		if (param_atchFileId != null && !"".equals(param_atchFileId)) {
			byte[] encrypted_atchFileId = Base64.getDecoder().decode(param_atchFileId);
			decodedAtchFileId = new String(cryptoService.decrypt(encrypted_atchFileId, ALGORITHM_KEY));
		}

		Map<String, Object> fileVO = new HashMap<>();
		fileVO.put("atchFileId", decodedAtchFileId);

		List<Map<String, Object>> result = fileService.selectFileInfs(fileVO);

		// FileId를 유추하지 못하도록 세션ID와 함께 암호화하여 표시한다.
		for (Map<String, Object> file : result) {
			String sessionId = request.getSession().getId();
			String fileId = (String) file.get("atchFileId");
			String toEncrypt = sessionId + "|" + fileId;
			file.put("atchFileId", Base64.getEncoder().encodeToString(
					cryptoService.encrypt(toEncrypt.getBytes(), ALGORITHM_KEY)));
		}

		resultMap.put("fileList", result);
		resultMap.put("updateFlag", "Y");
		resultMap.put("fileListCnt", result.size());
		resultMap.put("atchFileId", param_atchFileId);

		return resultMap;
	}

	/**
	 * 첨부파일에 대한 삭제를 처리한다.
	 */
	@PostMapping("/cmm/fms/deleteFileInfs.do")
	public Map<String, Object> deleteFileInf(@RequestParam Map<String, Object> commandMap,
			HttpServletRequest request) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();

		Boolean isAuthenticated = EgovUserDetailsHelper.isAuthenticated();

		if (isAuthenticated) {
			Map<String, Object> fileVO = new HashMap<>();
			fileVO.put("atchFileId", commandMap.get("atchFileId"));
			fileVO.put("fileSn", commandMap.get("fileSn"));
			fileService.deleteFileInf(fileVO);
		}

		resultMap.put("success", true);
		return resultMap;
	}

	/**
	 * 이미지 첨부파일에 대한 목록을 조회한다.
	 */
	@GetMapping("/cmm/fms/selectImageFileInfs.do")
	public Map<String, Object> selectImageFileInfs(@RequestParam Map<String, Object> commandMap,
			HttpServletRequest request) throws Exception {

		Map<String, Object> resultMap = new HashMap<>();

		String param_atchFileId = (String) commandMap.get("atchFileId");
		String decodedAtchFileId = "";
		if (param_atchFileId != null && !"".equals(param_atchFileId)) {
			byte[] encrypted_atchFileId = Base64.getDecoder().decode(param_atchFileId);
			decodedAtchFileId = new String(cryptoService.decrypt(encrypted_atchFileId, ALGORITHM_KEY));
			decodedAtchFileId = StringUtils.substringAfter(decodedAtchFileId, "|");
		}

		Map<String, Object> fileVO = new HashMap<>();
		fileVO.put("atchFileId", decodedAtchFileId);
		List<Map<String, Object>> result = fileService.selectImageFileList(fileVO);

		// FileId를 유추하지 못하도록 세션ID와 함께 암호화하여 표시한다.
		for (Map<String, Object> file : result) {
			String sessionId = request.getSession().getId();
			String fileId = (String) file.get("atchFileId");
			String toEncrypt = sessionId + "|" + fileId;
			file.put("atchFileId",
					Base64.getEncoder().encodeToString(cryptoService.encrypt(toEncrypt.getBytes(), ALGORITHM_KEY)));
		}

		resultMap.put("fileList", result);

		return resultMap;
	}

	/**
	 * 원본 문자열을 암호화 하는 메서드.
	 */
	public static String encrypt(String atchFileId) {
		String returnVal = "-";
		returnVal = Base64.getEncoder().encodeToString(cryptoService.encrypt(atchFileId.getBytes(), ALGORITHM_KEY));
		return returnVal;
	}

	/**
	 * 원본 문자열을 암호화 하는 메서드.
	 */
	public static String encryptSession(String atchFileId, String sessionId) {
		String returnVal = "-";
		String toEncrypt = sessionId + "|" + atchFileId;
		returnVal = Base64.getEncoder().encodeToString(cryptoService.encrypt(toEncrypt.getBytes(), ALGORITHM_KEY));
		return returnVal;
	}

	/**
	 * 암호화 문자열을 복호화 하는 메서드.
	 */
	public static String decrypt(String base64AtchFileId) {
		String returnVal = "FILE_ID_DECRIPT_EXCEPTION_02";
		if (base64AtchFileId != null && !"".equals(base64AtchFileId)) {
			try {
				byte[] encrypted_atchFileId = Base64.getDecoder().decode(base64AtchFileId);
				returnVal = new String(cryptoService.decrypt(encrypted_atchFileId, ALGORITHM_KEY));
			} catch (IllegalArgumentException e) {
				LOGGER.debug(e.getMessage());
			} catch (RuntimeException e) {
				LOGGER.debug(e.getMessage());
			}
		}
		return returnVal;
	}
}
