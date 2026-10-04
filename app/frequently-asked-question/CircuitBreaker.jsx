const rows = [
  {
    price: "Up to Tk. 200",
    limit: "20% but not exceeding Tk. 35",
    updown: "10%",
  },
  {
    price: "Tk. 200 to Tk. 500",
    limit: "17.5% but not exceeding Tk. 75",
    updown: "8.75%",
  },
  {
    price: "Tk. 501 to Tk. 1000",
    limit: "15% but not exceeding Tk. 125",
    updown: "7.5%",
  },
  {
    price: "Tk. 1001 to Tk. 2000",
    limit: "12.5% but not exceeding Tk. 200",
    updown: "6.25%",
  },
  {
    price: "Tk. 2001 to Tk. 5000",
    limit: "10% but not exceeding Tk. 375",
    updown: "5%",
  },
  {
    price: "Tk. 5001 and above",
    limit: "7.5% but not exceeding Tk. 600",
    updown: "3.75%",
  },
];

export default function PriceLimitTable() {
  return (
    <div className="w-full px-3 sm:px-6 py-8">
      {/* Scrolls horizontally only if content ever gets too tight; column widths are tuned so it fits at 320px without scrolling */}
      <div className="mx-auto max-w-4xl overflow-x-auto rounded-lg border border-slate-200 shadow-sm">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="bg-slate-100">
              <th className="border border-slate-200 px-2 py-2 text-[11px] font-semibold leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                Previous day&apos;s per share market price
              </th>
              <th className="border border-slate-200 px-2 py-2 text-[11px] font-semibold leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                Limits
              </th>
              <th className="border border-slate-200 px-2 py-2 text-[11px] font-semibold leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                Up or down
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={row.price}
                className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}
              >
                <td className="border border-slate-200 px-2 py-2 text-center text-[11px] leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                  {row.price}
                </td>
                <td className="border border-slate-200 px-2 py-2 text-center text-[11px] leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                  {row.limit}
                </td>
                <td className="border border-slate-200 px-2 py-2 text-center text-[11px] leading-tight text-slate-700 sm:px-4 sm:py-3 sm:text-sm lg:text-base">
                  {row.updown}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}