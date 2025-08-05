import { apiClient, API_ENDPOINTS } from '@/utils/api';
import type {
  SignupEmailRequest,
  SignupGoogleRequest,
  VerifyEmailRequest,
  VerifyEmailGoogleRequest,
  LoginEmailRequest,
  LoginGoogleRequest,
  SignupResponse,
  LoginResponse,
  CheckEmailResponse,
  UserInfo,
  PasswordResetRequestRequest,
  PasswordResetConfirmRequest,
} from '@/utils/api';

/**
 * 인증 관련 API 서비스
 */
export const authService = {
  /**
   * 이메일 회원가입
   */
  async signupEmail(data: SignupEmailRequest) {
    return apiClient.post<SignupResponse>(API_ENDPOINTS.SIGNUP.EMAIL, data);
  },

  /**
   * 구글 회원가입
   */
  async signupGoogle(data: SignupGoogleRequest) {
    return apiClient.post<SignupResponse>(API_ENDPOINTS.SIGNUP.GOOGLE, data);
  },

  /**
   * 이메일 로그인
   */
  async loginEmail(data: LoginEmailRequest) {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN.EMAIL, data);
  },

  /**
   * 구글 로그인
   */
  async loginGoogle(data: LoginGoogleRequest) {
    return apiClient.post<LoginResponse>(API_ENDPOINTS.LOGIN.GOOGLE, data);
  },

  /**
   * 이메일 인증 (회원가입 링크 발송)
   */
  async verifyEmail(data: VerifyEmailRequest) {
    return apiClient.post(API_ENDPOINTS.VERIFY.EMAIL, data);
  },

  /**
   * 구글 회원가입 이메일 인증
   */
  async verifyEmailGoogle(data: VerifyEmailGoogleRequest) {
    return apiClient.post(API_ENDPOINTS.VERIFY.EMAIL_GOOGLE, data);
  },

  /**
   * 이메일 중복 확인
   */
  async checkEmail(email: string) {
    return apiClient.get<CheckEmailResponse>(API_ENDPOINTS.USERS.CHECK_EMAIL, {
      params: { email },
    });
  },

  /**
   * 내 정보 조회
   */
  async getMyInfo() {
    return apiClient.get<UserInfo>(API_ENDPOINTS.USERS.ME);
  },

  /**
   * 사용자 정보 조회 (ID로)
   */
  async getUserById(userId: number) {
    return apiClient.get<UserInfo>(API_ENDPOINTS.USERS.BY_ID(userId));
  },

  /**
   * 토큰 리프레시
   */
  async refreshToken(refreshToken: string) {
    return apiClient.post<{ access_token: string }>(API_ENDPOINTS.REFRESH, {
      refresh_token: refreshToken,
    });
  },

  /**
   * 비밀번호 재설정 요청
   */
  async requestPasswordReset(data: PasswordResetRequestRequest) {
    return apiClient.post(API_ENDPOINTS.PASSWORD_RESET.REQUEST, data);
  },

  /**
   * 비밀번호 재설정 확인
   */
  async confirmPasswordReset(data: PasswordResetConfirmRequest) {
    return apiClient.post(API_ENDPOINTS.PASSWORD_RESET.CONFIRM, data);
  },
};
