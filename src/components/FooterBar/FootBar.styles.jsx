import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: #1e1e1e;
  color: #fff;
  padding: 30px 20px;

  @media (max-width: 768px) {
    padding: 30px 0; /* 모바일에서는 좌우 패딩 제거 */
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const LogoSection = styled.div`
  flex: 1;

  @media (max-width: 768px) {
    order: 1;
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`;

export const Logo = styled.img`
  height: 90px;
  opacity: 0.5;
  width: 230px;
`;

export const TextSection = styled.div`
  flex: 3;
  text-align: center;

  @media (max-width: 768px) {
    order: 2;
    width: 100%;
    margin-bottom: 20px;
  }
`;

export const Address = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;

export const Contact = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;

export const Copyright = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;

export const EmailLink = styled.div`
  font-size: 15px;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #ccc;
  }
`;

export const IconSection = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 30px;

  @media (max-width: 768px) {
    order: 3;
    width: 100%;
    justify-content: center;
    margin-top: 20px;
  }
`;

export const IconLink = styled.a`
  color: #fff;
  font-size: 30px;
  transition: color 0.3s;

  &:hover {
    color: #ccc;
  }
`;
export const AdminEmailLink = styled.a`
  color: inherit; /* 부모 요소의 텍스트 색상 상속 */
  text-decoration: none; /* 밑줄 제거 */
  &:hover {
    text-decoration: underline; /* 호버 시 밑줄 표시 (선택 사항) */
  }
`;
export const MobileLineBreak = styled.span`
  display: none;

  @media (max-width: 768px) {
    display: inline;
  }
`;
