const BASE = "https://apigw.mweb.co.za/prod/baas/proxy";

/** Load all fibre campaigns (public web channel) */
export async function fetchCampaigns() {
  const res = await fetch(
    `${BASE}/marketing/campaigns/fibre?channels=120&visibility=public`
  );
  if (!res.ok) throw new Error(`Campaigns failed: ${res.status}`);
  return res.json();
}

/** Load products for list of promo codes (sellable online only) */
export async function fetchProductsByPromos(promoCodes = []) {
  if (!promoCodes.length) return [];
  const url = `${BASE}/marketing/products/promos/${promoCodes.join(
    ","
  )}?sellable_online=true`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Products failed: ${res.status}`);
  return res.json();
}

/** Robust summariser -> normalises fields we need for UI */
export function summariseProduct(p) {
  const provider = p?.subcategory || p?.provider || "Unknown";

  // price field names vary across endpoints
  const priceRaw = p?.price ?? p?.pricePM ?? p?.pricePerMonth ?? p?.price_promo ?? 0;
  const price = Number(priceRaw) || 0;

  // speed parsing (try explicit fields, then pattern from name)
  const d =
    p?.downloadSpeed ?? p?.download ?? p?.down ?? (p?.speeds?.down ?? null);
  const u = p?.uploadSpeed ?? p?.upload ?? p?.up ?? (p?.speeds?.up ?? null);

  const fromName = () => {
    const m = (p?.name || "").match(/\b(\d+)(?:\/(\d+))?\s?Mbps/i);
    if (!m) return { down: null, up: null };
    return { down: Number(m[1]), up: m[2] ? Number(m[2]) : Number(m[1]) };
    // if only one speed in name, assume symmetric (screenshot style)
  };
  const speeds = d || u ? { down: Number(d || u), up: Number(u || d) } : fromName();

  return {
    id: p?.id || p?.code || p?.sku || cryptoRandomId(),
    name: p?.name || "Fibre Product",
    provider,
    price,
    download: speeds.down || null,
    upload: speeds.up || null,
    link:
      p?.ctaUrl ||
      p?.links?.find((l) => l?.rel === "details")?.href ||
      "https://www.mweb.co.za/fibre/",
    description:
      p?.shortDescription ||
      p?.description ||
      "Unthrottled • FREE Installation + Router",
  };
}

function cryptoRandomId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) return crypto.randomUUID();
  return `id_${Math.random().toString(36).slice(2)}`;
}
