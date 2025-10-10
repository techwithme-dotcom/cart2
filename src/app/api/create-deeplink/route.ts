import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const { amount, txnId, productInfo, customerEmail, customerPhone } = body;

  const PAYU_BASE_URL = process.env.PAYU_BASE_URL!;
  const PAYU_KEY = process.env.PAYU_KEY!;
  const PAYU_AUTH_HEADER = process.env.PAYU_AUTH_HEADER!;

  try {
    const response = await fetch(`${PAYU_BASE_URL}/paymentLinks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${PAYU_AUTH_HEADER}`,
      },
      body: JSON.stringify({
        merchantKey: PAYU_KEY,
        amount,
        txnId,
        productInfo,
        customerEmail,
        customerPhone,
        paymentMethods: 'UPI',
        redirectUrl: `${req.nextUrl.origin}/success`,
        failureUrl: `${req.nextUrl.origin}/failure`,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json({ error: data.message || 'Failed to create deep link' }, { status: 400 });
    }

    return NextResponse.json({ deepLink: data.paymentLink });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Server error' }, { status: 500 });
  }
}
