"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";

const tabs = [
  { id: "blog", label: "Latest blog" },
  { id: "visual", label: "Visual Research" },
  { id: "news", label: "News" },
];

export default function Tabs({ activeCity }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={`${styles.tab} rounded-t-lg font-semibold`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeCity === tab.id ? styles.active : ""}
          onClick={() => changeTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );  
}
