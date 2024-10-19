"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { Transaction } from "@/app/api/transactions/route";
import { humanReadableDate } from "@/lib/dates";

export function TransactionRow({
  transaction,
  isEven,
}: {
  transaction: Transaction;
  isEven: boolean;
}) {
  const displayName = transaction.ensName || transaction.senderAddress;

  console.log(transaction);

  return (
    <TableRow className={isEven ? "" : "bg-gray-50"}>
      <TableCell className="flex flex-col py-4">
        <span className="font-bold text-gray-800">{displayName}</span>
        <span className="text-sm text-gray-400 font-medium">
          {humanReadableDate(transaction.timestamp)}
        </span>
      </TableCell>
      <TableCell className="text-right py-4">
        <span className="font-bold text-teal-600">
          ${transaction.amountInUSDC}
        </span>
      </TableCell>
    </TableRow>
  );
}
