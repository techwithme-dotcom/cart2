"use client";

import Link from "next/link";

type Product = {
  md5_id: string;
  id?: string | number;
  name: string;
  img1?: string;
  selling_price: string | number;
  mrp: string | number;
};

function seededNumber(seed: string, min: number, max: number): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const n = (Math.abs(h) % 1000) / 1000;
  return Math.floor(n * (max - min + 1)) + min;
}

function seededFloat(seed: string, min: number, max: number, decimals = 1): number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  const n = (Math.abs(h) % 10000) / 10000;
  const val = min + n * (max - min);
  const factor = Math.pow(10, decimals);
  return Math.round(val * factor) / factor;
}

export default function ProductCard({ product }: { product: Product }) {
  const discount = (100 - (Number(product.selling_price) * 100) / Number(product.mrp)).toFixed(0);
  const ratingValue = seededFloat(String(product.id), 4.0, 5.0, 1).toFixed(1);
  const ratingCount = seededNumber(String(product.id), 7500, 9500);

  const handleClick = () => {
    try {
      const key = `rating`;
      const payload = { ratingValue, ratingCount, product };
      localStorage.setItem(key, JSON.stringify(payload));
    } catch { }
  };

  return (
    <Link href={`/product/${product.id}`} onClick={handleClick} className="text-blue-600">
      <div className="_2enssu">
        <div style={{ position: "relative", minHeight: "170px", minWidth: "170px" }}>
          <div className="_3LXIRu">
            <div className="_2GaeWJ" style={{ width: "170px", height: "170px" }}>
              <img className="_2puWtW _3a3qyb" src={product.img1 || "/assets/images/bn1.jpg"} />
            </div>
          </div>
        </div>
        <div className="_24B_AU _3SexMn" style={{ color: "#3b3b3b", fontWeight: "bold" }}>{product.name}</div>
        <div className="_24B_AU _1AQnZC">
          {discount}% Off
          <span className="mrp">₹{product.mrp}</span>
        </div>
        <div className="_24B_AU _1AQnZC" style={{ display: "flex" }}>
          <b className="selling-price">₹{product.selling_price}</b>
          <img src="/img/SwOvZ3r.png" width="77px" />
        </div>
        <div className="_24B_AU _1AQnZC" style={{ display: "flex" }}>
          <b className="_3LWZlK" style={{ display: "flex", alignItems: "center" }}>{ratingValue}
            <img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg==" alt="Star" className="starimg" style={{ marginTop: 0, height: 12, marginLeft: 4 }} />
          </b>
          <b className="_2_R_DZ" style={{ color: "#494949", marginTop: 3, display: "inline-block" }}>{ratingCount} Ratings</b>
        </div>
        <div className="_3Nxu4r delivery-txt" style={{ display: "flex", justifyContent: "space-around" }}>Free Delivery in Two Days</div>
      </div>
    </Link>
  );
}


