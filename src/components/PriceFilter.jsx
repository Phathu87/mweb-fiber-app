import React, { useState, useRef, useEffect } from "react";
import { PRICE_RANGES } from "../constants/priceRanges"; 

export default function PriceFilter({ selectedKeys, onToggle }) {
  const [open, setOpen] = useState(false);
  const box = useRef(null);

  useEffect(() => {
    const onDoc = (e) => {
      if (!box.current || box.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="dropdown" ref={box}>
      <button onClick={() => setOpen((v) => !v)}>
        <span>Price</span>
        <span aria-hidden>▾</span>
      </button>
      {open && (
        <div className="menu" role="menu" aria-label="Price ranges">
          {PRICE_RANGES.map((r) => (
            <label key={r.key}>
              <input
                type="checkbox"
                checked={selectedKeys.includes(r.key)}
                onChange={() => onToggle(r.key)}
              />
              <span>{r.label}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
