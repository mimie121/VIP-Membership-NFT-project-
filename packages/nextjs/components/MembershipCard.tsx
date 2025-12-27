

"use client";

import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import StatusBadge from "../components/StatusBadge";
import CountdownTimer from "../components/CountdownTimer";
import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function MembershipCard() {
  const { address, isConnected } = useAccount();

  const [balance, setBalance] = useState<number>(0);
  const [isMinting, setIsMinting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Read NFT balance
  const { data: nftBalance, refetch } = useScaffoldReadContract({
    contractName: "MembershipNFT",
    functionName: "balanceOf",
    args: [address ?? "0x0000000000000000000000000000000000000000"],
    enabled: Boolean(address),
  });

  useEffect(() => {
    if (nftBalance !== undefined) {
      setBalance(Number(nftBalance));
    }
  }, [nftBalance]);

  // Mint function
  const { writeContractAsync } = useScaffoldWriteContract({
    contractName: "MembershipNFT",
    functionName: "mintMembership",
    value: "50000000000000000", // 0.05 ETH
  });

  const handleMint = async () => {
    if (!isConnected) {
      setStatusMessage("⚠️ Connect your wallet first");
      return;
    }

    try {
      setIsMinting(true);
      setStatusMessage("⏳ Minting...");

      await writeContractAsync();
      await refetch();

      setStatusMessage("🎉 Membership NFT minted successfully!");
    } catch (error) {
      console.error(error);
      setStatusMessage("❌ Mint failed! Please try again...");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-[#111827] border border-[#1f2937] rounded-2xl p-6 shadow-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">VIP Access Pass</h2>

      <div className="flex flex-col md:flex-row gap-8 items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/029/445/291/original/game-ui-vip-con-gold-diamond-png.png"
          alt="VIP Pass"
          className="w-64 rounded-xl border border-[#1f2937]"
        />

        <div className="flex-1 space-y-4 text-center md:text-left">
          <StatusBadge active />
          <CountdownTimer expiresIn={864000} />

          {address && (
            <p className="text-sm text-gray-400 break-all">
              Connected wallet: <span className="text-white">{address}</span>
            </p>
          )}

          <p className="text-sm text-gray-400">
            Your Membership NFTs: <span className="text-white">{balance}</span>
          </p>

          {statusMessage && (
            <p className="text-sm text-yellow-400 font-semibold">
              {statusMessage}
            </p>
          )}

          <button
            onClick={handleMint}
            disabled={isMinting}
            className={`w-1/2 py-2 rounded-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 ${
              isMinting ? "opacity-50 cursor-not-allowed" : "hover:opacity-90"
            }`}
          >
            {isMinting ? "Minting..." : "Mint New Pass"}
          </button>
        </div>
      </div>
    </div>
  );
}