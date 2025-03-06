import React from 'react';
import {
  FooterContainer,
  ContentWrapper,
  AdminEmailLink,
  MobileLineBreak,
} from './FootBar.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <ContentWrapper>
        <span>
          본 프로젝트는 소규모 팀 프로젝트로,{' '}
          <MobileLineBreak>
            <br />
          </MobileLineBreak>
          학교와는 무관합니다.
        </span>
        &copy; 2025 ACM. All rights reserved.
        <br />
        관리자 이메일:{' '}
        <AdminEmailLink href="mailto:rryunn@ajou.ac.kr">
          rryunn@ajou.ac.kr
        </AdminEmailLink>
      </ContentWrapper>
    </FooterContainer>
  );
};

export default Footer;
