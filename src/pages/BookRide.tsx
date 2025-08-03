  import { useState } from "react";
  import { Button } from "@/components/ui/button";

  export default function BookRide() {
    const [form, setForm] = useState({ pickup: "", dropoff: "" });
    const [success, setSuccess] = useState(false);
    const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    const handleSubmit = (e: any) => { e.preventDefault(); setSuccess(true); };
    return (
      <div className="max-w-lg mx-auto p-8">
        <h1 className="text-2xl font-bold mb-6">Book a Ride</h1>
        {success ? (
          <div className="p-4 bg-green-50 border border-green-200 rounded">Your ride has been booked!</div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input name="pickup" value={form.pickup} onChange={handleChange} placeholder="Pickup Location" className="w-full border p-2 rounded" required />
            <input name="dropoff" value={form.dropoff} onChange={handleChange} placeholder="Dropoff Location" className="w-full border p-2 rounded" required />
            <Button type="submit" className="w-full bg-[#0B63BC] text-white">Book Ride</Button>
          </form>
        )}
      </div>
    );
  }