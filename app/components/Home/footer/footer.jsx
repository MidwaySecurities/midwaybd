'use client'
import { useState } from "react";
import defaultContent from "./footer-content.json";
import { Icon } from "./icons";
import Link from "next/link";

const muted = "text-[#a8b3c5]";
const line = "border-[#1f2a3d]";
const ext = { target: "_blank", rel: "noopener noreferrer" };

import { Architects_Daughter } from "next/font/google";
const architectsDaughter = Architects_Daughter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-architects-daughter",
});

function Group({ g, open, onToggle }) {
  return (
    <div className={"border-b md:border-0 " + line}>
      <button type="button" aria-expanded={open} onClick={onToggle}
        className="flex w-full items-center justify-between py-3.5 text-left md:pointer-events-none md:py-0">
        <span className="text-[14px] font-semibold text-white md:text-[15px]">{g.title}</span>
        <span className={"text-[#a8b3c5] md:hidden " + (open ? "rotate-180" : "")}><Icon name="chevron" className="h-5 w-5" /></span>
      </button>
      <ul className={(open ? "block" : "hidden") + " pb-3 md:mt-3 md:block md:pb-0"}>
        {g.links.map((l) => (
          <li key={l.label}><Link href={l.href} target="_blank" className={"block py-1.5 text-[14px] " + muted}>{l.label}</Link></li>
        ))}
      </ul>
    </div>
  );
}

function ContactRow({ icon, label, children, href, external }) {
  const inner = (
    <>
      <span className="mt-0.5 text-[#fad870]"><Icon name={icon} className="h-5 w-5" /></span>
      <span>
        <span className={"block text-[12px] " + muted}>{label}</span>
        <span className="block text-[14px] font-semibold text-white">{children}</span>
      </span>
    </>
  );
  return href ? (
    <Link href={href} {...(external ? ext : {})} className="flex gap-3 py-1">{inner}</Link>
  ) : (
    <div className="flex gap-3 py-1">{inner}</div>
  );
}

export default function SiteFooter({ content = defaultContent }) {
  const { links, brand, registration, groups, contact, social, legal } = content;
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <footer className="bg-[#0b1220] text-white">
      <div className="mx-auto max-w-6xl lg:container px-4 md:px-10">
        {/* Registration */}
        <div className={"border-b py-5 md:py-6 " + line}>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-[#fad870]">{registration.title}</p>
          <ul className="mt-3 grid gap-3 md:grid-cols-3 md:gap-6">
            {registration.items.map((r) => (
              <li key={r.label}>
                <Link href={r.href} {...ext} className="flex items-start gap-3">
                  <span className="mt-0.5 text-[#fad870]"><Icon name="shield" className="h-5 w-5" /></span>
                  <span>
                    <span className={"block text-[12px] " + muted}>{r.label}</span>
                    <span className="block text-[14px] font-semibold">{r.value}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand + link groups */}
        <div className="py-6 md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] md:gap-6 md:py-10">
          <div className="mb-4 md:mb-0">
            <Link href={links.home} className="block text-[20px] font-semibold">{brand.name}</Link>
            <p className= {`mt-2 text-[24px] leading-tight text-[#fad870] ${architectsDaughter.className} `}>{brand.tagline}</p>
            <Link href={links.openBo} target="_blank" className="mt-4 block rounded-lg bg-[#fad870] px-5 py-3 text-center text-[14px] font-semibold text-[#0b1220] md:max-w-[200px]">{brand.openBo}</Link>
          </div>
          {groups.map((g, i) => (
            <Group key={g.title} g={g} open={openIdx === i} onToggle={() => setOpenIdx(openIdx === i ? -1 : i)} />
          ))}
        </div>

        {/* Contact + address + social */}
        <div className={"border-t py-6 md:grid md:grid-cols-[1.4fr_1fr_1fr_1fr] md:gap-8 md:py-8 " + line}>
          <div>
            <p className="text-[15px] font-semibold">{contact.title}</p>
            <div className="mt-3 grid gap-1">
              <ContactRow icon="phone" label={contact.hotlineLabel} href={contact.hotlineHref}>{contact.hotline}</ContactRow>
              <ContactRow icon="mail" label={contact.emailLabel} href={"mailto:" + contact.email}>{contact.email}</ContactRow>
              <ContactRow icon="whatsapp" label={contact.whatsappLabel} href={links.whatsapp} external>{contact.whatsapp}</ContactRow>
              <ContactRow icon="clock" label={contact.hoursLabel}>{contact.hours}</ContactRow>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <Link href={links.maps} {...ext} className="flex gap-3" aria-label={contact.mapsHint}>
              <span className="mt-0.5 text-[#fad870]"><Icon name="pin" className="h-5 w-5" /></span>
              <span>
                <span className={"block text-[12px] " + muted}>{contact.addressLabel}</span>
                <span className="block text-[14px] font-semibold not-italic leading-relaxed">
                  {contact.address.map((a) => <span key={a} className="block">{a}</span>)}
                </span>
                <span className="mt-1 block text-[13px] font-semibold text-[#1da1f2]">{contact.mapsHint} ↗</span>
              </span>
            </Link>
            <Link href={links.branches} style={{ marginLeft: 32 }} className="mt-1 inline-block text-[14px] font-semibold text-[#fad870]">{contact.branchesLabel} →</Link>
          </div>
          <div className="mt-6 md:mt-0">
            <p className="text-[15px] font-semibold">{social.title}</p>
            <p className={"mt-1 text-[12px] " + muted}>{social.note}</p>
            <ul className="mt-3 flex gap-3">
              {social.items.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} {...ext} aria-label={s.label} className={"flex h-10 w-10 items-center justify-center rounded-full border text-white " + line}>
                    <Icon name={s.icon} className="h-5 w-5" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal */}
        <div className={"flex flex-col gap-2 border-t py-5 text-[13px] md:flex-row md:items-center md:justify-between " + line}>
          <p className={muted}>{legal.copyright}</p>
          <ul className="flex gap-5">
            {legal.links.map((l) => (<li key={l.label}><Link href={l.href} className={muted}>{l.label}</Link></li>))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
