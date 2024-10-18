import { Alchemy, Network, TokenBalance } from "alchemy-sdk";
import { alchemyApiKey as ALCHEMY_API_KEY } from "@/config";
import { ChainId, getTokens } from "@lifi/sdk";

const chainIdToAlchemyNetwork = {
	1: Network.ETH_MAINNET,
	10: Network.OPT_MAINNET,
	100: Network.GNOSIS_MAINNET,
	8453: Network.BASE_MAINNET,
	42161: Network.ARB_MAINNET,
	137: Network.MATIC_MAINNET,
	42220: Network.CELO_MAINNET,
} as const;

const getAlchemyNetwork = (chainId: number) => {
	return chainIdToAlchemyNetwork[
		chainId as keyof typeof chainIdToAlchemyNetwork
	];
};

export const fetchTokenBalances = async (
	address: string,
	chainId: number,
): Promise<TokenBalance[]> => {
	const settings = {
		apiKey: ALCHEMY_API_KEY,
		network: getAlchemyNetwork(chainId),
	};
	const alchemy = new Alchemy(settings);

	const balances = await alchemy.core.getTokenBalances(address);
	return balances.tokenBalances;
};

export const fetchTokenMetadata = async (
	tokens: TokenBalance[],
	chainId: number,
) => {
	const settings = {
		apiKey: ALCHEMY_API_KEY,
		network: getAlchemyNetwork(chainId),
	};
	const alchemy = new Alchemy(settings);

	return await Promise.all(
		tokens.map(async (token) => {
			const metadata = await alchemy.core.getTokenMetadata(
				token.contractAddress,
			);
			return {
				...token,
				...metadata,
			};
		}),
	);
};

const getLiFiChainFromChainId = (chainId: number) => {
	switch (chainId) {
		case 1:
			return ChainId.ETH;
		case 10:
			return ChainId.OPT;
		case 100:
			return ChainId.DAI;
		case 42161:
			return ChainId.ARB;
		case 137:
			return ChainId.POL;
		case 42220:
			return ChainId.CEL;
		case 8453:
			return ChainId.BAS;
		default:
			return;
	}
};

export const fetchAllSupportedTokensFromLiFi = async (chainId: number) => {
	try {
		const chain = getLiFiChainFromChainId(chainId);
		if (!chain) {
			throw new Error(`Chain ${chainId} not supported`);
		}

		console.log("Chain: ", chain);
		return await getTokens({
			chains: [chain],
		});
	} catch (error) {
		console.error(error);
	}
};
