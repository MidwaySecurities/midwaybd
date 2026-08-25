import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Architects_Daughter } from "next/font/google";

// ─── Type tokens ───────────────────────────────────────────────────────────
// Display face — a serif with the gravitas of an old brokerage ledger.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
// Body face — clean, document-like.
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});
// Data/code face — for registration numbers, TREC codes, tickers.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

export const metadata = {
  title: "About Us | Midway Securities Ltd.",
  description:
    "Midway Securities Ltd. (TREC 142) has been a part of Bangladesh's Capital Market since 1975, offering brokerage services through the Dhaka Stock Exchange.",
};
const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects-daughter",
});
// Color + type tokens live in tailwind.config.js:
//   ledger-navy #0F2B3D · ledger-navy-deep #0B2230 · paper #F1ECDD
//   ledger-green #21634A · brass #B98A3E · ink #17191C · ink-soft #55606A
//   font-display / font-body / font-mono

function LedgerSeal({ className = "", tone = "brass" }) {
  const ring = tone === "brass" ? "#B98A3E" : "#F1ECDD";
  return (
    <svg viewBox="0 0 160 160" className={className} aria-hidden="true">
      <circle
        cx="80"
        cy="80"
        r="74"
        fill="none"
        stroke={ring}
        strokeWidth="1.5"
        strokeDasharray="2 5"
      />
      <circle cx="80" cy="80" r="62" fill="none" stroke={ring} strokeWidth="1" />
      <text
        x="80"
        y="66"
        textAnchor="middle"
        fill={ring}
        fontFamily="var(--font-mono)"
        fontSize="11"
        letterSpacing="2"
      >
        DSE · TREC
      </text>
      <text
        x="80"
        y="92"
        textAnchor="middle"
        fill={ring}
        fontFamily="var(--font-display)"
        fontSize="30"
        fontWeight="600"
      >
        142
      </text>
      <text
        x="80"
        y="112"
        textAnchor="middle"
        fill={ring}
        fontFamily="var(--font-mono)"
        fontSize="10"
        letterSpacing="3"
      >
        EST. 1975
      </text>
    </svg>
  );
}

const tickerItems = [
  "DSE MEMBER · TREC 142",
  "EST. 1975",
  "CDBL DEPOSITORY PARTICIPANT",
  "REGULATED BY BSEC",
  "50 YEARS IN THE CAPITAL MARKET",
];

export default function AboutUsPage() {
  return (
    <div
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} font-body bg-paper text-ink`}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-ledger-navy text-paper bg-[#004990] text-white">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-16 sm:pb-20">
          {/* <p className="font-mono text-[11px] tracking-[0.35em] text-brass uppercase">
            About Midway Securities Ltd. — Since 1975
          </p> */}
          <h1 className={`${architectsDaughter.className} mt-6 max-w-3xl text-3xl tracking-wide leading-[1.05] sm:text-7xl`}>
            Investing,
            <span className="italic text-brass">simplified.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-paper/80 sm:text-base">
            A registered stock brokerage firm of the Dhaka Stock Exchange
            PLC. (TREC 142), trusted by investors across Bangladesh for
            five decades — from first-time traders to institutional
            clients.
          </p>
        </div>

        {/* Ticker rail — the stock-floor detail carried through the page */}
        {/* <div className="relative border-t border-paper/15 bg-ledger-navy-deep">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-10 gap-y-3 px-6 py-4 text-[11px] tracking-[0.15em] text-brass sm:px-10">
            {tickerItems.map((item) => (
              <span key={item} className="whitespace-nowrap">
                {item}
              </span>
            ))}
          </div>
        </div> */}
      </section>

      {/* ── NARRATIVE ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
          <div>
            <h2 className="text-3xl leading-tight text-ledger-navy sm:text-4xl">
              Fifty years of steady, disciplined guidance.
            </h2>
            <div className="mt-6 h-px w-16 bg-brass" />
          </div>
          <div className="space-y-6 text-[15px] leading-relaxed text-ink/85 sm:text-base">
            <p>
              Welcome to Midway Securities Ltd., your trusted partner in
              navigating the world of investments. As a registered stock
              brokerage firm of the Dhaka Stock Exchange PLC. (TREC 142)
              since 1975, we specialize in making investing simple and
              accessible for everyone.
            </p>
            <p>
              Our motto, &ldquo;Investing, Simplified!&rdquo; reflects our
              commitment to providing clear, accessible investment
              solutions. With a team of experienced professionals and a
              deep understanding of local and global markets, we offer a
              comprehensive range of brokerage services tailored to your
              unique investment needs — whether you are an individual
              investor, a corporate entity, or an institutional client.
            </p>
            <p>
              We prioritize transparency, integrity, and personalized
              attention, giving you the tools, insights, and guidance to
              make informed investment decisions that align with your
              risk profile and financial aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* ── MD QUOTE — styled as a signed citation ──────────────────── */}
      <section className="bg-ledger-navy text-paper">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14 sm:px-10 sm:py-24">
          <LedgerSeal className="h-32 w-32 shrink-0 sm:h-40 sm:w-40" />
          <div>
            <p className="font-display text-2xl italic leading-snug sm:text-3xl">
              &ldquo;Discipline, patience and a clear, realistic investment
              goal are necessary for any investor, new or veteran.&rdquo;
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-paper/70">
              শৃঙ্খলা, ধৈর্য, একটি স্পষ্ট ও বাস্তবসম্মত বিনিয়োগের লক্ষ্য
              যেকোন বিনিয়োগকারীর জন্য অপরিহার্য, হোক সে নতুন বা অভিজ্ঞ।
            </p>
            <p className="mt-6 font-mono text-[11px] tracking-[0.2em] text-brass uppercase">
              Md. Ashequr Rahman — Managing Director, Midway Securities Ltd.
            </p>
          </div>
        </div>
      </section>

      {/* ── MANAGING DIRECTOR BIO ───────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-28">
        <div className="grid gap-12 sm:grid-cols-[1fr_1.4fr] sm:gap-16">
          <div>
            <p className="font-mono text-[11px] tracking-[0.3em] text-ledger-green uppercase">
              Leadership
            </p>
            <h2 className="mt-4 font-display text-3xl leading-tight text-ledger-navy sm:text-4xl">
              Md. Ashequr Rahman
            </h2>
            <p className="mt-2 text-sm text-ink-soft">Managing Director</p>
          </div>
          <p className="text-[15px] leading-relaxed text-ink/85 sm:text-base">
            Midway Securities Ltd. is dedicated to providing the best
            customer service to our clients. Your orders are always
            executed promptly and with due diligence. Our highly
            experienced staff members are available to educate you on
            your investment potential and needs in the capital market,
            whether you are new or a veteran. We are a business that puts
            the client&rsquo;s needs first above all else, discussing
            one-on-one how to expand your portfolio. We believe in
            investing in the right securities — through fundamental and
            technical analysis — and this approach has served our clients
            well over the decades.
          </p>
        </div>
      </section>

      {/* ── REGULATORY / REGISTRATION — certificate block ───────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10 sm:pb-28">
        <div className="rounded-sm border border-dashed border-brass/60 bg-ledger-navy px-8 py-10 text-paper sm:px-14 sm:py-14">
          <p className="font-mono text-[11px] tracking-[0.3em] text-brass uppercase">
            Regulatory Standing
          </p>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper/80">
            Midway Securities Ltd. is a full-service depository
            participant of Central Depository Bangladesh Limited (CDBL)
            and is authorized and regulated by the Bangladesh Securities
            and Exchange Commission (BSEC), Government of the People&rsquo;s
            Republic of Bangladesh.
          </p>
          <dl className="mt-10 grid gap-x-8 gap-y-6 font-mono text-sm sm:grid-cols-4">
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-brass uppercase">
                BSEC Reg.
              </dt>
              <dd className="mt-1">3.1/DSE-142/2008/194</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-brass uppercase">
                DSE TREC
              </dt>
              <dd className="mt-1">142</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-brass uppercase">
                TREC Code
              </dt>
              <dd className="mt-1">DSERAK</dd>
            </div>
            <div>
              <dt className="text-[11px] tracking-[0.2em] text-brass uppercase">
                CDBL A/C No.
              </dt>
              <dd className="mt-1">CDBL-DP-36</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ── LOCATION / CONTACT STRIP ─────────────────────────────────── */}
      <section className="border-t border-ledger-navy/10 bg-paper">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center sm:px-10">
          <div>
            <p className="font-display text-lg text-ledger-navy">
              Dhaka Stock Exchange Building
            </p>
            <p className="mt-1 text-sm text-ink-soft">
              Room No. 508, 9th Floor, Motijheel C/A, Dhaka 1000
            </p>
          </div>
          <a
            href="tel:09609100142"
            className="font-mono text-sm tracking-[0.1em] text-ledger-green underline decoration-ledger-green/40 underline-offset-4 hover:text-ledger-navy"
          >
            Hotline: 09609 100 142
          </a>
        </div>
      </section>
    </div>
  );
}