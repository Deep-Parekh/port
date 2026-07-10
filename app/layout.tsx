import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Deep Parekh — Software Engineer & ML/AI",
  description:
    "Development lead with 4+ years owning delivery end-to-end — building LLM agents and scalable systems. M.S. in Artificial Intelligence at SJSU.",
  openGraph: {
    title: "Deep Parekh — Software Engineer & ML/AI",
    description:
      "Development lead with 4+ years owning delivery end-to-end — building LLM agents and scalable systems. M.S. in Artificial Intelligence at SJSU.",
    type: "website",
  },
};

import { ThemeProvider } from "@/context/ThemeContext";

// Runs before paint so the saved theme applies without a flash
const themeInitScript = `try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme',t==='light'?'light':'dark')}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${jetBrainsMono.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
