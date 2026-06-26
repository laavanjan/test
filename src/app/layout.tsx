import type { Metadata } from "next";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" });

export const metadata: Metadata = {
  title: "Varsapp - İhtiyacın varsa kirala!",
  description:
    "Giyim, elektronik, ev, spor, hobi, anne ve bebek ürünlerini Varsapp'te güvenli biçimde kirala.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="h-full">
      <body className={`min-h-full antialiased ${montserrat.variable}`}>{children}</body>
    </html>
  );
}
