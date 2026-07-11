export default function DashboardLoginPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#F7EADF] via-[#FDF8F2] to-[#EEE3D4] flex items-center justify-center px-6">

      <div className="w-full max-w-md rounded-[30px] bg-white/90 backdrop-blur-sm p-10 shadow-2xl border border-[#E7DFD3]">

        <h1 className="font-instrument text-5xl text-[#556B2F] text-center">
          Dashboard Login
        </h1>

        <p className="mt-4 text-center text-[#7B7468] leading-7">
          Welcome back.

Sign in to access your business dashboard,
orders and customer enquiries.
        </p>

        <form className="mt-10 space-y-6">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full rounded-xl border border-[#DDD6CC] px-5 py-4 outline-none focus:border-[#B68A35]"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-xl border border-[#DDD6CC] px-5 py-4 outline-none focus:border-[#B68A35]"
          />

          <button
            className="w-full rounded-full bg-[#556B2F] py-4 text-white font-medium transition hover:bg-[#B68A35]"
          >
            Sign In
          </button>

        </form>

      </div>

    </main>
  );
}