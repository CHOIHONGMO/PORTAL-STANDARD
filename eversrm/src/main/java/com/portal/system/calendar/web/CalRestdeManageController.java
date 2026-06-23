package com.portal.system.calendar.web;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;

import org.apache.commons.collections.map.ListOrderedMap;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.portal.common.ComDefaultCodeVO;
import com.portal.common.LoginVO;
import com.portal.common.service.CmmUseService;
import com.portal.system.calendar.service.CalRestdeManageService;
import com.portal.system.calendar.service.Restde;
import com.portal.system.calendar.service.RestdeVO;
import jakarta.annotation.Resource;

/**
 * 
 * Í≥µÌú¥?ºÏóê Í¥Ä???îÏ≤≠??Î∞õÏïÑ ?úÎπÑ???¥Îûò?§Î°ú ?îÏ≤≠???ÑÎã¨?òÍ≥† ?úÎπÑ?§ÌÅ¥?òÏä§?êÏÑú Ï≤òÎ¶¨??Í≤∞Í≥ºÎ•????îÎ©¥?ºÎ°ú ?ÑÎã¨???ÑÌïú ControllerÎ•??ïÏùò?úÎã§
 * @author Í≥µÌÜµ?úÎπÑ??Í∞úÎ∞ú?Ä ?¥Ï§ë??
 * @since 2009.04.01
 * @version 1.0
 * @see
 *
 * <pre>
 * << Í∞úÏ†ï?¥Î†•(Modification Information) >>
 *   
 *   ?òÏ†ï??     ?òÏ†ï??          ?òÏ†ï?¥Ïö©
 *  -------    --------    ---------------------------
 *   2009.04.01  ?¥Ï§ë??         ÏµúÏ¥à ?ùÏÑ±
 *   2011.08.31  JJY            Í≤ΩÎüâ?òÍ≤Ω ?úÌîåÎ¶?Ïª§Ïä§?∞Îßà?¥ÏßïÎ≤ÑÏ†Ñ ?ùÏÑ± 
 *
 * </pre>
 */
@RestController
public class CalRestdeManageController {

	/** RestdeManageService */
	@Resource(name = "RestdeManageService")
    private CalRestdeManageService restdeManageService;

    /** EgovPropertyService */
    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

    /** CmmUseService */
	@Resource(name="CmmUseService")
	private CmmUseService cmmUseService;

	/**
	 * ?¨Î†• Î©îÏù∏Ï∞ΩÏùÑ ?∏Ï∂ú?úÎã§.
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalCalPopup"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/callCalPopup.do")
	public Map<String, Object> callCalendar() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    
	
	/**
	 * ?¨Î†•???∏Ï∂ú?úÎã§.
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalCalPopup"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/callCal.do")
	public Map<String, Object> callCal(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		
		cal.set(iYear,iMonth-1,1);
		
		int firstWeek = cal.get(Calendar.DAY_OF_WEEK);
		int lastDay   = cal.getActualMaximum(Calendar.DATE);
		int week      = cal.get(Calendar.DAY_OF_WEEK);
		
		String year   = Integer.toString(iYear);
		String month  = Integer.toString(iMonth);
		//String day    = Integer.toString(cal.get(Calendar.DAY_OF_MONTH));
		
		restde.setStartWeekMonth(firstWeek);
		restde.setLastDayMonth(lastDay);
		restde.setYear(year);
		restde.setMonth(month);
		
		List<ListOrderedMap> CalInfoList = new ArrayList<ListOrderedMap>();
		String tmpDay = "";
		
		/**
		 * Í≥ÑÏÇ∞... START
		 */
		for(int i=0; i<42;i++) {
			ListOrderedMap  map   = new ListOrderedMap();
			int cc = i + 1;
			int dd = cc-firstWeek+1;

			if (dd > 0 && dd <= lastDay) {
				tmpDay = Integer.toString(dd);
			} else {
				tmpDay = "";
			}
			
			map.put("year",		year);
	        map.put("month",	month);
	        map.put("day",		tmpDay);
	        map.put("cellNum",	cc);
	        map.put("weeks",	(cc - 1) / 7 + 1);
	        map.put("week",		(week-1) % 7 + 1);
	        map.put("restAt",	((week-1) % 7 + 1==1) ? "Y" : "N");

	    	if (dd > 0 && dd <= lastDay) {
				week ++;
			}    	
	    	CalInfoList.add(map);

		}
		/**
		 * Í≥ÑÏÇ∞... END		
		 */
		
        resultMap.put("resultList", CalInfoList);
		
		return resultMap;
	}    
	
	/**
	 * ?ºÎ∞ò?¨Î†• ?ùÏóÖ Î©îÏù∏Ï∞ΩÏùÑ ?∏Ï∂ú?úÎã§.
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalCalPopup"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/EgovNormalCalPopup.do")
	public Map<String, Object> callNormalCalPopup() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    

	/**
	 * ?ºÎ∞ò?¨Î†• ?ùÏóÖ ?ïÎ≥¥Î•?Ï°∞Ìöå?úÎã§.
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/EgovselectNormalCalendar.do")
	public Map<String, Object> selectNormalRestdePopup(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		
		/* DBÎ•??¨Ïö©??Í≤ΩÏö∞ Ï≤òÎ¶¨
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));

        List CalInfoList = restdeManageService.selectNormalRestdePopup(restde);
        */
		
		cal.set(iYear,iMonth-1,1);
		 
        int firstWeek = cal.get(Calendar.DAY_OF_WEEK);
        int lastDay   = cal.getActualMaximum(Calendar.DATE);
        int week      = cal.get(Calendar.DAY_OF_WEEK);
 
        String year   = Integer.toString(iYear);
        String month  = Integer.toString(iMonth);
        //String day    = Integer.toString(cal.get(Calendar.DAY_OF_MONTH));
 
        restde.setStartWeekMonth(firstWeek);
        restde.setLastDayMonth(lastDay);
        restde.setYear(year);
        restde.setMonth(month);
 
        List<ListOrderedMap> CalInfoList = new ArrayList<ListOrderedMap>();
        String tmpDay = "";
 
        /**
         * Í≥ÑÏÇ∞... START
         */
        for(int i=0; i<42;i++) {
            ListOrderedMap  map   = new ListOrderedMap();
            int cc = i + 1;
            int dd = cc-firstWeek+1;
 
            if (dd > 0 && dd <= lastDay) {
                tmpDay = Integer.toString(dd);
            } else {
                tmpDay = "";
            }
 
            map.put("year",     year);
            map.put("month",    month);
            map.put("day",      tmpDay);
            map.put("cellNum",  cc);
            map.put("weeks",    (cc - 1) / 7 + 1);
            map.put("week",     (week-1) % 7 + 1);
            map.put("restAt",   ((week-1) % 7 + 1==1) ? "Y" : "N");
 
            if (dd > 0 && dd <= lastDay) {
                week ++;
            }
            CalInfoList.add(map);
 
        }
        /**
         * Í≥ÑÏÇ∞... END
         */
		
		
        resultMap.put("resultList", CalInfoList);
		return resultMap;
	}
	
	
	/**
	 * ?âÏ†ï?¨Î†• ?ùÏóÖ Î©îÏù∏Ï∞ΩÏùÑ ?∏Ï∂ú?úÎã§.
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministCalPopup"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/EgovAdministCalPopup.do")
	public Map<String, Object> callAdministCalPopup() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    
	
	/**
	 * ?âÏ†ï?¨Î†• ?ùÏóÖ ?ïÎ≥¥Î•?Ï°∞Ìöå?úÎã§.
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cmm/EgovselectAdministCalendar.do")
	public Map<String, Object> selectAdministRestdePopup(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectAdministRestdePopup(restde));
		
		return resultMap;
	}

	/**
	 * ?ºÎ∞ò?¨Î†• ?ºÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalDayCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovNormalDayCalendar.do")
	public Map<String, Object> selectNormalDayCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();


		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		if(restde.getDay()==null || restde.getDay().equals("")){
			restde.setDay(Integer.toString(cal.get(Calendar.DATE)));
		}

		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());
		int iDay   = Integer.parseInt(restde.getDay());
		
		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,iDay);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(restde.getDay()));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		restde.setDay(Integer.toString(cal.get(Calendar.DAY_OF_MONTH)));
		restde.setWeek(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
		
		//List CalInfoList          = restdeManageService.selectNormalDayCal(restde);
        //List NormalWeekRestdeList = restdeManageService.selectNormalDayRestde(restde);

        resultMap.put("resultList", restdeManageService.selectNormalDayCal(restde));
        resultMap.put("RestdeList", restdeManageService.selectNormalDayRestde(restde));
        
		return resultMap;
	}
	
	/**
	 * ?ºÎ∞ò?¨Î†• Ï£ºÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalWeekCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovNormalWeekCalendar.do")
	public Map<String, Object> selectNormalWeekCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		if(restde.getDay()==null || restde.getDay().equals("")){
			restde.setDay(Integer.toString(cal.get(Calendar.DATE)));
		}

		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());
		
		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(restde.getDay()));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		int iStartWeek = restde.getStartWeekMonth(); 
		int iLastDate  = restde.getLastDayMonth();
		int iDayWeek  = cal.get(Calendar.DAY_OF_WEEK);
		
		int iMaxWeeks = (int)Math.floor(iLastDate/7);
		iMaxWeeks = iMaxWeeks + (int)Math.ceil(((iLastDate - iMaxWeeks * 7) + iStartWeek - 1) / 7.0);
		restde.setMaxWeeks(iMaxWeeks);
		
		if (iMaxWeeks < restde.getWeeks()) {
			restde.setWeeks(iMaxWeeks);
		}
		
		Restde vo = new Restde();
		Calendar weekCal = Calendar.getInstance();
		weekCal.setTime(cal.getTime());
		
		if(restde.getWeeks()!=0){
			weekCal.set(Calendar.DATE, (restde.getWeeks() - 1) * 7 + 1);
			if(restde.getWeeks()>1){
				iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);
				weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
			}
			restde.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)+1));
		}

		iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);

		// ?ºÏöî??
		weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
		resultMap.put("resultList_1", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_1", restdeManageService.selectNormalDayRestde(vo));
        
		// ?îÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_2", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_2", restdeManageService.selectNormalDayRestde(vo));

        // ?îÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_3", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_3", restdeManageService.selectNormalDayRestde(vo));

        // ?òÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
		//List CalInfoList_4          = restdeManageService.selectNormalDayCal(vo);
        //List NormalWeekRestdeList_4 = restdeManageService.selectNormalDayRestde(vo);
        resultMap.put("resultList_4", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_4", restdeManageService.selectNormalDayRestde(vo));

        // Î™©Ïöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_5", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_5", restdeManageService.selectNormalDayRestde(vo));

        // Í∏àÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_6", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_6", restdeManageService.selectNormalDayRestde(vo));
		
        // ?†Ïöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_7", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_7", restdeManageService.selectNormalDayRestde(vo));

        resultMap.put("resultList", restdeManageService.selectNormalDayCal(restde));
        
        return resultMap;
	}	

	/**
	 * ?ºÎ∞ò?¨Î†• ?îÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalMonthCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovNormalMonthCalendar.do")
	public Map<String, Object> selectNormalMonthCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectNormalRestdePopup(restde));
        resultMap.put("RestdeList", restdeManageService.selectNormalMonthRestde(restde));

        return resultMap;
	}	
	
	/**
	 * ?ºÎ∞ò?¨Î†• ?∞Í∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovNormalYearCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovNormalYearCalendar.do")
	public Map<String, Object> selectNormalYearCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		
		/* ?îÎ≥Ñ?ïÏù∏ */

		/* 1??*/
		iMonth = 1;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_1" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_1" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 2??*/
		iMonth = 2;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_2" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_2" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 3??*/
		iMonth = 3;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_3" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_3" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 4??*/
		iMonth = 4;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_4" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_4" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 5??*/
		iMonth = 5;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_5" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_5" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 6??*/
		iMonth = 6;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_6" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_6" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 7??*/
		iMonth = 7;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_7" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_7" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 8??*/
		iMonth = 8;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_8" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_8" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 9??*/
		iMonth = 9;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_9" , restdeManageService.selectNormalRestdePopup(restde) );
        resultMap.put("RestdeList_9" , restdeManageService.selectNormalMonthRestde(restde) );

		/* 10??*/
		iMonth = 10;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_10", restdeManageService.selectNormalRestdePopup(restde));
        resultMap.put("RestdeList_10", restdeManageService.selectNormalMonthRestde(restde));

		/* 11??*/
		iMonth = 11;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_11", restdeManageService.selectNormalRestdePopup(restde));
        resultMap.put("RestdeList_11", restdeManageService.selectNormalMonthRestde(restde));

		/* 12??*/
		iMonth = 12;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_12", restdeManageService.selectNormalRestdePopup(restde));
        resultMap.put("RestdeList_12", restdeManageService.selectNormalMonthRestde(restde));

        return resultMap;
	}	
	

	/**
	 * ?âÏ†ï?¨Î†• ?ºÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministDayCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovAdministDayCalendar.do")
	public Map<String, Object> selectAdministDayCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();


		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		if(restde.getDay()==null || restde.getDay().equals("")){
			restde.setDay(Integer.toString(cal.get(Calendar.DATE)));
		}

		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());
		int iDay   = Integer.parseInt(restde.getDay());
		
		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,iDay);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(restde.getDay()));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		restde.setDay(Integer.toString(cal.get(Calendar.DAY_OF_MONTH)));
		restde.setWeek(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
		
        resultMap.put("resultList", restdeManageService.selectAdministDayCal(restde));
        resultMap.put("RestdeList", restdeManageService.selectAdministDayRestde(restde));
        
		return resultMap;
	}
	

	/**
	 * ?âÏ†ï?¨Î†• Ï£ºÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministWeekCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovAdministWeekCalendar.do")
	public Map<String, Object> selectAdministWeekCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		if(restde.getDay()==null || restde.getDay().equals("")){
			restde.setDay(Integer.toString(cal.get(Calendar.DATE)));
		}

		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());
		
		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(restde.getDay()));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		int iStartWeek = restde.getStartWeekMonth(); 
		int iLastDate  = restde.getLastDayMonth();
		int iDayWeek  = cal.get(Calendar.DAY_OF_WEEK);
		
		int iMaxWeeks = (int)Math.floor(iLastDate/7);
		iMaxWeeks = iMaxWeeks + (int)Math.ceil(((iLastDate - iMaxWeeks * 7) + iStartWeek - 1) / 7.0);
		restde.setMaxWeeks(iMaxWeeks);
		
		if (iMaxWeeks < restde.getWeeks()) {
			restde.setWeeks(iMaxWeeks);
		}

		Restde vo = new Restde();
		Calendar weekCal = Calendar.getInstance();
		weekCal.setTime(cal.getTime());
		
		if(restde.getWeeks()!=0){
			weekCal.set(Calendar.DATE, (restde.getWeeks() - 1) * 7 + 1);
			if(restde.getWeeks()>1){
				iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);
				weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
			}
			restde.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)+1));
		}
		//List CalInfoList = restdeManageService.selectAdministDayCal(restde);
		resultMap.put("resultList", restdeManageService.selectAdministDayCal(restde));
		
		iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);

		// ?ºÏöî??
		weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
		//List CalInfoList_1          = restdeManageService.selectAdministDayCal(vo);
        //List AdministWeekRestdeList_1 = restdeManageService.selectAdministDayRestde(vo);
        resultMap.put("resultList_1", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_1", restdeManageService.selectAdministDayRestde(vo));
        
		// ?îÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_2", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_2", restdeManageService.selectAdministDayRestde(vo));

		// ?îÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_3", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_3", restdeManageService.selectAdministDayRestde(vo));

		// ?òÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_4", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_4", restdeManageService.selectAdministDayRestde(vo));

		// Î™©Ïöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_5", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_5", restdeManageService.selectAdministDayRestde(vo));

		// Í∏àÏöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_6", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_6", restdeManageService.selectAdministDayRestde(vo));

		// ?†Ïöî??
		weekCal.add(Calendar.DATE, 1);
		vo.setYear(Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.setMonth(Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.setDay(Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.setWeek(weekCal.get(Calendar.DAY_OF_WEEK));

        resultMap.put("resultList_7", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_7", restdeManageService.selectAdministDayRestde(vo));

		return resultMap;
	}
	
	/**
	 * ?âÏ†ï?¨Î†• ?îÍ∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministMonthCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovAdministMonthCalendar.do")
	public Map<String, Object> selectAdministMonthCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		restde.setMonth(Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectAdministRestdePopup(restde));
        resultMap.put("RestdeList", restdeManageService.selectAdministMonthRestde(restde));

        return resultMap;
	}	


	/**
	 * ?âÏ†ï?¨Î†• ?∞Í∞Ñ
	 * @param restde
	 * @param model
	 * @return "/cmm/sym/cal/EgovAdministYearCalendar"
	 * @throws Exception
	 */
	@RequestMapping(value = "/sym/cal/EgovAdministYearCalendar.do")
	public Map<String, Object> selectAdministYearCalendar(Restde restde) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();

		Calendar cal = Calendar.getInstance();

		if(restde.getYear()==null || restde.getYear().equals("")){
			restde.setYear(Integer.toString(cal.get(Calendar.YEAR)));
		}
		if(restde.getMonth()==null || restde.getMonth().equals("")){
			restde.setMonth(Integer.toString(cal.get(Calendar.MONTH)+1));
		}
		int iYear  = Integer.parseInt(restde.getYear());
		int iMonth = Integer.parseInt(restde.getMonth());

		if (iMonth<1){
			iYear--;
			iMonth = 12;
		}
		if (iMonth>12){
			iYear++;
			iMonth = 1;
		}
		if (iYear<1){
			iYear = 1;
			iMonth = 1;
		}
		if (iYear>9999){
			iYear = 9999;
			iMonth = 12;
		}
		restde.setYear(Integer.toString(iYear));
		
		/* ?îÎ≥Ñ?ïÏù∏ */

		/* 1??*/
		iMonth = 1;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_1" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_1" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 2??*/
		iMonth = 2;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_2" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_2" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 3??*/
		iMonth = 3;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_3" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_3" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 4??*/
		iMonth = 4;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_4" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_4" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 5??*/
		iMonth = 5;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_5" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_5" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 6??*/
		iMonth = 6;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_6" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_6" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 7??*/
		iMonth = 7;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_7" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_7" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 8??*/
		iMonth = 8;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_8" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_8" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 9??*/
		iMonth = 9;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_9" , restdeManageService.selectAdministRestdePopup(restde) );
        resultMap.put("RestdeList_9" , restdeManageService.selectAdministMonthRestde(restde) );
        
		/* 10??*/
		iMonth = 10;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_10", restdeManageService.selectAdministRestdePopup(restde));
        resultMap.put("RestdeList_10", restdeManageService.selectAdministMonthRestde(restde));
        
		/* 11??*/
		iMonth = 11;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_11", restdeManageService.selectAdministRestdePopup(restde));
        resultMap.put("RestdeList_11", restdeManageService.selectAdministMonthRestde(restde));
        
		/* 12??*/
		iMonth = 12;
		restde.setMonth(Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		restde.setStartWeekMonth(cal.get(Calendar.DAY_OF_WEEK));
		restde.setLastDayMonth(cal.getActualMaximum(Calendar.DATE));
        
        resultMap.put("resultList_12", restdeManageService.selectAdministRestdePopup(restde));
        resultMap.put("RestdeList_12", restdeManageService.selectAdministMonthRestde(restde));

        return resultMap;
	}	
	

	/**
	 * ?¥Ïùº????†ú?úÎã§.
	 * @param loginVO
	 * @param restde
	 * @param model
	 * @return "forward:/sym/cal/EgovRestdeList.do"
	 * @throws Exception
	 */
    @RequestMapping(value="/sym/cal/EgovRestdeRemove.do")
	public String deleteRestde(@ModelAttribute("loginVO") LoginVO loginVO, Restde restde) throws Exception {
    	restdeManageService.deleteRestde(restde);
        return resultMap;
	}



    /**
     * ?¥Ïùº ?∏Î??¥Ïó≠??Ï°∞Ìöå?úÎã§.
     * @param loginVO
     * @param restde
     * @param model
     * @return "/cmm/sym/cal/EgovRestdeDetail"
     * @throws Exception
     */
	@RequestMapping(value="/sym/cal/EgovRestdeDetail.do")
	public String selectRestdeDetail(@ModelAttribute("loginVO") LoginVO loginVO, Restde restde) throws Exception {
		Restde vo = restdeManageService.selectRestdeDetail(restde);
		resultMap.put("result", vo);
		
		return resultMap;
	}

    /**
	 * ?¥Ïùº Î¶¨Ïä§?∏Î? Ï°∞Ìöå?úÎã§.
     * @param loginVO
     * @param searchVO
     * @param model
     * @return "/cmm/sym/cal/EgovRestdeList"
     * @throws Exception
     */
    @RequestMapping(value="/sym/cal/EgovRestdeList.do")
	public String selectRestdeList(@ModelAttribute("loginVO") LoginVO loginVO, @ModelAttribute("searchVO") RestdeVO searchVO) throws Exception {
    	/** EgovPropertyService.sample */
    	searchVO.setPageUnit(propertiesService.getInt("pageUnit"));
    	searchVO.setPageSize(propertiesService.getInt("pageSize"));

    	/** pageing */
    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(searchVO.getPageIndex());
		paginationInfo.setRecordCountPerPage(searchVO.getPageUnit());
		paginationInfo.setPageSize(searchVO.getPageSize());
		
		searchVO.setFirstIndex(paginationInfo.getFirstRecordIndex());
		searchVO.setLastIndex(paginationInfo.getLastRecordIndex());
		searchVO.setRecordCountPerPage(paginationInfo.getRecordCountPerPage());
		
        resultMap.put("resultList", restdeManageService.selectRestdeList(searchVO));
        
        int totCnt = restdeManageService.selectRestdeListTotCnt(searchVO);
		paginationInfo.setTotalRecordCount(totCnt);
        resultMap.put("paginationInfo", paginationInfo);
        
        return resultMap;
	}

    /**
	 * ?¥Ïùº???òÏ†ï?úÎã§.
     * @param loginVO
     * @param restde
     * @param bindingResult
     * @param commandMap
     * @param model
     * @return "/cmm/sym/cal/EgovRestdeModify"
     * @throws Exception
     */
    @RequestMapping(value="/sym/cal/EgovRestdeModify.do")
	public String updateRestde (@ModelAttribute("loginVO") LoginVO loginVO
			, @ModelAttribute("restde") Restde restde
			, BindingResult bindingResult
	, @RequestParam Map<String, Object> commandMap
	) throws Exception {
		String sCmd = commandMap.get("cmd") == null ? "" : (String) commandMap.get("cmd");
		if (sCmd.equals("")) {
			Restde vo = restdeManageService.selectRestdeDetail(restde);
			resultMap.put("restde", vo);

    		ComDefaultCodeVO CodeVO = new ComDefaultCodeVO();
    		CodeVO.setCodeId("COM017");
            resultMap.put("restdeCode", cmmUseService.selectCmmCodeDetail(CodeVO));

            return resultMap;
    	} else if (sCmd.equals("Modify")) {

    		if (bindingResult.hasErrors()){
        		ComDefaultCodeVO CodeVO = new ComDefaultCodeVO();
        		CodeVO.setCodeId("COM017");
                resultMap.put("restdeCode", cmmUseService.selectCmmCodeDetail(CodeVO));

                return resultMap;
    		}

    		restde.setLastUpdusrId(loginVO.getUniqId());
    		restdeManageService.updateRestde(restde);
	        return resultMap;
    	} else {
    		return resultMap;
    	}
    }

	
}

