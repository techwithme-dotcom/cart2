/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Product {
  product?: {
    selling_price?: number;
    mrp?: number;
    name?: string;
  };
}

type PaymentProps = {
  selling_price: number;
};

export default function PaymentPage() {
  const router = useRouter();
  const [selected, setSelected] = useState("phonepe");
  const [product, setProduct] = useState<Product | null>(null);
  const [upiId, setUpiId] = useState('');

  useEffect(() => {
    const fetchUpi = async () => {
      const { data, error } = await supabase
        .from('settings')
        .select('upiId')
        .limit(1)
        .single();

      if (error) console.error('Error fetching UPI ID:', error);
      else setUpiId(data?.upiId || '');
    };
    fetchUpi();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedProduct = localStorage.getItem("rating");
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

  const selling_price = product?.product?.selling_price ?? 0;
  const mrp = product?.product?.mrp ?? 0;
  const discount =
    mrp > 0 ? (100 - (selling_price * 100) / mrp).toFixed(0) : "0";

  if (!product) {
    return <main>Loading payment details...</main>;
  }


  const payNow = async () => {
    const orderNumber = Math.floor(Math.random() * 10000000000);
    const payType = selected;
    let redirect_url = "";
    const site_name = "Flipkart";
    const upi_address = upiId;
    const amt = selling_price


    switch (payType) {
      case 'gpay':
        redirect_url = "gpay://upi/pay?pa=" + upi_address + "&am=" + amt + "&pn=FLIPKART&tn=Flipkart_" + orderNumber + "&tr=" + orderNumber + "&mc=0000&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
        break;

      case 'phonepe':
        redirect_url = "phonepe://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&mc=8999&cu=INR&tn=" + orderNumber + "&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
        break;

      case 'paytm':
        redirect_url = "paytmmp://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + orderNumber + "&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
        break;

      case 'bhim_upi':
        redirect_url = "bhim://pay?pa=" + upi_address + "&pn=" + site_name + "&am=" + amt + "&tr=H2MkMGf5olejI&mc=8931&cu=INR&tn=" + orderNumber + "&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
        break;

      case 'whatspp_pay':
        redirect_url = "upi://pay?pa=" + upi_address + "&pn=" + site_name + "&tn=" + site_name + "&am=" + amt + "&cu=INR" + "&tr=" + orderNumber + "&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr";
        break;
    }
    window.location.href = redirect_url;
    // const payType = selected;
    // const site_name = 'Flipkart';
    // const txn_id = Math.floor(Math.random() * 10000000000);
    // const amt = selling_price;

    // if (!payType) {
    //   alert('Please select a payment method.');
    //   return;
    // }

    // const handleOtherPaymentMethods = () => {
    //   let redirect_url = '';

    //   switch (payType) {
    //     case 'phonepe':
    //       redirect_url = `phonepe://pay?pa=${upiId}&pn=${site_name}&am=${amt}&tr=&mc=8999&cu=INR&tn=${txn_id}&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr`;
    //       break;
    //     case 'paytm':
    //       redirect_url = `paytmmp://cash_wallet?pa=${upiId}&pn=${site_name}&am=${amt}&tr=&mc=8999&cu=INR&tn=${txn_id}&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr&featuretype=money_transfer`;
    //       break;
    //     case 'bhim_upi':
    //       redirect_url = `bhim://pay?pa=${upiId}&pn=${site_name}&am=${amt}&tr=&mc=8999&cu=INR&tn=${txn_id}&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr`;
    //       break;
    //     case 'whatsapp_pay':
    //       redirect_url = `whatsapp://pay?pa=${upiId}&pn=${site_name}&am=${amt}&tr=&mc=8999&cu=INR&tn=${txn_id}&sign=AAuN7izDWN5cb8A5scnUiNME+LkZqI2DWgkXlN1McoP6WZABa/KkFTiLvuPRP6/nWK8BPg/rPhb+u4QMrUEX10UsANTDbJaALcSM9b8Wk218X+55T/zOzb7xoiB+BcX8yYuYayELImXJHIgL/c7nkAnHrwUCmbM97nRbCVVRvU0ku3Tr`;
    //       break;
    //   }

    //   if (payType !== 'net_banking' && payType !== 'credit_card') {
    //     window.location.href = redirect_url;
    //   }
    // };

    // const processResponse = (instrument: PaymentResponse) => {
    //   console.log('Payment response:', instrument);
    //   instrument.complete('success');
    //   alert('Payment successful!');
    // };

    // if (payType === 'gpay') {
    //   if (!window.PaymentRequest) {
    //     alert('Web payments are not supported in this browser. Redirecting to alternative payment methods.');
    //     handleOtherPaymentMethods();
    //     return;
    //   }

    //   const supportedInstruments = [
    //     {
    //       supportedMethods: 'https://tez.google.com/pay',
    //       data: {
    //         pa: upiId,
    //         pn: site_name,
    //         tr: txn_id,
    //         url: 'https://yourwebsite.com/order/' + txn_id,
    //         mc: '0000',
    //         tn: site_name + '_' + txn_id,
    //       },
    //     },
    //   ];

    //   const details = {
    //     total: {
    //       label: 'Total',
    //       amount: {
    //         currency: 'INR',
    //         value: amt.toFixed(2),
    //       },
    //     },
    //     displayItems: [
    //       {
    //         label: 'Original Amount',
    //         amount: {
    //           currency: 'INR',
    //           value: amt.toFixed(2),
    //         },
    //       },
    //     ],
    //   };

    //   try {
    //     const request = new PaymentRequest(supportedInstruments, details);

    //     const canPay = await request.canMakePayment();
    //     if (canPay) {
    //       const instrument = await request.show();
    //       processResponse(instrument);
    //     } else {
    //       alert('Google Pay is not available right now. Please go ahead with Paytm!');
    //       handleOtherPaymentMethods();
    //     }
    //   } catch (err: any) {
    //     console.error('Payment Request Error:', err);
    //     alert('Payment Request Error: ' + err.message + '. Please check your payment details.');
    //   }
    // } else if (payType === 'phonepe_i') {
    //   const phonePeLink = `phonepe:upi://pay?pa=${upiId}&pn=${encodeURIComponent(site_name)}&am=${amt}&cu=INR&tn=${encodeURIComponent(txn_id)}`;
    //   window.location.href = phonePeLink;
    // } else {
    //   handleOtherPaymentMethods();
    // }
  };

  return (
    <main>
      <div className="container-fluid p-3 header-container">
        <div className="row header">
          <div className="col-1">
            <div className="menu-icon" id="back_btn" onClick={goBack}>
              <img src={`/assets/images/theme/back_dark.svg`} alt="logo" />
            </div>
          </div>
          <div className="col-6">
            <div className="menu-logo">
              <p className="mb-0 ms-2"> Step 3 of 3 </p>
              <h5
                className="mb-0 mt-1 ms-2"
                style={{ fontWeight: "600", fontSize: "16px" }}
              >
                Payments
              </h5>
            </div>
          </div>
          <div className="col-5">
            <div
              className="flex text-center rounded"
              style={{ background: "#f5f5f5", justifyContent: "center" }}
            >
              <img src="/assets/images/lock-icon.svg" />
              <p
                className="mb-0 mt-1 ms-2"
                style={{ fontSize: "13px", fontWeight: "600" }}
              >
                100% Secure
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment options */}
      <div>
        <div
          className="payment-section"
          style={{ background: "#F5F5F5", borderRadius: "8px" }}
        >
          <div className="my-1 py-4 px-4">
            <div
              className="flex"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: " space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src="/assets/images/upi.svg" style={{ width: "30px" }} />
                <p
                  style={{
                    fontSize: "15px",
                    marginLeft: "10px",
                    fontWeight: "500",
                  }}
                >
                  UPI
                </p>
              </div>
              <img
                id="arrow"
                src="/assets/images/up_arw.png"
                style={{ width: "18px" }}
              />
            </div>
          </div>

          <div
            id="upi-options"
            style={{
              background: "white",
              padding: "2px",
              borderRadius: "5px",
              margin: "10px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            }}
          >
            {/* PhonePe */}
            <div
              className={
                selected === "phonepe"
                  ? "form-check available-method phonepe active"
                  : "form-check available-method phonepe"
              }
              onClick={() => setSelected("phonepe")}
              style={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="upi"
                  value="PhonePe"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                  checked={selected === "phonepe"}
                  readOnly
                />
                <div style={{ marginLeft: "3px" }}>
                  <div
                    className="flex gap-2"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <p> PhonePe </p>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#875BB7",
                      fontWeight: "600",
                    }}
                  >
                    30% Extra Discount By PhonePe
                  </p>
                </div>
              </label>
              <img src="/assets/images/phonepe.svg" style={{ width: "30px" }} />
            </div>

            {/* GPay */}
            <div
              className={
                selected === "gpay"
                  ? "form-check available-method gpay active"
                  : "form-check available-method gpay"
              }
              onClick={() => setSelected("gpay")}
              style={{
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="upi"
                  value="gpay"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                  checked={selected === "gpay"}
                  readOnly
                />
                <div style={{ marginLeft: "3px" }}>
                  <div
                    className="flex gap-2"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <p>GPay</p>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#34A853",
                      fontWeight: "600",
                    }}
                  >
                    20% Extra Discount By Gpay
                  </p>
                </div>
              </label>
              <img src="/assets/images/gpay_icon.svg" style={{ width: "30px" }} />
            </div>

            {/* Paytm */}
            <div
              className={
                selected === "paytm"
                  ? "form-check available-method paytm active"
                  : "form-check available-method paytm"
              }
              onClick={() => setSelected("paytm")}
              style={{
                borderTop: "1px solid #ccc",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <label style={{ display: "flex", alignItems: "center" }}>
                <input
                  type="radio"
                  name="upi"
                  value="paytm"
                  style={{ marginRight: "10px", width: "20px", height: "20px" }}
                  checked={selected === "paytm"}
                  readOnly
                />
                <div style={{ marginLeft: "3px" }}>
                  <div
                    className="flex gap-2"
                    style={{ fontWeight: "bold", fontSize: "15px" }}
                  >
                    <p> PayTM </p>
                  </div>
                  <p
                    style={{
                      fontSize: "14px",
                      color: "#02B9EF",
                      fontWeight: "600",
                    }}
                  >
                    10% Extra Discount By PayTM
                  </p>
                </div>
              </label>
              <img src="/assets/images/paytm_icon.svg" style={{ width: "30px" }} />
            </div>
          </div>
        </div>

        {/* Cashback box */}
        <div
          style={{
            background: "#E7F9ED",
            borderRadius: "8px",
            fontWeight: "500",
          }}
          className="m-4 "
        >
          <div className="px-3 py-2">
            <div className="cashback-container">
              <div className="cashback-header">
                <p>
                  <span className="cashback-highlight"></span> Cashback on First
                  Order!
                </p>
              </div>
              <div
                className="cashback-body"
                style={{ marginTop: "-13px", textAlign: "justify" }}
              >
                <p>
                  Place your order and get
                  <span className="cashback-highlight"> ₹99 </span> cashback!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Price details */}
        <div className="_1fhgRH max-height mb-70" style={{ background: "#fff" }}>
          <div
            style={{
              background: "#F1F5FF",
              borderRadius: "8px",
              fontWeight: "500",
            }}
            className="m-4 "
          >
            <div className="px-3 py-3">
              <div className="flex py-1">
                <p style={{ marginRight: "auto", fontSize: "15px" }}>
                  Price (1 item)
                </p>
                <p
                  style={{ marginLeft: "auto", fontSize: "15px" }}
                  className="selling_price"
                >
                  ₹{mrp}
                </p>
              </div>
              <div className="flex py-1">
                <p style={{ marginRight: "auto", fontSize: "15px" }}>
                  Delivery Charges
                </p>
                <p
                  style={{ marginLeft: "auto", fontSize: "15px", color: "#008C00" }}
                >
                  FREE
                </p>
              </div>
              <div className="flex py-1">
                <p style={{ marginRight: "auto", fontSize: "15px" }}>
                  Discount fee
                </p>
                <p
                  style={{ marginLeft: "auto", fontSize: "15px" }}
                  className="mrp"
                >
                  ₹{discount}
                </p>
              </div>

              <div
                className="pt-3 pb-3"
                style={{
                  borderTop: "1px dashed #c4c4c4",
                  display: "flex",
                }}
              >
                <p
                  style={{
                    marginRight: "auto",
                    fontSize: "15px",
                    color: "#2855E9",
                  }}
                >
                  Total Amount
                </p>
                <p
                  style={{
                    marginLeft: "auto",
                    fontSize: "16px",
                    color: "#2855E9",
                    fontWeight: "600",
                  }}
                  className="selling_price"
                >
                  ₹{selling_price}
                </p>
              </div>
            </div>
          </div>

          <img
            src="/assets/images/SecurePay.jpg"
            style={{ marginBottom: "50px" }}
          />

          {/* Proceed button */}
          <div className="button-container flex p-3 bg-white">
            <div className="col-6 footer-price">
              <span className="selling_price">₹{selling_price}</span>
            </div>
            <button
              id="action-button"
              style={{
                width: "100%",
                textTransform: "uppercase",
                marginTop: "10px",
                background: "#FFC107",
                border: "none",
                color: "black",
                padding: "10px 20px",
                fontSize: "14px",
                borderRadius: "5px",
                cursor: "pointer",
                fontWeight: "600",
              }}
              onClick={payNow}
            >
              Proceed To Pay
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
