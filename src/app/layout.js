import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/Navbar";
import Footer from "@/Components/Footer";
import Providers from "@/Components/Providers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DriveFleet — Premium Car Rentals",
  description:
    "Explore and book premium rental cars across Bangladesh. Affordable daily rates and flexible pickups.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="luxury"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ToastContainer position="top-right" autoClose={3000} theme="dark" />
        </Providers>
      </body>
    </html>
  );
}
