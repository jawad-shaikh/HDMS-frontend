import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/global/Navbar";
import Footer from "@/components/global/Footer";
import ClientLayout from "@/components/global/ClientLayout";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        {children}
        <ClientLayout />
        <Footer />
      </body>
    </html>
  );
}
