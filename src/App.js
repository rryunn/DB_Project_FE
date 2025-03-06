import React from 'react';
import AppRouter from './router.jsx';
import GlobalStyle from './GlobalStyle';

// 사용 예
function App() {
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
