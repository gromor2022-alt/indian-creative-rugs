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
      <div className="w-full aspect-[4/5] rounded-xl border bg-gray-100 flex items-center justify-center">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5">

      {/* Thumbnails */}

      <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
        {validImages.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img.src)}
            className={`w-20 h-20 overflow-hidden rounded-lg border-2 transition-all ${
              selectedImage === img.src
                ? "border-[#22304A]"
                : "border-gray-200"
            }`}
          >
            <Image
              src={img.src}
              alt={`${name} ${index + 1}`}
              width={120}
              height={120}
              quality={85}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}

<div className="flex-1">
  {selectedImage && (
    <Image
      src={selectedImage}
      alt={name}
      width={1200}
      height={1500}
      quality={100}
      priority
      sizes="(max-width:768px) 100vw, 60vw"
      className="w-full h-auto rounded-xl object-cover"
    />
  )}
</div>

    </div>
  );
}