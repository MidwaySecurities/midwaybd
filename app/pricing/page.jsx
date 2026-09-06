import Link from "next/link";

function BankIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
      <path d="M3 10.5 12 4l9 6.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 10.5v8M9 10.5v8M15 10.5v8M19.5 10.5v8" strokeLinecap="round" />
      <path d="M3 20.5h18" strokeLinecap="round" />
    </svg>
  );
}

function CalendarIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
      <rect x="3.5" y="5" width="17" height="16" rx="2.5" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4" strokeLinecap="round" />
    </svg>
  );
}
function CashBackIcon(props) {
  return (
    <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    viewBox="0 0 32 32"
    {...props}
  >
    <path
      d="M232.42 306.895c-.642 0-1.284.24-1.768.724l-2.933 2.936a2.485 2.485 0 0 0-1.455-1.08l-6.924-1.856a4.1 4.1 0 0 0-1.676-.092 4.096 4.096 0 0 0-1.572.584l-4.322 2.727-.35-.608a1.621 1.621 0 0 0-2.19-.585l-3.287 1.896a1.621 1.621 0 0 0-.586 2.19l4.899 8.482a1.62 1.62 0 0 0 2.187.588l3.287-1.899a1.622 1.622 0 0 0 .588-2.19l-.064-.112 1.873-1.266 6.89 1.355c.945.186 1.789-.077 2.461-.765a531.235 531.235 0 0 1 6.706-6.764 1 1 0 0 0 .006-.004 2.519 2.519 0 0 0 0-3.537 2.496 2.496 0 0 0-1.77-.725zm0 1.982a.5.5 0 0 1 .353.156.48.48 0 0 1 0 .71 533.533 533.533 0 0 0-6.724 6.784c-.041.042-.588.21-.645.2l-7.299-1.434a1 1 0 0 0-.753.152l-2.1 1.42-2.48-4.295 4.386-2.765a2.1 2.1 0 0 1 1.664-.254l6.924 1.855a.48.48 0 0 1 .354.614.48.48 0 0 1-.614.353l-4.345-1.164a1 1 0 0 0-1.225.707 1 1 0 0 0 .707 1.225l4.346 1.164a2.52 2.52 0 0 0 2.592-.852 1 1 0 0 0 .263-.176l4.242-4.244a.5.5 0 0 1 .354-.156zm-22.533 2.697.484.84a1 1 0 0 0 .139.4 1 1 0 0 0 .238.252l3.639 6.303-2.598 1.5-4.5-7.795zM224 301.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 0-1-1zM224 297.014a1 1 0 0 0-1 1 1 1 0 0 0 1 1h2a1 1 0 0 0 1-1 1 1 0 0 0-1-1z"
      style={{
        color: "#000",
        fill: "#000",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4.1,
        InkscapeStroke: "none",
      }}
      transform="translate(-204 -292)"
    />
    <path
      d="M225 293.014c-3.854 0-7 3.146-7 7s3.146 7 7 7 7-3.146 7-7-3.146-7-7-7zm0 2c2.773 0 5 2.226 5 5 0 2.773-2.227 5-5 5s-5-2.227-5-5c0-2.774 2.227-5 5-5z"
      style={{
        color: "#000",
        fill: "#000",
        fillRule: "evenodd",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeMiterlimit: 4.1,
        InkscapeStroke: "none",
      }}
      transform="translate(-204 -292)"
    />
  </svg>
  );
}

function PhoneIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
      <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" strokeLinecap="round" />
    </svg>
  );
}

function WithdrawIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.7" stroke="currentColor" {...props}>
      <path d="M12 4v13" strokeLinecap="round" />
      <path d="m6.5 12 5.5 5.5L17.5 12" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4.5 20.5h15" strokeLinecap="round" />
    </svg>
  );
}
function TransactionIcon(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
      <path fill="none" stroke="#000000" stroke-width="2" d="M2,7 L20,7 M16,2 L21,7 L16,12 M22,17 L4,17 M8,12 L3,17 L8,22" />
    </svg>
  );
}

const openingRows = [
  {
    icon: BankIcon,
    label: "BO Account opening",
    detail: "One time fee for opening a BO account with Midway Securities Ltd.",
    // With an initial deposit and share buy of BDT 50,000.
    amount: "৳150",
    tone: "free",
    hasNote: true,
  },
  {
    icon: CalendarIcon,
    label: "Yearly renewal fee",
    detail: "Charged once a year, in June, to keep your account active.",
    amount: "৳150",
    tone: "charge",
  },
  {
    icon: CashBackIcon,
    label: "Cash Back BO Account Fee",
    detail: <><ul className="list-disc px-4"><li>With an initial investment of BDT 50,000.</li><li>For Link BO account portfolio value above BDT 50,000.</li></ul></>,
    amount: "",
    tone: "charge",
  },
];

const fundingRows = [
  {
    icon: BankIcon,
    label: "Deposit via bank",
    detail: "From any bank account, straight into your BO account.",
    amount: "Free",
    tone: "free",
  },
  {
    icon: PhoneIcon,
    label: "Deposit via bKash, Rocket, Nagad",
    detail: "Mobile financial service deposits carry a service fee.",
    amount: "1%",
    tone: "charge",
  },
  {
    icon: WithdrawIcon,
    label: "Withdrawal",
    detail: "Fund withdrawal from your BO account to your bank account.",
    amount: "Free",
    tone: "free",
  },
  {
    icon: TransactionIcon,
    label: "Commission",
    detail: <>Industry-standard commission rates.Call us to know your applicable commission rate: <Link href="https://wa.me/+8801874444816" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">01874444816 (WhatsApp)</Link>.</>,
    amount: "",
    tone: "free",
  },
];

function Card({ icon: Icon, label, detail, amount, tone, hasNote }) {
  const isFree = tone === "free";
  return (
    <div className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${isFree
          ? "bg-emerald-50 text-secondary_color"
          : "bg-violet-50 text-primary_color"
          }`}
      >
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="font-medium text-slate-900">{label}</p>
          <p
            className={`shrink-0 whitespace-nowrap text-right font-semibold tabular-nums ${isFree ? "text-secondary_color" : "text-slate-900"
              }`}
          >
            {amount}
            {/* {hasNote && <span className="text-slate-400">*</span>} */}
          </p>
        </div>
        <p className="mt-1 text-sm leading-relaxed text-slate-500">{detail}</p>
      </div>
    </div>
  );
}

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative overflow-hidden bg-primary_color">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full  blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 pb-20 pt-16 text-center sm:pt-24">
          {/* <div className="mb-6 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-slate-300 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Free to open a BO account
            </span>
          </div> */}
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Simple, transparent
            <span className="text-secondary_color mt-2 block">
              pricing
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-lg text-lg text-slate-400">
            Open your BO account for free with an initial investment of BDT 50,000 minimum.
          </p>
          {/* <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#open"
              className="w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100 sm:w-auto"
            >
              Open your BO account
            </a>
            <a
              href="#schedule"
              className="w-full rounded-xl border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/5 sm:w-auto"
            >
              See full pricing
            </a>
          </div> */}
        </div>
      </section>

      {/* Pricing */}
      <section id="schedule" className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Opening &amp; renewal
            </h2>
            <div className="mt-4 space-y-3">
              {openingRows.map((row) => (
                <Card key={row.label} {...row} />
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-slate-900">
              Transaction
            </h2>
            <div className="mt-4 space-y-3">
              {fundingRows.map((row) => (
                <Card key={row.label} {...row} />
              ))}
            </div>
          </div>
        </div>

        {/* <p className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-500">
          * Free opening applies once your initial deposit and share purchase
          together total BDT 50,000. Renewal is billed automatically every
          June. Fees are subject to change with notice.
        </p> */}
      </section>

      {/* CTA */}
      <section id="open" className="px-6 pb-20">
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl bg-primary_color px-8 py-12 text-center shadow-xl shadow-slate-300/40 sm:px-12">
          <h3 className="text-2xl font-semibold text-white sm:text-3xl">
            Ready to open your BO account?
          </h3>
          {/* <p className="mx-auto mt-3 max-w-sm text-slate-400">
            Bring your NID, a passport photo, and your initial deposit — the
            rest takes about fifteen minutes.
          </p> */}
          <Link
            href="https://portal.midwaybd.com/bo/portal-login" target="_blank"
            className="mt-7 inline-flex items-center justify-center rounded-xl bg-secondary_color px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90"
          >
            Start account opening
          </Link>
        </div>
      </section>

    </main>
  );
}