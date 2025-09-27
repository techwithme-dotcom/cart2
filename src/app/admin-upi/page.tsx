'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useRouter } from 'next/navigation';

export default function AdminUpiPage() {
    const [upiId, setUpiId] = useState('');
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check if admin is logged in
    useEffect(() => {
        supabase.auth.getSession().then(({ data }) => {
            if (!data.session?.user) {
                router.push('/admin-login'); // redirect to login if not authenticated
            } else {
                fetchUpi();
            }
        });
    }, []);

    // Fetch current UPI ID
    const fetchUpi = async () => {
        const { data, error } = await supabase
            .from('settings')
            .select('upiId')
            .limit(1)
            .single();

        if (error) {
            console.error('Error fetching UPI ID:', error);
        } else {
            setUpiId(data?.upiId || '');
        }
        setLoading(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const { data: existing } = await supabase
            .from('settings')
            .select('id')
            .limit(1)
            .single();

        if (existing?.id) {
            // Update existing row
            const { error } = await supabase
                .from('settings')
                .update({ upiId })
                .eq('id', existing.id);

            if (error) alert('Failed to update UPI ID: ' + error.message);
            else alert('UPI ID updated successfully!');
        } else {
            // Insert new row
            const { error } = await supabase.from('settings').insert({ upiId });

            if (error) alert('Failed to add UPI ID: ' + error.message);
            else alert('UPI ID added successfully!');
        }

        setLoading(false);
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>Update UPI ID</h2>
            <button
                onClick={() => router.push("/upload-products")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Products page
            </button>
            <button
                onClick={() => router.push("/admin-pixel")}
                className="bg-blue-500 text-white px-4 py-2 rounded"
            >
                Pixels
            </button>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="Enter UPI ID"
                    required
                    style={{ padding: 8, width: 300, marginRight: 8 }}
                />
                <button type="submit" style={{ padding: 8 }}>
                    Save
                </button>
            </form>
        </div>
    );
}
