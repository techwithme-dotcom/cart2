/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Countdown } from "@/components/Countdown";
import ProductCarousel from "@/components/ProductCarousel";
import ProductFeatures from "@/components/ProductFeature";
import ProductRatings from "@/components/ProductRatings";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductDetailsClient({ data }: any) {
    const [timeLeft, setTimeLeft] = useState(15 * 60 + 10); // 15:10

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formatted = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;

    return (
        <main className="container-fluid p-0">
            <div className="container-fluid py-2 header-container" style={{ backgroundColor: "#2874f0" }}>
                <div className="row header">
                    <div className="col-1">
                        <div className="menu-icon" id="back_btn">
                            <Link href="/">
                                <img src={`/assets/images/theme/back.svg`} alt="logo" />
                            </Link>
                        </div>
                    </div>
                    <div className="col-2">
                        <div className="menu-logo" style={{ width: 85 }}>
                            <Link className="Z4_K_h" href="/">
                                <img src={`/img/Q18Ifxk.png`} alt="logo" style={{ width: '85px', height: '30px' }} />
                            </Link>
                        </div>
                    </div>
                    <div className="col-6" />
                    <div className="col-1"><div className="menu-icon"> <img src={`/assets/images/theme/search.svg`} alt="logo" /></div></div>
                    <div className="col-1"><div className="menu-icon"> <svg width="16" height="16" viewBox="0 0 15 15">
                        <g fill="#fff" fillRule="evenodd">
                            <path d="m5.189 13.04c0 .996-.791 1.804-1.767 1.804-.976 0-1.767-.808-1.767-1.804 0-.996.791-1.804 1.767-1.804.976 0 1.767.808 1.767 1.804"></path>
                            <path d="m14.912 2.259h-14.298l2.247 6.917c.042.129.16.216.293.216h8.06c-.064.69-.629 1.841-1.702 1.841h-6.04l1.072 1.991h5.611c1.881 0 2.938-2.278 3.657-4.719.888-3.01 1.219-6.245 1.106-6.245"></path>
                            <path d="m.615 2.259l-.592-1.828c-.08-.207.069-.431.287-.431h1.482c.126 0 .24.079.287.198l.682 2.061c0 0-.63 1.642-1.942.066"></path>
                            <path d="m2.262.756c0 0 .498 1.503 2.234 1.503l-1.736.749-1.104-.749.607-1.503"></path>
                            <path d="m13.424 13.325c0 .837-.664 1.516-1.484 1.516-.82 0-1.484-.679-1.484-1.516 0-.837.664-1.516 1.484-1.516.82 0 1.484.679 1.484 1.516"></path>
                        </g>
                    </svg></div></div>
                </div>
            </div>

            <div className="_1fhgRH mb-5">
                <div className="container p-1 card">
                    <div className="container-fluid px-0 product-slider">
                        <ProductCarousel images={[data?.img1, data?.img2, data?.img3, data?.img4, data?.img5].filter(Boolean) as string[]} />
                        <div className="row align-items-center justify-content-center mt-2" style={{ width: '100%' }}>
                            <div className="col-auto">
                                <h4 className="m-0"><b>Only <span className="text-danger">12</span> Left in Stock</b></h4>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container-fluid p-3 mt-1 card">
                    <div className="product-title" style={{ color: "#3b3b3b", fontWeight: "bold" }}>
                        {data?.name || "Product"}
                    </div>
                    <ProductRatings />
                    <div className="product-price d-flex my-2">
                        <span className="discount">{data?.mrp > 0 ? (100 - (data?.selling_price * 100) / data?.mrp).toFixed(0) : "0"}% off</span>
                        <span className="mrp" style={{ color: "#DC3545" }}>{data?.mrp}</span>
                        <span className="price">₹{data?.selling_price}</span>
                    </div>
                </div>
                <div className="container-fluid p-3 mt-1 card">
                    <div className="aMaAEs">
                        <div className="_3Zuayz">
                            <div className="_3_L3jD">
                                <div className="gUuXy- _16VRIQ _1eJXd3" style={{ display: 'flex', alignItems: 'center' }}>
                                    <span id="productRating_LSTETHFZZUWAC8X2PGQZ7T8VQ_ETHFZZUWAC8X2PGQ_" className="_1lRcqv">
                                        <img height="35" src="/assets/images/Incresase.svg" style={{ height: '35px' }} />
                                    </span>
                                    <span style={{ color: 'black', fontSize: '15px' }} className="_2_R_DZ">
                                        <b>
                                            <span style={{ color: '#C70055', fontWeight: 'bold' }}>
                                                {/* <?php echo(rand(23999,39999));?> */}
                                                {Math.floor(Math.random() * (39999 - 23999 + 1)) + 23999}
                                            </span>
                                        </b> people ordered this in the last 7 days
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid p-3 offerend-container card">
                    <h4 className="m-0"> Offer ends in <span className="offer-timer" id="offerend-time"><Countdown /></span></h4>
                </div>
                <div className="container-fluid mt-1 py-3"
                    style={{
                        backgroundColor: 'white',
                        fontFamily: 'Arial, sans-serif',
                        display: 'flex',
                        alignItems: "center",
                        padding: "4px 6px 8px 6px",
                    }}>
                    <img
                        src="https://i.ibb.co/cNHjpC7/truck.webp"
                        alt="Truck"
                        style={{ width: '24px', height: '24px', marginRight: "15px" }} />
                    <div>
                        <div
                            style={{
                                color: 'green',
                                letterSpacing: '-0.01px',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 'bold',
                                lineHeight: '20px',
                                fontSize: '14px',
                                display: 'inline'
                            }}>
                            FREE Delivery</div>
                        <span
                            style={{
                                fontSize: '14px',
                                lineHeight: '20px',
                                fontFamily: "'Inter', sans-serif",
                                letterSpacing: '-0.01px',
                                marginLeft: '5px',
                                fontWeight: 'bold',
                                color: '#111112'
                            }}>•
                            Delivery by</span>
                        <span id="delivery-date"
                            style={{
                                color: '#111112',
                                letterSpacing: '-0.01px',
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 'bold',
                                lineHeight: '20px',
                                fontSize: '14px',
                            }}
                        ></span>
                        <div
                            style={{
                                color: 'rgb(96, 98, 101)',
                                fontSize: '14px',
                                lineHeight: '20px',
                                letterSpacing: '-0.01px',
                                fontFamily: "'Inter', sans-serif"
                            }}>
                            If ordered within
                            <span id="timer"
                                style={{
                                    color: 'rgba(199, 0, 85, 1.00)',
                                    fontFamily: "'roboto', sans-serif",
                                    fontSize: '14px'
                                }}>
                                {formatted}
                            </span>
                        </div>

                    </div>
                    <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                        <svg width="14" height="14" fill="none" viewBox="0 0 17 17">
                            <path d="m6.627 3.749 5 5-5 5" stroke="#111112" stroke-width="1.2" stroke-linecap="round"
                                stroke-linejoin="round"></path>
                        </svg>
                    </div>
                </div>
                <div className="container-fluid px-2 py-3 d-flex feature-container product-extra card">
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img className="featured-img mb-3" src={`/assets/images/replacement.png`} alt="replace" />
                        <span className="feature-title"> 7 days Replacement </span>
                    </div>
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img className="featured-img mb-3" src={`/assets/images/non-cod.png`} alt="nocod" />
                        <span className="feature-title"> No Cash On Delivery </span>
                    </div>
                    <div className="col-4 featured-item d-flex align-items-center flex-column bd-highlight px-1">
                        <img className="featured-img mb-3 mt-1" src={`/assets/images/plue-fassured.png`} alt="fassured" />
                        <span className="feature-title"> Plus (F-Assured) </span>
                    </div>
                </div>

                <div className="container-fluid product-detail px-0 py-3 mb-4 card">
                    <h3 className="txt-product-detail">Product Detail</h3>
                    <ProductFeatures features={data?.features || ''} />
                    <div className="product-details" />
                    <img src={`/assets/images/review_1.jpg`} style={{ width: "100%" }} alt="rev1" />
                    <img src={`/assets/images/review_2.jpg`} style={{ width: "100%" }} alt="rev2" />
                    <img src={`/assets/images/review_3.jpg`} style={{ width: "100%" }} alt="rev3" />
                    <img src={`/assets/images/review_4.jpg`} style={{ width: "100%" }} alt="rev4" />
                </div>
            </div>

            <div className="button-container flex">
                <Link className="buynow-button buynow-button-white product-page-buy" style={{ width: "100%", border: "none", color: "black", fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} href="/address">
                    Add to Cart
                </Link>
                <Link className="buynow-button product-page-buy" style={{ width: "100%", background: "#FFC107", border: "none", color: "black", fontWeight: 600, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }} href="/address">
                    Buy Now
                </Link>
            </div>
        </main >
    );
}
