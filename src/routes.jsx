import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Components
import ScrollToTop from "./Components/ScrollToTop/index.jsx"
//Pages
import Home from "./Pages/Home/index.jsx";
import Policies from "./Pages/Policies/index.jsx";
import Collection from "./Pages/Collection/index.jsx";
import Products from "./Pages/Products/index.jsx";
import CheckOut from "./Pages/CheckOut/index.jsx";
import ShippingAndPayment from "./Pages/ShippingAndPayment/index.jsx";
import OrderPlace from "./Pages/OrderPlace/index.jsx";
import Profile from "./Pages/Profile/index.jsx";
import Login from "./Pages/Login/index.jsx";
import Signin from "./Pages/Signin/index.jsx";
import Fragnances from "./Pages/Fragnances/index.jsx";
import Spinner from "./Components/Spinner/index.jsx";
import { useState } from "react";
import ContactUs from "./Pages/ContactUs/index.jsx";

const RoutesPages = () => {
    const [showSpinner, setShowSpinner] = useState(false);
    return (
        <>
            <Router basename="/">
                {showSpinner && <Spinner />}
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<Home setShowSpinner={setShowSpinner} />} />
                    <Route path="/policies/:name" element={<Policies setShowSpinner={setShowSpinner} />} />
                    <Route path="/contactUs" element={<ContactUs setShowSpinner={setShowSpinner} />} />
                    <Route path="/collection/:name" element={<Collection setShowSpinner={setShowSpinner} />} />
                    <Route path="/products/:id" element={<Products setShowSpinner={setShowSpinner} />} />
                    <Route path="/checkOut" element={<CheckOut setShowSpinner={setShowSpinner} />} />
                    <Route path="/shippingAndPayment" element={<ShippingAndPayment setShowSpinner={setShowSpinner} />} />
                    <Route path="/orderPlace" element={<OrderPlace setShowSpinner={setShowSpinner} />} />
                    <Route path="/profile" element={<Profile setShowSpinner={setShowSpinner} />} />
                    <Route path="/login" element={<Login setShowSpinner={setShowSpinner} />} />
                    <Route path="/signin" element={<Signin setShowSpinner={setShowSpinner} />} />
                    <Route path="/fragnances" element={<Fragnances setShowSpinner={setShowSpinner} />} />
                </Routes>
            </Router>
        </>
    )
}

export default RoutesPages