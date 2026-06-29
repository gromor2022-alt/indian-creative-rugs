"use client";

export default function OrdersPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">

      <div className="max-w-6xl mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] mb-3">
          My Orders
        </h1>

        <p className="text-gray-600 mb-12">
          View and track all of your rug orders.
        </p>

        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

          <table className="w-full">

            <thead className="bg-[#22304A] text-white">

              <tr>

                <th className="p-4 text-left">
                  Order
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Total
                </th>

              </tr>

            </thead>

            <tbody>

              <tr>

                <td className="p-5">
                  No orders found.
                </td>

                <td></td>
                <td></td>
                <td></td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </main>
  );
}