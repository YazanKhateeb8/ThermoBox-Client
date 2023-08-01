import './App.css';
import { useState, useEffect } from "react";
import {BrowserRouter as Router, Routes, Route, Navigate, useNavigate} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Landing from './components/landing/Landing';
import Products from './components/products/products';
import PaymentInfo from './components/payment/paymentInfo';
import ProductPage from './components/products/productPage';
import Footer from './components/footer/footer';
import Cart from './components/cart/cart';
import MyOrders from './components/my-orders/MyOrders';
import UserProfile from "./components/userProfile/userProfile";
import NavigationBar from "./components/navigation-bar/NavigationBar";
import { fetchProducts , fetchMostSoldProducts } from './servicesApi/ProductsApi';
import ScrollToTop from './components/ext/ScrollToTop';

import { fetchAdmin, fetchUser } from "./servicesApi/AuthApi";


function App() {
  const serverUrl = process.env.REACT_APP_SERVER_ROUTE;
  // const [isAdmin, setIsAdmin] = useState(sessionStorage.getItem("isAdmin") ? JSON.parse(sessionStorage.getItem("isAdmin")) : false)
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [token, setToken] = useState(sessionStorage.getItem("token") ? JSON.parse(sessionStorage.getItem("token")) : null);
  // const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const tryGetUser = async () => await login(token);
      tryGetUser();
    }

  }, []);


  useEffect(() => {
    const getProducts = async () => {
      const fetchedProducts = await fetchProducts(selectedCategory);
      setProducts(fetchedProducts);
    };
    getProducts();
  }, [selectedCategory]);


  const onAuthorization = async (token, isAdmin) => {
    setToken(token);
    sessionStorage.setItem("token", JSON.stringify(token));
    sessionStorage.setItem("isAdmin", JSON.stringify(isAdmin));
    login(token, isAdmin);
    toast("Logged In Successfully", { autoClose: 1000 });
  };

  const login = async (token, isAdmin) => {
    if (isAdmin) {
      const fetchedAdmin = await fetchAdmin(token)
      console.log(fetchedAdmin)
      setAdmin(fetchedAdmin);
      // setIsAdmin(true)
      // navigate('/company-landing')
    }
    else {
      const fetchedUser = await fetchUser(token)
      setUser(fetchedUser);
      // if (fetchedUser.isPending) navigate('/pending-user')
      // else navigate('/user-landing')
    }

  };

  const onLogout = () => {
    setUser(null);
    sessionStorage.clear();
    // toast("Logged Out Successfully", { autoClose: 1000 });
    window.location.href = "/";
  };

  return (
   <>
   
   <Router>
   <ScrollToTop />
  <ToastContainer />
      {
        <NavigationBar
          user={user}
          onLogout={onLogout}
          onAuthorization={onAuthorization}
        />
        
      }
        
      <Routes>
        <Route path="/"  element={user ? <Landing user={user}/> : <Landing />} />
        <Route path="/products"  element={<Products user={user}/>} />
        <Route path="/product/:productID"  element={<ProductPage user={user}/>} />
        <Route path="/cart"  element={user && <Cart user={user} />} />
        <Route path="/payment" element={<PaymentInfo user={user} />} />
        <Route path='/products/category/:categoryName' element={<Products />} />
        <Route path="/user-profile" element={user && <UserProfile user={user} />} />
        <Route path="/my-orders" element={user && <MyOrders user={user} />} />

      </Routes>
      </Router>
          <Footer />
   </>
  );
}

export default App;
