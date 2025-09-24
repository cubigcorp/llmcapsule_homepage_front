import type { Metadata } from 'next';
import { isProdStage } from '@/utils/env';
import './globals.css';
import Header from '@/components/layout/Header';
import I18nProvider from '@/components/providers/I18nProvider';
import StyledComponentsRegistry from '@/lib/registry';
import { GoogleOAuthProvider } from '@react-oauth/google';
import ToastProvider from '@/components/providers/ToastProvider';

export const metadata: Metadata = {
  title: 'LLM Capsule - AI 기반 솔루션',
  description: 'AI 기반 솔루션으로 더 나은 미래를 만들어갑니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isProduction = isProdStage;
  return (
    <html lang='ko'>
      <head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin='anonymous'
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Geist+Mono:wght@100..900&display=swap'
          rel='stylesheet'
        />
        {isProduction && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5XXVWKSB');`,
              }}
            />
            <noscript>
              <img
                height='1'
                width='1'
                style={{ display: 'none' }}
                src='https://www.facebook.com/tr?id=995103179338191&ev=PageView&noscript=1'
                alt=''
              />
            </noscript>
            <meta
              name='google-site-verification'
              content='wdmW9gaLyC1PRwSbwproJHb7i1y0GZy9pH7-cqYDv7M'
            />
          </>
        )}
        <script
          src='https://accounts.google.com/gsi/client'
          async
          defer
        ></script>
      </head>
      <body>
        {isProduction && (
          <noscript>
            <iframe
              src='https://www.googletagmanager.com/ns.html?id=GTM-5XXVWKSB'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <StyledComponentsRegistry>
          <GoogleOAuthProvider clientId='827074253539-i0qbolbrlllgv24rrcd32ktm8h9uo21i.apps.googleusercontent.com'>
            <ToastProvider>
              <I18nProvider>
                <Header />
                {children}
              </I18nProvider>
            </ToastProvider>
          </GoogleOAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
