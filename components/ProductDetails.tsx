"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import ProductOptions from "@/components/ProductOptions";
import { useCart } from "@/context/CartContext";

export default function ProductDetails({
product,
}: {
product: any;
}) {
const { addToCart } = useCart();
const router = useRouter();

const [shape, setShape] = useState("Rectangle");
const [size, setSize] = useState("2x3");
const [price, setPrice] = useState(199);
const [quantity, setQuantity] = useState(1);

const cartItem = {
id: product.id?.toString() || product.slug,
name: product.name,
image:
product.images?.[0]?.src ||
"/images/rugs/placeholder.jpg",
shape,
size,
price,
quantity,
};

const handleAddToCart = () => {
addToCart(cartItem);
alert("Added To Cart");
};

const handleBuyNow = () => {
addToCart(cartItem);
router.push("/cart");
};

return ( <div>

```
  {/* Category */}

  <p className="uppercase tracking-[3px] text-xs text-[#B89B5E] mb-2">
    {product.categories?.[0]?.name}
  </p>

  {/* Product Name */}

  <h1 className="font-instrument text-[32px] lg:text-[36px] leading-tight text-[#22304A] mb-4">
    {product.name}
  </h1>

  {/* Description */}

  <div
    className="
      text-gray-600
      text-[14px]
      leading-7
      mb-6
      max-w-[700px]
    "
    dangerouslySetInnerHTML={{
      __html: product.description || "",
    }}
  />

  {/* Lead Time */}

  <div className="mb-6">

    <span
      className="
        inline-flex
        items-center
        bg-[#EAE4D8]
        text-[#5D5A3D]
        px-3
        py-1.5
        rounded-full
        text-[12px]
        font-medium
      "
    >
      🚚 Handcrafted To Order • Ships in 60–75 Days
    </span>

  </div>

  {/* Product Options */}

  <ProductOptions
    shape={shape}
    setShape={setShape}
    size={size}
    setSize={setSize}
    price={price}
    setPrice={setPrice}
  />

  {/* Quantity */}

  <div className="mb-8">

    <h3 className="text-[14px] uppercase tracking-[2px] text-[#5D5A3D] mb-3">
      Quantity
    </h3>

    <div className="flex items-center border border-[#D9D1C7] w-fit bg-white">

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => Math.max(1, prev - 1))
        }
        className="px-3 py-1 text-lg"
      >
        −
      </button>

      <span className="px-6 font-medium">
        {quantity}
      </span>

      <button
        type="button"
        onClick={() =>
          setQuantity((prev) => prev + 1)
        }
        className="px-3 py-1 text-lg"
      >
        +
      </button>

    </div>

  </div>

  {/* Buttons */}

  <div className="flex flex-wrap gap-3">

    <button
      onClick={handleAddToCart}
      className="
        bg-[#5D5A3D]
        hover:bg-[#4A472F]
        text-white
        px-8
        py-3
        uppercase
        tracking-[1px]
        text-sm
        transition
      "
    >
      Add To Cart
    </button>

    <button
      onClick={handleBuyNow}
      className="
        border
        border-[#5D5A3D]
        text-[#5D5A3D]
        px-8
        py-3
        uppercase
        tracking-[1px]
        text-sm
        hover:bg-[#5D5A3D]
        hover:text-white
        transition
      "
    >
      Buy Now
    </button>

  </div>

</div>

);
}
