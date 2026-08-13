import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/getProducts";
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
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return noCacheResponse({
        success: false,
        message: "Email is required.",
      });
    }

    // Always read the latest favorite records from Neon.
    const favoriteRecords =
      await prisma.favorite.findMany({
        where: {
          email,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

    const favoriteIds = favoriteRecords.map(
      (favorite) => favorite.productId
    );

    if (favoriteIds.length === 0) {
      return noCacheResponse({
        success: true,
        favorites: [],
      });
    }

    // Fetch product data.
    const products = await getProducts();

    // Return only currently favorited products.
    const favorites = products.filter(
      (product: any) =>
        favoriteIds.includes(product.id)
    );

    return noCacheResponse({
      success: true,
      favorites,
    });
  } catch (error: any) {
    logger.error("GET FAVORITES ERROR", error);

    return noCacheResponse({
      success: false,
      message: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, productId } =
      await req.json();

    if (!email || !productId) {
      return noCacheResponse({
        success: false,
        message:
          "Email and Product ID are required.",
      });
    }

    const favorite =
      await prisma.favorite.upsert({
        where: {
          email_productId: {
            email,
            productId,
          },
        },
        update: {},
        create: {
          email,
          productId,
        },
      });

    return noCacheResponse({
      success: true,
      favorite,
    });
  } catch (error: any) {
    logger.error("POST FAVORITES ERROR", error);

    return noCacheResponse({
      success: false,
      message: error.message,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email, productId } =
      await req.json();

    if (!email || !productId) {
      return noCacheResponse({
        success: false,
        message:
          "Email and Product ID are required.",
      });
    }

    await prisma.favorite.delete({
      where: {
        email_productId: {
          email,
          productId,
        },
      },
    });

    return noCacheResponse({
      success: true,
    });
  } catch (error: any) {
    logger.error("DELETE FAVORITES ERROR", error);

    return noCacheResponse({
      success: false,
      message: error.message,
    });
  }
}