"use client";

import { useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useBlogTab } from "../context/blogTabContext";

const categories = [
  {
    id: 1,
    name: "All Categories",
    value: "all",
    icon: "🌐",
    color: "bg-gray-100 text-gray-700",
  },
  {
    id: 2,
    name: "ATB",
    value: "ATB",
    icon: "📈",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 3,
    name: "Bonds",
    value: "Bonds",
    icon: "📋",
    color: "bg-green-100 text-green-700",
  },
  {
    id: 4,
    name: "Dividend",
    value: "Dividend",
    icon: "💰",
    color: "bg-yellow-100 text-yellow-700",
  },
  {
    id: 5,
    name: "IPO",
    value: "IPO",
    icon: "🚀",
    color: "bg-purple-100 text-purple-700",
  },
  {
    id: 6,
    name: "Learn About Share Market",
    value: "Learn About Share Market",
    icon: "📖",
    color: "bg-indigo-100 text-indigo-700",
  },
  {
    id: 7,
    name: "Margin Loan",
    value: "Margin Loan",
    icon: "🏦",
    color: "bg-red-100 text-red-700",
  },
  {
    id: 8,
    name: "Mobile App",
    value: "Mobile App",
    icon: "📱",
    color: "bg-cyan-100 text-cyan-700",
  },
  {
    id: 9,
    name: "Mutual Fund",
    value: "Mutual Fund",
    icon: "📊",
    color: "bg-orange-100 text-orange-700",
  },
  {
    id: 10,
    name: "Portfolio Transfer",
    value: "Portfolio Transfer",
    icon: "🔄",
    color: "bg-teal-100 text-teal-700",
  },
  {
    id: 11,
    name: "Security",
    value: "Security",
    icon: "🔒",
    color: "bg-gray-100 text-gray-700",
  },
  {
    id: 12,
    name: "SME",
    value: "SME",
    icon: "🏢",
    color: "bg-pink-100 text-pink-700",
  },
];

export default function BlogCategoryDropdown({ activeCategory }) {
  const { currentTab, setCurrentTab } = useBlogTab();
  const search = useSearchParams();
  const router = useRouter();
  
  const [selected, setSelected] = useState(() => {
    if (activeCategory === 'all') {
      return categories[0]; // "All Categories"
    }
    return categories.find(cat => 
      cat.value.toLowerCase() === activeCategory?.toLowerCase()
    ) || categories[0];
  });

  useEffect(() => {
    const params = new URLSearchParams(search.toString());
    const categoryValue = selected.value === 'all' ? 'all' : selected.value;
    
    params.set("category", categoryValue);
    
    // Reset to beginner tab and first page when category changes
    if (activeCategory !== selected.value) {
      params.set("tab", 'beginner');
      params.set('page', '1');
      setCurrentTab('beginner');
    }
    
    router.push(`/blogs/?${params.toString()}`, { scroll: false });
  }, [selected, router, search, activeCategory, setCurrentTab]);

  return (
    <div className="w-full sm:w-64">
      <Listbox value={selected} onChange={setSelected}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-pointer bg-white border border-gray-300 rounded-xl py-3 px-4 text-left shadow-sm hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <span className="flex items-center">
              <span className="text-lg mr-3">{selected.icon}</span>
              <span className="block truncate font-medium text-gray-900">
                {selected.name}
              </span>
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
            </span>
          </Listbox.Button>

          <Transition
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-2 w-full max-h-80 overflow-auto bg-white rounded-xl shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-2">
                {categories.map((category) => (
                  <Listbox.Option
                    key={category.id}
                    value={category}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-3 px-4 transition-colors ${
                        active ? "bg-blue-50" : ""
                      }`
                    }
                  >
                    {({ selected, active }) => (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-lg mr-3">{category.icon}</span>
                          <span
                            className={`block truncate ${
                              selected ? "font-semibold" : "font-normal"
                            } ${active ? "text-blue-900" : "text-gray-900"}`}
                          >
                            {category.name}
                          </span>
                        </div>
                        {selected && (
                          <CheckIcon 
                            className={`h-5 w-5 ${
                              active ? "text-blue-600" : "text-blue-600"
                            }`} 
                          />
                        )}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </div>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}