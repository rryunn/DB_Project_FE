import React, { useEffect } from 'react';
import AppRouter from './router.jsx';
import GlobalStyle from './GlobalStyle';
import { setupAxiosInterceptors } from './axiosInterceptor';

// 사용 예
function App() {
  useEffect(() => {
    setupAxiosInterceptors(); // ✅ 앱이 실행될 때 한 번만 실행
  }, []);
  return (
    <>
      <GlobalStyle />
      <div className="App">
        <AppRouter />
      </div>
    </>
  );
}

export default App;
