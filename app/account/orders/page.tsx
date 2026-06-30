"use client";

import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      const storedUser = localStorage.getItem("user");

      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);

      try {
        const res = await fetch(
          `/api/orders?email=${encodeURIComponent(user.email)}`
        );

        const data = await res.json();

        if (data.success) {
          setOrders(data.orders);
        }
      } catch (err) {
        console.error(err);
      }

      setLoading(false);
    };

    loadOrders();
  }, []);

  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-6xl mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] mb-3">
          My Orders
        </h1>

        <p className="text-[#B89B5E] text-lg mb-10">
          View and track all of your rug orders.
        </p>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#22304A] text-white">
              <tr>
                <th className="p-4 text-left">Order</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Status</th>
                <th className="p-4 text-left">Total (USD)</th>
              </tr>
            </thead>

            <tbody>

              {loading && (
                <tr>
                  <td colSpan={4} className="p-6 text-center">
                    Loading orders...
                  </td>
                </tr>
              )}

              {!loading && orders.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-6 text-center">
                    No orders found.
                  </td>
                </tr>
              )}

              {!loading &&
                orders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-5 font-semibold">
                      #{order.number}
                    </td>

                    <td className="p-5">
                      {new Date(order.date_created).toLocaleDateString()}
                    </td>

                    <td className="p-5 capitalize">
                      {order.status}
                    </td>

                    <td className="p-5 font-semibold text-[#B89B5E]">
                      ${Number(order.total).toFixed(2)}
                    </td>
                  </tr>
                ))}

            </tbody>

          </table>

        </div>

      </div>
    </main>
  );
}