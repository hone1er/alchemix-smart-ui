"use client";

import {
  type State,
  WagmiProvider,
  createConfig,
  http,
  type Config,
} from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { type PropsWithChildren } from "react";
import { coinbaseWallet } from "wagmi/connectors";
import { createMemoryClient } from "tevm";
import { createPublicClient, parseAbi } from "viem";

interface Props extends PropsWithChildren {
  initialState?: State;
}
// 0. Setup queryClient

const queryClient = new QueryClient();

// 2. Create wagmiConfig
const metadata = {
  name: "Alchemix Smart UI",
  description: "A smart wallet based UI for Alchemix",
  url: "https://alchemix-demo.vercel.app", // origin must match your domain & subdomain
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};
const chains = [arbitrum, mainnet] as const;
const config: Config = createConfig({
  chains,
  connectors: [
    coinbaseWallet({
      appName: "Alchemix Smart UI",
      chainId: arbitrum.id,
      preference: "smartWalletOnly",
    }),
  ],
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [arbitrum.id]: http(),
  },
});

export function Web3Provider({ initialState, children }: Props) {
  return (
    <WagmiProvider initialState={initialState} config={config}>
      <QueryClientProvider client={queryClient}>
        {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment  */}
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
