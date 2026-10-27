/**
 * Single source of truth for rug prices and the current sale.
 *
 * Used by the product page (display), the cart and checkout (display), and
 * /api/create-order (the price actually charged). Change prices or the sale
 * here only, so what customers see always matches what they pay.
 *
 * Safe to import from client and server code (no secrets, no env vars).
 */

/* ------------------------------------------------------------------ */
/* Sale settings                                                       */
/* ------------------------------------------------------------------ */

export const SALE = {
  /** Percent off every rug, size and shape. Set to 0 to turn the sale off. */
  percent: 25,

  /**
   * Optional end of the sale as an ISO date-time, e.g. "2026-12-01T00:00:00-05:00".
   * null = runs until `percent` is set back to 0.
   */
  endsAt: null as string | null,
};

/** Percent off right now (0 when no sale is running). */
export function activeSalePercent(now: Date = new Date()): number {
  if (!SALE.percent || SALE.percent <= 0 || SALE.percent >= 100) return 0;
  if (SALE.endsAt && now >= new Date(SALE.endsAt)) return 0;
  return SALE.percent;
}

/* ------------------------------------------------------------------ */
/* Price table (regular prices, USD)                                  */
/* ------------------------------------------------------------------ */

export const PRICE_TABLE: Record<string, Record<string, number>> = {
  Rectangle: {
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
  },
  Square: {
    "5x5": 499,
    "6x6": 699,
    "7x7": 849,
    "8x8": 999,
    "9x9": 1199,
    "10x10": 1499,
    "11x11": 1699,
    "12x12": 1999,
  },
  Runner: {
    "2.5x6": 399,
    "2.5x7": 449,
    "2.5x8": 499,
    "2.5x9": 549,
    "2.5x10": 599,
    "2.5x11": 649,
    "2.5x12": 699,
  },
};

export const SHAPES = Object.keys(PRICE_TABLE);
export const DEFAULT_SHAPE = "Rectangle";
export const DEFAULT_SIZE = "2x3";

export function sizesForShape(shape: string): string[] {
  return Object.keys(PRICE_TABLE[shape] ?? {});
}

/** Regular (pre-sale) price, or null for an unknown shape/size. */
export function getRegularPrice(shape: string, size: string): number | null {
  return PRICE_TABLE[shape]?.[size] ?? null;
}

/**
 * Applies the active sale to a regular price, rounded to the cent.
 * Example at 25%: 199 → 149.25, 1249 → 936.75.
 */
export function applySale(regular: number, now: Date = new Date()): number {
  const pct = activeSalePercent(now);
  // Work in cents to avoid floating-point drift.
  return Math.round(regular * (100 - pct)) / 100;
}

/** Price the customer pays, or null for an unknown shape/size. */
export function getSalePrice(
  shape: string,
  size: string,
  now: Date = new Date()
): number | null {
  const regular = getRegularPrice(shape, size);
  return regular === null ? null : applySale(regular, now);
}

/** Lowest regular price across all shapes and sizes ("From $199"). */
export const STARTING_REGULAR_PRICE = Math.min(
  ...Object.values(PRICE_TABLE).flatMap((sizes) => Object.values(sizes))
);

/** Total saved by the sale across cart lines (0 when no sale is running). */
export function cartSavings(
  items: { shape: string; size: string; price: number; quantity: number }[]
): number {
  const cents = items.reduce((sum, item) => {
    const regular = getRegularPrice(item.shape, item.size);
    if (regular === null) return sum;
    return sum + Math.round((regular - item.price) * 100) * item.quantity;
  }, 0);
  return Math.max(0, cents) / 100;
}

export function formatUSD(amount: number): string {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
}
