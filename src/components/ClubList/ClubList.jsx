import React, { useState, useEffect } from 'react';
import * as S from './ClubList.styles';
import axios from 'axios';
import defaultImage from '../../asset/mainLogo.png';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const API_URL = process.env.REACT_APP_API_URL;

const categories = [
  {
    title: '중앙동아리',
    items: [
      '과학기술분과',
      '레저스포츠분과',
      '사회활동분과',
      '연행예술분과',
      '준동아리',
      '종교분과',
      '창작전시분과',
      '체육분과',
      '학술언론분과',
      '기타',
    ],
  },
];

function ClubList() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  // 헤더에서 전달한 쿼리 파라미터로 초기값 설정
  const initialSearchTerm = searchParams.get('search') || '';
  const initialSelectedFilter = searchParams.get('subFilter') || '전체';

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // 좌측 사이드바에서 선택하는 상세 분과 (없으면 전체)
  const [selectedCategory, setSelectedCategory] = useState('');
  // 헤더 검색창에서 입력한 검색어 (쿼리값으로 초기화)
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  // 모집 필터 상태 (전체, 수시, 상시) – 헤더에서 전달한 값으로 초기화
  const [selectedFilter, setSelectedFilter] = useState(initialSelectedFilter);

  // 모바일 여부 감지
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 모바일일 경우 사이드바 확장 여부
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  useEffect(() => {
    if (isMobile) {
      setSidebarExpanded(false);
    }
  }, [selectedCategory, isMobile]);

  useEffect(() => {
    if (selectedCategory !== '') {
      // 사이드바 클릭 시 검색어 초기화
      setSearchTerm('');
    }
  }, [selectedCategory]);

  // API 호출: 선택한 분과(selectedCategory)와 검색어(searchTerm)를 쿼리 파라미터로 전달
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory) params.details = selectedCategory;
        if (searchTerm) params.search = searchTerm;
        const queryString = new URLSearchParams(params).toString();
        const url = `${API_URL}/api/clubs/central${
          queryString ? '?' + queryString : ''
        }`;
        console.log('API 호출 URL:', url);
        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': '69420',
          },
        });

        setEvents(
          Array.isArray(response.data)
            ? response.data.map((event) => ({
                ...event,
                image: event.logo_url || defaultImage,
                description:
                  event.club_description || '설명이 제공되지 않았습니다.',
              }))
            : []
        );
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedCategory, searchTerm]);

  if (loading) return <S.PageContainer>Loading...</S.PageContainer>;
  if (error) return <S.PageContainer>Error: {error}</S.PageContainer>;

  const handleEventClick = (id) => {
    navigate(`/clubinfo/${id}`);
  };

  // 모집 마감일 계산 함수 (수시모집의 경우 D-일수, 없으면 '상시')
  const getRecruitmentLabel = (event) => {
    if (!event.recruitment_type) {
      return '상시';
    } else if (event.recruitment_type === '수시모집') {
      const today = new Date();
      const endDate = new Date(event.recruitment_end_date);
      const diffTime = endDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 0 ? '마감' : `D-${diffDays}`;
    }
    return '';
  };
  const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
  // 클라이언트 측 필터링: 검색어로 시작하는 club_name만 선택 (대소문자 무시, trim 적용)
  let filteredEvents = events.filter((event) =>
    normalize(event.club_name?.trim() || '').startsWith(
      normalize(searchTerm.trim())
    )
  );
  // 모집 필터 적용: '수시' 또는 '상시' 선택 시 해당 조건으로 필터링 (기본 '전체'는 필터링하지 않음)
  if (selectedFilter === '수시') {
    filteredEvents = filteredEvents.filter(
      (event) => event.recruitment_type === '수시모집'
    );
  } else if (selectedFilter === '상시') {
    filteredEvents = filteredEvents.filter(
      (event) => !event.recruitment_type || event.recruitment_type === '상시'
    );
  }

  // breadcrumb 생성: recruitment filter와 사이드바 상세 분과를 모두 반영
  const breadcrumb = `중앙동아리 > ${selectedFilter}${
    selectedCategory ? ' > ' + selectedCategory : ''
  }`;

  return (
    <S.PageContainer>
      <S.Sidebar>
        {isMobile ? (
          <>
            <S.SidebarHeader
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
            >
              <S.SidebarTitle>{categories[0].title}</S.SidebarTitle>
              {sidebarExpanded ? <FaChevronUp /> : <FaChevronDown />}
            </S.SidebarHeader>
            <S.SidebarList expanded={sidebarExpanded}>
              {categories[0].items.map((item, index) => (
                <S.SidebarItem
                  key={index}
                  onClick={() => {
                    setSelectedCategory(item);
                    setSelectedFilter('전체'); // 모집 필터 리셋
                    setSidebarExpanded(false);
                  }}
                  isSelected={selectedCategory === item}
                >
                  {item}
                </S.SidebarItem>
              ))}
            </S.SidebarList>
          </>
        ) : (
          <>
            <S.SidebarTitle>{categories[0].title}</S.SidebarTitle>
            <S.SidebarList>
              {categories[0].items.map((item, index) => (
                <S.SidebarItem
                  key={index}
                  onClick={() => {
                    setSelectedCategory(item);
                    setSelectedFilter('전체'); // 모집 필터 리셋
                  }}
                  isSelected={selectedCategory === item}
                >
                  {item}
                </S.SidebarItem>
              ))}
            </S.SidebarList>
          </>
        )}
      </S.Sidebar>

      <S.Content>
        <S.TopBar>
          <S.Title1>{breadcrumb}</S.Title1>

          {/* 데스크탑용 필터 버튼 */}
          {!isMobile && (
            <S.FilterContainer>
              <S.FilterButton
                onClick={() => setSelectedFilter('전체')}
                isSelected={selectedFilter === '전체'}
              >
                전체
              </S.FilterButton>
              <S.FilterButton
                onClick={() => setSelectedFilter('수시')}
                isSelected={selectedFilter === '수시'}
              >
                수시
              </S.FilterButton>
              <S.FilterButton
                onClick={() => setSelectedFilter('상시')}
                isSelected={selectedFilter === '상시'}
              >
                상시
              </S.FilterButton>
            </S.FilterContainer>
          )}
        </S.TopBar>

        <S.TitleBar />
        <S.Container>
          {filteredEvents.map((event) => (
            <S.EventBox
              key={event.club_id}
              onClick={() => handleEventClick(event.club_id)}
            >
              <S.ImageWrapper data-label={getRecruitmentLabel(event)}>
                <LazyLoadImage
                  src={event.image}
                  alt={event.club_name}
                  effect="blur"
                  width="100%"
                  height="100%"
                />
              </S.ImageWrapper>
              <S.Title>{event.club_name}</S.Title>
              <S.Description>
                {event.description.length > 25
                  ? `${event.description.slice(0, 25)}...`
                  : event.description}
              </S.Description>
            </S.EventBox>
          ))}
        </S.Container>
      </S.Content>
    </S.PageContainer>
  );
}

export default ClubList;
