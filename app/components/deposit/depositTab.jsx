"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "../../components/Tabs.module.css";

const tabs = [
  { id: "online", label: "Online Bank" },
  { id: "mobile", label: "Mobile" },
  { id: "credit", label: "Credit card" },
];

export default function DepositTab({ activeCity }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`deposit/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={`${styles.tab} rounded-t-lg font-semibold text-sm`}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={activeCity === tab.id ? 'bg-qtp_btn_bg_color text-white' : ""}
          onClick={() => changeTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );  
}
