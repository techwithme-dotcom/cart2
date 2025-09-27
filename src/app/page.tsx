/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Countdown } from "@/components/Countdown";
import { supabase } from "@/lib/supabaseClient";


export default function Home() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const root = "";
  const categories = [
    "assets/images/033f3268031fa0ba.webp",
    "assets/images/0f3d008be60995d4.webp",
    "assets/images/42f9a853f9181279.webp",
    "assets/images/cbcb478744635781.webp",
    "assets/images/913e96c334d04395.webp",
    "assets/images/1faac897db7fa1e8.webp",
    "assets/images/4be8a679014497f0.webp",
    "assets/images/6ecb75e51b607880.webp",
    "assets/images/3e6d75f631ab6055.webp",
    "assets/images/89d809684711712a.webp",
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching products:", error);
      } else if (data) {
        setProducts(data);
      }

      setLoading(false);
    };

    fetchProducts();
  }, []);
  return (
    <main className="container-fluid p-0">
      <div>
        <div className="_2dxSCm">
          <div className="_3CzzrP" style={{ background: "#2874f0" }}>
            <div className="_38U37R">
              <div>
                <div className="_1FWdmb" style={{ backgroundColor: "#2874f0" }}>
                  <div className="_3NH1qf" style={{ paddingLeft: '10px' }}>
                    <img alt="menu" src="/assets/images/theme/bars.svg" height={20} width={20} />
                  </div>
                  <div className="Z4_K_h" style={{ width: 85 }}>
                    <img src="/img/Q18Ifxk.png" className="_31Y9yB" style={{ width: 85 }} />
                  </div>
                  <div className="_2WBW6z" />
                  <div className="_3NH1qf">
                    <span className="_3oUaAZ _3ZecTM">
                      <img className="_2PBiNc" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxMiAxNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Im0yNTQuMTIgNTMuNjE3Yy4wMjkgMS4wMS4xMDEgMi4zODIuMTUgMi42OC4wMjUuMTUyLjE1Ni4yNjMuMzEuMjYzbC42NzIuMDIxYy4xNTQgMCAuMTc1LS4xMTEuMTk5LS4yNjQuMDQ5LS4zMDQuMTIyLTEuNjkyLjE1MS0yLjY5NyAxLS4wMjkgMi4zOTItLjEwMiAyLjY5Ny0uMTUxLjE1My0uMDI0LjI2NC0uMDQ1LjI2NC0uMTk5bC0uMDIxLS42NzJjMC0uMTU0LS4xMTEtLjI4NS0uMjYzLS4zMS0uMjk4LS4wNDktMS42NjktLjEyMS0yLjY4LS4xNS0uMDMxLS45ODYtLjEwMi0yLjMxMi0uMTQ5LTIuNjE1LS4wMjQtLjE1My0uMDQ0LS4yNjYtLjItLjI2NmwtLjY2OS0uMDIxYy0uMTU1IDAtLjI4Ni4xMTItLjMxLjI2NC0uMDQ4LjI5OS0uMTE5IDEuNjQxLS4xNDkgMi42NC0uOTk4LjAzLTIuMzQuMTAyLTIuNjQuMTQ5LS4xNTMuMDI0LS4yNjQuMTU2LS4yNjQuMzFsLjAyMS42NjljMCAuMTU1LjExMy4xNzYuMjY2LjIuMzAzLjA0NyAxLjYyOS4xMTggMi42MTUuMTQ5bTUuNzY1IDYuMzgzaC05LjYyMWMtLjQxMyAwLS43NjUtLjI2Ny0uODMxLS42MzMtLjE2Ni0uOTEzLS40MzUtNC43MDEtLjQzNS02Ljg2NyAwLTIuMTA0LjI3My01LjkzMi40MzgtNi44NjQuMDY1LS4zNjcuNDE4LS42MzYuODMyLS42MzZoOS42MTNjLjQxNiAwIC40NzEuMjcxLjUzNS42NC4xNjUuOTU2LjQ0MiA0LjgzNS40NDIgNi44NiAwIDIuMTEzLS4yNzIgNS45MzUtLjQzOCA2Ljg2NS0uMDY1LjM2Ny0uMTIuNjM1LS41MzQuNjM1IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjQ5LTQ1KSIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=" />
                    </span>
                  </div>
                  <div className="_3NH1qf">
                    <svg width="16" height="16" viewBox="0 0 15 15">
                      <g fill="#fff" fillRule="evenodd">
                        <path d="m5.189 13.04c0 .996-.791 1.804-1.767 1.804-.976 0-1.767-.808-1.767-1.804 0-.996.791-1.804 1.767-1.804.976 0 1.767.808 1.767 1.804"></path>
                        <path d="m14.912 2.259h-14.298l2.247 6.917c.042.129.16.216.293.216h8.06c-.064.69-.629 1.841-1.702 1.841h-6.04l1.072 1.991h5.611c1.881 0 2.938-2.278 3.657-4.719.888-3.01 1.219-6.245 1.106-6.245"></path>
                        <path d="m.615 2.259l-.592-1.828c-.08-.207.069-.431.287-.431h1.482c.126 0 .24.079.287.198l.682 2.061c0 0-.63 1.642-1.942.066"></path>
                        <path d="m2.262.756c0 0 .498 1.503 2.234 1.503l-1.736.749-1.104-.749.607-1.503"></path>
                        <path d="m13.424 13.325c0 .837-.664 1.516-1.484 1.516-.82 0-1.484-.679-1.484-1.516 0-.837.664-1.516 1.484-1.516.82 0 1.484.679 1.484 1.516"></path>
                      </g>
                    </svg>
                    <span className="_2tVMo0">1</span>
                  </div>
                </div>
                <div>
                  <div className="_3QNhdh" id="guidSearch">
                    <div className="ORogdv">
                      <div className="_1k9EoO">
                        <div className="_2d36Hu">
                          <div className="search-div">
                            <input className="_1eMB9R" placeholder="Search for Products, Brands and More" defaultValue="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div className="_3sdu8W emupdz">
                {categories.map((src, i) => (
                  <Link key={i} href="/" className="_1ch8e_" aria-label={`cat-${i}`}>
                    <div>
                      <div className="YBLJE4">
                        <div className="_3ETuFY">
                          <div className="_2GaeWJ" style={{ width: 64, height: 64 }}>
                            <img className="_2puWtW _3a3qyb" alt={`cat-${i}`} src={`/${src}`} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid mt-3">
        <div className="row">
          <div className="col-sm-12 p-0">
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img className="d-block w-100" src="/assets/images/bn1.jpg" alt="banner" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="_1QM2o6 _1isCBQ" style={{ margin: "0 0 16px" }}>
        <div className="_2rW-uM _3sgvr0 _1cVt6K _1CXxjX">
          <div className="_3LrtWH">
            <div className="_3QuZpZ dod-div">
              <div className="dod-label">Deals of the Day </div>
              <div className="_1oETR8" style={{ marginTop: -4 }}>
                <div className="_1dZamR _2mmD4F">
                  <img className="_29lYyb" src="/assets/images/theme/clock.svg" />
                  <div id="test"><Countdown /></div>
                </div>
              </div>
            </div>
            <div className="_3Nxu4r">
              <button className="_1s54Jm btn-sale-is-live">SALE IS LIVE</button>
            </div>
          </div>
          <table className="-LqSIK _3xlpeR">
            <tbody>
              <tr style={{ display: "flex", flexWrap: "wrap" }}>
                {loading ? (
                  <td>Loading products...</td>
                ) : (
                  products.map((p: any) => (
                    <td className="Cs7ycL TcKeCe" key={p.id}>
                      <ProductCard product={p} />
                    </td>
                  ))
                )}
                {/* {products.map((p: any) => (
                  <td key={p.md5_id} className="p-2 align-top">
                    <div className="border rounded p-3" style={{ width: 280 }}>
                      <img src={p.img1 || "/assets/images/bn1.jpg"} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover" }} />
                      <div className="font-medium two-line-ellipsis mt-2" title={p.name}>{p.name}</div>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="selling_price">₹{p.selling_price}</span>
                        <span className="mrp" style={{ color: "#DC3545" }}>₹{p.mrp}</span>
                      </div>
                      <div className="mt-3 flex gap-2">
                        <Link href={`/product/${p.md5_id}`} className="text-blue-600">View</Link>
                        <Link href="/address" className="text-blue-600">Buy Now</Link>
                      </div>
                    </div>
                  </td>
                ))} */}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
