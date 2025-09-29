import {
  llmApiClient,
  LLM_API_ENDPOINTS,
  type Plan,
  type AddOn,
  type Bundle,
  type UserBundlesResponse,
  type MyPageHomeResponse,
  type DownloadUrlResponse,
  type PurchaseRequest,
  type Payment,
  type PayPalCompleteRequest,
  type PaymentResponse,
  type PaymentSummaryResponse,
  type PlanUpgradeRequest,
  type PlanUpgradeResponse,
  type CompletePlanUpgradeRequest,
  type DowngradeRequest,
  type DowngradeResponse,
  type LicenseKeyRequest,
  type SerialExpiryResponse,
  type UpdateMacAddressRequest,
  type UpdateMacAddressResponse,
  type OpenAIApiKeyResponse,
  type TokenHistoryResponse,
  type UserInfo as PlanUserInfo,
} from '@/utils/api';

/**
 * LLM 전용 서비스
 */
class LlmService {
  // 마이페이지 관련
  async getUserInfo() {
    return await llmApiClient.get<PlanUserInfo>(LLM_API_ENDPOINTS.MYPAGE.INFO);
  }

  async getMyBundles() {
    return await llmApiClient.get<Bundle[]>(
      LLM_API_ENDPOINTS.MYPAGE.HOME_BUNDLES
    );
  }

  async getMyStatic() {
    return await llmApiClient.get<MyPageHomeResponse>(
      LLM_API_ENDPOINTS.MYPAGE.HOME_STATIC
    );
  }

  async getDownloadUrl() {
    return await llmApiClient.get<DownloadUrlResponse>(
      LLM_API_ENDPOINTS.MYPAGE.DOWNLOAD_EXE
    );
  }

  // 플랜 관련
  async getAllPlans() {
    return await llmApiClient.get<Plan[]>(LLM_API_ENDPOINTS.PLANS.ALL);
  }

  async getAllAddOns() {
    return await llmApiClient.get<AddOn[]>(LLM_API_ENDPOINTS.PLANS.ADD_ON);
  }

  async getMyPlans() {
    return await llmApiClient.get<UserBundlesResponse>(
      LLM_API_ENDPOINTS.PLANS.MY
    );
  }

  async scheduledDowngrade(request: DowngradeRequest) {
    return await llmApiClient.post<DowngradeResponse>(
      LLM_API_ENDPOINTS.PLANS.SCHEDULED_DOWNGRADE,
      request
    );
  }

  // 시리얼 관련
  async generateLicense(request: LicenseKeyRequest) {
    return await llmApiClient.post(
      LLM_API_ENDPOINTS.SERIAL.GENERATE_LICENSE,
      request
    );
  }

  async getSerialExpiry(serialNumber: string) {
    return await llmApiClient.get<SerialExpiryResponse>(
      LLM_API_ENDPOINTS.SERIAL.EXPIRY(serialNumber)
    );
  }

  async updateMacAddress(request: UpdateMacAddressRequest) {
    return await llmApiClient.patch<UpdateMacAddressResponse>(
      LLM_API_ENDPOINTS.SERIAL.MAC_ADDRESS,
      request
    );
  }

  // 결제 관련
  async createPurchase(request: PurchaseRequest) {
    return await llmApiClient.post<Payment>(
      LLM_API_ENDPOINTS.PAYMENTS.PURCHASE,
      request
    );
  }

  async completePayment(paymentId: number, request: PayPalCompleteRequest) {
    return await llmApiClient.post<PaymentResponse>(
      LLM_API_ENDPOINTS.PAYMENTS.COMPLETE(paymentId),
      request
    );
  }

  async requestUpgrade(bundleId: number, request: PlanUpgradeRequest) {
    return await llmApiClient.post<PlanUpgradeResponse>(
      LLM_API_ENDPOINTS.PAYMENTS.REQUEST_UPGRADE(bundleId),
      request
    );
  }

  async completeUpgrade(
    bundleId: number,
    paymentId: number,
    request: CompletePlanUpgradeRequest
  ) {
    return await llmApiClient.post(
      LLM_API_ENDPOINTS.PAYMENTS.COMPLETE_UPGRADE(bundleId, paymentId),
      request
    );
  }

  async cancelSubscription(bundleId: number) {
    return await llmApiClient.post(LLM_API_ENDPOINTS.PAYMENTS.CANCEL(bundleId));
  }

  async getMyPayments() {
    return await llmApiClient.get<Payment[]>(
      LLM_API_ENDPOINTS.PAYMENTS.MY_PAYMENTS
    );
  }

  async getPaymentSummary(paymentId: number) {
    return await llmApiClient.get<PaymentSummaryResponse>(
      LLM_API_ENDPOINTS.PAYMENTS.SUMMARY(paymentId)
    );
  }

  // 토큰 히스토리 관련
  async getOpenAIApiKey(formData: FormData) {
    return await llmApiClient.post<OpenAIApiKeyResponse>(
      LLM_API_ENDPOINTS.TOKEN.OPENAI_API_KEY,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  async createTokenHistory(formData: FormData) {
    return await llmApiClient.post<TokenHistoryResponse>(
      LLM_API_ENDPOINTS.TOKEN.INSERT,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }

  // 사용자 관련
  async deleteUser(userId: number, email: string) {
    return await llmApiClient.delete(
      `${LLM_API_ENDPOINTS.USERS.DELETE(userId)}?email=${encodeURIComponent(email)}`
    );
  }

  // 헬스체크
  async healthCheck() {
    return await llmApiClient.get(LLM_API_ENDPOINTS.HEALTH_CHECK);
  }
}

export const llmService = new LlmService();
