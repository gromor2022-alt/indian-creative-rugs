import {
  STARTING_REGULAR_PRICE,
  activeSalePercent,
  applySale,
  formatUSD,
} from "@/lib/pricing";

/**
 * "From $149.25 $199" label for product cards. Every rug uses the same price
 * table (lib/pricing.ts), so the starting price is the same for all rugs.
 */
export default function PriceFrom({ className = "" }: { className?: string }) {
  const salePercent = activeSalePercent();
  const sale = applySale(STARTING_REGULAR_PRICE);

  return (
    <p className={`flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span>From {formatUSD(sale)}</span>

      {salePercent > 0 && (
        <>
          <span className="text-[0.85em] text-gray-500 line-through">
            <span className="sr-only">Regular price: </span>
            {formatUSD(STARTING_REGULAR_PRICE)}
          </span>
          <span className="text-[0.7em] font-semibold uppercase tracking-[1px] text-[#B68A35]">
            {salePercent}% off
          </span>
        </>
      )}
    </p>
  );
}
