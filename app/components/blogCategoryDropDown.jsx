// import React from 'react'

// const BlogCategoryDropDown = () => {
//     return (
//         <div>
//             <label for="select" className="block text-sm/6 font-medium text-gray-900">Blog Categories</label>
//             <div id="select" name="selected" value="4" className="mt-2 block">
//                 <button type="button" className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6">
//                     <divedcontent className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
//                         <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full bg-gray-100" />
//                         <span className="block truncate">Tom Cook</span>
//                     </divedcontent>
//                     <svg viewBox="0 0 16 16" fill="currentColor" data-slot="icon" aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4">
//                         <path d="M5.22 10.22a.75.75 0 0 1 1.06 0L8 11.94l1.72-1.72a.75.75 0 1 1 1.06 1.06l-2.25 2.25a.75.75 0 0 1-1.06 0l-2.25-2.25a.75.75 0 0 1 0-1.06ZM10.78 5.78a.75.75 0 0 1-1.06 0L8 4.06 6.28 5.78a.75.75 0 0 1-1.06-1.06l2.25-2.25a.75.75 0 0 1 1.06 0l2.25 2.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" fill-rule="evenodd" />
//                     </svg>
//                 </button>

//                 <div anchor="bottom start" popover className="hidden max-h-56 w-(--button-width) overflow-auto rounded-md bg-white py-1 text-base shadow-lg outline-1 outline-black/5 [--anchor-gap:--spacing(1)] data-leave:transition data-leave:transition-discrete data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm">
//                     <div value="1" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Wade Cooper</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="2" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Arlene Mccoy</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="3" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Devon Webb</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="4" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Tom Cook</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="5" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Tanya Fox</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="6" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Hellen Schmidt</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="7" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1568409938619-12e139227838?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Caroline Schultz</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="8" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Mason Heaney</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="9" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1584486520270-19eca1efcce5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Claudie Smitham</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                     <div value="10" className="group/option relative block cursor-default py-2 pr-9 pl-3 text-gray-900 select-none focus:bg-indigo-600 focus:text-white focus:outline-hidden">
//                         <div className="flex items-center">
//                             <img src="https://images.unsplash.com/photo-1561505457-3bcad021f8ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" className="size-5 shrink-0 rounded-full" />
//                             <span className="ml-3 block truncate font-normal group-aria-selected/option:font-semibold">Emil Schaefer</span>
//                         </div>
//                         <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-not-aria-selected/option:hidden group-focus/option:text-white in-[divedcontent]:hidden">
//                             <svg viewBox="0 0 20 20" fill="currentColor" data-slot="icon" aria-hidden="true" className="size-5">
//                                 <path d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" fill-rule="evenodd" />
//                             </svg>
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default BlogCategoryDropDown

'use client'

// import React, { useState } from "react";

// const people = [
//   {
//     id: 1,
//     name: "Wade Cooper",
//     img: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 2,
//     name: "Arlene Mccoy",
//     img: "https://images.unsplash.com/photo-1550525811-e5869dd03032?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 3,
//     name: "Devon Webb",
//     img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80",
//   },
//   {
//     id: 4,
//     name: "Tom Cook",
//     img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 5,
//     name: "Tanya Fox",
//     img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 6,
//     name: "Hellen Schmidt",
//     img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 7,
//     name: "Caroline Schultz",
//     img: "https://images.unsplash.com/photo-1568409938619-12e139227838?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 8,
//     name: "Mason Heaney",
//     img: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 9,
//     name: "Claudie Smitham",
//     img: "https://images.unsplash.com/photo-1584486520270-19eca1efcce5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
//   {
//     id: 10,
//     name: "Emil Schaefer",
//     img: "https://images.unsplash.com/photo-1561505457-3bcad021f8ee?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
//   },
// ];

// export default function SelectList() {
//   const [selected, setSelected] = useState(null);

//   return (
//     <div className="w-72 rounded-md border shadow">
//       {people.map((person) => (
//         <div
//           key={person.id}
//           className={`relative flex cursor-pointer items-center justify-between py-2 px-3 ${
//             selected?.id === person.id
//               ? "bg-indigo-600 text-white"
//               : "text-gray-900 hover:bg-indigo-100"
//           }`}
//           onClick={() => setSelected(person)}
//         >
//           <div className="flex items-center">
//             <img
//               src={person.img}
//               alt={person.name}
//               className="size-6 shrink-0 rounded-full"
//             />
//             <span
//               className={`ml-3 truncate ${
//                 selected?.id === person.id ? "font-semibold" : "font-normal"
//               }`}
//             >
//               {person.name}
//             </span>
//           </div>

//           {selected?.id === person.id && (
//             <svg
//               viewBox="0 0 20 20"
//               fill="currentColor"
//               className="size-5 text-white"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
//               />
//             </svg>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { useRouter, useSearchParams } from "next/navigation";


const people = [
    {
        id: 1,
        name: "Select Category",
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

export default function Dropdown({activeCategory}) {
    console.log("searchParams", activeCategory)
    const search = useSearchParams();
    const router = useRouter();
    const [selected, setSelected] = useState(activeCategory ? people.find(cat => cat.name.toLowerCase() === activeCategory.toLowerCase()) : people[0]);
    useEffect(() => {
        const params = new URLSearchParams(search.toString());
        params.set("category", selected.name);
        if(activeCategory !== selected.name){
            params.set("tab", 'beginner');
        }
        router.push(`/blogs/?${params.toString()}`, { scroll: false });
    }, [selected]);
    return (
        <div className="w-full z-10">
            <Listbox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    {/* Button */}
                    <Listbox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm">
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
                    <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
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
                                            {/* <img
                                                src={person.img}
                                                alt={person.name}
                                                className="size-5 shrink-0 rounded-full"
                                            /> */}
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
