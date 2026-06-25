package com.portal.common.web;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.egovframe.rte.fdl.crypto.EgovCryptoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.portal.common.util.WebUtil;
import com.portal.common.service.FileMngService;
import com.portal.common.service.PortalProperties;
import jakarta.annotation.Resource;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;

/**
 * @Class Name : ImageProcessController.java
 * @Description :
 * @author ST-Ones Corp.
 */
@RestController
public class ImageProcessController extends HttpServlet {

	private static final long serialVersionUID = -6339945210971171173L;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(ImageProcessController.class);

	@Resource(name = "FileMngService")
	private FileMngService fileService;
	
	/** 암호화서비스 */
	@Resource(name = "egovARIACryptoService")
	EgovCryptoService cryptoService;
	
	public static final String ALGORITHM_KEY = PortalProperties.getProperty("Globals.File.algorithmKey");

	/**
	 * 첨부된 이미지에 대한 미리보기 기능을 제공한다.
	 */
	@RequestMapping("/cmm/fms/getImage.do")
	public void getImageInf(@RequestParam Map<String, Object> commandMap, HttpServletResponse response) throws Exception {

		String param_atchFileId = (String) commandMap.get("atchFileId");
		param_atchFileId = param_atchFileId.replaceAll(" ", "+");
		byte[] decodedBytes = Base64.getDecoder().decode(param_atchFileId);
		String decodedString = new String(cryptoService.decrypt(decodedBytes, ALGORITHM_KEY));
		String decodedFileId = StringUtils.substringAfter(decodedString, "|");

		String fileSn = (String) commandMap.get("fileSn");

		Map<String, Object> vo = new HashMap<>();

		vo.put("atchFileId", decodedFileId);
		vo.put("fileSn", fileSn);

		Map<String, Object> fvo = fileService.selectFileInf(vo);
		
		String fileStreCours = WebUtil.filePathBlackList((String) fvo.get("fileStreCours"));
		String streFileNm = WebUtil.filePathBlackList((String) fvo.get("streFileNm"));
		
		File file = new File(fileStreCours, streFileNm);
		FileInputStream fis = null;

		BufferedInputStream in = null;
		ByteArrayOutputStream bStream = null;
		try {
			fis = new FileInputStream(file);
			in = new BufferedInputStream(fis);
			bStream = new ByteArrayOutputStream();
			int imgByte;
			while ((imgByte = in.read()) != -1) {
				bStream.write(imgByte);
			}

			String type = "";
			String fileExtsn = (String) fvo.get("fileExtsn");

			if (fileExtsn != null && !"".equals(fileExtsn)) {
				if ("jpg".equals(fileExtsn.toLowerCase())) {
					type = "image/jpeg";
				} else {
					type = "image/" + fileExtsn.toLowerCase();
				}
				type = "image/" + fileExtsn.toLowerCase();

			} else {
				LOGGER.debug("Image fileType is null.");
			}

			response.setHeader("Content-Type", type);
			response.setContentLength(bStream.size());
			bStream.writeTo(response.getOutputStream());
			response.getOutputStream().flush();
			response.getOutputStream().close();

		} catch (IOException e) {
			LOGGER.debug("{}", e);
		} finally {
			if (bStream != null) {
				try {
					bStream.close();
				} catch (IOException est) {
					LOGGER.debug("IGNORED: {}", est.getMessage());
				}
			}
			if (in != null) {
				try {
					in.close();
				} catch (IOException ei) {
					LOGGER.debug("IGNORED: {}", ei.getMessage());
				}
			}
			if (fis != null) {
				try {
					fis.close();
				} catch (IOException efis) {
					LOGGER.debug("IGNORED: {}", efis.getMessage());
				}
			}
		}
	}
}
