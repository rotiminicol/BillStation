import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function MobileConvertAsset() {
  const [form, setForm] = useState({ asset: "crypto", amount: "" });
  const [success, setSuccess] = useState(false);
  const handleChange = (e: any) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = (e: any) => { e.preventDefault(); setSuccess(true); };
  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Convert Your Asset</h1>
      {success ? (
        <div className="p-3 bg-green-50 border border-green-200 rounded">Your conversion request has been submitted!</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
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