import { SerwistProvider } from "@serwist/turbopack/react";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import "../styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const APP_NAME = "DNA Transcoder";
const APP_TITLE = "DNA 转码器 - UTF-8 文本与 DNA 序列互转";
const APP_DESCRIPTION =
  "在线 UTF-8 文本与 DNA 序列转换工具，支持编码解码和互补链生成";

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: APP_TITLE,
  description: APP_DESCRIPTION,
  generator: "Next.js",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: APP_NAME,
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    apple: "/icons/icon-192.png",
    icon: "/icon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { color: "#ffffff", media: "(prefers-color-scheme: light)" },
    { color: "#252525", media: "(prefers-color-scheme: dark)" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      lang="en"
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <SerwistProvider swUrl="/serwist/sw.js">
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
            enableSystem
          >
            {children}
            <Toaster />
            <Analytics />
          </ThemeProvider>
        </SerwistProvider>
      </body>
    </html>
  );
}
