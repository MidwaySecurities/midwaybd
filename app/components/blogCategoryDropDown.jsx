"use client";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";
import { useBlogTab } from "../context/blogTabContext";


const people = [
    {
        id: 1,
        name: "Category",
        img: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 2,
        name: "Investment Tips",
        img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 3,
        name: "Trading Strategies",
        img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
    },
    {
        id: 4,
        name: "Company Updates",
        img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
    {
        id: 5,
        name: "Others",
        img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
];

export default function Dropdown({activeCategory, }) {
    const { currentTab, setCurrentTab } = useBlogTab();
    console.log("searchParams", activeCategory)
    const search = useSearchParams();
    const router = useRouter();
    const [selected, setSelected] = useState(activeCategory ? people.find(cat => cat.name.toLowerCase() === activeCategory.toLowerCase()) : people[0]);
    useEffect(() => {
        const params = new URLSearchParams(search.toString());
        params.set("category", selected.name);
        console.log('activeCategory', activeCategory, selected.name)
        if(activeCategory !== selected.name){
            params.set("tab", 'beginner');
            params.set('page', 1)
            setCurrentTab('beginner');
        }
        router.push(`/blogs/?${params.toString()}`, { scroll: false });
    }, [selected]);
    return (
        <div className="w-[180px] h-full text-[12px] font-semibold">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    {/* Button */}
                    <Listbox.Button className="relative w-full cursor-pointer  focus:outline-none focus:ring-indigo-500 sm:text-sm">
                        <span className="flex items-center">
                            {/* <img
                                src={selected.img}
                                alt={selected.name}
                                className="size-5 shrink-0 rounded-full"
                            /> */}
                            <span className="ml-3 block truncate">{selected.name}</span>
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" />
                        </span>
                    </Listbox.Button>

                    {/* Options */}
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
                        {people.map((person) => (
                            <Listbox.Option
                                key={person.id}
                                value={person}
                                className={({ active }) =>
                                    `relative cursor-pointer select-none py-2 pl-3 pr-9 ${active ? "bg-indigo-600 text-white" : "text-gray-900"
                                    }`
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <div className="flex items-center">
                                            <span
                                                className={`ml-3 block truncate ${selected ? "font-semibold" : "font-normal"
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                        </div>
                                        {selected && (
                                            <span
                                                className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-qtp_btn_bg_color"
                                                    }`}
                                            >
                                                <CheckIcon className="h-5 w-5" />
                                            </span>
                                        )}
                                    </>
                                )}
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </div>
            </Listbox>
        </div>
    );
}
