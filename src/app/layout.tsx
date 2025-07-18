import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import StyledComponentsRegistry from "@/lib/registry";

const geist = Geist({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LLM Capsule - AI 기반 솔루션",
  description: "AI 기반 솔루션으로 더 나은 미래를 만들어갑니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={geist.className}>
        <StyledComponentsRegistry>
          <Header />
          {children}
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
