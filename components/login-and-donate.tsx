"use client";

import SwapForm from "@/components/swap-form";

export default function LoginAndDonate() {
  return (
    <div className="container mx-auto p-4 relative">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <SwapForm />
      </div>
    </div>
  );
}
