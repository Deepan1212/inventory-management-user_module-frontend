import React, { useState } from "react";

const PurchaseHistory = () => {
  // Mock data
  const [purchases] = useState([
    { id: 1, product: "Laptop", quantity: 2, price: 80000, date: "2025-09-01", status: "Completed" },
    { id: 2, product: "Monitor", quantity: 5, price: 15000, date: "2025-08-20", status: "Pending" },
    { id: 3, product: "Keyboard", quantity: 10, price: 2000, date: "2025-08-15", status: "Completed" },
    { id: 4, product: "Mouse", quantity: 15, price: 800, date: "2025-07-30", status: "Declined" },
  ]);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    startDate: "",
    endDate: "",
    minPrice: "",
    maxPrice: "",
    status: "",
  });

  // Filtering logic
  const filteredPurchases = purchases.filter((p) => {
    const matchesSearch = p.product.toLowerCase().includes(search.toLowerCase());
    const matchesDate =
      (!filters.startDate || new Date(p.date) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(p.date) <= new Date(filters.endDate));
    const matchesPrice =
      (!filters.minPrice || p.price >= parseFloat(filters.minPrice)) &&
      (!filters.maxPrice || p.price <= parseFloat(filters.maxPrice));
    const matchesStatus = !filters.status || p.status === filters.status;
    return matchesSearch && matchesDate && matchesPrice && matchesStatus;
  });

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.title}>Purchase History</h1>

        {/* Search & Filters */}
        <div style={styles.filters}>
          <input
            type="text"
            placeholder="Search by product name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <div style={styles.filterRow}>
            <label>From: </label>
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
              style={styles.input}
            />
            <label>To: </label>
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
              style={styles.input}
            />
          </div>

          <div style={styles.filterRow}>
            <label>Min Price: </label>
            <input
              type="number"
              value={filters.minPrice}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
              style={styles.input}
            />
            <label>Max Price: </label>
            <input
              type="number"
              value={filters.maxPrice}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
              style={styles.input}
            />
          </div>

          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            style={styles.input}
          >
            <option value="">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Declined">Declined</option>
          </select>
        </div>

        {/* Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchases.length > 0 ? (
              filteredPurchases.map((p) => (
                <tr key={p.id}>
                  <td style={styles.td}>{p.product}</td>
                  <td style={styles.td}>{p.quantity}</td>
                  <td style={styles.td}>₹{p.price.toLocaleString()}</td>
                  <td style={styles.td}>{p.date}</td>
                  <td style={styles.td}>{p.status}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">No purchases found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Inline CSS
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #0a0f16, #0f1725, #08111a)",
    color: "#fff",
    padding: "40px",
  },
  container: {
    width: "100%",
    maxWidth: "900px",
    background: "linear-gradient(180deg, #101720, #121c27)",
    border: "1px solid #717e8fff",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
    padding: "24px",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1d89ff",
    marginBottom: "20px",
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "20px",
  },
  filterRow: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
  },
  input: {
    padding: "8px",
    borderRadius: "8px",
    border: "1px solid #717e8fff",
    background: "#1c2735",
    color: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    borderBottom: "2px solid #1e2a3a",
    padding: "10px",
    textAlign: "left",
    color: "#1d89ff",
  },
  td: {
    padding: "10px",
    borderBottom: "1px solid #1e2a3a",
  },
};

export default PurchaseHistory;
