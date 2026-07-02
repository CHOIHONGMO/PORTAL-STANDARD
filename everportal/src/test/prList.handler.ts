import apiClient from '@/api/apiClient';
// 필요 시 스키마 파일을 import 하세요
// import * as schemas from './prList.schema';

// =====================================================================
// [자동 생성] 구매요청현황 — API Handler
// =====================================================================

/**
 * 조회
 */
export const 조회 = async (data?: any): Promise<any> => {
  try {
    // 폼 데이터를 담아 조회 API 호출
    const response = await apiClient.post('/pr/doSearch', data);
    
    // TODO: 아래와 같이 Grid State에 맞게 데이터를 바인딩하세요.
    // (예: setData_grid_xxxx(response.data || []))
    
    return response;
  } catch (error) {
    console.error('Search failed:', error);
    alert('조회 중 에러가 발생했습니다.');
  }
};
