import styled from 'styled-components';

/* ✅ 모집공고 목록 페이지로 이동하는 제목 */
export const TitleLink = styled.h1`
  width: 100%;
  font-size: 14px;
  font-weight: 700;
  color: #1d1d1f;
  text-align: center;
  margin-bottom: 10px;
  margin-left: 10px;
  margin-top: 20px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #0056b3;
  }
`;
export const EventBox = styled.div`
  width: 180px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.3s ease;
  margin-bottom: 30px;
  cursor: pointer;

  &:hover {
    transform: translateY(-10px);
  }
`;

/* ✅ "더보기" 버튼 스타일 (기존 카드 스타일과 동일) */
export const MoreBox = styled(EventBox)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const TitleRow = styled.div`
  display: flex;
  justify-content: center; /* 중앙 정렬 */
  align-items: center;
  width: 100%;
  padding: 20px 40px;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);

  @media (max-width: 768px) {
    padding: 10px 20px;
  }
`;

/* 제목 텍스트 전체 */
export const TitleText = styled.h1`
  font-size: 20px; /* 기본 폰트 크기 */
  font-weight: bold;
  color: #1d1d1f;
  margin: 0;
  text-align: center;
  line-height: 1.4;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

export const MoreButton = styled.button`
  display: block;
  margin: 10px auto; /* 가운데 정렬 및 상하 간격 추가 */

  font-size: 16px;
  color: black;
  background-color: rgb(207, 204, 204);
  border: 1px solid rgb(224, 224, 224);
  padding: 6px 20px; /* 좌우 패딩을 늘려 타원형 효과 */
  border-radius: 20px; /* 타원 모양 */
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(132, 142, 160);
  }
`;

/* 기존 스타일들 그대로 유지 */
export const Container = styled.div`
  padding: 0 40px;
  padding-top: 20px;
  background-color: rgb(255, 255, 255);
  padding-bottom: 40px;
  @media (max-width: 768px) {
    padding: 0 20px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
`;

export const MoreText = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #007aff;
  text-align: center;
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

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
