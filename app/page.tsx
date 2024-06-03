"use client";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import { createPublicClient, http } from "viem";
import { polygon } from "viem/chains";
import { useAccount, useWalletClient } from "wagmi";

export default function Home() {
  const { address, connector, chainId } = useAccount();
  const res = useWalletClient();
  const addRecentTxn = useAddRecentTransaction();
  return (
    <main>
      <button
        onClick={async () => {
          if (address && chainId) {
            const result = await res?.data?.sendTransaction({
              to: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
              value: BigInt(3 * 10 ** 17),
            });
            const publicClient = createPublicClient({
              chain: polygon,
              transport: http(),
            });
            if (result) {
              const receipt = await publicClient.getTransactionReceipt({
                hash: result,
              });
              if (receipt.status == "success") {
                console.log("success");
                addRecentTxn({
                  hash: receipt.transactionHash,
                  description:
                    "Sent 0.3 MATIC to 0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
                });
              }
            }
          }
        }}
      >
        Submit Txn
      </button>
    </main>
  );
}
