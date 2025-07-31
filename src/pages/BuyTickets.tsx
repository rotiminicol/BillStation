import { useState } from "react";
import { Button } from "@/components/ui/button";

const events = [
  { id: 1, name: "Wizkid Live", date: "2024-08-10" },
  { id: 2, name: "Lagos Comedy Night", date: "2024-09-01" },
  { id: 3, name: "Afrobeat Fest", date: "2024-10-15" },
];

export default function BuyTickets() {
  const [bought, setBought] = useState<number | null>(null);
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Buy Tickets</h1>
      {events.map(ev => (
        <div key={ev.id} className="mb-4 p-4 border rounded flex items-center justify-between">
          <div>
            <div className="font-semibold">{ev.name}</div>
            <div className="text-sm text-gray-500">{ev.date}</div>
          </div>
          <Button onClick={() => setBought(ev.id)} className="bg-[#0B63BC] text-white">Buy</Button>
        </div>
      ))}
      {bought && <div className="p-4 bg-green-50 border border-green-200 rounded mt-4">Ticket purchased for event #{bought}!</div>}
    </div>
  );
}