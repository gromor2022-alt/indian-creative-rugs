export default function OrderKPICards() {
  const cards = [
    {
      title: "New Orders",
      value: 18,
      color: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "In Production",
      value: 42,
      color: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Ready to Ship",
      value: 8,
      color: "bg-purple-50",
      text: "text-purple-700",
    },
    {
      title: "Shipped",
      value: 12,
      color: "bg-indigo-50",
      text: "text-indigo-700",
    },
    {
      title: "Completed",
      value: 315,
      color: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Cancelled",
      value: 3,
      color: "bg-red-50",
      text: "text-red-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border border-[#E7E1D8] p-6 shadow-sm transition hover:shadow-md ${card.color}`}
        >
          <p className="text-sm text-gray-600">{card.title}</p>

          <h2 className={`mt-3 text-3xl font-bold ${card.text}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}