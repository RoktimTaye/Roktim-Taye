import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/ui/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL("https://roktimtaye.dev"),
  title: "ROKTIM TAYE — Designer & Developer",
  description:
    "I think, design and build stuff that makes sense. Portfolio of Roktim Taye — based in Dibrugarh, Assam, India.",
  keywords: [
    "Roktim Taye",
    "Portfolio",
    "Design",
    "Developer",
    "Next.js",
    "React",
    "Figma",
    "Tailwind CSS",
    "UI/UX",
  ],
  authors: [{ name: "Roktim Taye", url: "https://github.com/RoktimTaye" }],
  openGraph: {
    title: "ROKTIM TAYE — Designer & Developer",
    description: "I think, design and build stuff that makes sense.",
    url: "https://github.com/RoktimTaye",
    siteName: "Roktim Taye Portfolio",
    images: [
      {
        url: "/images/roktim-profile.jpg",
        width: 800,
        height: 1000,
        alt: "Roktim Taye",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ROKTIM TAYE — Designer & Developer",
    description: "I think, design and build stuff that makes sense.",
    images: ["/images/roktim-profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Roktim Taye",
    url: "https://github.com/RoktimTaye",
    jobTitle: "Designer & Developer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dibrugarh",
      addressRegion: "Assam",
      addressCountry: "IN",
    },
    email: "roktimtayecoding@gmail.com",
    sameAs: [
      "https://github.com/RoktimTaye",
      "https://www.linkedin.com/in/roktim-taye-86957437a/",
    ],
  };

  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white min-h-screen font-sans selection:bg-[#e63946] selection:text-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SmoothScroll>
          <Header />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
