import { apiClient, API_ENDPOINTS } from '@/utils/api';
import type { SendOtpRequest, VerifyOtpRequest } from '@/utils/api';

/**
 * OTP 관련 API 서비스
 */
export const otpService = {
  /**
   * OTP 전송
   */
  async sendOtp(data: SendOtpRequest, apiKey: string) {
    return apiClient.post(API_ENDPOINTS.OTP.SEND, data, {
      headers: {
        'x-api-key': apiKey,
      },
    });
  },

  /**
   * OTP 검증
   */
  async verifyOtp(data: VerifyOtpRequest, apiKey: string) {
    return apiClient.post(API_ENDPOINTS.OTP.VERIFY, data, {
      headers: {
        'x-api-key': apiKey,
      },
    });
  },
};
