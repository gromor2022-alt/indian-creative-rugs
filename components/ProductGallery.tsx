"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({
  images,
  name,
}: {
  images: any[];
  name: string;
}) {
  const [selectedImage, setSelectedImage] = useState(
    images?.[0]?.src
  );

  return (
    <div className="flex gap-4">

      {/* Thumbnails */}

      <div className="flex flex-col gap-3">

        {images?.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(img.src)}
            className="border overflow-hidden w-24 h-24"
          >
            <Image
              src={img.src}
              alt={name}
              width={100}
              height={100}
              className="w-full h-full object-cover"
            />
          </button>
        ))}

      </div>

      {/* Main Image */}

      <div className="flex-1">

        <Image
          src={selectedImage}
          alt={name}
          width={1000}
          height={1200}
          className="w-full object-cover"
        />

      </div>

    </div>
  );
}