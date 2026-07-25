import Link from "next/link";
export const dynamic = "force-dynamic";
export const revalidate = 0;
import { getAllOrders } from "@/lib/dashboard";
import OrderCard from "@/components/dashboard/OrderCard";


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

          <div className="mb-8 flex justify-end">

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

<div className="mt-8 mb-8 flex gap-3">

  <Link
    href="/dashboard/orders?tab=active"
    className={`rounded-full px-6 py-2 transition ${
      tab === "active"
        ? "bg-[#2F4F2F] text-white"
        : "border border-[#DDD6CC]"
    }`}
  >
    New
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

  
</div>

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