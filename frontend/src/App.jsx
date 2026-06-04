import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation // करंट पेज का रास्ता (Path) पता करने के लिए
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register"; // 👤 कस्टमर रजिस्ट्रेशन पेज
import SellerRegister from "./pages/SellerRegister"; // 🏢 सेलर रजिस्ट्रेशन पेज
import SellerDashboard from "./pages/SellerDashboard"; // सेलर डैशबोर्ड
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import "./styles/app.css";

// हेल्पर कंपोनेंट ताकि useLocation का सही इस्तेमाल हो सके
const AppContent = () => {
  const location = useLocation();

  /* 🌟 मैजिक लॉजिक: इन सभी राउट्स पर ऊपर के दोनों शॉपिंग नेवबार 
      खुद-ब-खुद और सुरक्षित तरीके से छुप जाएंगे */
  const showHeader =
    location.pathname !== "/login" &&
    location.pathname !== "/register" &&
    location.pathname !== "/seller/register" &&
    location.pathname !== "/seller/dashboard" &&
    location.pathname !== "/admin/dashboard";

  return (
    <>
      {/* अगर showHeader सच (true) है, तभी Navbar optical और SubNavbar स्क्रीन पर लोड होंगे */}
      {showHeader && <Navbar />}
      {showHeader && <SubNavbar />}

      <Routes>
        {/* 1. मुख्य शॉपिंग होमपेज */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* 2. कस्टमर लॉगिन पेज */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* 3. नया कस्टमर रजिस्ट्रेशन रूट (अब लॉगिन बटन दबाने पर सीधे यहीं आएगा) */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* 4. नया सेलर रजिस्ट्रेशन रास्ता (Sell बटन दबाने पर यहाँ आएगा) */}
        <Route
          path="/seller/register"
          element={<SellerRegister />}
        />

        {/* 5. शॉपिंग कार्ट पेज */}
        <Route
          path="/cart"
          element={<Cart />}
        />

        {/* 6. सेलर डैशबोर्ड का मुख्य रास्ता */}
        <Route
          path="/seller/dashboard"
          element={<SellerDashboard />}
        />

        {/* 7. चेकआउट पेमेंट पेज */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* 8. एडमिन डैशबोर्ड का सुप्रीम रास्ता */}
        <Route
          path="/admin/dashboard"
          element={<AdminDashboard />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;