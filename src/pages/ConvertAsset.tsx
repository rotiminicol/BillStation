import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function ConvertAsset() {
  const [form, setForm] = useState({ asset: "crypto", amount: "" });
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e: any) => { e.preventDefault(); setSuccess(true); };
  return (
    <div className="max-w-lg mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Convert Your Asset</h1>
      {success ? (
        <div className="p-4 bg-green-50 border border-green-200 rounded">Your conversion request has been submitted!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <select name="asset" value={form.asset} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="crypto">Crypto</option>
            <option value="airtime">Airtime</option>
          </select>
          <input name="amount" type="number" min={1} value={form.amount} onChange={handleChange} placeholder="Amount" className="w-full border p-2 rounded" required />
          <Button type="submit" className="w-full bg-[#0B63BC] text-white">Convert</Button>
        </form>
      )}
    </div>
  );
}