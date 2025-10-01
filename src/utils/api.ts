import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { env } from './env';

/**
 * API 응답 타입
 */
export interface ApiResponse<T = unknown> {
  status: number;
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Signup API Types
export interface SignupEmailRequest {
  user_auth_info_token: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_country_code: string;
  organization_name: string;
  consent_personal_info: boolean;
  consent_marketing: boolean;
}

export interface SignupGoogleRequest {
  sub: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_country_code: string;
  organization_name: string;
  consent_marketing: boolean;
}

export interface SignupResponse {
  id: number;
  email: string;
  created_at: string;
}

export interface VerifyEmailRequest {
  email: string;
  password: string;
  redirect_url: string;
  service_name: string;
}

export interface VerifyEmailGoogleRequest {
  access_token: string;
}

/**
 * 로그인 관련 타입
 */
export interface LoginEmailRequest {
  email: string;
  password: string;
}

export interface LoginGoogleRequest {
  access_token: string;
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

/**
 * 문의하기 관련 타입
 */
export interface ContactRequest {
  email: string;
  name_or_organization: string;
  phone: string;
  contact_type: string;
  content: string;
  consent_personal_info: boolean;
  consent_marketing: boolean;
  service_name: string;
}

/**
 * 이메일 중복 확인 타입
 */
export interface CheckEmailResponse {
  email: string;
  is_available: boolean;
}

/**
 * 전화번호 중복 확인 타입
 */
export interface CheckPhoneResponse {
  phone: string;
  is_available: boolean;
}
/**
 * 이메일 토큰 검증 타입
 */
export interface CheckEmailTokenResponse {
  is_valid: boolean;
}

/**
 * OTP 관련 타입
 */
export interface SendOtpRequest {
  phone: string;
  country_code: string;
  otp_type: string;
  service_name: string;
}

export interface VerifyOtpRequest {
  phone: string;
  otp_type: string;
  otp: string;
}

/**
 * 비밀번호 재설정 타입
 */
export interface PasswordResetRequestRequest {
  email: string;
  redirect_url: string;
}

export interface PasswordResetConfirmRequest {
  token: string;
  password: string;
  password_confirm: string;
}

/**
 * 사용자 정보 타입
 */
export interface UserInfo {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  phone_country_code: string;
  organization_name: string;
  consent_personal_info: boolean;
  consent_marketing: boolean;
  created_at: string;
  is_social_login: boolean;
}

export interface UpdateField {
  field: string;
  value: string;
}

export interface UpdateUserRequest {
  update_fields: UpdateField[];
}

export interface ChangePasswordRequest {
  current_password: string;
  new_password: string;
  new_password_confirm: string;
}

/**
 * 플랜 관리 API 타입들
 */

// 플랜 관련
export interface Plan {
  id: number;
  name: string;
  price: number;
  contract_month: number;
  monthly_token_limit: number | null;
  created_at: string;
  updated_at: string;
  is_delete: boolean;
}

export interface AddOn {
  id: number | null;
  type: string | null;
  sub_type: string | null;
  price: number | null;
  created_at: string;
  updated_at: string;
}

// 번들 관련
export type BundleStatus =
  | 'PENDING'
  | 'ACTIVE'
  | 'CANCELED'
  | 'SUSPENDED'
  | 'EXPIRED';

export interface Bundle {
  id: number | null;
  user_id: number;
  plan_id: number;
  pending_plan_id: number | null;
  status: BundleStatus;
  billing_cycle_months: number;
  is_prepay: boolean;
  add_on_data: Record<string, unknown> | null;
  next_billing_date: string;
  created_at: string;
  updated_at: string;
}

// 사용자 번들 응답
export interface PlanInfo {
  id: number;
  name: string;
  price: number;
  contract_month: number;
  monthly_token_limit: number | null;
}

export interface SerialInfo {
  id: number;
  serial_number: string;
  status: string;
  token_limit: number | null;
  used_tokens: number;
}

export interface UserBundleResponse {
  id: number;
  status: string;
  billing_cycle_months: number;
  is_prepay: boolean;
  next_billing_date: string;
  created_at: string;
  purchase_type?: 'PERSONAL' | 'BUSINESS';
  plan: PlanInfo;
  serials: SerialInfo[];
}

export interface UserBundlesResponse {
  bundles: UserBundleResponse[];
}

// 마이페이지 홈 응답
export interface MyPageHomeResponse {
  active_plan_count: number;
  active_serial_count: number;
  earliest_expiry_date: string | null;
}

// 다운로드 URL 응답
export interface DownloadUrlResponse {
  download_url: string;
}

// 결제 관련
export interface AddOnItem {
  add_on_id: number;
  quantity: number;
}

export interface PurchaseRequest {
  plan_id: number;
  seat_count: number;
  contract_month: number;
  is_prepayment: boolean;
  add_on: AddOnItem[];
  total_price: number;
  purchase_type?: 'PERSONAL' | 'BUSINESS';
}

export type PaymentStatus =
  | 'PENDING'
  | 'COMPLETED'
  | 'FAILED'
  | 'REFUNDED'
  | 'CANCELLED';

export interface Payment {
  id: number | null;
  user_id: number;
  plan_id: number;
  seat_count: number;
  total_amount: number;
  paypal_product_id: string | null;
  paypal_plan_id: string | null;
  paypal_subscription_id: string | null;
  paypal_response_data: Record<string, unknown> | null;
  payment_status: PaymentStatus;
  subscription_start_date: string | null;
  subscription_end_date: string | null;
  bundle_id: number | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface PayPalCompleteRequest {
  subscription_id: string;
  plan_id: string;
}

export interface PaymentResponse {
  payment_id: number;
  bundle_id: number | null;
  serials_created: number;
  serial_numbers: string[];
  message: string;
}

export interface PaymentSummaryResponse {
  paypal_subscription_id: string;
  subscription_start_date: string;
  plan_name: string;
  plan_price: number;
  monthly_token_limit: number | null;
  serial_count: number;
  billing_cycle_months: number;
  contract_discount_rate: number;
  is_prepayment: boolean;
  addon_16_quantity: number;
  plan_total_price: number;
  addon_total_price: number;
}

// 플랜 업그레이드 관련
export interface PlanUpgradeRequest {
  plan_id: number;
}

export interface PlanUpgradeResponse {
  payment_id: number;
  paypal_plan_id: string;
  next_billing_time: string;
}

export interface CompletePlanUpgradeRequest {
  paypal_subscription_id: string;
}

// 플랜 다운그레이드 관련
export interface DowngradeRequest {
  bundle_id: number;
  new_plan_id: number;
}

export interface DowngradeResponse {
  message: string;
  bundle_id: number;
  current_plan_name: string;
  new_plan_name: string;
  effective_datetime: string;
  seat_count: number;
  paypal_plan_id: string;
}

// 시리얼 관련
export interface LicenseKeyRequest {
  serial_number: string;
  mac_address: string;
}

export type SerialStatus = 'PENDING' | 'ACTIVE' | 'INACTIVE';

export interface SerialExpiryResponse {
  serial_number: string;
  expired_at: string;
  status: SerialStatus;
  token_limit: number;
  is_expired: boolean;
}

export interface UpdateMacAddressRequest {
  serial_number: string;
  mac_address: string;
}

export interface UpdateMacAddressResponse {
  success: boolean;
  error?: string | null;
}

// 토큰 히스토리 관련
export interface OpenAIApiKeyResponse {
  openai_api_key: string | null;
}

export interface TokenHistoryResponse {
  id: number;
  serial_id: number;
  model_name: string;
  input_predict: number;
  input_real: number;
  output_predict: number;
  output_real: number;
  created_at: string;
  updated_at: string;
}

/**
 * 기본 API 클라이언트
 */
class ApiClient {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value: unknown) => void;
    reject: (error: unknown) => void;
  }> = [];

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // 요청 인터셉터
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Authorization 헤더 추가
        const accessToken = localStorage.getItem('access_token');
        if (accessToken) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }

        // 요청 로깅 (개발 환경에서만)
        if (env.NODE_ENV === 'development') {
          // console.log(
          //   'API Request:',
          //   config.method?.toUpperCase(),
          //   config.url,
          //   config.data
          // );
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // 응답 인터셉터
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // 응답 로깅 (개발 환경에서만)
        if (env.NODE_ENV === 'development') {
          // console.log('API Response:', response.status, response.data);
        }
        return response;
      },
      async (error) => {
        const originalRequest = error.config;

        // 401 에러이고 아직 재시도하지 않은 경우
        if (error.response?.status === 401 && !originalRequest._retry) {
          // 이미 토큰 갱신 중인 경우, 큐에 추가
          if (this.isRefreshing) {
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            }).then(() => {
              originalRequest.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`;
              return this.axiosInstance(originalRequest);
            });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          try {
            const refreshToken = localStorage.getItem('refresh_token');
            if (!refreshToken) {
              throw new Error('No refresh token');
            }

            const refreshResponse = await this.axiosInstance.post(
              API_ENDPOINTS.REFRESH,
              { refresh_token: refreshToken }
            );

            const newAccessToken = refreshResponse.data.access_token;

            localStorage.setItem('access_token', newAccessToken);

            this.processQueue(null);

            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            this.processQueue(refreshError);

            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');

            if (typeof window !== 'undefined') {
              window.dispatchEvent(new Event('storage'));

              if (
                !window.location.pathname.includes('/login') &&
                !window.location.pathname.includes('/signup') &&
                !window.location.pathname.includes('/verify')
              ) {
                window.location.href = '/login';
              }
            }

            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // 에러 로깅 (개발 환경에서만)
        if (env.NODE_ENV === 'development') {
          console.log(
            'API Error:',
            error.response?.status,
            error.response?.data
          );
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * 대기 중인 요청들 처리
   */
  private processQueue(error: unknown) {
    this.failedQueue.forEach(({ resolve, reject }) => {
      if (error) {
        reject(error);
      } else {
        resolve(null);
      }
    });

    this.failedQueue = [];
  }

  /**
   * API 요청 실행
   */
  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<T>(config);
      return {
        status: response.status,
        success: true,
        data: response.data,
      };
    } catch (error: unknown) {
      const axiosError = error as {
        response?: { status?: number; data?: { message?: string } };
      };
      return {
        status: axiosError?.response?.status || 0,
        success: false,
        error:
          axiosError?.response?.data?.message ||
          (error as Error)?.message ||
          'Unknown error occurred',
      };
    }
  }

  /**
   * GET 요청
   */
  async get<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url });
  }

  /**
   * POST 요청
   */
  async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data });
  }

  /**
   * PUT 요청
   */
  async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data });
  }

  /**
   * DELETE 요청
   */
  async delete<T>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url });
  }

  /**
   * PATCH 요청
   */
  async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data });
  }
}

/**
 * API 클라이언트 인스턴스
 */
export const apiClient = new ApiClient(env.API_BASE_URL);

/**
 * LLM 전용 API 클라이언트 인스턴스
 */
export const llmApiClient = new ApiClient(
  env.LLM_API_BASE_URL || 'https://test.llmcapsule.ai/api/'
);

/**
 * API 엔드포인트 상수
 */
export const API_ENDPOINTS = {
  // 회원가입 관련
  SIGNUP: {
    EMAIL: '/signup/email',
    GOOGLE: '/signup/google',
  },
  // 로그인 관련
  LOGIN: {
    EMAIL: '/login/email',
    GOOGLE: '/login/google',
  },
  // 로그아웃 관련
  LOGOUT: '/logout',
  // 문의하기 관련
  CONTACT: '/contact',
  // 이메일 인증 관련
  VERIFY: {
    EMAIL: '/verify-email',
    EMAIL_GOOGLE: '/verify-email/google',
  },
  // 이메일 중복 확인
  USERS: {
    CHECK_EMAIL: '/users/check-email',
    CHECK_PHONE: '/users/check-phone',
    CHECK_EMAIL_TOKEN: '/check-email-token',
    ME: '/users/me',
    BY_ID: (id: number) => `/users/${id}`,
  },
  // OTP 관련
  OTP: {
    SEND: '/send-otp',
    VERIFY: '/verify-otp',
  },
  // 토큰 리프레시
  REFRESH: '/refresh',
  // 비밀번호 재설정
  PASSWORD_RESET: {
    REQUEST: '/password-reset/request',
    CONFIRM: '/password-reset/confirm',
  },
  // 비밀번호 변경
  CHANGE_PASSWORD: '/users/me/change-password',
} as const;

/**
 * LLM 전용 API 엔드포인트 상수
 */
export const LLM_API_ENDPOINTS = {
  // 마이페이지 관련
  MYPAGE: {
    INFO: '/mypage/info',
    HOME_BUNDLES: '/mypage/home/my-bundles',
    HOME_STATIC: '/mypage/home/my-static',
    DOWNLOAD_EXE: '/mypage/download-exe',
  },
  // 플랜 관련
  PLANS: {
    ALL: '/plans/',
    ADD_ON: '/plans/add-on',
    MY: '/plans/my',
    SCHEDULED_DOWNGRADE: '/plans/scheduled-downgrade',
  },
  // 시리얼 관련
  SERIAL: {
    GENERATE_LICENSE: '/serial/generate-license',
    EXPIRY: (serialNumber: string) => `/serial/${serialNumber}/expiry`,
    MAC_ADDRESS: '/serial/mac-address',
  },
  // 결제 관련
  PAYMENTS: {
    PURCHASE: '/payments/purchase',
    COMPLETE: (paymentId: number) => `/payments/complete/${paymentId}`,
    REQUEST_UPGRADE: (bundleId: number) =>
      `/payments/${bundleId}/request-upgrade`,
    COMPLETE_UPGRADE: (bundleId: number, paymentId: number) =>
      `/payments/${bundleId}/complete-upgrade/${paymentId}`,
    CANCEL: (bundleId: number) => `/payments/${bundleId}/cancel`,
    MY_PAYMENTS: '/payments/my-payments',
    SUMMARY: (paymentId: number) => `/payments/summary/${paymentId}`,
    WEBHOOK_PAYPAL: '/payments/webhook/paypal',
  },
  // 토큰 히스토리 관련
  TOKEN: {
    OPENAI_API_KEY: '/token/openai-api-key',
    INSERT: '/token/insert',
  },
  // 사용자 관련
  USERS: {
    DELETE: (userId: number) => `/users/${userId}`,
  },
  // 헬스체크
  HEALTH_CHECK: '/health-check',
} as const;
