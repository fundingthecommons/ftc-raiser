import Leaderboard from "@/components/leaderboard";
import LoginAndDonate from "@/components/login-and-donate";
import OrganizationCards from "@/components/organization-cards";
import Link from "next/link";
import {ArrowRight} from "lucide-react";
import HypercertDetails from "@/components/hypercert-details";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <div className="flex gap-4 items-center flex-col">
                    <HypercertDetails/>
                    <OrganizationCards/>
                    <Leaderboard/>
                    <Link href="/distribution/11155111/0x3836188746D85F15ba932FE14424DEbBdC0Cf9FD">
                        Inspect donation flows
                        <ArrowRight className="ml-2 h-4 w-4"/>
                    </Link>
                    <LoginAndDonate/>
                </div>
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://www.fundingthecommons.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Built at Funding the Commons
                </a>
            </footer>
        </div>
    );
}
