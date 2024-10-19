"use client";

import { useState } from "react";
import { useAccount, useSendTransaction } from "wagmi";
import { getAddress, parseEther } from "viem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import ConnectButton from "@/components/connect-button";

export default function LoginAndDonate() {
	const { isConnected } = useAccount();
	const { sendTransaction } = useSendTransaction();

	const [tokenAddress, setTokenAddress] = useState("");
	const [amount, setAmount] = useState("");

	const handleDonate = async () => {
		if (!tokenAddress || !amount) {
			toast({
				title: "Error",
				description: "Please fill in both token address and amount.",
				variant: "destructive",
			});
			return;
		}

		try {
			const tx = sendTransaction({
				to: getAddress(tokenAddress),
				value: parseEther(amount),
			});


			toast({
				title: "Transaction Sent",
				description: `Transaction hash: n/a`,
			});
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to send transaction. Please try again.",
				variant: "destructive",
			});
			console.error(error);
		}
	};

	return (
		<div className="container mx-auto p-4">
			{!isConnected ? (
				<></>
			) : (
				<div className="flex flex-col space-y-4">
					<form onSubmit={(e) => e.preventDefault()} className="space-y-4">
						<h4 className="text-2xl font-semibold mb-4">Support local NGOs</h4>

						<div className="space-y-2">
							<Label htmlFor="tokenAddress">Token Address</Label>
							<Input
								id="tokenAddress"
								placeholder="0x..."
								value={tokenAddress}
								onChange={(e) => setTokenAddress(e.target.value)}
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="amount">Amount</Label>
							<Input
								id="amount"
								type="number"
								step="0.000000000000000001"
								min="0"
								placeholder="0.0"
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
							/>
						</div>
						<Button onClick={handleDonate} className="w-full">
							Donate
						</Button>
					</form>
					<div className="flex justify-center space-y-2">
						<ConnectButton />
					</div>
				</div>
			)}
		</div>
	);
}
