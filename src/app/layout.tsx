import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: 'LLM Capsule - AI 기반 솔루션',
  description: 'AI 기반 솔루션으로 더 나은 미래를 만들어갑니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body>
        <StyledComponentsRegistry>
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
