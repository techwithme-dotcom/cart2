/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const amount = req.nextUrl.searchParams.get("amount") || "100";
  const base = process.env.NEXT_PUBLIC_PHP_BASE_URL || process.env.PHP_BASE_URL;
  if (!base) {
    return NextResponse.json({ status: "error", message: "PHP_BASE_URL missing" }, { status: 500 });
  }
  const url = `${base}create_order.php?amount=${encodeURIComponent(amount)}`;
  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (e : any) {
    return NextResponse.json({ status: "error", message: e?.message || "Proxy error" }, { status: 500 });
  }
}


