import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";
import { getSiteSettings } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();

  return {
    title:
      siteSettings?.seoTitle || "Joana Sousa - Treino Terapêutico | Lisboa",
    description:
      siteSettings?.seoDescription ||
      "Especialista em Treino Terapêutico com mais de 10 anos de experiência.",
    keywords: siteSettings?.seoKeywords?.split(",").map((k) => k.trim()) || [
      "treino terapêutico",
      "personal training",
      "fitness",
      "Lisboa",
    ],
    authors: [{ name: siteSettings?.siteName || "Joana Sousa" }],
  };
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#00D4D4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
