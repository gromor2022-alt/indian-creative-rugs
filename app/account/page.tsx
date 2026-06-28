import Link from "next/link";

export default function AccountPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-4xl mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] text-center">
          My Account
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Sign in to view your orders, addresses and account details.
        </p>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <h2 className="font-instrument text-4xl text-[#22304A]">
              Existing Customer
            </h2>

            <p className="mt-4 text-gray-600">
              Sign in to access your account and track your orders.
            </p>

            <Link
              href="/account/login"
              className="inline-block mt-8 bg-[#22304A] text-white px-8 py-3 rounded-full hover:bg-[#1a2437] transition"
            >
              Login
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-10 shadow-sm">
            <h2 className="font-instrument text-4xl text-[#22304A]">
              New Customer
            </h2>

            <p className="mt-4 text-gray-600">
              Create an account for faster checkout and order tracking.
            </p>

            <Link
              href="/account/register"
              className="inline-block mt-8 border border-[#22304A] text-[#22304A] px-8 py-3 rounded-full hover:bg-[#22304A] hover:text-white transition"
            >
              Create Account
            </Link>
          </div>

        </div>

      </div>
    </main>
  );
}