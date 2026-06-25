package com.portal.common.handler;

import org.egovframe.rte.fdl.cmmn.trace.handler.TraceHandler;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 공통서비스의 trace 처리 클래스
 * 
 * @author ST-Ones Corp.
 */
public class ComTraceHandler implements TraceHandler {

	private static final Logger LOGGER = LoggerFactory.getLogger(ComTraceHandler.class);

	/**
	 * 발생된 메시지를 출력한다.
	 */
	@Override
	public void todo(Class<?> clazz, String message) {
		LOGGER.debug("[TRACE]CLASS::: {}", clazz.getName());
		LOGGER.debug("[TRACE]MESSAGE::: {}", message);
	}
}
