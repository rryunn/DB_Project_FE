import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// 만약 URL에 쿼리 파라미터가 있다면 (404.html에서 전달된 경우)
const search = window.location.search;
if (search && search.startsWith("?")) {
  // '?' 이후의 문자열을 디코딩하여 원래 경로를 가져옴
  const path = decodeURIComponent(search.slice(1));
  console.log("리디렉션할 경로: ", path);
  // 브라우저 URL을 원래 경로로 교체 (페이지 새로고침 시 올바른 경로로 동작)
  window.history.replaceState(null, "", path);
}

ReactDOM.render(<App />, document.getElementById("root"));
