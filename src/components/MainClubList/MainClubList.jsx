import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './MainClubList.styles';
import axios from 'axios';
import defaultImage from '../../asset/mainLogo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = process.env.REACT_APP_API_URL;

function FestivalList() {
  const [events, setEvents] = useState([]); // API 데이터 상태
  const [loading, setLoading] = useState(false); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/home/closedrecruitment`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        if (Array.isArray(response.data)) {
          // 모집 종료일이 '0000-00-00' 또는 null인 "상시모집" 이벤트 제외
          const filtered = response.data.filter(
            (event) =>
              event.recruitment_end_date !== '0000-00-00' &&
              event.recruitment_end_date !== null
          );

          // 모집 종료일이 가까운 순으로 정렬 (오름차순)
          filtered.sort(
            (a, b) =>
              new Date(a.recruitment_end_date) -
              new Date(b.recruitment_end_date)
          );

          // 필요한 데이터만 추출하여 상태 저장
          setEvents(
            filtered.map((event) => ({
              id: event.recruitment_id,
              club_id: event.club_id,
              title: event.recruitment_title || '제목 없음',
              endDate: new Date(
                event.recruitment_end_date
              ).toLocaleDateString(),
              main_image: event.main_image || defaultImage,
            }))
          );
        } else {
          setEvents([]);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <S.Container>Loading...</S.Container>;
  if (error) return <S.Container>Error: {error}</S.Container>;

  return (
    <>
      {/* 제목 영역: 두 줄로 나누어 표시 */}
      <S.TitleRow>
        <S.TitleText>
          <S.TitleLine>
            <S.Emphasized>마감일자</S.Emphasized> 가
          </S.TitleLine>
          <S.TitleLine>얼마 남지 않았어요!</S.TitleLine>
        </S.TitleText>
      </S.TitleRow>

      <S.Container>
        <Swiper
          spaceBetween={20}
          slidesPerView="auto"
          freeMode={true}
          grabCursor={true}
          simulateTouch={true}
          pagination={{ clickable: true }}
          mousewheel={true}
          modules={[Navigation, Pagination, Mousewheel]}
          style={{ justifyContent: 'flex-start' }}
        >
          {events.map((event) => (
            <SwiperSlide key={event.id} style={{ width: '180px' }}>
              <S.EventBox
                onClick={() =>
                  navigate(`/clubinfo/${event.club_id}`, {
                    state: { defaultTab: '모집 공고' },
                  })
                }
              >
                <S.ImageWrapper style={{ height: '180px', overflow: 'hidden' }}>
                  <img
                    src={event.main_image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  />
                </S.ImageWrapper>
                <S.Title>
                  {event.title.length > 22
                    ? `${event.title.substring(0, 22)}...`
                    : event.title}
                </S.Title>
                <S.Date>마감일자: {event.endDate}</S.Date>
              </S.EventBox>
            </SwiperSlide>
          ))}
        </Swiper>
      </S.Container>
    </>
  );
}

export default FestivalList;
