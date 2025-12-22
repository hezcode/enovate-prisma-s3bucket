import type { Metadata } from "next";
import { Geist_Mono, Merriweather_Sans, Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import Providers from "./providers";
import { Toaster } from "react-hot-toast";
import Image from "next/image";

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
          <div className="flex flex-col items-center py-4 gap-y-1 md:hidden  ">
            <div className="w-32 h-8 relative">
              <Image
                src="/icons/LogoDescription.svg"
                alt="enovate_logo"
                objectFit="contain"
                fill
                fetchPriority="high"
                loading="lazy"
              />
            </div>
            <p className=" font-sans text-[10px] text-text-dark-gray font-medium ">
              Creative Design and Development Agency
            </p>
          </div>
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
