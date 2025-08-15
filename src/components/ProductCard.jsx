import React from "react";
import { getProviderLogo } from "../assets/providerLogos";

const ArrowDown = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M12 3v14.17l5.59-5.58L19 13l-7 7-7-7 1.41-1.41L11 17.17V3z"/>
  </svg>
);
const ArrowUp = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden>
    <path fill="currentColor" d="M12 21V6.83l-5.59 5.58L5 11l7-7 7 7-1.41 1.41L13 6.83V21z"/>
  </svg>
);

export default function ProductCard({ product }) {
  return (
    <div className="card">
      <div className="card-row">
        <div className="card-left">
          <div className="card-title">
            {titleFromName(product.name)}
          </div>

          <div className="badges">
            <span className="badge">Unthrottled</span>
            <span className="badge">FREE Installation + Router</span>
          </div>

          <div className="price">
            R{product.price.toLocaleString("en-ZA")}
            <span className="unit">pm</span>
          </div>
        </div>

        <div className="card-right">
          <img className="provider-logo" src={getProviderLogo(product.provider)} alt={product.provider} />

          <div className="metrics">
            <div className="metric">
              <ArrowDown />
              <div>Download</div>
              <b>{product.download ? `${product.download}Mbps` : "-"}</b>
            </div>
            <div className="metric">
              <ArrowUp />
              <div>Upload</div>
              <b>{product.upload ? `${product.upload}Mbps` : "-"}</b>
            </div>
          </div>

          <a className="coverage" href={product.link} target="_blank" rel="noreferrer">
            Check coverage
          </a>
        </div>
      </div>
    </div>
  );
}

function titleFromName(name) {
  // make titles like "10Mbps Uncapped Fibre"
  const m = (name || "").match(/\b\d+\/?\d*\s?Mbps/i);
  const speed = m ? m[0].replace(/\s+/g, "") : "";
  return `${speed ? speed + " " : ""}Uncapped Fibre`;
}
