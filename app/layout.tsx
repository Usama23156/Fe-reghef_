"use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/_component/navbar/page";
import Footer from "@/_component/footer/page";
import { Provider } from "react-redux";
import { store } from "../store/store";
import AuthProvider from "@/_component/authProvider/page";
import HtmlWrapper from "@/_component/htmlWrapper/page";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Provider store={store}>
          <HtmlWrapper>
            <Navbar />
            <AuthProvider>{children}</AuthProvider>
            <Footer />
          </HtmlWrapper>
        </Provider>
      </body>
    </html>
  );
}
