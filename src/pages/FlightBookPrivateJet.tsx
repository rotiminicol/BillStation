import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function FlightBookPrivateJet() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    passengers: 1,
  });
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e: any) => { e.preventDefault(); setSuccess(true); };
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Book a Private Jet</h1>
      {success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">Your private jet booking request has been submitted!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="from" value={form.from} onChange={handleChange} placeholder="Departure" className="w-full border p-2 rounded" required />
          <input name="to" value={form.to} onChange={handleChange} placeholder="Destination" className="w-full border p-2 rounded" required />
          <input name="date" type="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="passengers" type="number" min={1} value={form.passengers} onChange={handleChange} className="w-full border p-2 rounded" required />
          <Button type="submit" className="w-full bg-[#0B63BC] text-white">Book Private Jet</Button>
        </form>
      )}
    </div>
  );
}