import type React from "react";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import ThemeToggle from "@/components/theme-toggle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

const title = "Engr Abu Kowsar — Technical Project Manager & AI Integration Specialist";
const description =
  "PMP & PMI-ACP certified Technical Project Manager delivering high-impact projects across software, hardware, and manufacturing — specializing in Agile methodologies, AI integration, and digital transformation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://abukowsar.site"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://abukowsar.site",
    siteName: "Abu Kowsar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon.svg" />
        <meta name="theme-color" content="#3B82F6" />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
              }
            `,
          }}
        />
      </head>
      <body
        className={cn(
          `font-sans antialiased transition-colors duration-300`,
          poppins.className
        )}
      >
        <ThemeToggle />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
