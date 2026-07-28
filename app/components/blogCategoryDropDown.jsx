"use client";

import { useRouter, useSearchParams } from "next/navigation";

// Adjust this list to match the categories your API actually returns
export const categories = [
  { value: "", label: "All Categories" },
  { value: "Portfolio Transfer", label: "Portfolio Transfer" },
];

const BlogCategoryDropdown = ({ activeCategory }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Only navigates on explicit user interaction (onChange) — never in an effect
  const handleChange = (e) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("category", value);
    } else {
      params.delete("category");
    }
    params.set("page", "1");

    router.push(`/blogs?${params.toString()}`);
  };

  return (
    <select
      value={activeCategory || ""}
      onChange={handleChange}
      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {categories.map((c) => (
        <option key={c.value} value={c.value}>
          {c.label}
        </option>
      ))}
    </select>
  );
};

export default BlogCategoryDropdown;