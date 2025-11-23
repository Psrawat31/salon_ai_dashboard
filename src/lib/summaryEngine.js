// FINAL WORKING SUMMARY ENGINE

export function generateSummary(customers) {
  if (!customers || customers.length === 0) {
    return {
      hotCustomers: 0,
      contactedToday: 0,
      stillToContact: 0,
      potentialRevenue: 0,
      contactedRevenue: 0,
      hotList: [],
    };
  }

  // Normalize all Excel values
  const normalized = customers.map((c) => ({
    name: c.name,
    service: c.service,
    revenue: Number(c.revenue) || 0,
    lastVisit: formatDate(c.lastVisit),
    contacted: convertContacted(c.contacted),
  }));

  const today = new Date();

  const hotList = normalized.filter((c) => {
    if (!c.lastVisit) return false;
    const last = new Date(c.lastVisit);
    const diff = (today - last) / (1000 * 60 * 60 * 24);
    return diff >= 30;
  });

  const contactedToday = normalized.filter((c) => c.contacted === true);
  const stillToContact = normalized.filter((c) => c.contacted === false);

  const potentialRevenue = hotList.reduce((a, b) => a + b.revenue, 0);
  const contactedRevenue = contactedToday.reduce((a, b) => a + b.revenue, 0);

  return {
    hotCustomers: hotList.length,
    contactedToday: contactedToday.length,
    stillToContact: stillToContact.length,
    potentialRevenue,
    contactedRevenue,
    hotList,
  };
}

// Excel often gives weird date formats
function formatDate(value) {
  try {
    return new Date(value).toISOString().split("T")[0];
  } catch {
    return null;
  }
}

// Convert Yes/No → boolean
function convertContacted(val) {
  if (!val) return false;
  const v = String(val).toLowerCase();
  if (v === "yes" || v === "true" || v === "1") return true;
  return false;
}
