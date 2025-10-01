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
            const { data, error } = await supabase
                .from("payments4")
                .select("*")
                .order("created_at", { ascending: false });

            if (error) {
                console.error("Failed to fetch payments:", error);
            } else if (data) {
                setPayments(data as Payment[]);
                const total = (data as Payment[]).reduce((sum, p) => sum + Number(p.amount), 0);
                setTotalAmount(total);
            }

            setLoading(false);
        };

        fetchPayments();
    }, []);

    if (loading) return <div>Loading payments...</div>;

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">💰 Admin - Payments</h1>
            <p className="mb-2">Total Payments: {payments.length}</p>
            <p className="mb-4 font-semibold">Total Amount: ₹{totalAmount}</p>

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
                            <td className="border p-2">{new Date(p.created_at).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
