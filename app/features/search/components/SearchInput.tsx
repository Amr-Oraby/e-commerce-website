"use client";

import { useState, useRef, useEffect } from "react";
import { Search, X, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import { useSearchHistory } from "../hooks/useSearchHistory";
import { useAddSearch } from "../hooks/useAddSearch";
import { useDeleteSearch } from "../hooks/useDeleteSearch";
import { useRouter } from "next/navigation";

export function SearchInput({ className }: { className?: string }) {
  const t = useTranslations("header");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data: historyData } = useSearchHistory();
  const { mutate: addSearch } = useAddSearch();
  const { mutate: deleteSearch } = useDeleteSearch();

  const historyList = historyData?.data || [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addSearch(searchTerm);
      router.push(`/search?search=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setIsOpen(false);
    router.push(`/search?search=${encodeURIComponent(term)}`);
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={t("search")}
          className="pe-11 w-full bg-gray-100 rounded-full py-3 lg:py-4 px-6 outline-none text-sm placeholder:text-gray-400"
        />
        <button type="submit" className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <Search className="w-5 h-5" />
        </button>
      </form>

      {isOpen && historyList.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-4 z-50 flex flex-col"
          dir="rtl"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-gray-800 text-sm">آخر عمليات البحث</h3>
          </div>
          
          <ul className="flex flex-col gap-3">
            {historyList.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between group cursor-pointer p-2 hover:bg-gray-50 rounded-xl transition-colors"
              >
                <div 
                  className="flex items-center gap-3 flex-1"
                  onClick={() => handleHistoryClick(item.term)}
                >
                  <Clock className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{item.term}</span>
                </div>
                
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSearch(item.id);
                  }}
                  className="p-1.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
