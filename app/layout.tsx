'use client';
import React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Navbar from "@/_component/navbar/page";
import Footer from "@/_component/footer/page";  
import { Provider } from "react-redux";
import { store } from "../store/store";
import AuthProvider from "@/_component/authProvider/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
        <Provider store={store}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
      <Suspense>
        <Navbar/>
        <AuthProvider>

        {children}
        </AuthProvider>
        <Footer />
        </Suspense>
      </body>
      </Provider>
    </html>
  );
}
