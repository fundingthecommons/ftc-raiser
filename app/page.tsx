import Image from "next/image";
import LoginAndDonate from "@/components/login-and-donate";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col items-center justify-start flex-grow p-0 gap-0">
        <div className="relative w-full h-[300px] max-w-full">
          <Image
            src="/images/chiang-mai-banner.png"
            alt="Funding the Commons Logo"
            fill
            className="object-cover"
          />
        </div>

        <LoginAndDonate />
        <div className="relative w-full max-w-4xl mx-auto px-4 py-8 mt-64">
          <h1 className="text-4xl font-bold mb-6">
            Support Local Heroes in Chiang Mai: Flood Relief, Humanitarian Aid,
            and Child Protection
          </h1>
          <p className="mb-6">Join us in making a real difference.</p>

          <p className="mb-6">
            We&apos;re raising funds to support local NGOs in Chiang Mai that
            are at the forefront of crucial causes—flood relief, humanitarian
            support, human rights, and child protection.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            These organizations include:
          </h2>
          <ul className="list-disc pl-6 mb-6">
            <li>ExileHub</li>
            <li>Ava&apos;s House</li>
            <li>Digi CNX</li>
            <li>Giveth Campaign: Friends Helping Friends in Chiang Mai</li>
          </ul>

          <p className="mb-6">
            This is your chance to be part of the first-ever Hyperfund—a
            groundbreaking collaboration by Funding the Commons residents.
            We&apos;ve created an unstoppable, peer-to-peer donation system,
            ensuring 100% of your donation goes directly to these NGOs without
            any intermediaries.
          </p>

          <p className="mb-6">
            Donate today and for the next 30 days, and you&apos;ll receive a
            special Hypercert that commemorates your participation in this
            historic initiative. By giving now, you&apos;re not just helping
            Chiang Mai—you&apos;re joining a global movement to fund the commons
            and build a better world.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Every Donation Counts. Every Hypercert Matters.
          </h2>
          <p className="mb-6">Start making an impact now.</p>
        </div>
      </main>
    </div>
  );
}
