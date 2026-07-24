import { getAllOrders } from "@/lib/dashboard";
import OrderCard from "@/components/dashboard/OrderCard";
import OrderKPICards from "@/components/dashboard/OrderKPICards";
import OrdersToolbar from "@/components/dashboard/OrdersToolbar";

export default async function OrdersPage() {
  const orders = await getAllOrders();

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
<OrderKPICards />
<OrdersToolbar />
      <div className="space-y-5">
        {orders.map((order: any) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>

    </div>
  );
}