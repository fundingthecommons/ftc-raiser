"use client";

import React, {useEffect, useState} from "react";
import {ChainId, executeRoute, getRoutes, Route} from "@lifi/sdk";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger,} from "@/components/ui/accordion";
import {useAccount, useBalance} from "wagmi";
import TokenSelector, {ExtendedTokenBalance,} from "@/components/token-selector";
import {fetchAllSupportedTokensFromLiFi, fetchTokenBalances, fetchTokenMetadata,} from "@/lib/tokenUtils";
import {parseUnits} from "viem";

export default function SwapForm() {
    const [amount, setAmount] = useState("");
    const [tokenAddress, setTokenAddress] = useState("");
    const [tokens, setTokens] = useState<ExtendedTokenBalance[]>([]);
    const [result, setResult] = useState<Route[] | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {address, chainId} = useAccount();
    const [selectedToken, setSelectedToken] =
        useState<ExtendedTokenBalance | null>(null);
    const [isDonating, setIsDonating] = useState(false);
    const [txStatus, setTxStatus] = useState<"idle" | "pending" | "success">(
        "idle"
    );
    const balance = useBalance({
        address,
    })
    const {chain} = useAccount();

    useEffect(() => {
            const loadTokens = async () => {
                if (!chainId || !address || !chain) {
                    setTokens([]);
                    return;
                }

                try {
                    const [supportedTokens, balances] = await Promise.all([
                        fetchAllSupportedTokensFromLiFi(chainId),
                        fetchTokenBalances(address, chainId),
                    ]);

                    const filteredTokens = balances.filter(
                        (token) => BigInt(token.tokenBalance || "0") > BigInt(0),
                    );

                    const supportedTokenAddresses = new Set(
                        supportedTokens?.tokens[chainId]?.map((token) =>
                            token.address.toLowerCase(),
                        ) || [],
                    );

                    const overlappingTokens = filteredTokens.filter((token) =>
                        supportedTokenAddresses.has(token.contractAddress.toLowerCase()),
                    );

                    const tokensWithMetadata = await fetchTokenMetadata(
                        overlappingTokens,
                        chainId,
                    );

                    const nativeToken = {
                        contractAddress: "0x0000000000000000000000000000000000000000",
                        tokenBalance: balance.value,
                        name: chain.nativeCurrency.name || "Native",
                        symbol: chain.nativeCurrency.symbol || "",
                        decimals: chain.nativeCurrency.decimals,
                        logo: null,
                    };

                    setTokens([nativeToken, ...tokensWithMetadata]);
                } catch
                    (error) {
                    console.error("Failed to fetch and process tokens:", error);
                }
            };

            loadTokens();
        }
        ,
        [chainId, address]
    )
    ;

    const handleSubmitQuote = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setResult(null);

        try {
            if (!address || !chainId || !selectedToken?.contractAddress || !selectedToken?.decimals) {
                throw new Error("No wallet or chain found.");
            }

            const amountInWei = parseUnits(amount, selectedToken.decimals);

            const result = await getRoutes({
                fromAddress: address,
                fromChainId: chainId,
                toChainId: ChainId.OPT,
                fromTokenAddress:
                    selectedToken.contractAddress || "0x0000000000000000000000000000000000000000",
                toTokenAddress: "0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85",
                fromAmount: amountInWei.toString(),
                toAddress: "0xEe6196D67586f813a17E64f0dD7000D53edcb1aF",
            });


            // Select the most optimal route (maximum donation output)
            const optimalRoute = result.routes.reduce((max, route) =>
                BigInt(route.toAmount) > BigInt(max.toAmount) ? route : max
            );

            setResult([optimalRoute]);
        } catch (err) {
            setError("An error occurred while fetching the quote. Please try again.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitOrder = async (route: Route) => {
        setIsDonating(true);
        setTxStatus("pending");
        setError(null);
        try {
            const executedRoute = await executeRoute(route, {
                updateRouteHook(updatedRoute) {
                    console.log("updateRouteHook", updatedRoute);
                },
            });

            console.log("executedRoute", executedRoute);
            // Handle successful donation here (e.g., show a success message)
        } catch (error) {
            console.error("Failed to execute route:", error);
            setError("Failed to process donation. Please try again.");
            setTxStatus("idle");
        } finally {
            setIsDonating(false);
        }
    };

    const handleTokenChange = (value: string) => {
        setTokenAddress(value);
        const token = tokens.find((t) => t.contractAddress === value);
        setSelectedToken(token || null);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Donate</CardTitle>
                <CardDescription>
                    Support the project by donating crypto
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmitQuote}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">{`Amount (${
                                selectedToken?.symbol || "ETH"
                            })`}</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder={`Enter amount in ${
                                    selectedToken?.symbol || "ETH"
                                }`}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                step="0.001"
                                min="0"
                            />
                        </div>
                        <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="advanced-options">
                                <AccordionTrigger>Advanced Options</AccordionTrigger>
                                <AccordionContent>
                                    <TokenSelector
                                        tokens={tokens}
                                        selectedToken={tokenAddress}
                                        onSelectChange={handleTokenChange}
                                    />
                                </AccordionContent>
                            </AccordionItem>
                        </Accordion>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                        <Button
                            type="submit"
                            className={`text-gray-700 font-semibold ${
                                result && result.length > 0
                                    ? "w-auto px-4 bg-gray-200 hover:bg-gray-300"
                                    : "w-full bg-primary text-primary-foreground"
                            }`}
                            disabled={isLoading || isDonating}
                        >
                            {isLoading
                                ? "Loading..."
                                : result && result.length > 0
                                    ? "Get another quote"
                                    : "Get quote"}
                        </Button>
                        {result && result.length > 0 && (
                            <Button
                                onClick={() => handleSubmitOrder(result[0])}
                                className={`flex-grow ml-2 font-semibold ${
                                    txStatus === "success"
                                        ? "bg-green-500 hover:bg-green-600"
                                        : "bg-blue-500 hover:bg-blue-600"
                                } text-white`}
                                disabled={isLoading || isDonating}
                            >
                                {isDonating
                                    ? "Processing..."
                                    : txStatus === "success"
                                        ? "Donated!"
                                        : "Donate"}
                            </Button>
                        )}
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {result && result.length > 0 && (
                    <div className="w-full p-4 bg-gray-100 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
              <span className="font-medium">
                From {result[0].fromToken.symbol}
              </span>
                            <span>
                {parseFloat(result[0].fromAmount) /
                    10 ** result[0].fromToken.decimals}
              </span>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="font-medium">To {result[0].toToken.symbol}</span>
                            <span>
                {parseFloat(result[0].toAmount) /
                    10 ** result[0].toToken.decimals}
              </span>
                        </div>
                        <div className="text-sm text-gray-600">
                            Estimated gas cost: {result[0].gasCostUSD} USD
                        </div>
                    </div>
                )}
                {error && <div className="text-red-500 mt-2">{error}</div>}
                {txStatus === "success" && (
                    <div className="text-green-500 mt-2">Transaction successful!</div>
                )}
            </CardFooter>
        </Card>
    );
}
