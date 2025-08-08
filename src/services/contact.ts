import { apiClient, API_ENDPOINTS, ContactRequest } from '@/utils/api';

export const contactService = {
  /**
   * 문의하기
   */
  async sendContact(data: ContactRequest) {
    return apiClient.post(API_ENDPOINTS.CONTACT, data);
  },
};
