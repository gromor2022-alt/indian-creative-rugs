import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen flex bg-[#F6F3EE]">

      {/* Sidebar */}

      <aside className="w-72 bg-[#2F4F2F] text-white flex flex-col">

        <div className="p-8 border-b border-white/10">

          <h1 className="font-instrument text-3xl">
            Indian Creative Rugs
          </h1>

          <p className="mt-2 text-sm text-[#D9D4C7]">
            Business ERP
          </p>

        </div>

        <nav className="flex-1 p-6 space-y-2">

          <Link href="/dashboard" className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition">
            🏠 Dashboard
          </Link>

          <Link href="/dashboard/orders" className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition">
            📦 Orders
          </Link>

          <Link href="/dashboard/enquiries" className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition">
            💬 Enquiries
          </Link>

          <Link href="/dashboard/customers" className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition">
            👥 Customers
          </Link>
          <Link
  href="/dashboard/favorites"
  className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition"
>
  ❤️ Favorites
</Link>
          <Link href="/dashboard/settings" className="block rounded-xl px-4 py-3 hover:bg-[#3C613C] transition">
            ⚙ Settings
          </Link>

        </nav>

      </aside>

      {/* Main Content */}

      <section className="flex-1 flex flex-col">

  {/* Top Bar */}

  <header className="h-20 bg-white border-b border-[#E5DED2] flex items-center justify-between px-8">

 

    <div className="flex items-center gap-6">

      
      <div className="flex items-center gap-3">

        <div className="w-11 h-11 rounded-full bg-[#2F4F2F] text-white flex items-center justify-center font-semibold">
          ICR
        </div>

        <div>

          <p className="font-medium text-[#2F4F2F]">
            ICR
          </p>

          <p className="text-sm text-[#7B7468]">
            Administrator
          </p>

        </div>

      </div>

    </div>

  </header>

  <div className="flex-1">

    {children}

  </div>

</section>

    </main>
  );
}