import { useState } from "react";
import { useRouter } from "next/navigation";

interface Props {
  open: boolean;
  onClose: () => void;
  orderId: number;
}

export default function ShippingModal({
  open,
  onClose,
  orderId,
}: Props) {
const [carrier, setCarrier] = useState("");
const [trackingNumber, setTrackingNumber] = useState("");
const [pickupDate, setPickupDate] = useState("");

const [loading, setLoading] = useState(false);

const router = useRouter();
async function saveShippingDetails() {

  setLoading(true);

  try {

    const response = await fetch("/api/dashboard/orders/update", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        orderId,
        carrier,
        trackingNumber,
        pickupDate,
      }),

    });

    const data = await response.json();

    if (data.success) {

      alert("Shipping Details Updated Successfully ✅");

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
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

        <h2 className="text-2xl font-semibold text-[#2F4F2F]">
          Shipping Details
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Enter courier and tracking information.
        </p>

        <div className="mt-6 space-y-4">

          <select
  value={carrier}
  onChange={(e) => setCarrier(e.target.value)}
  className="w-full rounded-xl border border-[#DDD6CC] p-3"
>
  <option value="">Select Shipping Carrier</option>
  <option value="DHL Express">DHL Express</option>
  <option value="FedEx">FedEx</option>
  <option value="UPS">UPS</option>
  <option value="USPS">USPS</option>
  <option value="Other">Other</option>
</select>

          <input
  type="text"
  value={trackingNumber}
  onChange={(e) => setTrackingNumber(e.target.value)}
  placeholder="Tracking Number"
  className="w-full rounded-xl border border-[#DDD6CC] p-3"
/>

          <input
  type="date"
  value={pickupDate}
  onChange={(e) => setPickupDate(e.target.value)}
  className="w-full rounded-xl border border-[#DDD6CC] p-3"
/>

        </div>

        <div className="mt-8 flex justify-end gap-3">

          <button
            onClick={onClose}
            className="rounded-xl border border-[#DDD6CC] px-5 py-2"
          >
            Cancel
          </button>

          <button
  onClick={saveShippingDetails}
  disabled={loading}
  className="rounded-xl bg-[#2F4F2F] px-5 py-2 text-white"
>
  {loading ? "Saving..." : "Save Shipping"}
</button>

        </div>

      </div>

    </div>
  );
}