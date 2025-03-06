import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import * as S from './SearchPage.styles';

function SearchPage() {
  // URL 쿼리로 필터 상태를 관리 (초기값)
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  const initialSubFilter = searchParams.get('subFilter') || '';
  const initialAdditional = searchParams.get('additional') || '';
  const initialSearchTerm = searchParams.get('search') || '';

  const [category, setCategory] = useState(initialCategory); // '중앙동아리' 또는 '소학회'
  const [subFilter, setSubFilter] = useState(initialSubFilter); // '전체', '수시', '상시'
  const [additionalFilter, setAdditionalFilter] = useState(initialAdditional); // 소학회 전용 (ex. '해당학과')
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);

  const navigate = useNavigate();

  // 필터 상태가 변경되면 URL 쿼리도 업데이트
  useEffect(() => {
    const params = {};
    if (category) params.category = category;
    if (subFilter) params.subFilter = subFilter;
    if (additionalFilter) params.additional = additionalFilter;
    if (searchTerm) params.search = searchTerm;
    setSearchParams(params);
  }, [category, subFilter, additionalFilter, searchTerm, setSearchParams]);

  // 선택한 필터 상태에 따라 해당 페이지로 이동
  const handleSearchNavigation = () => {
    if (!category) {
      alert('카테고리를 선택해주세요.');
      return;
    }
    // 로컬 상태를 기반으로 새로운 URLSearchParams 객체 생성
    const params = new URLSearchParams();
    params.set('category', category);
    params.set('subFilter', subFilter);
    if (additionalFilter) params.set('additional', additionalFilter);
    if (searchTerm) params.set('search', searchTerm);

    let url = '';
    if (category === '중앙동아리') {
      url = `/clublist?${params.toString()}`;
    } else if (category === '소학회') {
      url = `/miniclublist?${params.toString()}`;
    }
    navigate(url);
  };

  return (
    <S.PageContainer style={{ backgroundColor: '#fff', height: '100vh' }}>
      <S.FilterContainer>
        {/* 필터 요약 (현재 선택된 필터를 한 줄로 표시) */}
        <S.FilterSummary>
          {category ? category : '카테고리 선택'}{' '}
          {subFilter && subFilter !== '전체' ? `> ${subFilter}` : ''}{' '}
          {additionalFilter && additionalFilter !== '전체'
            ? `> ${additionalFilter}`
            : ''}
        </S.FilterSummary>

        {/* 카테고리 옵션 */}
        <S.OptionGroup>
          <S.OptionButton
            isSelected={category === '중앙동아리'}
            onClick={() => {
              setCategory('중앙동아리');
              setSubFilter('전체');
              setAdditionalFilter('');
            }}
          >
            중앙동아리
          </S.OptionButton>
          <S.OptionButton
            isSelected={category === '소학회'}
            onClick={() => {
              setCategory('소학회');
              setSubFilter('전체');
              setAdditionalFilter('');
            }}
          >
            소학회
          </S.OptionButton>
        </S.OptionGroup>

        {/* 모집 형태 옵션 */}
        <S.OptionGroup>
          <S.OptionButton
            isSelected={subFilter === '전체'}
            onClick={() => setSubFilter('전체')}
          >
            전체
          </S.OptionButton>
          <S.OptionButton
            isSelected={subFilter === '수시'}
            onClick={() => setSubFilter('수시')}
          >
            수시
          </S.OptionButton>
          <S.OptionButton
            isSelected={subFilter === '상시'}
            onClick={() => setSubFilter('상시')}
          >
            상시
          </S.OptionButton>
        </S.OptionGroup>

        {/* 소학회인 경우에만 추가 필터 옵션 표시 */}
        {category === '소학회' && (
          <S.OptionGroup>
            <S.OptionButton
              isSelected={additionalFilter === '해당학과'}
              onClick={() => setAdditionalFilter('해당학과')}
            >
              해당학과
            </S.OptionButton>
            <S.OptionButton
              isSelected={additionalFilter === '해당단과대'}
              onClick={() => setAdditionalFilter('해당단과대')}
            >
              해당단과대
            </S.OptionButton>
            <S.OptionButton
              isSelected={additionalFilter === '전공무관'}
              onClick={() => setAdditionalFilter('전공무관')}
            >
              전공무관
            </S.OptionButton>
          </S.OptionGroup>
        )}

        {/* 검색 입력 (선택 사항) */}
        <S.SearchInputContainer>
          <S.SearchInput
            type="text"
            placeholder="동아리명을 입력하세요. (선택사항)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </S.SearchInputContainer>

        {/* 검색하기 버튼 */}
        <S.SearchButton onClick={handleSearchNavigation}>
          검색하기
        </S.SearchButton>
      </S.FilterContainer>
    </S.PageContainer>
  );
}

export default SearchPage;
