import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: row; /* 사이드바와 콘텐츠를 가로로 배치 */
  gap: 20px;

  max-width: 1200px; /* 디자인 기준 폭 (예: 1200px) */
  margin: 0 auto; /* 좌우 자동 여백 -> 중앙 정렬 */
  padding: 20px; /* 작은 화면일 때 내부 여백 추가 */
`;

export const Sidebar = styled.div`
  width: 140px;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 10px;
  margin-right: 30px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  position: sticky; /* 추가 */
  top: 20px; /* 고정될 위치 (상단에서 20px 떨어짐) */
  height: fit-content; /* 내용에 맞게 높이 조정 */
`;

export const SidebarTitle = styled.h2`
  font-size: 18px;
  font-weight: 700;
  color: #1d1d1f;
  margin-bottom: 10px;
`;

export const SidebarList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarItem = styled.li`
  font-size: 14px;
  font-weight: ${(props) => (props.isSelected ? "700" : "400")};
  color: ${(props) => (props.isSelected ? "#007aff" : "#333")};
  margin-bottom: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.isSelected ? "#e6f7ff" : "transparent"};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Content = styled.div`
  flex-grow: 1; /* 콘텐츠 영역이 남은 공간을 차지 */
  display: flex;
  flex-direction: column; /* 콘텐츠를 수직 정렬 */
`;
export const Title1 = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  color: #1d1d1f;
  text-align: left;
  margin-bottom: 10px;
`;
export const TitleBar = styled.div`
  width: 100%; /* 전체 너비 */
  height: 1px;
  background-color: black; /* 동아리 색상 */
  margin-bottom: 15px; /* 제목과 간격 */
  border-radius: 2px;
`;
export const Container = styled.div`
  display: grid; /* Grid 레이아웃 사용 */
  grid-template-columns: repeat(4, 1fr); /* 항상 4개의 열로 배치 */
  gap: 20px; /* 카드 간 간격 */
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr); /* 화면 크기가 줄어들면 2열로 변경 */
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* 모바일 화면에서는 1열로 변경 */
  }
`;

export const EventBox = styled.div`
  width: 180px;
  background-color: #ffffff;

  border: 0.2px solid rgb(213, 213, 213);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* 상단 라벨 스타일 */
  &::before {
    content: attr(data-label);
    position: absolute;
    top: 10px;
    left: 10px;
    background-color: #ff4d4f;
    color: white;
    font-size: 12px;
    font-weight: bold;
    padding: 4px 8px;
    border-radius: 4px;
  }
`;

export const Title = styled.h2`
  font-size: 15px;
  font-weight: 700;
  color: #1d1d1f;
  text-align: left;
  margin: 10px 10px 5px 10px;
  line-height: 1.4;
`;

export const Description = styled.p`
  font-size: 13px;
  color: #6e6e73;
  text-align: left;
  margin: 0 10px 10px 10px;
  line-height: 1.6;
`;

export const Location = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #007aff;
  text-align: left;
  margin: 0 10px;
`;

export const Date = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #8e8e93;
  text-align: left;
  margin: 5px 10px 10px 10px;
`;
