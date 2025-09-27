/* eslint-disable @typescript-eslint/no-explicit-any */


import { NextRequest, NextResponse } from "next/server";

// Generic proxy to PHP manage.php
export async function POST(req: NextRequest) {
  const base = process.env.NEXT_PUBLIC_PHP_BASE_URL || process.env.PHP_BASE_URL;
  if (!base) {
    return NextResponse.json({ success: 0, message: "PHP_BASE_URL missing" }, { status: 500 });
  }
  const url = `${base}api_services/manage.php`;
  const body = await req.text();
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": req.headers.get("content-type") || "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    const text = await res.text();
    return new NextResponse(text, { status: res.status, headers: { "content-type": res.headers.get("content-type") || "application/json" } });
  } catch (e: any) {
    return NextResponse.json({ success: 0, message: e?.message || "Proxy error" }, { status: 500 });
  }
}


