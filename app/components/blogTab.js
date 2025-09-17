"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";
import Dropdown from "./blogCategoryDropDown";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBlogTab } from "../context/blogTabContext";


export default function Tabs({ activeTab }) {
  const tabs = [
    { id: "beginner", label: "Beginner" },
    { id: "regular", label: "Latest" },
    // { id: "category", label: "Category" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId === 'latest' ? 'regular' : tabId);
    router.push(`/blogs/?${params.toString()}`);
  };

  return (
    <div className="">
      <div className={`${styles.tab} font-semibold text-sm flex rounded-tl-md h-full`}>
        {tabs.map((tab) => (

          <button
            key={tab.id}
            className={`${tab.id ==='regular'?'w-[90px]':''} ${activeTab?.toLowerCase() === tab.id.toLocaleLowerCase() ? styles.active : ""}`}
            onClick={() => {
              changeTab(tab.id);
            }}
          >
            {tab.label}
          </button>
        ))}

      </div>
    </div>
  );
}
