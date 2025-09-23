// "use client";

// import { useRouter, useSearchParams } from "next/navigation";
// import styles from "./Tabs.module.css";
// import Dropdown from "./blogCategoryDropDown";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { useBlogTab } from "../context/blogTabContext";


// export default function Tabs({ activeTab }) {
//   const tabs = [
//     { id: "beginner", label: "Beginner" },
//     { id: "regular", label: "Latest" },
//     // { id: "category", label: "Category" },
//   ];

//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const changeTab = (tabId) => {
//     const params = new URLSearchParams(searchParams.toString());
//     params.set("tab", tabId === 'latest' ? 'regular' : tabId);
//     router.push(`/blogs/?${params.toString()}`);
//   };

//   return (
//     <div className="">
//       <div className={`${styles.tab} font-semibold text-sm flex rounded-tl-md h-full`}>
//         {tabs.map((tab) => (

//           <button
//             key={tab.id}
//             className={`${tab.id ==='regular'?'w-[90px]':''} ${activeTab?.toLowerCase() === tab.id.toLocaleLowerCase() ? styles.active : ""}`}
//             onClick={() => {
//               changeTab(tab.id);
//             }}
//           >
//             {tab.label}
//           </button>
//         ))}

//       </div>
//     </div>
//   );
// }

"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Tabs({ activeTab }) {
  const tabs = [
    { id: "beginner", label: "Beginner" },
    { id: "regular", label: "Latest" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId === "latest" ? "regular" : tabId);
    router.push(`/blogs/?${params.toString()}`);
  };

  return (
    <div className="w-full bg-gray-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-start md:justify-center space-x-2 md:space-x-6 px-2 py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => changeTab(tab.id)}
            className={`px-4 py-2 rounded-md text-sm md:text-base font-semibold transition-all duration-200 ${activeTab?.toLowerCase() === tab.id.toLowerCase()
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-700 hover:bg-blue-100 hover:text-blue-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
