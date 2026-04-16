import ListingGenerator from "@/components/ListingGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Navbar ── */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              List<span className="text-indigo-600">ify</span>
            </span>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium text-gray-500">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
              AI-Powered
            </span>
            <button className="inline-flex items-center gap-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Unlock Pro — ₹99
            </button>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-indigo-50 pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-100/30 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-50/50 rounded-full blur-3xl pointer-events-none translate-y-1/2 -translate-x-1/3" />

        <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-6">
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Powered by Claude AI
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-3xl mx-auto">
            Create High-Converting{" "}
            <span className="relative">
              <span className="text-indigo-600">Product Listings</span>
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 300 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10C50 4 150 2 298 6"
                  stroke="#6366F1"
                  strokeWidth="3"
                  strokeLinecap="round"
                  opacity="0.4"
                />
              </svg>
            </span>{" "}
            in 60 Seconds
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            Optimized for Amazon, Flipkart & modern e-commerce sellers.
            <br className="hidden sm:block" />
            Stop guessing — let AI write listings that actually sell.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#generator"
              className="btn-primary text-base px-8 py-4 rounded-xl shadow-md hover:shadow-lg"
            >
              Generate Listing Free
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <span className="text-sm text-gray-400">No sign-up required</span>
          </div>

          {/* Platform badges */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">
              Works for
            </span>
            {[
              { name: "Amazon", color: "text-orange-600", bg: "bg-orange-50 border-orange-100" },
              { name: "Flipkart", color: "text-blue-600", bg: "bg-blue-50 border-blue-100" },
              { name: "Shopify", color: "text-green-600", bg: "bg-green-50 border-green-100" },
              { name: "Meesho", color: "text-pink-600", bg: "bg-pink-50 border-pink-100" },
            ].map((p) => (
              <span
                key={p.name}
                className={`${p.bg} ${p.color} border text-xs font-semibold px-3 py-1.5 rounded-lg`}
              >
                {p.name}
              </span>
            ))}
          </div>

          {/* Stats row */}
          <div className="mt-12 inline-flex items-center divide-x divide-gray-200 bg-white border border-gray-100 rounded-2xl shadow-soft overflow-hidden">
            {[
              { value: "10,000+", label: "Listings Generated" },
              { value: "4.9★", label: "Avg Rating" },
              { value: "60 sec", label: "Average Time" },
            ].map((stat) => (
              <div key={stat.label} className="px-6 py-4 text-center">
                <div className="text-xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Generator Tool ── */}
      <section id="generator" className="max-w-7xl mx-auto px-6 pb-24 pt-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900">
            Generate Your Listing
          </h2>
          <p className="mt-2 text-gray-500 text-sm">
            Fill in the details below and get a fully optimized listing in seconds.
          </p>
        </div>
        <ListingGenerator />
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-gray-100 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-600 rounded-md flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <span className="text-sm font-semibold text-gray-700">
              List<span className="text-indigo-600">ify</span>
            </span>
          </div>
          <p className="text-xs text-gray-400">
            © 2025 Listify. Built with Claude AI.
          </p>
          <button className="text-xs text-indigo-600 font-medium hover:underline">
            Upgrade to Pro — ₹99/mo
          </button>
        </div>
      </footer>
    </div>
  );
}
