"use client";

import Image from "next/image";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

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
        <h2 className="font-instrument text-[44px] md:text-[68px] leading-tight text-center text-[#556B2F] mb-5">
  Curated Best Sellers
</h2>
<div className="flex justify-center mb-6">
  <div className="w-20 h-[2px] bg-[#D4AF37] rounded-full"></div>
</div>
        <p className="max-w-2xl mx-auto text-center text-[18px] leading-8 text-[#7B7468] mb-14">
  A curated collection of artisan-crafted rugs, chosen for their timeless elegance,
  exceptional craftsmanship, and enduring beauty.
</p>

        <Swiper
          modules={[Navigation]}
          navigation
          allowTouchMove
          grabCursor
          spaceBetween={20}
          breakpoints={{
  320: {
    slidesPerView: 1.2,
  },
  480: {
    slidesPerView: 1.8,
  },
  768: {
    slidesPerView: 3,
  },
  1024: {
    slidesPerView: 4,
  },
  1400: {
    slidesPerView: 5,
  },
}}
        >
          {products.map((rug) => (
            <SwiperSlide
  key={rug.id}
  className="pb-6"
>
              <Link
                
  href={`/product/${rug.slug}`}
  className="group block transition-all duration-500"
>
              
                <div className="overflow-hidden rounded-[28px] bg-[#FCF8F2] shadow-sm transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-2xl">
                  <Image
                    src={rug.images?.[0]?.src || "/placeholder.jpg"}
                    alt={rug.name}
                    width={500}
                    height={700}
                    className="w-full h-[520px] object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                <h3 className="mt-8 text-center font-instrument text-[24px] text-[#556B2F] tracking-[0.5px] transition-colors duration-300 group-hover:text-[#B68A35]">
  {rug.name}
</h3>

                
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}