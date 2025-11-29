"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      return (
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
    return false;
  });

  // <CHANGE> Added theme initialization on mount
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

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
