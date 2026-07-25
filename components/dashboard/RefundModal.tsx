"use client";

import { useState } from "react";

interface RefundModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}
export default function RefundModal({
  open,
  onClose,
  order,
  onSuccess,
}: RefundModalProps) {

  if (!open) return null;
const [refundReason, setRefundReason] = useState("");
const [loading, setLoading] = useState(false);

async function requestRefund() {
  if (!refundReason) {
    alert("Please select a refund reason.");
    return;
  }

  setLoading(true);

  try {
    const response = await fetch("/api/dashboard/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        refundStatus: "requested",
        refundReason,
        refundRequestedAt: new Date().toISOString(),
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Refund request submitted successfully ✅");

      onClose();
      onSuccess();
    } else {
      alert(data.message);
    }

  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  }

  setLoading(false);
}
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">

        <h2 className="mb-5 text-xl font-bold text-[#2F4F2F]">
          💰 Request Refund
        </h2>

        <label className="mb-2 block text-sm font-medium">
          Refund Reason
        </label>

        <select
  value={refundReason}
  onChange={(e) => setRefundReason(e.target.value)}
  className="w-full rounded-lg border border-gray-300 p-3"
>
          <option value="" disabled>
            Select Refund Reason
          </option>

          <option>Customer Cancelled</option>
          <option>Damaged Product</option>
          <option>Duplicate Order</option>
          <option>Wrong Item Sent</option>
          <option>Other</option>
        </select>

        <div className="mt-6 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-lg border px-4 py-2"
          >
            Cancel
          </button>

          <button
  onClick={requestRefund}
  disabled={loading}
  className="rounded-lg bg-orange-600 px-4 py-2 text-white disabled:opacity-50"
>
  {loading ? "Submitting..." : "Submit"}
</button>

        </div>

      </div>

    </div>
  );
}