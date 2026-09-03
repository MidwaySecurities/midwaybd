import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Architects_Daughter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

// ─── Type tokens ───────────────────────────────────────────────────────────
// Display face — a serif with the gravitas of an old brokerage ledger.
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--",
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
// Signature accent — hand-marked headline, used once, sparingly.
const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects-daughter",
});

export const metadata = {
  title: "About Us | Midway Securities Ltd.",
  description:
    "Midway Securities Ltd. (TREC 142) has been a part of Bangladesh's Capital Market since 1975, offering brokerage services through the Dhaka Stock Exchange.",
};

// ── Registration seal — the certificate motif, used in the regulatory block ─
function LedgerSeal({ className = "" }) {
  const ring = "#003875";
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
        fontFamily="var(--)"
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

// ── MD portrait — framed like a document photograph, not a headshot card ──
function Portrait({ className = "" }) {
  return (
    <div
      className={`relative overflow-hidden border border-brass/40 bg-ledger-navy-deep/40 ${className}`}
    >
      <Image
        src="/md-ashequr-rahman-photo-2.jpeg"
        width={352}
        height={448}
        alt="Md. Ashequr Rahman, Managing Director of Midway Securities Ltd."
        className="h-full w-full object-cover grayscale-[15%]"
        priority
      />
      <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-brass/20" />
    </div>
  );
}

// ── Regulatory credentials — sourced once, rendered as a definition list ──
const credentials = [
  { label: "BSEC Reg.", value: "3.1/DSE-142/2008/194" },
  { label: "DSE TREC", value: "142" },
  { label: "TREC Code", value: "DSERAK" },
  { label: "CDBL A/C No.", value: "CDBL-DP-36" },
];

export default function AboutUsPage() {
  return (
    <div
      className={`${fraunces.variable} ${plexSans.variable} ${plexMono.variable} font-body bg-paper text-ink`}
    >
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-primary_color text-white">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-10 sm:pt-28 sm:pb-20">
          <p className="font-mono text-md tracking-[0.35em] text-brass uppercase">
            Midway Securities Ltd. — Since 1975
          </p>
          <h1
            className={`${architectsDaughter.className} mt-6 max-w-3xl text-3xl leading-[1.05] tracking-wide sm:text-7xl`}
          >
            Investing,
            <span className="text-brass"> simplified.</span>
          </h1>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-paper/80 sm:text-base">
            A registered stock brokerage firm of the Dhaka Stock Exchange
            PLC. (TREC 142), trusted by investors.
          </p>
        </div>
      </section>

      {/* ── NARRATIVE ────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-6xl px-6 py-8 lg:py-20 sm:px-10 sm:py-20">
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
              solutions. With a team of experienced professionals and a deep
              understanding of local and global markets, we offer a
              comprehensive range of brokerage services tailored to your
              unique investment needs — whether you are an individual
              investor, a corporate entity, or an institutional client.
            </p>
            <p>
              We prioritize transparency, integrity, and personalized
              attention, giving you the tools, insights, and guidance to
              make informed investment decisions that align with your risk
              profile and financial aspirations.
            </p>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP — portrait, quote, and bio as one story ─────────── */}
      <section className="bg-ledger-navy text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
          <div className="mt-8 grid gap-10 sm:grid-cols-[224px_1fr] sm:gap-14">
            <div>
              <Portrait className="h-56 w-44" />
              <h2 className="mt-5  text-2xl leading-tight text-paper sm:text-3xl">
                Md. Ashequr Rahman
              </h2>
              <p className="mt-1 text-sm text-paper/60">Managing Director</p>
            </div>

            <div>
              <p className=" text-2xl italic leading-snug sm:text-3xl">
                &ldquo;Discipline, patience and a clear, realistic investment
                goal are necessary for any investor, new or veteran.&rdquo;
              </p>
              <p className="mt-3 text-base leading-relaxed text-paper/70">
                শৃঙ্খলা, ধৈর্য, একটি স্পষ্ট ও বাস্তবসম্মত বিনিয়োগের লক্ষ্য
                যেকোন বিনিয়োগকারীর জন্য অপরিহার্য, হোক সে নতুন বা অভিজ্ঞ।
              </p>

              <div className="mt-8 h-px w-16 bg-brass/50" />

              <p className="mt-8 text-[15px] leading-relaxed text-paper/80 sm:text-base">
                Midway Securities Ltd. is dedicated to providing the best
                customer service to our clients. Your orders are always
                executed promptly and with due diligence. Our highly
                experienced staff members are available to educate you on
                your investment potential and needs in the capital market,
                whether you are new or a veteran. We are a business that
                puts the client&rsquo;s needs first above all else,
                discussing one-on-one how to expand your portfolio. We
                believe in investing in the right securities — through
                fundamental and technical analysis — and this approach has
                served our clients well over the decades.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA — the invitation, set apart from the bio above ── */}
      <section className="mx-auto max-w-6xl px-6 py-20 sm:px-10 sm:py-24">
        <div className="border-l-2 border-brass pl-8 sm:pl-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ledger-green">
            Get Started
          </p>
          <p className="mt-5 max-w-2xl  text-2xl leading-snug text-ledger-navy sm:text-3xl">
            Join us on this exciting journey of simplified investing.
          </p>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/75 sm:text-base">
            Explore our website to learn more about our services, market
            insights, and how we can help you unlock the potential of your
            investments.
          </p>
          <Link
            href="/client-services"
            className="mt-7 inline-flex items-center gap-2 font-mono text-sm tracking-[0.1em] text-ledger-green underline decoration-ledger-green/40 underline-offset-4 hover:text-ledger-navy"
          >
            Explore our services →
          </Link>
        </div>
      </section>

      {/* ── REGULATORY / REGISTRATION — certificate block ───────────── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 sm:px-10 sm:pb-28">
        <div className="grid gap-10 rounded-sm border border-dashed border-brass/60 bg-ledger-navy px-8 py-10 text-paper sm:grid-cols-[auto_1fr] sm:items-center sm:gap-14 sm:px-14 sm:py-14">
          <LedgerSeal className="h-32 w-32 shrink-0 sm:h-40 sm:w-40" />

          <div>
            <p className="text-[11px] tracking-[0.3em] text-brass uppercase">
              Regulatory Standing
            </p>
            <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-paper/80">
              Midway Securities Ltd. is a full-service brokerage house and a member of the Dhaka Stock Exchange (DSE). We are also an authorized Depository Participant (DP) of Central Depository Bangladesh Limited (CDBL) and are regulated by the Bangladesh Securities and Exchange Commission (BSEC), Government of the People’s Republic of Bangladesh.
            </p>
            <dl className="mt-10 grid gap-x-8 gap-y-6 font-mono text-sm sm:grid-cols-4">
              {credentials.map((c) => (
                <div key={c.label}>
                  <dt className="text-[11px] tracking-[0.2em] text-brass uppercase">
                    {c.label}
                  </dt>
                  <dd className="mt-1">{c.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </div>
  );
}