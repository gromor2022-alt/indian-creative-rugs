"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: number;
}

export default function UpdateShipDateModal({
  open,
  onClose,
  orderId,
}: Props) {

  const [shipDate, setShipDate] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (!open) return null;

  async function saveShipDate() {

    setLoading(true);

    try {

      const response = await fetch("/api/dashboard/orders/update", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          orderId,
          shipDate,
        }),

      });

      const data = await response.json();

      if (data.success) {

        alert("Ship Date Updated Successfully ✅");

        onClose();

        router.refresh();

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

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

        <h2 className="text-2xl font-semibold text-[#2F4F2F]">
          Update Ship Date
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Select expected shipping date.
        </p>

        <input
          type="date"
          value={shipDate}
          onChange={(e) => setShipDate(e.target.value)}
          className="mt-6 w-full rounded-xl border border-[#DDD6CC] p-3"
        />

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-[#DDD6CC] px-5 py-2"
          >
            Cancel
          </button>

          <button
            onClick={saveShipDate}
            disabled={loading}
            className="rounded-xl bg-[#2F4F2F] px-5 py-2 text-white"
          >
            {loading ? "Saving..." : "Save"}
          </button>

        </div>

      </div>

    </div>

  );

}