"use client";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ShippingModal({
  open,
  onClose,
}: Props) {
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

          <select className="w-full rounded-xl border border-[#DDD6CC] p-3">
            <option>Select Shipping Carrier</option>
            <option>DHL Express</option>
            <option>FedEx</option>
            <option>UPS</option>
            <option>USPS</option>
          </select>

          <input
            type="text"
            placeholder="Tracking Number"
            className="w-full rounded-xl border border-[#DDD6CC] p-3"
          />

          <input
            type="date"
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

          <button className="rounded-xl bg-[#2F4F2F] px-5 py-2 text-white">
            Save Shipping
          </button>

        </div>

      </div>

    </div>
  );
}