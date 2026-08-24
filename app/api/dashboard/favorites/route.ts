import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/getProducts";
import { requireAdmin } from "@/lib/auth";
import { logger } from "@/lib/logger";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function noCacheResponse(
  data: unknown,
  init?: ResponseInit
) {
  return NextResponse.json(data, {
    ...init,
    headers: {
      "Cache-Control":
        "no-store, no-cache, must-revalidate, proxy-revalidate",
      Pragma: "no-cache",
      Expires: "0",
      ...(init?.headers || {}),
    },
  });
}

export async function GET(req: NextRequest) {
  try {
    const auth = await requireAdmin(req);

    if (!auth.ok) {
      return auth.response;
    }

    const favoriteRecords =
      await prisma.favorite.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    if (favoriteRecords.length === 0) {
      return noCacheResponse({
        success: true,
        stats: {
          totalFavorites: 0,
          uniqueCustomers: 0,
        },
        recentFavorites: [],
        mostFavorited: [],
      });
    }

    const products = await getProducts();

    const productMap = new Map<number, any>(
  products.map((product: any) => [
    product.id,
    product,
  ])
);

    const customerSet = new Set(
      favoriteRecords.map((favorite) => favorite.email)
    );

    const productCounts = new Map<number, number>();

    for (const favorite of favoriteRecords) {
      productCounts.set(
        favorite.productId,
        (productCounts.get(favorite.productId) || 0) + 1
      );
    }

    const recentFavorites = favoriteRecords
      .map((favorite) => {
        const product = productMap.get(
          favorite.productId
        );

        return {
          id: favorite.id,
          email: favorite.email,
          productId: favorite.productId,
          createdAt: favorite.createdAt,
          product: product
            ? {
                id: product.id,
                name: product.name,
                slug: product.slug,
                price: product.price,
                image: product.image,
              }
            : null,
        };
      })
      .filter((favorite) => favorite.product !== null);

    const mostFavorited = Array.from(
      productCounts.entries()
    )
      .map(([productId, count]) => {
        const product = productMap.get(productId);

        if (!product) {
          return null;
        }

        return {
          productId,
          count,
          product: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
          },
        };
      })
      .filter(Boolean)
      .sort((a: any, b: any) => b.count - a.count);

    return noCacheResponse({
      success: true,

      stats: {
        totalFavorites: favoriteRecords.length,
        uniqueCustomers: customerSet.size,
      },

      recentFavorites,

      mostFavorited,
    });
  } catch (error: any) {
    logger.error(
      "ADMIN FAVORITES ERROR",
      error
    );

    return noCacheResponse(
      {
        success: false,
        message:
          error?.message ||
          "Failed to load favorites.",
      },
      { status: 500 }
    );
  }
}