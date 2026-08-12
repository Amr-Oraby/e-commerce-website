"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type Branch = {
  id: number;
  name: string;
  country: { id: number; name: string };
  city: { id: number; name: string };
  district: { id: number; name: string };
};

type BranchesSelectProps = {
  branches: Branch[];
  selectedBranchId: number | null;
  setSelectedBranchId: (id: number) => void;
};

export default function BranchesSelect({
  branches,
  selectedBranchId,
  setSelectedBranchId,
}: BranchesSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempBranchId, setTempBranchId] = useState<number | null>(null);

  const handleConfirm = () => {
    if (tempBranchId) {
      setSelectedBranchId(tempBranchId);
    }
    setIsModalOpen(false);
  };

  // Helper to format branch display name
  const getBranchDisplayName = (branch?: Branch) => {
    if (!branch) return "";
    return `فرع ${branch.name} - ${branch.district.name}، ${branch.city.name}، ${branch.country.name}`;
  };

  const selectedBranch = branches.find((b) => b.id === selectedBranchId);

  return (
    <div dir="rtl" className="w-full font-sans text-gray-900">
      {/* Trigger Button */}
      <div
        onClick={() => {
          setTempBranchId(selectedBranchId);
          setIsModalOpen(true);
        }}
        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
          selectedBranchId !== null
            ? "border-amber-400 bg-amber-50/50"
            : "border-gray-200 hover:border-amber-400"
        }`}
      >
        <div className="flex items-center gap-3 w-5/6">
          <svg
            className="w-6 h-6 text-amber-500 shrink-0"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 6h16v2H4zm2 4h12v10H6zm2 2v6h3v-6zm5 0v6h3v-6z" />
          </svg>
          <span className="font-bold truncate text-sm">
            {selectedBranchId
              ? getBranchDisplayName(selectedBranch)
              : "الاستلام من المتجر"}
          </span>
        </div>
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>

      {/* Dialog Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          dir="rtl"
          className="w-[95vw] sm:w-[80vw] md:max-w-3xl lg:max-w-4xl font-sans rounded-2xl p-4 sm:p-6 md:p-10"
        >
          <DialogHeader className="mb-6 md:mb-8">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
              اختر فرع الاستلام
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto px-1 md:px-4">
            {branches.map((branch) => (
              <div
                key={branch.id}
                onClick={() => setTempBranchId(branch.id)}
                className={`flex items-center gap-4 p-4 md:p-6 border rounded-xl cursor-pointer transition-all ${
                  tempBranchId === branch.id
                    ? "border-amber-500 bg-amber-50/20"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 text-amber-500 shrink-0"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4 6h16v2H4zm2 4h12v10H6zm2 2v6h3v-6zm5 0v6h3v-6z" />
                </svg>
                <span className="text-sm md:text-base font-medium leading-relaxed">
                  {getBranchDisplayName(branch)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-8 md:px-4">
            <button
              onClick={handleConfirm}
              disabled={!tempBranchId}
              className="w-full sm:flex-1 bg-amber-500 text-white font-bold py-3 md:py-4 rounded-full hover:bg-amber-600 transition-colors disabled:opacity-50 text-lg"
            >
              تأكيد الفرع
            </button>
            <button
              onClick={() => setIsModalOpen(false)}
              className="w-full sm:flex-1 border border-amber-500 text-amber-500 font-bold py-3 md:py-4 rounded-full hover:bg-amber-50 transition-colors text-lg"
            >
              إلغاء
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
