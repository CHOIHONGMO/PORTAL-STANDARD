package com.portal.user.help.faq.service;

import java.util.List;
import java.util.Map;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.egovframe.rte.fdl.idgnr.EgovIdGnrService;
import org.springframework.stereotype.Service;

import com.portal.user.help.faq.FaqManageMapper;
import jakarta.annotation.Resource;

/**
 * FAQ를 처리하는 비즈니스 구현 클래스
 * @author ST-Ones Corp.
 * @since 2009.04.01
 * @version 1.0
 */
@Service("FaqManageService")
public class FaqManageService extends EgovAbstractServiceImpl {

    @Resource(name="faqManageMapper")
    private FaqManageMapper faqManageMapper;

    /** ID Generation */
    @Resource(name="egovFaqManageIdGnrService")
    private EgovIdGnrService idgenService;

    /**
     * FAQ 글을 조회한다.
     * @param map
     * @return 조회한 글 Map
     * @exception Exception
     */
    public Map<String, Object> selectFaqListDetail(Map<String, Object> map) throws Exception {
        Map<String, Object> result = faqManageMapper.selectFaqListDetail(map);
        if (result == null) {
            throw processException("info.nodata.msg");
        }
        return result;
    }

    /**
     * FAQ 조회수를 수정한다.
     * @param map
     * @exception Exception
     */
    public void updateFaqInqireCo(Map<String, Object> map) throws Exception {
        faqManageMapper.updateFaqInqireCo(map);
    }

    /**
     * FAQ 글 목록을 조회한다.
     * @param map
     * @return 글 목록 List
     * @exception Exception
     */
    public List<Map<String, Object>> selectFaqList(Map<String, Object> map) throws Exception {
        return faqManageMapper.selectFaqList(map);
    }

    /**
     * FAQ 글 총 갯수를 조회한다.
     * @param map
     * @return 글 총 갯수
     */
    public int selectFaqListTotCnt(Map<String, Object> map) {
        return faqManageMapper.selectFaqListTotCnt(map);
    }

    /**
     * FAQ 글을 등록한다.
     * @param map
     * @exception Exception
     */
    public void insertFaqCn(Map<String, Object> map) throws Exception {
        String newsId = idgenService.getNextStringId();
        map.put("faqId", newsId);
        faqManageMapper.insertFaqCn(map);
    }

    /**
     * FAQ 글을 수정한다.
     * @param map
     * @exception Exception
     */
    public void updateFaqCn(Map<String, Object> map) throws Exception {
        faqManageMapper.updateFaqCn(map);
    }

    /**
     * FAQ 글을 삭제한다.
     * @param map
     * @exception Exception
     */
    public void deleteFaqCn(Map<String, Object> map) throws Exception {
        faqManageMapper.deleteFaqCn(map);
    }

}
