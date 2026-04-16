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

function CopyIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      className="animate-spin"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
  );
}

// ── Copy Button ───────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const el = document.createElement("textarea");
      el.value = text;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="copy-btn"
      title={`Copy ${label}`}
    >
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

// ── Loading Skeleton ───────────────────────────────────────────────────────

function OutputSkeleton() {
  return (
    <div className="space-y-5 animate-pulse">
      {/* Title skeleton */}
      <div>
        <div className="h-3 w-16 bg-gray-200 rounded mb-3" />
        <div className="h-10 bg-gray-100 rounded-lg" />
        <div className="h-4 w-24 bg-gray-100 rounded mt-2" />
      </div>
      {/* Bullets skeleton */}
      <div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
        <div className="space-y-2.5">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-11 bg-gray-100 rounded-lg" />
          ))}
        </div>
      </div>
      {/* Description skeleton */}
      <div>
        <div className="h-3 w-24 bg-gray-200 rounded mb-3" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/5" />
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-3/4" />
        </div>
      </div>
      {/* Keywords skeleton */}
      <div>
        <div className="h-3 w-20 bg-gray-200 rounded mb-3" />
        <div className="flex flex-wrap gap-2">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-6 bg-gray-100 rounded-full"
              style={{ width: `${60 + Math.random() * 60}px` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] text-center px-4">
      <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-5">
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#6366F1"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-gray-800 mb-2">
        Your listing will appear here
      </h3>
      <p className="text-sm text-gray-400 max-w-xs">
        Fill in the form and click &ldquo;Generate Listing&rdquo; to create a
        high-converting product listing powered by AI.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-3 w-full max-w-xs text-left">
        {[
          { icon: "T", label: "SEO-optimized title" },
          { icon: "•", label: "5 benefit-first bullet points" },
          { icon: "¶", label: "Persuasive description" },
          { icon: "#", label: "10 backend keywords" },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center gap-3 text-sm text-gray-500"
          >
            <span className="w-7 h-7 rounded-lg bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-400 shrink-0">
              {item.icon}
            </span>
            {item.label}
          </div>
        ))}
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
  const titleCharCount = output.title.length;
  const charCountColor =
    titleCharCount > 200
      ? "text-red-500"
      : titleCharCount > 170
      ? "text-amber-500"
      : "text-green-600";

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Title</label>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-medium ${charCountColor}`}>
              {titleCharCount}/200 chars
            </span>
            <CopyButton text={output.title} label="title" />
          </div>
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-800 leading-relaxed font-medium">
            {output.title}
          </p>
        </div>
      </div>

      {/* Bullet Points */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Bullet Points</label>
          <CopyButton
            text={output.bullets.join("\n")}
            label="all bullets"
          />
        </div>
        <div className="space-y-2">
          {output.bullets.map((bullet, i) => (
            <div
              key={i}
              className="group flex items-start gap-3 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 hover:border-indigo-100 hover:bg-indigo-50/30 transition-colors"
            >
              <span className="shrink-0 w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold flex items-center justify-center mt-0.5">
                {i + 1}
              </span>
              <p className="text-sm text-gray-700 flex-1 leading-relaxed">
                {bullet}
              </p>
              <div className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                <CopyButton text={bullet} label={`bullet ${i + 1}`} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Description</label>
          <CopyButton text={output.description} label="description" />
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-sm text-gray-700 leading-7">
            {output.description}
          </p>
        </div>
      </div>

      {/* Keywords */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="label mb-0">Backend Keywords</label>
          <CopyButton
            text={output.keywords.join(", ")}
            label="keywords"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {output.keywords.map((kw, i) => (
            <span
              key={i}
              className="inline-flex items-center bg-indigo-50 text-indigo-700 text-xs font-medium px-3 py-1.5 rounded-full border border-indigo-100 hover:bg-indigo-100 transition-colors cursor-default"
            >
              {kw}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-gray-100">
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
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 12a9 9 0 019-9 9.75 9.75 0 016.74 2.74L21 8M3 16v4h4M21 8l.74.74M21 12a9 9 0 01-9 9 9.75 9.75 0 01-6.74-2.74L3 16" />
              </svg>
              Generate Again
            </>
          )}
        </button>
        <button className="btn-primary flex-1 bg-amber-500 hover:bg-amber-600 focus:ring-amber-400">
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
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

    // Scroll to output on mobile
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

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setOutput(data as GenerateResponse);

      // Scroll to output after generation on mobile
      if (window.innerWidth < 1024 && outputRef.current) {
        setTimeout(() => {
          outputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }, 100);
      }
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
      {/* ── LEFT: Input Form ── */}
      <div className="card">
        <div className="mb-6">
          <h3 className="text-base font-semibold text-gray-900">
            Product Details
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            The more specific you are, the better the listing.
          </p>
        </div>

        <div className="space-y-5">
          {/* Product Name */}
          <div>
            <label htmlFor="productName" className="label">
              Product Name
              <span className="text-red-400 ml-0.5">*</span>
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
              Category
              <span className="text-red-400 ml-0.5">*</span>
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
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <label htmlFor="keyFeatures" className="label">
              Key Features
              <span className="text-red-400 ml-0.5">*</span>
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
            <p className="text-xs text-gray-400 mt-1">
              List features separated by commas
            </p>
          </div>

          {/* Two-column row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Target Customer */}
            <div>
              <label htmlFor="targetCustomer" className="label">
                Target Customer
                <span className="text-red-400 ml-0.5">*</span>
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
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Platform */}
            <div>
              <label htmlFor="platform" className="label">
                Platform
                <span className="text-red-400 ml-0.5">*</span>
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
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div>
            <label htmlFor="priceRange" className="label">
              Price Range
              <span className="text-red-400 ml-0.5">*</span>
            </label>
            <input
              id="priceRange"
              name="priceRange"
              type="text"
              placeholder="e.g. ₹499 – ₹799 or Under $20"
              value={form.priceRange}
              onChange={handleChange}
              className="input-field"
            />
          </div>

          {/* Competitor Weakness (optional) */}
          <div>
            <label htmlFor="competitorWeakness" className="label">
              Competitor Weakness{" "}
              <span className="text-gray-400 font-normal">(optional)</span>
            </label>
            <textarea
              id="competitorWeakness"
              name="competitorWeakness"
              rows={2}
              placeholder="e.g. Competitors have thin handles, no warranty, short battery life…"
              value={form.competitorWeakness}
              onChange={handleChange}
              className="input-field resize-none"
            />
            <p className="text-xs text-gray-400 mt-1">
              We&apos;ll highlight what makes you better
            </p>
          </div>

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-3 bg-red-50 border border-red-100 text-red-700 text-sm rounded-xl px-4 py-3">
              <svg
                className="shrink-0 mt-0.5"
                width="16"
                height="16"
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

          {/* Submit Button */}
          <button
            onClick={generate}
            disabled={!isFormValid || loading}
            className="btn-primary w-full text-sm"
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

          <p className="text-center text-xs text-gray-400">
            Free to use · Powered by Claude AI · No sign-up needed
          </p>
        </div>
      </div>

      {/* ── RIGHT: Output Preview ── */}
      <div ref={outputRef} className="card min-h-[560px]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-base font-semibold text-gray-900">
              Your Listing
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              {output
                ? "Ready to copy & paste"
                : "Optimized output will appear here"}
            </p>
          </div>
          {output && (
            <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              Ready
            </span>
          )}
        </div>

        {loading ? (
          <OutputSkeleton />
        ) : output ? (
          <OutputDisplay
            output={output}
            onRegenerate={generate}
            isLoading={loading}
          />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}
