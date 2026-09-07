import { RecapClient } from "@/components/RecapClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Session recap",
  robots: { index: false, follow: false },
};

export default function RecapPage() {
  return <RecapClient />;
}

