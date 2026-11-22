// Midway WhatsApp standard: one number, a per-page pre-filled message, and click tracking.
// Copied beside each page (like icons.jsx). Messages live in whatsapp-messages.json (same content in MESSAGES below).
export const NUMBER = "8801874444816";
export const MESSAGES = {
  "number": "8801874444816",
  "default": {
    "path": "/",
    "text": "I have a question."
  },
  "pages": {
    "home": {
      "path": "/",
      "text": "I would like help getting started with a BO Account."
    },
    "about-us": {
      "path": "/about-us",
      "text": "I would like to know more about Midway Securities."
    },
    "auction-calendar": {
      "path": "/auction-calendar",
      "text": "I have a question about Treasury Bond auctions."
    },
    "bond-interest-calculator": {
      "path": "/bond-interest-calculator",
      "text": "I have a question about Government Bond interest."
    },
    "bond-vs-deposit-calculator": {
      "path": "/bond-vs-deposit-calculator",
      "text": "I have a question about comparing Government Bonds with a bank deposit."
    },
    "bonus-adjustment-calculator": {
      "path": "/bonus-adjustment-calculator",
      "text": "I have a question about bonus share price adjustment."
    },
    "dividend-calculator": {
      "path": "/dividend-calculator",
      "text": "I have a question about dividends."
    },
    "dividend-goal-calculator": {
      "path": "/dividend-goal-calculator",
      "text": "I have a question about planning for dividend income."
    },
    "faq": {
      "path": "/faq",
      "text": "I have a question that I could not find in the FAQ."
    },
    "government-bonds": {
      "path": "/government-bonds",
      "text": "I have a question about investing in Government Bonds."
    },
    "ipo": {
      "path": "/ipo",
      "text": "I have a question about applying for an IPO."
    },
    "link-bo-account": {
      "path": "/link-bo-account",
      "text": "I would like help linking my BO Account to Midway."
    },
    "mutual-funds": {
      "path": "/mutual-funds",
      "text": "I have a question about Mutual Funds."
    },
    "pricing": {
      "path": "/pricing",
      "text": "I have a question about Midway's pricing."
    },
    "profit-loss-calculator": {
      "path": "/profit-loss-calculator",
      "text": "I have a question about the profit and loss calculator."
    },
    "position-size-calculator": {
      "path": "/position-size-calculator",
      "text": "I have a question about the position size calculator."
    },
    "quicktrade-pro": {
      "path": "/mobile-app",
      "text": "I have a question about QuickTrade Pro."
    },
    "rights-issue-calculator": {
      "path": "/rights-issue-calculator",
      "text": "I have a question about rights issues."
    },
    "sme-atb": {
      "path": "/sme-atb",
      "text": "I have a question about SME and ATB shares."
    },
    "stocks": {
      "path": "/stocks",
      "text": "I have a question about trading stocks on the DSE."
    },
    "tools": {
      "path": "/tools",
      "text": "I have a question about your investing tools."
    },
    "treasury-bond-center": {
      "path": "/treasury-bond-center",
      "text": "I have a question about Treasury Bonds."
    },
    "valuation-ratios-calculator": {
      "path": "/valuation-ratios-calculator",
      "text": "I have a question about valuation ratios."
    },
    "which-order-type": {
      "path": "/which-order-type",
      "text": "I have a question about order types."
    },
    "withdraw": {
      "path": "/withdraw",
      "text": "I have a question about withdrawing funds."
    },
    "deposit": {
      "path": "/deposit",
      "text": "I have a question about depositing funds."
    },
    "blog-home": {
      "path": "/blog",
      "text": "I have a question about investing on the DSE."
    },
    "blog-learn": {
      "path": "/blog/learn",
      "text": "I have a question about one of your guides."
    },
    "blog-news": {
      "path": "/blog/news",
      "text": "I have a question about your news."
    },
    "blog-research": {
      "path": "/blog/research",
      "text": "I have a question about your research."
    },
    "blog-watch": {
      "path": "/blog/watch",
      "text": "I have a question about one of your videos."
    },
    "blog-tools": {
      "path": "/blog/tools",
      "text": "I have a question about your tools."
    },
    "blog-topic": {
      "path": "/blog/topic",
      "text": "I have a question about this topic."
    },
    "blog-article": {
      "path": "/blog/learn",
      "text": "I have a question about the article \"{title}\"."
    }
  }
};

const PREFIX = "Hello Midway Securities, ";

function entry(key) {
  return (MESSAGES.pages && MESSAGES.pages[key]) || MESSAGES.default;
}

/** Page key from the current URL when a page did not pass one (footer, shared components). */
export function keyFromPath(path) {
  const p = (path || (typeof window !== "undefined" ? window.location.pathname : "/")).replace(/\/+$/, "") || "/";
  const pages = MESSAGES.pages;
  let best = null;
  Object.keys(pages).forEach((k) => {
    const pp = pages[k].path;
    if ((p === pp || (pp !== "/" && p.startsWith(pp + "/"))) && (!best || pp.length > pages[best].path.length)) best = k;
  });
  return best || (p === "/" ? "home" : null);
}

/** wa.me link with the page's pre-filled message. {title} in a message is replaced with `title` (articles, videos). */
export function waHref(key, title) {
  const k = key || keyFromPath();
  const e = entry(k);
  const path = typeof window !== "undefined" ? window.location.pathname : e.path;
  const text = PREFIX + e.text.replace("{title}", title || "this page") + " (from midwaybd.com" + (path === "/" ? "" : path) + ")";
  return "https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(text);
}

/** Pushes one event to dataLayer (Google Tag Manager) and gtag when present. No personal data. */
export function trackWhatsApp(key, placement) {
  if (typeof window === "undefined") return;
  const k = key || keyFromPath() || "unknown";
  const evt = { event: "whatsapp_click", page_key: k, page_path: window.location.pathname, placement: placement || "page_cta", language: document.documentElement.lang || "en" };
  (window.dataLayer = window.dataLayer || []).push(evt);
  if (typeof window.gtag === "function") window.gtag("event", "whatsapp_click", evt);
}

/** Spread onto any WhatsApp <a>: <a {...waProps(links.whatsapp, "ipo", "page_cta")} className=...> */
export function waProps(_baseHref, key, placement = "page_cta", title) {
  return {
    href: waHref(key, title),
    target: "_blank",
    rel: "noopener",
    "data-wa-page": key || "",
    "data-wa-placement": placement,
    onClick: (e) => {
      e.currentTarget.href = waHref(key, title); // use the real URL at click time
      trackWhatsApp(key, placement);
    },
  };
}
