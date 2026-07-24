export default function OrdersToolbar() {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-[#E7E1D8] bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">

      {/* Search */}
      <input
        type="text"
        placeholder="🔍 Search Order ID / Customer..."
        className="w-full rounded-xl border border-[#DDD6CC] px-4 py-3 outline-none focus:border-[#B68A35] lg:max-w-md"
      />

      {/* Right Side */}
      <div className="flex flex-wrap gap-3">

        <select className="rounded-xl border border-[#DDD6CC] px-4 py-3">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>In Production</option>
          <option>Ready to Ship</option>
          <option>Shipped</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

        <button className="rounded-xl bg-[#2F4F2F] px-5 py-3 font-medium text-white hover:bg-[#254125]">
          Export Orders
        </button>

      </div>

    </div>
  );
}