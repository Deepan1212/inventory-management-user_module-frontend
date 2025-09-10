import React, { useState } from "react";

export default function SubmitProductRequest() {
  const [form, setForm] = useState({
    productName: "",
    quantity: "",
    priceMin: "",
    priceMax: "",
    neededBy: "",
    notes: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.productName.trim()) newErrors.productName = "Product name is required.";
    if (!form.quantity || parseInt(form.quantity, 10) < 1)
      newErrors.quantity = "Enter a valid quantity (≥ 1).";
    if (form.priceMin === "" || parseFloat(form.priceMin) < 0)
      newErrors.priceMin = "Enter a valid min price.";
    if (form.priceMax === "" || parseFloat(form.priceMax) < 0)
      newErrors.priceMax = "Enter a valid max price.";
    if (parseFloat(form.priceMax) < parseFloat(form.priceMin))
      newErrors.priceMax = "Max must be ≥ Min.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const payload = { ...form, quantity: parseInt(form.quantity, 10) };
    console.log("Submit Product Request payload", payload);
    alert("Request submitted successfully! (Mock)");
  };

  return (
    <div className="submit-page">
      <div className="form-card">
        <h1 className="form-title">Submit Product Request</h1>

        <form onSubmit={handleSubmit} className="form">
          {/* Product Name */}
          <div className="form-group">
            <label>Product name *</label>
            <input
              type="text"
              name="productName"
              value={form.productName}
              onChange={handleChange}
            />
            {errors.productName && <p className="error">{errors.productName}</p>}
          </div>

          {/* Quantity + Needed By */}
          <div className="form-row">
            <div className="form-group">
              <label>Quantity *</label>
              <input
                type="number"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
              />
              {errors.quantity && <p className="error">{errors.quantity}</p>}
            </div>
            <div className="form-group">
              <label>Needed by (optional)</label>
              <input
                type="date"
                name="neededBy"
                value={form.neededBy}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Price Range */}
          <div className="form-row">
            <div className="form-group">
              <label>Price min (₹) *</label>
              <input
                type="number"
                name="priceMin"
                value={form.priceMin}
                onChange={handleChange}
              />
              {errors.priceMin && <p className="error">{errors.priceMin}</p>}
            </div>
            <div className="form-group">
              <label>Price max (₹) *</label>
              <input
                type="number"
                name="priceMax"
                value={form.priceMax}
                onChange={handleChange}
              />
              {errors.priceMax && <p className="error">{errors.priceMax}</p>}
            </div>
          </div>

          {/* Notes */}
          <div className="form-group">
            <label>Notes (optional)</label>
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
            ></textarea>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <button type="button" onClick={() => window.history.back()} className="btn ghost">
              Cancel
            </button>
            <button type="submit" className="btn primary">
              Submit request
            </button>
          </div>
        </form>
      </div>

      {/* Inline CSS inside component */}
      <style>{`
        .submit-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0a0f16, #0f1725, #08111a);
          color: #e7eef9;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        .form-card {
          background: linear-gradient(180deg, #101720, #121c27);
          border: 1px solid #717e8fff;
          border-radius: 16px;
          box-shadow: 0 12px 28px rgba(0,0,0,0.5);
          padding: 32px;
          width: 100%;
          max-width: 500px;
        }
        .form-title {
          font-size: 24px;
          font-weight: bold;
          text-align: center;
          margin-bottom: 24px;
          color: #1d89ff;
        }
        .form {
          display: grid;
          gap: 20px;
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 600px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        .form-group {
          display: flex;
          flex-direction: column;
        }
        .form-group label {
          margin-bottom: 6px;
          font-size: 14px;
          color: #9aa6bd;
        }
        .form-group input,
        .form-group textarea {
          padding: 12px;
          border-radius: 10px;
          border: 1px solid #717e8fff;
          background: rgba(255,255,255,0.05);
          color: #e7eef9;
          font-size: 15px;
          outline: none;
        }
        .form-group input:focus,
        .form-group textarea:focus {
          border-color: #1d89ff;
          box-shadow: 0 0 0 2px rgba(29,137,255,0.35);
        }
        .form-group textarea {
          min-height: 100px;
          resize: vertical;
        }
        .error {
          color: #ef4444;
          font-size: 13px;
          margin-top: 4px;
        }
        .form-actions {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }
        .btn {
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          cursor: pointer;
          border: none;
        }
        .btn.ghost {
          background: transparent;
          border: 1px solid #1e2a3a;
          color: #e7eef9;
        }
        .btn.ghost:hover {
          background: rgba(255,255,255,0.05);
        }
        .btn.primary {
          background: linear-gradient(135deg, #1d89ff, #0a58bf);
          color: #fff;
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }
        .btn.primary:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.4);
        }
      `}</style>
    </div>
  );
}
