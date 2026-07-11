export default function EnquiriesPage() {
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

      <div className="rounded-[24px] bg-white p-10 text-center shadow-sm">

        <div className="text-6xl mb-6">
          💬
        </div>

        <h2 className="text-3xl font-semibold text-[#2F4F2F]">
          No enquiries yet
        </h2>

        <p className="mt-4 text-[#7B7468]">
          New enquiries submitted from the website will appear here.
        </p>

      </div>

    </div>
  );
}