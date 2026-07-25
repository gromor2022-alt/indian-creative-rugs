import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getAllOrders } from "@/lib/dashboard";
import OrderCard from "@/components/dashboard/OrderCard";
import OrderKPICards from "@/components/dashboard/OrderKPICards";
import OrdersToolbar from "@/components/dashboard/OrdersToolbar";

export default async function OrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: string }>;
})
 {  const orders = await getAllOrders();
const { tab = "active" } = await searchParams;
const filteredOrders = orders.filter((order: any) => {
  if (tab === "completed") {
    return order.status === "completed";
  }

  if (tab === "cancelled") {
    return order.status === "cancelled";
  }

  return ["pending", "processing", "on-hold"].includes(order.status);
});


  return (
    <div className="p-10 space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between mb-10">

        <div>

          <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <input
              type="text"
              placeholder="🔍 Search by Order ID or Customer..."
              className="w-full max-w-md rounded-full border border-[#DDD6CC] px-5 py-3 outline-none focus:border-[#B68A35]"
            />

            <div className="text-[#7B7468]">
              Total Orders{" "}
              <span className="font-semibold text-[#2F4F2F]">
                {orders.length}
              </span>
            </div>

          </div>

          <h1 className="font-instrument text-5xl text-[#2F4F2F]">
            Orders
          </h1>

          <p className="mt-3 text-[#7B7468]">
            Manage all WooCommerce orders.
          </p>

        </div>

      </div>

     
      {/* Existing Order Cards */}
<OrderKPICards orders={orders} />
<div className="mt-8 mb-8 flex gap-3">

  <Link
    href="/dashboard/orders?tab=active"
    className={`rounded-full px-6 py-2 transition ${
      tab === "active"
        ? "bg-[#2F4F2F] text-white"
        : "border border-[#DDD6CC]"
    }`}
  >
    Active
  </Link>

  <Link
    href="/dashboard/orders?tab=completed"
    className={`rounded-full px-6 py-2 transition ${
      tab === "completed"
        ? "bg-[#2F4F2F] text-white"
        : "border border-[#DDD6CC]"
    }`}
  >
    Completed
  </Link>

  <Link
    href="/dashboard/orders?tab=cancelled"
    className={`rounded-full px-6 py-2 transition ${
      tab === "cancelled"
        ? "bg-[#2F4F2F] text-white"
        : "border border-[#DDD6CC]"
    }`}
  >
    Cancelled
  </Link>

</div>
<OrdersToolbar />
      <div className="space-y-5">
        {filteredOrders.map((order: any) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>

    </div>
  );
}