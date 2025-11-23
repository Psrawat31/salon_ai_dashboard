// Utility: days between today and lastVisit
function daysAgo(dateStr) {
  const today = new Date();
  const past = new Date(dateStr);
  const diff = today - past; // ms
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

// Main summary function
export function generateSummary(customers) {
  if (!Array.isArray(customers)) return emptySummary();

  let hotCustomers = 0;
  let contactedToday = 0;
  let stillToContact = 0;
  let potentialRevenue = 0;
  let contactedRevenue = 0;

  let hotList = [];

  customers.forEach((c) => {
    const days = daysAgo(c.lastVisit);
    const contacted = String(c.contacted).toLowerCase() === "yes";
    const revenue = Number(c.revenue) || 0;

    // 🔥 HOT IF >30 DAYS AND NOT CONTACTED
    if (days > 30 && !contacted) {
      hotCustomers++;
      stillToContact++;
      potentialRevenue += revenue;

      hotList.push({
        name: c.name,
        lastVisit: c.lastVisit,
        service: c.service,
        revenue: revenue,
      });
    }

    // 📞 CONTACTED TODAY
    if (contacted) {
      contactedToday++;
      contactedRevenue += revenue;
    }
  });

  return {
    hotCustomers,
    contactedToday,
    stillToContact,
    potentialRevenue,
    contactedRevenue,
    hotList,
  };
}

// Default empty summary to avoid crashes
function emptySummary() {
  return {
    hotCustomers: 0,
    contactedToday: 0,
    stillToContact: 0,
    potentialRevenue: 0,
    contactedRevenue: 0,
    hotList: [],
  };
}
