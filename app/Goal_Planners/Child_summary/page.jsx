import { Suspense } from "react";
import ChildSummaryClient from "./ChildSummaryClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <ChildSummaryClient />
    </Suspense>
  );
}
