import React, { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import ProviderFilter from "../components/ProviderFilter";
import PriceFilter from "../components/PriceFilter";
import { PRICE_RANGES } from "../constants/priceRanges";
import ProductCard from "../components/ProductCard";
import { MOCK_PRODUCTS } from "../utils/mockProducts";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [campaignName, _setCampaignName] = useState("FREE setup + router"); // unused setter
  const [products, setProducts] = useState([]);
  const [error, _setError] = useState(""); // unused setter

  // filters
  const [selectedProviders, setSelectedProviders] = useState([]);
  const [selectedPriceKeys, setSelectedPriceKeys] = useState([]);
  const [speedMenuOpen, setSpeedMenuOpen] = useState(false);
  const [selectedSpeeds, setSelectedSpeeds] = useState([]);

  // Load mock products on mount
  useEffect(() => {
    setProducts(MOCK_PRODUCTS);
    setLoading(false);
  }, []);

  const providers = useMemo(
    () => Array.from(new Set(products.map((p) => p.provider))).sort(),
    [products]
  );

  const speedBuckets = useMemo(() => {
    const speeds = Array.from(
      new Set(
        products
          .map((p) => p.download)
          .filter(Boolean)
          .map((n) =>
            n <= 20 ? "≤20Mbps" : n <= 50 ? "≤50Mbps" : n <= 100 ? "≤100Mbps" : "≥200Mbps"
          )
      )
    );
    const order = ["≤20Mbps", "≤50Mbps", "≤100Mbps", "≥200Mbps"];
    return speeds.sort((a, b) => order.indexOf(a) - order.indexOf(b));
  }, [products]);

  const onToggleProvider = (name) =>
    setSelectedProviders((prev) =>
      prev.includes(name) ? prev.filter((p) => p !== name) : [...prev, name]
    );

  const onTogglePrice = (key) =>
    setSelectedPriceKeys((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );

  const onToggleSpeed = (label) =>
    setSelectedSpeeds((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );

  const priceFilters = PRICE_RANGES.filter((r) => selectedPriceKeys.includes(r.key));

  const filtered = products.filter((p) => {
    const providerOk = selectedProviders.length === 0 || selectedProviders.includes(p.provider);

    const priceOk =
      priceFilters.length === 0 ||
      priceFilters.some((r) => p.price >= r.min && p.price <= r.max);

    const speedOk =
      selectedSpeeds.length === 0 ||
      selectedSpeeds.some((label) =>
        label === "≤20Mbps"
          ? (p.download || 0) <= 20
          : label === "≤50Mbps"
          ? (p.download || 0) <= 50
          : label === "≤100Mbps"
          ? (p.download || 0) <= 100
          : (p.download || 0) >= 200
      );

    return providerOk && priceOk && speedOk;
  });

  return (
    <div className="container">
      <Header />

      <ProviderFilter
        providers={providers}
        selected={selectedProviders}
        onToggle={onToggleProvider}
      />

      <div className="toolbar">
        <div className="filters">
          <div className="dropdown">
            <button onClick={() => setSpeedMenuOpen((v) => !v)}>
              <span>Speed</span>
              <span aria-hidden>▾</span>
            </button>
            {speedMenuOpen && (
              <div className="menu" role="menu" aria-label="Speed">
                {speedBuckets.length === 0 && (
                  <div className="subtle" style={{ padding: "6px 10px" }}>
                    No speeds found yet
                  </div>
                )}
                {speedBuckets.map((label) => (
                  <label key={label}>
                    <input
                      type="checkbox"
                      checked={selectedSpeeds.includes(label)}
                      onChange={() => onToggleSpeed(label)}
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          <PriceFilter selectedKeys={selectedPriceKeys} onToggle={onTogglePrice} />
        </div>

        <button className="deal-type">{campaignName || "Deal"}</button>
      </div>

      {error && (
        <div
          style={{
            border: "1px solid #fecaca",
            background: "#fef2f2",
            color: "#991b1b",
            padding: 12,
            borderRadius: 8,
            marginBottom: 12,
          }}
        >
          {error}
        </div>
      )}

      {loading ? (
        <div className="grid">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="card" style={{ height: 140, opacity: 0.6 }} />
          ))}
        </div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}

      <div className="footer">MWEB Fibre Product Browser © {new Date().getFullYear()}</div>
    </div>
  );
}