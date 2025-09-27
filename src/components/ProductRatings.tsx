"use client";

import { useEffect, useState } from "react";

type Rating = { ratingValue?: number | string; ratingCount?: number };

export default function ProductRatings() {
  const [rating, setRating] = useState<Rating>({});

  useEffect(() => {
    try {
      const raw = localStorage.getItem("rating");
      if (raw) {
        const parsed = JSON.parse(raw);
        setRating(parsed || {});
      }
    } catch { }
  }, []);

  if (!rating || (!rating.ratingValue && !rating.ratingCount)) {
    return null;
  }

  return (
    <div className="_24B_AU _1AQnZC" style={{ display: "flex", alignItems: "center" }}>
      <b className="_3LWZlK" style={{ fontSize: "14px", display: "flex", alignItems: "center", height: "20px" }}>
        {String(rating.ratingValue)}
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMyIgaGVpZ2h0PSIxMiI+PHBhdGggZmlsbD0iI0ZGRiIgZD0iTTYuNSA5LjQzOWwtMy42NzQgMi4yMy45NC00LjI2LTMuMjEtMi44ODMgNC4yNTQtLjQwNEw2LjUuMTEybDEuNjkgNC4wMSA0LjI1NC40MDQtMy4yMSAyLjg4Mi45NCA0LjI2eiIvPjwvc3ZnPg=="
          alt="Star"
          className="starimg"
          style={{ marginTop: "0px", height: "15px" }}
        />
      </b>
      <b className="_2_R_DZ" style={{ fontSize: "14px", marginTop: "5px" }}>
        {rating.ratingCount} Ratings
      </b>
      <img
        style={{ width: "100px", marginLeft: "10px", marginTop: "10px" }}
        src={`/assets/images/plue-fassured.png`}
        alt="plue-fassured"
      />
    </div>
  );
}


