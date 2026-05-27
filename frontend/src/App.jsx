import {
  BrowserRouter,
  Routes,
  Route,
  useLocation // 🌟 करंट पेज का रास्ता (Path) पता करने के लिए इसे इम्पोर्ट किया
} from "react-router-dom";

import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import "./styles/app.css";

// 🌟 एक छोटा सा हेल्पर कंपोनेंट बनाया ताकि useLocation का सही इस्तेमाल हो सके
const AppContent = () => {
  const location = useLocation();

  /* 🌟 जादू: अगर पाथ '/login' है तो ये false हो जाएगा, यानी लॉगिन पेज पर नेवबार नहीं दिखेंगे */
  const showHeader = location.pathname !== "/login";

  return (
    <>
      {/* अगर showHeader सच (true) है, तभी Navbar और SubNavbar लोड होंगे */}
      {showHeader && <Navbar />}
      {showHeader && <SubNavbar />}

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        <Route
          path="/checkout"
          element={<Checkout />}
        />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    /* useLocation हुक का उपयोग करने के लिए BrowserRouter के अंदर AppContent को लपेटा गया है */
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
};

export default App;