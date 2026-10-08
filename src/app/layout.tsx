import type { Metadata } from "next";
import { PT_Mono, Inter_Tight, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ThemeProvider } from "@/components/theme-provider";
import { BackToTop } from "@/components/back-to-top";
import { TopNav } from "@/components/top-nav";
import { EditorialFooter } from "@/components/editorial-footer";

const interTight = Inter_Tight({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ptMono = PT_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://joelakinlosotu.xyz"),
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.svg",
  },
  title: "Joel Akinlosotu — Web Developer",
  description:
    "WordPress and Next.js developer based in Lagos. Nine live projects across aviation, industrial, media, e-commerce, and architecture.",
  keywords: [
    "Joel Akinlosotu",
    "WordPress Developer",
    "Web Developer",
    "Lagos",
    "Nigeria",
    "Freelance",
    "Web Development",
    "Elementor",
    "SEO",
  ],
  authors: [{ name: "Joel Akinlosotu" }],
  openGraph: {
    title: "Joel Akinlosotu — Web Developer",
    description:
      "WordPress and Next.js developer based in Lagos. Nine live projects shipped.",
    images: [{ url: "https://joelakinlosotu.xyz/screenshots/elingroup.webp", width: 1200, height: 630, alt: "Joel Akinlosotu - Web Developer" }],
    type: "website",
  },

  alternates: {
    canonical: "https://joelakinlosotu.xyz",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${ptMono.variable} ${fraunces.variable}`}
      suppressHydrationWarning
    >
      <body>
        <TopNav />
        <ThemeProvider>{children}</ThemeProvider>
        <Toaster />
        <Analytics />
        <SpeedInsights />
        <BackToTop />
        <EditorialFooter />
            <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Joel Akinlosotu",
            jobTitle: "Web Developer",
            description: "WordPress and Next.js developer with 10 years of shipping. 50+ projects across aviation, industrial, media, e-commerce, and architecture.",
            url: "https://joelakinlosotu.xyz",
            email: "joelakinlosotu@gmail.com",
            telephone: "+234 906 897 1351",
            knowsAbout: ["WordPress", "Next.js", "WooCommerce", "Elementor", "SEO", "Web Performance", "Custom Post Types", "Schema Markup", "PHP", "TypeScript", "Tailwind CSS"],
            sameAs: [
              "https://linkedin.com/in/joelakinlosotu",
              "https://github.com/Tjaiwo",
              "https://instagram.com/@joelakinlosotu"
            ],
            worksFor: { "@type": "Organization", name: "Freelance" },
            address: { "@type": "PostalAddress", addressLocality: "Lagos", addressCountry: "Nigeria" }
          })
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Joel Akinlosotu",
            url: "https://joelakinlosotu.xyz",
            description: "WordPress and Next.js developer with 10 years of shipping. 50+ projects across aviation, industrial, media, e-commerce, and architecture.",
            author: { "@type": "Person", name: "Joel Akinlosotu" },
            potentialAction: {
              "@type": "SearchAction",
              target: "https://joelakinlosotu.xyz?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })
        }}
      />

    </body>
    </html>
  );
}
