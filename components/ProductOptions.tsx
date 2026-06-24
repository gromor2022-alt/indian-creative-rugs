"use client";

import { useEffect } from "react";

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
  const rectanglePrices: Record<string, number> = {
    "2x3": 199,
    "3x5": 399,
    "4x6": 499,
    "5x7": 599,
    "5x8": 799,
    "6x9": 899,
    "8x10": 1249,
    "8x11": 1349,
    "9x12": 1699,
    "10x13": 1799,
    "10x14": 1899,
    "12x15": 2499,
    "12x18": 2999,
  };

  const squarePrices: Record<string, number> = {
    "5x5": 499,
    "6x6": 699,
    "7x7": 849,
    "8x8": 999,
    "9x9": 1199,
    "10x10": 1499,
    "11x11": 1699,
    "12x12": 1999,
  };

  const runnerPrices: Record<string, number> = {
    "2.5x6": 399,
    "2.5x7": 449,
    "2.5x8": 499,
    "2.5x9": 549,
    "2.5x10": 599,
    "2.5x11": 649,
    "2.5x12": 699,
  };

  const sizes =
    shape === "Rectangle"
      ? Object.keys(rectanglePrices)
      : shape === "Runner"
      ? Object.keys(runnerPrices)
      : Object.keys(squarePrices);

  useEffect(() => {
    if (sizes.length > 0) {
      setSize(sizes[0]);
    }
  }, [shape]);

  useEffect(() => {
    if (!size) return;

    if (shape === "Rectangle") {
      setPrice(rectanglePrices[size]);
    } else if (shape === "Runner") {
      setPrice(runnerPrices[size]);
    } else {
      setPrice(squarePrices[size]);
    }
  }, [shape, size]);

  return (
    <div className="mb-8">

      <p className="text-[30px] font-medium text-[#22304A] mb-6">
        ${price}
      </p>

      <h3 className="text-[14px] uppercase tracking-[2px] text-[#5D5A3D] mb-3">
        Shape
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">

        {["Rectangle", "Square", "Runner"].map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setShape(item)}
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