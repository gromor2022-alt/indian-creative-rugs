import Link from "next/link";
import { getCustomers } from "@/lib/dashboard";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="p-10">

      <div className="mb-10">

        <h1 className="font-instrument text-5xl text-[#2F4F2F]">
          Customers
        </h1>

        <p className="mt-3 text-[#7B7468]">
          Manage your customer database.
        </p>

      </div>

      <div className="rounded-[24px] bg-white p-8 shadow-sm overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-[#EEE6DA] text-left">

              <th className="px-4 py-4">Customer</th>

              <th className="px-4 py-4">Email</th>

              <th className="px-4 py-4">Country</th>

              <th className="px-4 py-4">Orders</th>

              <th className="px-4 py-4">Spent</th>

              <th className="px-4 py-4"></th>

            </tr>

          </thead>

          <tbody>

            {customers.map((customer: any) => (

              <tr
                key={customer.id}
                className="border-b border-[#F3EEE5]"
              >

                <td className="px-4 py-4 font-medium">
                  {customer.first_name} {customer.last_name}
                </td>

                <td className="px-4 py-4">
                  {customer.email}
                </td>

                <td className="px-4 py-4">
                  {customer.billing?.country || "-"}
                </td>

                <td className="px-4 py-4">
                  {customer.orders_count}
                </td>

                <td className="px-4 py-4">
                  ${customer.total_spent}
                </td>

                <td className="px-4 py-4">

                  <Link
                    href={`/dashboard/customers/${customer.id}`}
                    className="rounded-lg bg-[#556B2F] px-4 py-2 text-sm text-white hover:bg-[#445622]"
                  >
                    View
                  </Link>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}