import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";
import WelcomeConsole from "@/src/components/common/WelcomeConsole/WelcomeConsole";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Braifz",
  description: "Frontend Developer - Braifz",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` ${inter.variable} antialiased container mx-auto 
          relative
          min-h-screen
          bg-background
          `}
      >
        <Analytics />
        {/* <WelcomeConsole /> */}

        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
