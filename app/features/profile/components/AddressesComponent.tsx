"use client";

import React from "react";
import {
  MapPin,
  User,
  Phone,
  CheckCircle2,
  Trash2,
  SquarePen,
  PlusCircle,
} from "lucide-react";
import { useAddresses } from "../../order/hooks/useAddresses";
import dynamic from "next/dynamic";
const AddAddressDialog = dynamic(() => import("./AddAddressDialog"));
import { useDeleteAddress } from "../hooks/useDeleteAddress";
import Spinner from "@/components/Spinner";
import { useTranslations } from "next-intl";

// Types for the real API response
interface LocationEntity {
  id: number;
  name: string;
}

interface ApiAddress {
  id: number;
  building_name: string;
  floor_number: string;
  location: {
    country: LocationEntity & { shipping_cost: number };
    city: LocationEntity;
    district: LocationEntity;
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
  // حقول اختيارية في حال تمت إضافتها مستقبلاً من الباك إند
  name?: string;
  receiver_name?: string;
}

interface AddressesApiResponse {
  status: string;
  message: string;
  data: ApiAddress[];
}

export default function AddressesComponent() {
  const t = useTranslations("profile");
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);
  
  // Fetch data using your hook
  const { data, isPending, isFetching } = useAddresses() as { data: AddressesApiResponse | undefined, isPending: boolean, isFetching: boolean };

  // Delete mutation
  const deleteAddressMutation = useDeleteAddress();

  const handleDelete = (id: number) => {
    if (window.confirm(t("confirmDeleteAddress"))) {
      deleteAddressMutation.mutate(id, {
        onError: () => alert(t("deleteAddressError")),
      });
    }
  };

  // Extract the addresses array (defaults to an empty array if data is missing)
  const addresses = data?.data || [];

  // Check if we have any addresses to display
  const hasContent = addresses.length > 0;

  return (
    <div dir="rtl" className="max-w-4xl w-full mx-auto p-4 sm:p-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
            {t("myAddresses")}
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm lg:text-base">
            {t("manageAddressesDesc")}
          </p>
        </div>

        {/* Add New Address Button */}
        <button 
          onClick={() => setIsAddDialogOpen(true)}
          className="flex items-center justify-center gap-2 w-full sm:w-auto bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3 px-6 rounded-full shadow-sm transition-colors shrink-0 text-sm sm:text-base"
        >
          <PlusCircle className="w-5 h-5" strokeWidth={2} />
          <span>{t("addNewAddress")}</span>
        </button>
      </div>

      <AddAddressDialog isOpen={isAddDialogOpen} onClose={() => setIsAddDialogOpen(false)} />

      {/* Addresses List */}
      {isPending || isFetching ? (
        <div className="flex justify-center items-center py-20">
          <Spinner />
        </div>
      ) : !hasContent ? (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <div className="bg-white p-4 rounded-full mb-4 shadow-sm">
            <MapPin className="w-8 h-8 text-gray-400" strokeWidth={1.5} />
          </div>
          <p className="text-gray-600 font-bold text-sm sm:text-base mb-1">
            {t("noAddressesAdded")}
          </p>
          <p className="text-gray-400 text-xs sm:text-sm">
            {t("addAddressToFacilitate")}
          </p>
        </div>
      ) : (
        /* Address Cards */
        <div className="space-y-4 sm:space-y-6">
          {addresses.map((addr) => {
            // معالجة البيانات من الـ API
            const isDefault = addr.is_default || false;

            // بما أن الـ API لا يرسل اسم المستلم حالياً، نضع قيمة افتراضية أو نستخدم حقل الوصف
            const displayName =
              addr.name || addr.receiver_name || t("userName");

            // تكوين العنوان كاملاً من الكائنات المتداخلة
            const displayAddress = `${addr.location?.country?.name || ""} - ${addr.location?.city?.name || ""}، ${addr.location?.district?.name || ""}، ${t("building")} ${addr.building_name}، ${t("floor")} ${addr.floor_number}`;

            // تكوين رقم الجوال
            const displayPhone = addr.contact
              ? `+${addr.contact.phone_code}${addr.contact.phone}`
              : t("mobileNotAvailable");

            return (
              <div
                key={addr.id}
                className={`flex flex-col sm:flex-row justify-between gap-4 p-4 sm:p-6 rounded-2xl bg-white transition-shadow hover:shadow-md border ${
                  isDefault ? "border-amber-400" : "border-gray-200"
                }`}
              >
                {/* Right Side: Address Information */}
                <div className="flex-1 flex flex-col space-y-3 sm:space-y-4">
                  {/* Address Line */}
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    <MapPin
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0 mt-0.5"
                      strokeWidth={2}
                    />
                    <span className="text-gray-900 font-bold text-xs sm:text-sm lg:text-base leading-relaxed">
                      {displayAddress}
                    </span>
                  </div>

                  {/* Name Line */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <User
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0"
                      strokeWidth={2}
                    />
                    <span className="text-gray-800 font-bold text-xs sm:text-sm lg:text-base">
                      {displayName}
                    </span>
                  </div>

                  {/* Phone Line */}
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <Phone
                      className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500 shrink-0"
                      strokeWidth={2}
                    />
                    <span
                      className="text-gray-800 font-bold text-xs sm:text-sm lg:text-base"
                      dir="ltr"
                    >
                      {displayPhone}
                    </span>
                  </div>
                </div>

                {/* Left Side: Badge & Actions */}
                <div className="flex flex-row sm:flex-col justify-between items-center sm:items-end w-full sm:w-auto mt-2 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-none border-gray-100">
                  {/* Default Badge */}
                  {isDefault ? (
                    <div className="flex items-center gap-1.5 bg-[#f5a522] text-white px-3 py-1.5 rounded-lg text-xs sm:text-xs font-bold">
                      <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      <span>{t("default")}</span>
                    </div>
                  ) : (
                    <div className="hidden sm:block" />
                  )}

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 sm:gap-4 ml-auto sm:ml-0">
                    <button
                      title={t("edit")}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <SquarePen
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        strokeWidth={1.5}
                      />
                    </button>
                    <button
                      title={t("delete")}
                      onClick={() => handleDelete(addr.id)}
                      disabled={deleteAddressMutation.isPending}
                      className="text-red-500 hover:text-red-600 transition-colors p-1 disabled:opacity-50"
                    >
                      <Trash2
                        className="w-5 h-5 sm:w-6 sm:h-6"
                        strokeWidth={1.5}
                      />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
