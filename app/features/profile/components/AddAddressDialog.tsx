"use client";

import React, { useState, useEffect } from "react";
import { X, Check, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useCountries } from "../hooks/useCountries";
import { useCities } from "../hooks/useCities";
import { useDistricts } from "../hooks/useDistricts";
import { useCreateAddress } from "../hooks/useCreateAddress";
import { Country, City, District } from "@/app/types/order";
import { useTranslations } from "next-intl";

interface AddAddressDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddAddressDialog({ isOpen, onClose }: AddAddressDialogProps) {
  const t = useTranslations("profile");
  // Form State
  const [fullName, setFullName] = useState("");
  const [countryId, setCountryId] = useState<number | "">("");
  const [phone, setPhone] = useState("");
  const [cityId, setCityId] = useState<number | "">("");
  const [districtId, setDistrictId] = useState<number | "">("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [floor, setFloor] = useState("");
  const [isDefault, setIsDefault] = useState(false);

  // Success State
  const [showSuccess, setShowSuccess] = useState(false);

  // Queries
  const { data: countriesData, isPending: isCountriesPending } = useCountries();
  const { data: citiesData, isPending: isCitiesPending } = useCities(countryId || undefined);
  const { data: districtsData, isPending: isDistrictsPending } = useDistricts(cityId || undefined);

  // Mutation
  const createAddressMutation = useCreateAddress();

  const countries = countriesData?.data?.countries || [];
  const cities = citiesData?.data?.cities || [];
  const districts = districtsData?.data?.districts || [];

  // Derived state
  const selectedCountry = countries.find((c: Country) => c.id === countryId);

  // Set default country if not selected and countries are loaded
  useEffect(() => {
    if (countries.length > 0 && countryId === "") {
      setCountryId(countries[0].id);
    }
  }, [countries, countryId]);

  // Reset dependent fields when parent changes
  useEffect(() => {
    setCityId("");
    setDistrictId("");
  }, [countryId]);

  useEffect(() => {
    setDistrictId("");
  }, [cityId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!countryId || !cityId || !districtId || !phone || !building) {
      alert(t("fillRequiredFields"));
      return;
    }

    const payload = {
      country_id: countryId,
      city_id: cityId,
      district_id: districtId,
      building_name: building,
      floor_number: floor || undefined,
      is_default: isDefault,
      phone_code: selectedCountry?.phone_code,
      phone: phone,
      description: `${street} ${fullName ? `- ${fullName}` : ""}`, // mapping street and name to description
    };

    createAddressMutation.mutate(payload, {
      onSuccess: () => {
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          onClose();
          // Reset form
          setFullName("");
          setPhone("");
          setCityId("");
          setDistrictId("");
          setStreet("");
          setBuilding("");
          setFloor("");
          setIsDefault(false);
        }, 2000);
      },
      onError: (err) => {
        alert(t("errorSavingAddress"));
        console.error(err);
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm" 
        onClick={() => !showSuccess && onClose()} 
      />

      {/* Dialog */}
      <div className="relative bg-[#FAFAFA] rounded-3xl shadow-xl w-full max-w-lg overflow-hidden" dir="rtl">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-20 px-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-md">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              {t("addressSavedSuccessfully")}
            </h2>
          </div>
        ) : (
          <div className="flex flex-col h-full max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 pb-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                {t("addNewAddress")}
              </h2>
              <button 
                onClick={onClose}
                className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form Content */}
            <div className="p-4 sm:p-6 overflow-y-auto">
              <form id="add-address-form" onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                
                {/* Full Name */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">
                    {t("fullNameLabel").replace("*", "")}
                  </label>
                  <input 
                    type="text" 
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("enterFullName")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">
                    {t("mobileNumber")}
                  </label>
                  <div className="flex items-stretch w-full rounded-2xl border border-gray-200 bg-white overflow-hidden focus-within:border-amber-400 focus-within:ring-1 focus-within:ring-amber-400">
                    {/* Country Selector */}
                    <div className="relative border-l border-gray-200">
                      <select 
                        className="appearance-none bg-transparent h-full pl-4 pr-10 py-3 text-sm font-medium text-gray-700 outline-none cursor-pointer w-28 text-left opacity-0 absolute inset-0 z-10"
                        value={countryId}
                        onChange={(e) => setCountryId(Number(e.target.value))}
                      >
                        {countries.map((c: Country) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <div className="h-full px-3 flex items-center justify-between pointer-events-none gap-2">
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-bold text-gray-700" dir="ltr">+{selectedCountry?.phone_code || ""}</span>
                        {selectedCountry?.image?.url && (
                          <Image src={selectedCountry.image.url} alt="" width={20} height={14} className="rounded-sm object-cover" />
                        )}
                      </div>
                    </div>
                    
                    {/* Phone Input */}
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={t("enterMobileNumber")}
                      className="flex-1 px-4 py-3 bg-transparent outline-none border-none text-gray-900"
                      dir="ltr"
                    />
                  </div>
                </div>

                {/* City & District */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      {t("city")}
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white appearance-none text-gray-700"
                        value={cityId}
                        onChange={(e) => setCityId(Number(e.target.value))}
                        disabled={!countryId || isCitiesPending}
                      >
                        <option value="">{t("chooseCity")}</option>
                        {cities.map((c: City) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      {t("district")}
                    </label>
                    <div className="relative">
                      <select 
                        className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white appearance-none text-gray-700"
                        value={districtId}
                        onChange={(e) => setDistrictId(Number(e.target.value))}
                        disabled={!cityId || isDistrictsPending}
                      >
                        <option value="">{t("chooseDistrict")}</option>
                        {districts.map((d: District) => (
                          <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                      </select>
                      <ChevronDown className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Street & Building */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      {t("street")}
                    </label>
                    <input 
                      type="text" 
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder={t("streetPlaceholder")}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <label className="text-sm font-bold text-gray-800">
                      {t("buildingLabel")}
                    </label>
                    <input 
                      type="text" 
                      value={building}
                      onChange={(e) => setBuilding(e.target.value)}
                      placeholder={t("buildingPlaceholder")}
                      className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                    />
                  </div>
                </div>

                {/* Floor */}
                <div className="flex flex-col space-y-1.5">
                  <label className="text-sm font-bold text-gray-800">
                    {t("floorOptional")}
                  </label>
                  <input 
                    type="text" 
                    value={floor}
                    onChange={(e) => setFloor(e.target.value)}
                    placeholder={t("floorPlaceholder")}
                    className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 bg-white"
                  />
                </div>

                {/* Set as Default */}
                <div className="flex items-center gap-2 pt-2 pb-4">
                  <input 
                    type="checkbox" 
                    id="isDefault"
                    checked={isDefault}
                    onChange={(e) => setIsDefault(e.target.checked)}
                    className="w-5 h-5 rounded border-gray-300 text-amber-500 focus:ring-amber-500 accent-[#f5a522]"
                  />
                  <label htmlFor="isDefault" className="text-sm font-bold text-gray-800 cursor-pointer select-none">
                    {t("setAsDefault")}
                  </label>
                </div>

              </form>
            </div>

            {/* Footer Action */}
            <div className="p-4 sm:p-6 border-t border-gray-200 bg-[#FAFAFA]">
              <button 
                type="submit"
                form="add-address-form"
                disabled={createAddressMutation.isPending}
                className="w-full bg-[#f5a522] hover:bg-[#df9011] text-white font-bold py-3.5 px-6 rounded-full shadow-sm transition-colors flex items-center justify-center gap-2 text-base disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {createAddressMutation.isPending ? t("saving") : t("saveAddress")}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
