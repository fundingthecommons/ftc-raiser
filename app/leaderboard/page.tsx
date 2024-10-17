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
            <main className="flex flex-col items-center justify-center flex-grow p-8 gap-8">
                <Leaderboard />
            </main>
        </div>
    );
}
