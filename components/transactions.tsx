'use client';

import { useState, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import { Search } from 'lucide-react';

type Transaction = {
  senderAddress: string;
  amountInUSDC: string;
  timestamp: string;
};

export default function Transactions({ transactions }: { transactions?: Transaction[] }) {
  transactions = transactions || [];
  const [search, setSearch] = useState('');

  const formatAddress = (address: string) => {
    if (!address) return '';
    return address;
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const groupedData = useMemo(() => {
    if (!search) return transactions;
    return transactions.filter((transaction) => transaction.senderAddress.toLowerCase().includes(search.toLowerCase()));
  }, [transactions, search]);

  if (!groupedData.length) {
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
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      </div>
      <div className="overflow-y-auto flex-grow">
        <Table>
          <TableBody>
            {groupedData.map((transaction, index) => (
              <TableRow
                key={transaction.senderAddress + transaction.timestamp}
                className={index % 2 === 1 ? 'bg-gray-50' : ''}
              >
                <TableCell className="flex flex-col py-4">
                  <span className="font-bold text-gray-800">{formatAddress(transaction.senderAddress)}</span>
                  <span className="text-sm text-gray-400 font-medium">{formatDate(transaction.timestamp)}</span>
                </TableCell>
                <TableCell className="text-right py-4">
                  <span className="font-bold text-teal-600">${transaction.amountInUSDC}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
