import Link from "next/link";
import { getCustomerById } from "@/lib/dashboard";

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await getCustomerById(id);

  if (!customer) {
    return (
      <div className="p-10">
        <h1 className="text-3xl font-bold">Customer not found.</h1>
      </div>
    );
  }

  return (
    <div className="p-10">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="font-instrument text-5xl text-[#2F4F2F]">
            {customer.first_name} {customer.last_name}
          </h1>

          <p className="mt-3 text-[#7B7468]">
            Customer Profile
          </p>

        </div>

        <Link
          href="/dashboard/customers"
          className="rounded-xl bg-[#556B2F] px-5 py-3 text-white hover:bg-[#445622]"
        >
          ← Back
        </Link>

      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        {/* Customer Information */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            Customer Information
          </h2>

          <div className="space-y-4">

            <p><strong>Email:</strong> {customer.email}</p>

            <p><strong>Phone:</strong> {customer.billing.phone || "-"}</p>

            <p><strong>Company:</strong> {customer.billing.company || "-"}</p>

            <p><strong>Country:</strong> {customer.billing.country}</p>

            <p><strong>State:</strong> {customer.billing.state}</p>

            <p><strong>City:</strong> {customer.billing.city}</p>

          </div>

        </div>

        {/* Billing Address */}

        <div className="rounded-[24px] bg-white p-8 shadow-sm">

          <h2 className="mb-6 font-instrument text-3xl text-[#2F4F2F]">
            Billing Address
          </h2>

          <div className="space-y-3">

            <p>{customer.billing.address_1}</p>

            {customer.billing.address_2 && (
              <p>{customer.billing.address_2}</p>
            )}

            <p>
              {customer.billing.city},{" "}
              {customer.billing.state}
            </p>

            <p>{customer.billing.postcode}</p>

            <p>{customer.billing.country}</p>

          </div>

        </div>

      </div>

    </div>
  );
}