import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import StyledComponentsRegistry from '@/lib/registry';
import { GoogleOAuthProvider } from '@react-oauth/google';

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
      <head>
        <script
          src='https://accounts.google.com/gsi/client'
          async
          defer
        ></script>
      </head>
      <body>
        <StyledComponentsRegistry>
          <GoogleOAuthProvider clientId='827074253539-i0qbolbrlllgv24rrcd32ktm8h9uo21i.apps.googleusercontent.com'>
            <Header />
            {children}
          </GoogleOAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
