"use client";

import { supabase } from "@/lib/supabaseClient";
import { useEffect, useState } from "react";

type Payment = {
  id: number;
  amount: number;
  created_at: string;
};

export default function AdminPayments() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      // 1. Fetch summary total
      const { data: summaryRow } = await supabase
        .from("payments_summary4")
        .select("total_amount")
        .eq("id", 1)
        .single();

      let summaryTotal = Number(summaryRow?.total_amount || 0);

      // 2. Fetch payments (all, sorted)
      const { data: allPayments, error } = await supabase
        .from("payments4")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Failed to fetch payments:", error);
        setLoading(false);
        return;
      }

      let paymentsList = allPayments as Payment[];

      // 3. If more than 200 rows → archive + delete old ones
      if (paymentsList.length > 200) {
        const oldRows = paymentsList.slice(200);
        const oldSum = oldRows.reduce(
          (sum, p) => sum + Number(p.amount),
          0
        );

        if (oldSum > 0) {
          // Update summary table
          await supabase
            .from("payments_summary4")
            .update({ total_amount: summaryTotal + oldSum })
            .eq("id", 1);

          summaryTotal += oldSum;
        }

        // Delete old rows
        const idsToDelete = oldRows.map((p) => p.id);
        await supabase.from("payments4").delete().in("id", idsToDelete);

        // Keep only latest 200
        paymentsList = paymentsList.slice(0, 200);
      }

      // 4. Calculate totals
      setPayments(paymentsList);
      const recentTotal = paymentsList.reduce(
        (s, p) => s + Number(p.amount),
        0
      );
      setTotalAmount(summaryTotal + recentTotal);

      setLoading(false);
    };

    fetchPayments();
  }, []);

  if (loading) return <div>Loading payments...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">💰 Admin - Payments</h1>
      <p className="mb-2">Total Payments (latest 200 shown): {payments.length}</p>
      <p className="mb-4 font-semibold">All Time Total Amount: ₹{totalAmount}</p>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Created At</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.id}</td>
              <td className="border p-2">₹{p.amount}</td>
              <td className="border p-2">
                {new Date(p.created_at).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
