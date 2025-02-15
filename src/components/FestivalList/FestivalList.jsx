import React, { useState, useEffect } from "react";
import * as S from "./FestivalList.styles"; // 스타일 정의
import axios from "axios";
import defaultImage from "../../asset/mainLogo.png"; // 기본 이미지 불러오기

// Swiper 관련 import
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const API_URL = process.env.REACT_APP_API_URL;

function FestivalList() {
  const [events, setEvents] = useState([]); // API 데이터 상태 관리
  const [loading, setLoading] = useState(false); // 로딩 상태 관리
  const [error, setError] = useState(null); // 에러 상태 관리

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/home/updatedevent`, {
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "69420",
          },
        });
        console.log("API Response:", response.data);
        setEvents(
          Array.isArray(response.data)
            ? response.data.map((event) => ({
                ...event,
                image: event.image || defaultImage, // 기본 이미지 설정
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
    <S.Container>
      <S.Title1>새로운 행사가 올라왔어요 {">"}</S.Title1>
      <Swiper
        spaceBetween={20}
        slidesPerView="auto"
        freeMode={true}
        grabCursor={true}
        simulateTouch={true}
        pagination={{ clickable: true }}
        mousewheel={true}
        modules={[Navigation, Pagination, Mousewheel]}
        style={{ justifyContent: "flex-start" }}
      >
        {events.map((event) => (
          <SwiperSlide key={event.id} style={{ width: "180px" }}>
            <S.EventBox>
              <S.ImageWrapper style={{ height: "180px", overflow: "hidden" }}>
                <img
                  src={event.image}
                  alt={event.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "10px" }}
                />
              </S.ImageWrapper>
              <S.Title>{event.title}</S.Title>
              <S.Location>{event.location}</S.Location>
              <S.Date>{new Date(event.event_date).toLocaleDateString()}</S.Date>
            </S.EventBox>
          </SwiperSlide>
        ))}
      </Swiper>
    </S.Container>
  );
}

export default FestivalList;
