import React from "react";
import { getProviderLogo } from "../assets/providerLogos";

export default function ProviderFilter({ providers, selected, onToggle }) {
  if (!providers.length) return null;

  return (
    <>

      {/* interactive chips for filtering */}
      <div className="providers-panel">
        {providers.map((p) => {
          const active = selected.includes(p);
          return (
            <button
              key={p}
              type="button"
              className={`provider-chip ${active ? "active" : ""}`}
              onClick={() => onToggle(p)}
              aria-pressed={active}
              title={p}
            >
              <img src={getProviderLogo(p)} alt="" />
            </button>
          );
        })}
      </div>
    </>
  );
}
