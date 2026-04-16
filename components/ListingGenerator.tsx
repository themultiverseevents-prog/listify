"use client";

import { useState, useRef } from "react";
import type { GenerateResponse } from "@/app/api/generate/route";

// ── Types ──────────────────────────────────────────────────────────────────

interface FormData {
  productName: string;
  category: string;
  keyFeatures: string;
  targetCustomer: string;
  priceRange: string;
  platform: string;
  competitorWeakness: string;
}

const CATEGORIES = [
  "Electronics",
  "Mobile & Accessories",
  "Home & Kitchen",
  "Fashion & Clothing",
  "Beauty & Personal Care",
  "Sports & Fitness",
  "Books & Stationery",
  "Toys & Games",
  "Food & Grocery",
  "Health & Wellness",
  "Baby & Kids",
  "Automotive",
  "Tools & Hardware",
  "Pet Supplies",
  "Other",
];

const TARGET_CUSTOMERS = [
  "General Audience",
  "Men (18–35)",
  "Men (35+)",
  "Women (18–35)",
  "Women (35+)",
  "Students & Young Adults",
  "Parents & Families",
  "Fitness Enthusiasts",
  "Professionals",
  "Senior Citizens",
  "Gift Buyers",
  "Budget Shoppers",
  "Premium Buyers",
];

const PLATFORMS = ["Amazon", "Flipkart", "Shopify", "Meesho", "Other"];

// ── Icons ──────────────────────────────────────────────────────────────────

function CopyIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#B0A99F"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg className="animate-spin" width="17" height="17" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── Copy Button ────────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button onClick={handleCopy} className="copy-btn" title={`Copy ${label}`}>
      {copied ? (
        <span className="text-green-500">
          <CheckIcon />
        </span>
      ) : (
        <CopyIcon />
      )}
    </button>
  );
}

// ── Output Section Wrapper ─────────────────────────────────────────────────

function OutputSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white border border-warm-200 rounded-2xl overflow-hidden shadow-soft">
      {/* Section header */}
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-warm-100 bg-warm-50">
        <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#A8A29E]">
          {title}
        </span>
        {action}
      </div>
      {/* Content */}
      <div className="px-5 py-4">{children}</div>
    </div>
  );
}

// ── Loading Skeleton ───────────────────────────────────────────────────────

function OutputSkeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      {[{ h: "h-20" }, { h: "h-48" }, { h: "h-28" }, { h: "h-16" }].map(
        (s, i) => (
          <div
            key={i}
            className="bg-white border border-warm-200 rounded-2xl overflow-hidden shadow-soft"
          >
            <div className="h-10 bg-warm-100 border-b border-warm-100" />
            <div className={`${s.h} bg-warm-50 m-4 rounded-xl`} />
          </div>
        )
      )}
    </div>
  );
}

// ── Empty State — faded skeleton preview of the output ────────────────────

function EmptyState() {
  return (
    <div>
      {/* Prompt header */}
      <div className="px-6 pt-7 pb-5 text-center border-b border-warm-100">
        <div className="w-10 h-10 bg-orange-50 border border-orange-100 rounded-xl mx-auto mb-3 flex items-center justify-center">
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#F97316"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
        </div>
        <p className="text-[13px] font-bold text-[#1A1A1A]">
          Your optimized listing will appear here
        </p>
        <p className="text-xs text-[#A8A29E] mt-1">
          Fill the form on the left and hit &ldquo;Generate Listing&rdquo;
        </p>
      </div>

      {/* Skeleton preview — faded, communicates exactly what you get */}
      <div className="p-5 space-y-3 opacity-40 pointer-events-none select-none">
        {/* Title skeleton */}
        <div className="border border-warm-200 rounded-xl overflow-hidden">
          <div className="h-9 bg-warm-50 border-b border-warm-200 flex items-center justify-between px-4">
            <div className="h-2 w-8 bg-warm-300 rounded-full" />
            <div className="h-2 w-14 bg-warm-200 rounded-full" />
          </div>
          <div className="p-4 space-y-2">
            <div className="h-2 bg-warm-100 rounded-full w-full" />
            <div className="h-2 bg-warm-100 rounded-full w-10/12" />
          </div>
        </div>

        {/* Bullets skeleton */}
        <div className="border border-warm-200 rounded-xl overflow-hidden">
          <div className="h-9 bg-warm-50 border-b border-warm-200 flex items-center px-4">
            <div className="h-2 w-20 bg-warm-300 rounded-full" />
          </div>
          <div className="p-4 space-y-2.5">
            {[100, 88, 94, 82, 91].map((w, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <div className="w-5 h-5 rounded-full bg-warm-200 shrink-0" />
                <div
                  className="h-2 bg-warm-100 rounded-full"
                  style={{ width: `${w}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Description skeleton */}
        <div className="border border-warm-200 rounded-xl overflow-hidden">
          <div className="h-9 bg-warm-50 border-b border-warm-200 flex items-center px-4">
            <div className="h-2 w-16 bg-warm-300 rounded-full" />
          </div>
          <div className="p-4 space-y-2">
            {[100, 92, 96, 84, 78].map((w, i) => (
              <div key={i} className="h-2 bg-warm-100 rounded-full" style={{ width: `${w}%` }} />
            ))}
          </div>
        </div>

        {/* Keywords skeleton */}
        <div className="border border-warm-200 rounded-xl overflow-hidden">
          <div className="h-9 bg-warm-50 border-b border-warm-200 flex items-center px-4">
            <div className="h-2 w-24 bg-warm-300 rounded-full" />
          </div>
          <div className="p-4 flex flex-wrap gap-2">
            {[52, 66, 44, 72, 58, 48, 62, 50, 42, 68].map((w, i) => (
              <div
                key={i}
                className="h-6 bg-warm-100 rounded-full"
                style={{ width: `${w}px` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Output Display ─────────────────────────────────────────────────────────

function OutputDisplay({
  output,
  onRegenerate,
  isLoading,
}: {
  output: GenerateResponse;
  onRegenerate: () => void;
  isLoading: boolean;
}) {
  const charCount = output.title.length;
  const charColor =
    charCount > 200
      ? "text-red-500"
      : charCount > 170
      ? "text-amber-500"
      : "text-green-600";

  return (
    <div className="space-y-4">
      {/* ── Title ── */}
      <OutputSection
        title="Title"
        action={
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold ${charColor}`}>
              {charCount}/200
            </span>
            <CopyButton text={output.title} label="title" />
          </div>
        }
      >
        <p className="text-sm font-semibold text-[#1A1A1A] leading-relaxed">
          {output.title}
        </p>
      </OutputSection>

      {/* ── Bullets ── */}
      <OutputSection
        title="Bullet Points"
        action={
          <CopyButton text={output.bullets.join("\n")} label="all bullets" />
        }
      >
        <ul className="space-y-2.5">
          {output.bullets.map((bullet, i) => (
            <li
              key={i}
              className="group flex items-start gap-3 bg-warm-50 border border-warm-100 rounded-xl px-3.5 py-3 hover:border-orange-200 hover:bg-orange-50/30 transition-colors"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-[#1F1F1F] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-[#2A2A2A] flex-1 leading-relaxed">{bullet}</p>
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={bullet} label={`bullet ${i + 1}`} />
              </div>
            </li>
          ))}
        </ul>
      </OutputSection>

      {/* ── Description ── */}
      <OutputSection
        title="Description"
        action={
          <CopyButton text={output.description} label="description" />
        }
      >
        <p className="text-sm text-[#2A2A2A] leading-7">{output.description}</p>
      </OutputSection>

      {/* ── Keywords ── */}
      <OutputSection
        title="Backend Keywords"
        action={
          <CopyButton
            text={output.keywords.join(", ")}
            label="keywords"
          />
        }
      >
        <div className="flex flex-wrap gap-2">
          {output.keywords.map((kw, i) => (
            <span
              key={i}
              className="bg-warm-50 border border-warm-200 text-[#5A5550] text-xs font-medium px-3 py-1.5 rounded-full hover:border-orange-200 hover:bg-orange-50 hover:text-orange-700 transition-colors cursor-default"
            >
              {kw}
            </span>
          ))}
        </div>
      </OutputSection>

      {/* ── Actions ── */}
      <div className="flex flex-col sm:flex-row gap-3 pt-1">
        <button
          onClick={onRegenerate}
          disabled={isLoading}
          className="btn-secondary flex-1"
        >
          {isLoading ? (
            <>
              <SpinnerIcon />
              Regenerating…
            </>
          ) : (
            <>
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8M3 16v4h4M21 8v-4h-4" />
              </svg>
              Generate Again
            </>
          )}
        </button>
        <button className="btn-primary flex-1">
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
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function ListingGenerator() {
  const [form, setForm] = useState<FormData>({
    productName: "",
    category: "",
    keyFeatures: "",
    targetCustomer: "",
    priceRange: "",
    platform: "Amazon",
    competitorWeakness: "",
  });

  const [output, setOutput] = useState<GenerateResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isFormValid =
    form.productName.trim() &&
    form.category &&
    form.keyFeatures.trim() &&
    form.targetCustomer &&
    form.priceRange.trim() &&
    form.platform;

  const generate = async () => {
    if (!isFormValid || loading) return;
    setLoading(true);
    setError(null);

    if (window.innerWidth < 1024 && outputRef.current) {
      outputRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setOutput(data as GenerateResponse);
      if (window.innerWidth < 1024 && outputRef.current) {
        setTimeout(() => {
          outputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 items-start">

      {/* ── LEFT: Input Form ── */}
      <div className="card">
        <div className="mb-6 pb-5 border-b border-warm-100">
          <h3 className="text-[15px] font-bold text-[#1A1A1A] tracking-tight">
            Product Details
          </h3>
          <p className="text-sm text-[#A8A29E] mt-1">
            The more specific you are, the better the output.
          </p>
        </div>

        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="label">
              Product Name <span className="text-orange-400">*</span>
            </label>
            <input
              id="productName"
              name="productName"
              type="text"
              placeholder="e.g. Stainless Steel Water Bottle 1L"
              value={form.productName}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="label">
              Category <span className="text-orange-400">*</span>
            </label>
            <div className="relative">
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="input-field appearance-none pr-10"
              >
                <option value="">Select a category…</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <ChevronDown />
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label htmlFor="keyFeatures" className="label">
              Key Features <span className="text-orange-400">*</span>
            </label>
            <textarea
              id="keyFeatures"
              name="keyFeatures"
              rows={4}
              placeholder="e.g. Leak-proof lid, BPA-free, keeps cold 24h, 500ml capacity, comes in 5 colors"
              value={form.keyFeatures}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <p className="text-xs text-[#B0A99F] mt-1.5">
              Separate features with commas for best results
            </p>
          </div>

          {/* Target Customer + Platform */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="targetCustomer" className="label">
                Target Customer <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="targetCustomer"
                  name="targetCustomer"
                  value={form.targetCustomer}
                  onChange={handleChange}
                  className="input-field appearance-none pr-8 text-xs"
                >
                  <option value="">Select…</option>
                  {TARGET_CUSTOMERS.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <ChevronDown />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="platform" className="label">
                Platform <span className="text-orange-400">*</span>
              </label>
              <div className="relative">
                <select
                  id="platform"
                  name="platform"
                  value={form.platform}
                  onChange={handleChange}
                  className="input-field appearance-none pr-8 text-xs"
                >
                  {PLATFORMS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <ChevronDown />
                </div>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="priceRange" className="label">
              Price Range <span className="text-orange-400">*</span>
            </label>
            <input
              id="priceRange"
              name="priceRange"
              type="text"
              placeholder="e.g. ₹499 – ₹799"
              value={form.priceRange}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Competitor Weakness */}
          <div>
            <label htmlFor="competitorWeakness" className="label">
              Competitor Weakness{" "}
              <span className="text-[#B0A99F] font-normal">(optional)</span>
            </label>
            <textarea
              id="competitorWeakness"
              name="competitorWeakness"
              rows={2}
              placeholder="e.g. Thin handles, no warranty, battery dies quickly…"
              value={form.competitorWeakness}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <p className="text-xs text-[#B0A99F] mt-1.5">
              We&apos;ll position your product as the better choice
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
              <svg
                className="shrink-0 mt-0.5"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 8v4M12 16h.01" />
              </svg>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            onClick={generate}
            disabled={!isFormValid || loading}
            className="btn-primary w-full py-4 text-[15px]"
          >
            {loading ? (
              <>
                <SpinnerIcon />
                Generating your listing…
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
                </svg>
                Generate Listing
              </>
            )}
          </button>

          <p className="text-center text-xs text-[#B0A99F]">
            Free to use · No sign-up needed
          </p>
        </div>
      </div>

      {/* ── RIGHT: Output ── */}
      <div ref={outputRef}>
        {/* Output header */}
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[15px] font-bold text-[#1A1A1A] tracking-tight">
              Your Listing
            </h3>
            <p className="text-sm text-[#A8A29E] mt-0.5">
              {output ? "Ready to copy & paste" : "Optimised output will appear here"}
            </p>
          </div>
          {output && (
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Ready
            </span>
          )}
        </div>

        {loading ? (
          <OutputSkeleton />
        ) : output ? (
          /* Subtle orange glow signals the content was just generated */
          <div
            className="rounded-2xl transition-all duration-500"
            style={{
              boxShadow:
                "0 0 0 1px rgba(249,115,22,0.18), 0 8px 40px -8px rgba(249,115,22,0.10)",
            }}
          >
            <OutputDisplay
              output={output}
              onRegenerate={generate}
              isLoading={loading}
            />
          </div>
        ) : (
          <div className="bg-white border border-warm-200 rounded-2xl shadow-soft overflow-hidden">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}
