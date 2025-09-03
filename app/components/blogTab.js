"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";
import Dropdown from "./blogCategoryDropDown";

const tabs = [
  { id: "beginner", label: "Beginner" },
  { id: "regular", label: "Latest" },
  // { id: "category", label: "Category" },
];

export default function Tabs({ activeCity }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId);
    router.push(`/blogs/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="">
      <div className={`${styles.tab} font-semibold flex rounded-tl-md h-full`}>
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
    </div>
  );
}
