import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Poppins } from "next/font/google";
import "@/app/globals.css";
import { Metadata } from "next";
import { LoadingWrapper } from "@/context/loading";

export const metadata: Metadata = {
  title: "DIcoba",
  description: "Generated by create next app",
};
export default function RootLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <LoadingWrapper>
          <Navbar />
          {children}
          <Footer />
        </LoadingWrapper>
      </body>
    </html>
  );
}
