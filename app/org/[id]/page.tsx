import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

import { MOCK_ORGS } from "@/lib/getOrgs";

const getOrganization = async (id: string) => {
  // In a real application, this would be an API call or database query
  return MOCK_ORGS.find((org) => org.id === id) || null;
};

export default async function OrganizationPage({
  params,
}: {
  params: { id: string };
}) {
  const org = await getOrganization(params.id);

  if (!org) {
    notFound();
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <Link
        href="/organizations"
        className="inline-flex items-center mb-8 text-primary hover:underline"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Organizations
      </Link>

      <div className="relative w-full h-80 mb-8">
        <Image
          src={org.imageUrl}
          alt={org.name}
          fill
          style={{ objectFit: "cover" }}
          className="rounded-lg"
        />
      </div>

      <h1 className="text-4xl font-bold mb-4">{org.name}</h1>

      <div className="flex flex-wrap gap-2 mb-6">
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
          Founded: {org.founded}
        </span>
        <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
          Location: {org.location}
        </span>
      </div>

      <div className="mb-8">
        <a
          href={org.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {org.website}
        </a>
      </div>

      <p className="text-lg text-gray-600 mb-8">{org.description}</p>

      <div className="flex justify-start mb-8">
        <Link href="/">
          <Button
            size="lg"
            className="rounded-full font-semibold bg-teal-400 hover:bg-teal-500 text-white px-8"
          >
            Give to all projects
          </Button>
        </Link>
      </div>
    </div>
  );
}
