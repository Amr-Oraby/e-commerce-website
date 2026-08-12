"use client";

import React, { useState } from "react";
import ReturnsHeader from "@/app/features/profile/components/ReturnsHeader";
import ReturnsList from "@/app/features/profile/components/ReturnsList";
import ReturnsToggle from "@/app/features/profile/components/ReturnsToggle";

type TabType = "returns" | "replacements";

function Page() {
  const [activeTab, setActiveTab] = useState<TabType>("returns");

  return (
    <div>
      <ReturnsHeader />
      <ReturnsToggle activeTab={activeTab} setActiveTab={setActiveTab} />
      <ReturnsList activeTab={activeTab} />
    </div>
  );
}

export default Page;
