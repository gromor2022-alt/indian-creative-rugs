import { CartProvider } from "@/context/CartContext";
import type { Metadata } from "next";
import { Sen, Instrument_Serif } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";
import { organizationSchema } from "@/lib/schema";

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
  metadataBase: new URL("https://indiancreativerugs.com"),

  title: {
    default: "Indian Creative Rugs | Handmade Luxury Rugs from India",
    template: "%s | Indian Creative Rugs",
  },

  description:
    "Discover handcrafted luxury rugs from India. Explore Persian, Oushak, Vintage, Moroccan, Modern, Tribal, Contemporary and Custom Handmade Rugs crafted for homes, hotels, architects and interior designers worldwide.",

  keywords: [
    "Indian Creative Rugs",
    "Handmade Rugs",
    "Luxury Rugs",
    "Persian Rugs",
    "Oushak Rugs",
    "Moroccan Rugs",
    "Vintage Rugs",
    "Modern Rugs",
    "Hand Knotted Rugs",
    "Hand Tufted Rugs",
    "Area Rugs",
    "Custom Rugs",
    "Designer Rugs",
    "Carpet Exporter India",
    "Luxury Carpets",
    "Wool Rugs",
    "Silk Rugs",
    "Interior Designer Rugs",
  ],

  authors: [
    {
      name: "Indian Creative Rugs",
    },
  ],

  creator: "Indian Creative Rugs",

  publisher: "Indian Creative Rugs",

  applicationName: "Indian Creative Rugs",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  openGraph: {
    title: "Indian Creative Rugs | Handmade Luxury Rugs from India",
    description:
      "Luxury handmade rugs crafted in India for homes, hotels, architects and interior designers worldwide.",

    url: "https://indiancreativerugs.com",

    siteName: "Indian Creative Rugs",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Indian Creative Rugs",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Indian Creative Rugs | Handmade Luxury Rugs",
    description:
      "Luxury handmade rugs crafted in India for customers worldwide.",

    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://indiancreativerugs.com",
  },

  category: "Home Decor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
const organization = organizationSchema();
  return (
    <html
      lang="en"
      className={`${sen.variable} ${instrumentSerif.variable}`}
    >
      <body className={sen.className}>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organization),
  }}
/>
        <CartProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}