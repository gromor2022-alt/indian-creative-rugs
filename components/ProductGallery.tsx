"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images = [],
  name,
}: {
  images: any[];
  name: string;
}) {
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
  console.log(images);
    const validImage = images.find((img) => img?.src);

    if (validImage) {
      setSelectedImage(validImage.src);
    }
  }, [images]);

  const validImages = images.filter((img) => img?.src);

  if (validImages.length === 0) {
    return (
      <div className="w-full aspect-[4/5] bg-white border flex items-center justify-center text-gray-500">
        No Image Available
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      {/* Thumbnails */}

      <div className="flex lg:flex-col gap-3 order-2 lg:order-1">
        {validImages.map((img: any, index: number) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedImage(img.src)}
            className={`border overflow-hidden w-20 h-20 transition ${
              selectedImage === img.src
                ? "border-[#22304A]"
                : "border-gray-300"
            }`}
          >
            <Image
              src={img.src}
              alt={`${name} ${index + 1}`}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>

      {/* Main Image */}

      <div className="flex-1 order-1 lg:order-2">
        {selectedImage && (
          <Image
            src={selectedImage}
            alt={name}
            width={900}
            height={1100}
            className="w-full h-auto object-cover"
            priority
          />
        )}
      </div>
    </div>
  );
}