import type { Metadata } from "next";
import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-display",
  weight: "400",
  subsets: ["latin"],
});

const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const description =
  "Artificial Intelligence & Information Systems @ CMU — software engineering, ML research, and full-stack projects.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rushil Singh",
  description,
  openGraph: {
    title: "Rushil Singh",
    description,
    url: "/",
    siteName: "Rushil Singh",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rushil Singh",
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
      style={{ colorScheme: "dark" }}
    >
      <body className="flex min-h-full flex-col bg-[#0b0b14]">{children}</body>
    </html>
  );
}
