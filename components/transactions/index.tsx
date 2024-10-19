"use client";

import { Search } from "lucide-react";
import { useState, useMemo } from "react";

import { Input } from "@/components/ui/input";
import { Table, TableBody } from "@/components/ui/table";
import { Transaction } from "@/app/api/transactions/route";

import { TransactionRow } from "./transaction-row";

export default function Transactions({
  transactions,
}: {
  transactions?: Transaction[];
}) {
  const [search, setSearch] = useState("");

  const filteredTxs = useMemo(() => {
    if (!transactions) return [];
    if (!search) return transactions;

    const lowercasedSearch = search.toLowerCase();
    return transactions.filter((transaction) => {
      if (!transaction.senderAddress) return false;

      const address = transaction.senderAddress.toLowerCase();
      const ensName = transaction.ensName?.toLowerCase();

      return (
        address.includes(lowercasedSearch) ||
        (ensName && ensName.includes(lowercasedSearch))
      );
    });
  }, [transactions, search]);

  if (!transactions) {
    return <div>No transactions found.</div>;
  }

  return (
    <div className="container mx-auto pt-4 px-4 h-screen flex flex-col">
      <div className="relative mb-4 w-64">
        <Input
          type="text"
          placeholder="Search by address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10 bg-gray-100 rounded-full border-none text-gray-400"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="overflow-y-auto flex-grow">
        <Table>
          <TableBody>
            {filteredTxs.map((transaction, index) => (
              <TransactionRow
                key={transaction.senderAddress + transaction.timestamp}
                transaction={transaction}
                isEven={index % 2 === 0}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
