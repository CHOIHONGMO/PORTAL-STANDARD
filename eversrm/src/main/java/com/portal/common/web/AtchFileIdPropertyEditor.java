package com.portal.common.web;

import java.beans.PropertyEditorSupport;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * atchFileId 파라미터 복호화 클래스
 * 
 * @author ST-Ones Corp.
 * @since 2022.12.22
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *     수정일      	수정자           수정내용
 *  ------------   --------    ---------------------------
 *
 * Copyright (C) 2009 by MOPAS  All right reserved.
 *      </pre>
 */

public class AtchFileIdPropertyEditor extends PropertyEditorSupport {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(AtchFileIdPropertyEditor.class);
	
	public void setAsText(String text) throws IllegalArgumentException {
		LOGGER.debug("===>>> setText : "+text);
		String decryptText = "";
		// 26.03.06 KISA 보안취약점 조치 : 불필요한 try-catch 제거
		if (text != null && !"".equals(text) ) {
			decryptText = FileMngController.decrypt(text);
		}
		this.setValue(decryptText);

	}


	public String getAsText() {
		LOGGER.debug("===>>> getText : "+getValue());
		return String.valueOf(getValue());

	}

}
