'use client';

import { useState } from 'react';
import styled from 'styled-components';
import {
  typography,
  textColor,
  radius,
  color,
  borderColor,
  SolidButton,
  TextField,
  Checkbox,
} from '@cubig/design-system';
import { getAssetPath } from '@/utils/path';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    keepLoggedIn: false,
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, keepLoggedIn: checked }));
  };

  const handleGoogleLogin = () => {
    // 구글 로그인 로직
    console.log('Google login clicked');
  };

  const handleLogin = () => {
    // 로그인 로직
    console.log('Login clicked', formData);
  };

  return (
    <LoginContainer>
      <LoginLeft>
        <LoginForm>
          <LoginTitle>로그인</LoginTitle>

          <GoogleLoginButton onClick={handleGoogleLogin}>
            <GoogleIcon>
              <img src={getAssetPath('/icons/Google.svg')} alt='Google' />
            </GoogleIcon>
            구글 계정으로 로그인
          </GoogleLoginButton>

          <Divider>
            <DividerText>or</DividerText>
          </Divider>

          <FormField>
            <TextField
              label='이메일'
              size='large'
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder='이메일을 입력해주세요.'
            />
          </FormField>

          <FormField>
            <TextField
              label='비밀번호'
              size='large'
              type='password'
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder='비밀번호를 입력해주세요.'
            />
          </FormField>

          <LoginOptions>
            <CheckboxWrapper>
              <Checkbox
                state={formData.keepLoggedIn ? 'checked' : 'unchecked'}
                onChange={handleCheckboxChange}
              />
              <CheckboxLabel>로그인 상태 유지</CheckboxLabel>
            </CheckboxWrapper>
            <OptionLinks>
              <OptionLink href='/find-account'>계정 찾기</OptionLink>
              <OptionLink href='/find-password'>비밀번호 찾기</OptionLink>
            </OptionLinks>
          </LoginOptions>

          <LoginButton onClick={handleLogin}>로그인</LoginButton>

          <SignUpPrompt>
            처음 방문하셨나요? <SignUpLink href='/signup'>회원가입</SignUpLink>
          </SignUpPrompt>

          <Copyright>© CUBIG All Rights Reserved.</Copyright>
        </LoginForm>
      </LoginLeft>

      <LoginRight>
        <DemoContent>
          <DemoBox>
            <DemoText>
              홍길동님(010-9876-5432) 최근 구매내역 기반으로 맞춤 추천 문구
              작성해줘. 그리고 국민은행 123456-78-901234 계좌로 결제 유도 문구도
              포함해 줘.
            </DemoText>
            <DemoNumbers>
              <DemoNumber>01</DemoNumber>
              <DemoNumber>02</DemoNumber>
              <DemoNumber>03</DemoNumber>
            </DemoNumbers>
          </DemoBox>

          <FilteredBox>
            <FilteredHeader>
              <FilteredDot />
              <FilteredTitle>실시간 프롬프트 필터링</FilteredTitle>
              <FilteredCheck />
            </FilteredHeader>
            <FilteredText>
              [이름]([연락처 C]) 최근 구매내역 기반으로 맞춤 추천 문구 작성해줘.
              그리고 국민은행 [계좌 D]로 결제 유도 문구도 포함해 줘.
            </FilteredText>
          </FilteredBox>

          <FeatureDescription>
            <FeatureTitle>실시간 프롬프트 필터링</FeatureTitle>
            <FeatureText>
              프롬프트 입력 시 이름, 연락처, 계좌번호 등 민감정보를 즉시
              감지하고 자동 가명화하여 유출을 방지합니다. 사용자가 인식하지
              못하는 사이에 모든 개인정보가 안전하게 보호됩니다.
            </FeatureText>
          </FeatureDescription>

          <NavigationArrows>
            <ArrowButton>&lt;</ArrowButton>
            <ArrowButton>&gt;</ArrowButton>
          </NavigationArrows>
        </DemoContent>
      </LoginRight>
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  min-height: 100vh;
`;

const LoginLeft = styled.div`
  flex: 1;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoginRight = styled.div`
  flex: 1;
  background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoginForm = styled.div`
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const LoginTitle = styled.h1`
  ${typography('ko', 'title3', 'semibold')}
  text-align: center;
  margin: 0;
`;

const GoogleLoginButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 12px 16px;
  background-color: white;
  border: 1px solid ${borderColor.light['color-border-primary']};
  border-radius: ${radius['rounded-2']};
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${color.gray['50']};
  }
`;

const GoogleIcon = styled.div`
  width: 20px;
  height: 20px;

  img {
    width: 100%;
    height: 100%;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid ${borderColor.light['color-border-primary']};
  }
`;

const DividerText = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  padding: 0 16px;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const LoginOptions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckboxLabel = styled.span`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
`;

const OptionLinks = styled.div`
  display: flex;
  gap: 16px;
`;

const OptionLink = styled.a`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    color: ${textColor.light['fg-neutral-strong']};
  }
`;

const LoginButton = styled(SolidButton)`
  width: 100%;
  margin-top: 8px;
`;

const SignUpPrompt = styled.div`
  text-align: center;
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
`;

const SignUpLink = styled.a`
  color: ${textColor.light['fg-neutral-strong']};
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const Copyright = styled.div`
  text-align: center;
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-alternative']};
  margin-top: auto;
`;

const DemoContent = styled.div`
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  position: relative;
`;

const DemoBox = styled.div`
  background-color: white;
  border-radius: ${radius['rounded-3']};
  padding: 20px;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const DemoText = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
  line-height: 1.6;
`;

const DemoNumbers = styled.div`
  position: absolute;
  top: -8px;
  right: -8px;
  display: flex;
  gap: 4px;
`;

const DemoNumber = styled.div`
  width: 24px;
  height: 24px;
  background-color: ${color.green['500']};
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'body3', 'medium')}
  font-size: 12px;
`;

const FilteredBox = styled.div`
  background-color: white;
  border-radius: ${radius['rounded-3']};
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const FilteredHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;

const FilteredDot = styled.div`
  width: 8px;
  height: 8px;
  background-color: ${color.green['500']};
  border-radius: 50%;
`;

const FilteredTitle = styled.span`
  ${typography('ko', 'body2', 'medium')}
  color: ${textColor.light['fg-neutral-strong']};
  flex: 1;
`;

const FilteredCheck = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${color.green['500']};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 10px;
  font-weight: bold;
`;

const FilteredText = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: ${textColor.light['fg-neutral-strong']};
  margin: 0;
  line-height: 1.6;
`;

const FeatureDescription = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: ${radius['rounded-3']};
  padding: 24px;
`;

const FeatureTitle = styled.h3`
  ${typography('ko', 'title3', 'semibold')}
  color: white;
  margin: 0 0 16px 0;
`;

const FeatureText = styled.p`
  ${typography('ko', 'body3', 'regular')}
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  line-height: 1.6;
`;

const NavigationArrows = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 8px;
`;

const ArrowButton = styled.button`
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 50%;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  ${typography('ko', 'body2', 'medium')}

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
