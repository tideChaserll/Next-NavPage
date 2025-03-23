"use client";
import "./globals.css";
import { Geist, Geist_Mono } from "next/font/google";
import { useEffect } from "react";
import { getBodyBgImg, getAverageColor, setGlobalStyle } from "@/utils/domStyle";
import SideBar from "./sidebar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const calcBgColor = () => {
  const opacity = 0.4
  const setBgColor = (color: string) => {
    setGlobalStyle("--bg-color", color)
  }
  useEffect(() => {
    let bgUrl = getBodyBgImg()
    if (bgUrl) {
      console.log(bgUrl)
      if (bgUrl.startsWith("/")) {
        bgUrl = window.location.origin + bgUrl;
      }
      getAverageColor(bgUrl, opacity).then(setBgColor).catch(console.error);
    }
  }, []);  
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 计算背景主体色
  calcBgColor()

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <SideBar></SideBar>
        {children}
      </body>
    </html>
  );
}
