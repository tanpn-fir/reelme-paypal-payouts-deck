import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ReelMe × PayPal — Creator Payouts",
  description:
    "How ReelMe wants to pay creators their earnings through PayPal — a discovery deck to scope the integration. Bilingual VI / EN.",
  openGraph: {
    type: "website",
    siteName: "ReelMe × PayPal — Creator Payouts",
    title: "ReelMe × PayPal — Creator Payouts",
    description:
      "A discovery deck to scope the PayPal payouts integration for ReelMe creators.",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "ReelMe × PayPal — Creator Payouts",
    description:
      "A discovery deck to scope the PayPal payouts integration for ReelMe creators.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body>{children}</body>
    </html>
  );
}
