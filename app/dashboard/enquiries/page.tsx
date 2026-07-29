import { prisma } from "@/lib/prisma";

export default async function EnquiriesPage() {
  const enquiries = await prisma.enquiry.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-10">
      <div className="mb-10">
        <h1 className="font-instrument text-5xl text-[#2F4F2F]">
          Customer Enquiries
        </h1>

        <p className="mt-3 text-[#7B7468]">
          View and manage all website enquiries.
        </p>
      </div>

      {enquiries.length === 0 ? (
        <div className="rounded-[24px] bg-white p-10 text-center shadow-sm">
          <div className="mb-6 text-6xl">💬</div>

          <h2 className="text-3xl font-semibold text-[#2F4F2F]">
            No enquiries yet
          </h2>

          <p className="mt-4 text-[#7B7468]">
            New enquiries submitted from the website will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[24px] bg-white shadow-sm">
          <table className="w-full">
            <thead className="bg-[#F7F4EF]">
              <tr>
                <th className="px-6 py-4 text-left">Name</th>
                <th className="px-6 py-4 text-left">Email</th>
                <th className="px-6 py-4 text-left">Phone</th>
                <th className="px-6 py-4 text-left">Status</th>
                <th className="px-6 py-4 text-left">Date</th>
              </tr>
            </thead>

            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id} className="border-t">
                  <td className="px-6 py-4">{enquiry.name}</td>
                  <td className="px-6 py-4">{enquiry.email}</td>
                  <td className="px-6 py-4">{enquiry.phone || "-"}</td>
                  <td className="px-6 py-4">{enquiry.status}</td>
                  <td className="px-6 py-4">
                    {new Date(enquiry.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}