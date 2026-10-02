import apiClient from './apiClient';

export interface MainBoardArticle {
  id: number | string;
  title: string;
  content: string;
  writer: string;
  date: string;
  viewCount: number;
}

export interface MainFaqArticle {
  id: string;
  question: string;
  answer: string;
  viewCount: number;
  date: string;
}

export interface MainPollItem {
  id: string;
  title: string;
  purpose: string;
  startDate: string;
  endDate: string;
}

/**
 * 게시물 원시 데이터(대문자/카멜케이스)를 프론트엔드 모델로 정규화
 */
function normalizeBoardArticle(item: Record<string, any>): MainBoardArticle {
  const id = item.NTT_ID ?? item.nttId ?? item.id ?? '';
  const title = item.NTT_SJ ?? item.nttSj ?? item.title ?? '';
  const rawContent = item.NTT_CN ?? item.nttCn ?? item.desc ?? '';
  // HTML 태그 제거 및 텍스트만 추출
  const cleanContent = String(rawContent).replace(/<[^>]*>?/gm, '').trim();
  const writer = item.FRST_REGISTER_NM ?? item.frstRegisterNm ?? item.writer ?? '관리자';
  const rawDate = item.FRST_REGIST_PNTTM ?? item.frstRegistPnttm ?? item.date ?? '';
  const date = typeof rawDate === 'string' && rawDate.length >= 10 ? rawDate.substring(0, 10) : String(rawDate);
  const viewCount = Number(item.RDCNT ?? item.rdcnt ?? item.inqireCo ?? 0);

  return {
    id,
    title,
    content: cleanContent,
    writer,
    date,
    viewCount,
  };
}

/**
 * FAQ 원시 데이터 정규화
 */
function normalizeFaqArticle(item: Record<string, any>): MainFaqArticle {
  const id = item.faqId ?? item.FAQ_ID ?? '';
  const question = item.qestnSj ?? item.QESTN_SJ ?? item.q ?? '';
  const rawAnswer = item.answerCn ?? item.ANSWER_CN ?? item.a ?? '';
  const cleanAnswer = String(rawAnswer).replace(/<[^>]*>?/gm, '').trim();
  const viewCount = Number(item.inqireCo ?? item.INQIRE_CO ?? 0);
  const rawDate = item.frstRegisterPnttm ?? item.FRST_REGISTER_PNTTM ?? '';
  const date = typeof rawDate === 'string' && rawDate.length >= 10 ? rawDate.substring(0, 10) : '';

  return {
    id,
    question,
    answer: cleanAnswer,
    viewCount,
    date,
  };
}

/**
 * 설문지 원시 데이터 정규화
 */
function normalizePollItem(item: Record<string, any>): MainPollItem {
  const id = item.qestnrId ?? item.QESTNR_ID ?? '';
  const title = item.qestnrSj ?? item.QESTNR_SJ ?? '';
  const purpose = item.qestnrPurps ?? item.QESTNR_PURPS ?? '';
  const startDate = item.qestnrBgnDe ?? item.QESTNR_BGN_DE ?? '';
  const endDate = item.qestnrEndDe ?? item.QESTNR_END_DE ?? '';

  return {
    id,
    title,
    purpose,
    startDate,
    endDate,
  };
}

/**
 * 공지사항 게시판 목록 조회 (상위 N개)
 */
export async function fetchMainNotices(count = 5): Promise<MainBoardArticle[]> {
  try {
    const response: any = await apiClient.get('/board/bbs/selectBoardList', {
      params: {
        bbsId: 'BBSMSTR_AAAAAAAAAAAA',
        useAt: 'Y',
        pageIndex: 1,
        recordCountPerPage: count,
      },
    });

    const list = response?.result || response?.resultList || [];
    return list.slice(0, count).map(normalizeBoardArticle);
  } catch (error) {
    console.error('공지사항 목록 조회 실패:', error);
    return [];
  }
}

/**
 * 자유게시판 목록 조회 (상위 N개)
 */
export async function fetchMainFreeArticles(count = 5): Promise<MainBoardArticle[]> {
  try {
    const response: any = await apiClient.get('/board/bbs/selectBoardList', {
      params: {
        bbsId: 'BBSMSTR_BBBBBBBBBBBB',
        useAt: 'Y',
        pageIndex: 1,
        recordCountPerPage: count,
      },
    });

    const list = response?.result || response?.resultList || [];
    return list.slice(0, count).map(normalizeBoardArticle);
  } catch (error) {
    console.error('자유게시판 목록 조회 실패:', error);
    return [];
  }
}

/**
 * FAQ 목록 조회 (상위 N개)
 */
export async function fetchMainFaqs(count = 3): Promise<MainFaqArticle[]> {
  try {
    const response: any = await apiClient.get('/user/help/faq/selectFaqList.api', {
      params: {
        pageIndex: 1,
        recordCountPerPage: count,
      },
    });

    const list = response?.resultList || response?.result || [];
    return list.slice(0, count).map(normalizeFaqArticle);
  } catch (error) {
    console.error('FAQ 목록 조회 실패:', error);
    return [];
  }
}

/**
 * 최신 설문조사 목록 조회 (상위 N개)
 */
export async function fetchMainPolls(count = 1): Promise<MainPollItem[]> {
  try {
    const response: any = await apiClient.get('/user/poll/qmc/selectQustnrList.api', {
      params: {
        pageIndex: 1,
        recordCountPerPage: count,
      },
    });

    const list = response?.resultList || response?.result || [];
    return list.slice(0, count).map(normalizePollItem);
  } catch (error) {
    console.error('설문조사 목록 조회 실패:', error);
    return [];
  }
}
