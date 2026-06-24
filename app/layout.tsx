import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Sen, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const sen = Sen({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sen",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
});

export const metadata: Metadata = {
  title: "Indian Creative Rugs",
  description: "Luxury Handmade Rugs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${sen.variable} ${instrumentSerif.variable}`}
    >
      <body>
        <CartProvider>
          <Header />

          <main>
            {children}
          </main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}