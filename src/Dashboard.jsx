import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const pages = [
    { name: "Submit Product Request", path: "/submit-request" },
    { name: "View Purchase History", path: "/purchase-history" },
    { name: "Receive Quote", path: "/receive-quote" },
    { name: "Manage Quote", path: "/manage-quote" },
    { name: "Invoice Page", path: "/invoice" },
    { name: "Order Completion Page", path: "/order-completion" },
    { name: "Feedback Page", path: "/feedback" },
  ];

  const handleLogout = () => {
    alert("Logged out successfully! (Simulated)");
    navigate("/login");
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h1 style={styles.logo}>User Management Dashboard</h1>
        <div style={styles.profileWrapper}>
          <div
            style={styles.profileIcon}
            onClick={() => setShowProfile(!showProfile)}
          >
            👤
          </div>
          {showProfile && (
            <div style={styles.dropdown}>
              <p style={styles.dropdownItem}>Hello, John Doe</p>
              <Link to="/profile" style={styles.dropdownItem}>Manage Profile</Link>
              <button onClick={handleLogout} style={styles.logoutBtn}>Logout</button>
            </div>
          )}
        </div>
      </header>

      {/* Dashboard Cards */}
      <main style={styles.main}>
        <div style={styles.dashboardGrid}>
          {pages.map((page, index) => (
            <Link key={index} to={page.path} style={styles.dashboardCard}>
              {page.name}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

// Styles
const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0a0f16, #0f1725, #08111a)",
    color: "#fff",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 40px",
    borderBottom: "1px solid #1e2a3a",
    background: "rgba(16, 23, 32, 0.9)",
    position: "sticky",
    top: 0,
    zIndex: 10,
  },
  logo: {
    fontSize: "22px",
    fontWeight: "bold",
    color: "#1d89ff",
    margin: 0,
  },
  profileWrapper: {
    position: "relative",
  },
  profileIcon: {
    fontSize: "22px",
    cursor: "pointer",
    background: "#1d89ff",
    padding: "8px 12px",
    borderRadius: "50%",
    boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  },
  dropdown: {
    position: "absolute",
    top: "50px",
    right: 0,
    background: "#1c2735",
    border: "1px solid #1e2a3a",
    borderRadius: "8px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.6)",
    minWidth: "180px",
    padding: "10px 0",
    zIndex: 20,
  },
  dropdownItem: {
    display: "block",
    padding: "10px 16px",
    fontSize: "14px",
    color: "#fff",
    textDecoration: "none",
    cursor: "pointer",
  },
  logoutBtn: {
    width: "100%",
    padding: "10px 16px",
    background: "#ef4444",
    border: "none",
    color: "#fff",
    fontSize: "14px",
    textAlign: "left",
    cursor: "pointer",
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
  },
  main: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "40px",
  },
  dashboardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    width: "100%",
    maxWidth: "1000px",
  },
  dashboardCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    borderRadius: "14px",
    background: "linear-gradient(135deg, #1d89ff, #0a58bf)",
    color: "white",
    fontWeight: "600",
    fontSize: "16px",
    textDecoration: "none",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
    transition: "all 0.3s ease-in-out",
  },
  dashboardCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 20px rgba(0,0,0,0.5)",
    background: "linear-gradient(135deg, #2494ff, #0c63d1)",
  },
};
