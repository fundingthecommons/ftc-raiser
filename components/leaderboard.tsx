"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { ArrowUpDown, Search } from "lucide-react";

type LeaderboardEntry = {
	address: string;
	tokenAmount: number;
};

type SortDirection = "asc" | "desc";

const MOCK_DATA: LeaderboardEntry[] = [
	{ address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e", tokenAmount: 1000 },
	{ address: "0x123d35Cc6634C0532925a3b844Bc454e4438f123", tokenAmount: 750 },
	{ address: "0xAB2d35Cc6634C0532925a3b844Bc454e4438fABC", tokenAmount: 1200 },
	{ address: "0xDEFd35Cc6634C0532925a3b844Bc454e4438fDEF", tokenAmount: 500 },
	{ address: "0x456d35Cc6634C0532925a3b844Bc454e4438f456", tokenAmount: 2000 },
];

export default function Leaderboard({
	initialData = MOCK_DATA,
}: { initialData?: LeaderboardEntry[] }) {
	//eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [data, setData] = useState<LeaderboardEntry[]>(initialData);
	const [sortColumn, setSortColumn] = useState<"address" | "tokenAmount">(
		"tokenAmount",
	);
	const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
	const [search, setSearch] = useState("");
	const [amountFilter, setAmountFilter] = useState("all");

	const handleSort = (column: "address" | "tokenAmount") => {
		if (column === sortColumn) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortColumn(column);
			setSortDirection("asc");
		}
	};

	const filteredAndSortedData = useMemo(() => {
		return data
			.filter((entry) =>
				entry.address.toLowerCase().includes(search.toLowerCase()),
			)
			.filter((entry) => {
				if (amountFilter === "all") return true;
				const [min, max] = amountFilter.split("-").map(Number);
				return entry.tokenAmount >= min && entry.tokenAmount < max;
			})
			.sort((a, b) => {
				if (sortColumn === "address") {
					return sortDirection === "asc"
						? a.address.localeCompare(b.address)
						: b.address.localeCompare(a.address);
				} else {
					return sortDirection === "asc"
						? a.tokenAmount - b.tokenAmount
						: b.tokenAmount - a.tokenAmount;
				}
			});
	}, [data, sortColumn, sortDirection, search, amountFilter]);

	return (
		<div className="container mx-auto p-4">
			<h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
			<div className="flex flex-col sm:flex-row gap-4 mb-4">
				<div className="relative flex-grow">
					<Input
						type="text"
						placeholder="Search by address"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-10"
					/>
					<Search
						className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
						size={20}
					/>
				</div>
				<Select value={amountFilter} onValueChange={setAmountFilter}>
					<SelectTrigger className="w-full sm:w-[180px]">
						<SelectValue placeholder="Filter by amount" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">All amounts</SelectItem>
						<SelectItem value="0-1000">0 - 1,000</SelectItem>
						<SelectItem value="1000-5000">1,000 - 5,000</SelectItem>
						<SelectItem value="5000-10000">5,000 - 10,000</SelectItem>
						<SelectItem value="10000-100000">10,000+</SelectItem>
					</SelectContent>
				</Select>
			</div>
			<div className="overflow-x-auto">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px]">Rank</TableHead>
							<TableHead>
								<Button variant="ghost" onClick={() => handleSort("address")}>
									Address
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>
							<TableHead>
								<Button
									variant="ghost"
									onClick={() => handleSort("tokenAmount")}
								>
									Token Amount
									<ArrowUpDown className="ml-2 h-4 w-4" />
								</Button>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredAndSortedData.map((entry, index) => (
							<TableRow key={entry.address}>
								<TableCell className="font-medium">{index + 1}</TableCell>
								<TableCell>{entry.address}</TableCell>
								<TableCell>{entry.tokenAmount.toLocaleString()}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
