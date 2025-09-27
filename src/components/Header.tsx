import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b bg-white">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">DryFruit Store</Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/">Home</Link>
          <Link href="/address">Address</Link>
          <Link href="/order-summary">Order Summary</Link>
          <Link href="/payment">Payment</Link>
        </nav>
      </div>
    </header>
  );
}


