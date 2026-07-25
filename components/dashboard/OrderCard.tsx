"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UpdateShipDateModal from "@/components/dashboard/UpdateShipDateModal";
import ShippingModal from "@/components/dashboard/ShippingModal";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import { getTrackingUrl } from "@/lib/tracking";
import RefundModal from "@/components/dashboard/RefundModal";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
const [showMenu, setShowMenu] = useState(false);
const [showShipDateModal, setShowShipDateModal] = useState(false);
const [showShippingModal, setShowShippingModal] = useState(false);
const [showCompleteModal, setShowCompleteModal] = useState(false);
const [completing, setCompleting] = useState(false);
const router = useRouter();
const [showCancelModal, setShowCancelModal] = useState(false);
const [cancelling, setCancelling] = useState(false);
const [showRefundModal, setShowRefundModal] = useState(false);
const [refundReason, setRefundReason] = useState("");
const [refunding, setRefunding] = useState(false);

async function markAsShipped() {

  setCompleting(true);

  try {

    const response = await fetch("/api/dashboard/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        status: "completed",
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order marked as shipped successfully ✅");
      setShowCompleteModal(false);
      router.refresh();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }

  setCompleting(false);

}

async function cancelOrder() {

  setCancelling(true);

  try {

    const response = await fetch("/api/dashboard/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        status: "cancelled",
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order cancelled successfully ✅");
      setShowCancelModal(false);
      router.refresh();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }

  setCancelling(false);

}

const carrier =
  order.meta_data?.find(
    (meta: any) => meta.key === "_icr_carrier"
  )?.value || "";
const trackingNumber =
  order.meta_data?.find(
    (meta: any) => meta.key === "_icr_tracking_number"
  )?.value || "";

const pickupDate =
  order.meta_data?.find(
    (meta: any) => meta.key === "_icr_pickup_date"
  )?.value || "";

const shipDate =
  order.meta_data?.find(
    (meta: any) => meta.key === "_icr_ship_date"
  )?.value || "";
console.log({
  carrier,
  trackingNumber,
});
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
    <div className="absolute right-0 top-10 z-20 w-48 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white shadow-lg">

      <button className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#F8F6F2] transition">
        👁 View Order
      </button>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowShipDateModal(true);
  }}
  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#F8F6F2] transition"
>
  📅 Update Ship Date
</button>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowShippingModal(true);
  }}
  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#F8F6F2] transition"
>
  📦 Shipping Details
</button>

      <p className="mt-2 text-sm text-[#7B7468]">
  Tracking:
  <span className="ml-2 font-medium text-[#2F4F2F]">
    {trackingNumber || "Not Assigned"}
  </span>

  {trackingNumber && carrier && (
    <>
      <br />

      <a
        href={getTrackingUrl(carrier, trackingNumber)}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        🔗 Track Shipment
      </a>
    </>
  )}
</p>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowCompleteModal(true);
  }}
  className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-left hover:bg-[#F8F6F2] transition"
>
  🚚 Mark as Shipped
</button>

      <button
  onClick={() => {
    setShowRefundModal(true);
    setShowMenu(false);
  }}
  className="block w-full px-4 py-2 text-left text-orange-600 hover:bg-orange-50"
>
  💰 Request Refund
</button>

      <button
  onClick={() => {
    setShowMenu(false);
    setShowCancelModal(true);
  }}
  className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm text-red-600 transition hover:bg-[#F8F6F2]"
>
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
<p className="mt-2 text-sm text-[#7B7468]">
  Carrier:
  <span className="ml-2 font-medium text-[#2F4F2F]">
    {order.meta_data?.find(
      (meta: any) => meta.key === "_icr_carrier"
    )?.value || "Not Assigned"}
  </span>
</p>

<p className="mt-2 text-sm text-[#7B7468]">
  Tracking:
  <span className="ml-2 font-medium text-[#2F4F2F]">
    {order.meta_data?.find(
      (meta: any) => meta.key === "_icr_tracking_number"
    )?.value || "Not Assigned"}
  </span>
</p>

<p className="mt-2 text-sm text-[#7B7468]">
  Pickup Date:
  <span className="ml-2 font-medium text-[#2F4F2F]">
    {order.meta_data?.find(
      (meta: any) => meta.key === "_icr_pickup_date"
    )?.value || "Not Scheduled"}
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
  orderId={order.id}
/>  
<ConfirmationModal
  open={showCompleteModal}
  title="Mark Order as Shipped?"
  message="This will move the order to the Completed tab. Continue?"
  confirmText="Yes, Mark Shipped"
  onCancel={() => setShowCompleteModal(false)}
  onConfirm={markAsShipped}
  loading={completing}
/>
<ConfirmationModal
  open={showCancelModal}
  title="Cancel this Order?"
  message="This action will move the order to the Cancelled tab."
  confirmText="Yes, Cancel Order"
  onCancel={() => setShowCancelModal(false)}
  onConfirm={cancelOrder}
  loading={cancelling}
/>

<RefundModal
  open={showRefundModal}
  onClose={() => setShowRefundModal(false)}
  order={order}
  onSuccess={() => router.refresh()}
/>

  </div>
  );
}	