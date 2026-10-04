import { BuildingIcon } from "./icons";

export default function CurrentlyOpenIPOCard({ data }) {
  if (!data || !data.isOpen) {
    return (
      <section id="currently-open" className="px-5 py-5 border-b border-gray-200">
        <h2 className="text-xs font-medium text-gray-500 mb-3">Currently Open</h2>
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 px-4 py-6 text-center">
          <p className="text-sm text-gray-600">
            {data?.noOpenIpoMessage ||
              "No IPO is currently open for subscription. Check back soon."}
          </p>
        </div>
      </section>
    );
  }

  const dateRange = formatDateRange(
    data.openingSubscriptionDate,
    data.closingSubscriptionDate
  );

  return (
    <section id="currently-open" className="px-5 py-5 border-b border-gray-200">
      <h2 className="text-xs font-medium text-gray-500 mb-3">Currently Open</h2>

      <div className="rounded-lg border border-gray-200 overflow-hidden">
        {/* Company image / banner — falls back to a placeholder tile */}
        <div className="relative w-full aspect-[16/7] bg-secondary_color/10">
          {data.companyImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.companyImage}
              alt={`${data.companyName} — IPO`}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-secondary_color">
              <BuildingIcon className="w-10 h-10" />
            </div>
          )}
          {data.pricingMethod && (
            <span className="absolute top-3 left-3 inline-flex items-center rounded-md bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-secondary_color">
              {data.pricingMethod}
            </span>
          )}
        </div>

        <div className="p-4 sm:p-5">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {data.companyName}
              </h3>
              {dateRange && (
                <p className="text-xs text-gray-500 mt-1">
                  Subscription {dateRange}
                </p>
              )}
            </div>
            {data.applyUrl && (
              <a
                href={data.applyUrl}
                className="shrink-0 inline-flex items-center justify-center rounded-md bg-[#004990] px-4 py-2 text-xs font-medium text-white hover:opacity-90 transition"
              >
                Apply Now
              </a>
            )}
          </div>

          <dl className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Stat label="Shares Offered" value={data.sharesOffered} />
            <Stat label="Price" value={data.price} />
            <Stat label="Category" value={data.investorCategory} />
            <Stat label="Subscription Amount" value={data.subscriptionAmount} />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  if (!value) return null;
  return (
    <div className="rounded-md bg-gray-50 px-3 py-2">
      <dt className="text-[10px] uppercase tracking-wide text-gray-500">{label}</dt>
      <dd className="text-sm font-medium text-gray-900 mt-0.5">{value}</dd>
    </div>
  );
}

function formatDateRange(openIso, closeIso) {
  const open = safeFormatDate(openIso);
  const close = safeFormatDate(closeIso);
  if (open && close) return `${open} – ${close}`;
  return open || close || "";
}

function safeFormatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" }).format(d);
}
