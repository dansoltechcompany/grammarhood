import { RecapClient } from "@/components/RecapClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session recap",
  robots: { index: false, follow: false },
  alternates: { canonical: "/recap" },
};

export default function RecapPage() {
  return <RecapClient />;
}

