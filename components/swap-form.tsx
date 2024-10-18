'use client'

import React, {useEffect, useState} from 'react'
import {ChainId, executeRoute, getRoutes, Route} from '@lifi/sdk'
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {useAccount} from "wagmi"
import TokenSelector, {ExtendedTokenBalance} from "@/components/token-selector"
import {fetchAllSupportedTokensFromLiFi, fetchTokenBalances, fetchTokenMetadata} from "@/lib/tokenUtils"

export default function SwapForm() {
    const [amount, setAmount] = useState('')
    const [tokenAddress, setTokenAddress] = useState('')
    const [tokens, setTokens] = useState<ExtendedTokenBalance[]>([])
    const [result, setResult] = useState<Route[] | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const {address, chainId, isConnected} = useAccount()

    useEffect(() => {
        const loadTokens = async () => {
            if (!chainId || !address) {
                setTokens([]);
                return;
            }

            try {
                const [supportedTokens, balances] = await Promise.all([
                    fetchAllSupportedTokensFromLiFi(chainId),
                    fetchTokenBalances(address, chainId)
                ]);

                const filteredTokens = balances.filter(token =>
                    BigInt(token.tokenBalance || '0') > BigInt(0)
                );

                const supportedTokenAddresses = new Set(
                    supportedTokens?.tokens[chainId]?.map(token =>
                        token.address.toLowerCase()
                    ) || []
                );

                const overlappingTokens = filteredTokens.filter(token =>
                    supportedTokenAddresses.has(token.contractAddress.toLowerCase())
                );

                const tokensWithMetadata = await fetchTokenMetadata(overlappingTokens, chainId);
                setTokens(tokensWithMetadata);
            } catch (error) {
                console.error("Failed to fetch and process tokens:", error);
            }
        };

        loadTokens();
    }, [chainId, address]);

    const handleSubmitQuote = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setResult(null)

        try {
            if (!address || !chainId) {
                throw new Error('No wallet or chain found.')
            }
            const amountInWei = BigInt(parseFloat(amount) * 1e18).toString()
            const result = await getRoutes({
                fromAddress: address,
                fromChainId: chainId,
                toChainId: ChainId.OPT,
                fromTokenAddress: tokenAddress || '0x0000000000000000000000000000000000000000',
                toTokenAddress: '0x0b2C639c533813f4Aa9D7837CAf62653d097Ff85',
                fromAmount: amountInWei,
                toAddress: '0xEe6196D67586f813a17E64f0dD7000D53edcb1aF'
            })

            setResult(result.routes)
        } catch (err) {
            setError('An error occurred while fetching the quote. Please try again.')
            console.error(err)
        } finally {
            setIsLoading(false)
        }
    }

    const handleSubmitOrder = async (route: Route) => {
        try {
            const executedRoute = await executeRoute(route, {
                updateRouteHook(route) {
                    console.log(route)
                },
            })
            console.log(executedRoute)
        } catch (error) {
            console.error("Failed to execute route:", error)
        }
    }

    const handleTokenChange = (value: string) => {
        setTokenAddress(value)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Donate</CardTitle>
                <CardDescription>Enter the amount you want to donate, we handle bridging and swapping</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmitQuote}>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount (ETH)</Label>
                            <Input
                                id="amount"
                                type="number"
                                placeholder="Enter amount in ETH"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                                step="0.01"
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
                    {!isConnected ? (
                        <w3m-connect-button/>
                    ) : (
                        <div>
                            <Button className="w-full mt-4" type="submit" disabled={isLoading}>
                                {isLoading ? 'Loading...' : 'Get quote'}
                            </Button>
                        </div>
                    )}
                </form>
            </CardContent>
            <CardFooter className="flex flex-col items-start">
                {result && (
                    <div>

                        {
                            result.map((route, index) => (
                                <div key={index} className="flex flex-col space-y-1.5">
                                    <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        {route.fromToken.symbol}
                                    </span>
                                        <span>
                                        {route.fromAmount}
                                    </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                    <span className="font-medium">
                                        {route.toToken.symbol}
                                    </span>
                                        <span>
                                        {route.toAmount}
                                    </span>
                                    </div>
                                    <button onClick={() => handleSubmitOrder(route)}>Donate</button>
                                </div>
                            ))
                        }
                    </div>
                )}
                {error && (
                    <div className="text-red-500 mt-2">
                        {error}
                    </div>
                )}
            </CardFooter>
        </Card>
    )
}