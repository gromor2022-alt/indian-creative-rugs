"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

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

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    try {
      const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);
      console.log("Customer:", user);
      if (!user.email) {
        setLoading(false);
        return;
      }

      const res = await fetch(
        `/api/orders?email=${user.email}`
      );

      const data = await res.json();

      if (data.success) {
        setOrders(data.orders);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }
  function getStatusColor(status: string) {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-green-100 text-green-700";

      case "processing":
        return "bg-blue-100 text-blue-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  function formatDate(date: string | null) {
    if (!date) return "Not Available";

    return new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto py-20 text-center">
        <h2 className="text-xl font-semibold">
          Loading your orders...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-12">

      <h1 className="text-3xl font-bold mb-2">
        My Orders
      </h1>

      <p className="text-gray-500 mb-10">
        Track every handmade rug you've ordered from Indian Creative Rugs.
      </p>
      <p className="mb-4 text-red-600 font-bold">
  Total Orders: {orders.length}
</p>
      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl border p-12 text-center">
          <h2 className="text-xl font-semibold mb-2">
            No Orders Yet
          </h2>

          <p className="text-gray-500 mb-6">
            You haven't placed any orders yet.
          </p>

          <Link
            href="/shop"
            className="inline-flex px-6 py-3 rounded-xl bg-[#B89B5E] text-white hover:bg-[#9E824D] transition"
          >
            Explore Rugs
          </Link>
        </div>
      ) : (
        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden"
            >
<div className="flex items-center justify-between px-6 py-5 border-b">

  <div>
    <h2 className="text-lg font-bold">
      Order #{order.number}
    </h2>

    <p className="text-sm text-gray-500">
      Ordered on {formatDate(order.orderDate)}
    </p>
  </div>

  <span
    className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}
  >
    {order.status}
  </span>

</div>             

 <div className="p-6">

                {order.items.map((item) => (

                  <div
                    key={item.productId}
                    className="flex flex-col md:flex-row gap-6"
                  >

                    <div className="relative w-full md:w-44 h-44 rounded-xl overflow-hidden border">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                    <div className="flex-1">

                      <h3 className="text-xl font-semibold">
                        {item.name}
                      </h3>

                      <div className="mt-5 grid grid-cols-2 gap-5 text-sm">

                        <div>
                          <p className="text-gray-500">
                            Size
                          </p>

                          <p className="font-medium">
                            {item.size ?? "—"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Quantity
                          </p>

                          <p className="font-medium">
                            {item.quantity}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">
                            Amount
                          </p>

                          <p className="font-semibold text-[#B89B5E]">
                            ${order.total}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Expected Ship Date
                          </p>

                          <p className="font-medium">
                            {formatDate(order.expectedShipDate)}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Carrier
                          </p>

                          <p className="font-medium">
                            {order.carrier ?? "Not Assigned"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Tracking Number
                          </p>

                          <p className="font-medium break-all">
                            {order.trackingNumber ?? "Not Assigned"}
                          </p>
                        </div>

                        <div>
                          <p className="text-gray-500">
                            Pickup Date
                          </p>

                          <p className="font-medium">
                            {formatDate(order.pickupDate)}
                          </p>
                        </div>

                      </div>

                      <div className="mt-8 flex gap-4">

                        <Link
                          href={`/shop/${item.slug}`}
                          className="px-5 py-2 rounded-lg border hover:bg-gray-50 transition"
                        >
                          View Product
                        </Link>

                        <button
                          className="px-5 py-2 rounded-lg bg-[#B89B5E] text-white hover:bg-[#9E824D] transition"
                        >
                          Track Order
                        </button>

                      </div>

                    </div>

                  </div>

                               ))}

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}











