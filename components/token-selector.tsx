"use client";

import {TokenBalance, TokenMetadataResponse} from "alchemy-sdk";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {formatUnits} from "viem";

export type ExtendedTokenBalance = TokenBalance & TokenMetadataResponse;

export type TokenSelectorProps = {
    tokens: ExtendedTokenBalance[];
    selectedToken: string;
    onSelectChange: (value: string) => void;
};

export default function TokenSelector({
                                          tokens,
                                          selectedToken,
                                          onSelectChange,
                                      }: TokenSelectorProps) {
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
                            {token.symbol || token.contractAddress}{"  "}
                            {token.tokenBalance && token.decimals && <span
                                className="text-xs text-gray-500">{Number(formatUnits(BigInt(token.tokenBalance), token.decimals)).toFixed(4)}</span>}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {selectedToken && <p className="mt-4">Selected token: {selectedToken}</p>}
        </div>
    );
}
