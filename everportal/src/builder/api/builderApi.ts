// =====================================================================
// Visual Screen Builder — API 호출 함수
// eversrm 빌더 API와 통신
// =====================================================================

import apiClient from '@/api/apiClient';
import type { ScreenDefinition, GeneratedCode } from '@/builder/types/screenDefinition';

/**
 * eversrm 서버에 파일 생성 요청
 * 생성된 코드를 실제 파일 시스템에 저장합니다.
 */
export const generateAndSaveFiles = async (
  screen: ScreenDefinition,
  generatedCode: GeneratedCode
): Promise<{ resultCode: string; resultMessage: string; savedFiles: string[] }> => {
  const response: any = await apiClient.post('/builder/generate', {
    screenDefinition: screen,
    generatedCode,
  });
  return response;
};

/**
 * 저장된 화면 정의 목록 조회
 */
export const fetchScreenList = async (): Promise<ScreenDefinition[]> => {
  const response: any = await apiClient.get('/builder/screens');
  return response?.screens || [];
};

/**
 * 화면 정의 저장 (JSON 메타 파일)
 */
export const saveScreenDefinition = async (
  screen: ScreenDefinition
): Promise<{ resultCode: string; resultMessage: string }> => {
  const response: any = await apiClient.post('/builder/screens', screen);
  return response;
};

/**
 * 화면 정의 삭제
 */
export const deleteScreenDefinition = async (
  screenId: string
): Promise<{ resultCode: string; resultMessage: string }> => {
  const response: any = await apiClient.delete(`/builder/screens/${screenId}`);
  return response;
};
