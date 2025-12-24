import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madhu Goutham Reddy Ambati | AI/ML Engineer & Data Scientist",
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
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
