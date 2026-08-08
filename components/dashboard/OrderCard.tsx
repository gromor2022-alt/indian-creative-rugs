"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ShippingModal from "@/components/dashboard/ShippingModal";
import ConfirmationModal from "@/components/dashboard/ConfirmationModal";
import RefundModal from "@/components/dashboard/RefundModal";

interface OrderCardProps {
  order: any;
}

function getMetaValue(item: any, keys: string[]) {
  const meta = item?.meta_data?.find((entry: any) =>
    keys.some(
      (key) =>
        String(entry.key).toLowerCase() === key.toLowerCase()
    )
  );

  return meta?.value || "";
}

function getExpectedShipDate(order: any) {
  const savedDate = order.meta_data?.find(
    (meta: any) => meta.key === "_icr_ship_date"
  )?.value;

  if (savedDate) {
    return savedDate;
  }

  if (!order.date_created) {
    return "";
  }

  const date = new Date(order.date_created);
  date.setDate(date.getDate() + 35);

  return date.toISOString().split("T")[0];
}

function formatDate(dateString: string) {
  if (!dateString) return "Not Set";

  const date = new Date(dateString);

  if (Number.isNaN(date.getTime())) {
    return dateString;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getShippingAddress(order: any) {
  const shipping = order.shipping || {};
  const billing = order.billing || {};

  const address = [
    shipping.address_1 || billing.address_1,
    shipping.address_2 || billing.address_2,
    shipping.city || billing.city,
    shipping.state || billing.state,
    shipping.postcode || billing.postcode,
    shipping.country || billing.country,
  ].filter(Boolean);

  return address;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [showShippingModal, setShowShippingModal] = useState(false);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const [completing, setCompleting] = useState(false);
  const [cancelling, setCancelling] = useState(false);

  const router = useRouter();

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

  const expectedShipDate = getExpectedShipDate(order);

  const shippingAddress = getShippingAddress(order);

  const items = order.line_items || [];

  async function markAsCompleted() {
    setCompleting(true);

    try {
      const response = await fetch(
        "/api/dashboard/orders/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
            status: "completed",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order completed successfully ✅");
        setShowCompleteModal(false);
        setShowMenu(false);

        router.refresh();
      } else {
        alert(data.message || "Failed to complete order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setCompleting(false);
    }
  }

  async function cancelOrder() {
    setCancelling(true);

    try {
      const response = await fetch(
        "/api/dashboard/orders/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderId: order.id,
            status: "cancelled",
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("Order cancelled successfully ✅");
        setShowCancelModal(false);
        setShowMenu(false);

        router.refresh();
      } else {
        alert(data.message || "Failed to cancel order.");
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setCancelling(false);
    }
  }

  return (
    <>
      <div className="rounded-2xl border border-[#E8E2D9] bg-white p-4 sm:p-6 shadow-sm transition hover:shadow-md">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg sm:text-xl font-semibold text-[#2F4F2F]">
              Order #{order.id}
            </h3>

            <p className="mt-2 font-medium text-[#7B7468]">
              {order.billing?.first_name}{" "}
              {order.billing?.last_name}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                🇺🇸 {order.billing?.country || "USA"}
              </span>

              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-medium text-green-700">
                Online Order
              </span>
            </div>
          </div>

          {/* Menu */}
          <div className="relative shrink-0">
            <button
              onClick={() => setShowMenu((value) => !value)}
              className="rounded-lg p-2 text-xl text-[#7B7468] transition hover:bg-[#F5F3EF]"
              aria-label="Order actions"
            >
              ⋮
            </button>

            {showMenu && (
              <div className="absolute right-0 top-10 z-30 w-48 overflow-hidden rounded-xl border border-[#E8E2D9] bg-white shadow-xl">
                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowCompleteModal(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm font-medium text-green-700 transition hover:bg-green-50"
                >
                  ✅ Complete Order
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowShippingModal(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm transition hover:bg-[#F8F6F2]"
                >
                  📦 Update Shipping
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowRefundModal(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-orange-600 transition hover:bg-orange-50"
                >
                  💰 Request Refund
                </button>

                <button
                  onClick={() => {
                    setShowMenu(false);
                    setShowCancelModal(true);
                  }}
                  className="flex w-full items-center gap-2 px-4 py-3 text-left text-sm text-red-600 transition hover:bg-red-50"
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

        {/* Products */}
        <div className="mt-6 space-y-4">
          {items.map((item: any) => {
            const size = getMetaValue(item, [
              "Size",
              "size",
              "attribute_pa_size",
              "pa_size",
            ]);

            const shape = getMetaValue(item, [
              "Shape",
              "shape",
              "attribute_pa_shape",
              "pa_shape",
            ]);

            const image =
              item.image?.src ||
              item.images?.[0]?.src ||
              "";

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-[#EEE6DA] bg-[#FCFBF8] p-4 sm:flex-row"
              >
                {/* Image */}
                <div className="h-48 w-full shrink-0 overflow-hidden rounded-xl bg-[#F3F0EA] sm:h-32 sm:w-32">
                  {image ? (
                    <img
                      src={image}
                      alt={item.name || "Rug"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-[#9A9387]">
                      No Image
                    </div>
                  )}
                </div>

                {/* Product info */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-base sm:text-lg font-semibold text-[#2F4F2F]">
                    {item.name}
                  </h4>

                  <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <p className="text-[#7B7468]">
                      Size:
                      <span className="ml-1 font-medium text-[#2F4F2F]">
                        {size || "Not Set"}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Shape:
                      <span className="ml-1 font-medium text-[#2F4F2F]">
                        {shape || "Not Set"}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Quantity:
                      <span className="ml-1 font-medium text-[#2F4F2F]">
                        {item.quantity}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Item Total:
                      <span className="ml-1 font-medium text-[#2F4F2F]">
                        ${item.total}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order information */}
        <div className="mt-6 grid gap-5 border-t border-[#EEE6DA] pt-6 lg:grid-cols-2">
          <div>
            <p className="text-sm text-[#9A9387]">
              Order Value
            </p>

            <p className="mt-1 text-2xl font-bold text-[#2F4F2F]">
              ${order.total}
            </p>

            <div className="mt-4 space-y-2 text-sm">
              <p className="text-[#7B7468]">
                Expected Ship Date:
                <span className="ml-2 font-medium text-[#2F4F2F]">
                  {formatDate(expectedShipDate)}
                </span>
              </p>

              <p className="text-[#7B7468]">
                Carrier:
                <span className="ml-2 font-medium text-[#2F4F2F]">
                  {carrier || "Not Assigned"}
                </span>
              </p>

              <p className="text-[#7B7468]">
                Tracking:
                <span className="ml-2 font-medium text-[#2F4F2F]">
                  {trackingNumber || "Not Assigned"}
                </span>
              </p>

              <p className="text-[#7B7468]">
                Pickup Date:
                <span className="ml-2 font-medium text-[#2F4F2F]">
                  {pickupDate
                    ? formatDate(pickupDate)
                    : "Not Scheduled"}
                </span>
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <p className="text-sm text-[#9A9387]">
              Shipping Address
            </p>

            <div className="mt-2 text-sm leading-6 text-[#2F4F2F]">
              {shippingAddress.length > 0 ? (
                shippingAddress.map(
                  (line: string, index: number) => (
                    <div key={`${line}-${index}`}>
                      {line}
                    </div>
                  )
                )
              ) : (
                <span className="text-[#9A9387]">
                  Shipping address not available
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex justify-end border-t border-[#EEE6DA] pt-5">
          <Link
            href={`/dashboard/orders/${order.id}`}
            className="w-full rounded-full bg-[#556B2F] px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-[#B68A35] sm:w-auto"
          >
            View Details →
          </Link>
        </div>
      </div>

      <ShippingModal
        open={showShippingModal}
        onClose={() => setShowShippingModal(false)}
        order={order}
        onSuccess={() => router.refresh()}
      />

      <ConfirmationModal
        open={showCompleteModal}
        title="Complete this Order?"
        message="This will move the order from New to Completed. Continue?"
        confirmText="Yes, Complete Order"
        onCancel={() => setShowCompleteModal(false)}
        onConfirm={markAsCompleted}
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
    </>
  );
}