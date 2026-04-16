import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Listify — AI Product Listing Generator",
  description:
    "Generate high-converting product listings for Amazon, Flipkart & Shopify in 60 seconds using AI.",
  keywords: "amazon listing generator, flipkart listing, product description AI, e-commerce copywriting",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
