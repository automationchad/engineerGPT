import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";


import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Evotix | RFP Search and Completion",
  description: "Search and Completion",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
            <div className="max-h-screen">{children}</div>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
