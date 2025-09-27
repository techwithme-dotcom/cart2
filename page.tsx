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
            <div className="menu-icon" id="back_btn">
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
            <img
              className="w-100"
              src="/assets/images/theme/progress-indicator-summary.png"
              alt="progress"
            />
          </div>
        </div>

        {/* Address */}
        <div className="card px-3 py-4 mb-2">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h3
              style={{
                color: "rgb(17, 17, 18)",
                fontWeight: "600",
                fontSize: "16px",
              }}
            >
              Deliver to:
            </h3>
            <p
              style={{
                color: "#2a55e5",
                fontSize: "13px",
                border: "1px solid #dbdbdb",
                padding: "5px 10px",
                fontWeight: "600",
                cursor: "pointer",
              }}
              className="rounded"
            >
              Change
            </p>
          </div>
          <div className="address-div">
            <div className="flex gap-2">
              <h4 className="customer-name" style={{ fontWeight: 600 }}>
                {address?.name}
              </h4>
              <span
                style={{
                  padding: "2px 7px",
                  color: "#717478",
                  background: "#f0f2f5",
                }}
                className="rounded"
              >
                Home
              </span>
            </div>
            <div
              className="mb-2 customer-address"
              style={{ fontSize: "14px" }}
            >
              {address?.flat}, {address?.area}, {address?.city},{" "}
              {address?.state}, {address?.pin}
            </div>
            <div
              className="customer-contact"
              style={{ fontSize: "14px", marginTop: "8px" }}
            >
              {address?.number}
            </div>
          </div>
        </div>

        {/* Product card */}
        <div className="card px-3 py-2 mb-2">
          <div className="flex gap-2">
            <p
              style={{
                background: "#00a098",
                width: "fit-content",
                color: "white",
                marginBottom: "1rem",
                padding: "3px 4px",
                fontWeight: "600",
              }}
            >
              BESTSELLER
            </p>
            <p
              style={{
                backgroundColor: "#c7ffd3",
                fontSize: "12px",
                color: "rgb(38, 165, 65)",
                fontWeight: "600",
                padding: "2px 6px",
              }}
            >
              Hot Deal
            </p>
          </div>

          <ul
            className="list-group list-group-flush"
            style={{ marginTop: -10, border: "none" }}
          >
            <li className="list-group-item px-0">
              <div
                className="flex recommended-product"
                style={{ alignItems: "flex-start" }}
              >
                <div>
                  <img
                    src={productImg || "/assets/images/review_1.jpg"}
                    style={{ width: 96, height: "auto" }}
                  />
                  <div className="flex recommended-product ">
                    <div
                      className="timer qty "
                      style={{
                        border: "1px solid #dbdbdb",
                        padding: "1px 11px",
                        fontSize: 14,
                        fontWeight: 600,
                        marginTop: 10,
                      }}
                    >
                      Qty: 1
                    </div>
                  </div>
                </div>
                <div className="description">
                  <div className="product-title mb-1">
                    {product?.product?.name}
                  </div>
                  <p
                    style={{ marginBottom: 0, fontSize: 14, color: "#878787" }}
                  >
                    Multicolor
                  </p>
                  <div style={{ flex: 1 }} />
                  <div className="price flex">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{ marginTop: "5px" }}
                    >
                      <path
                        d="M6.73461 1V8.46236L9.5535 5.63352L10.5876 6.65767L5.99384 11.2415L1.41003 6.65767L2.42424 5.63352L5.25307 8.46236V1H6.73461Z"
                        fill="#008C00"
                      ></path>
                    </svg>
                    <span
                      className="discount"
                      style={{ fontWeight: 600 }}
                    >{`${discount}% off`}</span>
                    <span
                      className="strike mrp"
                      style={{ color: "#DC3545", marginLeft: 8 }}
                    >
                      ₹{mrp}
                    </span>
                    <span
                      className="selling_price"
                      style={{ marginLeft: 8 }}
                    >
                      ₹{selling_price}
                    </span>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Price details */}
        <div className="card px-3 py-4 mb-2" id="price-detail">
          <h3>Price Details</h3>
          <div className="price-detail-div mt-2">
            <div className="product-price-list my-3">
              <span className="title">Price (1 item)</span>
              <span className="data mrp me-0 td-none">₹{mrp}</span>
            </div>
            <div className="product-price-list my-3">
              <span className="title">Discount</span>
              <span className="data discount-amt text-success">
                -₹{mrp - selling_price}
              </span>
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
              <span className="text-success">
                You will save{" "}
                <span className="discount-amt">
                  ₹{mrp - selling_price}
                </span>{" "}
                on this order
              </span>
            </div>
          </div>
        </div>

        {/* Continue button */}
        <div className="button-container flex p-3 bg-white">
          <div className="col-6 footer-price">
            <span className="strike mrp ms-0 mb-1">₹{mrp}</span>
            <span className="selling_price">₹{selling_price}</span>
          </div>
          <button
            className="buynow-button product-page-buy col-6 btn-continue"
            style={{
              width: "100%",
              background: "#FFC107",
              border: "none",
              color: "black",
              fontWeight: 600,
            }}
            onClick={() => router.push("/payment")}
          >
            Continue To Payment
          </button>
        </div>
      </div>
    </main>
  );
}
