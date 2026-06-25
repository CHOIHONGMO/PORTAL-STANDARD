package com.portal.common.service;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 *  Class Name : PortalProperties.java
 *  Description : properties값들을 파일로부터 읽어와   Globals클래스의 정적변수로 로드시켜주는 클래스로
 *   문자열 정보 기준으로 사용할 전역변수를 시스템 재시작으로 반영할 수 있도록 한다.
 *  Modification Information
 *
 *     수정일         수정자                   수정내용
 *   -------    --------    ---------------------------
 *   2009.01.19    박지욱          최초 생성
 *	 2011.07.20    서준식 	      Globals파일의 상대경로를 읽은 메서드 추가
 *   2011.08.31  JJY            경량환경 템플릿 커스터마이징버전 생성
 *
 *  @author ST-Ones Corp.
 *  @since 2009. 01. 19
 *  @version 1.0
 *  @see
 *
 */

public class PortalProperties {

	private static final Logger LOGGER = LoggerFactory.getLogger(PortalProperties.class);

	//프로퍼티값 로드시 에러발생하면 반환되는 에러문자열
	public static final String ERR_CODE = " EXCEPTION OCCURRED";
	public static final String ERR_CODE_FNFE = " EXCEPTION(FNFE) OCCURRED";
	public static final String ERR_CODE_IOE = " EXCEPTION(IOE) OCCURRED";

	//파일구분자
	static final String FILE_SEPARATOR = System.getProperty("file.separator");

	public static final String GLOBALS_PROPERTIES_FILE = "classpath:/application.properties";

	private static Properties props = new Properties();
	private static boolean isLoaded = false;

	private static synchronized void loadProperties() {
		if (isLoaded) {
			return;
		}
		try (java.io.InputStream is = PortalProperties.class.getClassLoader().getResourceAsStream("application.properties")) {
			if (is != null) {
				props.load(new java.io.BufferedInputStream(is));
				isLoaded = true;
			} else {
				LOGGER.error("application.properties file not found on classpath.");
			}
		} catch (IOException e) {
			LOGGER.error("Error loading application.properties: {}", e.getMessage());
		}
	}

	/**
	 * 인자로 주어진 문자열을 Key값으로 하는 프로퍼티 값을 반환한다(Globals.java 전용)
	 * @param keyName String
	 * @return String
	*/
	public static String getProperty(String keyName) {
		loadProperties();
		String value = props.getProperty(keyName);
		if (value == null) {
			value = System.getProperty(keyName);
		}
		if (value == null) {
			value = System.getenv(keyName);
		}
		if (value != null) {
			return value.trim();
		}
		return ERR_CODE;
	}

	/**
	 * 주어진 프로파일의 내용을 파싱하여 (key-value) 형태의 구조체 배열을 반환한다.
	 * @param property String
	 * @return ArrayList
	 */
	@SuppressWarnings("unused")
	public static ArrayList<Map<String, String>> loadPropertyFile(String property){

		// key - value 형태로 된 배열 결과
		ArrayList<Map<String, String>> keyList = new ArrayList<Map<String, String>>();

		String src = property.replace("\\", FILE_SEPARATOR).replace("/", FILE_SEPARATOR);
		FileInputStream fis = null;
		try {
			File srcFile = new File(src);
			if (srcFile.exists()) {

				java.util.Properties props = new java.util.Properties();
				fis = new FileInputStream(src);
				props.load(new java.io.BufferedInputStream(fis));
				fis.close();

				int i = 0;
				Enumeration<?> plist = props.propertyNames();
				if (plist != null) {
					while (plist.hasMoreElements()) {
						Map<String, String> map = new HashMap<String, String>();
						String key = (String) plist.nextElement();
						map.put(key, props.getProperty(key));
						keyList.add(map);
					}
				}
			}
		} catch (IOException ex) {
			debug("EX:" + ex);
		} finally {
			try {
				if (fis != null) fis.close();
			} catch (IOException ex) {
				debug("EX:" + ex);		//ex.printStackTrace();
			}
		}

		return keyList;
	}

	/**
	 * 시스템 로그를 출력한다.
	 * @param obj Object
	 */
	private static void debug(Object obj) {
		if (obj instanceof java.lang.Exception) {
			LOGGER.debug("IGNORED: {}", ((Exception)obj).getMessage());
		}
	}
}

