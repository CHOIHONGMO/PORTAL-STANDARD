package com.portal.common.handler;

import org.egovframe.rte.fdl.cmmn.exception.handler.ExceptionHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 공통서비스의 Exception 처리 클래스
 * 
 * @author ST-Ones Corp.
 */
public class ComExcepHndlr implements ExceptionHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(ComExcepHndlr.class);

	@Override
	public void occur(Exception ex, String packageName) {
		LOGGER.debug("[HANDLER][PACKAGE]::: {}", packageName);
		LOGGER.debug("[HANDLER][Exception]:::{}", ex);
		LOGGER.error(packageName, ex);
	}
}
