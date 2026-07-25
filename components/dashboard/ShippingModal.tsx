"use client";
import { useEffect, useState } from "react";
import { getTrackingUrl } from "@/lib/tracking";

interface ShippingModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

export default function ShippingModal({
  open,
  onClose,
  order,
  onSuccess,
}: ShippingModalProps) {

  const [shipDate, setShipDate] = useState("");
  const [carrier, setCarrier] = useState("");
  const [trackingNumber, setTrackingNumber] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!order) return;

    setShipDate(
      order.meta_data?.find(
        (m: any) => m.key === "_icr_ship_date"
      )?.value || ""
    );

    setCarrier(
      order.meta_data?.find(
        (m: any) => m.key === "_icr_carrier"
      )?.value || ""
    );

    setTrackingNumber(
      order.meta_data?.find(
        (m: any) => m.key === "_icr_tracking_number"
      )?.value || ""
    );

    setPickupDate(
      order.meta_data?.find(
        (m: any) => m.key === "_icr_pickup_date"
      )?.value || ""
    );

  }, [order]);
async function completeOrder() {
  setLoading(true);

  try {
    const response = await fetch("/api/dashboard/orders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        status: "completed",
        shipDate,
        carrier,
        trackingNumber,
        pickupDate,
      }),
    });

    const data = await response.json();

    if (data.success) {
      alert("Order completed successfully ✅");

      onClose();
      onSuccess();
    } else {
      alert(data.message || "Failed to complete order.");
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong.");
  } finally {
    setLoading(false);
  }
}

  if (!open) return null;

  return (

<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

<div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl max-h-[90vh] overflow-y-auto">

<h2 className="mb-8 text-2xl font-semibold text-[#2F4F2F]">
📦 Update Shipping
</h2>

<div className="grid grid-cols-2 gap-6">

<div>

<label className="mb-2 block text-sm font-medium">
Expected Ship Date
</label>

<input
type="date"
value={shipDate}
onChange={(e)=>setShipDate(e.target.value)}
className="w-full rounded-lg border border-gray-300 p-3"
/>

</div>

<div>

<label className="mb-2 block text-sm font-medium">
Pickup Date
</label>

<input
type="date"
value={pickupDate}
onChange={(e)=>setPickupDate(e.target.value)}
className="w-full rounded-lg border border-gray-300 p-3"
/>

</div>

</div>

<div className="mt-6">

<label className="mb-2 block text-sm font-medium">
Shipping Carrier
</label>

<select
value={carrier}
onChange={(e)=>setCarrier(e.target.value)}
className="w-full rounded-lg border border-gray-300 p-3"
>

<option value="">Select Carrier</option>

<option value="FedEx">FedEx</option>

<option value="DHL Express">DHL Express</option>

<option value="UPS">UPS</option>

<option value="USPS">USPS</option>

</select>

</div>

<div className="mt-6">

<label className="mb-2 block text-sm font-medium">
Tracking Number
</label>

<input
type="text"
value={trackingNumber}
onChange={(e)=>setTrackingNumber(e.target.value)}
placeholder="Enter Tracking Number"
className="w-full rounded-lg border border-gray-300 p-3"
/>

{trackingNumber && carrier && (

<a

href={getTrackingUrl(carrier,trackingNumber)}

target="_blank"

rel="noopener noreferrer"

className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"

>

🔗 Track Shipment

</a>

)}

</div>

        <div className="mt-8 flex justify-end gap-3">

  <button
    onClick={onClose}
    className="rounded-lg border border-gray-300 px-5 py-2.5 hover:bg-gray-50"
  >
    Cancel
  </button>

  <button
    onClick={completeOrder}
    disabled={loading}
    className="rounded-lg bg-[#556B2F] px-6 py-2.5 text-white transition hover:bg-[#465823] disabled:opacity-50"
  >
    {loading ? "Completing..." : "Complete Order"}
  </button>

</div>

</div>

</div>

);
}