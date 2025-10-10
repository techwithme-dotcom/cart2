// src/app/api/create-deeplink/route.ts

import { NextRequest, NextResponse } from "next/server";

async function getAccessToken() {
  const client_id = process.env.PAYU_CLIENT_ID!;
  const client_secret = process.env.PAYU_CLIENT_SECRET!;
  const tokenUrl = process.env.PAYU_TOKEN_URL!; // e.g. https://accounts.payu.in/oauth/token

  const resp = await fetch(tokenUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id,
      client_secret,
      scope: "create_payment_links",
    }).toString(),
  });

  const j = await resp.json();
  if (!resp.ok) {
    throw new Error(`Token fetch failed: ${j.error || resp.statusText}`);
  }
  return j.access_token;
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { amount, txnId, productInfo, customerEmail, customerPhone } = body;

  try {
    const token = await getAccessToken();

    // Now call PayU’s payment link API
    const response = await fetch(`${process.env.PAYU_BASE_URL}/paymentLinks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount,
        txnId,
        productInfo,
        customerEmail,
        customerPhone,
        paymentMethods: "UPI",
        redirectUrl: `${req.nextUrl.origin}/success`,
        failureUrl: `${req.nextUrl.origin}/failure`,
      }),
    });

    const data = await response.json();
    if (!response.ok || !data.paymentLink) {
      return NextResponse.json({ error: data.message || "Failed to create link" }, { status: 400 });
    }

    return NextResponse.json({ deepLink: data.paymentLink });
  } catch (err: any) {
    console.error("ERROR in PayU API:", err);
    return NextResponse.json({ error: err.message || "Internal error" }, { status: 500 });
  }
}
