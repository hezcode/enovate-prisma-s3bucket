import type { Metadata } from "next";
import { Geist_Mono, Merriweather_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";

const merriweatherSans = Merriweather_Sans({
  variable: "--font-merriweather-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Enovate Studio",
  description:
    "Global digital agency specializing in website design, web application development, and mobile application solutions for small businesses, startups, entrepreneurs, and growing brands.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${merriweatherSans.variable} ${geistMono.variable} ${inter.variable} antialiased `}
      >
        <Providers>
          <Analytics />
          <Toaster
            toastOptions={{
              success: {
                style: {
                  border: "2px solid #556B2F",
                },
              },
            }}
          />

          <Header />
          {children}
          <section className="mt-auto">
            <Footer />
          </section>
        </Providers>
      </body>
    </html>
  );
}
