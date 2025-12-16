import { Suspense } from "react";
import DreamSummaryClient from "./DreamSummaryClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading summary...</div>}>
      <DreamSummaryClient />
    </Suspense>
  );
}
