"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddAddressDialog from "../../profile/components/AddAddressDialog";

export type Address = {
  id: number;
  building_name: string;
  floor_number: string;
  location: {
    country: { id: number; name: string; shipping_cost: number };
    city: { id: number; name: string };
    district: { id: number; name: string };
    longitude: string | null;
    latitude: string | null;
  };
  description: string;
  contact: {
    phone_code: string;
    phone: string;
  };
  is_default: boolean;
  created_at: string;
};

type AddressesSelectProps = {
  addresses: Address[];
  selectedAddressIdId: number | null;
  setSelectedAddressIdIdId: (id: number) => void;
};

export default function AddressesSelect({
  addresses,
  selectedAddressIdId,
  setSelectedAddressIdIdId,
}: AddressesSelectProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempAddressId, setTempAddressId] = useState<number | null>(null);
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);

  const handleConfirm = () => {
    if (tempAddressId !== null) {
      setSelectedAddressIdIdId(tempAddressId);
    }
    setIsModalOpen(false);
  };

  const getAddressDetails = (address?: Address) => {
    if (!address) return "التوصيل إلى العنوان";
    return `${address.location.country.name} - ${address.location.city.name}، ${address.location.district.name}، ${address.building_name}، ${address.floor_number}`;
  };

  const selectedAddressId = addresses.find((a) => a.id === selectedAddressIdId);

  return (
    <div dir="rtl" className="w-full font-sans text-gray-900">
      {/* Trigger Button */}
      <div
        onClick={() => {
          setTempAddressId(selectedAddressIdId);
          setIsModalOpen(true);
        }}
        className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-colors ${
          selectedAddressIdId !== null
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
            <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a1 1 0 0 0-1-1zM10 6a2 2 0 0 1 4 0v1h-4V6z" />
          </svg>
          <span className="font-bold truncate text-sm">
            {getAddressDetails(selectedAddressId)}
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
          className="w-[95vw] sm:w-[90vw] md:max-w-3xl lg:max-w-4xl font-sans rounded-2xl p-4 sm:p-6 md:p-10"
        >
          <DialogHeader className="mb-6 md:mb-8">
            <DialogTitle className="text-2xl md:text-3xl font-bold text-center">
              اختر عنوان التوصيل
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 max-h-[55vh] overflow-y-auto px-1 md:px-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                onClick={() => setTempAddressId(address.id)}
                className={`relative flex flex-col gap-3 p-4 md:p-6 border rounded-xl cursor-pointer transition-all ${
                  tempAddressId === address.id
                    ? "border-amber-500 bg-amber-50/20"
                    : "border-gray-200 hover:border-amber-300"
                }`}
              >
                {address.is_default && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1">
                    <svg
                      className="w-3 h-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    افتراضي
                  </div>
                )}
                <div className="flex items-start gap-3 pr-2">
                  <svg
                    className="w-6 h-6 text-amber-500 shrink-0 mt-0.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <p className="text-sm md:text-base font-medium leading-relaxed max-w-[80%] md:max-w-[85%]">
                    {getAddressDetails(address)}
                  </p>
                </div>

                {/* Optional: Add user name here if it becomes available in your API later */}
                {/* 
                <div className="flex items-center gap-3 pr-2 mt-2">
                  <svg className="w-5 h-5 text-amber-500 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                  <span className="text-sm md:text-base font-medium">اسم المستخدم</span>
                </div>
                */}

                <div className="flex flex-col sm:flex-row sm:items-center justify-between pr-2 mt-2 gap-4">
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-amber-500 shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span
                      className="text-sm md:text-base font-medium dir-ltr"
                      dir="ltr"
                    >
                      +{address.contact.phone_code}
                      {address.contact.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 opacity-50 cursor-not-allowed">
                    <svg
                      className="w-6 h-6 text-gray-500 hover:text-red-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                    <svg
                      className="w-6 h-6 text-gray-500 hover:text-blue-500 transition-colors"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 gap-6 md:px-4">
            <button 
              onClick={() => setIsAddAddressOpen(true)}
              className="flex justify-center items-center gap-2 text-amber-500 font-bold hover:text-amber-600 transition-colors text-lg"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4v16m8-8H4"
                />
              </svg>
              إضافة عنوان جديد
            </button>
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-1/2">
              <button
                onClick={handleConfirm}
                disabled={tempAddressId === null}
                className="w-full sm:flex-1 bg-amber-500 text-white font-bold py-3 md:py-4 rounded-full hover:bg-amber-600 transition-colors disabled:opacity-50 text-lg"
              >
                تأكيد العنوان
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-full sm:flex-1 border border-amber-500 text-amber-500 font-bold py-3 md:py-4 rounded-full hover:bg-amber-50 transition-colors text-lg"
              >
                إلغاء
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      <AddAddressDialog isOpen={isAddAddressOpen} onClose={() => setIsAddAddressOpen(false)} />
    </div>
  );
}
