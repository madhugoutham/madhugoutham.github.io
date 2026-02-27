import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// Google Analytics Measurement ID
const GA_MEASUREMENT_ID = "G-LM42SES2JY";

export const metadata: Metadata = {
  title: "Madhu Goutham Reddy Ambati | Machine Learning Engineer",
  description: "Senior AI/ML Engineer with 6+ years experience deploying large-scale ML systems. Reduced fraud losses by $2.1M annually. Specialized in LLM fine-tuning, multi-agent orchestration, and production MLOps.",
  keywords: ["AI Engineer", "ML Engineer", "Data Scientist", "Machine Learning", "Deep Learning", "LLM", "MLOps"],
  authors: [{ name: "Madhu Goutham Reddy Ambati" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Google Analytics 4 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
      </head>
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
