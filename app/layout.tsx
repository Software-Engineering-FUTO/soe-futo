import type { Metadata } from "next";
import { Red_Hat_Display, Red_Hat_Text, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const redHatDisplay = Red_Hat_Display({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const redHatText = Red_Hat_Text({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Department of Software Engineering, FUTO",
  description:
    "Notices, timetables, courses, projects and staff contacts for the Department of Software Engineering, Federal University of Technology Owerri.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${redHatDisplay.variable} ${redHatText.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
