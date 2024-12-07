import { useContext, useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { ProductCard } from "./Components/ProductCard";
import { ProductForm } from "./Components/ProductForm";
import ContactPage from "./Components/contact-us/ContactPage";
import ProductDetails from "./Components/products/ProductDetails";
import { HomePage } from "./Components/home/HomePage";
import SearchedProducts from "./Components/products/SearchedProducts";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import ProductList from "./Components/Admin/Product/ProductList";
import OrderList from "./Components/Admin/Order/OrderList";
import AboutPage from "./Components/about-us/AboutPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Womens } from "./Components/Category/Womens";
import { Mens } from "./Components/Category/Mens";
import { Kids } from "./Components/Category/Kids";
import ProtectRoute from "./Auth/ProtectRoute";
import { OrderForm } from "./Components/order-form/OrderForm";
import ProductEdit from "./Components/Admin/Product/ProductEdit";
import Queries from "./Components/Admin/Contact/Queries";
import Wishlist from "./Components/Wishlist/Wishlist";
import { OrderStatus } from "./Components/order-status/OrderStatus";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import SignupForm from "./Components/SignupForm/SignupForm";
import LoginForm from "./Components/LoginForm/LoginForm";
import { Shopping_Cart } from "./Components/Shopping-Cart/Shopping_Cart";

function App() {
  const [isSignup, setIsSignup] = useState(false);
  const toggleForm = () => {
    setIsSignup(!isSignup);
  };

  return (
    <div className="dark:bg-gray-700 h-auto flex flex-col">
      <Navbar />

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/signup"
            element={<SignupForm toggleForm={toggleForm} />}
          />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route element={<ProtectRoute />}> */}
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/searched-products" element={<SearchedProducts />} />
          <Route path="/cart" element={<Shopping_Cart />} />
          {/* </Route> */}
          <Route path="/admin/products/new" element={<ProductForm />} />
          <Route path="/admin/products/:id/edit" element={<ProductEdit />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/admin/orders" element={<OrderList />} />
          <Route path="/admin/queries" element={<Queries />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/shop/womens" element={<Womens />} />
          <Route path="/shop/mens" element={<Mens />} />
          <Route path="/shop/kids" element={<Kids />} />
          <Route path="/order-form" element={<OrderForm />} />
          <Route path="/order-tracking" element={<OrderStatus />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
