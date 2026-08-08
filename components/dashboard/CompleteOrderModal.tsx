"use client";

import { useEffect, useState } from "react";

interface CompleteOrderModalProps {
  open: boolean;
  order: any;
  onClose: () => void;
  onSuccess: () => void;
}

function getMeta(order: any, key: string) {
  return (
    order?.meta_data?.find((item: any) => item.key === key)?.value || ""
  );
}

export default function CompleteOrderModal({
  open,
  order,
  onClose,
  onSuccess,
}: CompleteOrderModalProps) {
  const [pickupDate, setPickupDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [buyerNote, setBuyerNote] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!order) return;

    setPickupDate(getMeta(order, "_icr_pickup_date"));
    setCarrier(getMeta(order, "_icr_carrier"));
    setTrackingNumber(getMeta(order, "_icr_tracking_number"));
    setBuyerNote(
      getMeta(order, "_icr_buyer_note") ||
        "Your order is ready and will be moving toward shipment shortly."
    );
  }, [order]);

  async function completeOrder() {
    setLoading(true);

    try {
      const response = await fetch("/api/dashboard/orders/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: order.id,
          status: "completed",
          carrier,
          trackingNumber,
          pickupDate,
          buyerNote,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        alert(data.message || "Failed to complete order.");
        return;
      }

      alert("Order completed successfully ✅");
      onClose();
      onSuccess();
    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (!open || !order) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-3 sm:p-5">
      <div className="max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#EEE6DA] bg-white px-5 py-4 sm:px-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B68A35]">
              Order #{order.id}
            </p>
            <h2 className="mt-1 font-instrument text-2xl text-[#2F4F2F] sm:text-3xl">
              Complete Order
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-xl text-[#7B7468] hover:bg-[#F5F3EF]"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-5 p-5 sm:p-6">
          <div className="rounded-xl bg-[#F8F6F2] p-4">
            <p className="text-xs font-semibold uppercase tracking-[1.5px] text-[#9A9387]">
              Expected Shipping
            </p>
            <p className="mt-1 text-sm font-semibold text-[#2F4F2F]">
              Already shown on the order card — no need to change it here.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#6F685E]">
              Pickup Date
            </label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full rounded-xl border border-[#DCD5CB] px-3 py-2.5 text-sm text-[#2F4F2F] outline-none focus:border-[#556B2F]"
            />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#6F685E]">
              Shipping Carrier
            </label>
            <select
              value={carrier}
              onChange={(e) => setCarrier(e.target.value)}
              className="w-full rounded-xl border border-[#DCD5CB] bg-white px-3 py-2.5 text-sm text-[#2F4F2F] outline-none focus:border-[#556B2F]"
            >
              <option value="">Select Carrier</option>
              <option value="FedEx">FedEx</option>
              <option value="DHL Express">DHL Express</option>
              <option value="UPS">UPS</option>
              <option value="USPS">USPS</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[1px] text-[#6F685E]">
              Tracking Number
            </label>
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter tracking number"
              className="w-full rounded-xl border border-[#DCD5CB] px-3 py-2.5 text-sm text-[#2F4F2F] outline-none focus:border-[#556B2F]"
            />
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label className="block text-xs font-semibold uppercase tracking-[1px] text-[#6F685E]">
                Note to Buyer
              </label>
              <span className="rounded-full bg-[#EEE9DE] px-2.5 py-1 text-[11px] font-medium text-[#6F685E]">
                Editable
              </span>
            </div>
            <textarea
              value={buyerNote}
              onChange={(e) => setBuyerNote(e.target.value)}
              rows={4}
              className="w-full resize-none rounded-xl border border-[#DCD5CB] px-3 py-2.5 text-sm leading-6 text-[#2F4F2F] outline-none focus:border-[#556B2F]"
            />
          </div>

          <div className="rounded-xl border border-[#E8E2D9] bg-[#FCFBF8] p-4 text-xs leading-5 text-[#7B7468]">
            Completing this order moves it from <strong>NEW</strong> to <strong>COMPLETED</strong> and saves the shipping/tracking information above.
          </div>
        </div>

        <div className="sticky bottom-0 flex flex-col-reverse gap-2 border-t border-[#EEE6DA] bg-white p-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-[#DCD5CB] px-5 py-2.5 text-sm font-medium text-[#5F5A52] hover:bg-[#F8F6F2]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={completeOrder}
            disabled={loading}
            className="rounded-xl bg-[#556B2F] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#465823] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Completing..." : "Complete Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
