import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "골프 클럽 매니저",
  description: "골프 클럽 회원 및 예약 관리 시스템",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-green-800 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <Link href="/" className="text-xl font-bold tracking-tight">
              ⛳ 골프 클럽 매니저
            </Link>
            <nav className="flex gap-6 text-sm font-medium">
              <Link href="/members" className="hover:text-green-200 transition-colors">회원 관리</Link>
              <Link href="/reservations" className="hover:text-green-200 transition-colors">예약 관리</Link>
              <Link href="/scores" className="hover:text-green-200 transition-colors">스코어 기록</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
