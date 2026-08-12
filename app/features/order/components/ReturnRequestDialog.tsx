"use client";

import React, { useState, useRef } from "react";
import { X, Check, Upload, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useReturnRequest } from "../hooks/useReturnRequest";
import { uploadMedia } from "../orderApi";
import { Order, OrderItem } from "@/app/types/order";

interface ReturnRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  order: Order | undefined;
}

export default function ReturnRequestDialog({
  isOpen,
  onClose,
  order,
}: ReturnRequestDialogProps) {
  const { mutate: submitReturn, isPending } = useReturnRequest();

  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [requestType, setRequestType] = useState<"return" | "exchange" | null>(null);
  const [reason, setReason] = useState<string>("changed_mind");
  const [isReasonDropdownOpen, setIsReasonDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleItemToggle = (itemId: number) => {
    setSelectedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    if (selectedItems.length === 0 || !requestType || !selectedImage || !order) {
      // Basic validation, could add toast here
      return;
    }

    try {
      setIsUploading(true);
      // Upload media first
      const uploadRes = await uploadMedia(selectedImage);
      const imageHash = uploadRes?.data?.hash;

      if (!imageHash) {
        throw new Error("No image hash returned");
      }

      // Build JSON payload
      const payload = {
        order_id: order.id,
        type: requestType,
        reason: reason,
        items: selectedItems.map((itemId) => ({
          order_item_id: itemId,
          image: imageHash,
        }))
      };

      submitReturn(payload, {
        onSuccess: () => {
          setIsSuccess(true);
        },
      });
    } catch (error) {
      console.error("Failed to upload image or submit return request", error);
    } finally {
      setIsUploading(false);
    }
  };

  const resetAndClose = () => {
    setIsSuccess(false);
    setSelectedItems([]);
    setRequestType(null);
    setReason("changed_mind");
    setSelectedImage(null);
    setImagePreview(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div
        dir="rtl"
        className="bg-white rounded-3xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl relative"
      >
        {isSuccess ? (
          <div className="p-10 flex flex-col items-center justify-center text-center">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-green-500/30">
              <Check className="w-10 h-10 text-white" strokeWidth={3} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">تم إرسال الطلب بنجاح</h2>
            <p className="text-gray-500 mb-8">نعمل على مراجعته الآن وسيتم الرد عليك قريبًا.</p>
            <button
              onClick={resetAndClose}
              className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-full transition-colors"
            >
              حسنًا
            </button>
          </div>
        ) : (
          <div className="p-6 sm:p-8">
            {/* Header */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">طلب استرجاع / استبدال</h2>
                <p className="text-sm text-gray-500">استرجاع أو استبدال المنتج بعد الاستلام</p>
              </div>
              <button
                onClick={resetAndClose}
                className="p-2 bg-gray-50 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Items List */}
            <div className="space-y-4 mb-8">
              {order?.items?.map((item: OrderItem) => (
                <div key={item.id} className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <label className="relative flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="peer sr-only"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => handleItemToggle(item.id)}
                      />
                      <div className="w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-amber-500 peer-checked:border-amber-500 transition-colors flex items-center justify-center">
                        {selectedItems.includes(item.id) && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                    </label>
                    <span className="font-bold text-sm text-gray-800 line-clamp-2">
                      {item.product?.name}
                    </span>
                  </div>
                  <div className="w-12 h-12 bg-gray-50 rounded-full border border-gray-100 overflow-hidden flex items-center justify-center p-1 shrink-0">
                    <Image
                      src={item.product?.image?.url || "/images/new-arrival.png"}
                      alt={item.product?.name || "Product"}
                      width={48}
                      height={48}
                      className="object-contain w-full h-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Request Type */}
            <div className="mb-6">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">حدد نوع الطلب</h3>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setRequestType("return")}
                  className={`py-3 rounded-xl border font-bold text-sm transition-colors ${requestType === "return"
                      ? "border-amber-500 bg-amber-50 text-amber-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  استرجاع
                </button>
                <button
                  onClick={() => setRequestType("exchange")}
                  className={`py-3 rounded-xl border font-bold text-sm transition-colors ${requestType === "exchange"
                      ? "border-amber-500 bg-amber-50 text-amber-600"
                      : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                >
                  استبدال
                </button>
              </div>
            </div>

            {/* Reason */}
            <div className="mb-6 relative">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">سبب الطلب</h3>
              <button
                onClick={() => setIsReasonDropdownOpen(!isReasonDropdownOpen)}
                className="w-full flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="text-sm font-medium text-gray-700">تغيير الرأي</span>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isReasonDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Dummy dropdown content since we only have one reason for now */}
              {isReasonDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-10 p-1">
                  <button
                    onClick={() => {
                      setReason("changed_mind");
                      setIsReasonDropdownOpen(false);
                    }}
                    className="w-full text-right px-4 py-2 hover:bg-amber-50 rounded-lg text-sm text-gray-700"
                  >
                    تغيير الرأي
                  </button>
                </div>
              )}
            </div>

            {/* Image Upload */}
            <div className="mb-8">
              <h3 className="font-bold text-gray-900 mb-3 text-sm">ارفاق صورة المنتج</h3>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-200 bg-gray-50 rounded-2xl p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-100 transition-colors relative overflow-hidden"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />

                {imagePreview ? (
                  <div className="absolute inset-0">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover opacity-50" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                      <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-700 shadow-sm">تغيير الصورة</span>
                    </div>
                  </div>
                ) : (
                  <>
                    <Upload className="w-6 h-6 text-gray-400 mb-2" />
                    <span className="text-xs text-gray-400 font-medium">تحميل صورة المنتج</span>
                  </>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={resetAndClose}
                className="flex-1 py-4 border-2 border-amber-400 text-amber-500 hover:bg-amber-50 font-bold rounded-full transition-colors"
              >
                إلغاء
              </button>
              <button
                onClick={handleSubmit}
                disabled={isPending || isUploading || selectedItems.length === 0 || !requestType || !selectedImage}
                className="flex-1 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isPending || isUploading ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  "تأكيد"
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
