"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

type Pixel = { id?: number; name: string; script: string };

export default function AdminPixel() {
    const router = useRouter();
    const [pixels, setPixels] = useState<Pixel[]>([]);
    const [name, setName] = useState("");
    const [script, setScript] = useState("");
    const [message, setMessage] = useState("");

    const fetchPixels = async () => {
        const { data, error } = await supabase.from("pixels").select("*").order("id", { ascending: false });
        if (error) console.error(error);
        else setPixels(data || []);
    };

    useEffect(() => {
        fetchPixels();
    }, []);

    const savePixel = async () => {
        if (!name || !script) return alert("Name & Script required");
        const { error } = await supabase.from("pixels").insert([{ name, script }]);
        if (error) setMessage("❌ Failed");
        else {
            setMessage("✅ Pixel added");
            setName(""); setScript("");
            fetchPixels();
        }
    };

    const handleDelete = async (id?: number) => {
        if (!id) return;
        if (!confirm("Delete this pixel?")) return;
        const { error } = await supabase.from("pixels").delete().eq("id", id);
        if (error) alert("❌ Failed"); else fetchPixels();
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-2xl mb-4">Admin - Pixels</h2>
            <button
                onClick={() => router.push("/admin-upi")}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                UPI page
            </button>
            <button
                onClick={() => router.push("/upload-products")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Products page
            </button>
            {/* Add Pixel */}
            <div className="mb-6">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Pixel Name" className="w-full border p-2 mb-2" />
                <textarea value={script} onChange={(e) => setScript(e.target.value)} placeholder="Pixel Script" className="w-full border p-2 mb-2" rows={5} />
                <button onClick={savePixel} className="bg-green-500 text-white px-4 py-2">Add Pixel</button>
                {message && <p className="mt-2">{message}</p>}
            </div>

            {/* Pixel List */}
            <table className="w-full border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">ID</th>
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Script Preview</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {pixels.map((p) => (
                        <tr key={p.id}>
                            <td className="border p-2">{p.id}</td>
                            <td className="border p-2">{p.name}</td>
                            <td className="border p-2"><code>{p.script.substring(0, 50)}...</code></td>
                            <td className="border p-2">
                                <button onClick={() => handleDelete(p.id)} className="bg-red-500 text-white px-3 py-1 rounded">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => router.push("/upload-products")} className="mt-4 bg-blue-500 text-white px-4 py-2">Go to Upload Products</button>
        </div>
    );
}
