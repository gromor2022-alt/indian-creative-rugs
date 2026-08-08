import { notFound } from "next/navigation";
import { getOrderById } from "@/lib/dashboard";

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
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function getShippingAddress(order: any) {
  const shipping = order.shipping || {};
  const billing = order.billing || {};

  return [
    shipping.address_1 || billing.address_1,
    shipping.address_2 || billing.address_2,
    shipping.city || billing.city,
    shipping.state || billing.state,
    shipping.postcode || billing.postcode,
    shipping.country || billing.country,
  ].filter(Boolean);
}

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrderById(id);

  if (!order) {
    notFound();
  }

  const expectedShipDate = getExpectedShipDate(order);
  const shippingAddress = getShippingAddress(order);

  const carrier =
    order.meta_data?.find(
      (meta: any) => meta.key === "_icr_carrier"
    )?.value || "";

  const trackingNumber =
    order.meta_data?.find(
      (meta: any) => meta.key === "_icr_tracking_number"
    )?.value || "";

  return (
    <div className="min-h-screen bg-[#F8F6F2] p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-instrument text-3xl sm:text-4xl text-[#2F4F2F]">
            Order #{order.id}
          </h1>

          <p className="mt-1.5 text-sm text-[#7B7468]">
            Order Details
          </p>
        </div>

        <span
          className={`w-fit rounded-full px-3 py-1.5 text-xs font-medium ${
            order.status === "completed"
              ? "bg-green-100 text-green-700"
              : order.status === "processing"
              ? "bg-yellow-100 text-yellow-700"
              : order.status === "cancelled"
              ? "bg-red-100 text-red-700"
              : "bg-orange-100 text-orange-700"
          }`}
        >
          {order.status}
        </span>
      </div>

      {/* Customer + Order Summary */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Customer */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 shadow-sm">
          <h2 className="font-instrument text-xl sm:text-2xl text-[#2F4F2F] mb-4">
            Customer
          </h2>

          <div className="space-y-2.5 text-sm">
            <p>
              <strong>Name:</strong>{" "}
              {order.billing?.first_name}{" "}
              {order.billing?.last_name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.billing?.email || "—"}
            </p>

            <p>
              <strong>Phone:</strong>{" "}
              {order.billing?.phone || "—"}
            </p>

            <p>
              <strong>Country:</strong>{" "}
              {order.billing?.country || "—"}
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="rounded-2xl bg-white p-5 shadow-sm sm:p-6 shadow-sm">
          <h2 className="font-instrument text-xl sm:text-2xl text-[#2F4F2F] mb-4">
            Order Summary
          </h2>

          <div className="space-y-2.5 text-sm">
            <p>
              <strong>Total:</strong> ${order.total}
            </p>

            <p>
              <strong>Payment:</strong>{" "}
              {order.payment_method_title || "—"}
            </p>

            <p>
              <strong>Order Date:</strong>{" "}
              {formatDate(order.date_created)}
            </p>

            <p>
              <strong>Expected Shipping:</strong>{" "}
              <span className="font-semibold text-[#556B2F]">
                {formatDate(expectedShipDate)}
              </span>
            </p>

            <p>
              <strong>Carrier:</strong>{" "}
              {carrier || "Not Assigned"}
            </p>

            <p>
              <strong>Tracking:</strong>{" "}
              {trackingNumber || "Not Assigned"}
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6 shadow-sm">
        <h2 className="font-instrument text-xl sm:text-2xl text-[#2F4F2F] mb-5">
          Shipping Address
        </h2>

        <div className="text-sm sm:text-base leading-6 text-[#2F4F2F]">
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

      {/* Products */}
      <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm sm:p-6 shadow-sm">
        <h2 className="font-instrument text-xl sm:text-2xl text-[#2F4F2F] mb-4">
          Products Ordered
        </h2>

        <div className="space-y-4">
          {order.line_items?.map((item: any) => {
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
                className="flex flex-col gap-4 rounded-xl border border-[#EEE6DA] bg-[#FCFBF8] p-4 sm:flex-row sm:items-center"
              >
                {/* Image */}
                <div className="flex h-44 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F3F0EA] p-2 sm:h-32 sm:w-32">
                  {image ? (
                    <img
                      src={image}
                      alt={item.name || "Rug"}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-[#9A9387]">
                      No Image
                    </div>
                  )}
                </div>

                {/* Details */}
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold text-base text-[#2F4F2F]">
                    {item.name}
                  </h3>

                  <div className="mt-2 grid grid-cols-1 gap-1.5 sm:grid-cols-2 text-sm">
                    <p className="text-[#7B7468]">
                      Size:
                      <span className="ml-2 font-medium text-[#2F4F2F]">
                        {size || "Not Set"}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Shape:
                      <span className="ml-2 font-medium text-[#2F4F2F]">
                        {shape || "Not Set"}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Quantity:
                      <span className="ml-2 font-medium text-[#2F4F2F]">
                        {item.quantity}
                      </span>
                    </p>

                    <p className="text-[#7B7468]">
                      Item Total:
                      <span className="ml-2 font-medium text-[#2F4F2F]">
                        ${item.total}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}