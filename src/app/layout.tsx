import type { Metadata } from "next";
import localFont from "next/font/local";
import { AuthProvider } from '@/contexts/AuthContext';
import "./globals.css";
import { initDatabase } from '@/lib/db-init';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NodePin | 订阅汇总",
  description: "汇总订阅，方便管理和使用",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 在开发环境下初始化数据库
  if (process.env.NODE_ENV === 'development') {
    initDatabase().catch(console.error);
  }

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
