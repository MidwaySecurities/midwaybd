"use client";

import { useState } from "react";
import {
  Landmark,
  Home,
  ChevronLeft,
  ChevronRight,
  Menu,
  MessageCircle,
  CreditCard,
  Building2,
  Camera,
  Users,
  ChevronDown,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import Whatsapp from "../components/svgs/WhatsApp";

const badges = ["https://www.sec.gov.bd/storage/layout/yNYeBHuLJm4Bwzhkm4eAhwkxKDq0Ej49a9e4tUuH.png", "https://www.dsebd.org/assets/images/plc-logo.png", "./images/logos/cdbl.png"];

const requirements = [
  { icon: CreditCard, label: "National ID (NID)" },
  { icon: Building2, label: "Bank account" },
  { icon: Camera, label: "Recent photograph" },
  { icon: Users, label: "Nominee information" },
];

const steps = [
  { number: 1, label: "Fill the online form" },
  { number: 2, label: "Upload documents" },
  { number: 3, label: "Verification" },
  { number: 4, label: "BO account is active" },
];

const faqs = [
  {
    id: 1,
    question: "How long does BO account approval take",
    ans: "Most applications are reviewed within 1–2 business days once your NID, bank account, and photo are submitted and verified.",
  },
  {
    id: 2,
    question: "Is there a minimum deposit to open a BO account",
    ans: "No minimum deposit is required to open the account itself — you can fund it whenever you're ready to start trading.",
  },
  {
    id: 3,
    question: "Opening a joint or NRB BO account instead?",
    ans: "Joint and NRB (Non-Resident Bangladeshi) accounts follow a slightly different document checklist. Contact support on WhatsApp and we'll guide you through it.",
  },
];

export default function Page() {
  const [openFaq, setOpenFaq] = useState(null);
  const [questionId, setQuestionId] = useState(null)
  console.log(openFaq)
  return (
    <div className="container mx-auto px-2 lg:px-4">
      {/* Header — mobile */}
      <div className="hidden sm:hidden items-center justify-between px-4 py-3.5 border-b ">
        <div className="flex items-center gap-1.5 text-sm text-black">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
          <span>New investor</span>
        </div>
        <Menu className="h-4 w-4 text-black" strokeWidth={1.75} />
      </div>

      {/* Header — desktop */}
      <div className="hidden items-center justify-between px-6 py-4 border-b border-neutral-800/20">
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4 text-black" strokeWidth={1.75} />
          <span className="text-sm font-medium text-neutral-200">
            Midway Securities
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-black">
          <Home className="h-3.5 w-3.5" strokeWidth={1.75} />
          <span>Home</span>
          <ChevronRight className="h-3 w-3" strokeWidth={2} />
          <span>New investor</span>
        </div>
      </div>

      {/* Hero */}
      <div className="p-0 m-0 px-4 lg:px-8 mx-auto bg-white shadow-xl rounded-t-2xl py-8">
        <div className="pt-5 sm:pt-6 pb-5 sm:pb-6 border-b border-t border-l border-r rounded-t-2xl px-4 border-neutral-800/20">
          <div className="flex items-center gap-2 mb-4 sm:mb-5">
            {badges.map((badge) => (
              // <span
              //   key={badge}
              //   className="px-3 py-1 rounded-full border border-neutral-700 text-[11px] text-black"
              // >
              //   {badge}
              // </span>
              <div className="bg-secondary_color/20 p-2 rounded-full">
                <img src={badge} width={40} height={40} className="min-w-[40px] min-h-[40px]" />
              </div>
            ))}
          </div>

          {/* <p className="hidden sm:block text-xs text-black mb-2">
            New investor
          </p> */}

          <h1 className="text-xl sm:text-2xl font-semibold text-black leading-snug mb-3">
            Open your BO account for ৳150 —{" "}
            <span className="sm:hidden">100% online</span>
            <span className="hidden sm:inline">
              100% online, no
              <br />
              branch visit
            </span>
          </h1>

          <p className="text-sm text-black mb-1 sm:hidden">
            nid, bank account, and a photo. quicktrade pro is free once
            you&apos;re approved.
          </p>
          <p className="hidden sm:block text-sm text-black mb-1">
            Everything you need is a national id, a bank account, and a photo.
          </p>
          <p className="hidden sm:block text-sm text-black mb-5">
            Quicktrade pro is free once you&apos;re approved.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
            <Link href="https://portal.midwaybd.com/bo/portal-login" target="_blank">
              <button className="cursor-pointer w-full sm:w-auto bg-secondary_color text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-secondary_color/80 transition-colors">
                Start BO account application
              </button>
            </Link>
            <Link href="https://wa.me/8801874444816" className="cursor-pointer">
              <button className="flex items-center justify-center sm:justify-start gap-1.5 text-sm text-black hover:text-black/80 transition-colors cursor-pointer">
                {/* <MessageCircle className="h-4 w-4" strokeWidth={1.75} /> */}
                <Whatsapp width={5} height={5} fillColor={'#25D366'} />
                Need help? Chat on Whatsapp
              </button>
            </Link>
          </div>
        </div>

        {/* Requirements */}
        <div className="py-5 sm:py-6 border-b border-l border-r px-4 border-neutral-800/20">
          <p className="text-lg font-semibold text-black mb-3 sm:mb-4">
            What you&apos;ll need
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
            {requirements.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 border border-neutral-800/20 rounded-lg px-4 py-3"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md  sm:bg-transparent">
                  <Icon
                    className="h-4 w-4 text-blue-400 sm:text-black"
                    strokeWidth={1.75}
                  />
                </span>
                <span className="text-sm text-black">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="py-5 sm:py-6 border-b border-r border-l border-neutral-800/20 px-4">
          <p className="text-lg font-semibold text-black mb-4 sm:mb-5">
            How it works
          </p>
          {/* <div className="flex flex-col gap-3 sm:grid sm:grid-cols-4 sm:gap-2 sm:items-start"> */}
          <div className="flex flex-col md:flex-row md:justify-between">
            {steps.map((step) => (
              <div
                key={step.number}
                className="flex sm:flex-col items-center sm:items-center gap-3 sm:gap-2.5 mb-2 lg:mb-0"
              >
                <div className="h-6 sm:h-8 w-6 sm:w-8 md:w-12 md:h-12 lg:h-20 lg:w-20 shrink-0 rounded-full bg-secondary_color flex items-center justify-center text-xs lg:text-lg font-medium text-white">
                  {step.number}
                </div>
                <span className="text-sm sm:text-sm text-black sm:text-black leading-snug">
                  {step.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="py-5 sm:py-6 border-b border-l border-r px-4 border-neutral-800/20">
          <p className="text-lg font-semibold text-black mb-3 sm:mb-4">
            Common questions
          </p>
          <div className="flex flex-col gap-2">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.question;
              return (
                <div
                  key={faq.question}
                  className="border border-neutral-800/20 rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setOpenFaq(isOpen ? null : faq.question)
                      setQuestionId(faq.id)
                    }}
                    aria-expanded={isOpen}
                    className={`text-black w-full flex items-center justify-between px-4 py-3 text-left hover:bg-primary_color hover:text-white transition-colors ${faq.id === questionId ? 'bg-primary_color text-white' : ''}`}
                  >
                    <span className={`text-sm `}>
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-neutral-500 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        } ${faq.id === questionId ? 'text-white' : ''}`}
                      strokeWidth={1.75}
                    />
                  </button>
                  <div
                    className={`grid transition-all duration-200 ease-in-out ${isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                      }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-4 py-3 text-sm text-neutral-500 leading-relaxed">
                        {faq.ans}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 border border-t-0 border-b rounded-b-2xl border-neutral-800/20">
          <div className="hidden sm:flex items-center justify-between">
            <span className="text-sm text-black">
              Ready when you are.
            </span>
            <Link href={`https://portal.midwaybd.com/bo/portal-login`} target="_blank">
              <button className="cursor-pointer bg-secondary_color text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-secondary_color/80 transition-colors">
                Start BO account application
              </button>
            </Link>
          </div>
          <Link href = "https://portal.midwaybd.com/bo/portal-login" target="_blank">
            <button className="sm:hidden w-full bg-secondary_color text-white text-sm font-medium px-5 py-2.5 rounded-lg hover:bg-secondary_color/80 transition-colors">
              Start BO account application
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}