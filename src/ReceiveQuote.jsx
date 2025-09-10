import React, { useState } from "react";

const ReceiveQuote = () => {
  // Mock data for multiple quotes
  const [quotes] = useState([
    { id: 1, product: "Laptop", supplier: "ABC Supplies", quantity: 2, price: 78000, date: "2025-09-05", status: "Pending" },
    { id: 2, product: "Monitor", supplier: "TechWorld", quantity: 5, price: 14500, date: "2025-09-02", status: "Approved" },
    { id: 3, product: "Keyboard", supplier: "GadgetMart", quantity: 10, price: 1800, date: "2025-08-28", status: "Declined" },
    { id: 4, product: "Mouse", supplier: "SmartElectro", quantity: 15, price: 900, date: "2025-08-22", status: "Pending" },
  ]);

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Received Quotes</h1>

        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length > 0 ? (
              quotes.map((q) => (
                <tr key={q.id}>
                  <td style={styles.td}>{q.product}</td>
                  <td style={styles.td}>{q.supplier}</td>
                  <td style={styles.td}>{q.quantity}</td>
                  <td style={styles.td}>₹{q.price.toLocaleString()}</td>
                  <td style={styles.td}>{q.date}</td>
                  <td style={{ ...styles.td, color: statusColor(q.status), fontWeight: "600" }}>
                    {q.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="6">No quotes received yet.</td>
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
    case "Approved": return "#22c55e"; // green
    case "Declined": return "#ef4444"; // red
    case "Pending": default: return "#facc15"; // yellow
  }
};

// Inline CSS
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0a0f16, #0f1725, #08111a)",
    padding: "20px",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "linear-gradient(180deg, #101720, #121c27)",
    border: "1px solid #717e8fff",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
    padding: "24px",
    color: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1d89ff",
    marginBottom: "20px",
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

export default ReceiveQuote;
