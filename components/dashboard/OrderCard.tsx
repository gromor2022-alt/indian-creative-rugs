"use client";

import { useState } from "react";
import Link from "next/link";
import UpdateShipDateModal from "@/components/dashboard/UpdateShipDateModal";
import ShippingModal from "@/components/dashboard/ShippingModal";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
const [showMenu, setShowMenu] = useState(false);
const [showShipDateModal, setShowShipDateModal] = useState(false);
const [showShippingModal, setShowShippingModal] = useState(false);

  return (
    <div className="rounded-2xl border border-[#E8E2D9] bg-white p-6 transition hover:shadow-md">

      {/* Header */}
      <div className="flex items-start justify-between">

        <div>

          <h3 className="text-xl font-semibold text-[#2F4F2F]">
            Order #{order.id}
          </h3>

          <p className="mt-2 font-medium text-[#7B7468]">
            {order.billing.first_name} {order.billing.last_name}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">

            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
              🇺🇸 USA
            </span>

            <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
              Online Order
            </span>

          </div>

        </div>

        <div className="relative">

  <button
    onClick={() => setShowMenu(!showMenu)}
    className="rounded-lg p-2 text-xl text-[#7B7468] transition hover:bg-[#F5F3EF]"
  >
    ⋮
  </button>

  {showMenu && (
    <div className="absolute right-0 mt-2 w-60 rounded-xl border border-[#E7E1D8] bg-white shadow-xl z-20">

      <button className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2]">
        👁 View Order
      </button>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowShipDateModal(true);
  }}
  className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2]"
>
  📅 Update Ship Date
</button>

      <button className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2]">
        🚚 Ready for Shipping
      </button>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowShippingModal(true);
  }}
  className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2]"
>
  📦 Shipping Details
</button>

      <button className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2]">
        🔢 Add Tracking Number
      </button>

      <button className="w-full px-4 py-3 text-left hover:bg-[#F8F6F2] text-green-700">
        ✅ Mark Complete
      </button>

      <button className="w-full px-4 py-3 text-left hover:bg-[#FFF5F5] text-orange-600">
        💸 Refund
      </button>

      <button className="w-full px-4 py-3 text-left hover:bg-[#FFF5F5] text-red-600">
        ❌ Cancel Order
      </button>

    </div>
  )}

</div>

      </div>

      {/* Status */}
      <div className="mt-5">

        <span
          className={`inline-flex rounded-full px-4 py-2 text-sm font-medium ${
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

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">

        <div>

          <p className="text-sm text-[#9A9387]">
            Order Value
          </p>

          <p className="mt-1 text-2xl font-bold text-[#2F4F2F]">
            ${order.total}
          </p>

          <p className="mt-3 text-sm text-[#7B7468]">
            Expected Ship Date:
            <span className="ml-2 font-medium text-[#2F4F2F]">
              {order.meta_data?.find(
  (meta: any) => meta.key === "_icr_ship_date"
)?.value || "Not Set"}
            </span>
          </p>

        </div>

        <Link
          href={`/dashboard/orders/${order.id}`}
          className="rounded-full bg-[#556B2F] px-5 py-2 text-white transition hover:bg-[#B68A35]"
        >
          View Details →
        </Link>

      </div>
<UpdateShipDateModal
  open={showShipDateModal}
  onClose={() => setShowShipDateModal(false)}
  orderId={order.id}
/>

<ShippingModal
  open={showShippingModal}
  onClose={() => setShowShippingModal(false)}
/>
    </div>
  );
}	