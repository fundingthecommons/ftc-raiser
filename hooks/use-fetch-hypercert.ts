"use client"

import {gql, request} from "graphql-request";
import {getAddress, isAddress} from "viem";
import {useEffect, useState} from "react";

const query = gql
        `query Hypercert($hypercert_id: String) {
        hypercerts(where: { hypercert_id: { eq: $hypercert_id } }) {
            data {
                metadata {
                    name
                    description
                    image
                    external_url
                    work_scope
                    work_timeframe_from
                    work_timeframe_to
                    contributors
                }
                hypercert_id
                creator_address
                units
                fractions {
                    count
                    data {
                        creation_block_number
                        creation_block_timestamp
                        fraction_id
                        hypercert_id
                        last_update_block_number
                        last_update_block_timestamp
                        owner_address
                        units
                    }
                }
                token_id
            }
        }
    }
    `
;

export function useFetchHypercert(hypercertId = "11155111-0xa16DFb32Eb140a6f3F2AC68f41dAd8c7e83C4941-235135115542368478253191853735351834116096") {
    const [hypercertData, setHypercertData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchHypercert() {
            try {
                const [chainId, contractAddress, tokenId] = hypercertId.split("-");

                if (!chainId || !contractAddress || !tokenId) {
                    throw new Error("Invalid hypercertId");
                }

                const _contractAddress = getAddress(contractAddress);

                if (!isAddress(_contractAddress)) {
                    throw new Error("Invalid address");
                }

                const res = await request('https://staging-api.hypercerts.org/v1/graphql', query, {
                    hypercert_id: `${chainId}-${_contractAddress}-${tokenId}`,
                });

                // TODO fix types for hypercert data object using gql Fragments
                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                const hypercertFullFragment = (res as any).hypercerts?.data?.[0];
                if (!hypercertFullFragment) {
                    throw new Error("Hypercert not found");
                }

                setHypercertData(hypercertFullFragment);
            } catch (err) {
                const errorMessage = err instanceof Error ? err.message : "unkown error";
                console.error(err);
                setError(errorMessage);
            } finally {
                setIsLoading(false);
            }
        }

        fetchHypercert();
    }, [hypercertId]);

    return {hypercertData, isLoading, error};
}
