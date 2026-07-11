import Link from "next/link";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  return (
    <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6 transition hover:shadow-md">

      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold text-[#2F4F2F]">
            Order #{order.id}
          </h3>

          <p className="mt-2 text-[#7B7468]">
            {order.billing.first_name} {order.billing.last_name}
          </p>

          <p className="text-sm text-[#9A9387]">
            {order.billing.country}
          </p>

        </div>

        <span
          className={`rounded-full px-4 py-2 text-sm font-medium ${
            order.status === "completed"
              ? "bg-green-100 text-green-700"
              : order.status === "processing"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "pending"
              ? "bg-orange-100 text-orange-700"
              : order.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {order.status}
        </span>

      </div>

      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-sm text-[#9A9387]">
            Order Value
          </p>

          <p className="text-2xl font-bold text-[#2F4F2F]">
            ${order.total}
          </p>

        </div>

        <Link
          href={`/dashboard/orders/${order.id}`}
          className="rounded-full bg-[#556B2F] px-5 py-2 text-white transition hover:bg-[#B68A35]"
        >
          View Details →
        </Link>

      </div>

    </div>
  );
}