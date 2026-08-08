"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { getTrackingUrl } from "@/lib/tracking";

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  image: string;
  slug: string;
  size: string | null;
  shape: string | null;
}

interface Order {
  id: number;
  number: string;
  status: string;
  total: string;
  currency: string;
  orderDate: string;
  expectedShipDate: string | null;
  trackingNumber: string | null;
  carrier: string | null;
  pickupDate: string | null;
  items: OrderItem[];
}

function getStatusColor(status: string) {
  switch (status.toLowerCase()) {
    case "completed":
      return "bg-green-50 text-green-700";
    case "processing":
      return "bg-blue-50 text-blue-700";
    case "pending":
      return "bg-yellow-50 text-yellow-700";
    case "cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function formatDate(date: string | null) {
  if (!date) return "Not Available";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const user = JSON.parse(localStorage.getItem("user") || "{}");

      if (!user.email) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/orders?email=${encodeURIComponent(user.email)}`,
        { cache: "no-store" }
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.error("Customer orders error:", error);
    } finally {
      setLoading(false);
    }
  }

  function trackOrder(order: Order) {
    if (!order.trackingNumber || !order.carrier) {
      alert("Tracking information is not available yet.");
      return;
    }

    const url = getTrackingUrl(order.carrier, order.trackingNumber);

    if (!url) {
      alert("Tracking link is not available for this carrier yet.");
      return;
    }

    window.open(url, "_blank", "noopener,noreferrer");
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F8F6F2] px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="text-sm text-[#7B7468]">Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F8F6F2] px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        <header className="mb-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[2px] text-[#B89B5E]">
                Indian Creative Rugs
              </p>
              <h1 className="mt-1 font-instrument text-3xl text-[#22304A] sm:text-4xl">
                My Orders
              </h1>
              <p className="mt-1.5 text-sm text-[#6F685E]">
                Your handcrafted rug orders in one place.
              </p>
            </div>

            <div className="shrink-0 rounded-xl border border-[#E8E2D9] bg-white px-3 py-2 text-center shadow-sm">
              <p className="text-[10px] font-semibold uppercase tracking-[1.5px] text-[#9A9387]">
                Orders
              </p>
              <p className="mt-0.5 text-lg font-bold leading-none text-[#2F4F2F]">
                {orders.length}
              </p>
            </div>
          </div>
        </header>

        {orders.length === 0 ? (
          <div className="rounded-2xl border border-[#E8E2D9] bg-white p-8 text-center shadow-sm">
            <h2 className="font-instrument text-2xl text-[#2F4F2F]">
              No Orders Yet
            </h2>
            <p className="mt-2 text-sm text-[#7B7468]">
              You haven&apos;t placed any orders yet.
            </p>
            <Link
              href="/rugs"
              className="mt-5 inline-flex rounded-full bg-[#556B2F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B89B5E]"
            >
              Explore Rugs
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <article
                key={order.id}
                className="min-w-0 overflow-hidden rounded-2xl border border-[#E8E2D9] bg-white shadow-sm"
              >
                <div className="flex items-center justify-between gap-3 border-b border-[#EEE6DA] px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-[#2F4F2F] sm:text-base">
                      Order #{order.number}
                    </h2>
                    <p className="mt-0.5 text-[11px] text-[#9A9387]">
                      Ordered {formatDate(order.orderDate)}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="p-4 sm:p-5">
                  {order.items.map((item) => (
                    <div
                      key={`${order.id}-${item.productId}`}
                      className="flex min-w-0 flex-col gap-4 sm:flex-row"
                    >
                      <div className="relative flex h-40 w-full shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#EEE6DA] bg-[#F3F0EA] p-2 sm:h-32 sm:w-32">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            sizes="(max-width: 640px) 100vw, 128px"
                            className="object-contain p-2"
                          />
                        ) : (
                          <span className="text-xs text-[#9A9387]">No Image</span>
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <h3 className="break-words text-base font-semibold leading-6 text-[#2F4F2F] sm:text-lg">
                          {item.name}
                        </h3>

                        <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs sm:text-sm">
                          <div>
                            <p className="text-[#9A9387]">Size</p>
                            <p className="font-medium text-[#2F4F2F]">
                              {item.size || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#9A9387]">Shape</p>
                            <p className="font-medium text-[#2F4F2F]">
                              {item.shape || "—"}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#9A9387]">Quantity</p>
                            <p className="font-medium text-[#2F4F2F]">
                              {item.quantity}
                            </p>
                          </div>

                          <div className="min-w-0">
                            <p className="text-[#9A9387]">Order Total</p>
                            <p className="break-all font-semibold text-[#B89B5E]">
                              ${order.total}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#9A9387]">Expected Shipping</p>
                            <p className="font-medium text-[#2F4F2F]">
                              {formatDate(order.expectedShipDate)}
                            </p>
                          </div>

                          <div>
                            <p className="text-[#9A9387]">Carrier</p>
                            <p className="font-medium text-[#2F4F2F]">
                              {order.carrier || "Not Assigned"}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                          <Link
                            href={`/rugs/${item.slug}`}
                            className="inline-flex items-center justify-center rounded-xl border border-[#DCD5CB] px-4 py-2 text-xs font-semibold text-[#2F4F2F] transition hover:bg-[#F8F6F2] sm:text-sm"
                          >
                            View Product
                          </Link>

                          {order.trackingNumber && order.carrier ? (
                            <button
                              type="button"
                              onClick={() => trackOrder(order)}
                              className="inline-flex items-center justify-center rounded-xl bg-[#556B2F] px-4 py-2 text-xs font-semibold text-white transition hover:bg-[#465823] sm:text-sm"
                            >
                              Track Order →
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => trackOrder(order)}
                              className="inline-flex items-center justify-center rounded-xl bg-[#EEE9DE] px-4 py-2 text-xs font-semibold text-[#7B7468] sm:text-sm"
                            >
                              Tracking Pending
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
