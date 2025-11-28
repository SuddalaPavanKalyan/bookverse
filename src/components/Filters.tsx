"use client";

import clsx from "clsx";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAuthors,
  useBranches,
  useGenres,
  useLanguages,
} from "../utils/types";

type FiltersProps = {
  onFilterChange: (filters: Record<string, string[]>) => void;
  isOpen: boolean;
  toggle: () => void;
};

const MAX_VISIBLE_ITEMS = 4;

const Filters: React.FC<FiltersProps> = ({
  onFilterChange,
  isOpen,
  toggle,
}) => {
  const { authors, loading: loadingAuthors } = useAuthors();
  const { languages, loading: loadingLanguages } = useLanguages();
  const { genres, loading: loadingGenres } = useGenres();
  const { branches, loading: loadingBranches } = useBranches();
  const [filterSearch, setFilterSearch] = useState<Record<string, string[]>>(
    {}
  );
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({});

  useEffect(() => {
    onFilterChange(filterSearch);
  }, [filterSearch, onFilterChange]);

  const handleCheckboxChange = (
    category: string,
    item: string,
    checked: boolean
  ) => {
    setFilterSearch((prev) => {
      const updated = new Set(prev[category]);
      checked ? updated.add(item) : updated.delete(item);
      return {
        ...prev,
        [category]: Array.from(updated),
      };
    });
  };

  const toggleShowMore = (category: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const renderCheckboxList = (
    category: string,
    items: string[],
    loading: boolean
  ) => {
    if (loading)
      return <p className="text-sm text-gray-500 animate-pulse">Loading...</p>;

    if (!items.length)
      return (
        <p className="text-sm text-gray-400 italic">No options available</p>
      );

    const selected = filterSearch[category] || [];
    const isExpanded = expandedSections[category] || false;
    const visibleItems = isExpanded ? items : items.slice(0, MAX_VISIBLE_ITEMS);

    return (
      <div className="space-y-2">
        <ul className="pl-1 pr-1 space-y-2 max-h-[220px] overflow-y-auto custom-scrollbar">
          {visibleItems.map((item) => {
            const checked = selected.includes(item);
            return (
              <li
                key={item}
                className="flex items-center gap-2 hover:bg-indigo-50/50 px-2 py-1 rounded-md transition-colors duration-200"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={(e) =>
                    handleCheckboxChange(category, item, e.target.checked)
                  }
                  id={`${category}-${item}`}
                  className="h-4 w-4 shrink-0 accent-indigo-600 cursor-pointer transition-transform duration-150 hover:scale-110"
                />
                <label
                  htmlFor={`${category}-${item}`}
                  className="text-sm text-gray-800 cursor-pointer hover:text-indigo-600 transition font-medium truncate"
                  title={item}
                >
                  {item}
                </label>
              </li>
            );
          })}
        </ul>

        {items.length > MAX_VISIBLE_ITEMS && (
          <button
            onClick={() => toggleShowMore(category)}
            className="text-indigo-600 hover:text-indigo-800 hover:underline text-xs font-semibold transition-all duration-200"
          >
            {isExpanded
              ? "Show less ▲"
              : `Show ${items.length - MAX_VISIBLE_ITEMS} more ▼`}
          </button>
        )}
      </div>
    );
  };

  return (
    <aside
      className={clsx(
        "fixed md:absolute top-0 left-0 h-full w-[280px] bg-gradient-to-b from-white via-gray-50 to-gray-100",
        "flex flex-col border-t border-r border-gray-200 z-[200] overflow-y-auto",
        "transition-transform duration-500 ease-in-out backdrop-blur-md z-100",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <button
        onClick={toggle}
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 active:scale-95 transition-all duration-200"
        aria-label="Close Menu"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex flex-col gap-6 mt-20 px-5 pb-6 h-full">
        <h2 className="text-2xl font-extrabold text-gray-800 tracking-wide border-b pb-2 border-gray-300">
          Filter by
        </h2>

        {[
          { title: "Author", data: authors, loading: loadingAuthors },
          { title: "Language", data: languages, loading: loadingLanguages },
          { title: "Genre", data: genres, loading: loadingGenres },
          { title: "Branch", data: branches, loading: loadingBranches },
        ].map(({ title, data, loading }) => (
          <div
            key={title}
            className="flex flex-col gap-3 bg-white/70 backdrop-blur-sm rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide border-l-4 border-indigo-500 pl-2">
              {title}
            </h3>
            {renderCheckboxList(title.toLowerCase(), data, loading)}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default React.memo(Filters);
{
  /**
   * 
       const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

    useEffect(() => {
      const handleResize = () => {
        setScreenWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);

      return () => window.removeEventListener("resize", handleResize);
    }, []);
     
    {screenWidth < 1000 && (
        <button
          onClick={toggle}
          className="absolute top-5 right-5 bg-blue-100 p-2 text-gray-600 rounded"
        >
          {!isOpen ? (
            <ChevronRight className="w-6 h-6" />
          ) : (
            <ChevronLeft className="w-6 h-6" />
          )}
        </button>
      )} 
    <aside
      className={clsx(
        "bg-white w-[300px] px-10 py-10 shadow-lg border-l border-gray-200 flex flex-col justify-between overflow-y-auto z-[1000]",

        "transition-transform ease-in-out duration-300",

        screenWidth < 1000
          ? [
              "fixed top-0 left-0 h-full transform",
              isOpen ? "translate-x-0" : "-translate-x-full"
            ]
          : ["static h-auto translate-x-0 transform-none"]
      )}
    >
     */
}
