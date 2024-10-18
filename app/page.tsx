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
				<div className="relative w-full max-w-4xl mx-auto px-4 py-8">
					<h1 className="text-4xl font-bold mb-6">
						Welcome to the Commons Forest Fundraising Campaign!
					</h1>
					<p className="mb-6">
						We invite you to join us at our beautiful residency just outside the
						city, where we are hosting a unique fundraising event to support
						five groundbreaking projects dedicated to creating public goods and
						sustainable innovations. These projects have been carefully selected
						for their commitment to our core values of community, collaboration,
						and open-source principles.
					</p>

					<h2 className="text-2xl font-semibold mb-4">How You Can Help</h2>
					<p className="mb-6">
						We&apos;re raising funds for a communal pool, which will be{" "}
						<strong>equitably distributed</strong> among the five selected
						projects. Your contributions will directly empower these teams to
						continue their important work in areas like{" "}
						<strong>decentralized governance</strong>,{" "}
						<strong>public goods development</strong>, and{" "}
						<strong>sustainable living solutions</strong>.
					</p>

					<h2 className="text-2xl font-semibold mb-4">Why Visit Us</h2>
					<p className="mb-6">
						Our residency offers a unique opportunity to experience{" "}
						<strong>Commons Forest</strong> in action. You’ll meet the project
						teams, explore our eco-friendly space, and participate in workshops
						and discussions that demonstrate the innovative work happening right
						here. It’s a chance to not only support these projects financially
						but to also{" "}
						<strong>immerse yourself in our thriving community</strong>
						—learning, contributing, and connecting with like-minded
						individuals.
					</p>

					<h2 className="text-2xl font-semibold mb-4">The Projects</h2>
					<p className="mb-6">
						Each project aligns with our mission to foster sustainability,
						decentralized collaboration, and public goods innovation. From{" "}
						<strong>local environmental initiatives</strong> to{" "}
						<strong>global decentralized governance solutions</strong>, these
						projects represent the future of how communities can work together
						for the common good.
					</p>

					<h2 className="text-2xl font-semibold mb-4">How to Contribute</h2>
					<p className="mb-6">
						We invite you to make a donation of any size to the{" "}
						<strong>Commons Forest Fund</strong>. Your contributions will be
						pooled and distributed among the five selected projects. By
						donating, you&apos;ll also gain voting power to help decide how the
						funds are allocated, giving you a say in shaping the future of
						public goods.
					</p>

					<h2 className="text-2xl font-semibold mb-4">Join Us</h2>
					<p className="mb-6">
						Join us for a day of connection, learning, and collaboration.
						Together, we can <strong>build a better future</strong> by
						supporting projects that prioritize the health of our communities
						and our planet.
					</p>

					<p className="mt-6">
						We look forward to welcoming you to Commons Forest! Your presence
						and contributions, whether big or small, will make a lasting impact.
					</p>
					<br />
				</div>
			</main>
		</div>
	);
}
