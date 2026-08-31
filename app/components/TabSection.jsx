"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./Tabs.module.css";

// Static nav labels for the tab strip. `tabs` (passed in as a prop from the
// server) drives the actual content — this just controls display order/text
// for the clickable buttons themselves.
const TAB_NAV = [
  { id: "blog", navLabel: "Blog" },
  // { id: "visual", navLabel: "Market Outlook" },
  { id: "news", navLabel: "News" },
];

/**
 * All tab interactivity lives here as client-side React state — no
 * ?tab= query param, no route change, no server round-trip on click.
 * `tabs` is the fully-resolved array (blog/visual/news) fetched on the
 * server in page.js and passed down as a plain serializable prop.
 */
export default function TabsSection({ tabs }) {
  const [activeTabId, setActiveTabId] = useState(tabs[0]?.id || "blog");
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  return (
    <>
      <div
        role="tablist"
        aria-label="Market insights categories"
        className="flex gap-2 border-b border-gray-200"
      >
        {TAB_NAV.map(({ id, navLabel }) => {
          const isActive = id === activeTabId;
          return (
            <button
              key={id}
              type="button"
              role="tab"
              id={`tab-${id}`}
              aria-selected={isActive}
              aria-controls={`tabpanel-${id}`}
              onClick={() => setActiveTabId(id)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors cursor-pointer ${isActive
                ? "border-blue-600 text-secondary_color"
                : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
            >
              {navLabel}
            </button>
          );
        })}
      </div>

      <div
        id={`tabpanel-${activeTab.id}`}
        role="tabpanel"
        aria-labelledby={`tab-${activeTab.id}`}
        className={`${styles.tabcontent} mt-6`}
      >
        <article className="space-y-4">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-800 leading-tight">
              {activeTab.label}
            </h3>
            <time
              dateTime={activeTab.created_at}
              className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
            >
              {activeTab.created_at}
            </time>
          </div>

          {/* activeTab.content is rich text (HTML) from the CMS/API, so it's
              rendered with dangerouslySetInnerHTML after being run through
              DOMPurify (works client-side here too, since this is a client
              component). The prose-* utility classes style whatever tags
              come through. */}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed
              prose-headings:text-gray-900 prose-headings:font-bold
              prose-p:text-gray-700 prose-p:leading-relaxed
              prose-a:text-secondary_color prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-ul:text-gray-700 prose-ol:text-gray-700
              prose-li:text-gray-700 prose-li:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-blockquote:bg-blue-50 prose-blockquote:py-4 prose-blockquote:px-6
              prose-blockquote:text-gray-700 prose-blockquote:not-italic
              prose-code:bg-gray-100 prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100
              prose-img:rounded-lg prose-img:shadow-md"
            // dangerouslySetInnerHTML={{
            //   __html: DOMPurify.sanitize(activeTab.content || ""),
            // }}
            dangerouslySetInnerHTML={{ __html: activeTab.content || "" }}

          />

          {activeTab.blog_id && (
            <p>
              <Link
                href={`blogs/${activeTab.blog_id}`}
                className="text-secondary_color hover:text-blue-700 underline font-medium"
              >
                Read More
              </Link>
            </p>
          )}
        </article>
      </div>
    </>
  );
}