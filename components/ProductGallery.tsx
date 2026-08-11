"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface ProductImage {
  src: string;
}

interface Props {
  images: ProductImage[];
  name: string;
}

export default function ProductGallery({
  images = [],
  name,
}: Props) {
  const validImages = images.filter((img) => img?.src);

  const [selectedImage, setSelectedImage] = useState(
    validImages[0]?.src ?? ""
  );

  useEffect(() => {
    if (validImages.length > 0) {
      setSelectedImage(validImages[0].src);
    }
  }, [images]);

  if (validImages.length === 0) {
    return (
      <div className="flex min-h-[420px] w-full items-center justify-center rounded-2xl border border-[#E9E4DC] bg-[#F7F4EF]">
        <span className="text-sm text-[#7B7468]">
          No Image Available
        </span>
      </div>
    );
  }

  return (
    <div className="w-full min-w-0 lg:flex lg:items-start lg:gap-5">
      {/* =========================
          MOBILE / TABLET GALLERY
          ========================= */}

      <div className="w-full min-w-0 lg:hidden">
        {/* Main Image */}
        <div className="flex w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F8F6F2] px-3 py-4 sm:px-5 sm:py-5">
          {selectedImage && (
            <Image
              src={selectedImage}
              alt={name}
              width={1200}
              height={1500}
              quality={95}
              priority
              sizes="100vw"
              className="
                block
                h-auto
                w-full
                max-h-[50svh]
                max-w-[100%]
                rounded-lg
                object-contain
                object-center
                sm:max-h-[54svh]
              "
            />
          )}
        </div>

        {/* Mobile Thumbnails */}
        <div className="mt-4 flex w-full justify-center gap-2 overflow-x-auto px-1 pb-1">
          {validImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img.src)}
              aria-label={`View ${name} image ${index + 1}`}
              className={`
                h-14
                w-14
                shrink-0
                overflow-hidden
                rounded-lg
                border-2
                bg-white
                transition-all
                duration-300
                sm:h-16
                sm:w-16
                ${
                  selectedImage === img.src
                    ? "border-[#22304A] shadow-sm"
                    : "border-[#E5E0D8] hover:border-[#9A9489]"
                }
              `}
            >
              <Image
                src={img.src}
                alt={`${name} ${index + 1}`}
                width={120}
                height={120}
                quality={85}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* =========================
          DESKTOP GALLERY
          ========================= */}

      <div className="hidden w-full min-w-0 lg:flex lg:items-start lg:gap-5">
        {/* Desktop Thumbnails */}
        <div className="flex w-[72px] shrink-0 flex-col gap-3">
          {validImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img.src)}
              aria-label={`View ${name} image ${index + 1}`}
              className={`
                h-[72px]
                w-[72px]
                shrink-0
                overflow-hidden
                rounded-lg
                border-2
                bg-white
                transition-all
                duration-300
                ${
                  selectedImage === img.src
                    ? "border-[#22304A] shadow-sm"
                    : "border-[#E5E0D8] hover:border-[#9A9489]"
                }
              `}
            >
              <Image
                src={img.src}
                alt={`${name} ${index + 1}`}
                width={120}
                height={120}
                quality={85}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>

        {/* Desktop Main Image */}
        <div className="flex min-w-0 flex-1 justify-center">
          {selectedImage && (
            <div className="flex w-full max-w-[640px] items-center justify-center overflow-hidden rounded-2xl bg-[#F8F6F2] px-6 py-6">
              <Image
                src={selectedImage}
                alt={name}
                width={1200}
                height={1500}
                quality={95}
                priority
                sizes="640px"
                className="
                  block
                  h-auto
                  w-auto
                  max-h-[620px]
                  max-w-[600px]
                  rounded-lg
                  object-contain
                  object-center
                "
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}