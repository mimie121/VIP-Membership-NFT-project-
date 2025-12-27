import MembershipCard from "../components/MembershipCard";
import MembershipHistory from "../components/MembershipHistory";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#070b16] to-[#0b1224] text-white px-6 py-10">
      <h1 className="text-3xl font-bold mb-10">NFT Membership Dashboard</h1>

      <MembershipCard />
      <MembershipHistory />
    </main>
  );
}
