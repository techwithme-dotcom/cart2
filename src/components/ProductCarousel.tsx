"use client";

import { useEffect, useRef, useState } from "react";

type Props = { images: string[] };

export default function ProductCarousel({ images }: Props) {
  const [validImages, setvalidImages] = useState(images);
  const [index, setIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchDeltaX = useRef(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
 

  const prev = () => setIndex((i) => (i === 0 ? validImages.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === validImages.length - 1 ? 0 : i + 1));

  // useEffect(() => {
  //   let filterImage = images.filter((src) => !!src)
  //   console.log("filterImage>>", filterImage);
  //   setvalidImages(filterImage)
  //   // setvalidImages(filterImage)
  // }, [])

  // Auto-advance every 3 seconds
  useEffect(() => {
    if (validImages.length) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        next();
      }, 3000);
      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }
  }, [validImages.length]);
  if (validImages.length === 0) return null;
  const onTouchStart: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };

  const onTouchMove: React.TouchEventHandler<HTMLDivElement> = (e) => {
    if (touchStartX.current == null) return;
    const currentX = e.touches[0].clientX;
    touchDeltaX.current = currentX - touchStartX.current;
  };

  const onTouchEnd: React.TouchEventHandler<HTMLDivElement> = () => {
    const threshold = 40; // px
    if (touchDeltaX.current > threshold) {
      // swipe right → show previous image
      prev();
    } else if (touchDeltaX.current < -threshold) {
      // swipe left → show next image
      next();
    }
    touchStartX.current = null;
    touchDeltaX.current = 0;
    // restart auto-advance
    intervalRef.current = setInterval(() => next(), 3000);
  };

  return (
    <div
      className="relative w-100"
      style={{ maxHeight: 427, minHeight: 427 }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="overflow-hidden rounded">
        <img
          src={validImages[index]}
          alt={`image-${index + 1}`}
          style={{ width: "auto", height: "400px" }}
        />
      </div>
      {/* <button
        type="button"
        aria-label="Previous"
        onClick={prev}
        className="position-absolute"
        style={{ top: "50%", left: 8, transform: "translateY(-50%)", background: "rgba(0,0,0,0.45)", color: "#fff", border: 0, borderRadius: 6, padding: "6px 8px" }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={next}
        className="position-absolute"
        style={{ top: "50%", right: 8, transform: "translateY(-50%)", background: "rgba(0,0,0,0.45)", color: "#fff", border: 0, borderRadius: 6, padding: "6px 8px" }}
      >
        ›
      </button> */}
      <div className="d-flex justify-content-center gap-2 mt-2">
        {validImages.map((_, i) => (
          <span
            key={i}
            onClick={() => setIndex(i)}
            style={{ width: 8, height: 8, borderRadius: 9999, background: index === i ? "#111" : "#bbb", display: "inline-block", cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
}


