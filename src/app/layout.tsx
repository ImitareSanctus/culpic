import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// 👇 기존 Header 대신 새로 만든 Navigation을 불러옵니다.
// (파일 경로는 성모님 폴더 구조에 맞춰 ../components/Navigation 으로 잡았습니다)
import Navigation from "../components/Navigation"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Culpic - 뮤지션 협업 플랫폼",
  description: "음악을 멈추지 마세요. 당신의 동료와 무대가 여기 있습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        
        <Navigation />
        
        {/* 페이지 내용 */}
        {children}
        
      </body>
    </html>
  );
}