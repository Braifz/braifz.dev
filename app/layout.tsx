import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";
import "./globals.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
    bg-[radial-gradient(800px_600px_at_70%_40%,rgba(255,255,255,0.06),#0b0b0b)]
  `}
      >
        <ThemeProvider>{children}</ThemeProvider>
        {/* <SplashCursor /> */}
      </body>
    </html>
  );
}
