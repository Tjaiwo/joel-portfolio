import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  title: "Joel Akinlosotu — Web Developer & Web Administrator",
  description:
    "Portfolio of Joel Akinlosotu — a results-driven Web Developer and Systems Architect with 50+ freelance projects and 95% client satisfaction rate.",
  keywords: [
    "Joel Akinlosotu",
    "WordPress Developer",
    "Web Developer",
    "Web Administrator",
    "Lagos",
    "Nigeria",
    "Freelance",
    "Web Development",
    "Elementor",
    "SEO",
  ],
  authors: [{ name: "Joel Akinlosotu" }],
  openGraph: {
    title: "Joel Akinlosotu — Web Developer & Web Administrator",
    description:
      "Results-driven Web Developer with 50+ projects and 95% satisfaction rate.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground noise-overlay`}
      >
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
      </body>
    </html>
  );
}