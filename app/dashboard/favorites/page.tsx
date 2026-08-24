import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySession } from "@/lib/auth";
import { Heart, Users, TrendingUp } from "lucide-react";
import { getDashboardFavorites } from "@/lib/dashboard-favorites";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function formatDate(dateString: string) {
  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return "Unknown";
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}


export default async function FavoritesPage() {
  const cookieStore = await cookies();
const token = cookieStore.get("session")?.value;

if (!token) {
  redirect("/dashboard/login");
}

const session = await verifySession(token);

if (!session) {
  redirect("/dashboard/login");
}
const data = await getDashboardFavorites();

const stats = {
  totalFavorites: data.totalFavorites,
  uniqueCustomers: data.uniqueCustomers,
};

const recentFavorites =
  data.recentFavorites || [];

const mostFavorited =
  data.mostFavorited || [];

  return (
    <div className="min-h-screen bg-[#F8F6F2] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}

        <header className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FBEAEA]">
              <Heart
                size={24}
                className="text-red-500"
                fill="currentColor"
              />
            </div>

            <div>
              <h1 className="font-instrument text-3xl text-[#2F4F2F] sm:text-4xl">
                Favorites
              </h1>

              <p className="mt-1 text-sm text-[#7B7468]">
                See which rugs customers are saving.
              </p>
            </div>
          </div>
        </header>

        {/* KPI Cards */}

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B68A35]">
                Total Favorites
              </p>

              <Heart
                size={19}
                className="text-red-500"
              />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#2F4F2F]">
              {stats.totalFavorites || 0}
            </p>

            <p className="mt-1 text-xs text-[#9A9387]">
              Saved rug selections
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B68A35]">
                Unique Customers
              </p>

              <Users
                size={19}
                className="text-[#556B2F]"
              />
            </div>

            <p className="mt-4 text-3xl font-bold text-[#2F4F2F]">
              {stats.uniqueCustomers || 0}
            </p>

            <p className="mt-1 text-xs text-[#9A9387]">
              Customers saving rugs
            </p>
          </div>

          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B68A35]">
                Top Rug
              </p>

              <TrendingUp
                size={19}
                className="text-[#B68A35]"
              />
            </div>

            <p className="mt-4 truncate text-xl font-bold text-[#2F4F2F]">
              {mostFavorited[0]?.product?.name ||
                "No favorites yet"}
            </p>

            {mostFavorited[0] && (
              <p className="mt-1 text-xs text-[#9A9387]">
                ❤️ {mostFavorited[0].count} favorites
              </p>
            )}
          </div>

        </section>

        {/* Most Favorited */}

        <section className="mt-8 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">
            <h2 className="font-instrument text-2xl text-[#2F4F2F]">
              Most Favorited Rugs
            </h2>

            <p className="mt-1 text-xs text-[#9A9387]">
              Products receiving the most customer interest.
            </p>
          </div>

          {mostFavorited.length === 0 ? (
            <div className="rounded-xl bg-[#FCFBF8] p-8 text-center text-sm text-[#9A9387]">
              No customer favorites yet.
            </div>
          ) : (
            <div className="space-y-3">

              {mostFavorited
                .slice(0, 10)
                .map((item: any, index: number) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 rounded-xl border border-[#EEE6DA] bg-[#FCFBF8] p-3"
                  >

                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEE9DE] text-sm font-semibold text-[#556B2F]">
                      {index + 1}
                    </div>

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F3F0EA]">
                      {item.product.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-[#9A9387]">
                          No image
                        </span>
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#2F4F2F]">
                        {item.product.name}
                      </p>

                      <p className="mt-1 text-xs text-[#9A9387]">
                        {item.product.price
                          ? `$${item.product.price}`
                          : "Price unavailable"}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-lg font-bold text-red-500">
                        {item.count}
                      </p>

                      <p className="text-[10px] uppercase tracking-[1px] text-[#9A9387]">
                        favorites
                      </p>
                    </div>

                  </div>
                ))}
            </div>
          )}

        </section>

        {/* Recent Favorites */}

        <section className="mt-8 rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm sm:p-6">

          <div className="mb-5">
            <h2 className="font-instrument text-2xl text-[#2F4F2F]">
              Recent Favorites
            </h2>

            <p className="mt-1 text-xs text-[#9A9387]">
              Latest customer rug saves.
            </p>
          </div>

          {recentFavorites.length === 0 ? (
            <div className="rounded-xl bg-[#FCFBF8] p-8 text-center text-sm text-[#9A9387]">
              No customer favorites yet.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">

                <thead>
                  <tr className="border-b border-[#EEE6DA] text-left">
                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[1px] text-[#9A9387]">
                      Customer
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[1px] text-[#9A9387]">
                      Rug
                    </th>

                    <th className="px-3 py-3 text-xs font-semibold uppercase tracking-[1px] text-[#9A9387]">
                      Date
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {recentFavorites
                    .slice(0, 50)
                    .map((favorite: any) => (
                      <tr
                        key={favorite.id}
                        className="border-b border-[#F3EEE5] last:border-0"
                      >

                        <td className="px-3 py-4">
                          <p className="text-sm font-medium text-[#2F4F2F]">
                            {favorite.email}
                          </p>
                        </td>

                        <td className="px-3 py-4">
                          <div className="flex items-center gap-3">

                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-lg bg-[#F3F0EA]">
                              {favorite.product?.image ? (
                                <img
                                  src={
                                    favorite.product.image
                                  }
                                  alt={
                                    favorite.product.name
                                  }
                                  className="h-full w-full object-contain"
                                />
                              ) : null}
                            </div>

                            <span className="text-sm font-medium text-[#2F4F2F]">
                              {favorite.product?.name}
                            </span>

                          </div>
                        </td>

                        <td className="px-3 py-4 text-sm text-[#7B7468]">
                          {formatDate(
                            favorite.createdAt
                          )}
                        </td>

                      </tr>
                    ))}

                </tbody>
              </table>
            </div>
          )}

        </section>

      </div>
    </div>
  );
}