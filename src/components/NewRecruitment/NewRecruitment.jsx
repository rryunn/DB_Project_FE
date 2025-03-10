import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './NewRecruitment.styles'; // 위에 수정한 스타일 파일
import axios from 'axios';
import defaultImage from '../../asset/mainLogo.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Mousewheel } from 'swiper/modules';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const API_URL = process.env.REACT_APP_API_URL;

function FestivalList() {
  const [events, setEvents] = useState([]); // API 데이터 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${API_URL}/api/home/updatedrecruitment`,
          {
            headers: {
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': '69420',
            },
          }
        );

        setEvents(
          Array.isArray(response.data)
            ? response.data.map((event) => ({
                id: event.recruitment_id,
                club_id: event.club_id,
                title: event.recruitment_title || '제목 없음',
                endDate:
                  event.recruitment_end_date === '0000-00-00' ||
                  event.recruitment_end_date === null
                    ? '상시모집'
                    : new Date(event.recruitment_end_date).toLocaleDateString(),
                main_image: event.main_image || defaultImage,
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
  }, []);

  if (loading) return <S.Container>Loading...</S.Container>;
  if (error) return <S.Container>Error: {error}</S.Container>;

  return (
    <>
      {/* 상단 제목 및 더보기 버튼 */}
      <S.TitleRow>
        <S.TitleText>모집 소식 확인하기</S.TitleText>{' '}
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
                  {/* <img
                    src={event.main_image}
                    alt={event.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      borderRadius: '10px',
                    }}
                  /> */}
                  <LazyLoadImage
                    src={event.main_image}
                    alt={event.title}
                    effect="blur"
                    width="100%"
                    height="100%"
                    style={{
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
        </Swiper>{' '}
        <S.MoreButton onClick={() => navigate('/recruitment-list')}>
          더보기
        </S.MoreButton>
      </S.Container>
    </>
  );
}

export default FestivalList;
