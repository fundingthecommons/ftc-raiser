"use client"

import {useState} from "react"
import {useAccount, useSendTransaction} from "wagmi"
import {getAddress, parseEther} from "viem"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {toast} from "@/hooks/use-toast";
import ConnectButton from "@/components/connect-button";
import {ChainId, getQuote} from '@lifi/sdk'
import SwapForm from "@/components/swap-form";

export default function LoginAndDonate() {
    const {isConnected} = useAccount()
    const {sendTransaction} = useSendTransaction()

    const [tokenAddress, setTokenAddress] = useState("")
    const [amount, setAmount] = useState("")

    const handleDonate = async () => {
        if (!tokenAddress || !amount) {
            toast({
                title: "Error",
                description: "Please fill in both token address and amount.",
                variant: "destructive",
            })
            return
        }

        try {
            const tx = sendTransaction({
                to: getAddress(tokenAddress),
                value: parseEther(amount),
            })

            console.log("Tx: ", tx)

            toast({
                title: "Transaction Sent",
                description: `Transaction hash: n/a`,
            })
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to send transaction. Please try again.",
                variant: "destructive",
            })
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            {!isConnected ? (
                <ConnectButton/>
            ) : (
                <SwapForm/>
            )}
        </div>
    )
}