"use client";

import { useEffect, useState } from "react";
import { Poppins, Roboto } from "next/font/google";
import Swal from "sweetalert2";
import { data } from "autoprefixer";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const axios = require("axios");

const PRIMARY = "#1a3a5c";
const ACCENT = "#c9a94a";
const LIGHT_BG = "#f7f5f0";
const WHITE = "#ffffff";
const BORDER = "#ddd8cc";
const TEXT = "#1e1e1e";
const MUTED = "#6b6b6b";
const SUCCESS_BG = "#eaf6f1";
const SUCCESS_BORDER = "#2e9e6e";

const inputStyle = {
  width: "100%",
  padding: "12px 14px",
  border: `1.5px solid ${BORDER}`,
  borderRadius: 8,
  fontSize: 15,
  color: TEXT,
  background: WHITE,
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "inherit",
  transition: "border-color 0.2s",
};

const labelStyle = {
  display: "block",
  fontSize: 13,
  fontWeight: 600,
  color: PRIMARY,
  marginBottom: 6,
  letterSpacing: "0.02em",
  textTransform: "uppercase",
};

const fieldStyle = { marginBottom: 18 };
export default function WithdrawClient() {
  const [step, setStep] = useState("check"); // "check" | "portal" | "form" | "success"
  const [portalData, setPortalData] = useState({ client_code: "", password: "", amount: "" });
  const [formData, setFormData] = useState({
    client_name: "", client_code: "", amount: "", email: "", phone_number: "", remarks: "", signature:"",
  });
  const [ledgerBalance, setLedgerBalance] = useState(null)
  useEffect(() => {
    if (!portalData.client_code || !portalData.password) {
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_PORTAL_URL}/check-ledger/${portalData.client_code}/${portalData.password}`
        );

        console.log(response.data);
        setLedgerBalance(response.data['ledger_balance'])
      } catch (error) {
        console.error("Error checking ledger:", error);
        setLedgerBalance(null)
      }
    }, 400);

    return () => {
      clearTimeout(timer);
    };
  }, [portalData.client_code, portalData.password]);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const getFocusStyle = (field) =>
    focusedField === field ? { borderColor: ACCENT, boxShadow: `0 0 0 3px ${ACCENT}22` } : {};

  const validatePortal = () => {
    const e = {};
    if (!portalData.client_code.trim()) e.client_code = "Client code is required";
    if (!portalData.password.trim()) e.password = "Password is required";
    if (!portalData.amount || isNaN(Number(portalData.amount)) || Number(portalData.amount) <= 0)
      e.amount = "Enter a valid amount";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateForm = () => {
    const e = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.client_code.trim()) e.client_code = "Client code is required";
    if (!formData.amount || isNaN(Number(formData.amount)) || Number(formData.amount) <= 0)
      e.amount = "Enter a valid amount";
    if (!formData.phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePortalSubmit = async () => {
    if (!validatePortal()) return;
    setSubmitting(true);
    try {
      const { data } = await axios.post(
        "https://midway-wip.tanbinislam.com/api/web/withdraw/request",
        { ...portalData }
      );

      if (data.status === "success") {
        setStep("success");
      } else {
        Swal.fire({
          icon: "error",
          title: "Withdrawal Failed",
          text: data.message || "An error occurred. Please try again.",
          confirmButtonColor: PRIMARY,
        });
        setErrors({ form: data.message || "An error occurred. Please try again." });
      }
    } catch (error) {
      console.error("Withdrawal submit error:", error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text:
          error?.response?.data?.message ||
          "Could not submit your withdrawal request. Please check your connection and try again.",
        confirmButtonColor: PRIMARY,
      });
      setErrors({ form: "Failed to submit withdrawal request." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = async() => {
    console.log(formData)
    const data = await axios.post(`${process.env.NEXT_PUBLIC_PORTAL_URL}/web/withdraw/manual/request`, {
      data: formData
    })
    console.log(data)
    return;
    if (!validateForm()) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setStep("success"); }, 1500);
  };

  const resetAll = () => {
    setStep("check");
    setPortalData({ client_code: "", password: "", amount: "" });
    setFormData({ client_name: "", client_code: "", amount: "", email: "", phone_number: "", remarks: "" });
    setErrors({});
  };

  return (
    <div style={{ minHeight: "100vh", background: LIGHT_BG }}>
      <main id="main-content" style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 60px" }}>

        <header style={{ marginBottom: 36, textAlign: "center" }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: PRIMARY, margin: "0 0 8px", letterSpacing: "-0.01em" }}>
            Withdraw Funds — টাকা উত্তোলন
          </h1>
          <p style={{ color: MUTED, fontSize: 15, margin: 0 }}>
            Withdraw directly to your bank account via{" "}
            <abbr title="Bangladesh Electronic Fund Transfer Network">BEFTN</abbr>{" "}
            — Bangladesh Bank approved &amp; secure
          </p>
        </header>

        {step === "check" && (
          <section aria-label="Choose withdrawal method">
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, maxWidth: 640, margin: "0 auto" }}>
              <MethodCard
                icon={<LockIcon />}
                title="I have a portal account"
                subtitle="Use your Midway portal password to withdraw instantly"
                onClick={() => setStep("portal")}
              />
              <MethodCard
                icon={<FormIcon />}
                title="No portal account"
                subtitle="Fill out the withdrawal form and we'll process it manually"
                onClick={() => setStep("form")}
              />
            </div>

            <section aria-labelledby="faq-heading" style={{ maxWidth: 640, margin: "48px auto 0" }}>
              <h2 id="faq-heading" style={{ fontSize: 16, fontWeight: 700, color: PRIMARY, marginBottom: 16, letterSpacing: "0.04em", textTransform: "uppercase" }}>
                Frequently Asked Questions
              </h2>
              <dl style={{ margin: 0 }}>
                {faqs.map((faq, i) => (
                  <FaqItem key={i} question={faq.q} answer={faq.a} />
                ))}
              </dl>
            </section>
          </section>
        )}

        {step === "portal" && (
          <section aria-label="Portal withdrawal form">
            <FormCard title="Quick Withdrawal" subtitle="Authenticated via Midway Portal">
              <div style={fieldStyle}>
                <label htmlFor="portal-client_code" style={labelStyle}>Client Code</label>
                <input
                  id="portal-client_code"
                  name="client_code"
                  autoComplete="username"
                  style={{ ...inputStyle, ...getFocusStyle("client_code") }}
                  placeholder="e.g. MSL-00123"
                  value={portalData.client_code}
                  onChange={(e) => setPortalData((p) => ({ ...p, client_code: e.target.value }))}
                  onFocus={() => setFocusedField("client_code")}
                  onBlur={() => setFocusedField(null)}
                  aria-describedby={errors.client_code ? "err-client_code" : undefined}
                  aria-invalid={!!errors.client_code}
                />
                {errors.client_code && <ErrorMsg id="err-client_code">{errors.client_code}</ErrorMsg>}
              </div>
              <div style={fieldStyle}>
                <label htmlFor="portal-password" style={labelStyle}>Portal Password</label>
                <input
                  id="portal-password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  style={{ ...inputStyle, ...getFocusStyle("password") }}
                  placeholder="Your portal password"
                  value={portalData.password}
                  onChange={(e) => setPortalData((p) => ({ ...p, password: e.target.value }))}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField(null)}
                  aria-describedby={errors.password ? "err-password" : undefined}
                  aria-invalid={!!errors.password}
                />
                {errors.password && <ErrorMsg id="err-password">{errors.password}</ErrorMsg>}
              </div>
              {ledgerBalance !== null ? <div className={`mb-5 font-bold ${ledgerBalance > 0 ? 'text-green-500' : 'text-red-500'}`}>Your ledger balance is {ledgerBalance}</div> : ''}
              <div style={fieldStyle}>
                <label htmlFor="portal-amount" style={labelStyle}>Withdrawal Amount (৳)</label>
                <input
                  id="portal-amount"
                  name="amount"
                  inputMode="numeric"
                  style={{ ...inputStyle, ...getFocusStyle("amount") }}
                  placeholder="e.g. 10000"
                  value={portalData.amount}
                  onChange={(e) => setPortalData((p) => ({ ...p, amount: e.target.value }))}
                  onFocus={() => setFocusedField("amount")}
                  onBlur={() => setFocusedField(null)}
                  aria-describedby={errors.amount ? "err-amount" : undefined}
                  aria-invalid={!!errors.amount}
                />
                {errors.amount && <ErrorMsg id="err-amount">{errors.amount}</ErrorMsg>}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <BackButton onClick={() => { setStep("check"); setErrors({}); }} />
                <SubmitButton ledgerBalance={ledgerBalance} onClick={handlePortalSubmit} loading={submitting}>
                  {submitting ? "Processing…" : "Submit Withdrawal"}
                </SubmitButton>
              </div>
              <p style={{ marginTop: 16, fontSize: 13, color: MUTED }}>
                Don't have a portal account?{" "}
                <button
                  onClick={() => { setStep("form"); setErrors({}); }}
                  style={{ color: ACCENT, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13, padding: 0 }}
                >
                  Use the manual form →
                </button>
              </p>
            </FormCard>
          </section>
        )}

        {/* ── Step: Manual form ── */}
        {step === "form" && (
          <section aria-label="Manual withdrawal request form">
            <FormCard title="Fund Withdrawal Request" subtitle="BEFTN Transfer — Manual Form">
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 20px" }}>
                <div style={fieldStyle}>
                  <label htmlFor="f-name" style={labelStyle}>Full Name / নাম *</label>
                  <input
                    id="f-name" name="client_name" autoComplete="client_name"
                    style={{ ...inputStyle, ...getFocusStyle("name") }}
                    placeholder="Your full name"
                    value={formData.client_name}
                    onChange={(e) => setFormData((p) => ({ ...p, client_name: e.target.value }))}
                    onFocus={() => setFocusedField("client_name")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    aria-invalid={!!errors.client_name}
                  />
                  {errors.name && <ErrorMsg>{errors.client_name}</ErrorMsg>}
                </div>
                <div style={fieldStyle}>
                  <label htmlFor="f-client_code" style={labelStyle}>Client Code / ক্লায়েন্ট কোড *</label>
                  <input
                    id="f-client_code" name="client_code"
                    style={{ ...inputStyle, ...getFocusStyle("fclient_code") }}
                    placeholder="e.g. MSL-00123"
                    value={formData.client_code}
                    onChange={(e) => setFormData((p) => ({ ...p, client_code: e.target.value }))}
                    onFocus={() => setFocusedField("fclient_code")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    aria-invalid={!!errors.client_code}
                  />
                  {errors.client_code && <ErrorMsg>{errors.client_code}</ErrorMsg>}
                </div>
                <div style={fieldStyle}>
                  <label htmlFor="f-amount" style={labelStyle}>Amount / টাকা (৳) *</label>
                  <input
                    id="f-amount" name="amount" inputMode="numeric"
                    style={{ ...inputStyle, ...getFocusStyle("fAmount") }}
                    placeholder="e.g. 10000"
                    value={formData.amount}
                    onChange={(e) => setFormData((p) => ({ ...p, amount: e.target.value }))}
                    onFocus={() => setFocusedField("fAmount")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    aria-invalid={!!errors.amount}
                  />
                  {errors.amount && <ErrorMsg>{errors.amount}</ErrorMsg>}
                </div>
                <div style={fieldStyle}>
                  <label htmlFor="f-phone" style={labelStyle}>Phone / ফোন নম্বর *</label>
                  <input
                    id="f-phone" name="phone" type="tel" autoComplete="tel"
                    style={{ ...inputStyle, ...getFocusStyle("phone") }}
                    placeholder="+880 17XXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    aria-required="true"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <ErrorMsg>{errors.phone}</ErrorMsg>}
                </div>
                <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                  <label htmlFor="f-email" style={labelStyle}>Email / ই-মেইল</label>
                  <input
                    id="f-email" name="email" type="email" autoComplete="email"
                    style={{ ...inputStyle, ...getFocusStyle("email") }}
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                  <label htmlFor="f-email" style={labelStyle}>Your Signature</label>
                  <input
                    type = {'file'}
                    id="f-email" name="signature" autoComplete="signature"
                    style={{ ...inputStyle }}
                    // value={formData.signature}
                    onChange={(e) => setFormData((p) => ({ ...p, signature: e.target.files[0] }))}
                    onFocus={() => setFocusedField("signature")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
                <div style={{ ...fieldStyle, gridColumn: "1 / -1" }}>
                  <label htmlFor="f-comment" style={labelStyle}>Comment (optional)</label>
                  <textarea
                    id="f-comment" name="comment"
                    style={{ ...inputStyle, height: 80, resize: "vertical", ...getFocusStyle("comment") }}
                    placeholder="Any additional instructions…"
                    value={formData.comment}
                    onChange={(e) => setFormData((p) => ({ ...p, remarks: e.target.value }))}
                    onFocus={() => setFocusedField("comment")}
                    onBlur={() => setFocusedField(null)}
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                <BackButton onClick={() => { setStep("check"); setErrors({}); }} />
                <SubmitButton onClick={handleFormSubmit} loading={submitting} type = "manual">
                  {submitting ? "Submitting…" : "Submit Request"}
                </SubmitButton>
              </div>
            </FormCard>
          </section>
        )}

        {/* ── Step: Success ── */}
        {step === "success" && (
          <section aria-live="polite" aria-label="Withdrawal request confirmed" style={{
            maxWidth: 520, margin: "0 auto",
            background: WHITE, borderRadius: 16,
            border: `1.5px solid ${SUCCESS_BORDER}`,
            padding: "40px 36px", textAlign: "center",
          }}>
            <div style={{
              width: 64, height: 64, borderRadius: "50%",
              background: SUCCESS_BG, border: `2px solid ${SUCCESS_BORDER}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              margin: "0 auto 20px",
            }}>
              <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={SUCCESS_BORDER} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h2 style={{ color: PRIMARY, fontSize: 22, margin: "0 0 10px", fontWeight: 700 }}>Request Submitted</h2>
            <p style={{ color: MUTED, fontSize: 15, margin: "0 0 24px", lineHeight: 1.6 }}>
              Your withdrawal request has been received. Funds will be transferred directly to your registered bank account via BEFTN within 1–3 business days.
            </p>
            <p style={{ color: MUTED, fontSize: 13, margin: "0 0 28px" }}>
              Need help? Call us at{" "}
              <a href="tel:09609100142" style={{ color: PRIMARY, fontWeight: 600 }}>09609 100 142</a>
            </p>
            <button onClick={resetAll} style={{
              background: PRIMARY, color: WHITE, border: "none", borderRadius: 8,
              padding: "12px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
            }}>
              New Withdrawal
            </button>
          </section>
        )}

        {/* ── Info strip ── */}
        {step !== "success" && (
          <aside aria-label="BEFTN withdrawal information" style={{
            maxWidth: 640, margin: "40px auto 0",
            background: `${PRIMARY}0a`, border: `1px solid ${PRIMARY}22`,
            borderRadius: 10, padding: "16px 20px",
            display: "flex", alignItems: "flex-start", gap: 14,
          }}>
            <svg style={{ flexShrink: 0, marginTop: 2 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            <p style={{ margin: 0, fontSize: 13, color: MUTED, lineHeight: 1.6 }}>
              Withdrawals are processed via{" "}
              <strong style={{ color: PRIMARY }}>Bangladesh Electronic Fund Transfer Network (BEFTN)</strong>
              , approved by Bangladesh Bank. Funds go directly to your registered bank account.
              Call <a href="tel:09609100142" style={{ color: PRIMARY, fontWeight: 600 }}>09609 100 142</a>
              {" "}or message via{" "}
              <a href="http://m.me/midwaytrec142" target="_blank" rel="noopener noreferrer" style={{ color: ACCENT, fontWeight: 600 }}>Facebook Messenger</a>.
            </p>
          </aside>
        )}
      </main>

      {/* ── Footer ── */}
      {/* <footer style={{ background: PRIMARY, color: `${WHITE}99`, fontSize: 12, textAlign: "center", padding: "16px 24px" }}>
        <address style={{ fontStyle: "normal" }}>
          <p style={{ margin: 0 }}>
            Midway Securities Ltd. ·{" "}
            <span itemProp="address">Dhaka Stock Exchange Building, Room 508, 9/F Motijheel C/A, Dhaka 1000</span>
          </p>
          <p style={{ margin: "4px 0 0" }}>
            Hotline: <a href="tel:09609100142" style={{ color: ACCENT }}>09609 100 142</a>
          </p>
        </address>
        <p style={{ margin: "8px 0 0" }}>© 2024 Midway Securities Ltd. All rights reserved.</p>
        <nav aria-label="Footer links" style={{ marginTop: 8 }}>
          <a href="/terms-conditions.html" style={{ color: `${WHITE}66`, marginRight: 12, fontSize: 11 }}>Terms &amp; Conditions</a>
          <a href="/privacy-policy.html" style={{ color: `${WHITE}66`, fontSize: 11 }}>Privacy Policy</a>
        </nav>
      </footer> */}
    </div>
  );
}

/* ─── FAQ data ─── */
const faqs = [
  {
    q: "How do I withdraw funds from my Midway Securities BO account?",
    a: "Log in to the Midway portal at portal.midwaybd.com and submit a withdrawal request, or fill out the manual form on this page. Funds are transferred via BEFTN to your registered bank account.",
  },
  {
    q: "How long does a BEFTN withdrawal take?",
    a: "Withdrawals are typically processed within 1–3 business days after your request is approved by the accounts team.",
  },
  {
    q: "Can I withdraw without a portal account?",
    a: "Yes. Use the 'No portal account' form above. Provide your name, client code, withdrawal amount, and phone number.",
  },
  {
    q: "Is BEFTN safe?",
    a: "Yes. BEFTN is the official interbank electronic payment system regulated and approved by Bangladesh Bank.",
  },
];

/* ─── Sub-components ─── */
function FaqItem({ question, answer }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${BORDER}`, padding: "14px 0" }}>
      <dt>
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          style={{
            width: "100%", background: "none", border: "none",
            cursor: "pointer", textAlign: "left", padding: 0,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            gap: 12,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 600, color: PRIMARY, lineHeight: 1.4 }}>
            {question}
          </span>
          <svg
            width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke={PRIMARY} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, transform: open ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
            aria-hidden="true"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </dt>
      {open && (
        <dd style={{ margin: "10px 0 0", fontSize: 14, color: MUTED, lineHeight: 1.6 }}>
          {answer}
        </dd>
      )}
    </div>
  );
}

function MethodCard({ icon, title, subtitle, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? PRIMARY : WHITE,
        border: `2px solid ${hovered ? PRIMARY : BORDER}`,
        borderRadius: 14, padding: "28px 24px",
        cursor: "pointer", textAlign: "left",
        transition: "all 0.2s", fontFamily: "inherit",
        display: "flex", flexDirection: "column", gap: 12,
      }}
    >
      <div style={{ opacity: hovered ? 0.9 : 1 }}>{icon}</div>
      <div>
        <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 16, color: hovered ? WHITE : PRIMARY }}>{title}</p>
        <p style={{ margin: 0, fontSize: 13, color: hovered ? `${WHITE}bb` : MUTED, lineHeight: 1.5 }}>{subtitle}</p>
      </div>
      <span style={{ fontSize: 13, color: ACCENT, fontWeight: 600 }}>Select →</span>
    </button>
  );
}

function FormCard({ title, subtitle, children }) {
  return (
    <div style={{ maxWidth: 640, margin: "0 auto", background: WHITE, borderRadius: 16, border: `1.5px solid ${BORDER}`, overflow: "hidden" }}>
      <div style={{ background: PRIMARY, padding: "20px 28px", borderBottom: `3px solid ${ACCENT}` }}>
        <h2 style={{ margin: 0, color: WHITE, fontSize: 18, fontWeight: 700 }}>{title}</h2>
        <p style={{ margin: "4px 0 0", color: `${WHITE}99`, fontSize: 13 }}>{subtitle}</p>
      </div>
      <div style={{ padding: "28px 28px 24px" }}>{children}</div>
    </div>
  );
}

function ErrorMsg({ id, children }) {
  return <p id={id} role="alert" style={{ margin: "4px 0 0", fontSize: 12, color: "#c0392b" }}>{children}</p>;
}

function BackButton({ onClick }) {
  return (
    <button onClick={onClick} style={{
      background: "none", border: `1.5px solid ${BORDER}`, borderRadius: 8,
      padding: "11px 20px", fontSize: 14, color: MUTED, cursor: "pointer",
      fontFamily: "inherit", fontWeight: 500,
    }}>← Back</button>
  );
}

function SubmitButton({ onClick, loading, children, ledgerBalance, type }) {
  if(type !== 'manual'){
    return (
      <button onClick={onClick} disabled={loading || ledgerBalance < 0 || ledgerBalance == null} aria-busy={loading} style={{
        flex: 1, background: loading || ledgerBalance < 0 || ledgerBalance == null ? MUTED : PRIMARY,
        border: "none", borderRadius: 8, padding: "12px 24px",
        fontSize: 15, color: WHITE, cursor: loading || ledgerBalance < 0 || ledgerBalance == null ? "not-allowed" : "pointer",
        fontWeight: 700, fontFamily: "inherit", transition: "background 0.2s",
      }}>
        {children}
      </button>
    );
  }else {
    return (
      <button onClick={onClick} disabled={loading} aria-busy={loading} style={{
        flex: 1, background: loading ? MUTED : PRIMARY,
        border: "none", borderRadius: 8, padding: "12px 24px",
        fontSize: 15, color: WHITE, cursor: loading ? "not-allowed" : "pointer",
        fontWeight: 700, fontFamily: "inherit", transition: "background 0.2s",
      }}>
        {children}
      </button>
    )
  }
}

function LockIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

function FormIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  );
}