import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobileBookRide() {
  const [form, setForm] = useState({ pickup: "", dropoff: "" });
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e: any) => { e.preventDefault(); setSuccess(true); };
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Book a Ride</h1>
      {success ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded">Your ride has been booked!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Pickup Location" className="w-full border p-2 rounded" required />
          <input name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="Dropoff Location" className="w-full border p-2 rounded" required />
          <Button type="submit" className="w-full bg-[#0B63BC] text-white">Book Ride</Button>
        </form>
      )}
    </div>
  );
}