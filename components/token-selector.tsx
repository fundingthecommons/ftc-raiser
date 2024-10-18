'use client'

import { TokenBalance } from 'alchemy-sdk'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export type TokenSelectorProps = {
    tokens: TokenBalance[]
    selectedToken: string
    onSelectChange: (value: string) => void
}

export default function TokenSelector({tokens, selectedToken, onSelectChange}: TokenSelectorProps) {
    return (
        <div className="p-4">
            <h2 className="text-xl mb-4">Token</h2>
            <Select onValueChange={onSelectChange} value={selectedToken}>
                <SelectTrigger className="w-[300px]">
                    <SelectValue placeholder="Select a token"/>
                </SelectTrigger>
                <SelectContent>
                    {tokens.map((token, index) => (
                        <SelectItem key={index} value={token.contractAddress}>
                            {token.symbol || token.contractAddress}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedToken && (
                <p className="mt-4">
                    Selected token: {selectedToken}
                </p>
            )}
        </div>
    )
}