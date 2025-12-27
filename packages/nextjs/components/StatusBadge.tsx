export default function StatusBadge({ active }: { active: boolean }) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
        active ? "bg-green-600" : "bg-red-600"
      }`}
    >
      {active ? "ACTIVE" : "EXPIRED"}
    </span>
  );
}
