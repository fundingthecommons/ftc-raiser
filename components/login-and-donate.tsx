"use client"

import {useAccount,} from "wagmi"
import SwapForm from "@/components/swap-form";

export default function LoginAndDonate() {
    const {isConnected} = useAccount()

    return (
        <div className="container mx-auto p-4">
            {!isConnected ? undefined : (
                <SwapForm/>
            )}
        </div>
    )
}