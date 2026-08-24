// app/ layout.tsx

import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: {
    default: "CareerHub | Find your next opportunity",
    template: "%s | CareerHub",
  },

  description: "Discover thousands of job opportunities from top companies and find your next career opportunity.",

  openGraph: {
    title: "CareerHub | Find Your Next Opportunity",
    description: "Discover thousands of job opportunities from top companies and find your next career opportunity.",
    siteName: "CareerHub",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "CareerHub - Find Your Next Opportunity",
    description: "Discover jobs from top companies and find your next opportunity.",
  }
}



export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        
        <div className="overflow-hidden">

          <Navbar />

          {children}

          <Footer />
        </div>
        
        </body>
    </html>
  );
}
