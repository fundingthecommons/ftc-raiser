"use client";
import { useSplitMetadata } from "@0xsplits/splits-sdk-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { cn } from "@/lib/utils";
import { ENSResolver } from "@/lib/ens";
import { truncateAddress } from "@/lib/utils"; // Assume this function exists

export default function DistributionPage() {
  const { chainId, address } = useParams<{
    chainId: string;
    address: string;
  }>();
  const { splitMetadata, isLoading } = useSplitMetadata(
    Number(chainId),
    address
  );
  const [chartData, setChartData] = useState<unknown[][]>([["From", "To", "Weight"]]);

  useEffect(() => {
    async function resolveENSNames() {
      if (splitMetadata) {
        const ensResolver = new ENSResolver();
        const resolvedData = await Promise.all(
          splitMetadata.recipients.map(async (recipient) => {
            const ensName = await ensResolver.resolveAddress(
              recipient.recipient.address
            );
            return [
              truncateAddress(splitMetadata.address),
              ensName || truncateAddress(recipient.recipient.address),
              recipient.percentAllocation,
            ];
          })
        );
        setChartData([["From", "To", "Weight"], ...resolvedData]);
      }
    }
    resolveENSNames();
  }, [splitMetadata]);

  const options = {
    sankey: {
      link: {
        colorMode: "gradient",
        colors: ["#57C2BA", "#8FD14F"], // Teal to light green gradient
      },
      node: {
        colors: ["#57C2BA", "#8FD14F"], // Use the same colors for nodes
        label: {
          color: "#2C3E50", // Dark blue-gray for better readability
          fontSize: 14, // Increase font size
        },
      },
    },
    tooltip: { isHtml: true }, // Enable HTML tooltips
  };

  if (isLoading) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-8 w-3/4" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-1/2" />
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Skeleton className="h-48 w-full" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!splitMetadata) {
    return (
      <div className="container mx-auto p-4">
        <Card>
          <CardHeader>
            <CardTitle>Split Not Found</CardTitle>
            <CardDescription>
              No Split found at address {address}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  //TODO fix iffy types Progress component

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Split Overview</CardTitle>
          <CardDescription>Address: {splitMetadata?.address}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div
            className={cn(
              "border rounded-lg p-4 mx-auto",
              "w-full max-w-3xl h-[400px]" // Adjust max-width and height as needed
            )}
          >
            <Chart
              chartType="Sankey"
              width="100%"
              height="100%"
              data={chartData}
              options={options}
            />
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Controller</h3>
            {splitMetadata.controller ? (
              <p>{splitMetadata.controller.address}</p>
            ) : (
              <p>No controller, Split is immutable</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Distribution Incentive
            </h3>
            <p>{splitMetadata.distributorFeePercent}%</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Recipients</h3>
            <div className="space-y-4">
              {splitMetadata.recipients.map((recipient) => (
                <div key={recipient.recipient.address} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {recipient.recipient.address}
                    </span>
                    <span>{recipient.percentAllocation}%</span>
                  </div>
                  <Progress
                    value={parseFloat(String(recipient.percentAllocation))}
                  />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
