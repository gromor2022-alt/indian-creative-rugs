"use client";

import FavoriteButton from "@/components/FavoriteButton";
import Image from "next/image";
import Link from "next/link";
import { CylinderCarousel } from "@/components/ui/cylinder-carousel";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

interface Product {
  id: number;
  slug: string;
  name: string;
  price: string;
  images: {
    src: string;
  }[];
}

interface Props {
  products: Product[];
}

export default function BestSellers({ products }: Props) {
  return (
    <section
      id="best-sellers"
      className="bg-[#F7EADF] py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-[1900px] mx-auto px-4 sm:px-6">
        {/* Heading */}
        <h2 className="font-instrument text-[44px] md:text-[68px] leading-tight text-center text-[#556B2F] mb-5">
          Curated Best Sellers
        </h2>

        <div className="flex justify-center mb-6">
          <div className="w-20 h-[2px] bg-[#D4AF37] rounded-full" />
        </div>

        <p className="max-w-2xl mx-auto text-center text-[18px] leading-8 text-[#7B7468] mb-14">
          A curated collection of artisan-crafted rugs, chosen for their
          timeless elegance, exceptional craftsmanship, and enduring beauty.
        </p>

        {/* Continuous Horizontal Carousel */}
        {/* 3D Cylinder Carousel */}
<CylinderCarousel
  images={products.map((rug) => ({
    src: rug.images?.[0]?.src || "/placeholder.jpg",
    alt: rug.name,
    href: `/rugs/${rug.slug}`,
  }))}
  cardWidth={260}
  animationDuration={38}
  containerClassName="scale-[0.9] md:scale-100"
  cardClassName="shadow-xl"
/>
      </div>
    </section>
  );
}