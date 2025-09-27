/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import "./ordersummary.css";

interface Address {
  name?: string;
  flat?: string;
  area?: string;
  city?: string;
  state?: string;
  pin?: string;
  number?: string;
}

interface Product {
  product?: {
    img1?: string;
    selling_price?: number;
    mrp?: number;
    name?: string;
  };
}
export default function OrderSummaryPage() {
  const router = useRouter();

  const [address, setAddress] = useState<Address | null>(null);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedAddress = localStorage.getItem("address");
      const storedProduct = localStorage.getItem("rating");

      if (storedAddress) {
        try {
          setAddress(JSON.parse(storedAddress));
        } catch {
          setAddress(null);
        }
      }

      if (storedProduct) {
        try {
          setProduct(JSON.parse(storedProduct));
        } catch {
          setProduct(null);
        }
      }
    }
  }, []);

  const goBack = () => {
    router.back(); // takes user to previous page in history
  };



  const productImg = product?.product?.img1;
  const selling_price = product?.product?.selling_price ?? 0;
  const mrp = product?.product?.mrp ?? 0;
  const discount =
    mrp > 0 ? (100 - (selling_price * 100) / mrp).toFixed(0) : "0";

  if (!address || !product) {
    return <main>Loading order summary...</main>;
  }
  return (
    <main>
      <div className="container-fluid p-3 header-container">
        <div className="row header">
          <div className="col-1">
            <div className="menu-icon" id="back_btn" onClick={goBack}>
              <img src={`/assets/images/theme/back_dark.svg`} alt="logo" />
            </div>
          </div>
          <div className="col-8">
            <div className="menu-logo">
              <h4 className="mb-0 mt-1 ms-2">Order Summary</h4>
            </div>
          </div>
        </div>
      </div>
      <div className="_1fhgRH max-height mb-70">
        <div className="card pt-1 mb-1">
          <div className="progress-box mb-0" style={{ marginTop: 44 }}>
            <img className="w-100" src="/assets/images/theme/progress-indicator-summary.png" alt="progress" />
          </div>
        </div>
        <div className="card px-3 py-4 mb-2">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%'
          }}>
            <h3 style={{ color: 'rgb(17, 17, 18)', fontWeight: '600', fontSize: '16px' }}>Deliver to:</h3>
            <p style={{
              color: '#2a55e5',
              fontSize: '13px',
              border: '1px solid #dbdbdb',
              padding: '5px 10px',
              fontWeight: '600',
              cursor: 'pointer'
            }}
              className='rounded'
            // onclick="handleChangeAdd()"
            >
              Change </p>

          </div>
          <div className="address-div">
            <div className='flex gap-2'>
              <h4 className="customer-name" style={{ fontWeight: 600 }}>{address?.name}</h4>
              <span style={{ padding: '2px 7px', color: '#717478', background: '#f0f2f5' }}
                className='rounded'>Home</span>
            </div>
            <div className="mb-2 customer-address" style={{ fontSize: '14px' }}>{address?.flat}, {address?.area}, {address?.city}, {address.state}, {address?.pin}</div>
            <div className="customer-contact" style={{ fontSize: '14px', marginTop: '8px' }}>{address.number}</div>
          </div>
        </div>

        <div className="card px-3 py-2 mb-2">
          <div className='flex gap-2'>
            <p style={{
              background: '#00a098',
              width: 'fit-content',
              color: 'white',
              paddingBottom: '0rem',
              marginBottom: '1rem',
              padding: '3px 4px',
              fontWeight: '600'
            }}> BESTSELLER </p>
            <p style={{
              backgroundColor: '#c7ffd3',
              fontSize: '12px',
              color: 'rgb(38, 165, 65)',
              fontWeight: '600',
              padding: '2px 6px'
            }}>
              Hot Deal
            </p>
          </div>
          <ul className="list-group list-group-flush" style={{ marginTop: -10, border: 'none' }}>
            <li className="list-group-item px-0">
              <div className="flex recommended-product" style={{ alignItems: 'flex-start' }}>
                <div>
                  <img src={productImg || "/assets/images/review_1.jpg"} style={{ width: 96, height: "auto" }} />
                  <div className="flex recommended-product ">
                    <div className="timer qty " style={{ border: "1px solid #dbdbdb", padding: "1px 11px", fontSize: 14, fontWeight: 600, marginTop: 10 }}>Qty: 1</div>
                  </div>
                </div>
                <div className="description">
                  <div className="product-title mb-1">{product?.product?.name}</div>
                  <p style={{ marginBottom: 0, fontSize: 14, color: "#878787" }}>Multicolor</p>
                  <div style={{ flex: 1 }} />
                  <div className="price flex">
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" style={{ marginTop: '5px' }}>
                      <path d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z" fill="#008C00">
                      </path></svg>
                    <span className="discount" style={{ fontWeight: 600 }}>{discount}% off</span>
                    <span className="strike mrp" style={{ color: "#DC3545", marginLeft: 8 }}>₹{mrp}</span>
                    <span className="selling_price" style={{ marginLeft: 8 }}>₹{selling_price}</span>
                  </div>
                  <div className='flex gap-3'>
                    <p style={{ fontWeight: '600', color: '#008C00', fontSize: '12px' }} className='py-2'> 1 coupon applied </p>
                    <p style={{ height: '4px', width: '4px', backgroundColor: '#008C00', borderRadius: '50%', display: 'inline-block', marginTop: '15px' }}> </p>
                    <p style={{ fontWeight: '600', color: '#008C00', fontSize: '12px' }} className='py-2'>1 offer available</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2" style={{ fontSize: 13, marginTop: 0 }}>
                <p>Delivery by</p>
                <p style={{ color: "#008C00", fontWeight: 600 }}>Free</p>
              </div>
            </li>
          </ul>
        </div>
        <div className=' px-3   flex gap-3' style={{ background: '#f0f2f5' }}>
          <img src='/assets/images/cart.webp' style={{ width: '9%', height: '4%' }} className="py-2" />
          <div className="py-2" style={{ display: 'flex', alignItems: 'center' }}>
            Cancellation is allowed up to 48 hours after placing the order.
          </div>
        </div>
        <div className=' px-4 py-3 mb-2 ' style={{ background: 'white' }}>

          <div className="flex gap-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <img src="/assets/images/invoice.webp" style={{ width: '20%', height: '4%' }} />
              <div style={{ fontSize: '15px' }}>
                Invoice
              </div>
            </div>
            <div style={{ color: '#2874f0', fontSize: '15px' }}>
              Add Email
            </div>
          </div>
        </div>

        <div>
          <div className='flex p-2 bg-[#f0f2f5] gap-2'>
            <div style={{ width: '22%' }}>
              <img src='/assets/images/vip-card.png' style={{ width: '100%', height: 'auto' }} />
            </div>
            <div style={{ width: '88%' }}>
              <p style={{ fontWeight: '600', fontSize: '15px', color: 'black' }} className='pt-2 pb-0 mb-0'> Get Benefit Worth of ₹10000 Per
                Year </p>
              <p style={{ fontSize: '12px', color: 'black' }} className='pt-1 mb-0'> For Exclusive Discount up to 80% on All product
                up to 12 Months. Limited Time Offer | Become VIP Member </p>
              <div className='flex gap-3 pt-2'>
                <p style={{ fontSize: '15px', fontWeight: '600', color: 'black' }}>₹199 For 12 Months</p>
                <button className='bg-[#FABC07] px-2 rounded'
                  style={{ fontSize: '13px', height: '29px', background: '#FBBC05', border: '0px' }}>Get VIP Member </button>
              </div>
            </div>
          </div>
          <div className="donation-card mt-2">
            <div className="donation-header" style={{ paddingTop: '9px', width: '100%' }}>
              <div style={{ width: '74%', paddingLeft: '10px' }}>
                <h2>Direct UPI Payment</h2>
                <p>Support transformative social work in India</p>
              </div>
              <img src="/assets/images/Image (1).png" style={{ width: '20%', marginLeft: '22px' }}
                alt="Girls with books" />
            </div>
            <hr />
            <div className="donation-buttons ">
              <button>₹10</button>
              <button>₹20</button>
              <button>₹50</button>
              <button>₹100</button>
            </div>
            <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
            <p className="donation-note" style={{ fontWeight: '600' }}>Note: GST and No cost EMI will not be applicable</p>
          </div>
          <div className=' px-3 py-2 flex gap-3' style={{ background: '#e7f8ec', marginTop: '-11px' }}>
            <img src='/assets/images/card.webp' style={{ width: '9%', height: '4%' }} />
            <div style={{ fontSize: '14px', marginTop: '5px' }}>
              Continue to the next page for Bank Offers.
            </div>
          </div>
        </div>
        <div className="card px-3 py-4 mb-2" id="price-detail">
          <h3>Price Details</h3>
          <div className="price-detail-div mt-2">
            <div className="product-price-list my-3">
              <span className="title">Price (1 item)</span>
              <span className="data mrp me-0 td-none">₹{mrp}</span>
            </div>
            <div className="product-price-list my-3">
              <span className="title">Discount</span>
              <span className="data discount-amt text-success">-₹{mrp - selling_price}</span>
            </div>
            <div className="product-price-list my-3">
              <span className="title">Delivery Charges</span>
              <span className="data text-success">FREE Delivery</span>
            </div>
            <div className="product-price-list my-3 pt-3 total">
              <span className="title">Total Amount</span>
              <span className="data selling_price">₹{selling_price}</span>
            </div>
            <div className="product-price-list mt-3 pt-3 saved-div">
              <span className="text-success">You will save <span className="discount-amt">₹{mrp - selling_price}</span> on this order</span>
            </div>
          </div>
        </div>
        <div className="sefty-banner">
          <img className="sefty-img" src="https://rukminim1.flixcart.com/www/60/70/promos/13/02/2019/9b179a8a-a0e2-497b-bd44-20aa733dc0ec.png?q=90" loading="lazy" alt="" />
          <div dir="auto" className="sefty-txt">Safe and secure payments. Easy returns. 100% Authentic products.</div>
        </div>
        <div className="button-container flex p-3 bg-white">
          <div className="col-6 footer-price">
            <span className="strike mrp ms-0 mb-1">₹{mrp}</span>
            <span className="selling_price">₹{selling_price}</span>
          </div>
          <button className="buynow-button product-page-buy col-6 btn-continue" style={{ width: "100%", background: "#FFC107", border: "none", color: "black", fontWeight: 600 }} onClick={() => router.push("/payment")}>
            Continue To Payment
          </button>
        </div>
      </div>
    </main >
  );
}


