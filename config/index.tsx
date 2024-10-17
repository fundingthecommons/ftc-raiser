import {cookieStorage, createConfig, createStorage} from 'wagmi'
import {WagmiAdapter} from '@reown/appkit-adapter-wagmi'
import {sepolia, mainnet, Chain,} from 'wagmi/chains'
import {http} from "viem";
import {getPublicClient, getWalletClient, switchChain} from "@wagmi/core";
import {createConfig as creatLiFiConfig, EVM} from '@lifi/sdk'


// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID
export const splitsApiKey = process.env.NEXT_PUBLIC_SPLITS_API_KEY

if (!projectId || !splitsApiKey) {
    throw new Error('Project ID is not defined')
}

// TODO use this as the chain source for all configs, fix the types issue
export const chains: Chain[] = [sepolia, mainnet] as const

export const chainConfig = createConfig({
    chains: [mainnet, sepolia],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
    },
})

//Set up the Wagmi Adapter (Config)
export const wagmiAdapter = new WagmiAdapter({
    storage: createStorage({
        storage: cookieStorage
    }),
    ssr: true,
    projectId,
    networks: [sepolia, mainnet],
})

export const wagmiConfig = wagmiAdapter.wagmiConfig

export const publicClient = getPublicClient(wagmiConfig)
export const splitsConfig = {
    chainId: 11155111,
    publicClient,
    apiConfig: {
        apiKey: splitsApiKey,
    }
}


export const lifiConfig = creatLiFiConfig({
    integrator: 'BB-testing',
    providers: [EVM({
        getWalletClient: () => getWalletClient(wagmiConfig),
        switchChain: async (chainId) => {
            const chain = await switchChain(wagmiConfig, {chainId});
            return getWalletClient(wagmiConfig, {chainId: chain.id});
        },
    })]
})