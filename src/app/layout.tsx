import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "@/providers/QueryProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Joana Sousa - Treino Terapêutico | Lisboa",
  description: "Especialista em Treino Terapêutico com mais de 10 anos de experiência. Treinos personalizados focados na tua saúde e bem-estar. Descobre o poder do movimento consciente!",
  keywords: ["treino terapêutico", "personal training", "fitness", "Lisboa", "treino personalizado", "reabilitação", "bem-estar"],
  authors: [{ name: "Joana Sousa" }],
};

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
