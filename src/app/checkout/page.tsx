'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CheckoutRedirect() {
  const router = useRouter();

  useEffect(() => {
    // 기본적으로 비즈니스 체크아웃으로 리다이렉트
    router.replace('/checkout/business');
  }, [router]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '18px',
      }}
    >
      체크아웃 페이지로 이동 중...
    </div>
  );
}
