import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProducts } from "@/lib/getProducts";

export async function GET(req: NextRequest) {
  try {
    const email = req.nextUrl.searchParams.get("email");

    if (!email) {
      return NextResponse.json({
        success: false,
        message: "Email is required.",
      });
    }

    // Fetch favorite records from Neon
    const favoriteRecords = await prisma.favorite.findMany({
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
      return NextResponse.json({
        success: true,
        favorites: [],
      });
    }

    // Fetch WooCommerce products
    const products = await getProducts();

    // Return only favorite products
    const favorites = products.filter((product: any) =>
      favoriteIds.includes(product.id)
    );

    return NextResponse.json({
      success: true,
      favorites,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { email, productId } = await req.json();

    if (!email || !productId) {
      return NextResponse.json({
        success: false,
        message: "Email and Product ID are required.",
      });
    }

    const favorite = await prisma.favorite.upsert({
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

    return NextResponse.json({
      success: true,
      favorite,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { email, productId } = await req.json();

    await prisma.favorite.delete({
      where: {
        email_productId: {
          email,
          productId,
        },
      },
    });

    return NextResponse.json({
      success: true,
    });

  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
}