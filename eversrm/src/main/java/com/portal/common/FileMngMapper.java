package com.portal.common;

import java.util.List;
import java.util.Map;
import org.egovframe.rte.psl.dataaccess.mapper.EgovMapper;

/**
2:  * 파일정보 관리에 관한 MyBatis Mapper 인터페이스를 정의한다.
3:  * 
4:  * @author ST-Ones Corp.
5:  */
@EgovMapper("fileMngMapper")
public interface FileMngMapper {

    void insertFileMaster(Map<String, Object> fileMaster) throws Exception;

    void insertFileDetail(Map<String, Object> fileDetail) throws Exception;

    List<Map<String, Object>> selectFileList(Map<String, Object> fileVO) throws Exception;

    void deleteFileDetail(Map<String, Object> fileVO) throws Exception;

    Integer getMaxFileSN(Map<String, Object> fileVO) throws Exception;

    Map<String, Object> selectFileInf(Map<String, Object> fileVO) throws Exception;

    void deleteCOMTNFILE(Map<String, Object> fileVO) throws Exception;

    List<Map<String, Object>> selectFileListByFileNm(Map<String, Object> fileVO) throws Exception;

    Integer selectFileListCntByFileNm(Map<String, Object> fileVO) throws Exception;

    List<Map<String, Object>> selectImageFileList(Map<String, Object> fileVO) throws Exception;
}
