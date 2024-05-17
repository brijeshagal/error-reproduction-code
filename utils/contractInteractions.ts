import { ConnectorType } from "@/enums";
import { HexString } from "@/types";
import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { Abi, createWalletClient, custom } from "viem";
import { arbitrum } from "viem/chains";

export const getWalletClient = async ({
  chainId,
  account,
  connectorType = ConnectorType.injected,
}: {
  chainId: number;
  account: HexString;
  connectorType?: string;
}) => {
  try {
    let provider = null;
    switch (connectorType) {
      case ConnectorType.walletConnect: {
        provider = await EthereumProvider.init({
          projectId: process.env.NEXT_PUBLIC_WC_PROJECTID ?? "",
          showQrModal: true,
          optionalChains: [chainId],
        });
        break;
      }
      default: {
        provider = window.ethereum!;
      }
    }
    return createWalletClient({
      chain: arbitrum,
      transport: custom(provider),
      account,
    });
  } catch (error) {
    throw new Error("Error creating Wallet Client");
  }
};

export const writeContract = async ({
  chainId,
  contractAddress,
  abi,
  functionName,
  args = [],
  userAddress,
  connectorType = ConnectorType.injected,
}: {
  chainId: number;
  contractAddress: HexString;
  abi: Abi;
  functionName: string;
  args?: unknown[];
  userAddress: HexString;
  value?: bigint;
  gasMultiplier?: bigint;
  connectorType?: ConnectorType;
}): Promise<HexString | { status: string }> => {
  console.log(chainId);
  try {
    const walletClient = await getWalletClient({
      chainId,
      account: userAddress,
      connectorType,
    });
    const hash = await walletClient.writeContract({
      address: contractAddress,
      abi,
      functionName,
      args,
      account: userAddress,
    });
    return hash;
    // wait for block confirmation and return transaction receipt
  } catch (e: unknown) {
    console.log({ e });
    // const errorReason =
    //   (((e as BaseError)?.cause as ContractFunctionRevertedError)
    //     ?.reason as string) || DEFAULT_ERROR_REASON;
    // toast.error(
    //   errorCodes[errorReason]?.length > 0
    //     ? (errorCodes[errorReason] as string)
    //     : errorCodes[DEFAULT_ERROR_REASON]
    // );
    return { status: "failed" };
  }
};
