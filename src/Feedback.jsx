import React, { useState } from "react";

const Feedback = () => {
  // Mock completed orders
  const completedOrders = [
    { id: "ORD-1004", product: "Mouse" },
    { id: "ORD-1005", product: "Laptop" },
    { id: "ORD-1006", product: "Monitor" },
  ];

  const [formData, setFormData] = useState({
    orderId: "",
    rating: 0,
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRating = (rating) => {
    setFormData({ ...formData, rating });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.orderId || formData.rating === 0 || !formData.feedback.trim()) {
      alert("Please select an order, provide a rating, and enter feedback.");
      return;
    }
    alert("Feedback submitted successfully! (Simulated)");
    console.log("Feedback Data:", formData);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Order Feedback</h1>

        <form style={styles.form} onSubmit={handleSubmit}>
          {/* Order Selection */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Completed Order *</label>
            <select
              name="orderId"
              value={formData.orderId}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">-- Select an Order --</option>
              {completedOrders.map((order) => (
                <option key={order.id} value={order.id}>
                  {order.id} - {order.product}
                </option>
              ))}
            </select>
          </div>

          {/* Rating */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Rating *</label>
            <div style={styles.rating}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  onClick={() => handleRating(star)}
                  style={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: formData.rating >= star ? "#facc15" : "#555",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Feedback *</label>
            <textarea
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              placeholder="Enter your feedback about this order..."
              style={styles.textarea}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" style={styles.button}>
            Submit Feedback
          </button>
        </form>
      </div>
    </div>
  );
};

// Styles
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
    maxWidth: "600px",
    background: "linear-gradient(180deg, #101720, #121c27)",
    border: "1px solid  #717e8fff",
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
  form: { display: "flex", flexDirection: "column", gap: "16px" },
  formGroup: { display: "flex", flexDirection: "column" },
  label: { fontSize: "14px", marginBottom: "6px", color: "#9aa6bd" },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid  #717e8fff",
    background: "#1c2735",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
  },
  rating: { display: "flex", gap: "8px" },
  textarea: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid  #717e8fff",
    background: "#1c2735",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    minHeight: "100px",
    resize: "vertical",
  },
  button: {
    marginTop: "10px",
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    background: "#1d89ff",
    color: "#fff",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
  },
};

export default Feedback;
