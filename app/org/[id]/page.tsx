import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import {MOCK_ORGS} from "@/lib/getOrgs";


const getOrganization = async (id: string) => {
    // In a real application, this would be an API call or database query
    return MOCK_ORGS.find(org => org.id === id) || null
}

export default async function OrganizationPage({ params }: { params: { id: string } }) {
    const org = await getOrganization(params.id)

    if (!org) {
        notFound()
    }

    return (
        <div className="container mx-auto p-4">
            <Link href="/organizations" className="inline-flex items-center mb-4 text-primary hover:underline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Organizations
            </Link>
            <Card className="max-w-3xl mx-auto">
                <CardHeader>
                    <div className="w-full h-64 relative mb-4">
                        <Image
                            src={org.imageUrl}
                            alt={org.name}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-t-lg"
                        />
                    </div>
                    <CardTitle className="text-3xl">{org.name}</CardTitle>
                    <CardDescription className="text-lg">{org.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                        <p>{org.mission}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Details</h2>
                            <ul className="space-y-2">
                                <li><strong>Founded:</strong> {org.founded}</li>
                                <li><strong>Location:</strong> {org.location}</li>
                            </ul>
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Contact</h2>
                            <ul className="space-y-2">
                                <li><strong>Website:</strong> <a href={org.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{org.website}</a></li>
                                <li><strong>Email:</strong> <a href={`mailto:${org.contactEmail}`} className="text-primary hover:underline">{org.contactEmail}</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-6">
                        <Button>Support This Organization</Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}