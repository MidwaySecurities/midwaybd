"use client";

import { useRouter, useSearchParams } from "next/navigation";
import styles from "./Tabs.module.css";
import Dropdown from "./blogCategoryDropDown";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useBlogTab } from "../context/blogTabContext";

const tabs = [
  { id: "beginner", label: "Beginner" },
  { id: "regular", label: "Latest" },
  // { id: "category", label: "Category" },
];

export default function Tabs({ activeTab }) {
  const { currentTab, setCurrentTab } = useBlogTab();
  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentTab) {
      params.set("tab", currentTab);
    } 
    router.push(`/blogs/?${params.toString()}`);
  };

  useEffect(() => {
    if (currentTab) {
      changeTab(currentTab);
    }
  }, [currentTab]);
  return (
    <div className="">
      <div className={`${styles.tab} font-semibold flex rounded-tl-md h-full`}>
        {tabs.map((tab) => (
          // <Link key={tab.id} href={{
          //   pathname: '/blogs',
          //   query: { ...Object.fromEntries(searchParams.entries()), tab: tab.id },
          // }} scroll={false}>
          <button
            className={currentTab.toLowerCase() === tab.id.toLocaleLowerCase() ? styles.active : ""}
            onClick={() => {
              setCurrentTab(tab.id);
            }}
          >
            {tab.label}
          </button>
          // </Link>
        ))}

      </div>
    </div>
  );
}
