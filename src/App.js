import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import SubmitProductRequest from './SubmitProductRequest'; 
import Dashboard from "./Dashboard";
import PurchaseHistory from "./PurchaseHistory";
import ReceiveQuote from "./ReceiveQuote";
import ManageQuote from "./ManageQuote";
import Invoice from "./Invoice";
import OrderCompletion from "./OrderCompletion";
import Feedback from "./Feedback";
function App() {
  return (
    <Router>
      <div style={{ height: '100vh', width: '100%' }}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/submit-request" element={<SubmitProductRequest />} /> 
          <Route path="/purchase-history" element={<PurchaseHistory />} />
          <Route path="/receive-quote" element={<ReceiveQuote />} />
          <Route path="/manage-quote" element={<ManageQuote />} />
          <Route path="/invoice" element={<Invoice />} />  
          <Route path="/order-completion" element={<OrderCompletion />} />
          <Route path="/feedback" element={<Feedback />} />       
          
        </Routes>
      </div>
    </Router>
  );
}

export default App;