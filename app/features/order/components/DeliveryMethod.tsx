"use client";
import BranchesSelect, { Branch } from "./BranchesSelect";
import AddressesSelect, { Address } from "./AddressesSelect";
import { useAddresses } from "../hooks/useAddresses";
import { useBranches } from "../hooks/useBranches";

type DeliveryMethodProps = {
  selectedBranchId: number | null;
  selectedAddressId: number | null;
  setSelectedBranchId: (id: number) => void;
  setSelectedAddressIdId: React.Dispatch<React.SetStateAction<number | null>>;
};

export default function CheckoutOptions({
  selectedBranchId,
  selectedAddressId,
  setSelectedBranchId,
  setSelectedAddressIdId,
}: DeliveryMethodProps) {
  const { data: addressData } = useAddresses();
  const addresses = (addressData?.data ?? []) as Address[];

  const { data: branchData } = useBranches();
  const branches = (branchData?.data?.branches ?? []) as Branch[];

  const selectedDeliveryMode: "branch" | "address" | null =
    selectedBranchId !== null
      ? "branch"
      : selectedAddressId !== null
        ? "address"
        : null;

  const handleBranchSelection = (id: number) => {
    setSelectedBranchId(id);
    setSelectedAddressIdId(null);
  };

  const handleAddressSelection = (id: number) => {
    setSelectedAddressIdId(id);
    setSelectedBranchId(null as unknown as number);
  };

  return (
    <div
      dir="rtl"
      className="w-full max-w-[520px] p-6 border rounded-2xl border-gray-200 bg-white font-sans text-gray-900 mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">طريقة الاستلام</h2>
      <div className="flex flex-col-reverse gap-4">
        {selectedDeliveryMode !== "address" && (
          <BranchesSelect
            branches={branches}
            selectedBranchId={selectedBranchId}
            setSelectedBranchId={handleBranchSelection}
          />
        )}

        {selectedDeliveryMode !== "branch" && (
          <AddressesSelect
            addresses={addresses}
            selectedAddressIdId={selectedAddressId}
            setSelectedAddressIdIdId={handleAddressSelection}
          />
        )}
      </div>
    </div>
  );
}
