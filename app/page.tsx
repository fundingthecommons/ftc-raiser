// app/page.tsx
import Donate from "@/components/donate";
import Image from 'next/image';


export default function Home() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex flex-col items-center justify-start flex-grow p-0 gap-0" m-0>
                <div className="relative w-full h-[300px] max-w-full" m-0 p-0>
                    <Image 
                        src="/images/chiang-mai-banner.png" 
                        alt="Funding the Commons Logo"
                        fill
                        className="object-cover"
                    />
                </div>
                <Donate />
            </main>
            
        </div>
    );
}
