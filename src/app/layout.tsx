import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header"; //

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
        {/* 👇 여기에 Header를 넣습니다 */}
        <Header />
        
        {/* 그 다음 페이지 내용이 나옵니다 */}
        {children}
      </body>
    </html>
  );
}