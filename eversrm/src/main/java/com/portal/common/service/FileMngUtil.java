package com.portal.common.service;

import java.io.File;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.portal.common.util.WebUtil;
import com.portal.util.common.StringUtil;
import jakarta.annotation.Resource;

/**
 * @author ST-Ones Corp.
 * @version 1.0
 * @Class Name  : FileMngUtil.java
 * @Description : 메시지 처리 관련 유틸리티
 * @Modification Information
 *
 *     수정일         수정자                   수정내용
 *     -------          --------        ---------------------------
 *
 * @see
 * @since 2009. 02. 13
 */
@Component("FileMngUtil")
public class FileMngUtil {

    public static final int BUFF_SIZE = 2048;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertyService;

    @Resource(name = "egovFileIdGnrService")
    private EgovIdGnrService idgenService;

    private static final Logger LOGGER = LoggerFactory.getLogger(FileMngUtil.class);

    /**
     * 첨부파일에 대한 목록 정보를 취득한다.
     *
     * @param files
     * @return
     * @throws Exception
     */
    public List<Map<String, Object>> parseFileInf(Map<String, MultipartFile> files, String KeyStr, int fileKeyParam, String atchFileId, String storePath) throws Exception {
    	int fileKey = fileKeyParam;

    	String storePathString = "";
    	String atchFileIdString = "";

    	if (storePath == null || "".equals(storePath)) {
    		storePathString = propertyService.getString("Globals.fileStorePath");
    	} else {
    		storePathString = propertyService.getString(storePath);
    	}

    	if (atchFileId == null || "".equals(atchFileId)) {
    		atchFileIdString = idgenService.getNextStringId();
    	} else {
    		atchFileIdString = atchFileId;
    	}

    	File saveFolder = new File(WebUtil.filePathBlackList(storePathString));

    	if (!saveFolder.exists() || saveFolder.isFile()) {
    		saveFolder.mkdirs();
    	}

		Iterator<Entry<String, MultipartFile>> itr = files.entrySet().iterator();
		MultipartFile file;
		String filePath = "";
		List<Map<String, Object>> result  = new ArrayList<>();
		Map<String, Object> fvo;

		while (itr.hasNext()) {
			Entry<String, MultipartFile> entry = itr.next();

		    file = entry.getValue();
		    String orginFileName = file.getOriginalFilename();

		    //--------------------------------------
		    // 원 파일명이 없는 경우 처리
		    // (첨부가 되지 않은 input file type)
		    //--------------------------------------
		    if ("".equals(orginFileName)) {
		    	continue;
		    }
		    ////------------------------------------

		    int index = orginFileName.lastIndexOf(".");
		    //String fileName = orginFileName.substring(0, index);
		    String fileExt = orginFileName.substring(index + 1);
		    String newName = KeyStr + StringUtil.getTimeStamp() + fileKey;
		    long _size = file.getSize();

		    if (!"".equals(orginFileName)) {
				filePath = storePathString + File.separator + newName;
				file.transferTo(new File(WebUtil.filePathBlackList(filePath)));
		    }

		    fvo = new java.util.HashMap<>();
		    fvo.put("fileExtsn", fileExt);
		    fvo.put("fileStreCours", storePathString);
		    fvo.put("fileMg", Long.toString(_size));
		    fvo.put("orignlFileNm", orginFileName);
		    fvo.put("streFileNm", newName);
		    fvo.put("atchFileId", atchFileIdString);
		    fvo.put("fileSn", String.valueOf(fileKey));

		    result.add(fvo);

		    fileKey++;
		}

		return result;
    }

}
