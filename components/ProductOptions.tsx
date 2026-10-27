"use client";

import { useEffect } from "react";
import {
  SHAPES,
  activeSalePercent,
  formatUSD,
  getRegularPrice,
  getSalePrice,
  sizesForShape,
} from "@/lib/pricing";

type ProductOptionsProps = {
  shape: string;
  setShape: (value: string) => void;
  size: string;
  setSize: (value: string) => void;
  price: number;
  setPrice: (value: number) => void;
};

export default function ProductOptions({
  shape,
  setShape,
  size,
  setSize,
  price,
  setPrice,
}: ProductOptionsProps) {
  const sizes = sizesForShape(shape);
  const salePercent = activeSalePercent();
  const regularPrice = getRegularPrice(shape, size);

  // Reset to the first size when the shape changes.
  useEffect(() => {
    if (sizes.length > 0 && !sizes.includes(size)) {
      setSize(sizes[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape]);

  // Keep the price in sync with the selected shape and size.
  useEffect(() => {
    const next = getSalePrice(shape, size);
    if (next !== null) {
      setPrice(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shape, size]);

  return (
    <div className="mb-8">

      <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <p className="text-[30px] font-medium text-[#22304A]">
          {salePercent > 0 && (
            <span className="sr-only">Sale price: </span>
          )}
          {formatUSD(price)}
        </p>

        {salePercent > 0 && regularPrice !== null && regularPrice > price && (
          <>
            <p className="text-[20px] text-gray-500 line-through">
              <span className="sr-only">Regular price: </span>
              {formatUSD(regularPrice)}
            </p>

            <span className="rounded-full bg-[#B68A35] px-3 py-1 text-[12px] font-semibold uppercase tracking-[1px] text-white">
              {salePercent}% off
            </span>
          </>
        )}
      </div>

      <h3 className="text-[14px] uppercase tracking-[2px] text-[#5D5A3D] mb-3">
        Shape
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">

        {SHAPES.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setShape(item)}
            aria-pressed={shape === item}
            className={`px-4 py-2 text-sm border transition ${
              shape === item
                ? "bg-[#22304A] text-white border-[#22304A]"
                : "bg-white text-[#22304A] border-[#D9D1C7]"
            }`}
          >
            {item}
          </button>
        ))}

      </div>

      <h3 className="text-[14px] uppercase tracking-[2px] text-[#5D5A3D] mb-3">
        Size
      </h3>

      <select
        value={size}
        onChange={(e) => setSize(e.target.value)}
        aria-label="Size"
        className="
          border
          border-[#D9D1C7]
          px-3
          py-2
          text-sm
          w-full
          bg-white
        "
      >
        {sizes.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>

      <div className="mt-6">

        <h3 className="text-[14px] uppercase tracking-[2px] text-[#5D5A3D] mb-3">
          Custom Notes (Optional)
        </h3>

        <textarea
          placeholder="Any special instructions?"
          className="
            w-full
            border
            border-[#D9D1C7]
            p-3
            min-h-[90px]
            bg-white
            text-sm
          "
        />

      </div>

    </div>
  );
}
