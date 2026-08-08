import Link from "next/link";
import { getDashboardStats } from "@/lib/dashboard";
import OrderCard from "@/components/dashboard/OrderCard";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function DashboardPage() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "Total Orders",
      value: String(stats.totalOrders),
      hint: "All customer orders",
    },
    {
      label: "Revenue",
      value: `$${Number(stats.revenue).toFixed(2)}`,
      hint: "Completed order revenue",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2] px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-7">
          <h1 className="font-instrument text-3xl text-[#2F4F2F] sm:text-4xl">
            Welcome Back, ICR 👋
          </h1>
          <p className="mt-1.5 text-sm text-[#7B7468]">
            Here&apos;s what&apos;s happening today.
          </p>
        </header>

        {/* Compact KPI cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.label}
              className="min-w-0 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white p-5 shadow-sm"
            >
              <p className="truncate text-[11px] font-semibold uppercase tracking-[2px] text-[#B68A35]">
                {card.label}
              </p>
              <div className="mt-3 min-w-0 max-w-full overflow-hidden rounded-xl bg-[#FCFBF8] px-4 py-3">
                <p className="break-all text-2xl font-bold leading-tight text-[#2F4F2F] sm:text-3xl">
                  {card.value}
                </p>
              </div>
              <p className="mt-2 text-xs text-[#9A9387]">{card.hint}</p>
            </div>
          ))}
        </div>

        <section className="mt-8">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="font-instrument text-2xl text-[#2F4F2F] sm:text-3xl">
              Quick Actions
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <Link
              href="/dashboard/orders"
              className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-2xl">📦</p>
              <h3 className="mt-3 text-sm font-semibold text-[#2F4F2F]">
                View Orders
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7B7468]">
                Manage customer orders.
              </p>
            </Link>

            <Link
              href="/dashboard/enquiries"
              className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-2xl">💬</p>
              <h3 className="mt-3 text-sm font-semibold text-[#2F4F2F]">
                Customer Enquiries
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7B7468]">
                View website enquiries.
              </p>
            </Link>

            <Link
              href="/dashboard/customers"
              className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-2xl">👥</p>
              <h3 className="mt-3 text-sm font-semibold text-[#2F4F2F]">
                Customers
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7B7468]">
                Browse customer profiles.
              </p>
            </Link>

            <Link
              href="/dashboard/settings"
              className="rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <p className="text-2xl">⚙️</p>
              <h3 className="mt-3 text-sm font-semibold text-[#2F4F2F]">
                Settings
              </h3>
              <p className="mt-1 text-xs leading-5 text-[#7B7468]">
                Configure your dashboard.
              </p>
            </Link>
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-[#E8E2D9] bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="font-instrument text-2xl text-[#2F4F2F]">
                Recent Orders
              </h2>
              <p className="mt-1 text-xs text-[#9A9387]">
                Latest activity from WooCommerce.
              </p>
            </div>
            <Link
              href="/dashboard/orders"
              className="shrink-0 text-xs font-semibold text-[#B68A35] hover:underline sm:text-sm"
            >
              View All →
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentOrders.map((order: any) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
