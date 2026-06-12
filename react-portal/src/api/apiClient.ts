import axios from 'axios';

// 기존 JSP 포털이 8080 포트를 사용한다고 가정합니다.
const BASE_URL = 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // 세션 기반 인증 시 필요
});

// 응답 인터셉터 (에러 처리 등 공통 로직)
apiClient.interceptors.response.use(
  (response) => {
    // 백엔드에서 내려주는 resultCode로 자체 실패 처리
    if (response.data && response.data.resultCode === 'ERROR') {
      console.error('API 비즈니스 로직 에러:', response.data.resultMessage);
      return Promise.reject(new Error(response.data.resultMessage));
    }
    return response.data;
  },
  (error) => {
    console.error('API 통신 에러:', error);
    return Promise.reject(error);
  }
);

export default apiClient;
