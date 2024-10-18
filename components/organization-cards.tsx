"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { MOCK_ORGS } from "@/lib/getOrgs";

type Organization = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
};

export default function OrganizationCards({
  initialOrgs = MOCK_ORGS,
}: {
  initialOrgs?: Organization[];
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredOrgs = initialOrgs.filter(
    (org) =>
      org.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      org.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto pt-4 px-4 flex flex-col">
      <div className="relative mb-4 w-64">
        <Input
          type="text"
          placeholder="Search organizations"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 bg-gray-100 rounded-full border-none text-gray-400"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredOrgs.map((org) => (
            <Link href={`/org/${org.id}`} key={org.id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                <CardHeader>
                  <div className="w-full h-48 relative mb-4">
                    <Image
                      src={org.imageUrl}
                      alt={org.name}
                      fill
                      style={{ objectFit: "cover" }}
                      className="rounded-t-lg"
                    />
                  </div>
                  <CardTitle>{org.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{org.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Click to view details
                  </p>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
        {filteredOrgs.length === 0 && (
          <p className="text-center text-muted-foreground mt-6">
            No organizations found.
          </p>
        )}
      </div>
    </div>
  );
}
