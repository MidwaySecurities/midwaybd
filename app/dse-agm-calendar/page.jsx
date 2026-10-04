// app/market/agm-calendar/page.jsx  (Server Component: no "use client" here)

import DseAgmCalendar from "./components/dse-agm/DseAgmCalendar";

export const metadata = {
  title: "DSE AGM, EGM & Record Dates",
  description: "Interactive calendar of Dhaka Stock Exchange AGMs, EGMs, record dates and proposed dividends.",
};

export default function Page() {
  return <DseAgmCalendar />;
}

/* Following your site's theme instead (e.g. next-themes), wrap it in a small client component:

"use client";
import { useTheme } from "next-themes";
import DseAgmCalendar from "@/components/dse-agm/DseAgmCalendar";
export default function AgmCalendarThemed() {
  const { resolvedTheme } = useTheme();
  return <DseAgmCalendar theme={resolvedTheme} />;   // hides the built-in toggle
}
*/
