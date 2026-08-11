"use client";

import FavoriteButton from "@/components/FavoriteButton";
import Image from "next/image";
import Link from "next/link";

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
        <Swiper
          modules={[Autoplay]}
          direction="horizontal"
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={6000}
          allowTouchMove={false}
          spaceBetween={16}
          slidesPerView={2}
          breakpoints={{
            320: {
              slidesPerView: 2,
              spaceBetween: 14,
            },

            480: {
              slidesPerView: 2,
              spaceBetween: 16,
            },

            768: {
              slidesPerView: 3,
              spaceBetween: 20,
            },

            1024: {
              slidesPerView: 4,
              spaceBetween: 20,
            },

            1400: {
              slidesPerView: 5,
              spaceBetween: 20,
            },
          }}
        >
          {products.map((rug) => (
            <SwiperSlide
              key={rug.id}
              className="pb-6"
            >
              <Link
                href={`/rugs/${rug.slug}`}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-[28px] bg-[#FCF8F2] shadow-sm">
                  <FavoriteButton productId={rug.id} />

                  <Image
                    src={
                      rug.images?.[0]?.src ||
                      "/placeholder.jpg"
                    }
                    alt={rug.name}
                    width={500}
                    height={700}
                    sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, (max-width: 1399px) 25vw, 20vw"
                    className="
                      w-full
                      h-[360px]
                      sm:h-[400px]
                      md:h-[460px]
                      lg:h-[520px]
                      object-cover
                    "
                  />
                </div>

                <h3
                  className="
                    mt-6
                    md:mt-8
                    text-center
                    font-instrument
                    text-[18px]
                    sm:text-[21px]
                    md:text-[24px]
                    text-[#556B2F]
                    tracking-[0.5px]
                  "
                >
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