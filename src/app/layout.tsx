import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Helper English",
  description: "A simple tool to help you learn English",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-neutral-800`}
      >
        <div className="fixed top-10 bg-pink-600 w-screen p-[1px]"></div>
        {children}
        <div className="fixed bottom-10 bg-pink-600 w-screen p-[1px]"></div>
      </body>
    </html>
  );
}
