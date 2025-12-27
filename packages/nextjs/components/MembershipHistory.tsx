"use client";

import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";

export default function MembershipHistory() {
  const { data: mintEvents } = useScaffoldEventHistory({
    contractName: "MembershipNFT" as const,
    eventName: "MembershipMinted",
    fromBlock: 0n,
  });

  const { data: extendEvents } = useScaffoldEventHistory({
    contractName: "MembershipNFT" as const,
    eventName: "MembershipExtended",
    fromBlock: 0n,
  });

  const rows = [
    ...(mintEvents || []).map(e => ({
      date: new Date(Number(e.blockTimestamp ?? 0) * 1000).toLocaleDateString(),
      action: "Minted New Pass",
      amount: "0.05 ETH",
      status: "Completed",
    })),
    ...(extendEvents || []).map(e => ({
      date: new Date(Number(e.blockTimestamp ?? 0) * 1000).toLocaleDateString(),
      action: "Extended Membership",
      amount: "0.03 ETH",
      status: "Completed",
    })),
  ];

  return (
    <div className="mt-10 bg-[#111827] border border-[#1f2937] rounded-2xl p-6">
      <h2 className="text-lg font-semibold mb-4">Membership History</h2>

      <table className="w-full text-sm">
        <thead className="text-gray-400 border-b border-[#1f2937]">
          <tr>
            <th className="text-left py-2">Date</th>
            <th className="text-left py-2">Action</th>
            <th className="text-left py-2">Amount</th>
            <th className="text-left py-2">Status</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr
              key={i}
              className="border-b border-[#1f2937] hover:bg-[#0f172a]"
            >
              <td className="py-3">{row.date}</td>
              <td className="py-3">{row.action}</td>
              <td className="py-3">{row.amount}</td>
              <td className="py-3 text-green-500">{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {rows.length === 0 && (
        <p className="text-gray-500 mt-4">No membership activity yet.</p>
      )}
    </div>
  );
}