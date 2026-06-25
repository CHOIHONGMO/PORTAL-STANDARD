package com.portal.system.calendar.web;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

import org.apache.commons.collections.map.ListOrderedMap;
import org.egovframe.rte.fdl.property.EgovPropertyService;
import org.egovframe.rte.ptl.mvc.tags.ui.pagination.PaginationInfo;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.validation.BindingResult;

import com.portal.common.model.LoginVO;
import com.portal.common.service.CmmUseService;
import com.portal.system.calendar.service.CalRestdeManageService;
import jakarta.annotation.Resource;

/**
 * 공통달력 관련 컨트롤러 클래스
 * @author ST-Ones Corp.
 * @since 2009.04.01
 * @version 1.0
 */
@RestController
public class CalRestdeManageController {

	@Resource(name = "RestdeManageService")
    private CalRestdeManageService restdeManageService;

    @Resource(name = "propertiesService")
    protected EgovPropertyService propertiesService;

	@Resource(name="CmmUseService")
	private CmmUseService cmmUseService;

	@RequestMapping(value = "/sym/cmm/callCalPopup.do")
	public Map<String, Object> callCalendar() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    
	
	@RequestMapping(value = "/sym/cmm/callCal.do")
	public Map<String, Object> callCal(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);

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
		
		commandMap.put("startWeekMonth", firstWeek);
		commandMap.put("lastDayMonth", lastDay);
		commandMap.put("year", year);
		commandMap.put("month", month);
		
		List<ListOrderedMap> CalInfoList = new ArrayList<ListOrderedMap>();
		String tmpDay = "";
		
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
        resultMap.put("resultList", CalInfoList);
		return resultMap;
	}    
	
	@RequestMapping(value = "/sym/cmm/EgovNormalCalPopup.do")
	public Map<String, Object> callNormalCalPopup() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    

	@RequestMapping(value = "/sym/cmm/EgovselectNormalCalendar.do")
	public Map<String, Object> selectNormalRestdePopup(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);

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
 
        commandMap.put("startWeekMonth", firstWeek);
        commandMap.put("lastDayMonth", lastDay);
        commandMap.put("year", year);
        commandMap.put("month", month);
 
        List<ListOrderedMap> CalInfoList = new ArrayList<ListOrderedMap>();
        String tmpDay = "";
 
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
        resultMap.put("resultList", CalInfoList);
		return resultMap;
	}
	
	@RequestMapping(value = "/sym/cmm/EgovAdministCalPopup.do")
	public Map<String, Object> callAdministCalPopup() throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		return resultMap;
	}    
	
	@RequestMapping(value = "/sym/cmm/EgovselectAdministCalendar.do")
	public Map<String, Object> selectAdministRestdePopup(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);

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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectAdministRestdePopup(commandMap));
		return resultMap;
	}

	@RequestMapping(value = "/sym/cal/EgovNormalDayCalendar.do")
	public Map<String, Object> selectNormalDayCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));
		String dayVal = commandMap.get("day") == null ? "" : String.valueOf(commandMap.get("day"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		if(dayVal.equals("")){
			dayVal = Integer.toString(cal.get(Calendar.DATE));
			commandMap.put("day", dayVal);
		}

		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);
		int iDay   = Integer.parseInt(dayVal);
		
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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,iDay);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(String.valueOf(commandMap.get("day"))));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		commandMap.put("year", Integer.toString(cal.get(Calendar.YEAR)));
		commandMap.put("month", Integer.toString(cal.get(Calendar.MONTH)+1));
		commandMap.put("day", Integer.toString(cal.get(Calendar.DAY_OF_MONTH)));
		commandMap.put("week", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
		
        resultMap.put("resultList", restdeManageService.selectNormalDayCal(commandMap));
        resultMap.put("RestdeList", restdeManageService.selectNormalDayRestde(commandMap));
        
		return resultMap;
	}
	
	@RequestMapping(value = "/sym/cal/EgovNormalWeekCalendar.do")
	public Map<String, Object> selectNormalWeekCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));
		String dayVal = commandMap.get("day") == null ? "" : String.valueOf(commandMap.get("day"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		if(dayVal.equals("")){
			dayVal = Integer.toString(cal.get(Calendar.DATE));
			commandMap.put("day", dayVal);
		}

		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);
		
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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(String.valueOf(commandMap.get("day"))));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		int iStartWeek = (int) commandMap.get("startWeekMonth"); 
		int iLastDate  = (int) commandMap.get("lastDayMonth");
		int iDayWeek  = cal.get(Calendar.DAY_OF_WEEK);
		
		int iMaxWeeks = (int)Math.floor(iLastDate/7);
		iMaxWeeks = iMaxWeeks + (int)Math.ceil(((iLastDate - iMaxWeeks * 7) + iStartWeek - 1) / 7.0);
		commandMap.put("maxWeeks", iMaxWeeks);
		
		int weeksVal = commandMap.get("weeks") == null ? 0 : Integer.parseInt(String.valueOf(commandMap.get("weeks")));
		if (iMaxWeeks < weeksVal) {
			weeksVal = iMaxWeeks;
			commandMap.put("weeks", weeksVal);
		}
		
		Map<String, Object> vo = new HashMap<>();
		Calendar weekCal = Calendar.getInstance();
		weekCal.setTime(cal.getTime());
		
		if(weeksVal != 0){
			weekCal.set(Calendar.DATE, (weeksVal - 1) * 7 + 1);
			if(weeksVal > 1){
				iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);
				weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
			}
			commandMap.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)+1));
		}

		iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);

		// 일요일
		weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
		resultMap.put("resultList_1", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_1", restdeManageService.selectNormalDayRestde(vo));
        
		// 월요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_2", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_2", restdeManageService.selectNormalDayRestde(vo));

        // 화요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_3", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_3", restdeManageService.selectNormalDayRestde(vo));

        // 수요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_4", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_4", restdeManageService.selectNormalDayRestde(vo));

        // 목요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_5", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_5", restdeManageService.selectNormalDayRestde(vo));

        // 금요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_6", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_6", restdeManageService.selectNormalDayRestde(vo));
		
        // 토요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_7", restdeManageService.selectNormalDayCal(vo));
        resultMap.put("RestdeList_7", restdeManageService.selectNormalDayRestde(vo));

        resultMap.put("resultList", restdeManageService.selectNormalDayCal(commandMap));
        return resultMap;
	}	

	@RequestMapping(value = "/sym/cal/EgovNormalMonthCalendar.do")
	public Map<String, Object> selectNormalMonthCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);

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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectNormalRestdePopup(commandMap));
        resultMap.put("RestdeList", restdeManageService.selectNormalMonthRestde(commandMap));

        return resultMap;
	}	
	
	@RequestMapping(value = "/sym/cal/EgovNormalYearCalendar.do")
	public Map<String, Object> selectNormalYearCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		int iYear  = Integer.parseInt(yearVal);

		if (iYear<1){
			iYear = 1;
		}
		if (iYear>9999){
			iYear = 9999;
		}
		commandMap.put("year", Integer.toString(iYear));
		
		/* 1월 */
		int iMonth = 1;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_1" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_1" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 2월 */
		iMonth = 2;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_2" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_2" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 3월 */
		iMonth = 3;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_3" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_3" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 4월 */
		iMonth = 4;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_4" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_4" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 5월 */
		iMonth = 5;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_5" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_5" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 6월 */
		iMonth = 6;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_6" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_6" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 7월 */
		iMonth = 7;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_7" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_7" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 8월 */
		iMonth = 8;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_8" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_8" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 9월 */
		iMonth = 9;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_9" , restdeManageService.selectNormalRestdePopup(commandMap) );
        resultMap.put("RestdeList_9" , restdeManageService.selectNormalMonthRestde(commandMap) );

		/* 10월 */
		iMonth = 10;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_10", restdeManageService.selectNormalRestdePopup(commandMap));
        resultMap.put("RestdeList_10", restdeManageService.selectNormalMonthRestde(commandMap));

		/* 11월 */
		iMonth = 11;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_11", restdeManageService.selectNormalRestdePopup(commandMap));
        resultMap.put("RestdeList_11", restdeManageService.selectNormalMonthRestde(commandMap));

		/* 12월 */
		iMonth = 12;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_12", restdeManageService.selectNormalRestdePopup(commandMap));
        resultMap.put("RestdeList_12", restdeManageService.selectNormalMonthRestde(commandMap));

        return resultMap;
	}	
	
	@RequestMapping(value = "/sym/cal/EgovAdministDayCalendar.do")
	public Map<String, Object> selectAdministDayCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));
		String dayVal = commandMap.get("day") == null ? "" : String.valueOf(commandMap.get("day"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		if(dayVal.equals("")){
			dayVal = Integer.toString(cal.get(Calendar.DATE));
			commandMap.put("day", dayVal);
		}

		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);
		int iDay   = Integer.parseInt(dayVal);
		
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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,iDay);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(String.valueOf(commandMap.get("day"))));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		commandMap.put("year", Integer.toString(cal.get(Calendar.YEAR)));
		commandMap.put("month", Integer.toString(cal.get(Calendar.MONTH)+1));
		commandMap.put("day", Integer.toString(cal.get(Calendar.DAY_OF_MONTH)));
		commandMap.put("week", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
		
        resultMap.put("resultList", restdeManageService.selectAdministDayCal(commandMap));
        resultMap.put("RestdeList", restdeManageService.selectAdministDayRestde(commandMap));
        
		return resultMap;
	}
	
	@RequestMapping(value = "/sym/cal/EgovAdministWeekCalendar.do")
	public Map<String, Object> selectAdministWeekCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));
		String dayVal = commandMap.get("day") == null ? "" : String.valueOf(commandMap.get("day"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		if(dayVal.equals("")){
			dayVal = Integer.toString(cal.get(Calendar.DATE));
			commandMap.put("day", dayVal);
		}

		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);
		
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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));

		cal.set(iYear,iMonth-1,Integer.parseInt(String.valueOf(commandMap.get("day"))));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DAY_OF_MONTH));

		int iStartWeek = (int) commandMap.get("startWeekMonth"); 
		int iLastDate  = (int) commandMap.get("lastDayMonth");
		int iDayWeek  = cal.get(Calendar.DAY_OF_WEEK);
		
		int iMaxWeeks = (int)Math.floor(iLastDate/7);
		iMaxWeeks = iMaxWeeks + (int)Math.ceil(((iLastDate - iMaxWeeks * 7) + iStartWeek - 1) / 7.0);
		commandMap.put("maxWeeks", iMaxWeeks);
		
		int weeksVal = commandMap.get("weeks") == null ? 0 : Integer.parseInt(String.valueOf(commandMap.get("weeks")));
		if (iMaxWeeks < weeksVal) {
			weeksVal = iMaxWeeks;
			commandMap.put("weeks", weeksVal);
		}

		Map<String, Object> vo = new HashMap<>();
		Calendar weekCal = Calendar.getInstance();
		weekCal.setTime(cal.getTime());
		
		if(weeksVal != 0){
			weekCal.set(Calendar.DATE, (weeksVal - 1) * 7 + 1);
			if(weeksVal > 1){
				iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);
				weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
			}
			commandMap.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)+1));
		}
		resultMap.put("resultList", restdeManageService.selectAdministDayCal(commandMap));
		
		iDayWeek  = weekCal.get(Calendar.DAY_OF_WEEK);

		// 일요일
		weekCal.add(Calendar.DATE, (-1)*(iDayWeek-1));
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_1", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_1", restdeManageService.selectAdministDayRestde(vo));
        
		// 월요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_2", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_2", restdeManageService.selectAdministDayRestde(vo));

        // 화요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_3", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_3", restdeManageService.selectAdministDayRestde(vo));

        // 수요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_4", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_4", restdeManageService.selectAdministDayRestde(vo));

        // 목요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_5", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_5", restdeManageService.selectAdministDayRestde(vo));

        // 금요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_6", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_6", restdeManageService.selectAdministDayRestde(vo));

        // 토요일
		weekCal.add(Calendar.DATE, 1);
		vo.put("year", Integer.toString(weekCal.get(Calendar.YEAR)));
		vo.put("month", Integer.toString(weekCal.get(Calendar.MONTH)+1));
		vo.put("day", Integer.toString(weekCal.get(Calendar.DAY_OF_MONTH)));
		vo.put("week", weekCal.get(Calendar.DAY_OF_WEEK));
        resultMap.put("resultList_7", restdeManageService.selectAdministDayCal(vo));
        resultMap.put("RestdeList_7", restdeManageService.selectAdministDayRestde(vo));

		return resultMap;
	}
	
	@RequestMapping(value = "/sym/cal/EgovAdministMonthCalendar.do")
	public Map<String, Object> selectAdministMonthCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));
		String monthVal = commandMap.get("month") == null ? "" : String.valueOf(commandMap.get("month"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		if(monthVal.equals("")){
			monthVal = Integer.toString(cal.get(Calendar.MONTH)+1);
			commandMap.put("month", monthVal);
		}
		int iYear  = Integer.parseInt(yearVal);
		int iMonth = Integer.parseInt(monthVal);

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
		commandMap.put("year", Integer.toString(iYear));
		commandMap.put("month", Integer.toString(iMonth));
		
		cal.set(iYear,iMonth-1,1);
		
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));

        resultMap.put("resultList", restdeManageService.selectAdministRestdePopup(commandMap));
        resultMap.put("RestdeList", restdeManageService.selectAdministMonthRestde(commandMap));

        return resultMap;
	}	

	@RequestMapping(value = "/sym/cal/EgovAdministYearCalendar.do")
	public Map<String, Object> selectAdministYearCalendar(@RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Calendar cal = Calendar.getInstance();

		String yearVal = commandMap.get("year") == null ? "" : String.valueOf(commandMap.get("year"));

		if(yearVal.equals("")){
			yearVal = Integer.toString(cal.get(Calendar.YEAR));
			commandMap.put("year", yearVal);
		}
		int iYear  = Integer.parseInt(yearVal);

		if (iYear<1){
			iYear = 1;
		}
		if (iYear>9999){
			iYear = 9999;
		}
		commandMap.put("year", Integer.toString(iYear));
		
		/* 1월 */
		int iMonth = 1;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_1" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_1" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 2월 */
		iMonth = 2;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_2" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_2" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 3월 */
		iMonth = 3;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_3" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_3" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 4월 */
		iMonth = 4;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_4" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_4" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 5월 */
		iMonth = 5;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_5" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_5" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 6월 */
		iMonth = 6;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_6" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_6" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 7월 */
		iMonth = 7;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_7" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_7" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 8월 */
		iMonth = 8;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_8" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_8" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 9월 */
		iMonth = 9;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_9" , restdeManageService.selectAdministRestdePopup(commandMap) );
        resultMap.put("RestdeList_9" , restdeManageService.selectAdministMonthRestde(commandMap) );
        
		/* 10월 */
		iMonth = 10;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_10", restdeManageService.selectAdministRestdePopup(commandMap));
        resultMap.put("RestdeList_10", restdeManageService.selectAdministMonthRestde(commandMap));
        
		/* 11월 */
		iMonth = 11;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_11", restdeManageService.selectAdministRestdePopup(commandMap));
        resultMap.put("RestdeList_11", restdeManageService.selectAdministMonthRestde(commandMap));
        
		/* 12월 */
		iMonth = 12;
		commandMap.put("month", Integer.toString(iMonth));
		cal.set(iYear,iMonth-1,1);
		commandMap.put("startWeekMonth", cal.get(Calendar.DAY_OF_WEEK));
		commandMap.put("lastDayMonth", cal.getActualMaximum(Calendar.DATE));
        resultMap.put("resultList_12", restdeManageService.selectAdministRestdePopup(commandMap));
        resultMap.put("RestdeList_12", restdeManageService.selectAdministMonthRestde(commandMap));

        return resultMap;
	}	
	
    @RequestMapping(value="/sym/cal/EgovRestdeRemove.do")
	public Map<String, Object> deleteRestde(@ModelAttribute("loginVO") LoginVO loginVO, @RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
    	restdeManageService.deleteRestde(commandMap);
        return resultMap;
	}

	@RequestMapping(value="/sym/cal/EgovRestdeDetail.do")
	public Map<String, Object> selectRestdeDetail(@ModelAttribute("loginVO") LoginVO loginVO, @RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		Map<String, Object> vo = restdeManageService.selectRestdeDetail(commandMap);
		resultMap.put("result", vo);
		return resultMap;
	}

    @RequestMapping(value="/sym/cal/EgovRestdeList.do")
	public Map<String, Object> selectRestdeList(@ModelAttribute("loginVO") LoginVO loginVO, @RequestParam Map<String, Object> commandMap) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		
		int pageIndex = commandMap.get("pageIndex") != null ? Integer.parseInt(String.valueOf(commandMap.get("pageIndex"))) : 1;
		int pageUnit = propertiesService.getInt("pageUnit");
		int pageSize = propertiesService.getInt("pageSize");

    	PaginationInfo paginationInfo = new PaginationInfo();
		paginationInfo.setCurrentPageNo(pageIndex);
		paginationInfo.setRecordCountPerPage(pageUnit);
		paginationInfo.setPageSize(pageSize);
		
		commandMap.put("firstIndex", paginationInfo.getFirstRecordIndex());
		commandMap.put("lastIndex", paginationInfo.getLastRecordIndex());
		commandMap.put("recordCountPerPage", paginationInfo.getRecordCountPerPage());
		
        resultMap.put("resultList", restdeManageService.selectRestdeList(commandMap));
        
        int totCnt = restdeManageService.selectRestdeListTotCnt(commandMap);
		paginationInfo.setTotalRecordCount(totCnt);
        resultMap.put("paginationInfo", paginationInfo);
        
        return resultMap;
	}

    @RequestMapping(value="/sym/cal/EgovRestdeModify.do")
	public Map<String, Object> updateRestde (@ModelAttribute("loginVO") LoginVO loginVO
			, @RequestParam Map<String, Object> commandMap
			, BindingResult bindingResult
	) throws Exception {
		Map<String, Object> resultMap = new HashMap<>();
		String sCmd = commandMap.get("cmd") == null ? "" : (String) commandMap.get("cmd");
		if (sCmd.equals("")) {
			Map<String, Object> vo = restdeManageService.selectRestdeDetail(commandMap);
			resultMap.put("restde", vo);

    		Map<String, Object> CodeVO = new HashMap<>();
    		CodeVO.put("codeId", "COM017");
            resultMap.put("restdeCode", cmmUseService.selectCmmCodeDetail(CodeVO));

            return resultMap;
    	} else if (sCmd.equals("Modify")) {

    		if (bindingResult.hasErrors()){
        		Map<String, Object> CodeVO = new HashMap<>();
        		CodeVO.put("codeId", "COM017");
                resultMap.put("restdeCode", cmmUseService.selectCmmCodeDetail(CodeVO));

                return resultMap;
    		}

    		commandMap.put("lastUpdusrId", loginVO.getUniqId());
    		restdeManageService.updateRestde(commandMap);
	        return resultMap;
    	} else {
    		return resultMap;
    	}
    }
}
