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
  const response: any = await apiClient.post('/api/pr/doSearch', data);
  return response;
};
