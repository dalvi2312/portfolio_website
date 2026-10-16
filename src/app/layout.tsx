import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Anton,
  Pixelify_Sans,
  Caveat,
  Space_Mono,
  Instrument_Serif,
} from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const pixelifySans = Pixelify_Sans({
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Durgesh Dalvi | AI/ML Engineer & Systems Artisan",
  description:
    "Portfolio of Durgesh Dalvi — Associate Software Engineer specializing in Agentic AI, Computer Vision, vLLM, and Scalable Backend Systems.",
  keywords: [
    "Durgesh Dalvi",
    "AI Engineer",
    "Machine Learning",
    "Agentic AI",
    "LangGraph",
    "Computer Vision",
    "vLLM",
    "FastAPI",
    "Portfolio",
  ],
  authors: [{ name: "Durgesh Dalvi" }],
  openGraph: {
    title: "Durgesh Dalvi | AI/ML Engineer Portfolio",
    description:
      "I build intelligent agents that solve real-world problems. Production-grade AI systems, industrial vision models, and multi-agent pipelines.",
    type: "website",
    locale: "en_US",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    shortcut: '/favicon.svg',
    apple: '/apple-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${plusJakartaSans.variable} ${anton.variable} ${pixelifySans.variable} ${caveat.variable} ${spaceMono.variable} ${instrumentSerif.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#ECE8DF] text-[#111111] overflow-x-clip selection:bg-[#FF6332] selection:text-white">
        {children}
      </body>
    </html>
  );
}
