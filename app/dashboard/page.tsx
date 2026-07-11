import Link from "next/link";
import { getDashboardStats } from "@/lib/dashboard";
import OrderCard from "@/components/dashboard/OrderCard";
export default async function DashboardPage() {
const stats = await getDashboardStats();
  return (
    <div className="p-10">

      {/* Header */}

      <div className="mb-10">

        <h1 className="font-instrument text-5xl text-[#2F4F2F]">
          Have a Good Day 👋
        </h1>

        <p className="mt-3 text-[#7B7468]">
          Welcome back. Here's what's happening today.
        </p>

      </div>

      {/* KPI Cards */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
  Total Orders
</p>

<h2 className="mt-3 text-5xl font-bold text-[#2F4F2F]">
  {stats.totalOrders}
</h2>

        </div>

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
            Revenue
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#2F4F2F]">
            ${stats.revenue.toFixed(2)}
          </h2>

        </div>

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <p className="text-sm uppercase tracking-[3px] text-[#B68A35]">
            Completed Orders
          </p>

          <h2 className="mt-3 text-5xl font-bold text-[#2F4F2F]">
           {stats.completedOrders}
          </h2>

        </div>

        </div>
{/* Quick Actions */}

<div className="mt-12 max-w-7xl">

  <h2 className="font-instrument text-3xl text-[#2F4F2F] mb-6">
    Quick Actions
  </h2>

  <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

    <Link
      href="/dashboard/orders"
      className="block rounded-[22px] bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
    >
      <p className="text-4xl">📦</p>

      <h3 className="mt-4 font-semibold text-[#2F4F2F]">
        View Orders
      </h3>

      <p className="mt-2 text-sm text-[#7B7468]">
        Manage all customer orders.
      </p>
    </Link>

    <Link
      href="/dashboard/enquiries"
      className="block rounded-[22px] bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
    >
      <p className="text-4xl">💬</p>

      <h3 className="mt-4 font-semibold text-[#2F4F2F]">
        Customer Enquiries
      </h3>

      <p className="mt-2 text-sm text-[#7B7468]">
        View website enquiries.
      </p>
    </Link>

    <Link
      href="/dashboard/customers"
      className="block rounded-[22px] bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
    >
      <p className="text-4xl">👥</p>

      <h3 className="mt-4 font-semibold text-[#2F4F2F]">
        Customers
      </h3>

      <p className="mt-2 text-sm text-[#7B7468]">
        Browse customer profiles.
      </p>
    </Link>

    <Link
      href="/dashboard/settings"
      className="block rounded-[22px] bg-white p-6 text-left shadow-sm transition hover:shadow-lg"
    >
      <p className="text-4xl">⚙️</p>

      <h3 className="mt-4 font-semibold text-[#2F4F2F]">
        Settings
      </h3>

      <p className="mt-2 text-sm text-[#7B7468]">
        Configure your dashboard.
      </p>
    </Link>

  </div>

</div>

{/* Recent Orders */}
  <div className="w-full rounded-[24px] bg-white p-8 shadow-sm">
  {/* Recent Orders */}

  <div className="w-full rounded-[24px] bg-white p-8 shadow-sm">

    <div className="flex items-center justify-between mb-6">

  <h2 className="font-instrument text-3xl text-[#2F4F2F]">
    Recent Orders
  </h2>

  <button className="text-[#B68A35] font-medium hover:underline">
    View All
  </button>

</div>

<div className="space-y-5">

{stats.recentOrders.map((order: any) => (
  <OrderCard key={order.id} order={order} />
))}

</div>

  </div>

</div>
    </div>
  );
}