import ListingGenerator from "@/components/ListingGenerator";

// ── Static data ────────────────────────────────────────────────────────────

const BEFORE = {
  title: "water bottle",
  bullets: [
    "its a good bottle",
    "has a lid which doesnt leak",
    "good for gym use",
  ],
  description:
    "This water bottle is very useful. Good quality product. Buy now at great price. Very helpful for daily use at office or gym.",
};

const AFTER = {
  title:
    "HydroMax Pro Insulated Water Bottle 1L — BPA-Free Steel | Cold 24H, Hot 12H | Leak-Proof",
  bullets: [
    "SUPERIOR INSULATION – Double-wall vacuum maintains cold 24H & hot 12H, perfect for gym, office & long commutes",
    "100% LEAK-PROOF – Triple-seal lid locks tight, zero spills guaranteed in your bag or backpack",
    "BPA-FREE & CERTIFIED – Premium food-grade 304 stainless steel, trusted by 50,000+ Indian buyers",
  ],
  description:
    "Stay hydrated all day with the HydroMax Pro — India's most-loved insulated bottle for active lifestyles. Engineered for those who demand both performance and style...",
  more: 2,
};

const WHY_FEATURES = [
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Saves Hours",
    desc: "Craft a complete, professional listing in under 60 seconds — not hours. Spend less time writing and more time selling.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    title: "Improves Conversions",
    desc: "AI-optimised titles and benefit-first bullets drive higher click-through rates and convert browsers into buyers.",
  },
  {
    icon: (
      <svg
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Built for Indian Sellers",
    desc: "Understands ₹ pricing, Indian buyer psychology, and Amazon India & Flipkart's algorithm requirements out of the box.",
  },
];

// ── Page ───────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div className="min-h-screen bg-warm-50">

      {/* ── Navbar ─────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-warm-50/90 backdrop-blur-md border-b border-warm-200">
        <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#1F1F1F] rounded-lg flex items-center justify-center shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-[17px] font-bold tracking-tight text-[#1A1A1A]">
              List<span className="text-orange-500">ify</span>
            </span>
          </div>

          {/* Pro CTA */}
          <button className="group inline-flex flex-col items-center bg-[#1F1F1F] hover:bg-[#2A2A2A] text-white px-4 py-2 rounded-lg transition-colors">
            <span className="flex items-center gap-1.5 text-[13px] font-bold leading-snug">
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
              Unlock Full Listing – ₹99
            </span>
            <span className="text-[10px] text-white/40 font-medium leading-none mt-0.5">
              Pay only if you like the preview
            </span>
          </button>
        </div>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className="bg-warm-50 relative overflow-hidden">
        {/* Subtle radial accent in top-right */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full opacity-[0.07]"
          style={{
            background:
              "radial-gradient(circle, #F97316 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-4xl mx-auto px-6 pt-24 pb-20 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 text-orange-700 text-[11px] font-bold uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
            Amazon &amp; Flipkart Optimized
          </div>

          {/* Headline */}
          <h1 className="text-[52px] sm:text-[64px] font-extrabold text-[#1A1A1A] tracking-[-0.03em] leading-[1.06] max-w-3xl mx-auto">
            Increase Your Product Sales with{" "}
            <span className="text-orange-500">High-Converting Listings</span>{" "}
            in 60 Seconds
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-lg text-[#6B6560] max-w-xl mx-auto leading-relaxed">
            Stop wasting hours writing listings that don&apos;t convert.
            Generate optimized listings instantly.
          </p>

          {/* CTA */}
          <div className="mt-9">
            <a
              href="#generator"
              className="btn-primary text-[15px] px-9 py-4 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.03]"
            >
              Generate My Listing &nbsp;→
            </a>
          </div>

          {/* Below CTA micro copy */}
          <p className="mt-3.5 text-[13px] text-[#A8A29E]">
            No signup required &nbsp;·&nbsp; Takes 60 seconds
          </p>

          {/* Urgency line */}
          <p className="mt-2 text-[13px] text-[#A8A29E] flex items-center justify-center gap-1.5">
            <span className="text-orange-500">⚡</span>
            Most listings generated in under 60 seconds
          </p>

          {/* Trust line */}
          <div className="mt-5 inline-flex items-center gap-2 text-[13px] text-[#6B6560]">
            <span className="flex items-center gap-1 text-green-600 font-semibold">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Trusted by e-commerce sellers
            </span>
            to improve listing performance
          </div>

          {/* Stats */}
          <div className="mt-14 inline-flex flex-wrap justify-center items-stretch divide-x divide-warm-200 bg-white border border-warm-200 rounded-2xl shadow-soft overflow-hidden">
            {[
              { value: "10,000+", label: "Listings Generated" },
              { value: "4.9 / 5", label: "Seller Rating" },
              { value: "< 60s", label: "Average Time" },
              { value: "3 Platforms", label: "Supported" },
            ].map((s) => (
              <div key={s.label} className="px-7 py-5 text-center">
                <div className="text-[22px] font-extrabold text-[#1A1A1A] tracking-tight">
                  {s.value}
                </div>
                <div className="text-[11px] text-[#A8A29E] font-medium mt-0.5 tracking-wide uppercase">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Before / After ─────────────────────────────────────────────── */}
      <section className="bg-white border-y border-warm-200 py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">See the Difference</span>
            <h2 className="text-[38px] font-extrabold text-[#1A1A1A] tracking-[-0.025em] leading-tight">
              Same product. Completely different result.
            </h2>
            <p className="mt-3 text-[#6B6560] max-w-lg mx-auto">
              See how Listify transforms a generic listing into one that
              actually sells — in seconds, not hours.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* ── BEFORE ── */}
            <div className="bg-warm-100 border border-warm-200 rounded-2xl p-7 opacity-90">
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 bg-red-50 border border-red-100 text-red-500 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-5">
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
                Typical Listing — Low Conversion
              </div>

              {/* Title */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8C1B4] mb-1">
                  Title
                </p>
                <p className="text-sm text-[#9A938E] italic">{BEFORE.title}</p>
              </div>

              {/* Bullets */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8C1B4] mb-2">
                  Bullet Points
                </p>
                <ul className="space-y-1.5">
                  {BEFORE.bullets.map((b, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#9A938E] italic"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-[#DDD8CD] shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#C8C1B4] mb-1">
                  Description
                </p>
                <p className="text-sm text-[#9A938E] italic leading-relaxed">
                  {BEFORE.description}
                </p>
              </div>

              {/* Low conversion label */}
              <div className="mt-5 pt-4 border-t border-warm-200 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#C8C1B4" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" /><path d="M12 8v4M12 16h.01" />
                </svg>
                <span className="text-[11px] text-[#B0A99F] font-medium">Generic. No keywords. Low visibility.</span>
              </div>
            </div>

            {/* ── AFTER ── */}
            <div className="bg-white border-2 border-orange-200 rounded-2xl p-7 shadow-card relative">
              {/* Orange top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-orange-500 rounded-t-2xl" />

              {/* Badge row */}
              <div className="flex items-center justify-between mb-5">
                <div className="inline-flex items-center gap-1.5 bg-orange-50 text-orange-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Optimized Listing — High Conversion
                </div>
                <div className="inline-flex items-center gap-1 bg-green-50 text-green-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-green-100">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Higher conversions
                </div>
              </div>

              {/* Title */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#B0A99F] mb-1">
                  Title
                </p>
                <p className="text-sm font-bold text-[#1A1A1A] leading-snug">
                  {AFTER.title}
                </p>
              </div>

              {/* Bullets */}
              <div className="mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#B0A99F] mb-2">
                  Bullet Points
                </p>
                <ul className="space-y-2.5">
                  {AFTER.bullets.map((b, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-sm text-[#1A1A1A]">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-orange-400 shrink-0" />
                      <span>
                        <strong className="font-bold">
                          {b.split("–")[0]}–
                        </strong>
                        {b.split("–").slice(1).join("–")}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-2.5 text-[11px] text-orange-600 font-semibold pl-5">
                  + {AFTER.more} more optimized bullet points…
                </p>
              </div>

              {/* Description */}
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#B0A99F] mb-1">
                  Description
                </p>
                <p className="text-sm text-[#2A2A2A] leading-relaxed font-medium">
                  {AFTER.description}
                </p>
              </div>

              {/* Result label */}
              <div className="mt-5 pt-4 border-t border-orange-100 flex items-center gap-2">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2">
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                </svg>
                <span className="text-[11px] text-orange-700 font-semibold">Keyword-rich. Benefit-first. Built to convert.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Listify ────────────────────────────────────────────────── */}
      <section className="bg-warm-50 py-24">
        <div className="max-w-5xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-14">
            <span className="section-label">Why Listify</span>
            <h2 className="text-[38px] font-extrabold text-[#1A1A1A] tracking-[-0.025em] leading-tight">
              Everything sellers need to win online
            </h2>
            <p className="mt-3 text-[#6B6560] max-w-md mx-auto">
              No learning curve. No fluff. Just results.
            </p>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {WHY_FEATURES.map((f) => (
              <div
                key={f.title}
                className="bg-white border border-warm-200 rounded-2xl p-7 shadow-soft card-lift"
              >
                <div className="w-11 h-11 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center mb-5">
                  {f.icon}
                </div>
                <h3 className="text-base font-bold text-[#1A1A1A] mb-2 tracking-tight">
                  {f.title}
                </h3>
                <p className="text-sm text-[#6B6560] leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Generator ──────────────────────────────────────────────────── */}
      <section
        id="generator"
        className="bg-white border-t border-warm-200 py-24"
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="section-label">AI Generator</span>
            <h2 className="text-[38px] font-extrabold text-[#1A1A1A] tracking-[-0.025em] leading-tight">
              Generate Your Listing
            </h2>
            <p className="mt-3 text-[#6B6560] max-w-md mx-auto">
              Fill in your product details and get a fully optimised,
              platform-ready listing in seconds.
            </p>
          </div>
          <ListingGenerator />
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <footer className="bg-[#1A1A1A]">
        <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-white/10 rounded-lg flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <span className="text-sm font-bold text-white/90 tracking-tight">
              List<span className="text-orange-400">ify</span>
            </span>
          </div>

          <div className="text-center">
            <p className="text-[13px] text-white/30">
              © 2025 Listify. All rights reserved.
            </p>
            <p className="text-[11px] text-white/20 mt-1">
              Built for Indian e-commerce sellers &nbsp;·&nbsp; No fluff, just results
            </p>
          </div>

          <button className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white text-[13px] font-bold px-5 py-2.5 rounded-xl transition-colors">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
            Upgrade to Pro — ₹99/mo
          </button>
        </div>
      </footer>
    </div>
  );
}
