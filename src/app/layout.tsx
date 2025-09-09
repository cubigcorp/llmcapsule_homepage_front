import type { Metadata } from 'next';
import { isProdStage } from '@/utils/env';
import './globals.css';
import Header from '@/components/layout/Header';
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
        {isProduction && (
          <>
            <script
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5ZBPV3MZ');`,
              }}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '995103179338191');
fbq('track', 'PageView');`,
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
              src='https://www.googletagmanager.com/ns.html?id=GTM-5ZBPV3MZ'
              height='0'
              width='0'
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <StyledComponentsRegistry>
          <GoogleOAuthProvider clientId='827074253539-i0qbolbrlllgv24rrcd32ktm8h9uo21i.apps.googleusercontent.com'>
            <ToastProvider>
              <Header />
              {children}
            </ToastProvider>
          </GoogleOAuthProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
