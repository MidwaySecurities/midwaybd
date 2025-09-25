// BlogTabs.js
"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function BlogTabs({ activeTab }) {
  const tabs = [
    { id: "beginner", label: "Beginner", icon: "📚", description: "Start your journey" },
    { id: "regular", label: "Latest", icon: "⚡", description: "Recent updates" },
  ];

  const router = useRouter();
  const searchParams = useSearchParams();

  const changeTab = (tabId) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", tabId === "latest" ? "regular" : tabId);
    params.set("page", 1); // Reset to first page when changing tabs
    router.push(`/blogs/?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => changeTab(tab.id)}
          className={`relative flex-1 px-4 py-3 rounded-lg font-medium text-sm transition-all duration-200 min-w-[120px] ${
            activeTab?.toLowerCase() === tab.id.toLowerCase()
              ? "bg-white text-blue-600 shadow-sm"
              : "text-gray-600 hover:text-gray-900"
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <span className="text-lg">{tab.icon}</span>
            <span>{tab.label}</span>
          </div>
          {activeTab?.toLowerCase() === tab.id.toLowerCase() && (
            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full"></div>
          )}
        </button>
      ))}
    </div>
  );
}