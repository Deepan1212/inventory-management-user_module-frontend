import React, { useState } from "react";

const OrderCompletion = () => {
  // Mock orders
  const [orders] = useState([
    { id: "ORD-1001", product: "Laptop", quantity: 2, date: "2025-09-06", status: "Processing" },
    { id: "ORD-1002", product: "Monitor", quantity: 5, date: "2025-09-05", status: "Shipped" },
    { id: "ORD-1003", product: "Keyboard", quantity: 10, date: "2025-09-03", status: "Out for Delivery" },
    { id: "ORD-1004", product: "Mouse", quantity: 15, date: "2025-09-01", status: "Completed" },
  ]);

  const [filters, setFilters] = useState({
    orderId: "",
    product: "",
    status: "",
    startDate: "",
    endDate: "",
  });

  // Handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const filteredOrders = orders.filter((order) => {
    return (
      (filters.orderId === "" || order.id.toLowerCase().includes(filters.orderId.toLowerCase())) &&
      (filters.product === "" || order.product.toLowerCase().includes(filters.product.toLowerCase())) &&
      (filters.status === "" || order.status === filters.status) &&
      (filters.startDate === "" || new Date(order.date) >= new Date(filters.startDate)) &&
      (filters.endDate === "" || new Date(order.date) <= new Date(filters.endDate))
    );
  });

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>Order Tracking</h1>

        {/* Filters */}
        <div style={styles.filters}>
          <input
            type="text"
            name="orderId"
            placeholder="Order ID"
            value={filters.orderId}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="text"
            name="product"
            placeholder="Product"
            value={filters.product}
            onChange={handleChange}
            style={styles.input}
          />
          <select
            name="status"
            value={filters.status}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="">All Status</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="date"
            name="startDate"
            value={filters.startDate}
            onChange={handleChange}
            style={styles.input}
          />
          <input
            type="date"
            name="endDate"
            value={filters.endDate}
            onChange={handleChange}
            style={styles.input}
          />
        </div>

        {/* Orders Table */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Order ID</th>
              <th style={styles.th}>Product</th>
              <th style={styles.th}>Quantity</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr key={order.id}>
                  <td style={styles.td}>{order.id}</td>
                  <td style={styles.td}>{order.product}</td>
                  <td style={styles.td}>{order.quantity}</td>
                  <td style={styles.td}>{order.date}</td>
                  <td
                    style={{
                      ...styles.td,
                      color: statusColor(order.status),
                      fontWeight: "600",
                    }}
                  >
                    {order.status}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={styles.td} colSpan="5">
                  No orders found.
                </td>
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
    case "Completed":
      return "#22c55e"; // green
    case "Processing":
      return "#3b82f6"; // blue
    case "Shipped":
      return "#facc15"; // yellow
    case "Out for Delivery":
      return "#f97316"; // orange
    default:
      return "#9ca3af"; // gray
  }
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
    maxWidth: "1000px",
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
  filters: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "12px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #717e8fff",
    background: "#1c2735",
    color: "#fff",
    outline: "none",
    fontSize: "14px",
  },
  table: { width: "100%", borderCollapse: "collapse" },
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

export default OrderCompletion;
