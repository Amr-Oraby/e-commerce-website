"use client";

import * as React from "react";
import { BiSortAlt2 } from "react-icons/bi";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const t = useTranslations("common");

  const handleValueChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const currentSort = searchParams.get("sort") || "";

  const sortLabels: Record<string, string> = {
    latest: t("latest"),
    oldest: t("oldest"),
  };

  const currentLabel = currentSort ? sortLabels[currentSort] : undefined;

  return (
    <Select
      onValueChange={handleValueChange}
      value={currentSort}
    >
      <SelectTrigger className="w-40 rounded-full border-gray-200 hover:bg-gray-50 px-4 py-3 gap-2 text-sm text-gray-800">
        <BiSortAlt2 className="w-5 h-5 text-gray-700 shrink-0" />
        <SelectValue placeholder={t("sortBy")}>
          {currentLabel}
        </SelectValue>
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="latest">{t("latest")}</SelectItem>
        <SelectItem value="oldest">{t("oldest")}</SelectItem>
      </SelectContent>
    </Select>
  );
}
