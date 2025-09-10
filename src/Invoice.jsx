import React, { useState } from "react";

const Invoice = () => {
  // Mock invoices
  const [invoices] = useState([
    { id: "INV-2025-001", product: "Laptop", supplier: "ABC Supplies", quantity: 2, price: 78000, total: 156000, date: "2025-09-06", status: "Paid" },
    { id: "INV-2025-002", product: "Monitor", supplier: "TechWorld", quantity: 5, price: 14500, total: 72500, date: "2025-09-05", status: "Pending" },
    { id: "INV-2025-003", product: "Keyboard", supplier: "GadgetMart", quantity: 10, price: 1800, total: 18000, date: "2025-09-02", status: "Unpaid" },
    { id: "INV-2025-004", product: "Mouse", supplier: "SmartElectro", quantity: 15, price: 900, total: 13500, date: "2025-08-28", status: "Paid" },
  ]);

  const [filters, setFilters] = useState({
    invoiceId: "",
    product: "",
    supplier: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  // Handle filter change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const filteredInvoices = invoices.filter((inv) => {
    return (
      (filters.invoiceId === "" || inv.id.toLowerCase().includes(filters.invoiceId.toLowerCase())) &&
      (filters.product === "" || inv.product.toLowerCase().includes(filters.product.toLowerCase())) &&
      (filters.supplier === "" || inv.supplier.toLowerCase().includes(filters.supplier.toLowerCase())) &&
      (filters.status === "" || inv.status === filters.status) &&
      (filters.startDate === "" || new Date(inv.date) >= new Date(filters.startDate)) &&
      (filters.endDate === "" || new Date(inv.date) <= new Date(filters.endDate))
    );
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Invoices</h1>

        {/* Filters */}
        <div style={styles.filters}>
          <input type="text" name="invoiceId" placeholder="Invoice ID" value={filters.invoiceId} onChange={handleChange} style={styles.input} />
          <input type="text" name="product" placeholder="Product" value={filters.product} onChange={handleChange} style={styles.input} />
          <input type="text" name="supplier" placeholder="Supplier" value={filters.supplier} onChange={handleChange} style={styles.input} />
          <select name="status" value={filters.status} onChange={handleChange} style={styles.input}>
            <option value="">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
            <option value="Pending">Pending</option>
          </select>
          <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} style={styles.input} />
          <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} style={styles.input} />
        </div>

        {/* Invoice Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Invoice ID</th>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Total</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredInvoices.length > 0 ? (
              filteredInvoices.map((inv) => (
                <tr key={inv.id}>
                  <td style={styles.td}>{inv.id}</td>
                  <td style={styles.td}>{inv.product}</td>
                  <td style={styles.td}>{inv.supplier}</td>
                  <td style={styles.td}>{inv.quantity}</td>
                  <td style={styles.td}>₹{inv.price.toLocaleString()}</td>
                  <td style={styles.td}>₹{inv.total.toLocaleString()}</td>
                  <td style={styles.td}>{inv.date}</td>
                  <td style={{ ...styles.td, color: statusColor(inv.status), fontWeight: "600" }}>
                    {inv.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="8">No invoices found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Status colors
const statusColor = (status) => {
  switch (status) {
    case "Paid": return "#22c55e";
    case "Unpaid": return "#ef4444";
    case "Pending": default: return "#facc15";
  }
};

// Styles
const styles = {
  page: {
    minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center",
    background: "linear-gradient(135deg, #0a0f16, #0f1725, #08111a)", padding: "20px",
  },
  card: {
    width: "100%", maxWidth: "1000px", background: "linear-gradient(180deg, #101720, #121c27)",
    border: "1px solid #717e8fff", borderRadius: "16px", boxShadow: "0 12px 28px rgba(0,0,0,0.5)", padding: "24px", color: "#fff",
  },
  title: { textAlign: "center", fontSize: "26px", fontWeight: "bold", color: "#1d89ff", marginBottom: "20px" },
  filters: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "12px", marginBottom: "20px" },
  input: {
    padding: "10px", borderRadius: "8px", border: "1px solid #717e8fff", background: "#1c2735",
    color: "#fff", outline: "none", fontSize: "14px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { borderBottom: "2px solid #1e2a3a", padding: "10px", textAlign: "left", color: "#1d89ff" },
  td: { padding: "10px", borderBottom: "1px solid #1e2a3a" },
};

export default Invoice;
