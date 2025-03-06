import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as S from './Header.styles';

function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // 검색어 상태
  const [searchTerm, setSearchTerm] = useState('');

  // 검색 입력 클릭 시, SearchPage로 이동
  const handleSearchInputClick = () => {
    navigate('/searchPage');
  };

  return (
    <S.HeaderContainer>
      {/* 상단 바: 로고, 검색 입력(클릭 시 SearchPage로 이동), 로그인 */}
      <S.TopBar>
        <S.LogoSection onClick={() => navigate('/')}>
          <S.LogoText>ACM</S.LogoText>
        </S.LogoSection>

        {/* 검색 입력창 (readOnly) */}
        <S.SearchWrapper onClick={handleSearchInputClick}>
          <S.SearchInput
            placeholder="동아리 검색하기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            readOnly
          />
        </S.SearchWrapper>

        {/* 로그인 버튼 */}
        <S.LoginButton onClick={() => navigate('/login')}>내정보</S.LoginButton>
      </S.TopBar>

      {/* 네비게이션 바는 SearchPage에서는 보이지 않도록 함 */}
      {location.pathname !== '/searchPage' && (
        <S.NavBar>
          <S.NavBarInner>
            <S.NavItem
              isActive={location.pathname === '/'}
              onClick={() => navigate('/')}
            >
              홈
            </S.NavItem>
            <S.NavItem
              isActive={location.pathname === '/clublist'}
              onClick={() => navigate('/clublist')}
            >
              중앙동아리
            </S.NavItem>
            <S.NavItem
              isActive={location.pathname === '/miniclublist'}
              onClick={() => navigate('/miniclublist')}
            >
              소학회
            </S.NavItem>
          </S.NavBarInner>
        </S.NavBar>
      )}
    </S.HeaderContainer>
  );
}

export default Header;
