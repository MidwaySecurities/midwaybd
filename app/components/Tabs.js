"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";

const tabs = [
  { id: "london", label: "London" },
  { id: "paris", label: "Paris" },
  { id: "tokyo", label: "Tokyo" },
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
    <div className={styles.tab}>
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
