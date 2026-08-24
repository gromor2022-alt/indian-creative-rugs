import { prisma } from "./prisma";
import { getProducts } from "./getProducts";
import { logger } from "./logger";

export async function getDashboardFavorites() {
  try {
    const favoriteRecords =
      await prisma.favorite.findMany({
        orderBy: {
          createdAt: "desc",
        },
      });

    if (favoriteRecords.length === 0) {
      return {
        totalFavorites: 0,
        uniqueCustomers: 0,
        recentFavorites: [],
        mostFavorited: [],
      };
    }

    const products = await getProducts();

    const productMap = new Map<number, any>(
  products.map((product: any) => [
    product.id,
    product,
  ])
);

    const uniqueCustomers = new Set(
      favoriteRecords.map(
        (favorite) => favorite.email
      )
    ).size;

    const productCounts = new Map<
      number,
      number
    >();

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

        if (!product) {
          return null;
        }

        return {
          id: favorite.id,
          email: favorite.email,
          productId: favorite.productId,
          createdAt: favorite.createdAt,
          product: {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            image: product.image,
          },
        };
      })
      .filter(Boolean);

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
      .sort(
        (a: any, b: any) =>
          b.count - a.count
      );

    return {
      totalFavorites: favoriteRecords.length,
      uniqueCustomers,
      recentFavorites,
      mostFavorited,
    };
  } catch (error) {
    logger.error(
      "Dashboard Favorites Error",
      error
    );

    return {
      totalFavorites: 0,
      uniqueCustomers: 0,
      recentFavorites: [],
      mostFavorited: [],
    };
  }
}