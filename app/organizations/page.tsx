// app/page.tsx
import OrganizationCards from "@/components/organization-cards";

export default function Home() {
	return (
		<div className="flex flex-col min-h-screen">
			<main className="flex flex-col items-center justify-center flex-grow p-8 gap-8">
				<OrganizationCards />
			</main>
		</div>
	);
}
