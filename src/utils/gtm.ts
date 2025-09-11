interface GTMEvent {
  event: string;
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer: GTMEvent[];
  }
}

export const gtm = {
  /**
   * GTM 이벤트 발동
   */
  pushEvent(eventName: string, eventData: Record<string, unknown>) {
    if (typeof window !== 'undefined') {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        event: eventName,
        ...eventData,
      });
    }
  },

  /**
   * 문의 제출 완료 이벤트 발동
   */
  submitLead(inquiryType: string) {
    this.pushEvent('llmC.submitLead', {
      leadInfo: [
        {
          info_type: inquiryType,
        },
      ],
    });
  },
};
