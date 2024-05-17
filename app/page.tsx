"use client";

import { ConnectorType } from "@/enums";
import { writeContract } from "@/utils/contractInteractions";
import { erc20Abi } from "viem";
import { useAccount } from "wagmi";

export default function Home() {
  const { address, connector, chainId } = useAccount();
  return (
    <main>
      <button
        onClick={async () => {
          if (address && chainId) {
            const res = await writeContract({
              chainId,
              contractAddress: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
              abi: erc20Abi,
              functionName: "transfer",
              args: ["0xA22042a57270F95169a230b7e766265a67759eBF", 100],
              userAddress: address,
              connectorType: connector?.type as ConnectorType,
            });
          }
        }}
      >
        Submit Txn
      </button>
    </main>
  );
}
