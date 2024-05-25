import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Header from './App/Compoents/Header/Header';
import HomePage from './App/Pages/HomePage/HomePage';
import Footer from './App/Compoents/Footer/Footer';
import BrowsePage from './App/Pages/BrowsingPage/BrowsingPage';
import ItemDetailsPage from './App/Pages/ItemDetailsPage/ItemDetailsPage';
import UserProfilePage from './App/Pages/UserProfilePage/UserProfilePage';
import SellPage from './App/Pages/SellPage/SellPage';
import SellerProfilePage from './App/Pages/SellerProfilePage/SellerProfilePage';
import CartPage from './App/Pages/CartPage/CartPage';
import UserReceiptPage from './App/Pages/UserReceiptPage/UserReceiptPage';
import EditItemPage from './App/Pages/EditItemPage/EditItemPage';
import CheckoutPage from './App/Pages/CheckoutPage/CheckoutPage';
import { initializeKeycloak, doLogin, doLogout, isLoggedIn } from './App/keycloak/keycloak'
import { setAuthenticated } from './App/redux/slice/authSlice';
import { showSnackbar } from './App/redux/slice/snackbarSlice';
import axios from 'axios';;

export default function App() {
  const isWide = useSelector(state => state.windowSize.isWide);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    initializeKeycloak();
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div className={`app-container`}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/browse" element={<BrowsePage />} />
          <Route path="/item/:id" element={<ItemDetailsPage />} />
          <Route path="/user/:userId/item/:itemId/edit" element={<EditItemPage />} />
          <Route path="/user/:userId/receipt/:receiptId" element={<UserReceiptPage />} />
          <Route path="/user/:userId" element={<UserProfilePage />} />
          <Route path="/sell" element={<SellPage />} />
          <Route path="/seller-profile/:id" element={<SellerProfilePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}