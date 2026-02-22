import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep Parekh",
  description: "A showcase of technical projects and skills.",
};

import { ThemeProvider } from "@/context/ThemeContext";

// ... (Metadata export)

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable}`}>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
