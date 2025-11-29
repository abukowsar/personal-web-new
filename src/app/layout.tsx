"use client";

import type React from "react";

import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(false);

  // <CHANGE> Added theme initialization on mount
  useEffect(() => {
    const isDarkMode =
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  // <CHANGE> Added theme toggle function
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
    if (newIsDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script suppressHydrationWarning>
          {`
            if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            }
          `}
        </script>
      </head>
      <body className={`font-sans antialiased transition-colors duration-300`}>
        <div className="fixed top-4 right-20 md:right-4 z-50">
          <button
            onClick={toggleTheme}
            className="p-1 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            aria-label="Toggle theme"
          >
            {isDark ? "☀️" : "🌙"}
          </button>
        </div>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
