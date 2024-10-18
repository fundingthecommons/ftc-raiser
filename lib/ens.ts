import { getEnsName, Config } from "@wagmi/core";
import { mainnet } from "@wagmi/core/chains";
import { http, createConfig } from "@wagmi/core";

export class ENSResolver {
  private config: Config;

  constructor() {
    this.config = createConfig({
      chains: [mainnet],
      transports: {
        [mainnet.id]: http(),
      },
    });
  }

  async resolveAddress(address: string): Promise<string | null> {
    if (!address) {
      return null;
    }

    try {
      return await getEnsName(this.config, {
        address: address as `0x${string}`,
      });
    } catch (error) {
      console.error(`Error resolving ENS name for address ${address}:`, error);
      return null;
    }
  }
}
