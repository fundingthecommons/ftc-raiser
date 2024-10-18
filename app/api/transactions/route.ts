import { NextResponse } from "next/server";
import axios from "axios";
import { ENSResolver } from "@/lib/ens";

export type Transaction = {
  senderAddress: string;
  ensName: string | null;
  amountInUSDC: string;
  timestamp: string;
};

const LIFI_API_TRANSFERS_URL = process.env.LIFI_API_TRANSFERS_URL;
const RECEIVER_ADDRESS = process.env.FUNDS_RECEIVER_ADDRESS;

async function getFilteredTransfers(walletAddress: string) {
  if (!walletAddress) {
    throw new Error("Wallet address is required");
  }

  if (!LIFI_API_TRANSFERS_URL) {
    throw new Error("LIFI_API_TRANSFERS_URL environment variable is not set");
  }

  const result = await axios.get(LIFI_API_TRANSFERS_URL, {
    params: {
      wallet: walletAddress,
      status: "DONE",
    },
  });

  if (!result.data?.transfers?.length) {
    return [];
  }

  const ensResolver = new ENSResolver();
  const transactions = [];

  for (const transfer of result.data.transfers) {
    const ensName = await ensResolver.resolveAddress(transfer.fromAddress);
    transactions.push({
      senderAddress: transfer.fromAddress,
      ensName,
      amountInUSDC: (transfer.receiving.amount / 1e6).toFixed(2),
      timestamp: new Date(transfer.receiving.timestamp * 1000).toISOString(),
    });
  }
  return transactions;
}

export async function GET() {
  if (!RECEIVER_ADDRESS) {
    throw new Error("FUNDS_RECEIVER_ADDRESS environment variable is not set");
  }

  try {
    const data = await getFilteredTransfers(RECEIVER_ADDRESS);
    return NextResponse.json(data);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error("Error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to fetch transactions" },
      { status: 500 }
    );
  }
}
