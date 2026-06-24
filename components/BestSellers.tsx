"use client";

import Image from "next/image";
import Link from "next/link";
import { products } from "@/data/products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

export default function BestSellers() {
  return (
    <section
  id="best-sellers"
  className="bg-[#F4F0E8] py-16 md:py-24 overflow-hidden"
>

      <div className="max-w-[1900px] mx-auto px-4 sm:px-6">

        <h2 className="font-instrument text-[40px] md:text-[54px] text-center text-[#22304A] mb-4">
          Shop Our Best Sellers
        </h2>

        <p className="text-center text-gray-600 mb-10 md:mb-14">
          Discover our most loved handcrafted rugs.
        </p>

        <Swiper
          modules={[Autoplay]}
          loop={true}
          speed={6000}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          allowTouchMove={true}
          grabCursor={true}
          spaceBetween={20}
          breakpoints={{
            320: {
              slidesPerView: 1.35,
            },
            480: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 4,
            },
            1400: {
              slidesPerView: 7,
            },
          }}
        >
          {products.map((rug) => (
            <SwiperSlide key={rug.slug}>
              <Link
                href={`/rugs/${rug.slug}`}
                className="group block"
              >
                <div className="overflow-hidden bg-white">

                  <Image
                    src={rug.image}
                    alt={rug.name}
                    width={500}
                    height={700}
                    className="
                      w-full
                      h-[220px]
                      object-cover
                      transition-transform
                      duration-700
                      ease-out
                      group-hover:scale-110
                    "
                  />

                </div>

                <h3 className="font-instrument text-[18px] text-[#22304A] text-center mt-4">
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
