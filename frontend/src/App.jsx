import React from "react";
import {
    BrowserRouter,
    Routes,
    Route,
    useLocation
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";        // ✅ SAHI (pages folder me hai)
import SignUp from "./pages/SignUp";        // ✅ SAHI (pages folder me hai)
import SellerRegister from "./pages/SellerRegister";
import SellerDashboard from "./pages/SellerDashboard";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import VerifyCode from "./pages/VerifyCode";
import SellerDocumentUpload from "./pages/SellerDocumentUpload";
import SellerApprovalPending from "./pages/SellerApprovalPending";

import "./styles/app.css";

const AppContent = () => {
    const location = useLocation();

    // 🌟 Sab pages jahan navbar nahi chahiye
    const showHeader =
        location.pathname !== "/SignIn" &&
        location.pathname !== "/SignUp" &&
        location.pathname !== "/seller/register" &&
        location.pathname !== "/seller/dashboard" &&
        location.pathname !== "/admin/dashboard" &&
        location.pathname !== "/forgot-password" &&
        location.pathname !== "/verify-code" &&
        location.pathname !== "/seller/document-upload" &&
        location.pathname !== "/seller/approval-pending";

    return (
        <>
            {showHeader && <Navbar />}
            {showHeader && <SubNavbar />}

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/SignIn" element={<SignIn />} />
                <Route path="/SignUp" element={<SignUp />} />
                <Route path="/seller/register" element={<SellerRegister />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/seller/dashboard" element={<SellerDashboard />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/verify-code" element={<VerifyCode />} />
                <Route path="/seller/document-upload" element={<SellerDocumentUpload />} />
                <Route path="/seller/approval-pending" element={<SellerApprovalPending />} />
            
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