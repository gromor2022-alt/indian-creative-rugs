import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="bg-[#F4F0E8] min-h-screen">
      <div className="max-w-md mx-auto px-8 py-20">

        <h1 className="font-instrument text-6xl text-[#22304A] text-center">
          Create Account
        </h1>

        <p className="text-center text-gray-600 mt-4 mb-12">
          Create your account to track orders and enjoy a faster checkout.
        </p>

        <form className="bg-white rounded-2xl shadow-sm p-10 space-y-6">

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              placeholder="John Doe"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Email Address
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#22304A]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#22304A] text-white py-3 rounded-full hover:bg-[#1B273B] transition"
          >
            Create Account
          </button>

          <div className="text-center">
            <Link
              href="/account/login"
              className="text-[#22304A] hover:underline"
            >
              Already have an account? Login
            </Link>
          </div>

        </form>

      </div>
    </main>
  );
}