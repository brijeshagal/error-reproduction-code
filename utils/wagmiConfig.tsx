import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  trustWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { http } from "viem";
import { arbitrum } from "viem/chains";
import { createConfig } from "wagmi";

const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [metaMaskWallet, walletConnectWallet, trustWallet],
    },
  ],
  {
    appName: "viem-tutorial",
    projectId: process.env.NEXT_PUBLIC_WC_PROJECTID ?? "",
  }
);

export const wagmiConfig = createConfig({
  chains: [arbitrum],
  connectors,
  transports: { [arbitrum.id]: http() },
});
