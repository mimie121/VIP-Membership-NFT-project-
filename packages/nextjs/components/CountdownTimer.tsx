export default function CountdownTimer({ expiresIn }: { expiresIn: number }) {
  const days = Math.floor(expiresIn / 86400);

  return (
    <p className="text-gray-400">
      Expires in: <span className="text-white font-semibold">{days} days</span>
    </p>
  );
}
