import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "@/styles/globals.css";
import SideMenu from "@/components/global/SideMenu";
import Header from "@/components/global/Header";
import ClientLayout from "@/components/global/ClientLayout";

const inter = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={inter.style} className="h-screen flex items-start">
        <SideMenu />
        <main className="w-full">
          <Header />
          <div className="px-8">{children}</div>
        </main>
        <ClientLayout />
      </body>
    </html>
  );
}
