import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManageQuote = () => {
  const navigate = useNavigate();

  // Mock quotes
  const [quotes] = useState([
    { id: 1, product: "Laptop", supplier: "ABC Supplies", quantity: 2, price: 78000, date: "2025-09-05", status: "Pending" },
    { id: 2, product: "Monitor", supplier: "TechWorld", quantity: 5, price: 14500, date: "2025-09-02", status: "Pending" },
    { id: 3, product: "Keyboard", supplier: "GadgetMart", quantity: 10, price: 1800, date: "2025-08-28", status: "Approved" },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [declineReason, setDeclineReason] = useState("");

  // Handle Accept
  const handleAccept = (quote) => {
    alert(`Quote for ${quote.product} accepted! Purchase confirmed. (Simulated)`);
    console.log("Accepted Quote:", quote);
  };

  // Open Decline Modal
  const handleDeclineClick = (quote) => {
    setSelectedQuote(quote);
    setShowModal(true);
  };

  // Submit Decline
  const handleDeclineSubmit = (e) => {
    e.preventDefault();
    if (!declineReason.trim()) {
      alert("Decline reason is mandatory.");
      return;
    }
    alert(`Quote for ${selectedQuote.product} declined. Reason: ${declineReason}`);
    console.log("Declined Quote:", selectedQuote, "Reason:", declineReason);

    // Reset modal state
    setDeclineReason("");
    setSelectedQuote(null);
    setShowModal(false);
  };

  return (
    <div style={styles.page}>
      {/* Back to Dashboard button */}
      <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>
        ⬅ Back to Dashboard
      </button>

      <div style={styles.card}>
        <h1 style={styles.title}>Manage Quotes</h1>

        {/* Quotes Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Supplier</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Price</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
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
                  <td style={styles.td}>
                    <button style={styles.acceptBtn} onClick={() => handleAccept(q)}>Accept</button>
                    <button style={styles.declineBtn} onClick={() => handleDeclineClick(q)}>Decline</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="7">No quotes available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Decline Modal */}
      {showModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modal}>
            <h2 style={styles.modalTitle}>Decline Quote</h2>
            <p>Provide a reason for declining <strong>{selectedQuote?.product}</strong>:</p>
            <form onSubmit={handleDeclineSubmit}>
              <textarea
                value={declineReason}
                onChange={(e) => setDeclineReason(e.target.value)}
                placeholder="Enter decline reason..."
                style={styles.textarea}
                required
              />
              <div style={styles.modalActions}>
                <button type="submit" style={styles.declineBtn}>Submit Decline</button>
                <button type="button" style={styles.cancelBtn} onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
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

// Styles
const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "linear-gradient(135deg, #0a0f16, #0f1725, #08111a)",
    padding: "40px",
    position: "relative",
  },
  backBtn: {
    position: "absolute",
    top: "20px",
    right: "20px",
    background: "#1d89ff",
    border: "none",
    color: "#fff",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  },
  card: {
    width: "100%",
    maxWidth: "1000px",
    background: "linear-gradient(180deg, #101720, #121c27)",
    border: "1px solid #717e8fff",
    borderRadius: "16px",
    boxShadow: "0 12px 28px rgba(0,0,0,0.5)",
    padding: "24px",
    color: "#fff",
    marginTop: "60px",
  },
  title: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "bold",
    color: "#1d89ff",
    marginBottom: "20px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
  th: { borderBottom: "2px solid #1e2a3a", padding: "10px", textAlign: "left", color: "#1d89ff" },
  td: { padding: "10px", borderBottom: "1px solid #1e2a3a" },
  acceptBtn: {
    marginRight: "8px",
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#22c55e",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  declineBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#ef4444",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
  modalOverlay: {
    position: "fixed",
    top: 0, left: 0, width: "100%", height: "100%",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    background: "#1c2735",
    padding: "24px",
    borderRadius: "12px",
    width: "400px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.5)",
    color: "#fff",
  },
  modalTitle: { fontSize: "20px", fontWeight: "bold", marginBottom: "12px", color: "#ef4444" },
  textarea: {
    width: "100%",
    minHeight: "100px",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #717e8fff",
    background: "#101720",
    color: "#fff",
    marginBottom: "12px",
  },
  modalActions: { display: "flex", justifyContent: "space-between" },
  cancelBtn: {
    padding: "6px 12px",
    borderRadius: "6px",
    border: "none",
    background: "#555",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default ManageQuote;
