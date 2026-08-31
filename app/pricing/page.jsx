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

const openingRows = [
  {
    icon: BankIcon,
    label: "Account opening",
    detail: "With an initial deposit and share buy of BDT 50,000.",
    amount: "Free",
    tone: "free",
    hasNote: true,
  },
  {
    icon: CalendarIcon,
    label: "BO opening & renewal",
    detail: "Charged once a year, in June, to keep your account active.",
    amount: "৳150",
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
];

function Card({ icon: Icon, label, detail, amount, tone, hasNote }) {
  const isFree = tone === "free";
  return (
    <div className="group relative flex items-start gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-sm shadow-slate-200/50 transition hover:-translate-y-0.5 hover:shadow-md hover:shadow-slate-200">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          isFree
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
            className={`shrink-0 whitespace-nowrap text-right font-semibold tabular-nums ${
              isFree ? "text-secondary_color" : "text-slate-900"
            }`}
          >
            {amount}
            {hasNote && <span className="text-slate-400">*</span>}
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
          <p className="mx-auto mt-3 max-w-sm text-slate-400">
            Bring your NID, a passport photo, and your initial deposit — the
            rest takes about fifteen minutes.
          </p>
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