/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Papa, { ParseResult } from "papaparse";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { productsTable } from "@/lib/commonConst";

type Product = {
    id?: number;
    name: string;
    mrp: string;
    selling_price: string;
    color?: string;
    size?: string;
    img1?: string;
    img2?: string;
    img3?: string;
    img4?: string;
    img5?: string;
    features?: string;
    storage?: string;
    created_at?: string;
    from_csv?: string;
};

export default function AdminProducts() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [editProduct, setEditProduct] = useState<Product | null>(null);

    useEffect(() => {
        const checkAuth = async () => {
            const { data } = await supabase.auth.getSession();
            if (!data.session) {
                router.replace("/"); // redirect to home if not logged in
            } else {
                setLoading(false);
            }
        };
        checkAuth();
    }, []);

    // Fetch products from Supabase
    const fetchProducts = async () => {
        const { data, error } = await supabase
            .from(productsTable)
            .select("*")
            .order("id", { ascending: false });
        if (error) {
            console.error(error);
            setMessage("❌ Failed to fetch products");
        } else {
            setProducts(data || []);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Handle CSV Upload
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        setMessage("Parsing CSV...");

        Papa.parse<Product>(file, {
            header: true,
            skipEmptyLines: true,
            complete: async (results: ParseResult<Product>) => {
                let products = results.data;

                // Remove empty-name products
                products = products.filter((p) => p.name && p.name.trim() !== "");

                // Remove unwanted fields
                products = products.map(({ md5_id, disp_order, ...rest }: any) => rest);

                try {
                    setMessage("Uploading to Supabase...");
                    const { error } = await supabase.from(productsTable).insert(products);

                    if (error) {
                        console.error(error);
                        setMessage("❌ Upload failed: " + error.message);
                    } else {
                        setMessage(`✅ Uploaded ${products.length} products!`);
                        fetchProducts(); // Refresh product list
                    }
                } catch (err: any) {
                    console.error(err);
                    setMessage("❌ Something went wrong.");
                } finally {
                    setLoading(false);
                }
            },
        });
    };

    // Delete product
    const handleDelete = async (id?: number) => {
        if (!id) return;
        const confirmDelete = confirm("Are you sure you want to delete this product?");
        if (!confirmDelete) return;

        const { error } = await supabase.from(productsTable).delete().eq("id", id);

        if (error) {
            console.error(error);
            alert("❌ Failed to delete product");
        } else {
            setProducts(products.filter((p) => p.id !== id));
            alert("✅ Product deleted");
        }
    };

    // Save edited product
    const handleSaveEdit = async () => {
        if (!editProduct || !editProduct.id) return;

        const { error } = await supabase
            .from(productsTable)
            .update(editProduct)
            .eq("id", editProduct.id);

        if (error) {
            console.error(error);
            alert("❌ Failed to update product");
        } else {
            setMessage("✅ Product updated!");
            setEditProduct(null);
            fetchProducts();
        }
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">🛒 Admin - Products</h1>
            <button
                onClick={() => router.push("/admin-upi")}
                className="bg-green-500 text-white px-4 py-2 rounded"
            >
                UPI page
            </button>
            <button
                onClick={() => router.push("/admin-pixel")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pixels
            </button>
            {/* Upload CSV */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Upload Products CSV</h2>
                <input type="file" accept=".csv" onChange={handleFileUpload} className="mb-2" />
                {loading && <p>⏳ Uploading...</p>}
                {message && <p>{message}</p>}
            </div>

            {/* Products List */}
            <div>
                <h2 className="text-lg font-semibold mb-2">Products List</h2>
                {products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <table className="w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">ID</th>
                                <th className="border p-2">Name</th>
                                <th className="border p-2">MRP</th>
                                <th className="border p-2">Price</th>
                                <th className="border p-2">Image</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td className="border p-2">{p.id}</td>
                                    <td className="border p-2">{p.name}</td>
                                    <td className="border p-2">₹{p.mrp}</td>
                                    <td className="border p-2">₹{p.selling_price}</td>
                                    <td className="border p-2">
                                        {p.img1 ? <img src={p.img1} alt={p.name} width={50} /> : "No Image"}
                                    </td>
                                    <td className="border p-2 flex gap-2">
                                        <button
                                            onClick={() => setEditProduct(p)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(p.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Edit Product Form */}
            {editProduct && (
                <div className="mt-6 border p-4 rounded bg-gray-100">
                    <h2 className="text-lg font-semibold mb-2">Edit Product ID: {editProduct.id}</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <input
                            type="text"
                            placeholder="Name"
                            value={editProduct.name}
                            onChange={(e) => setEditProduct({ ...editProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="MRP"
                            value={editProduct.mrp}
                            onChange={(e) => setEditProduct({ ...editProduct, mrp: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Selling Price"
                            value={editProduct.selling_price}
                            onChange={(e) => setEditProduct({ ...editProduct, selling_price: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image 1 URL"
                            value={editProduct.img1 || ""}
                            onChange={(e) => setEditProduct({ ...editProduct, img1: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Image 2 URL"
                            value={editProduct.img2 || ""}
                            onChange={(e) => setEditProduct({ ...editProduct, img2: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Features"
                            value={editProduct.features || ""}
                            onChange={(e) => setEditProduct({ ...editProduct, features: e.target.value })}
                        />
                    </div>
                    <div className="mt-4 flex gap-2">
                        <button
                            onClick={handleSaveEdit}
                            className="bg-green-500 text-white px-3 py-1 rounded"
                        >
                            Save
                        </button>
                        <button
                            onClick={() => setEditProduct(null)}
                            className="bg-gray-500 text-white px-3 py-1 rounded"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
