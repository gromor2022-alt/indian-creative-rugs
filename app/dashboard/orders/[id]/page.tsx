import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/dashboard";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const { id } = await params;

const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="p-10">

      {/* Header */}

      <div className="flex items-center justify-between mb-10">

        <div>

          <h1 className="font-instrument text-5xl text-[#2F4F2F]">
            Order #{order.id}
          </h1>

          <p className="mt-3 text-[#7B7468]">
            Order Details
          </p>

        </div>

        <span
          className={`rounded-full px-5 py-2 text-sm font-medium ${
            order.status === "completed"
              ? "bg-green-100 text-green-700"
              : order.status === "processing"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>

      </div>

      <div className="grid lg:grid-cols-2 gap-8">

        {/* Customer */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="font-instrument text-3xl text-[#2F4F2F] mb-6">
            Customer
          </h2>

          <p><strong>Name:</strong> {order.billing.first_name} {order.billing.last_name}</p>

          <p className="mt-3">
            <strong>Email:</strong> {order.billing.email}
          </p>

          <p className="mt-3">
            <strong>Phone:</strong> {order.billing.phone}
          </p>

          <p className="mt-3">
            <strong>Country:</strong> {order.billing.country}
          </p>

        </div>

        {/* Order Summary */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="font-instrument text-3xl text-[#2F4F2F] mb-6">
            Order Summary
          </h2>

          <p><strong>Total:</strong> ${order.total}</p>

          <p className="mt-3">
            <strong>Payment:</strong> {order.payment_method_title}
          </p>

          <p className="mt-3">
            <strong>Date:</strong> {new Date(order.date_created).toLocaleDateString()}
          </p>

              </div>
</div>

      {/* Products Ordered */}

      <div className="mt-8 rounded-[24px] bg-white p-8 shadow-sm">

        <h2 className="font-instrument text-3xl text-[#2F4F2F] mb-6">
          Products Ordered
        </h2>

        <div className="space-y-6">

          {order.line_items.map((item: any) => (

            <div
              key={item.id}
              className="flex items-center justify-between border-b border-[#EEE6DA] pb-4 last:border-0"
            >

              <div>

                <h3 className="font-semibold text-lg text-[#2F4F2F]">
                  {item.name}
                </h3>

                <p className="text-sm text-[#7B7468]">
                  Quantity: {item.quantity}
                </p>

              </div>

              <div className="text-right">

                <p className="font-semibold text-[#2F4F2F]">
                  ${item.total}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>

  );
}