"use client";

interface UpdateShippingModalProps {
  open: boolean;
  onClose: () => void;
  order: any;
  onSuccess: () => void;
}

export default function UpdateShippingModal({
  open,
  onClose,
  order,
  onSuccess,
}: UpdateShippingModalProps) {

  if (!open) return null;

  return (

    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">

      <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-2xl">

        <h2 className="mb-6 text-2xl font-semibold text-[#2F4F2F]">
          📦 Update Shipping
        </h2>

        <div className="grid grid-cols-2 gap-6">

  <div>

    <label className="mb-2 block text-sm font-medium">
      Expected Ship Date
    </label>

    <input
      type="date"
      className="w-full rounded-lg border border-gray-300 p-3"
    />

  </div>

  <div>

    <label className="mb-2 block text-sm font-medium">
      Pickup Date
    </label>

    <input
      type="date"
      className="w-full rounded-lg border border-gray-300 p-3"
    />

  </div>

</div>

<div className="mt-6 grid grid-cols-2 gap-6">

  <div>

    <label className="mb-2 block text-sm font-medium">
      Shipping Carrier
    </label>

    <select
      className="w-full rounded-lg border border-gray-300 p-3"
    >
      <option>FedEx</option>
      <option>DHL Express</option>
      <option>UPS</option>
      <option>USPS</option>
    </select>

  </div>

  <div>

    <label className="mb-2 block text-sm font-medium">
      Tracking Number
    </label>

    <input
      type="text"
      placeholder="Enter Tracking Number"
      className="w-full rounded-lg border border-gray-300 p-3"
    />

  </div>

</div>

      </div>

    </div>

  );

}