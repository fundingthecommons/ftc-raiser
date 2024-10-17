// app/page.tsx
import Navbar from "@/components/nav-bar";
import OrganizationCards from "@/components/organization-cards";
import Leaderboard from "@/components/leaderboard";
import LoginAndDonate from "@/components/login-and-donate";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex flex-col items-center justify-center flex-grow p-8 gap-8">
                <OrganizationCards />
                <Leaderboard />
                <Link href="/distribution/11155111/0x3836188746D85F15ba932FE14424DEbBdC0Cf9FD">
                    Inspect donation flows
                    <ArrowRight className="ml-2 h-4 w-4"/>
                </Link>
                <LoginAndDonate />
            </main>
            <footer className="flex gap-6 flex-wrap items-center justify-center p-4 bg-[#F4EFEA]">
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
