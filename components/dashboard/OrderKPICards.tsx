interface Props {
  orders: any[];
}

export default function OrderKPICards({ orders }: Props) {
  const pending = orders.filter(
    (o) => o.status === "pending"
  ).length;

  const processing = orders.filter(
    (o) => o.status === "processing"
  ).length;

  const completed = orders.filter(
    (o) => o.status === "completed"
  ).length;

  const cancelled = orders.filter(
    (o) => o.status === "cancelled"
  ).length;

  const totalOrders = orders.length;

  const revenue = orders
    .filter((o) => o.status === "completed")
    .reduce((sum, order) => sum + Number(order.total), 0);

  const cards = [
    {
      title: "Pending",
      value: pending,
      color: "bg-orange-50",
      text: "text-orange-700",
    },
    {
      title: "Processing",
      value: processing,
      color: "bg-yellow-50",
      text: "text-yellow-700",
    },
    {
      title: "Completed",
      value: completed,
      color: "bg-green-50",
      text: "text-green-700",
    },
    {
      title: "Cancelled",
      value: cancelled,
      color: "bg-red-50",
      text: "text-red-700",
    },
    {
      title: "Revenue",
      value: `$${revenue.toFixed(2)}`,
      color: "bg-blue-50",
      text: "text-blue-700",
    },
    {
      title: "Total Orders",
      value: totalOrders,
      color: "bg-gray-50",
      text: "text-gray-700",
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`rounded-2xl border border-[#E7E1D8] p-6 shadow-sm transition hover:shadow-md ${card.color}`}
        >
          <p className="text-sm text-gray-600">
            {card.title}
          </p>

          <h2 className={`mt-3 text-3xl font-bold ${card.text}`}>
            {card.value}
          </h2>
        </div>
      ))}
    </div>
  );
}