import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

// 🔄 Refresh Token을 사용하여 새 Access Token 요청
export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(
      `${API_URL}/api/auth/refresh`,
      {},
      { withCredentials: true }
    );

    if (response.status === 200) {
      const { accessToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      console.log('✅ Access Token이 갱신되었습니다.');
      return accessToken;
    } else {
      console.warn('❌ Refresh Token 호출 실패:', response.data.message);
      return null;
    }
  } catch (error) {
    console.error('🚨 Access Token 재발급 오류:', error);
    return null;
  }
};
